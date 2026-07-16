/** Plain-language summaries injected into each interview article */
const SIMPLE_EXPLANATIONS = {
  "How does HashMap work internally?": "Think of HashMap like a row of numbered boxes. You put a key-value pair in the box number that matches the key's hash. If two keys land in the same box, they form a small linked list inside that box. When the map gets too full, it creates more boxes and moves items.",
  "HashMap vs ConcurrentHashMap": "HashMap is fine for one thread only. ConcurrentHashMap is safe when many threads read and write at the same time — it locks only one small box at a time instead of locking the whole map.",
  "equals() vs hashCode()": "equals() answers: are these two objects the same in meaning? hashCode() gives a number used to pick a bucket in HashMap. If two objects are equal, they must give the same hashCode — otherwise HashMap breaks.",
  "String vs StringBuilder vs StringBuffer": "String never changes — every change creates a new object. StringBuilder is for building text quickly in one thread. StringBuffer is like StringBuilder but safe for multiple threads — slower and rarely needed today.",
  "Abstract Class vs Interface": "Abstract class = a partial blueprint with some shared code; a class can extend only one. Interface = a contract listing what a class must do; a class can implement many. Use abstract class when sharing code; interface when defining a role.",
  "Comparable vs Comparator": "Comparable means the class knows its natural order (sort by date). Comparator is an external rule so you can sort the same class in different ways (by name, by amount) without changing the class.",
  "Immutable Class — How to create one?": "Make an object that cannot change after creation — all fields final, no setters, copy any list/map given in the constructor so outsiders cannot modify internal data. Safe to share across threads.",
  "What is the String Constant Pool?": "A special storage area where Java keeps unique text literals. If you write \"hello\" twice, both may point to the same stored text — saves memory. new String(\"hello\") always creates a separate object.",
  "Deep Copy vs Shallow Copy": "Shallow copy copies the object but shares nested objects inside it — changing a list inside the copy may change the original. Deep copy copies everything inside too — fully independent.",
  "Fail Fast vs Fail Safe Iterator": "Fail-fast throws an error if you change a collection while looping (ArrayList, HashMap). Fail-safe loops over a snapshot or copy so it won't crash but may miss fresh changes (ConcurrentHashMap).",
  "synchronized vs ReentrantLock": "Both let only one thread enter a critical section. synchronized is built into Java and simple. ReentrantLock is manual but gives extras: try with timeout, fair ordering, and separate wait queues.",
  "volatile keyword": "Tells all threads to read the latest value from main memory, not a stale cached copy. Good for simple flags like shutdown=true. Does NOT make count++ safe — use AtomicInteger for that.",
  "Callable vs Runnable": "Both run tasks in another thread. Runnable returns nothing and cannot throw checked exceptions easily. Callable returns a result and can throw exceptions — used with Future when you need an answer back.",
  "Future vs CompletableFuture": "Future makes you block and wait with get(). CompletableFuture lets you chain steps: do A, then B, then C, handle errors, combine multiple async jobs — much better for modern async code.",
  "Deadlock and how to prevent it": "Two threads each hold a lock the other needs — both freeze forever. Prevent by always locking in the same order, using timeouts, keeping locks short, or avoiding nested locks.",
  "CountDownLatch vs CyclicBarrier": "CountDownLatch is a one-time gate — wait until N tasks finish (e.g. wait for all files to load). CyclicBarrier is a reusable meeting point — threads sync, do work, sync again in a loop.",
  "ExecutorService internals": "A thread pool with a queue of tasks. Core threads handle work first; extra tasks wait in queue; if queue fills, more threads spawn up to max. Rejected tasks need a policy (drop, block, or run in caller thread).",
  "Thread Pool tuning": "Too few threads = slow under load. Too many = wasted memory and context switching. CPU work ≈ number of cores; I/O work (DB, HTTP) often needs more threads because they wait a lot.",
  "Producer-Consumer problem": "One side produces items, another consumes them, using a shared buffer. BlockingQueue is the standard fix — producers wait when full, consumers wait when empty.",
  "Java Memory Model (JMM)": "Rules about when changes made by one thread become visible to another. Without volatile or locks, another thread might see old values due to CPU caching.",
  "Heap vs Stack": "Stack = each thread's scratch pad for method calls and local variables — fast, small. Heap = shared storage for all objects — garbage collected. OutOfMemory usually means heap is full.",
  "Metaspace vs PermGen": "Old Java (PermGen) had a fixed area for class info that often ran out. Metaspace (Java 8+) grows as needed but can still leak if class loaders are not released (common with hot redeploy).",
  "Garbage Collection algorithms": "GC finds unused objects and frees memory. Young objects die fast (minor GC). Long-lived objects move to Old Gen (major GC). Different algorithms trade pause time vs throughput.",
  "G1 GC vs Parallel GC": "Parallel GC maximizes total work done but may pause longer. G1 tries to keep pauses short and predictable — better for live APIs where users feel long freezes.",
  "Memory Leak vs Memory Overflow": "Overflow = you legitimately need more memory than -Xmx allows. Leak = memory not freed because something still holds a reference (cache, ThreadLocal, unclosed connection) even though you think you're done with it.",
  "Class Loading Process": "JVM finds class file → loads it → verifies bytecode → prepares static fields → runs static blocks. Parent class loaders load core Java classes first so your code cannot replace String.class.",
  "How JVM handles object creation?": "new MyClass() reserves memory on heap (often in Eden), sets up the object header, runs the constructor. Most new objects are garbage collected quickly if not referenced.",
  "Bean Lifecycle": "Spring creates object → injects dependencies → runs @PostConstruct → bean is ready → on shutdown runs @PreDestroy. Proxies for @Transactional are added in the middle.",
  "Dependency Injection": "Instead of your class creating its own dependencies with new, Spring supplies them. Like a restaurant kitchen getting ingredients delivered instead of the chef going to the farm.",
  "@Component vs @Service vs @Repository": "All tell Spring 'manage this class.' @Service labels business logic. @Repository labels database code and converts DB errors to Spring exceptions. Same engine, different labels for clarity.",
  "@Controller vs @RestController": "@Controller returns page names for HTML views. @RestController returns JSON/data in the HTTP body — standard for REST APIs.",
  "Spring Boot Auto Configuration": "Spring Boot looks at what's on your classpath and auto-wires common setups — if it sees a database driver, it prepares a DataSource; if it sees web jars, it starts Tomcat. You override only what you need.",
  "Exception Handling in Microservices": "Use one global handler (@ControllerAdvice) so every service returns errors in the same JSON shape with proper HTTP codes — clients and support teams know what to expect.",
  "Service Discovery": "Services register their address when they start. Other services ask the registry 'where is payment-service?' instead of hardcoding IP addresses that change after deploy.",
  "API Gateway": "One front door for all clients. It routes requests, checks auth, limits traffic, and logs everything — microservices stay private behind it.",
  "Circuit Breaker Pattern": "If a downstream service keeps failing, stop calling it for a while and return a fallback fast — like a circuit breaker tripping to prevent fire spreading.",
  "Distributed Transactions": "Hard to make two separate databases commit together. Instead use Saga: do step 1, then step 2; if step 2 fails, run a compensating undo for step 1. Accept eventual consistency.",
  "Tell me about a critical production issue you solved": "Tell a short story: what broke, what you did step by step, what fixed it, and what you changed so it won't happen again. Stay calm and factual.",
  "How do you investigate high CPU usage?": "Find the Java process, take thread dumps a few times, see which method keeps running on CPU. Often infinite loop, bad regex, or garbage collection fighting for CPU.",
  "How do you troubleshoot OutOfMemoryError?": "Check which memory area failed (heap, metaspace). Take heap dump, open in MAT, find what's eating memory. Fix the leak or increase heap only after you understand why.",
  "How do you analyze slow APIs?": "Trace one slow request end to end: is it database, external API, or your code? Compare average vs worst-case latency. Fix the slowest part first.",
  "What monitoring tools have you used?": "Metrics (Grafana/Prometheus), logs (Splunk/ELK), traces (Jaeger/Zipkin), APM (Dynatrace). Together they answer: what broke, when, and which call was slow.",
  "How do you perform Root Cause Analysis (RCA)?": "Build a timeline, ask 'why' repeatedly until you hit the real cause, document evidence, fix it, and add prevention (alert, test, runbook) — blame the process not the person.",
  "Introduce yourself and explain your project architecture": "Give name, experience, project purpose, main technologies, and how pieces connect (API → services → DB → messaging). End with what you personally built.",
  "Explain your role and responsibilities in the project": "List what you own: APIs, database, tests, deployments, bug fixes. One concrete win helps (e.g. improved performance or reduced incidents).",
  "Difference between HashMap and ConcurrentHashMap": "HashMap is not safe with multiple threads. ConcurrentHashMap is built for many threads updating and reading together without corrupting data.",
  "Explain Java Memory Model": "Where objects live (heap), where method calls live (stack per thread), and where class info lives (metaspace). Plus rules for when one thread sees another thread's writes.",
  "What is the difference between ArrayList and LinkedList?": "ArrayList is a dynamic array — fast to read by index, slower to insert in middle. LinkedList is a chain — fast insert at ends, slow random access. Usually pick ArrayList.",
  "Explain Exception Handling and Custom Exceptions": "try/catch handles errors gracefully. Create your own exception types (OrderNotFound) so business errors are clear and map cleanly to HTTP 404/400 in APIs.",
  "What is an Immutable Class and how would you create one?": "Object that cannot change after creation — final fields, no setters, copy mutable inputs. Thread-safe without locks.",
  "What happens internally when a Spring Boot application starts?": "Spring loads config, creates beans, wires dependencies, applies auto-config, starts embedded server, then your app accepts requests.",
  "Difference between @Component, @Service, and @Repository": "All register beans. Names hint at layer: generic, business, or database. @Repository also translates SQL errors.",
  "Constructor Injection vs Field Injection": "Pass dependencies through constructor (recommended — clear, testable, final fields) vs injecting into fields (hidden dependencies, harder to test).",
  "Explain Bean Lifecycle in Spring": "Create → inject → @PostConstruct → use → destroy. Transaction proxies wrap the bean after creation.",
  "How does @Transactional work internally?": "Spring wraps your service in a proxy. Before method: open DB transaction. After success: commit. On runtime error: rollback. Self-calls skip the proxy — common gotcha.",
  "Find the first non-repeating character in a String": "Count each character, then walk the string again and return the first character with count 1.",
  "Find duplicate elements in an array": "Use a Set — if add() returns false, you've seen it before. Or sort and scan neighbors.",
  "Reverse a String without using built-in methods": "Swap characters from both ends moving inward, or build a new string reading from end to start.",
  "Difference between Monolithic and Microservices Architecture": "Monolith = one big app and often one DB — simpler start. Microservices = many small apps each owning a part — deploy and scale independently but harder to operate.",
  "How do microservices communicate with each other?": "Sync = REST/gRPC when you need an immediate answer. Async = Kafka/RabbitMQ when you can send an event and process later.",
  "What is API Gateway and why is it needed?": "Single entry point that routes, authenticates, and protects backend services — clients don't call ten different URLs directly.",
  "How do you handle service failures in Microservices?": "Circuit breaker, retries with backoff, timeouts, fallbacks, async decoupling, and good monitoring so you detect issues fast.",
  "Explain Circuit Breaker Pattern": "Stop hammering a dead service — fail fast, give it time to recover, then test with one request before fully reopening.",
  "Difference between SQL and NoSQL": "SQL = tables, strict schema, great for transactions and joins. NoSQL = flexible shapes, scales out easily — documents, key-value, wide-column.",
  "Find the 2nd Highest Salary": "Find max salary, then find max among rows below that. Or use RANK() window function to handle ties properly.",
  "Difference between WHERE and HAVING": "WHERE filters rows before grouping. HAVING filters groups after GROUP BY (e.g. departments with average salary > 50k).",
  "Explain Database Indexing": "Like a book index — helps DB find rows fast without reading every row. Costs extra space and slows writes slightly.",
  "How would you optimize a slow-running query?": "Run EXPLAIN, add indexes, fetch only needed columns, avoid N+1, paginate, and fix the worst bottleneck first.",
  "What is Redis and why do we use it?": "Very fast in-memory store — cache DB results, sessions, rate limits. Cuts latency from milliseconds to microseconds for hot data.",
  "Explain Cache-Aside Pattern": "App reads cache first; on miss, read DB and store in cache. On write, update DB and delete cache entry so next read gets fresh data.",
  "What is Kafka?": "Distributed log of events — producers append messages, consumers read at their own speed. Messages kept for replay. Great for event-driven systems.",
  "How does Kafka ensure message durability?": "Copies each message to multiple brokers, waits for replicas to confirm before ack, stores on disk — survives broker crashes if configured correctly.",
  "Design a URL Shortener System": "Long URL → generate short code → store mapping in DB + cache → redirect looks up code and sends user to long URL. Scale reads with Redis.",
  "Difference between Process and Thread": "Process = separate program with own memory. Thread = lightweight worker inside a process sharing the same heap.",
  "What is ExecutorService?": "Managed thread pool — submit tasks instead of creating new threads manually. Reuses threads and queues work.",
  "CompletableFuture vs Future": "Future blocks. CompletableFuture chains async steps and combines results without blocking the main thread as much.",
  "What are Virtual Threads in Java 21?": "Very cheap threads — millions possible. Perfect when code waits on I/O (HTTP, DB). Not for heavy CPU math.",
  "How does ConcurrentHashMap achieve thread safety?": "Locks only the bucket being written; reads often need no lock. Uses volatile and CAS for safe updates without freezing the whole map.",
  "Describe a challenging production issue you solved": "STAR story: situation, your actions, tools used, outcome, and prevention added afterward.",
  "How do you handle tight deadlines?": "Clarify must-have vs nice-to-have, break into daily chunks, communicate early if blocked, deliver MVP first.",
  "How do you prioritize multiple tasks?": "Production fires first, then committed sprint work, then improvements. Align with lead when unclear.",
  "Have you ever disagreed with a team member? How did you resolve it?": "Focus on data and trade-offs, not ego. Propose POC or agree to try one approach with a review date.",
  "Why do you want to join KPMG?": "Tie to their consulting work, learning, client exposure — customize for each company you interview with.",
  "What motivates you as a developer?": "Be honest: solving real problems, reliable systems, learning, mentoring — give one concrete example.",
  "Where do you see yourself in the next 5 years?": "Grow technical depth and leadership (senior/lead), own bigger systems, mentor others — aligned with company path.",
  "Java Streams — flatMap explained": "map transforms one item to one item. flatMap transforms one item to many and flattens — like opening nested lists into one list.",
  "ConcurrentHashMap — production use cases": "Shared caches, rate limit counters, per-user session maps — anywhere many threads hit the same map.",
  "Set internals — HashSet, LinkedHashSet, TreeSet": "HashSet uses HashMap under the hood — fast, no order. LinkedHashSet remembers insertion order. TreeSet keeps sorted order via a tree.",
  "Functional Interface — production examples": "Any interface with one abstract method — enables lambdas. Predicate filters, Function maps, Consumer runs side effects.",
  "wait() and notify() — how they work": "Threads wait on a lock until another thread notifies them — classic producer-consumer coordination. Prefer BlockingQueue in real code.",
  "Race condition handling": "Two threads read-modify-write the same variable and overwrite each other. Fix with locks, atomic classes, or avoid shared mutable state.",
  "Atomicity and Locking strategies": "Atomicity = operation completes fully or not at all. Pick synchronized, ReentrantLock, atomic variables, or DB locks based on contention and scope.",
  "@Async — async processing in Spring Boot": "Method runs in a background thread pool — caller doesn't wait. Good for email, logging. Must call through Spring proxy, not this.method().",
  "Retry pattern in Spring Boot": "Automatically retry failed calls a few times with delay — only for safe/idempotent operations like reads or payments with idempotency keys.",
  "Circuit Breaker — production implementation": "Resilience4j wraps calls — after failures, open circuit and use fallback until service recovers.",
  "Stateless vs Stateful services": "Stateless = any server can handle any request (scale easily). Stateful = server remembers client state (harder to scale, needs sticky sessions or shared store).",
  "The N+1 Query Problem": "Load 100 orders (1 query) then load items for each order (100 queries). Fix with JOIN FETCH or batch fetch — one or two queries total.",
  "Lazy vs Eager Loading": "Lazy loads related data only when accessed (default, efficient). Eager loads it immediately (can over-fetch and slow down).",
  "Connection Pooling — HikariCP in Spring Boot": "Reuse DB connections instead of opening new ones each request — opening connections is slow. Pool size must match load.",
  "Hibernate & SQL Query Optimization": "Paginate, batch writes, use indexes, avoid SELECT *, fetch joins instead of lazy loops, cache read-heavy reference data.",
  "Only 1 stock left — 1000 users buying simultaneously. How do you prevent overselling?": "Lock the row in DB, use atomic Redis decrement, or queue orders one at a time. Add idempotency so double-clicks don't double-charge.",
  "JVM Memory Areas — production relevance": "Know heap vs stack vs metaspace to diagnose OOM and tune -Xmx. Most app objects live on heap.",
  "Caching strategies for scale": "Local cache (fast, per server) + Redis (shared) + CDN (static). Invalidate on write to avoid stale data.",
  "Scaling factors — vertical vs horizontal": "Vertical = bigger machine. Horizontal = more machines — needs stateless apps and load balancing.",
  "CI/CD pipeline — production workflow": "Every code change builds, tests, packages, deploys automatically through dev → staging → prod with approvals and health checks.",
  "Deployment versioning strategies": "Tag images with version + git SHA. Blue-green or canary deploys reduce risk — easy rollback if new version fails.",
  "Autoscaling in cloud environments": "Automatically add/remove pods or servers when CPU, memory, or request rate crosses thresholds.",
  "Common cloud migration challenges": "Latency between services, secrets management, observability across services, cost control, compliance, slower JVM cold starts.",
  "Java Records — what they are and when to use them": "Shortcut for immutable data classes — compiler generates constructor, getters, equals, hashCode. Perfect for DTOs and events, not JPA entities.",
  "Two Sum Problem": "For each number, check if (target - number) was seen before using a HashMap — one pass, O(n) time.",
  "Sort a list of employees: salary descending, experience ascending": "Comparator.comparing(salary).reversed().thenComparing(experience) — sort by salary high to low, then by experience low to high for ties.",
  "What is the internal difference between HashMap and ConcurrentHashMap?": "HashMap has no locking. ConcurrentHashMap uses fine-grained locks and CAS so many threads can work safely at once.",
  "Explain the JVM Memory Model: Heap, Stack, and Metaspace": "Heap holds objects, stack holds method calls per thread, metaspace holds class definitions. GC cleans heap; stack clears when method returns.",
  "What are Atomic Variables, and where are they commonly used?": "Variables updated in one unbroken hardware step — great for counters and flags without locking whole methods.",
  "What is the difference between volatile and synchronized?": "volatile = visibility only. synchronized = visibility + only one thread inside the block.",
  "How do you mitigate performance bottlenecks caused by synchronization?": "Hold locks shorter, use finer locks, use concurrent collections, prefer immutability, or design away shared state.",
  "What is ThreadLocal, and how can it lead to memory leaks?": "Each thread gets its own copy of a variable. In thread pools, if you don't remove() after use, old data sticks forever and leaks memory.",
  "What is a BlockingQueue, and where is it used in real-world applications?": "Queue that blocks producers when full and consumers when empty — perfect for worker pools and producer-consumer pipelines.",
  "What are the different approaches to achieving thread safety in Java?": "Locks, atomic variables, immutable objects, concurrent collections, thread confinement, or message passing — pick based on shared state.",
  "What is a Functional Interface?": "Interface with exactly one abstract method — lambdas can implement it. Examples: Runnable, Callable, Comparator.",
  "Difference between Process and Thread?": "Process is an independent program. Thread is a worker inside that program sharing memory with other threads.",
  "Different ways to create a Thread and implement using Runnable": "Extend Thread (rare), implement Runnable (better), use lambda, or use ExecutorService (best for production).",
  "Pros and cons: extending Thread vs Runnable vs ExecutorService": "Extending Thread wastes your one inheritance. Runnable separates task from thread. ExecutorService manages pools and queues — use in real apps.",
  "What is ExecutorService?": "Thread pool you submit jobs to — it handles creating, reusing, and queuing threads for you.",
  "What is a Constructor?": "Special method that runs when you create an object — sets up initial state. Same name as class, no return type.",
  "Can we have multiple constructors in a class?": "Yes — constructor overloading. Different parameter lists let you create the object in different ways.",
  "Why can't constructors be overridden?": "Constructors aren't inherited like normal methods — each class defines its own. Subclass must call super(...) to build the parent part first.",
  "What does @SpringBootApplication do internally?": "Turns on component scanning, auto-configuration, and marks your main config class — bootstraps the whole app in one annotation.",
  "What is @EnableAutoConfiguration, and how does it work?": "Loads auto-config classes from classpath only if conditions match — e.g. configure JPA only if Hibernate is present.",
  "What is the difference between constructor-based and field-based @Autowired injection?": "Constructor = recommended, testable, final fields. Field = hidden dependencies injected by reflection — discouraged.",
  "What does @PostConstruct do, and at what stage is it executed?": "Method runs once after all dependencies are injected — good for setup that needs wired beans (load cache, validate config).",
  "How does Dependency Injection work internally in Spring Boot?": "Spring scans classes, registers bean definitions, creates objects, resolves constructor args, injects, runs lifecycle callbacks, wraps with proxies if needed.",
  "What is the difference between @Component, @Service, and @Repository?": "Same registration; different names for layers. Repository gets SQL exception translation.",
  "How do you implement global exception handling in Spring Boot?": "@RestControllerAdvice + @ExceptionHandler methods return consistent error JSON for all controllers.",
  "What happens if @Autowired is not used in Spring?": "Only Spring-managed beans get injection. new MyService() won't have dependencies filled unless you pass them yourself.",
  "Explain the annotations inside @SpringBootApplication": "@Configuration + @EnableAutoConfiguration + @ComponentScan bundled together.",
  "Why do we use @Qualifier with @Autowired?": "When two beans implement the same type, @Qualifier says which one by name.",
  "Difference between @Controller and @RestController": "Controller → HTML views. RestController → JSON in response body automatically.",
  "What is Thread Scope?": "One bean instance per thread — rare; often simulated with ThreadLocal or request scope for web apps.",
  "How does Spring Boot decide which auto-configuration to apply?": "Reads auto-config list from jars, checks @Conditional rules (class present? property set? bean missing?) — only matching configs apply.",
  "What happens internally when you add spring-boot-starter-web?": "Pulls Spring MVC, embedded Tomcat, Jackson JSON — auto-configures web server and REST stack.",
  "Why does Spring Boot prefer convention over configuration?": "Sensible defaults so you write business code, not boilerplate — override only when defaults don't fit.",
  "How does Spring Boot load application.properties internally?": "Builds Environment from files, profiles, env vars, command line — later sources override earlier ones.",
  "What is the exact startup flow of a Spring Boot application?": "main → SpringApplication.run → load config → refresh context → create beans → start Tomcat → ready event.",
  "Difference between @ComponentScan and @SpringBootApplication?": "ComponentScan only finds beans. @SpringBootApplication also enables auto-config and marks main application class.",
  "How does Spring Boot detect embedded Tomcat and configure it?": "If Tomcat classes on classpath and no custom factory bean, auto-config creates TomcatServletWebServerFactory with port from properties.",
  "What happens if two beans of same type exist and no @Qualifier?": "Startup fails unless one is @Primary or parameter name matches bean name.",
  "How does Spring Boot handle profile-specific configuration?": "application-dev.yml / application-prod.yml merge when profile active — different settings per environment.",
  "What is the role of SpringFactoriesLoader?": "Finds plugin classes listed in META-INF/spring.factories — initializers, listeners, failure analyzers.",
  "How does Spring Boot reduce XML configuration completely?": "Annotations + auto-config + application.yml replace XML bean files.",
  "Difference between @RestController and @Controller internally?": "RestController adds @ResponseBody to all methods — return value goes to JSON converter not view resolver.",
  "How does Spring Boot manage dependency versions automatically?": "BOM (spring-boot-dependencies) pins compatible versions — you omit version numbers on starters.",
  "What is the lifecycle of a Spring Bean in Spring Boot?": "Define → instantiate → inject → PostConstruct → proxy → use → PreDestroy.",
  "How does Spring Boot handle externalized configuration?": "Same jar, different config via properties files, env vars, K8s secrets — no rebuild per environment.",
  "What happens if application.yml and application.properties both exist?": "Both load; for same key, .properties usually wins over .yml at same priority.",
  "How does Spring Boot integrate with Actuator internally?": "Auto-registers health, metrics, info endpoints as beans exposed over HTTP or JMX.",
  "Difference between @Configuration and normal class?": "@Configuration class is processed by Spring — @Bean methods create singletons with CGLIB proxy so internal calls share same bean.",
  "How does Spring Boot create DataSource automatically?": "If JDBC on classpath and spring.datasource.url set, auto-config creates HikariCP pool from properties.",
  "What is the real use of CommandLineRunner?": "Run code after app fully started — seed data, warm cache, one-time checks.",
  "How does Spring Boot handle exception translation?": "@Repository wraps SQL errors in Spring DataAccessException. Web layer maps exceptions to HTTP via resolvers and @ControllerAdvice.",
  "Difference between @EnableAutoConfiguration and @Import?": "EnableAutoConfiguration picks from hundreds of conditional configs. Import pulls in specific classes you name.",
  "What happens if you exclude an auto-configuration class?": "That auto-config never runs — use when you provide your own DataSource or don't need web auto-config.",
  "How does Spring Boot support microservices so easily?": "Executable jars, embedded server, Actuator health, externalized config, Spring Cloud integrations.",
  "What is the difference between fat jar and normal jar?": "Normal jar = your classes only. Fat jar bundles all dependencies — run with java -jar anywhere.",
  "How does Spring Boot handle logging by default?": "Logback via SLF4J, console output, INFO level — override with logging.level.* or logback-spring.xml.",
  "How does Spring Boot decide server port priority?": "Command line beats env var beats application.properties beats default 8080.",
  "What happens internally when you hit a REST endpoint?": "Tomcat → DispatcherServlet → find controller method → bind params → run service → Jackson writes JSON → response.",
  "Why is Spring Boot preferred for cloud-native apps?": "12-factor friendly: config externalized, stateless, health checks, metrics, containers, fast deploys.",
  "What are the most common Spring Boot performance mistakes?": "N+1 queries, unbounded queries, wrong pool sizes, no caching, blocking external calls, DEBUG logging in prod.",
  "Why was a microservices architecture chosen over a monolithic architecture?": "Independent deploys, team ownership, scale parts separately, technology choice per service — at cost of distributed complexity.",
  "How does Kafka differ from RabbitMQ, and when would you choose one over the other?": "Kafka = durable log, replay, high throughput streams. RabbitMQ = traditional queue, routing, task delivery.",
  "What are the differences between SQL and NoSQL databases?": "SQL structured + ACID. NoSQL flexible + scale-out — pick based on data shape and consistency needs.",
  "Explain the CI/CD workflow. Walk through your Jenkins build pipeline.": "Commit triggers build, tests, quality scan, Docker image, deploy to envs with gates and smoke tests.",
  "What are the key features of Istio and Service Mesh in Kubernetes?": "Sidecar proxy handles traffic, mTLS, retries, metrics, tracing without changing app code.",
  "How do you Dockerize a Spring Boot application?": "Multi-stage Dockerfile: Maven build → copy jar to slim JRE image → java -jar. Run as non-root.",
  "How do you manage distributed transactions across microservices?": "Prefer Saga + outbox + idempotency over two-phase commit across services.",
  "What is the Circuit Breaker pattern, and when should it be implemented?": "When calling unreliable external services — stop cascading failures and fail fast with fallback.",
  "Write a query using GROUP BY and HAVING": "GROUP BY groups rows; HAVING filters those groups (e.g. departments with avg salary > 50k).",
  "What is the difference between UNION and UNION ALL?": "UNION removes duplicates (slower). UNION ALL keeps all rows (faster).",
  "What is the difference between LEFT JOIN and RIGHT JOIN?": "LEFT keeps all left table rows; RIGHT keeps all right. Usually use LEFT for readability.",
  "How would you retrieve the second-highest salary from a table?": "Subquery for max below global max, or RANK() window function for tie-safe answer.",
  "How do you eliminate duplicate records in SQL?": "DELETE with ROW_NUMBER keeping one row per key, or add UNIQUE constraint to prevent future dupes.",
  "How do you optimize a slow-performing SQL query?": "EXPLAIN plan, indexes, fewer columns, better joins, pagination, update statistics.",
  "Find the highest salary for each department": "GROUP BY department_id, MAX(salary) — or RANK() to list people tied at top.",
  "Difference between SQL and NoSQL (quick reference)": "SQL = tables + joins + transactions. NoSQL = flexible documents/key-value + horizontal scale.",
  "Explain the Factory Design Pattern": "Central place creates objects so callers don't depend on concrete class names — easy to swap implementations.",
  "Explain the Observer Design Pattern": "One object changes → all subscribed listeners get notified. Spring events are built on this idea.",
  "Have you worked on Low-Level Design (LLD)?": "Describe classes, interfaces, patterns, and thread safety for a focused problem — parking lot, rate limiter, etc.",
  "Design a ConcurrentHashMap from scratch": "Array of buckets; lock per bucket on write; volatile reads for get — same idea as simplified CHM.",
  "Design a Restaurant Reservation System": "Entities: table, reservation, customer. Lock time slot when booking to prevent double booking.",
  "Design a Parking Lot System": "Track spots by type, assign on entry, calculate fee on exit — synchronize spot allocation.",
  "Design a Rate Limiter": "Token bucket or sliding window — allow N requests per minute per client; use for API protection.",
  "Ensure thread safety and immutability in your design": "final fields, no shared mutable state, defensive copies, concurrent collections where needed.",
  "Deep vs. Shallow Cloning: When does it matter?": "Shallow shares nested objects; deep copies everything — matters when nested data is mutable.",
  "Design a Vending Machine": "State pattern: idle → has money → dispensing → idle. Strategy for payment type.",
  "Find the length of each element using Streams": "Use stream().map(String::length) to convert each string to its character count in one pass.",
  "What will be the output? put(\"abc\",\"tan\"); put(\"abc\",\"cho\"); get(\"abc\");": "Output is \"cho\" — HashMap keys are unique; second put replaces the value for key \"abc\".",
  "Find the missing number from int[] arr = {1, 2, 5, 6, 3, 7}": "Missing number is 4. For large arrays use sum formula n(n+1)/2 minus actual sum, or XOR — O(n) time, O(1) space.",
  "Explain @Autowired, @PathVariable, and @RequestParam": "@Autowired injects dependencies. @PathVariable reads from URL path. @RequestParam reads from query string.",
  "Sort a Map<String, Integer>": "Stream entries, sort by key or value with Comparator, collect to LinkedHashMap or use TreeMap.",
  "Difference between Encapsulation and Abstraction": "Encapsulation hides data inside a class. Abstraction hides how something works — shows only the essential interface.",
  "How do you create a Custom Exception in Java?": "Extend RuntimeException or Exception, add constructors calling super(message), handle with try/catch or @ControllerAdvice.",
  "How do you create a Custom Class in Java?": "Define fields, constructor, getters/setters. Override equals/hashCode if used in collections.",
  "Difference between HashMap, Hashtable, and ConcurrentHashMap": "HashMap: fast, not thread-safe. Hashtable: legacy, fully synchronized, slow. CHM: modern thread-safe with fine-grained locking.",
  "How many elements can ConcurrentHashMap process at a time? What about HashMap?": "No fixed element limit — both grow with heap. CHM allows many concurrent readers and bucket-level writes; HashMap is unsafe with multiple threads.",
  "Difference between PUT and PATCH": "PUT replaces entire resource. PATCH updates only sent fields — partial update.",
  "Difference between DROP and TRUNCATE": "DROP removes table and data. TRUNCATE removes all rows but keeps empty table structure — faster than DELETE.",
  "How do you create an Immutable Class in Java?": "Final class, private final fields, no setters, defensive copy of mutable fields in constructor.",
  "Difference between map() and flatMap()": "map: one-to-one transform. flatMap: one-to-many then flatten into single stream.",
  "What is Serialization and why is it used?": "Convert object to bytes for storage or network transfer. Rebuilt via deserialization. Used in caching, messaging; prefer JSON in modern APIs.",
  "How do you handle Exceptions in Java?": "try/catch/finally, throw custom exceptions, log with context, global @ControllerAdvice in Spring for REST APIs.",
  "Difference between @PathVariable and @RequestParam": "@PathVariable from URL path segment. @RequestParam from query parameter after ?.",
  "If a production issue occurs, how would you investigate after checking the logs?": "Check metrics, recent deploys, thread/heap dumps, DB slow queries, downstream timeouts, mitigate then RCA."
};

