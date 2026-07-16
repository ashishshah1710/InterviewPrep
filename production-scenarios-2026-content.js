const TOPICS = {

"overview": {
  title: "Production Scenarios Overview",
  html: `
<h2>Production Scenarios Overview</h2>
<p class="subtitle">Java Backend Production Interview Guide · 2026 Edition · 25 Real-World Scenarios</p>

<span class="tag tag-blue">Production</span>
<span class="tag tag-green">Spring Boot 3</span>
<span class="tag tag-yellow">Microservices</span>
<span class="tag tag-red">Kubernetes</span>

<p>Companies no longer ask definitions — they want to know how you think when production breaks. Use this guide to rehearse investigation steps, root causes, solutions, and concise interview answers.</p>

<h3>All 25 Scenarios</h3>
<table>
  <tr><th>#</th><th>Scenario</th><th>Category</th></tr>
  <tr><td>Q01</td><td>API response time suddenly increases from 200 ms to 5 seconds</td><td>Performance &amp; Latency</td></tr>
  <tr><td>Q02</td><td>A downstream microservice becomes slow — stop it from impacting the entire system</td><td>Resilience &amp; Patterns</td></tr>
  <tr><td>Q03</td><td>When to use Circuit Breaker, Retry, Timeout, and Bulkhead patterns</td><td>Resilience &amp; Patterns</td></tr>
  <tr><td>Q04</td><td>Database connection pool is exhausted in production</td><td>Database &amp; Connections</td></tr>
  <tr><td>Q05</td><td>Handle duplicate payment requests from retries or double-clicks</td><td>Idempotency &amp; Payments</td></tr>
  <tr><td>Q06</td><td>Where to store idempotency key and handle concurrent requests</td><td>Idempotency &amp; Payments</td></tr>
  <tr><td>Q07</td><td>Redis goes down — should the application fail? Design a fallback</td><td>Caching &amp; Redis</td></tr>
  <tr><td>Q08</td><td>Solve cache invalidation with multiple service instances</td><td>Caching &amp; Redis</td></tr>
  <tr><td>Q09</td><td>API works with 100 users but fails with 10,000 concurrent users</td><td>Performance &amp; Latency</td></tr>
  <tr><td>Q10</td><td>Process a 5 GB CSV file without OutOfMemoryError</td><td>Messaging &amp; Files</td></tr>
  <tr><td>Q11</td><td>When to choose synchronous communication over asynchronous messaging</td><td>Messaging &amp; Files</td></tr>
  <tr><td>Q12</td><td>Kafka consumer processes message but crashes before committing offset</td><td>Messaging &amp; Files</td></tr>
  <tr><td>Q13</td><td>Ensure the same Kafka event isn&apos;t processed twice</td><td>Messaging &amp; Files</td></tr>
  <tr><td>Q14</td><td>Kubernetes pod keeps restarting but logs show no obvious error</td><td>Kubernetes &amp; Deploy</td></tr>
  <tr><td>Q15</td><td>CPU usage normal but API latency is very high</td><td>Performance &amp; Latency</td></tr>
  <tr><td>Q16</td><td>Identify whether bottleneck is app, database, network, or downstream</td><td>Performance &amp; Latency</td></tr>
  <tr><td>Q17</td><td>SQL query takes 10 seconds in production but fast in development</td><td>Performance &amp; Latency</td></tr>
  <tr><td>Q18</td><td>Handle distributed transactions across microservices</td><td>Debugging &amp; Transactions</td></tr>
  <tr><td>Q19</td><td>When to use Saga Pattern and deal with compensation failures</td><td>Debugging &amp; Transactions</td></tr>
  <tr><td>Q20</td><td>Same request reaches service twice due to network retry — guarantee consistent results</td><td>Idempotency &amp; Payments</td></tr>
  <tr><td>Q21</td><td>Deploy new Spring Boot version with zero downtime</td><td>Kubernetes &amp; Deploy</td></tr>
  <tr><td>Q22</td><td>In-flight requests during Kubernetes pod termination and graceful shutdown</td><td>Kubernetes &amp; Deploy</td></tr>
  <tr><td>Q23</td><td>Design rate limiting for an API serving millions of users</td><td>Scale &amp; Security</td></tr>
  <tr><td>Q24</td><td>Memory keeps growing and crashes after a few days — investigate memory leak</td><td>Debugging &amp; Transactions</td></tr>
  <tr><td>Q25</td><td>Production issue only under heavy traffic — can&apos;t reproduce locally</td><td>Debugging &amp; Transactions</td></tr>
</table>
`
},

"q01": {
  title: "API Latency Spike: 200ms to 5s",
  html: `
<h2>API response time suddenly increases from 200 ms to 5 seconds. How would you investigate?</h2>
<p class="subtitle">Performance &amp; Latency · Production Scenario 2026</p>
<span class="tag tag-red">Performance &amp; Latency</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>A sudden latency jump means something in the request path got slower — your app, the database, a downstream service, the network, or infrastructure (GC, thread starvation). You compare <strong>before vs after</strong> metrics and trace a single slow request end-to-end to find the slowest hop.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li><strong>Confirm scope:</strong> One endpoint or all? One region/pod or fleet-wide? Correlate with deploy, traffic spike, or config change.</li>
    <li><strong>Check golden signals:</strong> Latency (p50/p95/p99), error rate, throughput, saturation (CPU, memory, thread pools, DB connections).</li>
    <li><strong>Distributed tracing:</strong> Open a slow trace in Jaeger/Zipkin — identify the longest span (DB, HTTP client, cache, lock wait).</li>
    <li><strong>Database layer:</strong> Slow query log, connection pool metrics, lock waits, replication lag.</li>
    <li><strong>Downstream dependencies:</strong> Compare client-side latency vs server-side for each Feign/WebClient call.</li>
    <li><strong>JVM/OS:</strong> GC pauses, heap pressure, thread dump if threads are blocked.</li>
    <li><strong>Rollback or scale:</strong> If tied to a release, roll back; if load-related, scale horizontally while root-causing.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Missing or dropped database index after schema migration</li>
  <li>Connection pool exhaustion causing threads to wait</li>
  <li>Downstream service degradation or DNS/network issues</li>
  <li>Cache stampede after Redis restart or TTL expiry</li>
  <li>N+1 queries introduced in a recent code change</li>
  <li>Full GC or heap pressure causing stop-the-world pauses</li>
  <li>Thread pool queue backing up under burst traffic</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Instrument every layer with metrics and tracing before incidents happen. Set SLO-based alerts on p99 latency, not averages. Add timeouts and circuit breakers on outbound calls so one slow dependency cannot block the entire thread pool. Use read replicas and caching for hot read paths.</p>

<pre><code>// Spring Boot 3 — Micrometer timer on critical path
@RestController
public class OrderController {
    private final MeterRegistry registry;
    private final OrderService orderService;

    @GetMapping("/orders/{id}")
    public OrderDto get(@PathVariable Long id) {
        return Timer.builder("api.orders.get")
            .publishPercentiles(0.95, 0.99)
            .register(registry)
            .record(() -> orderService.findById(id));
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I confirm whether it&apos;s one endpoint or system-wide, check p99 latency and error rate, then open a distributed trace to find the slowest span. I inspect DB slow queries, connection pool saturation, downstream HTTP latency, and GC logs. I correlate with recent deploys or traffic changes, mitigate with rollback/scale, then fix the root cause — usually a slow query, pool exhaustion, or downstream timeout.</div>

<h3>Detailed Interview Answer</h3>
<p>Start by narrowing blast radius: is latency degraded for all APIs or one path? A single-endpoint spike often points to a code or query regression. Fleet-wide spikes suggest infrastructure, dependency, or traffic overload.</p>
<p>Use the RED method — Rate, Errors, Duration — per service and per dependency. Distributed tracing is the fastest way to stop guessing: if 4.8 of 5 seconds is spent in a Feign call to InventoryService, you focus there, not on JVM tuning.</p>
<p>Always check connection pools and thread pools. In Spring Boot, a saturated <code>HikariCP</code> pool makes every request wait even when CPU looks fine. Compare production data volume vs dev — an unindexed filter on millions of rows explains &quot;fast locally, slow in prod.&quot;</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Optimizing application code before checking DB and downstream latency</li>
    <li>Looking only at average latency instead of p99</li>
    <li>Scaling pods without fixing a DB bottleneck (makes it worse)</li>
    <li>Skipping correlation with deployment timeline</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>It&apos;s like a delivery taking 5 hours instead of 20 minutes — you don&apos;t blame the driver first. You check each stop: warehouse pick time (DB), traffic between cities (network), partner handoff (downstream API). The slowest leg is your bottleneck.</p>
</div>
`
},

"q02": {
  title: "Isolate Slow Downstream Service",
  html: `
<h2>A downstream microservice becomes slow. How do you stop it from impacting the entire system?</h2>
<p class="subtitle">Resilience &amp; Patterns · Production Scenario 2026</p>
<span class="tag tag-yellow">Resilience &amp; Patterns</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When Service B slows down, every thread in Service A that calls B starts waiting. Soon Service A runs out of threads and <em>its</em> callers fail too — cascading failure. You must <strong>fail fast</strong>, <strong>limit concurrency</strong>, and <strong>degrade gracefully</strong> instead of waiting forever.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Identify which upstream services call the slow dependency (dependency graph / service mesh).</li>
    <li>Measure client-side timeout rate and thread pool queue depth on callers.</li>
    <li>Enable or tighten timeouts so threads are released quickly.</li>
    <li>Apply circuit breaker — stop calling B when error/latency threshold exceeded.</li>
    <li>Provide fallback responses (cached data, default values, async queue).</li>
    <li>Isolate calls with bulkhead — dedicated thread pool per dependency.</li>
    <li>Scale the slow service or fix its bottleneck in parallel.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>No timeouts on RestTemplate/WebClient/Feign clients</li>
  <li>Shared thread pool for all outbound calls</li>
  <li>Synchronous chains: A → B → C with no isolation</li>
  <li>Retry storms amplifying load on already-slow B</li>
  <li>Missing circuit breaker allowing endless blocking</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Combine timeout + circuit breaker + bulkhead + fallback. Timeouts prevent indefinite waits. Circuit breaker stops hammering a failing service. Bulkhead ensures one slow dependency cannot exhaust all threads. Fallback keeps core user journeys working with degraded data.</p>

<pre><code>// Resilience4j with Spring Boot 3
@CircuitBreaker(name = "inventory", fallbackMethod = "inventoryFallback")
@Bulkhead(name = "inventory")
@TimeLimiter(name = "inventory")
public CompletableFuture&lt;StockDto&gt; getStock(Long productId) {
    return CompletableFuture.supplyAsync(() ->
        inventoryClient.fetchStock(productId));
}

private CompletableFuture&lt;StockDto&gt; inventoryFallback(Long id, Throwable t) {
    return CompletableFuture.completedFuture(
        cacheService.getLastKnownStock(id).orElse(StockDto.unknown(id)));
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I prevent cascade failure with timeouts so threads don&apos;t block forever, a circuit breaker to stop calling the slow service when it&apos;s unhealthy, bulkheads to isolate thread pools per dependency, and fallbacks like cached or default responses. Meanwhile I scale or fix the downstream service. The goal is my service stays up even if the dependency is down.</div>

<h3>Detailed Interview Answer</h3>
<p>Cascading failure is the default behavior without resilience patterns. A 30-second downstream delay with 200 Tomcat threads means 200 blocked requests — new requests queue and time out, health checks fail, Kubernetes restarts pods, and load shifts to remaining instances, making it worse.</p>
<p>Resilience4j (or Spring Cloud Circuit Breaker) gives you declarative circuit breakers. Pair with sensible timeouts: connect timeout 1–2s, read timeout based on SLA (e.g., 3s for p99). Bulkheads limit concurrent calls to inventory to 20 even if the main pool has 200 threads.</p>
<p>Design fallbacks consciously: return stale cache for product availability rather than a 503 on the entire product page. For payment flows, fail closed — no fallback to &quot;assume paid.&quot;</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Infinite or very long HTTP timeouts &quot;to be safe&quot;</li>
    <li>Retrying immediately on timeout without backoff (retry storm)</li>
    <li>Circuit breaker without fallback — users still see errors</li>
    <li>Same thread pool for critical and non-critical outbound calls</li>
  </ul>
</div>
`
},

"q03": {
  title: "Circuit Breaker vs Retry vs Timeout vs Bulkhead",
  html: `
<h2>When would you use Circuit Breaker, Retry, Timeout, and Bulkhead patterns?</h2>
<p class="subtitle">Resilience &amp; Patterns · Production Scenario 2026</p>
<span class="tag tag-yellow">Resilience &amp; Patterns</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Timeout</strong> = don&apos;t wait forever. <strong>Retry</strong> = try again on transient failure. <strong>Circuit Breaker</strong> = stop calling a broken service to let it recover. <strong>Bulkhead</strong> = separate resource pools so one failure doesn&apos;t sink the ship.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Classify the failure: transient (network blip) vs persistent (DB down).</li>
    <li>Map each outbound call to idempotent or non-idempotent.</li>
    <li>Apply timeout on every external call first — baseline protection.</li>
    <li>Add retry only for idempotent, transient errors with exponential backoff + jitter.</li>
    <li>Add circuit breaker when dependency has sustained high error/latency.</li>
    <li>Add bulkhead when multiple dependencies share one thread pool.</li>
    <li>Validate in chaos tests — kill dependency, observe behavior.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Using retry on payment POST without idempotency (duplicates)</li>
  <li>Circuit breaker threshold too aggressive (flapping)</li>
  <li>Timeout shorter than p99 downstream latency (false failures)</li>
  <li>Bulkhead pool too small (artificial throttling)</li>
  <li>No jitter on retry — synchronized retry spikes</li>
</ul>

<h3>Solution / Design Approach</h3>
<table>
  <tr><th>Pattern</th><th>When to Use</th><th>Example</th></tr>
  <tr><td>Timeout</td><td>Always, on every I/O call</td><td>Read timeout 3s on inventory API</td></tr>
  <tr><td>Retry</td><td>Transient, idempotent failures</td><td>GET /status, Kafka publish with dedup</td></tr>
  <tr><td>Circuit Breaker</td><td>Sustained dependency failure</td><td>Payment gateway down 2 min</td></tr>
  <tr><td>Bulkhead</td><td>Isolate critical vs non-critical pools</td><td>Separate pool for search vs checkout</td></tr>
</table>

<pre><code>// application.yml — Resilience4j
resilience4j:
  retry:
    instances:
      inventory:
        maxAttempts: 3
        waitDuration: 200ms
        enableExponentialBackoff: true
        retryExceptions: [java.io.IOException]
  circuitbreaker:
    instances:
      inventory:
        slidingWindowSize: 20
        failureRateThreshold: 50
        waitDurationInOpenState: 30s</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Timeout on every call — always. Retry only for transient, idempotent failures with backoff. Circuit breaker when a dependency is consistently failing — fail fast and recover later. Bulkhead when you need isolation so one slow dependency doesn&apos;t exhaust shared threads. Use all four together, not interchangeably.</div>

<h3>Detailed Interview Answer</h3>
<p>These patterns solve different problems and compose well. Timeout is non-negotiable — without it, retries and circuit breakers never trigger because threads hang indefinitely.</p>
<p>Retry suits idempotent reads and safe writes with idempotency keys. Never blind-retry a charge API. Use max 3 attempts, exponential backoff, and jitter. Circuit breaker watches rolling failure rate; in OPEN state it rejects calls immediately for a cooldown period, giving the dependency breathing room.</p>
<p>Bulkhead is inspired by ship compartments — a leak in one section doesn&apos;t flood the whole vessel. In Spring, separate <code>@Async</code> executors or Resilience4j bulkhead instances per downstream system.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Treating retry as a fix for slow services (amplifies load)</li>
    <li>Circuit breaker on internal method calls instead of network boundaries</li>
    <li>One global timeout for all APIs regardless of SLA</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p><strong>Timeout</strong> = hanging up after 30 seconds on hold. <strong>Retry</strong> = redialing when line was busy. <strong>Circuit breaker</strong> = not calling someone who hasn&apos;t answered in an hour. <strong>Bulkhead</strong> = separate phone lines for family vs work so one long work call doesn&apos;t block family emergencies.</p>
</div>
`
},

"q04": {
  title: "Connection Pool Exhausted",
  html: `
<h2>Your database connection pool is exhausted in production. What could be the reasons?</h2>
<p class="subtitle">Database &amp; Connections · Production Scenario 2026</p>
<span class="tag tag-blue">Database &amp; Connections</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>HikariCP keeps a fixed number of DB connections (e.g., 10). If all 10 are in use and not returned, request #11 waits — latency spikes and threads pile up. Something is <strong>holding connections too long</strong> or <strong>leaking them</strong>.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Check HikariCP metrics: <code>hikaricp.connections.active</code>, <code>pending</code>, <code>timeout</code>.</li>
    <li>Correlate pool exhaustion with slow queries or traffic spike.</li>
    <li>Enable leak detection: <code>spring.datasource.hikari.leak-detection-threshold=60000</code>.</li>
    <li>Review long-running transactions — @Transactional spanning external HTTP calls.</li>
    <li>Check for connection-per-request anti-pattern without pooling.</li>
    <li>Thread dump: threads blocked on <code>getConnection()</code>.</li>
    <li>Verify pool size vs pod count × DB max_connections limit.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>@Transactional method calling slow external API mid-transaction</li>
  <li>Missing connection release due to exception path bug</li>
  <li>Pool size too small for concurrent request volume</li>
  <li>Slow queries holding connections for seconds</li>
  <li>Too many pods each with large pool (exceeds DB max_connections)</li>
  <li>Connection leak in manual JDBC code without try-with-resources</li>
  <li>Database deadlock or lock wait keeping transactions open</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Keep transactions short — DB work only, no HTTP inside @Transactional. Right-size pool: formula <code>connections = ((core_count × 2) + effective_spindle_count)</code> per instance, then cap fleet-wide against DB limit. Fix slow queries. Use read replicas for read-heavy paths.</p>

<pre><code>// BAD — holds DB connection during HTTP call
@Transactional
public void processOrder(Order order) {
    orderRepo.save(order);
    paymentClient.charge(order);  // connection held 2–5 seconds!
}

// GOOD — short transaction, external call outside
public void processOrder(Order order) {
    orderRepo.saveInTransaction(order);
    paymentClient.charge(order);
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Pool exhaustion means all connections are busy or leaked. Common causes: transactions too long (especially HTTP inside @Transactional), slow SQL, pool sized too small, or too many pods exceeding DB max_connections. I check HikariCP active/pending metrics, enable leak detection, thread dumps, and fix by shortening transactions and tuning pool size.</div>

<h3>Detailed Interview Answer</h3>
<p>HikariCP is fast but unforgiving — when pending connections grow, every new request blocks at the pool gate. The classic Spring mistake is @Transactional wrapping a method that calls external services: the JDBC connection stays checked out until the entire method completes.</p>
<p>In Kubernetes with 20 pods and pool size 30, you need 600 DB connections. PostgreSQL default max_connections is often 100–300. Calculate fleet-wide demand before increasing per-pod pool size.</p>
<p>Leak detection logs the stack trace of code that borrowed a connection longer than the threshold — invaluable for finding manual JDBC bugs.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Increasing pool size without fixing long transactions (delays the problem)</li>
    <li>Ignoring DB server max_connections ceiling</li>
    <li>Using @Transactional on controller layer</li>
  </ul>
</div>
`
},

"q05": {
  title: "Duplicate Payment Requests",
  html: `
<h2>How would you handle duplicate payment requests caused by retries or multiple button clicks?</h2>
<p class="subtitle">Idempotency &amp; Payments · Production Scenario 2026</p>
<span class="tag tag-green">Idempotency &amp; Payments</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>The same payment can arrive twice — user double-clicks Pay, mobile app retries, or gateway sends duplicate webhook. Without protection you charge twice. You need an <strong>idempotency key</strong> so the second identical request returns the same result without re-processing.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Reproduce paths: double-click, client retry, gateway webhook retry.</li>
    <li>Check if payment API is safe to retry (idempotent or not).</li>
    <li>Audit logs for duplicate orderId / idempotency key with different outcomes.</li>
    <li>Review DB unique constraints on business keys (payment_reference).</li>
    <li>Implement idempotency key from client or generate server-side per checkout session.</li>
    <li>Return same HTTP response for duplicate key within TTL window.</li>
    <li>Disable Pay button on frontend after first click (UX layer, not sole fix).</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>No idempotency key on POST /payments</li>
  <li>Retries without checking prior success</li>
  <li>Race condition: two requests pass duplicate check simultaneously</li>
  <li>Webhook and API both processing same payment event</li>
  <li>Missing unique constraint at database level</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Client sends <code>Idempotency-Key</code> header (UUID per checkout attempt). Server stores key → response mapping in Redis or DB with unique constraint. First request processes; duplicates return cached 201/200 with same body. Use DB unique constraint as last line of defense.</p>

<pre><code>@PostMapping("/payments")
public ResponseEntity&lt;PaymentResponse&gt; pay(
    @RequestHeader("Idempotency-Key") String key,
    @RequestBody PaymentRequest req) {
    return idempotencyService.execute(key, () -> {
        Payment payment = paymentService.charge(req);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(PaymentResponse.from(payment));
    });
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I use an idempotency key per payment attempt — client sends Idempotency-Key header. First request processes and stores the result; duplicates return the same response without charging again. I add a DB unique constraint on payment reference and handle concurrent duplicates with atomic insert or distributed lock. Frontend disables the button, but server-side idempotency is mandatory.</div>

<h3>Detailed Interview Answer</h3>
<p>Payment duplication is a money problem — UX fixes alone fail when networks retry. Stripe and most payment APIs mandate idempotency keys. Your service should too.</p>
<p>Flow: on request arrival, try INSERT idempotency_key with status PROCESSING. If unique violation, fetch existing result and return it. On success, update stored response. TTL keys 24 hours — long enough for client retries.</p>
<p>For webhooks, use gateway event ID as idempotency key. Process each event exactly once with unique constraint on event_id column.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Only disabling button on UI without server idempotency</li>
    <li>Using order ID as idempotency key when user can retry with new session</li>
    <li>Returning 409 on duplicate instead of original success response</li>
  </ul>
</div>
`
}

,

"q06": {
  title: "Idempotency Key Storage & Concurrency",
  html: `
<h2>Where would you store an idempotency key, and how would you handle concurrent requests?</h2>
<p class="subtitle">Idempotency &amp; Payments · Production Scenario 2026</p>
<span class="tag tag-green">Idempotency &amp; Payments</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Store the idempotency key in a <strong>fast, shared store</strong> (Redis or database) with a unique constraint. When two identical requests arrive at the same millisecond, only one should process — the other waits or gets the cached result.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Define key scope: per user, per session, or global per operation.</li>
    <li>Choose store: Redis for speed + TTL, PostgreSQL for durability and audit.</li>
    <li>Implement atomic claim: SETNX in Redis or INSERT ... ON CONFLICT.</li>
    <li>Handle IN_PROGRESS state for long-running operations.</li>
    <li>Second concurrent request: poll or wait briefly, then return stored result.</li>
    <li>Set TTL (24–72h) to prevent unbounded growth.</li>
    <li>Load-test with parallel duplicate requests.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Check-then-act race without atomic operation</li>
  <li>In-memory Map on single pod (fails with multiple instances)</li>
  <li>No IN_PROGRESS state — duplicate starts second charge</li>
  <li>Redis down with no fallback to DB</li>
  <li>Key TTL too short — legitimate retry treated as new request</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Redis: <code>SET key IN_PROGRESS NX EX 86400</code> — only winner proceeds. On completion, <code>SET key COMPLETED &lt;response&gt;</code>. Loser reads result. Database alternative: unique index on idempotency_key with status column and optimistic locking.</p>

<pre><code>public &lt;T&gt; T execute(String key, Supplier&lt;T&gt; action) {
    boolean claimed = redisTemplate.opsForValue()
        .setIfAbsent(key, "IN_PROGRESS", Duration.ofHours(24));
    if (!claimed) {
        return awaitResult(key);  // poll until COMPLETED or timeout
    }
    try {
        T result = action.get();
        redisTemplate.opsForValue().set(key, serialize(result), Duration.ofHours(24));
        return result;
    } catch (Exception e) {
        redisTemplate.delete(key);  // allow retry on failure
        throw e;
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Store idempotency keys in Redis or DB with a unique constraint — never in local memory. Use atomic SETNX or INSERT to claim the key; concurrent duplicates either wait for IN_PROGRESS to finish or return the stored response. Include PROCESSING and COMPLETED states, TTL of 24h+, and delete key only on failure so clients can retry safely.</div>

<h3>Detailed Interview Answer</h3>
<p>Multi-pod deployment kills in-memory solutions instantly. Redis SETNX is the standard pattern for atomic claim. For financial-grade durability, PostgreSQL with UNIQUE(idempotency_key) and INSERT as claim is stronger — slightly slower but survives Redis outage.</p>
<p>Concurrent duplicate handling: Request A claims key, sets IN_PROGRESS. Request B fails SETNX, polls Redis every 100ms for up to 30s, then returns cached response when A completes. Never let B start a second business operation.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Using synchronized block in Java (only works on one JVM)</li>
    <li>Deleting idempotency key immediately after success (retries get new charge)</li>
    <li>No handling for stuck IN_PROGRESS after crash</li>
  </ul>
</div>
`
},

"q07": {
  title: "Redis Down — Fallback Design",
  html: `
<h2>Redis goes down. Should your application also fail? How would you design a fallback?</h2>
<p class="subtitle">Caching &amp; Redis · Production Scenario 2026</p>
<span class="tag tag-blue">Caching &amp; Redis</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Redis is usually a <strong>cache or session store</strong>, not the source of truth. If Redis dies, the app should <strong>degrade gracefully</strong> — hit the database directly, serve slightly slower, not crash. Only fail hard if Redis holds mandatory auth/session data with no alternative.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Classify Redis usage: cache, session, rate limit, distributed lock, or primary store.</li>
    <li>Check if Spring Cache abstraction propagates Redis exceptions.</li>
    <li>Measure DB load when cache is bypassed — can DB handle cache miss storm?</li>
    <li>Implement cache-aside with try/catch fallback to DB.</li>
    <li>Configure circuit breaker on Redis client.</li>
    <li>Alert on cache hit ratio drop and Redis connection errors.</li>
    <li>Plan Redis HA: Sentinel or Cluster for production.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Treating cache as required — no DB fallback path</li>
  <li>Cache stampede on Redis restart overwhelming DB</li>
  <li>Session in Redis only with no sticky-session alternative</li>
  <li>No timeout on Redis commands blocking threads</li>
  <li>Single Redis instance with no failover</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Cache-aside pattern: read Redis → on miss or error, read DB → optionally skip write-back if Redis is down. Use <code>@Cacheable</code> with custom CacheErrorHandler. For sessions, consider JWT stateless tokens to reduce Redis dependency.</p>

<pre><code>@Bean
public CacheErrorHandler cacheErrorHandler() {
    return new CacheErrorHandler() {
        public void handleCacheGetError(RuntimeException ex, Cache c, Object key) {
            // log and let method execute — loads from DB
        }
        public void handleCachePutError(RuntimeException ex, Cache c, Object key, Object val) {
            // log only — request still succeeds
        }
        // handleCacheEvictError, handleCacheClearError similarly
    };
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Redis outage should not take down the app if Redis is a cache. I fall back to database with circuit breaker on Redis client, accept higher latency, and prevent cache stampede with request coalescing. For sessions or rate limits stored in Redis, I use Redis Cluster/Sentinel for HA or degrade features gracefully. Fail hard only when Redis is the sole source of truth.</div>

<h3>Detailed Interview Answer</h3>
<p>Interviewers test whether you understand cache vs system-of-record. Production Redis is an optimization layer. Spring&apos;s CacheErrorHandler lets GET failures transparently fall through to the @Cacheable method body.</p>
<p>Watch for thundering herd: when Redis restarts, every request misses cache simultaneously. Mitigate with single-flight (one thread loads, others wait), random TTL jitter, and pre-warming. For rate limiting in Redis, fallback might be permissive (allow traffic) or restrictive (reject) depending on abuse risk — document the trade-off.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Letting Redis connection exception bubble to 500 response</li>
    <li>No monitoring on cache hit ratio drop</li>
    <li>Storing only copy of critical data in Redis without persistence</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Redis is a sticky note on your desk with frequently used numbers. If sticky notes are gone, you open the filing cabinet (database) — slower, but work continues. You don&apos;t shut the office.</p>
</div>
`
},

"q08": {
  title: "Cache Invalidation Across Instances",
  html: `
<h2>How do you solve cache invalidation when multiple service instances are running?</h2>
<p class="subtitle">Caching &amp; Redis · Production Scenario 2026</p>
<span class="tag tag-blue">Caching &amp; Redis</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>With 10 pods each having local cache, updating data on Pod A doesn&apos;t clear cache on Pod B — users get stale data. Solution: use a <strong>shared cache (Redis)</strong> or <strong>broadcast invalidation events</strong> via Redis pub/sub or Kafka.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Identify cache layer: local Caffeine, Redis, or both (L1 + L2).</li>
    <li>Reproduce stale read after update — which instances serve old data?</li>
    <li>On write: invalidate shared cache key and publish eviction event.</li>
    <li>All instances subscribe and evict local L1 on message.</li>
    <li>Prefer TTL as safety net even with explicit invalidation.</li>
    <li>Version cache keys on schema change: <code>product:v2:{id}</code>.</li>
    <li>Monitor stale-data complaints vs cache hit ratio.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Local-only cache without cluster-wide eviction</li>
  <li>Invalidation on write path forgotten or async lag</li>
  <li>Race: read repopulates stale value after invalidation</li>
  <li>Pub/sub message lost — no TTL backup</li>
  <li>Cache key design doesn&apos;t cover all query variants</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Pattern: L1 (Caffeine, 30s TTL) + L2 (Redis, shared). On update: delete Redis key, publish <code>cache-evict:product:123</code>, all pods clear local entry. Use @CacheEvict in Spring with Redis cache manager for centralized invalidation.</p>

<pre><code>@CacheEvict(value = "products", key = "#id")
@Transactional
public void updateProduct(Long id, ProductDto dto) {
    productRepo.save(map(dto));
    redisTemplate.convertAndSend("cache-evict", "products::" + id);
}

@EventListener
public void onEvict(EvictMessage msg) {
    localCache.invalidate(msg.getKey());
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Local per-pod caches need cluster-wide invalidation. I use shared Redis as L2 cache plus pub/sub or Kafka events so every instance evicts its local L1 on update. I always pair explicit invalidation with TTL as safety net, and version cache keys to avoid stale schema data.</div>

<h3>Detailed Interview Answer</h3>
<p>Phil Karlton&apos;s joke — cache invalidation is hard. Multi-instance makes it harder. Centralized Redis cache solves most cases: one delete invalidates for all. Two-tier caching needs broadcast: Spring Data Redis pub/sub or Kafka topic <code>cache-invalidation</code>.</p>
<p>Write-through vs cache-aside: on update, delete before DB commit (small stale window) or after commit (brief inconsistency). For strong consistency, skip cache on reads after write for that user session, or use short TTL.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>@CacheEvict only on one instance&apos;s local cache</li>
    <li>No TTL — relying solely on pub/sub that can drop messages</li>
    <li>Invalidating too broad a key pattern (clears entire cache)</li>
  </ul>
</div>
`
},

"q09": {
  title: "100 Users OK, 10K Concurrent Fails",
  html: `
<h2>Your API works fine with 100 users but fails with 10,000 concurrent users. What would you check first?</h2>
<p class="subtitle">Performance &amp; Latency · Production Scenario 2026</p>
<span class="tag tag-red">Performance &amp; Latency</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Low traffic hides bottlenecks. At 10K concurrent users, the weakest link breaks — thread pools, DB connections, memory, file descriptors, or downstream rate limits. Check <strong>saturation metrics</strong> first, not code logic.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Load test with realistic mix: JMeter/k6 at 10K virtual users, ramp up gradually.</li>
    <li>Watch thread pool rejections and Tomcat accept queue.</li>
    <li>Check connection pool pending count and DB CPU.</li>
    <li>Monitor file descriptor and ephemeral port exhaustion.</li>
    <li>Check downstream rate limits (429 responses).</li>
    <li>Review GC frequency and heap under load.</li>
    <li>Verify horizontal scaling and load balancer health checks.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Default Tomcat max threads (200) insufficient</li>
  <li>HikariCP pool too small</li>
  <li>Database single-writer bottleneck</li>
  <li>Synchronous blocking I/O on every request</li>
  <li>No autoscaling or single pod deployment</li>
  <li>OS ulimit too low for connections</li>
  <li>Missing indexes causing full table scans under load</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Scale horizontally with stateless services. Tune thread and connection pools based on load test data. Add caching, read replicas, async processing for non-critical work. Implement rate limiting and queue-based absorption for spikes.</p>

<pre><code>// server.tomcat.threads.max=400 — tune from load test, not guesses
spring.datasource.hikari.maximum-pool-size=20

// Virtual threads (Java 21+) or reactive for I/O-bound scale
@Bean
public TomcatProtocolHandlerCustomizer&lt;?&gt; virtualThreads() {
    return handler -> handler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I load test with gradual ramp-up and watch what saturates first: thread pool, DB connection pool, CPU, memory, or downstream limits. At 10K users the usual culprits are too-small thread/connection pools, missing DB indexes, single-pod deployment, or blocking I/O. I fix the bottleneck, then scale horizontally with stateless pods and caching.</div>

<h3>Detailed Interview Answer</h3>
<p>100 users might use 5 threads and 5 DB connections. 10K concurrent doesn&apos;t mean 10K threads — but if average response time is 500ms, Little&apos;s Law says you need hundreds of in-flight threads at moderate QPS. Defaults break.</p>
<p>Checklist order: (1) errors and timeouts in load test, (2) saturation resources, (3) DB slow query log under load, (4) network limits. Fix correctness before buying hardware.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Load testing with unrealistic think time or only GET requests</li>
    <li>Maxing thread pool to 10,000 instead of scaling pods</li>
    <li>Ignoring database as the real ceiling</li>
  </ul>
</div>
`
},

"q10": {
  title: "Process 5 GB CSV Without OOM",
  html: `
<h2>How would you process a 5 GB CSV file without getting an OutOfMemoryError?</h2>
<p class="subtitle">Messaging &amp; Files · Production Scenario 2026</p>
<span class="tag tag-yellow">Messaging &amp; Files</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Never load 5 GB into a List in memory. Read <strong>line by line</strong> or in <strong>small chunks</strong>, process each batch, then discard. Stream from disk or S3 directly to the processor.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Measure heap usage during current implementation — heap dump if OOM.</li>
    <li>Replace <code>Files.readAllLines()</code> or <code>readAllBytes()</code> with streaming.</li>
    <li>Batch inserts: 500–1000 rows per JDBC batch or COPY.</li>
    <li>Use Spring Batch with chunk-oriented processing.</li>
    <li>For very large files: split file, parallel workers via Kafka/SQS.</li>
    <li>Monitor heap during run; set -Xmx with headroom but fix code first.</li>
    <li>Store upload in object storage, not in-memory MultipartFile byte[].</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Loading entire file into List&lt;String&gt; or byte[]</li>
  <li>Parsing all rows into domain objects before any DB write</li>
  <li>Keeping all batches in a collection for &quot;summary at end&quot;</li>
  <li>MultipartResolver holding file in memory</li>
  <li>No pagination on export/import API</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Spring Batch: chunk size 500, ItemReader streams lines, ItemProcessor maps row, ItemWriter batch INSERT. For one-off: BufferedReader loop with periodic flush. Upload to S3, process via async job returning job ID.</p>

<pre><code>@Bean
public Step importStep(JobRepository repo, PlatformTransactionManager tx) {
    return new StepBuilder("import", repo)
        .&lt;CsvRow, Entity&gt;chunk(500, tx)
        .reader(csvFlatFileItemReader())
        .processor(row -> mapper.toEntity(row))
        .writer(jpaBatchItemWriter())
        .build();
}

// Or manual streaming
try (var reader = Files.newBufferedReader(path)) {
    String line;
    List&lt;Entity&gt; batch = new ArrayList&lt;&gt;(500);
    while ((line = reader.readLine()) != null) {
        batch.add(parse(line));
        if (batch.size() == 500) { flush(batch); batch.clear(); }
    }
    if (!batch.isEmpty()) flush(batch);
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Never load 5 GB into memory. I stream line-by-line with BufferedReader or Spring Batch chunk processing — read 500 rows, batch insert to DB, clear the batch, repeat. Upload goes to S3, processing runs as async job. This keeps heap flat regardless of file size.</div>

<h3>Detailed Interview Answer</h3>
<p>OOM on large files is almost always &quot;read everything first&quot; thinking. JVM heap is finite; 5 GB file + parsed objects can exceed 15 GB easily. Streaming keeps memory O(chunk_size).</p>
<p>Spring Batch adds restartability, skip policies, and metrics. For Kubernetes, run as Job not in request thread — API returns 202 Accepted with job ID. JDBC batch inserts reduce round trips 500x vs single inserts.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Increasing -Xmx to 16 GB instead of streaming</li>
    <li>Using parallelStream on full in-memory list</li>
    <li>Processing synchronously in HTTP request timeout window</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Reading a 5 GB file at once is like pouring an entire lake into a bucket. Streaming is using a hose — same water, but only a cup in the bucket at any time.</p>
</div>
`
},

"q11": {
  title: "Sync vs Async Communication",
  html: `
<h2>When would you choose synchronous communication over asynchronous messaging?</h2>
<p class="subtitle">Messaging &amp; Files · Production Scenario 2026</p>
<span class="tag tag-yellow">Messaging &amp; Files</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Synchronous (REST/gRPC)</strong> = caller waits for answer now. <strong>Async (Kafka/RabbitMQ)</strong> = send message, process later. Use sync when user needs immediate result; use async when you can decouple and absorb spikes.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Ask: does caller need response in same HTTP request?</li>
    <li>Evaluate latency SLA: sub-200ms user-facing → often sync read path.</li>
    <li>Check if operation can be eventual consistency.</li>
    <li>Measure coupling: sync creates runtime dependency chain.</li>
    <li>Identify peak load — async buffers spikes in queue.</li>
    <li>Consider rollback complexity: sync saga vs async compensation.</li>
    <li>Hybrid: sync for query, async for command (CQRS).</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Using sync chain for fire-and-forget notifications</li>
  <li>Using async for read-your-writes consistency without design</li>
  <li>HTTP call when event already published (duplicate paths)</li>
  <li>Missing timeout on sync calls in long chains</li>
</ul>

<h3>Solution / Design Approach</h3>
<table>
  <tr><th>Choose Sync When</th><th>Choose Async When</th></tr>
  <tr><td>User waits for result (payment status, login)</td><td>Side effects (email, analytics, indexing)</td></tr>
  <tr><td>Strong consistency required immediately</td><td>Peak absorption (order processing backlog)</td></tr>
  <tr><td>Simple request-response, low fan-out</td><td>Multiple subscribers need same event</td></tr>
  <tr><td>Debugging and tracing simplicity preferred</td><td>Downstream frequently unavailable</td></tr>
</table>

<pre><code>// Sync — user needs immediate validation
@GetMapping("/accounts/{id}/balance")
public BalanceDto balance(@PathVariable String id) {
    return accountService.getBalance(id);
}

// Async — send receipt email after order
@TransactionalEventListener(phase = AFTER_COMMIT)
public void onOrderPlaced(OrderPlacedEvent e) {
    kafkaTemplate.send("order-events", e.orderId(), e.payload());
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I choose sync when the user or caller needs an immediate answer in the same request — login, payment confirmation, real-time balance. I choose async for fire-and-forget work, spike buffering, and fan-out to multiple services — emails, analytics, search indexing. Many systems use both: sync for the critical path, async for everything else.</div>

<h3>Detailed Interview Answer</h3>
<p>Sync is simpler to reason about but creates temporal coupling — if B is down, A fails. Async adds complexity (idempotency, ordering, dead letter queues) but improves resilience and scalability.</p>
<p>Rule of thumb: command that blocks user UI → sync response with async side effects via events. Nightly batch, notification, audit → async. gRPC sync suits low-latency internal calls when you need response now; Kafka suits event notification.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Async for payment confirmation without webhook/polling UX</li>
    <li>Long sync chains A→B→C→D for order placement</li>
    <li>No dead letter queue on async consumers</li>
  </ul>
</div>
`
},

"q12": {
  title: "Kafka Consumer Crash Before Commit",
  html: `
<h2>What happens if a Kafka consumer processes a message but crashes before committing the offset?</h2>
<p class="subtitle">Messaging &amp; Files · Production Scenario 2026</p>
<span class="tag tag-yellow">Messaging &amp; Files</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Kafka tracks <strong>how far you&apos;ve read</strong> (offset). If you process a message but crash before committing, Kafka thinks you never finished — on restart, the <strong>same message is delivered again</strong>. Your consumer must be idempotent.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Confirm consumer auto-commit vs manual commit settings.</li>
    <li>Check if processing happens BEFORE or AFTER offset commit.</li>
    <li>Look for duplicate side effects in DB (same event_id twice).</li>
    <li>Review crash logs around last committed offset vs processed records.</li>
    <li>Implement idempotent consumer with unique business key.</li>
    <li>Consider transactional outbox or Kafka transactions for exactly-once.</li>
    <li>Monitor consumer lag and rebalance storms after crashes.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>enable.auto.commit=true with processing after auto-commit window</li>
  <li>Long processing without idempotency — duplicate charges</li>
  <li>Commit offset before DB transaction commits</li>
  <li>No dedup table for processed event IDs</li>
  <li>Consumer rebalance during slow processing</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Manual commit: process message, write to DB with event_id UNIQUE, then commit offset. If crash between DB write and offset commit, retry sees duplicate event_id and skips. Pattern: at-least-once delivery + idempotent consumer = effective exactly-once.</p>

<pre><code>@KafkaListener(topics = "payments")
public void consume(ConsumerRecord&lt;String, PaymentEvent&gt; record, Acknowledgment ack) {
    String eventId = record.value().eventId();
    if (processedEventRepo.existsById(eventId)) {
        ack.acknowledge();
        return;
    }
    paymentService.process(record.value());
    processedEventRepo.save(new ProcessedEvent(eventId));
    ack.acknowledge();  // commit AFTER successful processing
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> If the consumer crashes before committing offset, Kafka redelivers the message on restart — at-least-once delivery. I make the consumer idempotent: store processed event IDs with unique constraint, check before processing, commit offset only after successful DB write. That way redelivery is harmless.</div>

<h3>Detailed Interview Answer</h3>
<p>Kafka guarantees at-least-once with manual commits unless you use transactions end-to-end. The dangerous window is: business logic executed, offset not committed. Redelivery causes duplicate processing.</p>
<p>Fix is never &quot;hope we don&apos;t crash&quot; — always design for redelivery. Store offset in same DB transaction as business write for stronger coupling, or use idempotency table. Spring Kafka AckMode.MANUAL_IMMEDIATE commits when you call acknowledge().</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Committing offset before DB transaction completes</li>
    <li>Assuming Kafka delivers exactly once without idempotent consumer</li>
    <li>Auto-commit with processing time longer than interval.ms</li>
  </ul>
</div>
`
}

,

"q13": {
  title: "Prevent Duplicate Kafka Processing",
  html: `
<h2>How do you ensure the same Kafka event isn&apos;t processed twice?</h2>
<p class="subtitle">Messaging &amp; Files · Production Scenario 2026</p>
<span class="tag tag-yellow">Messaging &amp; Files</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Kafka delivers at-least-once by default. To avoid double processing, track <strong>which events you already handled</strong> using a unique event ID in the database, Redis SET, or idempotent business logic.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Audit duplicate records tied to same event_id or offset.</li>
    <li>Add processed_events table with PRIMARY KEY on event_id.</li>
    <li>Wrap check + process + insert in single transaction where possible.</li>
    <li>Use INSERT ... ON CONFLICT DO NOTHING as atomic dedup claim.</li>
    <li>Commit Kafka offset only after dedup record persisted.</li>
    <li>For high volume: Redis SET with TTL for hot dedup, DB for audit.</li>
    <li>Load-test redelivery scenario explicitly.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Consumer not idempotent — INSERT without unique constraint</li>
  <li>Rebalance causing double assignment during slow processing</li>
  <li>Multiple consumer groups processing same topic unintentionally</li>
  <li>Producer retries creating duplicate messages (enable idempotent producer)</li>
  <li>Offset commit and business logic not atomic</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Three layers: (1) Idempotent Kafka producer <code>enable.idempotence=true</code>, (2) Consumer dedup table, (3) Business-level unique constraints. Effective exactly-once = at-least-once + idempotent handler.</p>

<pre><code>// Producer — dedupe at broker within session
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);

// Consumer — atomic dedup
@Transactional
public void handle(PaymentEvent event) {
    int inserted = jdbcTemplate.update(
        "INSERT INTO processed_events(event_id) VALUES (?) ON CONFLICT DO NOTHING",
        event.eventId());
    if (inserted == 0) return;  // already processed
    paymentService.apply(event);
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Kafka is at-least-once, so I assume duplicates will arrive. I use a processed event ID table with unique constraint — INSERT before processing, skip if already exists. I enable idempotent Kafka producer, commit offset after successful processing, and add business-level unique keys as final guard.</div>

<h3>Detailed Interview Answer</h3>
<p>True exactly-once end-to-end requires Kafka transactions plus transactional DB — complex. Production standard is idempotent consumer: cheap dedup check, then process. Event ID should be business UUID from producer, not just offset (offsets differ per consumer group).</p>
<p>Redis SETNX with 24h TTL works for high-throughput dedup; PostgreSQL for durability. Combine both for speed and audit trail.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Using offset as idempotency key across consumer groups</li>
    <li>Check-then-insert race without unique constraint</li>
    <li>Deleting dedup records too soon</li>
  </ul>
</div>
`
},

"q14": {
  title: "K8s Pod Restart Loop — No Log Error",
  html: `
<h2>Your Kubernetes pod keeps restarting, but logs show no obvious error. How would you debug it?</h2>
<p class="subtitle">Kubernetes &amp; Deploy · Production Scenario 2026</p>
<span class="tag tag-red">Kubernetes &amp; Deploy</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Kubernetes restarts pods when they fail health checks or exceed memory limits — often <strong>before</strong> your app logs an error. Check <code>kubectl describe pod</code> for OOMKilled, liveness probe failures, and exit codes.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li><code>kubectl describe pod &lt;name&gt;</code> — Last State, Reason, Exit Code, OOMKilled.</li>
    <li><code>kubectl get events</code> — probe failures, failed scheduling, image pull.</li>
    <li>Compare liveness vs readiness probe paths and timeouts.</li>
    <li>Check memory limits vs actual usage (metrics-server, Prometheus).</li>
    <li>Review previous container logs: <code>kubectl logs --previous</code>.</li>
    <li>Startup probe if app takes &gt;30s to boot (Spring Boot fat jar).</li>
    <li>Exec into pod before restart if intermittent — thread dump, heap.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>OOMKilled — heap or native memory exceeds container limit</li>
  <li>Liveness probe hits endpoint before app ready</li>
  <li>Liveness probe too aggressive during GC pause</li>
  <li>Missing dependency at startup (DB not reachable) — crash loop</li>
  <li>Exit code 137 = SIGKILL (OOM or forced termination)</li>
  <li>CPU throttling causing probe timeout</li>
  <li>Image CMD wrong — JVM exits immediately</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Separate liveness (is JVM alive?) from readiness (can serve traffic?). Use startupProbe for slow Spring Boot start. Set memory request/limit with headroom; -XX:MaxRAMPercentage=75. Fix probe to hit lightweight /actuator/health/liveness.</p>

<pre><code># deployment.yaml
livenessProbe:
  httpGet: { path: /actuator/health/liveness, port: 8080 }
  initialDelaySeconds: 60
  periodSeconds: 10
readinessProbe:
  httpGet: { path: /actuator/health/readiness, port: 8080 }
startupProbe:
  httpGet: { path: /actuator/health, port: 8080 }
  failureThreshold: 30
  periodSeconds: 10
resources:
  limits: { memory: "1Gi" }
  requests: { memory: "512Mi" }</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Silent restarts are usually OOMKilled or failed liveness probes, not missing logs. I run kubectl describe pod for Last State and exit code 137, check kubectl logs --previous, review probe config and memory limits. Spring Boot needs startupProbe if boot takes 30+ seconds. I separate liveness from readiness and hit /actuator/health/liveness.</div>

<h3>Detailed Interview Answer</h3>
<p>Logs show application-level errors; Kubernetes kills containers at orchestration level. describe pod reveals OOMKilled in Last State. Liveness killing during slow start is classic Spring Boot on K8s — app still wiring beans, probe returns connection refused, kubelet restarts pod in loop.</p>
<p>Readiness failure removes pod from Service endpoints without restart. Liveness failure kills container. Never put DB check on liveness — transient DB blip kills entire fleet.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Same heavy /health check on liveness and readiness</li>
    <li>initialDelaySeconds: 10 for 45-second Spring Boot startup</li>
    <li>No --previous logs when investigating crash loop</li>
  </ul>
</div>
`
},

"q15": {
  title: "Normal CPU, High Latency",
  html: `
<h2>CPU usage looks normal, but API latency is very high. What could be happening?</h2>
<p class="subtitle">Performance &amp; Latency · Production Scenario 2026</p>
<span class="tag tag-red">Performance &amp; Latency</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Low CPU doesn&apos;t mean healthy. Threads can be <strong>blocked waiting</strong> — on DB locks, HTTP responses, I/O, or each other — without using CPU. High latency + low CPU = <strong>waiting problem</strong>, not computing problem.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Thread dump: threads in BLOCKED, WAITING, TIMED_WAITING states.</li>
    <li>Check connection pool pending and HTTP client queue depth.</li>
    <li>Database: pg_locks / SHOW ENGINE INNODB STATUS for lock waits.</li>
    <li>Network latency to downstream services (DNS, TLS handshake).</li>
    <li>Disk I/O wait (iowait %) — logging, metrics export saturation.</li>
    <li>GC logs — long pauses with low average CPU.</li>
    <li>Distributed trace waterfall — where threads spend wall-clock time.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Threads blocked on HikariCP getConnection()</li>
  <li>Downstream HTTP call slow — threads wait, CPU idle</li>
  <li>Database row-level lock contention</li>
  <li>Thread pool exhausted — requests queue at Tomcat acceptor</li>
  <li>Synchronous call to slow external API</li>
  <li>File system or NFS latency on log writes</li>
  <li>Excessive context switching from too many threads</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Diagnose with thread dumps and tracing, not CPU graphs. Add timeouts, async where possible, fix DB locks, increase pool sizes only after identifying wait source. Use virtual threads for I/O-bound blocking (Java 21+).</p>

<pre><code>// Thread dump analysis — many threads like:
// "http-nio-8080-exec-12" #45 waiting on org.postgresql.jdbc.PgConnection

// Micrometer — track pool waits
@Bean
public MeterBinder hikariMetrics(HikariDataSource ds) {
    return new HikariCPMetrics(ds, List.of());
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Low CPU with high latency means threads are blocked waiting, not computing. I take thread dumps to find BLOCKED/WAITING threads, check DB lock waits, connection pool pending, downstream HTTP latency, and GC pause logs. Usually it&apos;s pool exhaustion, slow external API, or DB locks — fix the wait, not CPU scaling.</div>

<h3>Detailed Interview Answer</h3>
<p>CPU measures computation; latency measures wall-clock time including waits. Classic scenario: 200 threads all blocked on 5-second payment gateway response — CPU 5%, latency 5 seconds.</p>
<p>Thread dump is the #1 tool. Look for pool thread names stuck at socket read or JDBC connection. DB side: query pg_stat_activity for wait_event. Fix by timeout, circuit breaker, async, or query optimization — not more CPU cores.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Adding CPU limits/requests based on CPU metrics alone</li>
    <li>Scaling pods when all threads blocked on one shared DB</li>
    <li>Ignoring iowait and network latency</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>A restaurant kitchen with idle chefs (low CPU) but 2-hour food wait — chefs aren&apos;t slow, they&apos;re waiting for ingredients from a backed-up supplier (downstream DB/API).</p>
</div>
`
},

"q16": {
  title: "Find the Bottleneck Layer",
  html: `
<h2>How do you identify whether the bottleneck is in the application, database, network, or a downstream service?</h2>
<p class="subtitle">Performance &amp; Latency · Production Scenario 2026</p>
<span class="tag tag-red">Performance &amp; Latency</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Measure time spent in each <strong>hop</strong> of the request path. The hop consuming the largest share of p99 latency is your bottleneck. Use tracing, metrics per layer, and elimination — not guessing.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Enable distributed tracing end-to-end (W3C trace context).</li>
    <li>Compare app server time vs total request time (gap = network/client).</li>
    <li>DB: slow query log, APM DB span duration, connection wait time.</li>
    <li>Network: ping, mtr, TLS handshake time, payload size.</li>
    <li>Downstream: client-side span vs server-side span for same call.</li>
    <li>Load test one layer at a time — DB only, mock downstream.</li>
    <li>Use USE method: Utilization, Saturation, Errors per resource.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>App CPU high → application bottleneck (logic, serialization)</li>
  <li>DB span &gt; 80% of trace → database (query, lock, pool)</li>
  <li>HTTP client span dominant → downstream service</li>
  <li>Gap between spans → network or untraced code</li>
  <li>All layers low but latency high → queueing (thread pool saturation)</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Build a latency budget per layer: 20ms app, 50ms DB, 30ms cache, 100ms downstream max. Alert when any layer exceeds budget. Fix the dominant span first — optimizing app code when DB takes 4s wastes effort.</p>

<pre><code>// OpenTelemetry / Micrometer tracing — Feign auto-instruments outbound calls
@Bean
public RestTemplateCustomizer traceRestTemplate(RestTemplateBuilder b) {
    return restTemplate -> restTemplate.getInterceptors()
        .add(new ClientHttpRequestInterceptor() { /* trace propagation */ });
}

// Compare spans in Jaeger:
// GET /orders → 5200ms total
//   ├─ order-service: 45ms
//   ├─ jdbc:query: 4800ms  ← bottleneck
//   └─ inventory-http: 320ms</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I use distributed tracing to break p99 latency into spans per hop — app, DB, cache, downstream HTTP. The longest span is the bottleneck. I cross-check with DB slow logs, pool metrics, and client vs server timing on external calls. I fix the layer that consumes the most time, not where I assume the problem is.</div>

<h3>Detailed Interview Answer</h3>
<p>Systematic approach beats intuition. Jaeger waterfall for one slow request tells you more than hours of code review. If jdbc:select dominates, run EXPLAIN ANALYZE. If feign.InventoryClient dominates, investigate inventory service. If app span is long with low DB time, profile CPU — Jackson serialization, regex, or lock contention.</p>
<p>Elimination technique: stub downstream with WireMock — if latency drops, downstream confirmed. Direct DB query from psql — if still slow, not app overhead.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Profiling Java CPU when threads are I/O blocked</li>
    <li>No instrumentation on outbound HTTP calls</li>
    <li>Fixing network before checking DB slow queries</li>
  </ul>
</div>
`
},

"q17": {
  title: "Slow SQL in Prod, Fast in Dev",
  html: `
<h2>A SQL query takes 10 seconds in production but runs fast in development. How would you investigate?</h2>
<p class="subtitle">Performance &amp; Latency · Production Scenario 2026</p>
<span class="tag tag-red">Performance &amp; Latency</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Production has <strong>more data</strong>, different <strong>indexes</strong>, different <strong>query plans</strong>, and <strong>contention</strong> dev doesn&apos;t have. A query that scans 100 rows locally scans 50 million rows in prod.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Run EXPLAIN (ANALYZE, BUFFERS) on production read replica — never blind on primary if possible.</li>
    <li>Compare execution plan dev vs prod — seq scan vs index scan?</li>
    <li>Check missing index on WHERE/JOIN columns.</li>
    <li>Verify table statistics fresh — ANALYZE table if stale.</li>
    <li>Check data skew — one partition dominates.</li>
    <li>Look for lock waits during peak — query fast alone, slow under load.</li>
    <li>Compare parameter values — prod queries different date range?</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Full table scan on large prod dataset</li>
  <li>Index exists in dev migration but missing in prod</li>
  <li>Stale statistics → optimizer chooses bad plan</li>
  <li>Implicit type conversion preventing index use</li>
  <li>N+1 queries amplified by prod data volume</li>
  <li>Lock contention only visible under concurrent load</li>
  <li>Read replica lag causing unexpected behavior</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Add covering index for hot query. Rewrite query to sargable form (no function on indexed column). Paginate large result sets. Use query timeout. Hibernate: enable show_sql only in dev; use p6spy or datasource-proxy in staging with prod-like data volume.</p>

<pre><code>-- EXPLAIN ANALYZE in PostgreSQL
EXPLAIN (ANALYZE, BUFFERS)
SELECT o.* FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'PENDING' AND o.created_at &gt; '2025-01-01';

-- Fix: composite index matching WHERE + JOIN
CREATE INDEX CONCURRENTLY idx_orders_status_created
  ON orders (status, created_at) INCLUDE (customer_id);</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Prod has more data and different plans. I run EXPLAIN ANALYZE on prod replica, compare with dev plan, check for sequential scans, missing indexes, and stale statistics. I verify migrations applied, look for lock contention under load, and test with production-scale data in staging — not empty dev DB.</div>

<h3>Detailed Interview Answer</h3>
<p>The #1 reason: dev has 1000 rows, prod has 100 million. Index unnecessary locally becomes mandatory in prod. Second: migration drift — index created manually in dev, never deployed. Third: parameter sniffing — plan optimized for atypical first parameter.</p>
<p>Always reproduce with realistic data volume. Use pg_stat_statements for aggregated slow query stats. CREATE INDEX CONCURRENTLY avoids locking production writes.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Concluding &quot;DB is slow&quot; without EXPLAIN plan</li>
    <li>Adding index on wrong column order for composite query</li>
    <li>Testing against empty local Docker Postgres</li>
  </ul>
</div>
`
},

"q18": {
  title: "Distributed Transactions Across Microservices",
  html: `
<h2>How do you handle distributed transactions across microservices?</h2>
<p class="subtitle">Debugging &amp; Transactions · Production Scenario 2026</p>
<span class="tag tag-green">Debugging &amp; Transactions</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>You <strong>cannot use a single @Transactional</strong> across two microservices — each has its own database. Instead use <strong>Saga</strong> (choreography or orchestration), <strong>outbox pattern</strong>, or accept <strong>eventual consistency</strong>. Classic 2PC (two-phase commit) is avoided in microservices due to blocking and coupling.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Map the business flow: which services must succeed together?</li>
    <li>Identify compensating actions for each step (cancel reservation, refund).</li>
    <li>Choose saga style: choreography (events) vs orchestration (central coordinator).</li>
    <li>Implement outbox table for reliable event publish after local commit.</li>
    <li>Design idempotent consumers for each saga step.</li>
    <li>Define timeout and compensation triggers per step.</li>
    <li>Audit saga state table for stuck/in-doubt transactions.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Trying XA/2PC across services — fragile, poor availability</li>
  <li>No compensation if step 3 fails after step 1–2 succeeded</li>
  <li>Events published before local DB commit (dual-write problem)</li>
  <li>Missing saga timeout — order stuck in PENDING forever</li>
  <li>Non-idempotent saga steps on redelivery</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Transactional outbox: write business row + outbox event in same local transaction. Poller publishes to Kafka. Saga orchestrator tracks state machine: RESERVED → PAID → SHIPPED; on PAYMENT_FAILED → compensate RESERVE.</p>

<pre><code>@Transactional
public void placeOrder(Order order) {
    orderRepo.save(order);
    outboxRepo.save(new OutboxEvent("OrderCreated", order.getId(), toJson(order)));
}

// Orchestrator state machine
public void onPaymentFailed(OrderId id) {
    sagaRepo.markFailed(id);
    inventoryClient.releaseReservation(id);  // compensating transaction
    orderRepo.markCancelled(id);
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I avoid 2PC across microservices. Each service has a local transaction; I coordinate with Saga pattern — sequence of local transactions with compensating actions on failure. I use transactional outbox to publish events reliably after DB commit. Eventual consistency is accepted; idempotency and saga state tracking are mandatory.</div>

<h3>Detailed Interview Answer</h3>
<p>Microservices principle: each service owns its data. Cross-service ACID is an anti-pattern at scale. Saga breaks global transaction into steps: create order (Order Service), reserve inventory (Inventory), charge payment (Payment). If payment fails, compensate by releasing inventory and cancelling order.</p>
<p>Outbox solves Kafka + DB atomicity without XA. Never publish event then save DB — crash between them causes inconsistency.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Distributed @Transactional with Seata/XA without understanding availability cost</li>
    <li>No compensating transaction defined</li>
    <li>Choreography saga without visibility into global state</li>
  </ul>
</div>
`
},

"q19": {
  title: "Saga Pattern & Compensation Failures",
  html: `
<h2>When should you use the Saga Pattern, and how do you deal with compensation failures?</h2>
<p class="subtitle">Debugging &amp; Transactions · Production Scenario 2026</p>
<span class="tag tag-green">Debugging &amp; Transactions</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Use Saga when a business operation spans multiple services and you need <strong>all-or-nothing behavior without 2PC</strong>. If step 3 fails, Saga runs <strong>compensating transactions</strong> to undo steps 1–2. If compensation itself fails, you need <strong>retry, alerting, and manual intervention</strong> — not hope.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Define saga steps and matching compensate action for each.</li>
    <li>Store saga state: STARTED, COMPLETED, COMPENSATING, FAILED.</li>
    <li>On forward step failure → trigger compensation chain in reverse order.</li>
    <li>Make compensations idempotent — retry safe.</li>
    <li>If compensation fails → retry with exponential backoff.</li>
    <li>After max retries → alert ops, mark REQUIRES_MANUAL_REVIEW.</li>
    <li>Build admin API/dashboard for stuck sagas.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Compensation not idempotent — double-refund risk</li>
  <li>No retry on transient compensation failure</li>
  <li>Compensation order wrong (undo B before undo A)</li>
  <li>Missing dead letter queue for failed compensations</li>
  <li>No human escalation path for irrecoverable states</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Saga fits long-running business processes: e-commerce order, travel booking, loan approval. On compensation failure: persist COMPENSATION_FAILED status, publish to DLQ, retry job every 5 min, page on-call after 3 failures. Some states need manual reconciliation — design for it.</p>

<pre><code>@Retryable(retryFor = CompensationException.class, maxAttempts = 5,
           backoff = @Backoff(delay = 5000, multiplier = 2))
public void compensatePayment(SagaContext ctx) {
    paymentClient.refund(ctx.paymentId(), ctx.idempotencyKey());
    sagaRepo.updateStatus(ctx.id(), SagaStatus.COMPENSATED);
}

@Recover
public void recover(CompensationException ex, SagaContext ctx) {
    sagaRepo.updateStatus(ctx.id(), SagaStatus.MANUAL_REVIEW_REQUIRED);
    alertService.page("Saga compensation failed: " + ctx.id());
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Use Saga for multi-service workflows where 2PC isn&apos;t acceptable — orders, payments, bookings. Each step has a compensating action. If compensation fails, I retry with backoff, make compensations idempotent, move to dead letter queue, alert ops, and flag for manual review. Sagas are never fully automatic for money paths.</div>

<h3>Detailed Interview Answer</h3>
<p>Saga vs 2PC: Saga favors availability; 2PC favors consistency but blocks on coordinator failure. Use orchestration when flow is complex; choreography when few steps and teams are decoupled.</p>
<p>Compensation failure is the hard interview part. Refund API down during rollback — you cannot lose track. Persist saga state durably, retry compensations, never silently drop. Manual reconciliation dashboard is production requirement for payment sagas.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Assuming compensation always succeeds</li>
    <li>No saga visibility — debugging requires grep across 5 services</li>
    <li>Using Saga for simple single-service transactions</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Booking a trip: flight reserved, hotel booked, payment fails. Saga cancels hotel and flight (compensation). If cancel-hotel API fails, you don&apos;t pretend the trip is fine — you retry cancel and call the hotel manually.</p>
</div>
`
}

,

"q20": {
  title: "Network Retry Duplicate Request",
  html: `
<h2>The same request reaches your service twice due to a network retry. How do you guarantee consistent results?</h2>
<p class="subtitle">Idempotency &amp; Payments · Production Scenario 2026</p>
<span class="tag tag-green">Idempotency &amp; Payments</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Network retries are invisible to users but deadly without idempotency. The second request must return the <strong>same response</strong> as the first — not run business logic twice. Track request fingerprint and short-circuit duplicates.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Identify retry source: client SDK, API gateway, load balancer, service mesh.</li>
    <li>Require Idempotency-Key or dedupe on natural business key (orderId).</li>
    <li>Store request hash → response with TTL in Redis/DB.</li>
    <li>Return identical status code and body for duplicate within TTL.</li>
    <li>Use DB unique constraint as ultimate safety net.</li>
    <li>Log duplicate detection separately from errors.</li>
    <li>Test with intentional double-submit integration tests.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>POST treated as non-idempotent without protection</li>
  <li>Gateway retries on slow response (client timeout &lt; server processing)</li>
  <li>Different payloads on &quot;retry&quot; — key collision</li>
  <li>Response not cached for duplicate key</li>
  <li>Race on concurrent identical requests</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Idempotency middleware: extract key from header or derive from (userId + operation + clientRequestId). Atomic claim, execute once, cache serialized response. HTTP 200 with same body — not 409 Conflict for successful duplicate.</p>

<pre><code>@Component
public class IdempotencyFilter extends OncePerRequestFilter {
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {
        String key = req.getHeader("Idempotency-Key");
        if (key != null) {
            Optional&lt;CachedResponse&gt; cached = store.find(key);
            if (cached.isPresent()) {
                writeResponse(res, cached.get());
                return;
            }
        }
        chain.doFilter(req, res);
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Network retries are expected. I require an idempotency key, atomically claim it on first request, store the response, and return the same response for duplicates. DB unique constraints protect the business operation. The client gets consistent results whether the request arrived once or twice.</div>

<h3>Detailed Interview Answer</h3>
<p>HTTP POST is not inherently idempotent — retries are the caller&apos;s responsibility but your server must defend. Mobile apps and API gateways retry on timeout even when server actually succeeded — classic double-charge scenario.</p>
<p>Response caching for idempotency keys must include status code and body. For in-flight duplicate, return 409 with Retry-After or block until first completes — Stripe returns same 200. Choose based on client expectations.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Detecting duplicate but returning different HTTP status</li>
    <li>Idempotency key scoped globally instead of per-tenant</li>
    <li>No protection on internal service-to-service POST retries</li>
  </ul>
</div>
`
},

"q21": {
  title: "Zero-Downtime Spring Boot Deploy",
  html: `
<h2>How would you deploy a new Spring Boot version with zero downtime?</h2>
<p class="subtitle">Kubernetes &amp; Deploy · Production Scenario 2026</p>
<span class="tag tag-red">Kubernetes &amp; Deploy</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Never stop all instances at once. Deploy new pods <strong>alongside</strong> old ones, wait until healthy, shift traffic gradually, then terminate old pods. Kubernetes RollingUpdate + readiness probes enable this.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Configure Deployment strategy: RollingUpdate with maxUnavailable: 0, maxSurge: 1.</li>
    <li>Ensure readiness probe passes only when app fully started.</li>
    <li>Use backward-compatible API and DB migrations (expand-contract).</li>
    <li>Run blue-green or canary for high-risk releases.</li>
    <li>Verify preStop hook and graceful shutdown drain in-flight requests.</li>
    <li>Monitor error rate and latency during rollout — auto-rollback on spike.</li>
    <li>Database migrations run before or compatible with both versions.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>maxUnavailable: 50% kills half capacity mid-traffic</li>
  <li>Readiness passes before DB migrations complete</li>
  <li>Breaking API change deployed before clients update</li>
  <li>No graceful shutdown — in-flight requests killed</li>
  <li>Singleton or in-memory state lost on rolling restart</li>
  <li>Health check includes optional dependency causing flap</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Kubernetes rolling deployment: new pod starts → readiness OK → join Service endpoints → old pod receives SIGTERM → preStop sleep → graceful shutdown → terminate. Spring Boot 3: server.shutdown=graceful. Flyway migrations backward-compatible for dual-version window.</p>

<pre><code># deployment.yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1

# application.yml
server:
  shutdown: graceful
spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I use Kubernetes rolling deployment with maxUnavailable 0 — new pods start and pass readiness before old ones terminate. Spring Boot graceful shutdown drains in-flight requests. DB migrations follow expand-contract for backward compatibility. For risky releases I add canary or blue-green with traffic split and automated rollback on error spike.</div>

<h3>Detailed Interview Answer</h3>
<p>Zero downtime requires three things: surplus capacity during rollout, health-gated traffic shift, graceful connection drain. Rolling update is default; blue-green swaps Service selector between two Deployments; canary sends 5% traffic to new version via service mesh or ingress weight.</p>
<p>Schema changes kill zero-downtime if v2 needs column v1 doesn&apos;t have — use expand-contract: add column nullable → deploy v2 writing both → backfill → deploy v2 reading new → remove old.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Destructive DB migration in same release as code</li>
    <li>Liveness probe killing pods during 60s Spring Boot startup</li>
    <li>Ignoring connection drain — users see 502 during deploy</li>
  </ul>
</div>
`
},

"q22": {
  title: "Graceful Shutdown & Pod Termination",
  html: `
<h2>What happens to in-flight requests during Kubernetes pod termination, and how do you implement graceful shutdown?</h2>
<p class="subtitle">Kubernetes &amp; Deploy · Production Scenario 2026</p>
<span class="tag tag-red">Kubernetes &amp; Deploy</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When K8s deletes a pod, it sends <strong>SIGTERM</strong>. The pod is removed from load balancer endpoints, but existing requests need time to finish. Graceful shutdown = stop accepting new work, complete in-flight requests, then exit.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Understand sequence: SIGTERM → preStop hook → endpoint removal → grace period → SIGKILL.</li>
    <li>Enable server.shutdown=graceful in Spring Boot.</li>
    <li>Add preStop: sleep 5–15s to allow endpoint propagation delay.</li>
    <li>Register shutdown hook to close Kafka consumers cleanly.</li>
    <li>Set terminationGracePeriodSeconds (default 30s) to match max request time.</li>
    <li>Test with load during kubectl delete pod — count 502s.</li>
    <li>Monitor in-flight request metric during rollouts.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>terminationGracePeriodSeconds too short for long requests</li>
  <li>No preStop — LB still sends traffic while app shutting down</li>
  <li>Kafka consumer rebalance storm on abrupt shutdown</li>
  <li>Thread pool killed mid-request</li>
  <li>Ignoring SIGTERM — forced SIGKILL at grace period end</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Spring Boot 3 graceful shutdown stops Tomcat acceptor, waits for active requests up to timeout-per-shutdown-phase. preStop sleep bridges K8s endpoint update lag. For Kafka: @PreDestroy or SmartLifecycle to commit offsets and leave group cleanly.</p>

<pre><code>lifecycle:
  preStop:
    exec:
      command: ["sh", "-c", "sleep 10"]
terminationGracePeriodSeconds: 60

// Spring Boot
server.shutdown=graceful
spring.lifecycle.timeout-per-shutdown-phase=45s

@Bean
public ServletWebServerFactory servletContainer() {
    TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
    factory.addConnectorCustomizers(connector ->
        connector.setProperty("connectionTimeout", "20000"));
    return factory;
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> On pod termination K8s sends SIGTERM and removes the pod from Service endpoints. In-flight requests need graceful shutdown: Spring Boot server.shutdown=graceful stops new accepts and waits for active requests. I add preStop sleep for endpoint propagation, set terminationGracePeriodSeconds to cover max request duration, and cleanly stop Kafka consumers before exit.</div>

<h3>Detailed Interview Answer</h3>
<p>Timeline: kubectl delete → kubelet SIGTERM → concurrently endpoint controller removes pod IP from Service → preStop runs → app graceful shutdown → if still running after grace period, SIGKILL (exit 137).</p>
<p>Endpoint removal isn&apos;t instant — preStop sleep 10s is common pattern. Match grace period to p99 request time plus buffer. Long-running jobs should check interruption flag and checkpoint.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>graceful shutdown enabled but terminationGracePeriodSeconds: 10</li>
    <li>Killing pod during deploy without maxUnavailable: 0</li>
    <li>Not testing shutdown under real load</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Closing a restaurant: stop seating new customers (readiness fails), let current diners finish their meals (graceful shutdown), then lock the door. preStop is the &quot;closed&quot; sign while last tables wrap up.</p>
</div>
`
},

"q23": {
  title: "Rate Limiting at Millions Scale",
  html: `
<h2>How would you design rate limiting for an API serving millions of users?</h2>
<p class="subtitle">Scale &amp; Security · Production Scenario 2026</p>
<span class="tag tag-yellow">Scale &amp; Security</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Rate limiting caps how many requests a user/IP/API-key can make per second. At millions of users, you need <strong>distributed counters in Redis</strong>, efficient algorithms (token bucket, sliding window), and enforcement at the <strong>API gateway</strong> edge.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Define limits per tier: free vs premium, per API key, per IP.</li>
    <li>Choose algorithm: token bucket (bursts) or sliding window (smooth).</li>
    <li>Implement distributed counter — Redis INCR + EXPIRE or Lua script.</li>
    <li>Enforce at gateway (Kong, Envoy, Nginx) before app servers.</li>
    <li>Return 429 Too Many Requests with Retry-After header.</li>
    <li>Shard Redis for rate limit cluster; local cache for hot keys optional.</li>
    <li>Monitor 429 rate and adjust limits per abuse patterns.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>In-memory rate limit per pod — inconsistent limits at scale</li>
  <li>Redis single point of failure without fallback policy</li>
  <li>Too coarse key (IP NAT) blocking innocent users</li>
  <li>Too fine key — millions of Redis keys memory pressure</li>
  <li>No bypass for internal/trusted traffic</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Edge gateway rate limiting reduces load on app tier. Redis sliding window log or GCRA algorithm. Bucket4j with Redis backend for Spring Boot. Tiered limits stored in config service. DDoS layer (Cloudflare) separate from per-user API quotas.</p>

<pre><code>// Bucket4j + Redis — distributed token bucket
@Bean
public Supplier&lt;Bucket&gt; rateLimitBucket(RedisClient redis, String apiKey) {
    return () -> {
        Bandwidth limit = Bandwidth.builder()
            .capacity(100).refillGreedy(100, Duration.ofMinutes(1)).build();
        return Bucket.builder()
            .addLimit(limit)
            .build(redisProxyManager.getProxy("rate:" + apiKey, () -> limit));
    };
}

// Gateway response
HTTP/1.1 429 Too Many Requests
Retry-After: 12
X-RateLimit-Remaining: 0</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> At millions of users I enforce rate limits at the API gateway with distributed Redis counters — token bucket or sliding window per API key. Return 429 with Retry-After. Shard Redis, tier limits by customer plan, and keep a local edge cache for hot keys. Separate DDoS protection from business rate quotas.</div>

<h3>Detailed Interview Answer</h3>
<p>Centralized in-memory fails with 500 pods — each allows full quota. Distributed Redis with atomic Lua script increments counter and checks threshold in one round trip. Token bucket allows bursts (100 req burst, refill 10/sec); sliding window prevents burst at window boundary.</p>
<p>Gateway enforcement saves 95% of abusive traffic from hitting Spring Boot. For Redis outage: fail open (allow) risks abuse; fail closed (reject) risks outage — document business choice.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Rate limiting only in app code, not at edge</li>
    <li>Fixed window allowing 2× burst at minute boundaries</li>
    <li>No Retry-After header on 429</li>
  </ul>
</div>
`
},

"q24": {
  title: "Investigate Memory Leak",
  html: `
<h2>Your application&apos;s memory keeps growing and crashes after a few days. How would you investigate a memory leak?</h2>
<p class="subtitle">Debugging &amp; Transactions · Production Scenario 2026</p>
<span class="tag tag-green">Debugging &amp; Transactions</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>A memory leak means objects are <strong>referenced but never used</strong> — GC cannot collect them. Heap grows until OOM. Find what holds references: static collections, caches without eviction, ThreadLocal, or listeners never removed.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Monitor heap usage trend in Prometheus — sawtooth growing baseline.</li>
    <li>Enable -XX:+HeapDumpOnOutOfMemoryError; capture heap dump before crash.</li>
    <li>Analyze with Eclipse MAT — Dominator Tree, leak suspects report.</li>
    <li>Compare two heap dumps 24h apart — what grew?</li>
    <li>Check static Map/List caches growing unbounded.</li>
    <li>Review ThreadLocal usage — thread pool threads retain values.</li>
    <li>Verify cache TTL and max size (Caffeine maximumSize).</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Static HashMap accumulating session or request data</li>
  <li>Cache without eviction policy or TTL</li>
  <li>ThreadLocal not removed in pooled threads</li>
  <li>Event listeners registered but never unregistered</li>
  <li>HTTP connection or stream not closed (native memory leak)</li>
  <li>Classloader leak on hot redeploy (Metaspace)</li>
  <li>Large objects retained in logging MDC or diagnostic context</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Fix retention path — remove static accumulator, add Caffeine cache with maximumSize and expireAfterWrite, always ThreadLocal.remove() in finally block. Continuous profiling (Async Profiler, JFR) in staging. Set reasonable heap and alert on old-gen growth rate.</p>

<pre><code>// BAD — unbounded static cache
private static final Map&lt;String, byte[]&gt; REPORT_CACHE = new HashMap&lt;&gt;();

// GOOD — bounded Caffeine cache
@Bean
public Cache&lt;String, Report&gt; reportCache() {
    return Caffeine.newBuilder()
        .maximumSize(10_000)
        .expireAfterWrite(Duration.ofHours(1))
        .recordStats()
        .build();
}

// ThreadLocal — always clean up
try {
    userContext.set(user);
    process();
} finally {
    userContext.remove();
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Growing heap over days signals a leak — objects retained by strong references. I monitor heap trend, take heap dumps with MAT dominator tree analysis, compare dumps over time, and look for unbounded static collections, caches without TTL, and ThreadLocal not removed. Fix the retention path, add bounded caches, and enable HeapDumpOnOutOfMemoryError.</div>

<h3>Detailed Interview Answer</h3>
<p>GC logs showing increasing old-gen after full GC confirm leak vs normal growth. MAT leak suspects points to largest retained sets — often a static Map holding RequestContext from every API call since deploy.</p>
<p>ThreadLocal on Tomcat thread pool is subtle: 200 threads each hold 50MB context = 10GB leak over time. Always remove in filter finally block. Native memory leaks (DirectByteBuffer) won&apos;t show in heap dump — check MaxDirectMemorySize and native memory tracking.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Only increasing -Xmx without finding leak</li>
    <li>Calling System.gc() and concluding no leak</li>
    <li>Analyzing heap dump without dominator tree</li>
  </ul>
</div>
`
},

"q25": {
  title: "Debug Traffic-Only Production Issue",
  html: `
<h2>A production issue occurs only under heavy traffic and can&apos;t be reproduced locally. What&apos;s your debugging approach?</h2>
<p class="subtitle">Debugging &amp; Transactions · Production Scenario 2026</p>
<span class="tag tag-green">Debugging &amp; Transactions</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Heavy-traffic-only bugs are usually <strong>concurrency, resource exhaustion, or timing</strong> issues invisible at low load. You need production observability, load testing at scale, and techniques to capture the failure window — not more local debugging alone.</p>
</div>

<div class="steps-box">
  <h4>Investigation / Debugging Steps</h4>
  <ol>
    <li>Correlate issue timing with traffic peaks, deploys, batch jobs.</li>
    <li>Capture production metrics: thread pools, locks, GC, pool saturation at incident time.</li>
    <li>Enable sampling profiling in prod briefly (JFR, async-profiler) during peak.</li>
    <li>Reproduce in staging with production-like data volume and load test.</li>
    <li>Add temporary debug logging with rate limit — avoid log storm.</li>
    <li>Use feature flags to bisect recent changes under load.</li>
    <li>Chaos engineering — inject latency/failure at scale in staging.</li>
  </ol>
</div>

<h3>Root Causes to Check</h3>
<ul>
  <li>Race condition — check-then-act without synchronization</li>
  <li>Connection pool or thread pool exhaustion at peak only</li>
  <li>DB lock contention with concurrent writes</li>
  <li>Cache stampede at TTL expiry under load</li>
  <li>Thundering herd on cold start / auto-scale event</li>
  <li>File descriptor or port exhaustion</li>
  <li>JIT/deopt rare path only hit at volume</li>
</ul>

<h3>Solution / Design Approach</h3>
<p>Build production parity staging with anonymized prod data snapshot. Continuous load testing in CI at 2× expected peak. Production: always-on tracing, RED metrics, lock contention alerts. When incident hits: preserve evidence — thread dumps, heap dumps, slow query snapshots before restart clears state.</p>

<pre><code>// Capture thread dump on high latency alert (Actuator)
@EventListener
public void onHighLatency(HighLatencyEvent e) {
    if (e.p99Ms() &gt; 3000) {
        threadDumpExporter.captureAsync("incident-" + Instant.now());
    }
}

// Staging load test — k6
export const options = {
  stages: [
    { duration: '5m', target: 5000 },
    { duration: '10m', target: 10000 },
    { duration: '5m', target: 0 },
  ],
  thresholds: { http_req_duration: ['p(99)&lt;500'] },
};</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Traffic-only bugs are concurrency or resource exhaustion. I correlate with traffic peaks, capture thread dumps and metrics at incident time, reproduce in staging with prod-scale data and load tests. I use distributed tracing, brief JFR profiling during peak, and chaos tests. I preserve evidence before pod restarts erase the smoking gun.</div>

<h3>Detailed Interview Answer</h3>
<p>Local dev lacks concurrency — single user hides race conditions. &quot;Works on my machine&quot; with 10 rows vs 10 million rows misses index and lock issues. Approach: treat production as the lab — observability first, reproduction second.</p>
<p>During incident: don&apos;t restart all pods immediately — grab thread dumps from lagging instances. Compare metrics normal vs peak traffic. Staging must mirror prod topology: same pool sizes, same data cardinality, 70% of prod QPS minimum in load test.</p>
<p>Feature flag bisection: disable new code path under load to confirm suspect change without full rollback.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Restarting all pods before capturing dumps/logs</li>
    <li>Load testing with mocked DB returning instant responses</li>
    <li>Adding verbose logging in prod during peak (makes it worse)</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>A bridge that cracks only when 10,000 cars cross — testing with 10 cars proves nothing. You need scale testing, strain gauges on the real structure (metrics), and cameras rolling during rush hour (profiling at peak).</p>
</div>
`
}

};
