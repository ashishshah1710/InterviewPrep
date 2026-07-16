const TOPICS = [
  // ========== Core Java (9) ==========
  {
    category: 'Core Java',
    title: 'Fail-Fast vs Fail-Safe',
    scaleContext: 'Collections iterated during concurrent mutation across 200+ service pods',
    whyArchitecture: 'Fail-fast iterators (ArrayList, HashMap) detect structural modification during iteration and throw ConcurrentModificationException immediately via a modCount check. Fail-safe iterators (CopyOnWriteArrayList, ConcurrentHashMap keySet) operate on a snapshot or weakly consistent view, never throwing CME but potentially missing or duplicating elements.\n\nWithout understanding this distinction, teams ship code that passes unit tests yet fails under production concurrency—payment reconciliation jobs that silently skip records, or audit trails that double-count events.\n\nInternally, fail-fast uses a fail-fast iterator that compares expectedModCount against the collection\'s modCount on each next()/remove(). Fail-safe copies the underlying array (COW) or reads from concurrent structures with volatile node chains (CHM), trading memory and staleness for availability.',
    productionScenario: 'A billing service processes 50K invoice line items nightly. One thread iterates invoices while another pod\'s webhook handler updates status on the same in-memory batch loaded from cache. With ArrayList iteration, you get sporadic CME crashing the job at 3 AM. We switched hot-path reads to CopyOnWriteArrayList for the cached snapshot and moved mutations to ConcurrentHashMap keyed by invoiceId, reducing job failure rate from 12% to zero over 90 days.',
    productionCode: `@Service
public class InvoiceReconciliationService {
    private final ConcurrentHashMap<Long, Invoice> liveInvoices = new ConcurrentHashMap<>();

    public void reconcile(List<Invoice> snapshot) {
        // Fail-safe iteration over immutable snapshot copy
        List<Invoice> safeView = List.copyOf(snapshot);
        for (Invoice inv : safeView) {
            Invoice current = liveInvoices.get(inv.getId());
            if (current != null && !current.getStatus().equals(inv.getStatus())) {
                publishMismatch(inv.getId(), inv.getStatus(), current.getStatus());
            }
        }
    }

    public void onWebhookUpdate(InvoiceUpdate update) {
        liveInvoices.compute(update.getId(), (k, v) ->
            v == null ? update.toInvoice() : v.withStatus(update.getStatus()));
    }
}`,
    executiveAnswer: 'When I design concurrent read paths, I explicitly choose iterator semantics. Fail-fast is correct when I want the JVM to scream the moment shared mutable state is violated—that\'s my safety net in single-threaded business logic. Fail-safe is deliberate when I accept slightly stale reads to keep throughput, like serving a dashboard from a COW snapshot while writes continue. I never assume "it works in dev" means thread-safe; I map who mutates, who iterates, and pick the collection accordingly.',
    tradeOffs: 'Fail-safe snapshots consume extra memory and may show stale data—unsuitable for financial balance checks without versioning. Fail-fast forces you to externalize synchronization, adding complexity. Alternatives: explicit ReadWriteLock, reactive streams with immutable events, or database-side cursor iteration for large batches.',
    followUps: [
      { q: 'Does ConcurrentHashMap iterator throw ConcurrentModificationException?', a: 'No. Its iterators are weakly consistent—they reflect state at some point during iteration, may skip new entries, and never throw CME. Structural changes during iteration don\'t corrupt the iterator.' },
      { q: 'Why does remove() during enhanced for-loop sometimes work once then fail?', a: 'ListIterator.remove() is legal and updates modCount coherently. Enhanced for uses fail-fast Iterator.remove() which is unsupported on most collections—actually the issue is concurrent modification from another thread, not remove() itself on ArrayList via iterator.' },
      { q: 'When would you still use synchronized collections?', a: 'Legacy integration, compound operations needing atomicity across multiple structures, or when you need strict happens-before without redesigning to concurrent collections. Prefer higher-level abstractions first.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'ConcurrentHashMap Internals',
    scaleContext: '10M+ key lookups/sec across order-tracking microservices',
    whyArchitecture: 'ConcurrentHashMap (Java 8+) replaces segment locks with node arrays + synchronized bin heads + CAS on empty bins, enabling fine-grained concurrency. It solves the throughput collapse of Hashtable and the deadlock risk of wrapping HashMap with a global lock.\n\nWithout it, high-concurrency caches become mutex bottlenecks—p99 latency spikes when 500 threads contend on one lock.\n\nMechanics: hash spread via spread(h), bin index (n-1)&hash, linked list or tree bin after threshold 8, forwarding nodes during resize. compute/merge are atomic at bin level. size is approximate under contention (LongAdder-based in modern JDK).',
    productionScenario: 'Our session affinity map held 2M active user tokens. synchronized HashMap caused 400ms p99 under flash sales. Migrating to ConcurrentHashMap with initial capacity tuning and custom load factor dropped p99 to 8ms. We used computeIfAbsent for lazy session hydration from Redis, eliminating duplicate Redis calls under stampede.',
    productionCode: `@Component
public class SessionCache {
    private final ConcurrentHashMap<String, Session> cache = new ConcurrentHashMap<>(65_536, 0.75f, 32);

    public Session getOrLoad(String token, Supplier<Session> loader) {
        return cache.computeIfAbsent(token, k -> {
            Session s = loader.get();
            return s != null ? s : new Session.Anonymous();
        });
    }

    public void invalidate(String token) {
        cache.remove(token);
    }
}`,
    executiveAnswer: 'I treat ConcurrentHashMap as my default concurrent map—not because it\'s magic, but because bin-level locking and CAS give me read-mostly scalability without global mutex. I size initial capacity to avoid resize storms during startup, use compute methods for atomic read-modify-write, and I never null-key or null-value it. For strict size limits I pair it with Caffeine eviction on top.',
    tradeOffs: 'No lock ordering across keys—deadlock-free but compound multi-key updates need external coordination. Iterators are weakly consistent. Memory overhead vs HashMap. Not for strong transactional semantics—use database or distributed cache with TTL for authoritative state.',
    followUps: [
      { q: 'What triggers treeification in CHM?', a: 'When a bin\'s linked list length exceeds TREEIFY_THRESHOLD (8) and table length is at least MIN_TREEIFY_CAPACITY (64), nodes convert to TreeNode red-black tree—O(log n) lookups in collision-heavy bins.' },
      { q: 'Is ConcurrentHashMap size exact?', a: 'size() and mappingCount() are approximate under heavy concurrent updates in some JDK versions; for exact counts under quiescence they converge. Use LongAdder-based sum if you need metrics, not business logic.' },
      { q: 'CHM vs synchronized HashMap?', a: 'CHM scales reads and independent writes across bins. synchronized HashMap serializes all operations—simpler visibility guarantees but terrible throughput under contention.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'Daemon Thread',
    scaleContext: 'Background metric flushers in 300 JVM instances',
    whyArchitecture: 'Daemon threads don\'t prevent JVM shutdown—when all user threads finish, the runtime exits even if daemons are running. Non-daemon (user) threads keep the JVM alive. This models background housekeeping vs business-critical work.\n\nWithout daemon semantics, shutdown hooks and graceful K8s SIGTERM handling deadlock because a metrics thread never stops.\n\nsetDaemon(true) must be called before start(). JVM creates main thread as user thread; GC threads are daemon. Daemon threads inherit daemon status from creating thread in some contexts—always set explicitly.',
    productionScenario: 'Our Spring Boot app spawned a heartbeat thread to push metrics every 5s. It was a user thread—during integration tests and K8s preStop, the pod hung 30s waiting for SIGKILL because the thread never checked interruption. Marking it daemon plus honoring interrupt flag fixed graceful shutdown within 5s drain window.',
    productionCode: `@Configuration
public class MetricsThreadConfig {
    @Bean(destroyMethod = "shutdown")
    public ScheduledExecutorService metricsExecutor() {
        ThreadFactory factory = r -> {
            Thread t = new Thread(r, "metrics-flusher");
            t.setDaemon(true);
            return t;
        };
        return Executors.newSingleThreadScheduledExecutor(factory);
    }
}

// Prefer @Scheduled with Spring lifecycle over raw Thread for production`,
    executiveAnswer: 'I use daemon threads only for non-critical background work that must not block JVM exit—metric buffers, idle connection sweepers. Business processing always runs on user threads managed by thread pools with explicit shutdown in @PreDestroy. In Kubernetes, graceful termination depends on threads responding to interrupt; daemon alone is not a substitute for cooperative shutdown.',
    tradeOffs: 'Daemon threads may be killed mid-operation during shutdown—risk partial writes unless idempotent. Overusing daemons masks lifecycle bugs. Prefer managed executors with awaitTermination and Spring\'s SmartLifecycle for ordered shutdown.',
    followUps: [
      { q: 'What happens to daemon thread mid-HTTP call on shutdown?', a: 'JVM terminates abruptly once user threads complete—daemon may be cut off without completing I/O. Always use shutdown hooks and cooperative cancellation for flush operations.' },
      { q: 'Are virtual threads daemon by default?', a: 'Virtual threads created via Thread.ofVirtual().start() inherit daemon status from the platform thread carrier or configuring thread factory—set explicitly in executor configuration.' },
      { q: 'Main thread vs daemon—who stops first?', a: 'When main exits and no user threads remain, JVM exits regardless of running daemons. User threads keep JVM alive until they finish.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'Comparable vs Comparator',
    scaleContext: 'Sorting 2M ledger entries for regulatory reporting',
    whyArchitecture: 'Comparable defines natural ordering via compareTo inside the class—one canonical sort order, used by TreeSet, TreeMap, Collections.sort. Comparator is external, multiple sort strategies, lambda-friendly, doesn\'t require modifying domain entity.\n\nWithout this split, teams bake sort logic into entities and break Open/Closed when finance needs a second sort key.\n\ncompareTo must be consistent with equals for sorted collections; Comparator can compare fields unrelated to equality. Both must satisfy transitivity or TreeSet silently corrupts.',
    productionScenario: 'Transaction entity had compareTo on timestamp only. Compliance needed sort by amount then id. We extracted Comparator.comparing(Transaction::getAmount).thenComparing(Transaction::getId) for reports while keeping natural order for ingestion dedup TreeSet—zero entity changes, passed audit.',
    productionCode: `public record Transaction(UUID id, Instant ts, BigDecimal amount) implements Comparable<Transaction> {
    @Override
    public int compareTo(Transaction o) {
        return this.ts.compareTo(o.ts);
    }

    public static final Comparator<Transaction> BY_AMOUNT_THEN_ID =
        Comparator.comparing(Transaction::amount)
                  .thenComparing(Transaction::id);
}

// Usage
transactions.stream().sorted(Transaction.BY_AMOUNT_THEN_ID).limit(100).toList();`,
    executiveAnswer: 'I implement Comparable only when the domain has one true natural order—typically chronological or lexical ID. Every other sort dimension gets a Comparator, often as static constants or strategy injection. I always chain thenComparing for stable sorts and nullsLast explicitly to avoid NPE surprises in production streams.',
    tradeOffs: 'Comparable couples ordering to domain class—versioning pain in shared libraries. Comparator proliferation without naming conventions hurts readability. For dynamic UI sorts, consider SortSpec DTO rather than dozens of comparators.',
    followUps: [
      { q: 'What if compareTo inconsistent with equals?', a: 'TreeSet/TreeMap behave unpredictably—equal objects by equals may both exist if compareTo returns non-zero. Contract violation causes subtle duplicate or missing entries.' },
      { q: 'Comparator.comparing with BigDecimal?', a: 'Use compareTo via Comparator.naturalOrder() on BigDecimal—never subtract doubleValue. Financial sorts require scale-aware comparison.' },
      { q: 'Sort parallel stream—Comparator thread-safe?', a: 'Comparator itself should be stateless; parallel sort partitions data and merges with same comparator—stateful comparators break parallel correctness.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'SOLID Principles',
    scaleContext: '50-team monolith-to-microservices migration',
    whyArchitecture: 'SOLID reduces coupling so teams can deploy independently. SRP: one reason to change. OCP: extend via interfaces. LSP: substitutability. ISP: small interfaces. DIP: depend on abstractions.\n\nWithout SOLID, every feature touches PaymentService god-class, merge conflicts explode, and test suites need full Spring context for one branch.\n\nIn Spring, SOLID maps to @Service boundaries, port/adapter hexagonal layers, strategy beans for OCP, and constructor injection for DIP.',
    productionScenario: 'Payment processing mixed NEFT, UPI, card in one 4000-line class. Extracting PaymentGateway interface with NEFT/UPI adapters let us add RTP without modifying core orchestrator—deployment cadence went from monthly to weekly for payment rail changes.',
    productionDiagram: `[Controller] --> [PaymentOrchestrator]
                          |
            +-------------+-------------+
            v             v             v
      [NeftGateway] [UpiGateway] [CardGateway]
            |             |             |
            v             v             v
      External APIs   External APIs   PCI Zone`,
    executiveAnswer: 'I apply SOLID pragmatically—not as religion. SRP means I split when I see unrelated change drivers, like pricing vs settlement. OCP via strategy pattern saved us on payment rails. LSP bites when mock implementations behave differently— I enforce contract tests. DIP is why I inject interfaces, not concrete RestTemplate wrappers.',
    tradeOffs: 'Over-abstraction creates indirection fatigue—five interfaces for one CRUD. Premature OCP adds complexity before second variant exists. Balance with YAGNI; refactor when second use case arrives, not speculatively.',
    followUps: [
      { q: 'SRP vs microservice boundaries—same thing?', a: 'Related but different. SRP is class/module cohesion; microservices add deployment, data ownership, network boundaries. A microservice can violate SRP internally.' },
      { q: 'How does LSP apply to Spring @Primary beans?', a: 'All implementations must honor interface contract; @Primary only affects injection preference, not substitutability. Violating LSP breaks callers expecting behavioral equivalence.' },
      { q: 'DIP without interface explosion?', a: 'Use functional interfaces, sealed hierarchies in Java 17, or package-private adapters. Not every dependency needs a public interface—test doubles can use Mockito without extraction.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'isPresent() vs ifPresent()',
    scaleContext: 'Optional chains in 15M daily API validations',
    whyArchitecture: 'Optional.isPresent() is imperative boolean check—leads to get() calls and empty Optional abuse. ifPresent(Consumer) is functional, side-effect only when value exists, composes with orElse/orElseGet/orElseThrow.\n\nWithout ifPresent/map/flatMap, code becomes nested null checks and accidental get() on empty Optional throwing NoSuchElementException in prod.\n\nOptional is a container monad—flatMap chains async lookups; filter applies predicates without unboxing.',
    productionScenario: 'Customer lookup returned Optional<Customer>. Junior devs used isPresent()+get(), causing 200 NoSuchElementException/day when cache returned empty. Refactoring to orElseThrow(CustomerNotFoundException::new) and ifPresent for audit logging cut support tickets 80%.',
    productionCode: `public OrderSummary buildSummary(String customerId) {
    return customerRepository.findById(customerId)
        .map(c -> new OrderSummary(c.getName(), c.getTier()))
        .orElseThrow(() -> new CustomerNotFoundException(customerId));
}

public void notifyIfPremium(Optional<Customer> customer) {
    customer.filter(c -> "PREMIUM".equals(c.getTier()))
            .ifPresent(c -> notificationService.send(c.getEmail(), "Offer"));
}`,
    executiveAnswer: 'I ban isPresent()+get() in code review—it\'s an Optional anti-pattern. I use ifPresent for side effects, map/flatMap for transformations, orElseGet for lazy defaults. Optional belongs at API boundaries, never as fields or method params collections. For validation failures I prefer orElseThrow with domain exceptions.',
    tradeOffs: 'Optional allocates; hot paths may use null with @Nullable documentation. Over-chaining hurts readability—sometimes early return clearer. Never serialize Optional in JSON without custom handling.',
    followUps: [
      { q: 'Optional in method parameters—acceptable?', a: 'Generally no—overloading, null, or explicit Optional param at boundary only. Callers shouldn\'t pass Optional.ofNullable constantly.' },
      { q: 'ifPresent vs ifPresentOrElse?', a: 'ifPresentOrElse runs empty action too—useful for default logging or metrics on miss without throwing.' },
      { q: 'Stream of Optional—flatMap?', a: 'Use flatMap(Optional::stream) in Java 9+ to filter present values in one pipeline step.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'JVM Memory Management',
    scaleContext: '8GB heap services processing 500K events/hour',
    whyArchitecture: 'JVM divides heap into Young (Eden, Survivor) and Old generations. Short-lived objects die in minor GC; long-lived promote to Old, collected in major/full GC. Metaspace holds class metadata. TLABs enable thread-local allocation without global sync.\n\nWithout tuning, apps suffer stop-the-world pauses during promotion failure or metaspace leaks from classloader churn in hot redeploy environments.\n\nG1GC (Java 17 default) targets regions, Mixed GC, pause-time goals. ZGC/Shenandoah offer sub-ms pauses on large heaps at cost of throughput.',
    productionScenario: 'Order service with 4GB heap saw 2s GC pauses every 10 min under G1 default. Analysis showed premature promotion of byte[] from Kafka deserialization. Increasing young gen ratio, enabling -XX:+AlwaysPreTouch, and object pooling for reusable buffers cut p99 latency from 1.8s to 120ms.',
    productionCode: `# JVM flags (Java 17, G1)
JAVA_OPTS="-Xms4g -Xmx4g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 \
  -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/log/heapdump.hprof \
  -Xlog:gc*:file=/var/log/gc.log:time,uptime,level,tags"

// Code: avoid retaining references in static collections
public void process(Event e) {
    byte[] payload = e.getPayload(); // process and release
    handler.handle(payload);
    // do not store payload in instance field
}`,
    executiveAnswer: 'I start with defaults on Java 17 G1, then tune from metrics—not folklore. I watch allocation rate, GC pause times, and promotion rates in Micrometer/Prometheus. I fix leaks before tuning flags: dominator tree in MAT for retained heap, metaspace for dynamic class loading. For latency-sensitive services I set Xms=Xmx to avoid resize and size heap for 60-70% utilization post-GC.',
    tradeOffs: 'Large heaps increase pause even with G1—consider horizontal scale. ZGC uses more CPU. Aggressive MaxGCPauseMillis increases GC frequency. Object pooling adds complexity and can leak if pools grow unbounded.',
    followUps: [
      { q: 'When does Full GC happen with G1?', a: 'Concurrent mode failure, metaspace exhaustion, explicit System.gc(), or humongous object fragmentation. Investigate concurrent-mark aborts and heap occupancy.' },
      { q: 'Stack vs heap for performance?', a: 'Stack: primitives, references, frame locals—fast, thread-bound. Heap: objects, shared, GC-managed. Escape analysis may scalar-replace small objects on stack.' },
      { q: 'How diagnose metaspace leak?', a: 'Track Metaspace Used after redeploys; heap dump classloader instances; common cause is OSGi, dynamic proxies, or Groovy/JSP in dev-like prod configs.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'Java 8 Streams & Functional Interfaces',
    scaleContext: 'ETL pipelines transforming 20M records/night',
    whyArchitecture: 'Streams provide declarative bulk operations with lazy intermediate ops and terminal reduction. Functional interfaces (Predicate, Function, Consumer, Supplier) enable lambda composition without anonymous class boilerplate.\n\nWithout streams, nested loops obscure intent and parallelization is error-prone. With misuse, parallel streams on small data or non-associative ops corrupt results.\n\nPipeline fuses operations where possible; Spliterator splits for parallel. Primitive streams (IntStream) avoid boxing overhead.',
    productionScenario: 'Commission calculation over 5M transactions used nested for-loops—45 min batch window. Refactoring to stream().collect(groupingBy(...)) with parallel on CPU-bound pure transforms cut to 12 min. We avoided parallel on IO-bound DB calls—used flatMap to batch fetch instead.',
    productionCode: `Map<String, BigDecimal> commissionByRegion = transactions.stream()
    .filter(t -> t.getStatus() == Status.SETTLED)
    .collect(Collectors.groupingBy(
        Transaction::getRegion,
        Collectors.mapping(
            Transaction::getCommission,
            Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))));

List<String> topMerchants = merchants.stream()
    .sorted(Comparator.comparing(Merchant::getVolume).reversed())
    .limit(10)
    .map(Merchant::getId)
    .toList();`,
    executiveAnswer: 'I use streams for readability when operations are map-filter-reduce shaped and side-effect free. I keep pipelines short—beyond three operations I extract methods. Parallel streams only for large in-memory datasets with associative reductions and thread-safe sources. For IO I use CompletableFuture or virtual threads, not parallelStream.',
    tradeOffs: 'Streams harder to debug—no breakpoints in lambda easily. Parallel fork-join pool is global—can starve other work. Boxing in Stream<Integer> costly; use IntStream. Sequential stream overhead negligible vs clarity gain.',
    followUps: [
      { q: 'Why not parallelStream on ArrayList of 100 elements?', a: 'Split/merge overhead exceeds benefit; ForkJoin scheduling dominates. Rule of thumb: tens of thousands+ elements and CPU-bound work.' },
      { q: 'collect vs reduce?', a: 'collect with Collector handles mutable accumulation safely—including concurrent collectors for parallel. reduce requires associative combiner; identity must be true identity for parallel correctness.' },
      { q: 'flatMap vs map in Optional chain?', a: 'map wraps result in Optional; flatMap flattens Optional<Optional<T>> and chains lookups returning Optional—avoids nested optionals.' }
    ]
  },
  {
    category: 'Core Java',
    title: 'CompletableFuture & Multithreading',
    scaleContext: 'Orchestrating 6 downstream calls with 200ms SLA',
    whyArchitecture: 'CompletableFuture composes async pipelines: supplyAsync, thenApply, thenCompose, allOf, exceptionally. Separates async coordination from thread blocking—critical when threads cost more than latency budget.\n\nWithout async composition, thread pools exhaust waiting on sequential HTTP calls—500 threads each blocked 800ms equals collapse.\n\nDefault ForkJoinPool.commonPool() backs supplyAsync without executor—production must inject dedicated ExecutorService sized for blocking IO vs CPU work.',
    productionScenario: 'Product detail page needed inventory, pricing, reviews, recommendations—serial RestTemplate took 900ms. CompletableFuture.allOf with custom bounded elastic pool (50 threads) parallelized calls, exceptionally recovered pricing fallback, completed in 220ms p95.',
    productionCode: `@Service
public class ProductAggregator {
    private final ExecutorService ioPool = Executors.newFixedThreadPool(50);

    public CompletableFuture<ProductView> aggregate(String sku) {
        CompletableFuture<Inventory> inv = CompletableFuture
            .supplyAsync(() -> inventoryClient.get(sku), ioPool);
        CompletableFuture<Price> price = CompletableFuture
            .supplyAsync(() -> pricingClient.get(sku), ioPool)
            .exceptionally(ex -> Price.fallback(sku));

        return inv.thenCombine(price, (i, p) -> new ProductView(sku, i, p));
    }
}`,
    executiveAnswer: 'I use CompletableFuture when I need to fan-out independent IO and compose results with timeout handling. I never use default common pool for blocking calls—I inject a named executor with metrics. I set orTimeout/join with explicit deadlines matching SLA. For Spring 6+, WebClient reactive or virtual threads are often cleaner, but CompletableFuture remains excellent for hybrid imperative codebases.',
    tradeOffs: 'Callback hell if over-nested—extract methods. Exception handling subtle—handle vs exceptionally vs whenComplete. Thread pool mis-sizing causes rejection or memory pressure. Debugging async stack traces painful without contextual logging.',
    followUps: [
      { q: 'thenApply vs thenCompose?', a: 'thenApply maps result synchronously to new value. thenCompose flatMaps to another CompletableFuture—used for dependent async steps avoiding CompletableFuture<CompletableFuture<T>>.' },
      { q: 'allOf vs anyOf?', a: 'allOf waits all complete—returns Void, fetch results individually. anyOf completes when first finishes—use for hedged requests with cancellation of losers.' },
      { q: 'CompletableFuture vs @Async?', a: '@Async Spring-managed, proxy-based, integrates with @Transactional carefully. CompletableFuture explicit, portable, better for programmatic composition outside Spring proxy boundaries.' }
    ]
  },

  // ========== Spring Boot & Microservices (9) ==========
  {
    category: 'Spring Boot & Microservices',
    title: 'JWT Authentication',
    scaleContext: 'Stateless auth for 50K req/sec API gateway fleet',
    whyArchitecture: 'JWT encodes claims (sub, roles, exp) signed with HMAC or RSA—server validates signature and expiry without session store lookup. Solves horizontal scale of session affinity and central session DB bottleneck.\n\nWithout proper validation, services accept alg:none attacks, expired tokens, or trust unsigned payloads—full account takeover.\n\nFlow: login issues access+refresh tokens; resource servers validate via JwtDecoder; short access TTL limits exposure; refresh rotates credentials.',
    productionScenario: 'Mobile banking API migrated from server sessions stored in Redis (2M sessions, $8K/month Redis). JWT access token 15min + refresh in HttpOnly cookie cut Redis to revocation list only, scaled API pods without sticky sessions, auth latency dropped 15ms per request.',
    productionCode: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
            .build();
    }
}`,
    executiveAnswer: 'I implement JWT as opaque-to-client signed contracts—never store PII in payload unless encrypted JWE. Access tokens stay short-lived; refresh tokens rotate with reuse detection. Every microservice validates signature locally with cached JWK set—not a call back to auth server per request. I maintain explicit revocation for logout and compromise via token blocklist or session version claim.',
    tradeOffs: 'Revocation harder than server sessions—need blocklist or short TTL. Token size adds header overhead. Symmetric HS256 shared secret rotation painful—prefer RS256 asymmetric. Stolen refresh token risk mitigated by binding to device fingerprint and rotation.',
    followUps: [
      { q: 'Where validate JWT—in gateway or each service?', a: 'Gateway validates for edge protection; services must re-validate signature and claims—never trust gateway headers alone (defense in depth).' },
      { q: 'JWT vs session for PCI workloads?', a: 'Sessions easier to invalidate instantly; JWT acceptable with very short TTL plus mTLS internal. High-security often hybrid: session id reference token internally.' },
      { q: 'How handle clock skew?', a: 'Set leeway on exp/nbf validation—typically 30-60 seconds—sync NTP on all nodes.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'OAuth2 vs JWT',
    scaleContext: 'Enterprise SSO across 40 internal microservices',
    whyArchitecture: 'OAuth2 is authorization framework (flows: auth code, client credentials, PKCE)—defines how tokens are issued. JWT is token format—self-contained JSON. OAuth2 access tokens can be opaque or JWT.\n\nConflating them leads to implementing custom auth code flow incorrectly or storing JWT where opaque reference token with introspection is safer.\n\nSpring Authorization Server issues tokens; resource servers validate JWT locally or introspect opaque tokens at authorization server.',
    productionScenario: 'Partner B2B integration needed client_credentials for machine-to-machine. We used Spring Authorization Server issuing JWT access tokens with scoped claims (read:orders). Mobile app used auth code + PKCE. Internal admin used OIDC with corporate IdP federation—single pattern, multiple grant types.',
    productionDiagram: `[Mobile App] --PKCE--> [Auth Server] --JWT--> [API Gateway] --> [Services]
[Partner] --client_credentials--> [Auth Server]
[Admin] --OIDC federation--> [Corporate IdP] --> [Auth Server]`,
    executiveAnswer: 'OAuth2 answers who grants access and how; JWT answers how token data is carried. I use OAuth2 flows per client type—never password grant. JWT when I need local validation at scale; opaque tokens when I need immediate revocation without blocklist. OIDC adds identity layer on OAuth2—I use it for user authentication, OAuth2 scopes for authorization.',
    tradeOffs: 'OAuth2 complexity—PKCE mandatory for public clients. JWT in OAuth2 leaks claims to client if not encrypted. Federation adds latency on first login. Custom grants are anti-pattern—stick to standard flows.',
    followUps: [
      { q: 'Client credentials vs auth code?', a: 'Client credentials: machine, no user context. Auth code + PKCE: user delegation, public/mobile clients. Never mix assumptions on token contents.' },
      { q: 'Can OAuth2 work without JWT?', a: 'Yes—opaque access tokens validated via introspection endpoint. Common in high-security where immediate revoke required.' },
      { q: 'Spring Security OAuth2 Resource Server role?', a: 'Validates JWT signature, maps scopes/roles to GrantedAuthority, integrates with @PreAuthorize—no full OAuth2 server unless using Authorization Server project.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'RestTemplate vs WebClient',
    scaleContext: '12 downstream HTTP dependencies per checkout request',
    whyArchitecture: 'RestTemplate is synchronous blocking—one thread per call, simple but poor scalability under IO wait. WebClient is reactive/non-blocking on Netty—few threads handle many concurrent requests via event loop.\n\nWithout migration, thread pool exhaustion under downstream slowness causes cascading 503s despite CPU idle.\n\nRestTemplate deprecated in Spring 6; WebClient supports sync via block() but shines in reactive pipelines. Connection pooling configured via Reactor Netty HttpClient.',
    productionScenario: 'Checkout service RestTemplate pool 200 threads exhausted at 150 RPS when payment gateway slowed to 3s. WebClient with 500 max connections and 2s timeout improved throughput to 800 RPS on same 2-core pods—CPU 40% vs previous 100% thread blocked.',
    productionCode: `@Configuration
public class WebClientConfig {
    @Bean
    WebClient paymentWebClient(WebClient.Builder builder) {
        HttpClient httpClient = HttpClient.create()
            .responseTimeout(Duration.ofSeconds(2))
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 500);
        return builder
            .baseUrl("https://payment.internal")
            .clientConnector(new ReactorClientHttpConnector(httpClient))
            .build();
    }
}

// Service
public Mono<PaymentResult> pay(PaymentRequest req) {
    return paymentWebClient.post()
        .uri("/charge")
        .bodyValue(req)
        .retrieve()
        .bodyToMono(PaymentResult.class);
}`,
    executiveAnswer: 'I default new code to WebClient for outbound HTTP—configured timeouts, retries with backoff via Reactor Retry, and circuit breakers via Resilience4j reactor operators. RestTemplate remains for legacy sync code paths until virtual threads make blocking cheap. I never block() on reactive chains in servlet threads without bounded elastic scheduler.',
    tradeOffs: 'WebClient learning curve—debugging stack traces harder. block() anti-pattern loses benefits. Full reactive end-to-end required for max gain—Servlet + WebClient.block() is middle ground. Virtual threads (Java 21) may simplify with sync RestTemplate again.',
    followUps: [
      { q: 'WebClient in @Transactional service?', a: 'Blocking block() holds DB connection during HTTP wait—bad. Use reactive transaction support or separate transaction boundary from IO call.' },
      { q: 'Connection pool tuning WebClient?', a: 'Configure maxConnections, pendingAcquireMaxCount on ConnectionProvider—match expected concurrency and downstream limits.' },
      { q: 'RestTemplate with Java 21 virtual threads?', a: 'Blocking becomes cheap—RestTemplate viable again with virtual thread executor; still configure timeouts and resilience.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'API Gateway',
    scaleContext: 'Single entry for 120 microservices, 30K RPS peak',
    whyArchitecture: 'API Gateway centralizes cross-cutting concerns: routing, auth termination, rate limiting, request aggregation, protocol translation. Clients see one facade; backend topology changes freely.\n\nWithout gateway, every client couples to service discovery, every team reimplements auth and throttling inconsistently.\n\nSpring Cloud Gateway uses reactive Netty filters chain; Kong/Envoy offer plugin ecosystems. Gateway must stay thin—no business logic creep.',
    productionScenario: 'Retail app talked to 15 services directly—mobile releases blocked on backend URL changes. Spring Cloud Gateway with JWT validation, path-based routing to K8s services, and Redis rate limiting unified entry. Added GraphQL aggregation layer for mobile home screen—release decoupling and 40% fewer client-side calls.',
    productionDiagram: `[Mobile/Web] --> [API Gateway]
                        |-- auth filter (JWT)
                        |-- rate limit
                        |-- route /orders/* --> order-svc
                        |-- route /payments/* --> payment-svc
                        +-- circuit breaker filter`,
    executiveAnswer: 'I position the gateway as policy enforcement point—not a second monolith. Terminate TLS and JWT here, propagate trace headers and sanitized identity claims downstream. I avoid heavy aggregation that belongs in BFF; gateway routes and protects. I watch gateway p99—it amplifies outages if not circuit-broken against slow backends.',
    tradeOffs: 'Single point of failure—require HA cluster and health checks. Latency hop added—keep filter chain lean. Team temptation to add business rules—resist via architecture review. BFF pattern may duplicate gateway for client-specific needs.',
    followUps: [
      { q: 'Gateway vs service mesh?', a: 'Gateway: north-south edge traffic. Mesh (Istio): east-west mTLS, retries, observability between services. Often both—gateway at edge, mesh internal.' },
      { q: 'How propagate user context?', a: 'After JWT validation, forward X-User-Id or internal signed headers—never raw JWT to all services if claims too broad; use token exchange.' },
      { q: 'Spring Cloud Gateway vs Zuul?', a: 'Zuul 1 blocking servlet—legacy. Zuul 2/Gateway reactive—Gateway is Spring ecosystem default with WebFlux filters.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'Microservices Communication',
    scaleContext: 'Event-driven order lifecycle across 25 services',
    whyArchitecture: 'Sync (REST/gRPC) gives strong consistency for queries and command-response; async (Kafka) decouples producers/consumers for resilience and scale. Hybrid is production norm—sync for read, async for side effects.\n\nPure sync creates brittle chains; pure async complicates read-your-writes UX without event sourcing or CQRS.\n\nContracts via OpenAPI/AsyncAPI; versioning via consumer-driven contracts; idempotency keys on all mutating calls.',
    productionScenario: 'Order placement: sync gRPC inventory hold (must know NOW), async Kafka OrderPlaced for fulfillment, notification, analytics. Previously all-sync chain failed 8% when analytics slow—async boundary dropped user-facing failures to 0.3%.',
    productionDiagram: `[Order Svc] --gRPC sync--> [Inventory Svc]
      |
      +--Kafka: OrderPlaced--> [Fulfillment]
      +--Kafka: OrderPlaced--> [Notification]
      +--Kafka: OrderPlaced--> [Analytics]`,
    executiveAnswer: 'I choose sync when the caller cannot proceed without an answer—inventory check, fraud score. I choose async when I can eventualize—emails, search index, data warehouse. Every async message gets schema registry, idempotency key, and dead letter handling. I design for failure: timeouts, bulkheads, and never distributed transactions across HTTP.',
    tradeOffs: 'Async increases operational complexity—lag monitoring, replay tooling. Sync coupling causes cascade failures without resilience patterns. gRPC faster but harder through browser—REST at edge, gRPC internal.',
    followUps: [
      { q: 'Kafka vs REST for service A calling B?', a: 'REST/gRPC for request-response with immediate outcome. Kafka when B can process later, multiple subscribers needed, or spike buffering required.' },
      { q: 'How handle distributed transactions?', a: 'Avoid 2PC—use saga/outbox pattern. Local transaction + publish event from outbox table atomically.' },
      { q: 'Service discovery necessity?', a: 'K8s DNS often sufficient; Consul/Eureka when multi-cluster or non-K8s legacy. Client-side load balancing via Spring Cloud LoadBalancer.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'Global Exception Handling',
    scaleContext: 'Unified error contract across 80 REST controllers',
    whyArchitecture: '@ControllerAdvice + @ExceptionHandler centralizes exception-to-HTTP mapping, problem details (RFC 7807), logging, and metric tagging. Without it, controllers leak stack traces, inconsistent status codes confuse clients, and PII appears in error bodies.\n\nSpring maps unhandled exceptions to 500 with generic body—unsafe for production API contracts.\n\nHandler order matters—specific before generic. @RestControllerAdvice combines ResponseBody. Integration with validation BindException, MethodArgumentNotValidException.',
    productionScenario: 'Public API returned 500 with SQL fragments on constraint violations. @ControllerAdvice mapped DataIntegrityViolationException to 409 with error code ORD_DUPLICATE, logged correlation id only server-side. Client integration errors dropped 60%.',
    productionCode: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    ResponseEntity<ProblemDetail> notFound(ResourceNotFoundException ex, HttpServletRequest req) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(NOT_FOUND, ex.getMessage());
        pd.setProperty("errorCode", ex.getCode());
        pd.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.status(NOT_FOUND).body(pd);
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ProblemDetail> fallback(Exception ex) {
        log.error("Unhandled", ex);
        return ResponseEntity.internalServerError()
            .body(ProblemDetail.forStatus(INTERNAL_SERVER_ERROR));
    }
}`,
    executiveAnswer: 'I enforce one error envelope—ProblemDetail or custom ApiError with code, message safe for clients, traceId for support. Domain exceptions carry HTTP semantic; handler translates. I never expose root cause to external callers; I log full stack with MDC correlation id. Validation errors return 400 with field-level detail array.',
    tradeOffs: 'Over-broad @ExceptionHandler(Exception.class) can swallow intended propagation—order handlers carefully. Reactive WebFlux needs @ControllerAdvice on Router functions differently. Internationalization of messages adds layer.',
    followUps: [
      { q: 'ControllerAdvice vs try-catch in controller?', a: 'Advice keeps controllers thin, DRY mapping, consistent metrics—catch only when local recovery possible.' },
      { q: 'How integrate with Spring Security exceptions?', a: 'AuthenticationEntryPoint and AccessDeniedHandler for 401/403; or @ControllerAdvice handling AccessDeniedException for REST consistency.' },
      { q: 'ProblemDetail Spring 6 support?', a: 'Built-in org.springframework.http.ProblemDetail implements RFC 7807—preferred over custom wrappers for standards compliance.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: '@Transactional Internal Working',
    scaleContext: 'Financial ledger writes with strict ACID on PostgreSQL',
    whyArchitecture: '@Transactional wraps method in Spring AOP proxy—TransactionInterceptor starts/commits/rolls back PlatformTransactionManager connection. Propagation and isolation control join behavior and lock semantics.\n\nWithout understanding proxy boundaries, @Transactional on private method or self-invocation silently skips transaction—partial commits in prod.\n\nFlow: proxy enters method, tx begin, bind Connection to ThreadLocal, commit on success, rollback on RuntimeException (default). Read-only hints optimize DB.',
    productionScenario: 'Transfer service debited account A in one method, credited B in another—self-invocation bypassed transaction, A debited without B credit during exception. Fixed by extracting to separate @Service bean and REQUIRED propagation—reconciliation incidents zero in 6 months.',
    productionCode: `@Service
public class TransferService {
    private final AccountRepository repo;
    private final TransferHelper helper;

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void transfer(UUID from, UUID to, BigDecimal amount) {
        helper.debit(from, amount);
        helper.credit(to, amount);
    }
}

@Service
public class TransferHelper {
    @Transactional(propagation = Propagation.MANDATORY)
    public void debit(UUID id, BigDecimal amount) { /* ... */ }
}`,
    executiveAnswer: 'I treat @Transactional as declarative unit-of-work at service layer public methods only. I choose propagation explicitly—REQUIRES_NEW for audit log that must survive main rollback. I set rollbackFor checked exceptions when business requires. I never hold transactions open across HTTP or Kafka—keep boundaries short to avoid connection pool starvation.',
    tradeOffs: 'Long transactions lock rows—keep minimal. REPEATABLE_READ/SERIALIZABLE cost on PostgreSQL. Distributed transactions (@Transactional across DBs) avoid—use saga. LazyInitializationException if accessing lazy relations outside session—OpenSessionInView discouraged.',
    followUps: [
      { q: 'Why self-invocation fails?', a: 'this.transfer() bypasses CGLIB/JDK proxy—advice not applied. Fix: inject self, separate bean, or AspectJ compile-time weaving.' },
      { q: 'Transactional on repository?', a: 'Works but wrong layer—business transaction spans multiple repos; define at service orchestration level.' },
      { q: 'readOnly=true benefit?', a: 'Hints Hibernate flush mode, PostgreSQL can route to replica, connection read-only flag—reduces write overhead on queries.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'Spring Security Basics',
    scaleContext: 'Role-based access on 200+ endpoints',
    whyArchitecture: 'Spring Security filter chain intercepts requests before DispatcherServlet—authentication (who) then authorization (what allowed). SecurityContextHolder stores Authentication thread-locally.\n\nWithout proper config, actuator exposed, CSRF disabled wrongly on session apps, or permitAll too broad opens attack surface.\n\nSpring Boot 3 uses SecurityFilterChain bean replacing WebSecurityConfigurerAdapter. Method security @PreAuthorize for fine-grained checks.',
    productionScenario: 'Internal admin API had permitAll on /api/admin/** typo in ant pattern—security audit finding critical. Rewrote to authorizeHttpRequests with requestMatchers, method-level @PreAuthorize("hasRole(\'ADMIN\')"), disabled default user, integrated OAuth2 resource server—passed pen test.',
    productionCode: `@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain chain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(a -> a
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
            .build();
    }
}`,
    executiveAnswer: 'I configure security as code reviewed like production logic—explicit allow list, deny by default. I separate public, authenticated, and role-scoped paths. I enable method security for service-layer defense when controllers multiply. I test with @SpringBootTest and MockMvc including negative cases—security regressions are P0.',
    tradeOffs: 'Complex filter ordering debugging hard. CSRF irrelevant for stateless JWT but required for cookie sessions. Overly granular roles explode—use scope or attribute-based access for fine control.',
    followUps: [
      { q: 'Filter chain order importance?', a: 'Authentication before authorization; security context populated before @PreAuthorize. Custom filters declare order via @Order or SecurityFilterChain insert position.' },
      { q: 'BCrypt cost factor?', a: 'Default strength 10—balance CPU vs rainbow tables; increase slowly as hardware improves. Never store plain passwords.' },
      { q: 'SecurityContext in async threads?', a: 'ThreadLocal not propagated—use DelegatingSecurityContextExecutor or manually copy context for @Async work.' }
    ]
  },
  {
    category: 'Spring Boot & Microservices',
    title: 'Resilience4j',
    scaleContext: 'Protecting payment rail with 99.95% SLA dependency',
    whyArchitecture: 'Resilience4j implements circuit breaker, rate limiter, bulkhead, retry, time limiter—prevents cascade failure when dependency slow/failing. Circuit opens after failure threshold, fails fast, half-open probes recovery.\n\nWithout resilience, one slow fraud service stalls all checkouts—thread pools drain, Kubernetes kills healthy pods.\n\nIntegrates with Spring Boot 3 via spring-cloud-circuitbreaker-resilience4j; Micrometer metrics export breaker state.',
    productionScenario: 'Payment gateway timeout spikes during bank maintenance. Circuit breaker opened after 50% failures in 10-call window—fallback queued payments for retry, user saw "processing" not 504. Bulkhead limited 20 concurrent gateway calls—rest of system remained responsive.',
    productionCode: `@Service
public class PaymentClient {
    private final CircuitBreaker breaker;
    private final WebClient client;

    public PaymentClient(CircuitBreakerRegistry registry, WebClient client) {
        this.breaker = registry.circuitBreaker("paymentGateway");
        this.client = client;
    }

    public PaymentResult charge(PaymentRequest req) {
        Supplier<PaymentResult> decorated = CircuitBreaker
            .decorateSupplier(breaker, () -> client.post().uri("/charge")
                .bodyValue(req).retrieve().bodyToMono(PaymentResult.class).block());
        return Try.ofSupplier(decorated)
            .recover(CallNotPermittedException.class, ex -> PaymentResult.queued(req))
            .get();
    }
}`,
    executiveAnswer: 'I wrap every external dependency with timeout first, then circuit breaker, then bulkhead for isolation. I configure failure rate threshold from historical SLI—not defaults. Fallbacks must be business-meaningful—queued, cached, degraded mode—not null. I alert on breaker OPEN state in Grafana.',
    tradeOffs: 'Aggressive breaker causes false opens during brief blips—use slowCallDurationThreshold. Retry on non-idempotent POST dangerous without idempotency keys. Bulkhead too small causes artificial rejection.',
    followUps: [
      { q: 'Resilience4j vs Hystrix?', a: 'Hystrix maintenance mode—Netflix deprecated. Resilience4j lightweight, functional, Micrometer-native, no thread pool per command by default.' },
      { q: 'Half-open state behavior?', a: 'Limited probe calls allowed—success closes circuit, failure reopens. Prevents flood during recovery testing.' },
      { q: 'Retry with exponential backoff config?', a: 'RetryRegistry with maxAttempts, waitDuration, retryExceptions list—never retry on 4xx business errors.' }
    ]
  },

  // ========== Kafka & Messaging (6) ==========
  {
    category: 'Kafka & Messaging',
    title: 'Kafka vs RabbitMQ',
    scaleContext: 'Platform choice for 500K events/min order pipeline',
    whyArchitecture: 'Kafka is distributed commit log—durable, replayable, high throughput, consumer-driven pull with offset. RabbitMQ is message broker with exchanges/queues—push model, flexible routing, lower latency for task queues.\n\nChoosing wrong tool yields either inability to replay audit streams (Rabbit-only) or overkill ops for simple RPC (Kafka-only).\n\nKafka partitions enable parallel consumption; retention enables event sourcing. Rabbit excels at work queues, priority, DLX routing, lower operational footprint for moderate scale.',
    productionScenario: 'Order events needed 7-day replay for analytics backfill and multiple consumer groups (fulfillment, BI, search). RabbitMQ couldn\'t economically retain 500GB/week. Kafka with 12 partitions, 7-day retention, Schema Registry—fulfillment lag under 2s, replay rebuilt BI warehouse after bug fix without re-fetching source systems.',
    productionDiagram: `Kafka (log):  [Producer] --> [P0|P1|P2] --> CG1 (fulfillment)
                                      |          --> CG2 (analytics)
RabbitMQ:     [Producer] --> [Exchange] --> [Queue] --> [Consumer]`,
    executiveAnswer: 'I pick Kafka when events are facts I may re-read—audit, analytics, event sourcing, high volume fan-out. I pick Rabbit when I need routing flexibility, per-message ack, low-latency task distribution, or moderate volume with simpler ops. Hybrid is common: Kafka for event bus, Rabbit for job queues.',
    tradeOffs: 'Kafka ops heavier—ZooKeeper/KRaft, partition planning, rebalancing. Rabbit throughput ceiling lower; clustering complexity for HA. Kafka not ideal for classic request-reply without reply topics pattern.',
    followUps: [
      { q: 'Can RabbitMQ replay messages?', a: 'Not natively like Kafka—once acked and deleted from queue, gone unless shovel/plugin or persistent audit exchange with TTL limits.' },
      { q: 'Kafka message deleted after consume?', a: 'No—retention time/size based; consumers track offset independently. Multiple groups read same data.' },
      { q: 'When Kafka overkill?', a: 'Low volume (<1K/min), few consumers, no replay need, team lacks Kafka expertise—Rabbit or SQS simpler.' }
    ]
  },
  {
    category: 'Kafka & Messaging',
    title: 'Partitions & Consumer Groups',
    scaleContext: '24-partition order topic, 8 consumer instances',
    whyArchitecture: 'Partitions are unit of parallelism—one consumer in a group per partition max. Consumer group coordinates offset commits via group coordinator; rebalance assigns partitions on join/leave.\n\nMis-partitioning causes idle consumers or single hot partition bottleneck—10M msg/day on key skewed to one merchant.\n\nProducer chooses partition via key hash (same key → same partition → ordering per key). More partitions increase parallelism but also file handles and rebalance cost.',
    productionScenario: 'Order topic had 3 partitions, 10 consumers—7 idle, lag spiked during sale. Increased to 24 partitions keyed by customerId, scaled consumers to 8 (3 partitions each idle capacity). Rebalance storm during deploy fixed with cooperative-sticky assignor and static group membership.',
    productionCode: `@KafkaListener(topics = "orders", groupId = "fulfillment-v2",
    properties = {"max.poll.records=100", "session.timeout.ms=45000"})
public void consume(ConsumerRecord<String, OrderEvent> record, Acknowledgment ack) {
    fulfillmentService.process(record.value());
    ack.acknowledge();
}

// Producer: key = customerId for per-customer ordering
kafkaTemplate.send("orders", event.getCustomerId(), event);`,
    executiveAnswer: 'I size partitions for target parallelism and throughput—start with peak consumers needed, plan 2x headroom. Partition key is a design decision: customerId for order sequencing, null for round-robin load spread. I monitor consumer lag per partition—skew triggers key redesign or salt strategy.',
    tradeOffs: 'More partitions lengthen rebalance and increase end-to-end latency slightly. Cannot reduce partitions easily. One slow message blocks partition ordering unless parallel processing with careful design.',
    followUps: [
      { q: 'Consumers > partitions?', a: 'Extra consumers idle—max active equals partition count per group.' },
      { q: 'Multiple groups same topic?', a: 'Each group independent offsets—fulfillment and analytics both read full stream at own pace.' },
      { q: 'Cooperative vs eager rebalance?', a: 'Cooperative-sticky incremental rebalance reduces stop-the-world consumption pause during member changes—preferred in production.' }
    ]
  },
  {
    category: 'Kafka & Messaging',
    title: 'Consumer Crash Scenarios',
    scaleContext: 'Rolling deploy of 12 fulfillment consumers',
    whyArchitecture: 'Consumer crash mid-poll leaves uncommitted offsets—messages reprocessed after restart (at-least-once). Crash after process-before-commit causes duplicate. session.timeout.ms triggers rebalance assigning partitions to survivors.\n\nWithout idempotent handlers, duplicates create double shipments; without max.poll.interval.ms tuning, slow processing falsely marked dead.\n\nStatic membership (group.instance.id) reduces rebalance churn on brief restarts.',
    productionScenario: 'Consumer OOM during peak—partition reassigned mid-batch, 200 orders processed twice causing duplicate labels. Fix: idempotent consumer keyed by orderId in DB, reduced max.poll.records, heap fix, and manual commit after DB transaction commit.',
    productionCode: `@Transactional
public void processOrder(OrderEvent event) {
    if (processedEventRepository.existsByEventId(event.getId())) return;
    orderService.fulfill(event);
    processedEventRepository.save(new ProcessedEvent(event.getId()));
}

// Kafka: enable.auto.commit=false, commit after successful processing`,
    executiveAnswer: 'I assume at-least-once delivery and design consumers idempotent—natural keys, dedup table, or upsert semantics. I tune session.timeout and max.poll.interval to processing p99, never exceed poll interval on long jobs without pause/resume pattern. I use graceful shutdown hook to commit offsets and leave group cleanly on K8s preStop.',
    tradeOffs: 'Exactly-once Kafka transactions complex—latency and scope limited. Manual commit adds code burden. Frequent rebalance hurts throughput—cooperative assignor and static membership help.',
    followUps: [
      { q: 'What if processing exceeds max.poll.interval.ms?', a: 'Consumer kicked from group, rebalance, duplicate processing—use pause consumer, break work, or increase interval with longer session timeout balance.' },
      { q: 'Auto commit risks?', a: 'Commit interval may ack before processing completes—crash loses messages (at-most-once gap) or duplicates on retry depending on timing. Prefer manual sync commit post-success.' },
      { q: 'Poison message handling?', a: 'Retry N times then route to DLQ topic; don\'t block partition indefinitely—skip with audit after threshold.' }
    ]
  },
  {
    category: 'Kafka & Messaging',
    title: 'Message Ordering',
    scaleContext: 'Per-account transaction ordering for ledger integrity',
    whyArchitecture: 'Kafka guarantees order within partition only—not across partitions or topics. Same key routes to same partition preserving per-key FIFO. Global order requires single partition (bottleneck) or application-level sequencing.\n\nViolating key choice causes debit before credit reversed across partitions—balance corruption.\n\nConsumers single-threaded per partition preserve order; parallel processing within partition breaks it unless keyed sub-stages.',
    productionScenario: 'Wallet events keyed by userId maintained balance consistency. Analytics consumer keyed by null (round-robin) for throughput—order irrelevant. Mistakenly keyed wallet by timestamp—same user events scattered, intermittent negative balance in read model until fixed.',
    productionCode: `// Correct: accountId as key
producer.send(new ProducerRecord<>("wallet-events", accountId, event));

// Consumer: do not parallelize within partition
@KafkaListener(topics = "wallet-events")
public void onEvent(WalletEvent e) {
    ledger.apply(e); // single-threaded per partition assignment
}`,
    executiveAnswer: 'I document ordering guarantees explicitly per topic—usually per-entity key ordering. I never assume cross-partition order. For global sequencing I use database sequence or single partition accepting throughput cap. If I parallelize consumption, I partition work by key through entire pipeline.',
    tradeOffs: 'Hot keys create partition imbalance. Single partition limits throughput to one consumer. Out-of-order possible on retry—version fields or monotonic sequence detect stale applies.',
    followUps: [
      { q: 'Ordering across topics?', a: 'No Kafka guarantee—use Kafka Streams join with grace period, or correlation id and buffer in application, or single topic with event type field.' },
      { q: 'Compacted topic ordering?', a: 'Log compaction retains latest per key; ordering still per-partition; tombstones delete keys.' },
      { q: 'Producer retries reorder?', a: 'With max.in.flight.requests.per.connection>1 and retries, duplicates possible—enable idempotent producer (enable.idempotence=true) for ordering per partition.' }
    ]
  },
  {
    category: 'Kafka & Messaging',
    title: 'Idempotency',
    scaleContext: 'Payment events retried up to 5 times on network blip',
    whyArchitecture: 'Idempotency ensures duplicate delivery produces same outcome as once—via idempotency key store, natural unique constraints, or deterministic upsert. Messaging is at-least-once by default.\n\nWithout idempotency, retry storms double-charge customers or duplicate inventory decrements.\n\nPattern: producer idempotence (PID+sequence), consumer dedup table with TTL, HTTP Idempotency-Key header mirrored in events.',
    productionScenario: 'PaymentCompleted events duplicated 0.5% during broker leader election. Idempotency table (paymentId PK) with INSERT ON CONFLICT DO NOTHING before side effects reduced duplicate settlement from 120/day to zero.',
    productionCode: `@Service
public class PaymentEventHandler {
    public void handle(PaymentCompletedEvent e) {
        boolean first = idempotencyStore.tryMarkProcessed("payment:" + e.getPaymentId(), Duration.ofDays(7));
        if (!first) {
            log.info("Duplicate skipped {}", e.getPaymentId());
            return;
        }
        settlementService.settle(e);
    }
}`,
    executiveAnswer: 'I make every mutating consumer idempotent before enabling retries. Key is business identifier—orderId, paymentId—not offset. Store processed keys with TTL exceeding max redelivery window. Combine with outbox for exactly-once publish from DB perspective.',
    tradeOffs: 'Dedup store adds storage and lookup latency—Redis or DB index. TTL too short allows late duplicate; too long grows table. Idempotent producer doesn\'t replace consumer idempotency.',
    followUps: [
      { q: 'Idempotent producer vs consumer idempotency?', a: 'Producer prevents duplicate writes to Kafka partition during retry; consumer still sees duplicates from rebalance/reprocess—both layers needed.' },
      { q: 'Redis SETNX for dedup?', a: 'Works with TTL for high throughput; risk loss on Redis failure—persist critical keys in DB or use Redis with AOF/replication.' },
      { q: 'Idempotency key in REST to Kafka flow?', a: 'Propagate same key from API header through outbox event envelope—end-to-end dedup correlation.' }
    ]
  },
  {
    category: 'Kafka & Messaging',
    title: 'Dead Letter Queue',
    scaleContext: '2K poison messages/day isolated from main flow',
    whyArchitecture: 'DLQ routes messages failing processing after N retries to separate topic/queue for inspection, replay, or discard—prevents single bad payload blocking partition forever.\n\nWithout DLQ, head-of-line blocking stalls consumer lag indefinitely or operators skip offsets losing data.\n\nKafka: DLT pattern with @RetryableTopic or manual send to orders.DLT. Rabbit: dead-letter-exchange binding.',
    productionScenario: 'Malformed JSON from legacy producer crashed deserializer—entire fulfillment group lagged 6 hours. RetryableTopic routed to orders-fulfillment-dlt after 3 attempts with backoff; main flow continued; ops replayed 180 messages after schema fix.',
    productionCode: `@RetryableTopic(
    attempts = "3",
    backoff = @Backoff(delay = 1000, multiplier = 2),
    dltTopicSuffix = "-dlt",
    include = {ValidationException.class})
@KafkaListener(topics = "orders")
public void listen(OrderEvent event) {
    fulfillmentService.process(event);
}`,
    executiveAnswer: 'I always pair consumers with DLQ and alerting on DLT growth rate. DLT messages retain original headers, failure reason, stack trace hash—not full PII. Runbook covers replay tooling with transformation, quarantine for toxic messages, and metrics dashboard.',
    tradeOffs: 'DLT can become graveyard without ops process. Replay risks duplicate if source not idempotent. Storage cost for retained failures—set retention and archival policy.',
    followUps: [
      { q: 'DLQ vs skip bad offset?', a: 'Skip loses message permanently—only for truly expendable data. DLQ preserves for investigation and replay.' },
      { q: 'Who consumes DLT?', a: 'Separate admin replay service or manual CLI—not same consumer group auto-loop which could infinite loop.' },
      { q: 'RabbitMQ DLX vs Kafka DLT?', a: 'Rabbit DLX automatic on nack/reject TTL. Kafka requires application or Spring RetryableTopic to publish to companion topic.' }
    ]
  },

  // ========== Database & JPA (5) ==========
  {
    category: 'Database & JPA',
    title: 'First-Level vs Second-Level Cache',
    scaleContext: 'Product catalog 500K entities, 80% read traffic',
    whyArchitecture: 'L1 cache is Persistence Context scoped to EntityManager/session—identity map ensures one row one object per transaction. L2 cache is SessionFactory-scoped shared across transactions (Ehcache, Caffeine via Hibernate)—caches entity state by id.\n\nWithout L2, repeated reads same entity across requests hit DB. With wrong cache on high-churn data, stale reads corrupt business logic.\n\nQuery cache (optional) caches id lists—invalidation tricky on any table change.',
    productionScenario: 'Category tree fetched 10K times/min—L1 useless across requests. Enabled @Cacheable on Category with READ_ONLY concurrency, region TTL 1h, reduced DB reads 92%. Order entity explicitly NOT cached—financial consistency requirement.',
    productionCode: `@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Category {
    @Id private Long id;
    private String name;
}

// application.yml
// spring.jpa.properties.hibernate.cache.use_second_level_cache=true
// spring.jpa.properties.hibernate.cache.region.factory_class=...JCacheRegionFactory`,
    executiveAnswer: 'I enable L2 only for reference data with clear invalidation—catalog, config, ISO codes. L1 always on within @Transactional read. I never cache mutable financial entities in L2 without versioning. I measure hit ratio via Hibernate stats or Micrometer—not blind enable.',
    tradeOffs: 'L2 stale data, cluster invalidation complexity in distributed cache. Memory footprint. Query cache often more pain than gain—prefer explicit @Cacheable at service layer with Redis for cross-pod consistency.',
    followUps: [
      { q: 'L1 across @Transactional methods?', a: 'New persistence context per transaction in default Spring—L1 not shared unless same extended persistence context (avoid OSIV for writes).' },
      { q: 'READ_WRITE vs NONSTRICT_READ_WRITE?', a: 'READ_WRITE soft locks for updates; NONSTRICT allows brief stale reads—pick by tolerance. READ_ONLY for immutable reference data.' },
      { q: 'Spring @Cacheable vs Hibernate L2?', a: '@Cacheable caches method results (DTOs possible); L2 caches entity state inside Hibernate—different layers, can combine.' }
    ]
  },
  {
    category: 'Database & JPA',
    title: 'N+1 Problem',
    scaleContext: 'Order list API returning 500 orders with line items',
    whyArchitecture: 'N+1: 1 query for parent list + N lazy loads for each child—501 queries. Caused by LAZY @OneToMany accessed outside batch fetch or open session in view masking issue until production load.\n\nWithout fix, DB connection pool exhausts, p99 latency explodes.\n\nFixes: JOIN FETCH in JPQL, @EntityGraph, batch size (@BatchSize or hibernate.default_batch_fetch_size), DTO projection, or explicit query.',
    productionScenario: 'GET /orders returned 500 orders—Hibernate issued 501 SELECTs, 4s response, pool timeout errors. @EntityGraph(attributePaths={"lineItems"}) on repository method dropped to 1 query with join, 80ms p95.',
    productionCode: `public interface OrderRepository extends JpaRepository<Order, Long> {
    @EntityGraph(attributePaths = {"lineItems", "customer"})
    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findByStatusWithDetails(@Param("status") OrderStatus status);
}

// Alternative: @BatchSize(size = 50) on Order.lineItems collection`,
    executiveAnswer: 'I detect N+1 via Hibernate statistics, datasource-proxy query count, or integration test asserting query limit. I prefer entity graph or fetch join for read paths; DTO projections for list screens never needing full entity graph. I disable OSIV and fix at repository layer.',
    tradeOffs: 'JOIN FETCH cartesian product risk on multiple bags—use Set, separate queries, or @BatchSize. Over-fetching large graphs wastes memory—DTO for lists, entity for detail view.',
    followUps: [
      { q: 'Why OSIV hides N+1?', a: 'Session open entire HTTP request—lazy load works but fires N queries during JSON serialization—problem deferred to production latency.' },
      { q: 'Multiple bag fetch exception?', a: 'Cannot JOIN FETCH two List collections—Hibernate Cartesian product. Use @BatchSize, two queries, or Tuple/DTO.' },
      { q: 'N+1 in GraphQL?', a: 'DataLoader batches keys per request—same problem, standard fix batching resolver loads.' }
    ]
  },
  {
    category: 'Database & JPA',
    title: 'Query Optimization',
    scaleContext: 'Reporting query scanning 80M row ledger table',
    whyArchitecture: 'Optimization starts with EXPLAIN ANALYZE—seq scan vs index scan, rows estimate, join order. JPA generates SQL opaque to devs—logging show-sql insufficient without formatting and statistics.\n\nWithout optimization, correct functional code misses SLA—full table scans on pagination, functions on indexed columns preventing index use.\n\nTechniques: covering indexes, partial indexes, pagination via keyset not OFFSET, native query for reports, read replicas, materialized views.',
    productionScenario: 'findByCreatedDateBetween with ORDER BY created DESC OFFSET 100000 caused 30s scans. Keyset pagination WHERE created < :cursor ORDER BY created DESC LIMIT 50 plus composite index (status, created DESC) cut to 15ms.',
    productionCode: `@Query(value = """
    SELECT * FROM ledger l
    WHERE l.status = :status AND l.created_at < :cursor
    ORDER BY l.created_at DESC
    LIMIT :limit
    """, nativeQuery = true)
List<LedgerRow> findPage(@Param("status") String status,
                         @Param("cursor") Instant cursor,
                         @Param("limit") int limit);`,
    executiveAnswer: 'I treat ORM as convenience not excuse to ignore SQL plans. Every slow query gets EXPLAIN in staging with production-like stats. I index for query patterns not columns alphabetically. Heavy analytics bypass JPA—JdbcTemplate or warehouse. I watch hibernate query plan cache and connection hold time.',
    tradeOffs: 'Native queries lose portability and change detection. Over-indexing slows writes. Keyset pagination complicates API—clients need cursor tokens.',
    followUps: [
      { q: 'LIKE \'%term\' index use?', a: 'Leading wildcard prevents B-tree index use—consider trigram GIN (PostgreSQL) or full-text search engine.' },
      { q: 'JPA pagination Pageable offset cost?', a: 'OFFSET N skips N rows—O(n) degradation. Keyset (seek) pagination O(1) per page.' },
      { q: 'When denormalize?', a: 'Read-heavy dashboards, when join cost exceeds update rarity—maintain via events or triggers with consistency checks.' }
    ]
  },
  {
    category: 'Database & JPA',
    title: 'Indexing & Execution Plans',
    scaleContext: 'PostgreSQL 2TB orders table, 5K TPS writes',
    whyArchitecture: 'B-tree index default for equality/range; composite index column order matters—leftmost prefix rule. Execution plan reveals Seq Scan, Index Scan, Bitmap Heap Scan, cost estimates.\n\nMissing index: slow reads. Wrong index: slow writes, unused index bloat wasting IO.\n\nPartial index for hot subset (WHERE status=\'PENDING\'). Covering index INCLUDE columns avoids heap fetch.',
    productionScenario: 'Query filtered status IN (\'PENDING\',\'PROCESSING\') and customer_id—single column indexes merged bitmap slow at scale. Composite INDEX idx_orders_status_customer (status, customer_id, created_at DESC) enabled index-only scan—10x faster, write overhead acceptable at 3% CPU.',
    productionCode: `-- Migration
CREATE INDEX CONCURRENTLY idx_orders_status_customer_created
ON orders (status, customer_id, created_at DESC)
WHERE deleted_at IS NULL;

-- Verify
EXPLAIN (ANALYZE, BUFFERS)
SELECT id FROM orders
WHERE status = 'PENDING' AND customer_id = $1
ORDER BY created_at DESC LIMIT 20;`,
    executiveAnswer: 'I index based on actual query plans from pg_stat_statements, not guessing. Composite order matches equality filters first, range last. I use CONCURRENTLY in prod migrations. I drop unused indexes quarterly—each index taxes every insert.',
    tradeOffs: 'Indexes consume disk and slow writes. Overlapping redundant indexes confuse planner. Statistics drift—run ANALYZE, monitor plan regressions after bulk load.',
    followUps: [
      { q: 'Hash index vs B-tree PostgreSQL?', a: 'Hash only equality, rarely used—B-tree default for most cases. BRIN for very large append-only time series.' },
      { q: 'Index never used but query slow?', a: 'Check selectivity threshold, stale stats, function wrap on column, type mismatch implicit cast, or LIMIT making seq scan cheaper.' },
      { q: 'JPA @Index annotation?', a: 'DDL generation for dev; production use Flyway/Liquibase with CONCURRENTLY and review—not auto-ddl update.' }
    ]
  },
  {
    category: 'Database & JPA',
    title: 'Optimistic vs Pessimistic Locking',
    scaleContext: 'Concurrent seat booking and wallet debit operations',
    whyArchitecture: 'Optimistic: version column (@Version), transaction fails on stale update—no DB lock held during read, high concurrency, retry on conflict. Pessimistic: SELECT FOR UPDATE locks row—prevents concurrent modification, risks deadlock and reduced throughput.\n\nWrong choice: optimistic retry storms on hot rows; pessimistic lock queues killing latency.\n\nJPA: @Version automatic increment; LockModeType.PESSIMISTIC_WRITE on find.',
    productionScenario: 'Inventory count 100 units, flash sale 500 concurrent buys—optimistic locking with @Version on ProductStock, 400 get OptimisticLockException, service retries 3x with jitter, 100 succeed—no DB row lock contention. Account debit used pessimistic lock on wallet row—financial correctness over retry UX.',
    productionCode: `@Entity
public class ProductStock {
    @Id private Long productId;
    private int quantity;
    @Version private Long version;
}

@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT w FROM Wallet w WHERE w.id = :id")
Optional<Wallet> findByIdForUpdate(@Param("id") UUID id);`,
    executiveAnswer: 'I default optimistic for most business entities—conflicts rare, throughput high. Pessimistic for true contended resources: wallet balance, sequential number generation, seat map row. I implement retry with exponential backoff for optimistic conflicts and set lock timeout for pessimistic to avoid indefinite wait.',
    tradeOffs: 'Optimistic user-facing retries need UX. Pessimistic deadlocks require ordering locks consistently. SKIP LOCKED useful for job queue patterns.',
    followUps: [
      { q: '@Version without user handling exception?', a: 'OptimisticLockException propagates—transaction rolls back. Must catch and retry or return 409 Conflict to client.' },
      { q: 'Pessimistic lock in @Transactional readOnly?', a: 'Contradiction—pessimistic lock requires write transaction. readOnly may optimize away lock—never combine incorrectly.' },
      { q: 'Distributed lock vs DB pessimistic?', a: 'DB lock simpler for single database consistency; Redis Redlock for cross-service resource—prefer DB when data already there.' }
    ]
  },

  // ========== System Design (6) ==========
  {
    category: 'System Design',
    title: 'Payment/NEFT Processing System',
    scaleContext: 'RBI-compliant NEFT batch window, 200K transfers/night',
    whyArchitecture: 'NEFT is batch-oriented deferred settlement—collect requests, validate, submit to NPCI window, handle ACK/NACK, reconcile. Requires idempotency, audit trail, dual control, and cut-off time handling.\n\nWithout batch orchestration, duplicate submissions or missed cut-off cause customer money stuck in limbo.\n\nArchitecture: ingestion API → validation → outbox → batch builder → SFTP/API to clearing → status poller → customer notification. Ledger double-entry atomic per transfer.',
    productionScenario: 'Bank NEFT hub processed corporate payroll—API accepted transfers 24/7, queued in PostgreSQL with state machine (ACCEPTED→BATCHED→SUBMITTED→SETTLED/FAILED). Cut-off scheduler locked batch at 17:00 IST, SFTP upload, morning reconcile file matched 99.97% auto, exceptions queue for ops.',
    productionDiagram: `[Client API] --> [Validation] --> [Outbox/Queue]
                                      |
                               [Batch Builder] --> [NPCI/SFTP]
                                      |
                               [Status Poller] --> [Ledger Post]
                                      |
                               [Notification Svc]`,
    executiveAnswer: 'I design payment rails as state machines with immutable audit events—not boolean paid flags. Every transfer has idempotency key, explicit cut-off handling, and reconciliation as first-class job comparing bank file vs internal ledger. Never update balance before confirmed settlement unless business rules allow float with risk controls.',
    tradeOffs: 'Batch windows add latency vs instant RTP. SFTP legacy integration fragile—monitor ACK files. Regulatory reporting mandates retention and PII encryption at rest/transit.',
    followUps: [
      { q: 'NEFT vs IMPS vs UPI architecturally?', a: 'NEFT batch deferred; IMPS real-time 24x7 smaller cap; UPI push/pull instant via PSP—different SLA, reconciliation, and idempotency windows.' },
      { q: 'How handle partial batch failure?', a: 'Item-level status in batch file; successful posts commit individually; failed items retry next window with customer notification.' },
      { q: 'Double-entry where?', a: 'Single DB transaction: debit source escrow, credit pending NEFT payable; on SETTLED move to beneficiary, on FAIL reverse.' }
    ]
  },
  {
    category: 'System Design',
    title: 'Handling 1M+ Transactions Daily',
    scaleContext: '1.2M txn/day (~14 TPS avg, 200 TPS peak)',
    whyArchitecture: 'Scale via horizontal sharding/partitioning, async decoupling, read replicas, caching hot keys, and idempotent ingestion. Bottleneck moves from app to DB writes, then to single partition hot spots.\n\nWithout partition strategy, single PostgreSQL primary saturates IO; without async, peak overwhelms sync chain.\n\nDesign: API → Kafka → consumer groups → sharded DB by tenant/region; CQRS for reporting; rate limit at edge.',
    productionScenario: 'Fintech ledger hit 800K txn/day growing 40% YoY. Partitioned PostgreSQL by hash(customer_id) 8 shards, Kafka 32 partitions, async write path with sync read from materialized balance cache (Redis) with DB authoritative reconcile hourly—peak 180 TPS sustained p99 write 120ms.',
    productionDiagram: `[API GW] --> [Ingest Svc] --> Kafka --> [Writer Pool]
                                              |
                                    [Shard Router] --> DB Shard 0..7
                                              |
                                    [Redis Balance Cache] <-- read path`,
    executiveAnswer: 'I capacity-plan from peak not average—1M/day is ~12 avg TPS but marketing spikes 50x. I shard by access pattern key, buffer writes in Kafka for backpressure, and separate OLTP from analytics via CDC to warehouse. Autoscale consumers on lag, not CPU alone.',
    tradeOffs: 'Sharding complicates cross-shard queries and transactions—design around single-shard transactions. Cache inconsistency windows need reconciliation. Kafka ops overhead justified at this volume.',
    followUps: [
      { q: 'When single PostgreSQL enough?', a: 'Often until ~5-10K TPS write with proper indexing and connection pooling—1M/day usually single DB with async if peaks moderate.' },
      { q: 'UUID vs snowflake IDs at scale?', a: 'Time-sortable IDs (snowflake, ULID) improve index locality vs random UUID v4—reduce B-tree page splits.' },
      { q: 'Backpressure signal?', a: 'Kafka consumer lag, thread pool queue depth, DB connection wait—scale consumers or shed load at gateway with 429.' }
    ]
  },
  {
    category: 'System Design',
    title: 'Saga Pattern vs 2PC',
    scaleContext: 'Order → Payment → Inventory → Shipping distributed flow',
    whyArchitecture: '2PC (two-phase commit) coordinates prepare/commit across DBs—blocking, fragile, poor availability (XA transactions). Saga breaks transaction into local TXs with compensating actions on failure—eventual consistency.\n\nWithout saga, partial failure leaves payment captured but no order—manual reconciliation nightmare.\n\nChoreography: events trigger next step. Orchestration: central saga manager directs steps and compensations.',
    productionScenario: 'Travel booking: orchestrated saga held flight seat (T1), charged card (T2), on hotel failure ran compensate release seat + refund payment. Stored saga state in saga_instance table, timeout job for stuck sagas—99.2% auto-complete, 0.8% manual intervention queue.',
    productionCode: `@SagaOrchestrationStart
public void bookTrip(BookingRequest req) {
    saga.start()
        .step("holdFlight", this::holdFlight, this::releaseFlight)
        .step("chargePayment", this::charge, this::refund)
        .step("bookHotel", this::bookHotel, this::cancelHotel)
        .execute(req);
}`,
    executiveAnswer: 'I never use 2PC/XA across microservices in cloud—availability killer. I choose orchestrated saga when flow complex with compensations; choreography when steps simple and teams autonomous. Every step idempotent, compensations semantic not literal undo (refund not delete charge row).',
    tradeOffs: 'Saga complexity, visible intermediate states, compensations not always possible (email sent). Orchestrator single point—must HA. Testing all failure permutations exhaustive.',
    followUps: [
      { q: 'Saga vs eventual consistency without pattern?', a: 'Ad-hoc retries leave ambiguous states—saga formalizes state machine, compensations, and monitoring of in-progress instances.' },
      { q: 'When 2PC acceptable?', a: 'Single vendor distributed DB (Spanner) or monolith single database— not classical microservice XA.' },
      { q: 'Parallel saga steps?', a: 'Possible when no dependency—join gateway before next step; failure triggers parallel compensations in reverse order.' }
    ]
  },
  {
    category: 'System Design',
    title: 'Data Consistency Across Services',
    scaleContext: 'Customer profile replicated to billing, support, marketing',
    whyArchitecture: 'Cross-service strong consistency impractical—network partitions force CAP tradeoff. Patterns: transactional outbox (atomic DB write + event), CDC, event-carried state transfer, sagas for cross-aggregate workflows.\n\nWithout outbox, dual-write DB+kafka risks orphan records—crash after DB commit before publish.\n\nRead models eventual—display stale avatar seconds acceptable; balance not acceptable without sync read path.',
    productionScenario: 'Customer address change: update Customer DB + outbox in one transaction; Debezium/outbox relay publishes CustomerUpdated; billing and support consumers upsert local projection. Max staleness 3s p99, monitored via event age metric.',
    productionDiagram: `[Customer Svc DB] --same TX--> [outbox table]
                              |
                         [Relay/Poller] --> Kafka --> [Billing Projection]
                                              --> [Support Projection]`,
    executiveAnswer: 'I classify data by consistency tier—authoritative source single service, others projections. Outbox pattern for reliable publish. Sync API call only when user waits for cross-domain answer (fraud check). I measure staleness SLI and document UX for eventual reads.',
    tradeOffs: 'Projections duplicate data—schema drift risk without contract tests. Sync calls couple availability. Strong consistency across services requires redesign to monolith or shared DB anti-pattern.',
    followUps: [
      { q: 'Outbox vs CDC?', a: 'Outbox explicit event intent in application transaction; CDC captures all row changes—CDC simpler but noisier, outbox curated domain events.' },
      { q: 'Read-your-writes problem?', a: 'Route user read to owning service or version token after write; cache invalidation on event.' },
      { q: 'CRDTs when applicable?', a: 'Collaborative counters, carts merge without lock—niche; financial ledger not CRDT suitable.' }
    ]
  },
  {
    category: 'System Design',
    title: 'Distributed Locking',
    scaleContext: 'Single cron leader among 6 scheduler pods',
    whyArchitecture: 'Distributed lock ensures one actor performs critical section across JVMs—leader election, inventory decrement serialization. Redis Redisson, ZooKeeper ephemeral nodes, DB advisory locks.\n\nWithout lock, duplicate cron jobs double-charge fees or duplicate file processing.\n\nMust handle lock expiry vs process pause (fencing token)—stale lock holder must not commit after losing lock.',
    productionScenario: 'Nightly interest accrual ran on all 6 pods simultaneously—duplicate postings. Redis lock with SET NX PX and Redisson watchdog renewal plus fencing token written to ledger row—only highest token commits. Missed duplicate incidents since deployment.',
    productionCode: `public void runAccrualJob() {
    RLock lock = redisson.getLock("job:interest-accrual");
    if (lock.tryLock(0, 30, TimeUnit.MINUTES)) {
        try {
            long fence = fencingService.nextToken();
            accrualService.process(fence);
        } finally {
            lock.unlock();
        }
    }
}`,
    executiveAnswer: 'I use distributed locks sparingly—prefer idempotent design and partition assignment (Kafka consumer) first. When needed, Redis Redisson with lease, watchdog, and fencing token for DB writes. Never infinite lock TTL; always tryLock with skip if not leader.',
    tradeOffs: 'Redis lock not CP under partition—Redlock debated. DB advisory lock simpler but DB load. Lock contention reduces parallelism—shard work instead.',
    followUps: [
      { q: 'Redlock safe?', a: 'Martin Kleppmann critique valid for strict correctness—use fencing tokens with storage; or ZooKeeper/etcd for CP lock when critical.' },
      { q: 'K8s leader election alternative?', a: 'Lease API or Spring Integration leader—native for cron without Redis dependency if cluster-bound.' },
      { q: 'Lock vs database unique constraint?', a: 'Unique constraint idempotent insert achieves mutual exclusion for many cases—simpler than explicit lock.' }
    ]
  },
  {
    category: 'System Design',
    title: 'Redis Caching',
    scaleContext: 'Product catalog cache 2M SKUs, 40K read RPS',
    whyArchitecture: 'Redis in-memory sub-ms reads offload DB, session store, rate limit counters, pub/sub. Cache-aside: app reads cache, miss loads DB, writes cache. Write-through/invalidate on update.\n\nWithout TTL and invalidation, stale prices cause legal/commercial issues; without cache stampede protection, hot key miss thundering herds DB.\n\nStructures: String JSON, Hash for objects, Sorted Set for leaderboards, HyperLogLog for cardinality.',
    productionScenario: 'E-commerce PLP hit PostgreSQL 35K RPS—p99 400ms. Redis cache-aside with 5min TTL, jitter, singleflight lock on miss (SETNX rebuild), pub/sub invalidation on price update—cache hit 94%, p99 12ms, DB load down 90%.',
    productionCode: `public Product getProduct(String sku) {
    String key = "product:" + sku;
    Product cached = redisTemplate.opsForValue().get(key);
    if (cached != null) return cached;
    if (lockService.tryAcquire("lock:" + sku, Duration.ofSeconds(5))) {
        try {
            Product p = productRepo.findById(sku).orElseThrow();
            redisTemplate.opsForValue().set(key, p, Duration.ofMinutes(5).plusMillis(randomJitter()));
            return p;
        } finally { lockService.release("lock:" + sku); }
    }
    Thread.sleep(50);
    return getProduct(sku); // brief retry
}`,
    executiveAnswer: 'I cache read-heavy, tolerate-stale data with explicit TTL aligned to business—not infinite. Invalidate on write for strong requirements (price, inventory display). I monitor hit rate, memory eviction, and hot keys. Redis Cluster for HA sharding when single node memory insufficient.',
    tradeOffs: 'Memory cost, cache coherence complexity, Redis outage fallback strategy needed (circuit breaker to DB). Large values cause latency—compress or shard. Not authoritative store unless Redis persistence + risk acceptance.',
    followUps: [
      { q: 'Cache-aside vs read-through?', a: 'Cache-aside: app manages both. Read-through: cache library loads on miss—less app code, harder custom logic.' },
      { q: 'Thundering herd solution?', a: 'Probabilistic early expiration, mutex singleflight rebuild, request coalescing, pre-warm before TTL expiry.' },
      { q: 'Redis vs Caffeine local cache?', a: 'Caffeine for JVM-local hot data zero network; Redis for shared cross-pod consistency.' }
    ]
  },

  // ========== Production & DevOps (6) ==========
  {
    category: 'Production & DevOps',
    title: 'Docker',
    scaleContext: '120 microservices containerized, multi-stage builds',
    whyArchitecture: 'Docker packages app + dependencies immutable image—consistent dev/prod, fast deploy, isolation. Layers cache build; non-root user security; distroless/minimal base reduces attack surface.\n\nWithout containers, dependency drift causes works-on-my-machine prod failures.\n\nMulti-stage: builder JDK+Maven, runtime JRE-only 200MB vs 800MB fat image. HEALTHCHECK, explicit ENTRYPOINT, no secrets in layers.',
    productionScenario: 'Spring Boot JAR in eclipse-temurin:17-jre-alpine, non-root user, dumb-init for signal handling, image 180MB vs previous 950MB full JDK—deploy time 40s to 12s on K8s, CVE scan surface reduced 60%.',
    productionCode: `FROM eclipse-temurin:17-jre-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --chown=app:app target/app.jar app.jar
USER app
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "app.jar"]`,
    executiveAnswer: 'I treat Dockerfile as production code—multi-stage, pinned digests not floating latest, scan in CI with Trivy. JVM containers get UseContainerSupport and memory limits matching K8s requests. One process per container; config via env vars from K8s secrets, never baked in.',
    tradeOffs: 'Alpine musl rare JNI issues—test thoroughly. Layer caching wrong order invalidates cache. Debug harder than VM—need exec into pod and attach tools sidecar.',
    followUps: [
      { q: 'COPY vs ADD?', a: 'COPY preferred—explicit. ADD auto-extracts tar and fetches URLs—surprising behavior avoid in prod Dockerfiles.' },
      { q: 'JVM heap in container?', a: 'UseContainerSupport reads cgroup limits; set MaxRAMPercentage not raw -Xmx exceeding limit causes OOMKill.' },
      { q: 'Dev docker-compose vs prod K8s?', a: 'Compose for local dependencies; prod K8s manifests/Helm—parity via same image tag promoted through environments.' }
    ]
  },
  {
    category: 'Production & DevOps',
    title: 'Kubernetes Basics',
    scaleContext: 'EKS cluster 200 pods, HPA autoscaling',
    whyArchitecture: 'K8s orchestrates containers—Deployment rolling updates, Service stable DNS, Ingress north-south traffic, ConfigMap/Secret config, HPA scales on metrics. Declarative desired state reconciled by controllers.\n\nWithout K8s, manual deploy scripts, no self-healing, uneven resource utilization across VMs.\n\nPod lifecycle: probe failures restart; readiness removes from Service endpoints; preStop graceful drain.',
    productionScenario: 'Payment service Deployment replicas 3→10 via HPA on CPU 70% and custom Kafka lag metric. Rolling update maxSurge 1 maxUnavailable 0—zero downtime deploys. PodDisruptionBudget minAvailable 2 during node drain—maintained SLA through cluster upgrade.',
    productionDiagram: `[Ingress] --> [Service: payment-svc] --> [Pod][Pod][Pod]
                                              |
                                         [HPA] <-- metrics-server
                                         [Deployment]`,
    executiveAnswer: 'I define requests/limits on every pod—unbounded JVM OOMs neighbor pods. Readiness gates traffic until app healthy; liveness only for deadlock detection not slow startup. I use PDB, anti-affinity for AZ spread, and external secrets operator—not plain K8s Secret in git.',
    tradeOffs: 'Complexity steep—YAML sprawl without Helm/Kustomize. Networking debugging hard. Stateful workloads need StatefulSet and persistent volumes—operational overhead.',
    followUps: [
      { q: 'Readiness vs liveness?', a: 'Readiness: can serve traffic? Remove from LB if fails. Liveness: deadlocked? Restart pod. Wrong liveness kills slow starting apps.' },
      { q: 'ClusterIP vs NodePort vs LoadBalancer?', a: 'ClusterIP internal default; LoadBalancer cloud LB for external; Ingress routes HTTP paths to multiple services.' },
      { q: 'Rolling update stuck?', a: 'Check readiness probe, image pull, resource quota, PDB blocking—kubectl rollout status and describe pod events.' }
    ]
  },
  {
    category: 'Production & DevOps',
    title: 'Log Monitoring ELK/Splunk',
    scaleContext: '50GB logs/day across 300 pods',
    whyArchitecture: 'Centralized logging aggregates structured JSON logs—search, correlate by traceId, alert on patterns. ELK: Elasticsearch store, Logstash/Fluentd ship, Kibana visualize. Splunk enterprise alternative with SPL.\n\nWithout central logs, incident debug requires SSH pod-by-pod grep—MTTR hours not minutes.\n\nStructured logging (Logback JSON), MDC correlationId/requestId, log levels prod INFO not DEBUG flood.',
    productionScenario: 'Payment failures spiked—Kibana query status:FAILED AND gateway:neft last 15min isolated bad release correlationId cluster. Splunk alert on ERROR rate > baseline 3sigma paged on-call in 4min vs previous 45min manual triage.',
    productionCode: `// logback-spring.xml pattern with JSON encoder
// MDC in filter:
MDC.put("traceId", traceContext.getTraceId());
MDC.put("customerId", hashForLog(customerId));
log.info("Payment submitted amount={} rail=NEFT", amount);`,
    executiveAnswer: 'I enforce structured JSON logs with traceId, spanId, service, environment—never parse plain text in prod. PII masked or tokenized. Retention tiered: hot 7d search, warm 90d compliance, cold S3 archive. Alerts on business KPIs in logs (payment failure rate) not just ERROR count.',
    tradeOffs: 'Cost scales with volume—sampling for debug, dynamic log level APIs. Elasticsearch cluster ops heavy. Log injection if user input logged unsanitized—sanitize fields.',
    followUps: [
      { q: 'ELK vs Loki?', a: 'Loki indexes labels not full text—cheaper Kubernetes-native; ELK richer full-text search for complex investigations.' },
      { q: 'traceId propagation?', a: 'Micrometer Tracing/OpenTelemetry from gateway through MDC and outgoing HTTP/Kafka headers—join logs and traces in Grafana Tempo/Jaeger.' },
      { q: 'DEBUG in production?', a: 'Transient enable per pod via Spring Boot Actuator loggers endpoint—never global permanent DEBUG—cost and PII risk.' }
    ]
  },
  {
    category: 'Production & DevOps',
    title: 'Rate Limiting',
    scaleContext: 'Public API 10K partners, burst protection 5K RPS',
    whyArchitecture: 'Rate limiting protects backend from abuse and noisy neighbors—token bucket, sliding window, fixed window algorithms. Enforce at gateway (Redis Lua atomic incr) or service mesh.\n\nWithout limits, one partner bulk sync takes down platform for all—no fairness.\n\nReturn 429 with Retry-After header; differentiate by API key tier; combine with circuit breaker on downstream.',
    productionScenario: 'Spring Cloud Gateway RedisRateLimiter 100 req/s per API key, 1000 burst. Enterprise tier 500 req/s. Partner hit limit got 429 with Retry-After: 1—client SDK exponential backoff. DDoS layer Cloudflare before gateway—origin protected.',
    productionCode: `@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("api", r -> r.path("/api/**")
            .filters(f -> f.requestRateLimiter(c -> c
                .setRateLimiter(redisRateLimiter())
                .setKeyResolver(exchange -> exchange.getRequest()
                    .getHeaders().getFirst("X-Api-Key"))))
            .uri("lb://backend"))
        .build();
}`,
    executiveAnswer: 'I rate limit at edge by authenticated identity not just IP—NAT shared IPs unfair. Token bucket allows controlled burst for legitimate traffic. I expose limit headers X-RateLimit-Remaining for client UX and alert when clients consistently 429—capacity planning signal.',
    tradeOffs: 'Redis SPOF for limit state—cluster needed. Global vs per-region limits diverge. Too aggressive loses revenue from good clients; too loose useless.',
    followUps: [
      { q: 'Token bucket vs sliding window?', a: 'Token bucket smooth burst allowance; sliding window accurate count per rolling period—Redis sorted set timestamps implementation.' },
      { q: 'Rate limit vs throttle queue?', a: 'Limit rejects fast 429; queue delays request—queue risks backlog memory, use for async not sync API.' },
      { q: 'Distributed rate limit accuracy?', a: 'Redis central counter approximate at extreme scale—local token bucket with async sync tradeoff for micro-limit per pod.' }
    ]
  },
  {
    category: 'Production & DevOps',
    title: 'CI/CD Basics',
    scaleContext: 'GitLab pipeline 80 services, 20 deploys/day',
    whyArchitecture: 'CI: commit triggers build, unit test, integration test, security scan, artifact publish. CD: deploy to staging auto, prod manual approval or canary. Immutable artifacts promoted not rebuilt per env.\n\nWithout CI/CD, manual deploys skip tests, config drift, rollback slow.\n\nPipeline stages parallelized; fail fast on lint; semantic versioning; feature flags decouple deploy from release.',
    productionScenario: 'Maven build → Testcontainers integration → Trivy image scan → push to ECR tag git SHA → Helm upgrade staging → smoke test → manual prod gate → ArgoCD sync canary 10%→50%→100% with Prometheus error rate rollback hook.',
    productionDiagram: `[Git Push] --> [Build/Test] --> [Docker Push]
                                  |
                            [Deploy Staging] --> [Smoke]
                                  |
                            [Deploy Prod Canary] --> [Prometheus Check] --> [Full Rollout]`,
    executiveAnswer: 'I optimize pipeline for feedback speed—unit tests under 5min, flaky tests quarantined. Same container image through all environments. Database migrations backward compatible expand-contract. Rollback is redeploy previous tag not hotfix branch panic.',
    tradeOffs: 'Pipeline maintenance cost. Testcontainers slow—parallelize. Over-automation to prod without gates risky for regulated industries.',
    followUps: [
      { q: 'Blue-green vs canary?', a: 'Blue-green instant switch two envs; canary gradual traffic shift with metric guard—canary safer for subtle bugs.' },
      { q: 'Database migration in CI/CD?', a: 'Flyway in pipeline job before app deploy; backward compatible migrations only—app works with old and new schema during rollout.' },
      { q: 'Artifact immutability why?', a: 'Rebuild for prod risks different bytecode than tested staging—promote exact SHA image.' }
    ]
  },
  {
    category: 'Production & DevOps',
    title: 'Health Checks & Observability',
    scaleContext: 'SLA 99.9% with full RED/USE metrics stack',
    whyArchitecture: 'Health checks: liveness (alive?), readiness (ready for traffic?), startup (slow init). Observability three pillars: metrics (Prometheus), logs (ELK), traces (Jaeger/Tempo). SLO-driven alerting on burn rate not every blip.\n\nWithout readiness, K8s routes to pod still starting JDBC—500 errors. Without metrics, blind to latency regression until customer complaint.\n\nSpring Actuator /actuator/health with probes for DB, Kafka, disk. Micrometer exports histograms for p99.',
    productionScenario: 'Custom readiness included Kafka consumer group caught up lag <1000 and DB connection validation. Liveness lightweight ping only—previously heavy liveness query DB killed pods under load. Grafana SLO dashboard error budget 99.9% monthly— burn rate alert prevented false pages.',
    productionCode: `@Component
public class KafkaReadinessIndicator implements HealthIndicator {
    public Health health() {
        long lag = adminClient.totalLag("fulfillment-group");
        return lag < 1000 ? Health.up().withDetail("lag", lag).build()
                          : Health.down().withDetail("lag", lag).build();
    }
}

// management.endpoint.health.probes.enabled=true
// management.health.livenessState.enabled=true`,
    executiveAnswer: 'I separate cheap liveness from meaningful readiness—readiness reflects dependencies needed for THIS request class. I instrument golden signals: rate, errors, duration per endpoint. Traces sampled 10% baseline 100% on errors. Health endpoints authenticated or internal network only—info disclosure risk.',
    tradeOffs: 'Readiness too strict prevents scheduling during acceptable degraded mode—tiered degradation. Metric cardinality explosion from high-cardinality labels (userId)—never label unbounded sets.',
    followUps: [
      { q: 'Actuator /health vs /health/liveness?', a: 'K8s probes: /actuator/health/liveness and /readiness with probes enabled—separate endpoints K8s 1.16+ pattern.' },
      { q: 'USE vs RED method?', a: 'RED for services: Rate Errors Duration. USE for resources: Utilization Saturation Errors—CPU, disk, connection pool.' },
      { q: 'Alert on what?', a: 'SLO burn rate, dependency error rate, consumer lag, saturation— not CPU >80% alone without symptom correlation.' }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOPICS };
}