(function injectInterviewHelpers() {
  function escapeHtml(text) {
    var d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  var SCRIPT_STEPS = [
    { key: "open", match: /^Open with:\s*/i, label: "1 · Open with" },
    { key: "depth", match: /^Add one level of depth[^:]*:?\s*/i, label: "2 · Add depth" },
    { key: "example", match: /^Give a short project example[^:]*:?\s*/i, label: "3 · Project example" },
    { key: "close", match: /^Close with[^:]*:?\s*/i, label: "4 · Close with" }
  ];

  function stripPrefix(text, re) {
    return text.replace(re, "").trim();
  }

  function isScriptPoints(points) {
    return (
      Array.isArray(points) &&
      points.length >= 2 &&
      typeof points[0] === "string" &&
      /^Open with:/i.test(points[0])
    );
  }

  function isScriptObject(points) {
    return points && typeof points === "object" && !Array.isArray(points) && points.open;
  }

  function renderScriptHtml(points) {
    var steps = [];
    if (isScriptObject(points)) {
      steps = [
        { label: "1 · Open with", text: points.open },
        { label: "2 · Add depth", text: points.depth },
        { label: "3 · Project example", text: points.example },
        { label: "4 · Close with", text: points.close }
      ];
    } else if (isScriptPoints(points)) {
      var labels = ["1 · Open with", "2 · Add depth", "3 · Project example", "4 · Close with"];
      for (var i = 0; i < points.length && i < SCRIPT_STEPS.length; i++) {
        steps.push({
          label: labels[i],
          text: stripPrefix(points[i], SCRIPT_STEPS[i].match)
        });
      }
    }
    return steps
      .filter(function (s) { return s.text; })
      .map(function (s) {
        return (
          '<div class="script-step"><span class="script-step-label">' +
          escapeHtml(s.label) +
          '</span><p class="script-step-text">' +
          escapeHtml(s.text) +
          "</p></div>"
        );
      })
      .join("");
  }

  function renderPointsHtml(points) {
    if (isScriptObject(points) || isScriptPoints(points)) {
      return (
        '<span class="interview-label">What to tell the interviewer</span>' +
        '<div class="interview-script">' +
        renderScriptHtml(points) +
        "</div>"
      );
    }
    var listItems = points
      .map(function (p) {
        return "<li>" + escapeHtml(p) + "</li>";
      })
      .join("");
    return (
      '<span class="interview-label">What to tell the interviewer</span><ul>' +
      listItems +
      "</ul>"
    );
  }

  document.querySelectorAll("article").forEach(function (article) {
    if (article.querySelector(".interview-helper-wrap")) return;
    var h3 = article.querySelector("h3");
    if (!h3) return;
    var title = h3.textContent.trim();

    var simple = typeof SIMPLE_EXPLANATIONS !== "undefined" ? SIMPLE_EXPLANATIONS[title] : null;
    var points = typeof INTERVIEW_POINTS !== "undefined" ? INTERVIEW_POINTS[title] : null;
    if (!simple && !points) return;

    var wrap = document.createElement("div");
    wrap.className = "interview-helper-wrap";

    if (simple) {
      var simpleBox = document.createElement("div");
      simpleBox.className = "simple-words";
      simpleBox.innerHTML =
        '<span class="simple-label">In simple words</span><p>' + escapeHtml(simple) + "</p>";
      wrap.appendChild(simpleBox);
    }

    if (points && (Array.isArray(points) ? points.length : points.open)) {
      var pointsBox = document.createElement("div");
      pointsBox.className = "interview-points";
      pointsBox.innerHTML = renderPointsHtml(points);
      wrap.appendChild(pointsBox);
    }

    h3.insertAdjacentElement("afterend", wrap);
  });
})();
