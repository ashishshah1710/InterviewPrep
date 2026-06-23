/** What to say to the interviewer — structured talking points */
const INTERVIEW_POINTS = {
  "How does HashMap work internally?": [
    "Say: array of buckets + hash function maps key → index.",
    "Collision: linked list; tree if bucket size > 8 (Java 8+).",
    "Resize at load factor 0.75 — doubles capacity, rehashes entries.",
    "equals/hashCode contract must hold or lookups break.",
    "Not thread-safe — ConcurrentHashMap for shared maps."
  ],
  "HashMap vs ConcurrentHashMap": [
    "HashMap: single-threaded, allows null, fail-fast iterator.",
    "CHM: bucket-level lock + CAS, no null key/value, weakly consistent iterator.",
    "CHM scales reads without locking entire map.",
    "In banking: CHM for shared reference-data cache; never Collections.synchronizedMap at scale."
  ],
  "equals() vs hashCode()": [
    "Brief definition: equals() answers: are these two objects the same in meaning? hashCode() gives a number used to pick a bucket in HashMap.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "String vs StringBuilder vs StringBuffer": [
    "Brief definition: String never changes — every change creates a new object.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Abstract Class vs Interface": [
    "Brief definition: Abstract class = a partial blueprint with some shared code; a class can extend only one.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Comparable vs Comparator": [
    "Brief definition: Comparable means the class knows its natural order (sort by date).",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Immutable Class — How to create one?": [
    "Brief definition: Make an object that cannot change after creation — all fields final, no setters, copy any list/map given in the constructor so outsiders cannot modify internal data.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "What is the String Constant Pool?": [
    "Brief definition: A special storage area where Java keeps unique text literals.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Deep Copy vs Shallow Copy": [
    "Brief definition: Shallow copy copies the object but shares nested objects inside it — changing a list inside the copy may change the original.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Fail Fast vs Fail Safe Iterator": [
    "Brief definition: Fail-fast throws an error if you change a collection while looping (ArrayList, HashMap).",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "synchronized vs ReentrantLock": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "volatile keyword": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Callable vs Runnable": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Future vs CompletableFuture": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Deadlock and how to prevent it": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "CountDownLatch vs CyclicBarrier": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "ExecutorService internals": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Thread Pool tuning": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Producer-Consumer problem": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Java Memory Model (JMM)": {
    open: "The JMM defines when writes by one thread become visible to another — without rules, CPU caches could show stale values.",
    depth: "happens-before: unlock→lock, volatile read/write, thread start/join create ordering guarantees. synchronized and volatile flush/invalidate cache lines. Not about physical memory layout — about visibility and ordering.",
    example: "We had a shutdown flag as volatile boolean running — without it, worker threads never saw main thread set running=false.",
    close: "Pitfall: volatile does NOT make count++ atomic — use AtomicInteger. Follow-up: 'How does synchronized establish happens-before?'"
  },
  "Heap vs Stack": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "Metaspace vs PermGen": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "Garbage Collection algorithms": {
    open: "GC finds unreachable objects on the heap and reclaims memory so you don't manually free like C++.",
    depth: "Generational hypothesis: most objects die young (Eden → Minor GC). Survivors promote to Old gen → Major/Full GC. Algorithms trade pause time vs throughput: Serial, Parallel (throughput), G1 (balanced), ZGC/Shenandoah (low latency).",
    example: "Our API had 200ms p99 spikes — GC logs showed frequent Full GC. Switched to G1 with -XX:MaxGCPauseMillis=200 and fixed object churn in a hot loop.",
    close: "Best practice: tune after measuring allocation rate — don't set -Xmx blindly. Pitfall: calling System.gc() in prod triggers Full GC stop-the-world."
  },
  "G1 GC vs Parallel GC": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "Memory Leak vs Memory Overflow": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "Class Loading Process": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "How JVM handles object creation?": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "Bean Lifecycle": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Dependency Injection": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "@Component vs @Service vs @Repository": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "@Controller vs @RestController": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Spring Boot Auto Configuration": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Exception Handling in Microservices": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Service Discovery": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "API Gateway": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Circuit Breaker Pattern": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Distributed Transactions": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Tell me about a critical production issue you solved": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "How do you investigate high CPU usage?": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "How do you troubleshoot OutOfMemoryError?": {
    open: "Read the OOM message first — it tells you which memory area failed: Java heap, Metaspace, direct buffer, or unable to create native thread.",
    depth: "Heap OOM: heap dump with -XX:+HeapDumpOnOutOfMemoryError, analyze in MAT — dominator tree finds what's retaining objects. Metaspace: classloader leak from hot redeploy. Direct memory: Netty/NIO off-heap. Native thread: too many threads × stack size.",
    example: "Payment service Metaspace OOM after 50 redeploys without restart — undeployed WAR classloaders still referenced by a static cache map.",
    close: "Don't just increase -Xmx — find the leak or root cause first. Follow-up: 'What's the difference between heap OOM and leak?'"
  },
  "How do you analyze slow APIs?": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "What monitoring tools have you used?": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "How do you perform Root Cause Analysis (RCA)?": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "Introduce yourself and explain your project architecture": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "Explain your role and responsibilities in the project": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "Difference between HashMap and ConcurrentHashMap": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Explain Java Memory Model": {
    open: "Objects live on the heap (shared), each thread has its own stack for locals and method frames, class metadata in Metaspace.",
    depth: "Stack: automatic cleanup when method returns — no GC. Heap: all new objects, garbage collected when unreachable. JMM adds visibility rules so threads don't see stale cached values without sync/volatile.",
    example: "Debugging a race: two threads incremented a shared counter on heap without sync — each read stale value from CPU cache. Fixed with AtomicInteger.",
    close: "Pitfall: assuming local variables are thread-safe — they're on stack per thread, but objects they reference on heap are shared."
  },
  "What is the difference between ArrayList and LinkedList?": [
    "Brief definition: ArrayList is a dynamic array — fast to read by index, slower to insert in middle.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Explain Exception Handling and Custom Exceptions": {
    open: "try/catch handles errors gracefully instead of crashing; custom exceptions make business errors explicit and map cleanly to HTTP codes.",
    depth: "Checked exceptions must be declared or caught; unchecked (RuntimeException) for programming errors. throw creates the exception; throws declares it on method signature. try-with-resources auto-closes AutoCloseable. Never swallow — log and rethrow or wrap.",
    example: "OrderNotFoundException extends RuntimeException → @ControllerAdvice maps it to HTTP 404 with consistent JSON error body across all controllers.",
    close: "Best practice: catch specific exceptions, not bare Exception. Pitfall: empty catch block hiding prod bugs."
  },
  "What is an Immutable Class and how would you create one?": [
    "Brief definition: Object that cannot change after creation — final fields, no setters, copy mutable inputs.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "What happens internally when a Spring Boot application starts?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Difference between @Component, @Service, and @Repository": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Constructor Injection vs Field Injection": {
    open: "Constructor injection passes dependencies as parameters — recommended; field injection uses @Autowired on private fields — discouraged.",
    depth: "Constructor: dependencies explicit, fields can be final, easy to unit test with new Service(mockRepo). Field injection: hidden dependencies, requires reflection/Spring context for tests, can't make fields final.",
    example: "Refactored PaymentService from @Autowired field injection to constructor injection — tests went from @SpringBootTest to plain JUnit with mocks.",
    close: "Spring team recommends constructor injection for required deps. Pitfall: @Autowired on constructor still works but @RequiredArgsConstructor (Lombok) is cleaner."
  },
  "Explain Bean Lifecycle in Spring": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does @Transactional work internally?": [
    "Spring creates a proxy around your @Service bean.",
    "Before method: transactionManager.begin(); after success: commit; on RuntimeException: rollback.",
    "Checked exceptions don't roll back unless rollbackFor is set.",
    "Self-invocation skips proxy — inject self or split class.",
    "Project: order save + inventory update in one transaction."
  ],
  "Find the first non-repeating character in a String": [
    "Brief definition: Count each character, then walk the string again and return the first character with count 1.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Find duplicate elements in an array": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Reverse a String without using built-in methods": [
    "Brief definition: Swap characters from both ends moving inward, or build a new string reading from end to start.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Difference between Monolithic and Microservices Architecture": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "How do microservices communicate with each other?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "What is API Gateway and why is it needed?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "How do you handle service failures in Microservices?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Explain Circuit Breaker Pattern": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Difference between SQL and NoSQL": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Find the 2nd Highest Salary": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Difference between WHERE and HAVING": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Explain Database Indexing": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "How would you optimize a slow-running query?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "What is Redis and why do we use it?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Explain Cache-Aside Pattern": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "What is Kafka?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "How does Kafka ensure message durability?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Design a URL Shortener System": [
    "Step 1 — Clarify requirements: functional + non-functional (scale, latency, consistency).",
    "Step 2 — List core entities, APIs, and data flow out loud.",
    "Step 3 — Explain concurrency, failure handling, and storage choice.",
    "Step 4 — Mention trade-offs and what you'd add in v2 (cache, queue, monitoring).",
    "Draw boxes while speaking — interviewers reward structured thinking."
  ],
  "Difference between Process and Thread": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What is ExecutorService?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "CompletableFuture vs Future": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What are Virtual Threads in Java 21?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "How does ConcurrentHashMap achieve thread safety?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Describe a challenging production issue you solved": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "How do you handle tight deadlines?": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "How do you prioritize multiple tasks?": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "Have you ever disagreed with a team member? How did you resolve it?": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "Why do you want to join KPMG?": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "What motivates you as a developer?": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "Where do you see yourself in the next 5 years?": [
    "Use STAR for stories: Situation → Task → Action → Result.",
    "Keep answer 60–90 seconds unless they ask follow-ups.",
    "Be specific — one real example beats five generic claims.",
    "Show ownership, communication, and learning from the outcome.",
    "End positively: what you'd do differently or what you improved after."
  ],
  "Java Streams — flatMap explained": [
    "Brief definition: map transforms one item to one item.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "ConcurrentHashMap — production use cases": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "Set internals — HashSet, LinkedHashSet, TreeSet": [
    "Brief definition: HashSet uses HashMap under the hood — fast, no order.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Functional Interface — production examples": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "wait() and notify() — how they work": {
    open: "wait() releases the lock and puts the thread to sleep until another thread calls notify()/notifyAll() on the same monitor — classic producer-consumer coordination.",
    depth: "Must be called inside synchronized block on the same object — otherwise IllegalMonitorStateException. wait() vs sleep(): wait releases lock, sleep does not. Always use while loop not if when checking condition — spurious wakeups.",
    example: "BlockingQueue replaced our hand-rolled wait/notify buffer in a file-processing pipeline — less bug-prone, same pattern under the hood.",
    close: "Pitfall: notify() when you mean notifyAll() — may leave threads waiting forever. Prefer java.util.concurrent over raw wait/notify in new code."
  },
  "Race condition handling": {
    open: "Two threads read-modify-write the same variable and overwrite each other — lost updates even though each operation looks correct alone.",
    depth: "Fix options: synchronized block/method (mutual exclusion), AtomicInteger/LongAdder (lock-free CAS), or immutable objects (no shared mutable state). Choose based on contention level and read/write ratio.",
    example: "Rate limit counter used int++ on shared field — under load counts were wrong. Replaced with AtomicInteger.incrementAndGet() — accurate at 5K req/s.",
    close: "Best practice: prefer immutability and confine mutable state to one thread. Pitfall: synchronizing on wrong object (new Integer(id) as lock — different instances)."
  },
  "Atomicity and Locking strategies": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "@Async — async processing in Spring Boot": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Retry pattern in Spring Boot": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Circuit Breaker — production implementation": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "Stateless vs Stateful services": {
    open: "Stateless = any server instance can handle any request — no session data stored in memory on that pod. Stateful = server remembers client state between requests.",
    depth: "Stateless enables horizontal scaling and rolling deploys — load balancer sends anywhere. Session state goes to Redis/JWT, not Tomcat memory. StatefulSet in K8s for databases, not typical REST APIs.",
    example: "Moved user session from in-memory HttpSession to Redis — could scale Order API from 2 to 8 pods without sticky sessions breaking checkout.",
    close: "Microservices should be stateless by default. Pitfall: storing shopping cart in singleton service field — breaks with multiple instances."
  },
  "The N+1 Query Problem": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Lazy vs Eager Loading": [
    "Describe the symptom in production (slow API, connection wait, LazyInitializationException).",
    "Explain root cause at ORM/JDBC level.",
    "Give the fix: fetch join, batch size, pool tuning, read-only query.",
    "Say how you'd prove improvement: query count, connection metrics, p99 latency."
  ],
  "Connection Pooling — HikariCP in Spring Boot": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Hibernate & SQL Query Optimization": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Only 1 stock left — 1000 users buying simultaneously. How do you prevent overselling?": {
    open: "Use atomic decrement with a database row lock, optimistic locking with @Version, or Redis DECR — never read-then-write without protection.",
    depth: "Pessimistic: SELECT FOR UPDATE locks the inventory row — one buyer wins, others wait or fail. Optimistic: UPDATE stock SET qty=qty-1 WHERE id=? AND qty>0 — rows affected 0 means sold out. Redis: DECR is atomic; queue orders if DB is bottleneck.",
    example: "Flash sale: UPDATE ... WHERE stock > 0 with row count check — 999 users got 'sold out' instantly, exactly 1 succeeded. No oversell.",
    close: "Also need idempotency on payment retry. Follow-up: 'How would Saga handle payment success but inventory already zero?'"
  },
  "JVM Memory Areas — production relevance": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "Caching strategies for scale": {
    open: "Layer caches: local in-memory (Caffeine) for hot read-only data, Redis for shared session/catalog, CDN for static assets.",
    depth: "Cache-aside: app reads cache → miss → DB → populate cache. Write-through: write cache + DB together. TTL prevents stale data; cache invalidation on update. Watch hit rate — low hit rate means cache adds latency for nothing.",
    example: "Product catalog: Caffeine local cache 30s TTL + Redis 5min — p99 dropped from 80ms to 4ms, DB load down 70%.",
    close: "Pitfall: thundering herd on expiry — use random TTL jitter or single-flight lock. Never cache without measuring hit rate."
  },
  "Scaling factors — vertical vs horizontal": {
    open: "Vertical = bigger machine (more CPU/RAM). Horizontal = more identical machines behind a load balancer.",
    depth: "Vertical hits hardware ceiling and single point of failure. Horizontal needs stateless services, shared DB/Redis, connection pool tuning. Vertical first for quick fix; horizontal for long-term cloud-native scale.",
    example: "Order API: vertical scale to 16GB helped until DB became bottleneck — then horizontal 6 pods + read replica for reports.",
    close: "Horizontal scaling doesn't fix slow queries or N+1 — optimize code first. Follow-up: 'When would you shard the database?'"
  },
  "CI/CD pipeline — production workflow": [
    "Open with impact: users affected, duration, severity.",
    "Walk through investigation steps in order — don't jump to the fix.",
    "Name exact tools: logs, Grafana, jstack, heap dump, APM trace, EXPLAIN.",
    "State root cause clearly, then fix + prevention (alert, test, runbook).",
    "Quantify result if possible: 'p99 dropped from 8s to 200ms.'"
  ],
  "Deployment versioning strategies": [
    "Explain the pipeline or infra component purpose.",
    "Walk through the flow step by step.",
    "Mention safety: tests, approval gate, rollback, health check.",
    "Link to on-call reality: same artifact promoted across envs."
  ],
  "Autoscaling in cloud environments": [
    "Explain the pipeline or infra component purpose.",
    "Walk through the flow step by step.",
    "Mention safety: tests, approval gate, rollback, health check.",
    "Link to on-call reality: same artifact promoted across envs."
  ],
  "Common cloud migration challenges": [
    "Explain the pipeline or infra component purpose.",
    "Walk through the flow step by step.",
    "Mention safety: tests, approval gate, rollback, health check.",
    "Link to on-call reality: same artifact promoted across envs."
  ],
  "Java Records — what they are and when to use them": [
    "What changed in the language and why it matters.",
    "Syntax or enable flag — show you’ve used or read release notes.",
    "Best use case vs anti-pattern (Records for DTOs, not JPA entities).",
    "Virtual threads: I/O-bound yes, CPU-bound no."
  ],
  "Two Sum Problem": [
    "Repeat the problem and confirm inputs/outputs.",
    "State approach and complexity (time + space) before coding.",
    "Walk through a small example on the whiteboard.",
    "Write clean code, then mention edge cases: empty input, duplicates, overflow.",
    "Offer optimization if time allows."
  ],
  "Sort a list of employees: salary descending, experience ascending": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "What is the internal difference between HashMap and ConcurrentHashMap?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Explain the JVM Memory Model: Heap, Stack, and Metaspace": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "What are Atomic Variables, and where are they commonly used?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What is the difference between volatile and synchronized?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "How do you mitigate performance bottlenecks caused by synchronization?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What is ThreadLocal, and how can it lead to memory leaks?": [
    "Draw or describe memory areas: stack (per thread) vs heap (objects) vs metaspace (classes).",
    "Explain what symptom you'd see in production (OOM type, long GC pause).",
    "Mention one tuning or diagnostic tool: -Xmx, jmap, MAT, GC logs.",
    "Give cause + fix: leak vs legitimate growth vs wrong pool size."
  ],
  "What is a BlockingQueue, and where is it used in real-world applications?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What are the different approaches to achieving thread safety in Java?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What is a Functional Interface?": [
    "Brief definition: Interface with exactly one abstract method — lambdas can implement it.",
    "Explain internal structure or contract (equals/hashCode, immutability, complexity).",
    "When to use vs avoid — pick the right collection/type for the job.",
    "Mention time/space complexity if coding-related.",
    "One line from project: caching, DTO, sorting, or config parsing."
  ],
  "Difference between Process and Thread?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Different ways to create a Thread and implement using Runnable": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Pros and cons: extending Thread vs Runnable vs ExecutorService": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "What is a Constructor?": {
    open: "A constructor is the special method that runs when you create an object with new — it initializes instance fields and prepares the object for use.",
    depth: "JVM allocates heap memory first, then invokes the constructor. Same name as class, no return type — not even void. If you define any constructor, the compiler stops providing a default no-arg one. Subclass constructors must call super() before using this. Constructors are not overridden like instance methods — each class defines its own.",
    example: "In our Order service, Order(Long customerId, List<LineItem> items) validates items aren't empty, assigns final fields, and sets createdAt — every Order starts in a valid state.",
    close: "Best practice: keep constructors thin — validation + field assignment only; no DB calls. Pitfall: heavy I/O in constructor makes unit testing painful. Follow-up: 'When would you switch to a static factory or Builder pattern?'"
  },
  "Can we have multiple constructors in a class?": {
    open: "Yes — constructor overloading lets you create objects in different ways with different parameter lists in the same class.",
    depth: "Each constructor must have a unique parameter list. this() chains to another constructor in the same class; super() chains to the parent. Compiler picks the best match at compile time — ambiguous calls fail to compile.",
    example: "We had User(String email) for registration and User(String email, String name, Role role) for admin-created accounts — same entity, two valid entry points.",
    close: "Best practice: delegate to one master constructor via this() to avoid duplicated validation. Pitfall: too many overloads — switch to Builder when you exceed 3–4 variants."
  },
  "Why can't constructors be overridden?": {
    open: "Constructors aren't inherited or overridden like normal methods — each class must define its own constructor chain.",
    depth: "Constructor name must match the class name exactly, so a subclass has a different name than the parent constructor. What looks like overriding is super() delegation — parent constructor runs first to initialize inherited fields before subclass logic.",
    example: "PaymentService extends BaseService — BaseService() sets up logging; PaymentService() calls super() then initializes payment gateway client.",
    close: "Pitfall: forgetting super() when parent has no default constructor — compile error. Interview follow-up: difference between constructor chaining and method overriding."
  },
  "What does @SpringBootApplication do internally?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is @EnableAutoConfiguration, and how does it work?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the difference between constructor-based and field-based @Autowired injection?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What does @PostConstruct do, and at what stage is it executed?": {
    open: "@PostConstruct runs once after dependency injection completes and before the bean is used — ideal for initialization that needs wired dependencies.",
    depth: "Lifecycle order: instantiate → inject dependencies → @PostConstruct → bean ready → @PreDestroy on shutdown. Runs after constructor but before any business method. Alternative: InitializingBean (legacy) or constructor for simple init.",
    example: "ReferenceDataService @PostConstruct loads country codes from DB into in-memory map — cache warm before first API request hits.",
    close: "Pitfall: heavy work in @PostConstruct slows startup — use async warm-up for non-critical data. Don't call other @PostConstruct beans assuming order unless @DependsOn."
  },
  "How does Dependency Injection work internally in Spring Boot?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the difference between @Component, @Service, and @Repository?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How do you implement global exception handling in Spring Boot?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What happens if @Autowired is not used in Spring?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Explain the annotations inside @SpringBootApplication": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Why do we use @Qualifier with @Autowired?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Difference between @Controller and @RestController": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is Thread Scope?": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "How does Spring Boot decide which auto-configuration to apply?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What happens internally when you add spring-boot-starter-web?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Why does Spring Boot prefer convention over configuration?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot load application.properties internally?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the exact startup flow of a Spring Boot application?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Difference between @ComponentScan and @SpringBootApplication?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot detect embedded Tomcat and configure it?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What happens if two beans of same type exist and no @Qualifier?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot handle profile-specific configuration?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the role of SpringFactoriesLoader?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot reduce XML configuration completely?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Difference between @RestController and @Controller internally?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot manage dependency versions automatically?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the lifecycle of a Spring Bean in Spring Boot?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot handle externalized configuration?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What happens if application.yml and application.properties both exist?": {
    open: "Both load — for the same property key, application.properties takes precedence over application.yml in Spring Boot 2.4+.",
    depth: "Order: application.properties > application.yml > profile-specific files. Also env vars and command-line args override files. Use one format per project for clarity — mixing causes confusion about which value wins.",
    example: "Dev had datasource URL in yml, someone added override in properties for local Docker — properties won silently, team debugged wrong DB for an hour.",
    close: "Best practice: yml for structure/nesting, externalize prod secrets via env vars or Config Server. Pitfall: duplicate keys across files."
  },
  "How does Spring Boot integrate with Actuator internally?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Difference between @Configuration and normal class?": {
    open: "@Configuration tells Spring to treat the class as a source of @Bean definitions — methods annotated @Bean register objects in the container.",
    depth: "Spring CGLIB-enhances @Configuration so @Bean method calls within the same class return the same singleton instance. Plain @Component + @Bean methods without @Configuration may create new instances on each call.",
    example: "AppConfig @Configuration defines RestTemplate and ObjectMapper beans — injected consistently across PaymentService and NotificationService.",
    close: "Use @Configuration for explicit bean wiring; rely on component scanning for simple @Service/@Repository classes."
  },
  "How does Spring Boot create DataSource automatically?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the real use of CommandLineRunner?": {
    open: "CommandLineRunner executes code after Spring context is fully started — application is ready but before it serves traffic (if combined with proper ordering).",
    depth: "Runs after all beans initialized. Use for one-time startup tasks: seed database, warm cache, print config summary. ApplicationRunner is similar but uses ApplicationArguments. Multiple runners execute in @Order sequence.",
    example: "Dev profile CommandLineRunner inserts test users if table empty — avoids manual SQL before demo.",
    close: "Pitfall: long-running work blocks startup completion — use @Async or scheduled job for heavy tasks. Not a replacement for proper migration tools (Flyway/Liquibase)."
  },
  "How does Spring Boot handle exception translation?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Difference between @EnableAutoConfiguration and @Import?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What happens if you exclude an auto-configuration class?": {
    open: "That auto-configuration never runs — Spring Boot won't auto-wire those beans, so you must provide your own configuration.",
    depth: "Use @SpringBootApplication(exclude = DataSourceAutoConfiguration.class) when no DB needed, or when providing custom DataSource bean. spring.autoconfigure.exclude in properties works too. Useful to prevent conflicts or speed up tests.",
    example: "Notification microservice excluded DataSourceAutoConfiguration — it's Kafka-only, no JDBC driver on classpath would fail startup otherwise.",
    close: "Only exclude what you understand — excluding SecurityAutoConfiguration leaves app wide open. Document exclusions in README."
  },
  "How does Spring Boot support microservices so easily?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What is the difference between fat jar and normal jar?": {
    open: "Normal jar = your compiled classes only — needs classpath with all dependencies. Fat jar (Spring Boot executable) bundles dependencies + embedded server into one runnable jar.",
    depth: "Spring Boot repackage puts classes in BOOT-INF/classes, libs in BOOT-INF/lib, Main-Class points to JarLauncher which sets up classloader and starts Spring. java -jar app.jar runs everything — no external Tomcat needed.",
    example: "CI builds order-service-1.2.0.jar (~80MB fat jar) → Docker COPY → java -jar — single artifact from build to production.",
    close: "Fat jar simplifies deploy but larger image — layer caching in Docker helps. Alternative: buildpacks or jlink for smaller runtime."
  },
  "How does Spring Boot handle logging by default?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How does Spring Boot decide server port priority?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What happens internally when you hit a REST endpoint?": {
    open: "HTTP request hits embedded Tomcat → DispatcherServlet → maps URL to @RestController method → binds params → calls service → Jackson serializes response to JSON.",
    depth: "Filter chain runs first (security, logging, CORS). HandlerMapping finds controller method. HandlerAdapter invokes it. @RequestBody deserialized by HttpMessageConverter. @Transactional proxy may wrap service layer. Exception → @ControllerAdvice if thrown.",
    example: "POST /orders: JwtFilter validates token → OrderController.create → OrderService @Transactional save → OrderCreated event to Kafka → 201 + JSON body.",
    close: "Pitfall: blocking service call inside controller — keep controller thin. Follow-up: 'Where would you add rate limiting in this chain?'"
  },
  "Why is Spring Boot preferred for cloud-native apps?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "What are the most common Spring Boot performance mistakes?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "Why was a microservices architecture chosen over a monolithic architecture?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "How does Kafka differ from RabbitMQ, and when would you choose one over the other?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "What are the differences between SQL and NoSQL databases?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Explain the CI/CD workflow. Walk through your Jenkins build pipeline.": [
    "Explain the pipeline or infra component purpose.",
    "Walk through the flow step by step.",
    "Mention safety: tests, approval gate, rollback, health check.",
    "Link to on-call reality: same artifact promoted across envs."
  ],
  "What are the key features of Istio and Service Mesh in Kubernetes?": [
    "Explain the pipeline or infra component purpose.",
    "Walk through the flow step by step.",
    "Mention safety: tests, approval gate, rollback, health check.",
    "Link to on-call reality: same artifact promoted across envs."
  ],
  "How do you Dockerize a Spring Boot application?": [
    "Define what it is in one sentence.",
    "Explain what happens at startup or runtime (container, proxy, lifecycle).",
    "Compare with the alternative (e.g. field injection vs constructor).",
    "Mention one production gotcha interviewers love (self-invocation, missing @Qualifier).",
    "Tie to project: 'In our Spring Boot service we…'"
  ],
  "How do you manage distributed transactions across microservices?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "What is the Circuit Breaker pattern, and when should it be implemented?": [
    "Explain the problem it solves — coupling, scale, failure, or latency.",
    "Describe how it works in 2–3 steps.",
    "Compare with alternative (sync vs async, SQL vs NoSQL, monolith vs micro).",
    "State when NOT to use it — shows senior judgment.",
    "Reference resilience: timeout, retry, idempotency, observability."
  ],
  "Write a query using GROUP BY and HAVING": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "What is the difference between UNION and UNION ALL?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "What is the difference between LEFT JOIN and RIGHT JOIN?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "How would you retrieve the second-highest salary from a table?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "How do you eliminate duplicate records in SQL?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "How do you optimize a slow-performing SQL query?": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Find the highest salary for each department": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Difference between SQL and NoSQL (quick reference)": [
    "State what the query achieves in plain English first.",
    "Write or describe the SQL — mention indexes if performance matters.",
    "Explain WHERE vs HAVING / JOIN type if relevant.",
    "Call out edge cases: NULLs, ties, duplicates, large table pagination.",
    "Say how you'd validate: EXPLAIN ANALYZE on prod-like data volume."
  ],
  "Explain the Factory Design Pattern": [
    "State the pattern intent in one line.",
    "Name participants (classes/interfaces) and their roles.",
    "Give a concrete example from Spring or your project.",
    "Mention benefit: loose coupling, extensibility, testability."
  ],
  "Explain the Observer Design Pattern": [
    "State the pattern intent in one line.",
    "Name participants (classes/interfaces) and their roles.",
    "Give a concrete example from Spring or your project.",
    "Mention benefit: loose coupling, extensibility, testability."
  ],
  "Have you worked on Low-Level Design (LLD)?": [
    "State the pattern intent in one line.",
    "Name participants (classes/interfaces) and their roles.",
    "Give a concrete example from Spring or your project.",
    "Mention benefit: loose coupling, extensibility, testability."
  ],
  "Design a ConcurrentHashMap from scratch": [
    "Step 1 — Clarify requirements: functional + non-functional (scale, latency, consistency).",
    "Step 2 — List core entities, APIs, and data flow out loud.",
    "Step 3 — Explain concurrency, failure handling, and storage choice.",
    "Step 4 — Mention trade-offs and what you'd add in v2 (cache, queue, monitoring).",
    "Draw boxes while speaking — interviewers reward structured thinking."
  ],
  "Design a Restaurant Reservation System": [
    "Step 1 — Clarify requirements: functional + non-functional (scale, latency, consistency).",
    "Step 2 — List core entities, APIs, and data flow out loud.",
    "Step 3 — Explain concurrency, failure handling, and storage choice.",
    "Step 4 — Mention trade-offs and what you'd add in v2 (cache, queue, monitoring).",
    "Draw boxes while speaking — interviewers reward structured thinking."
  ],
  "Design a Parking Lot System": [
    "Step 1 — Clarify requirements: functional + non-functional (scale, latency, consistency).",
    "Step 2 — List core entities, APIs, and data flow out loud.",
    "Step 3 — Explain concurrency, failure handling, and storage choice.",
    "Step 4 — Mention trade-offs and what you'd add in v2 (cache, queue, monitoring).",
    "Draw boxes while speaking — interviewers reward structured thinking."
  ],
  "Design a Rate Limiter": [
    "Step 1 — Clarify requirements: functional + non-functional (scale, latency, consistency).",
    "Step 2 — List core entities, APIs, and data flow out loud.",
    "Step 3 — Explain concurrency, failure handling, and storage choice.",
    "Step 4 — Mention trade-offs and what you'd add in v2 (cache, queue, monitoring).",
    "Draw boxes while speaking — interviewers reward structured thinking."
  ],
  "Ensure thread safety and immutability in your design": [
    "Define the concurrency problem first (visibility, atomicity, ordering).",
    "Explain the mechanism — lock, CAS, queue, or thread pool.",
    "Compare with alternative and when you'd pick each.",
    "Warn about a common bug: deadlock, stale read, pool exhaustion, ThreadLocal leak.",
    "Project example: cache, payment, batch job, or API under load."
  ],
  "Deep vs. Shallow Cloning: When does it matter?": {
    open: "Shallow copy duplicates the object but shares nested objects — changing a list inside the copy may change the original. Deep copy duplicates everything — fully independent.",
    depth: "Default Object.clone() is shallow. Deep clone: manually copy nested collections, serialization trick, or copy constructor with List.copyOf. Matters when nested state is mutable and shared across threads or cache entries.",
    example: "Cached Order object with shallow copy of lineItems — one request modified quantity, corrupted cache for all users. Fixed with defensive copy in getter or deep clone on cache put.",
    close: "Prefer immutable objects (records, List.copyOf) over cloning. Pitfall: clone() is protected and often broken — copy constructors are clearer."
  },
  "Design a Vending Machine": [
    "Step 1 — Clarify requirements: functional + non-functional (scale, latency, consistency).",
    "Step 2 — List core entities, APIs, and data flow out loud.",
    "Step 3 — Explain concurrency, failure handling, and storage choice.",
    "Step 4 — Mention trade-offs and what you'd add in v2 (cache, queue, monitoring).",
    "Draw boxes while speaking — interviewers reward structured thinking."
  ],
  "Find the length of each element using Streams": [
    "Use map(String::length) or mapToInt on the stream.",
    "Collect to List or print with forEach.",
    "Mention O(n) time — single pass over collection.",
  ],
  "What will be the output? put(\"abc\",\"tan\"); put(\"abc\",\"cho\"); get(\"abc\");": [
    "Answer: \"cho\" — keys are unique in HashMap.",
    "Second put replaces value; size remains 1.",
    "Mention equals/hashCode if they extend to custom keys.",
  ],
  "Find the missing number from int[] arr = {1, 2, 5, 6, 3, 7}": [
    "Missing = 4 for array 1..7 with one gap.",
    "Large array: expectedSum = n*(n+1)/2 minus actualSum — O(n), O(1).",
    "Or XOR all 1..n XOR all elements.",
    "Use long for sum to avoid overflow.",
  ],
  "Explain @Autowired, @PathVariable, and @RequestParam": [
    "@Autowired: DI — prefer constructor injection.",
    "@PathVariable: /orders/{id} → id from path.",
    "@RequestParam: ?status=ACTIVE from query string.",
    "Show one GET example combining path + query param.",
  ],
  "Sort a Map<String, Integer>": [
    "entrySet().stream().sorted(comparingByValue()).collect to LinkedHashMap.",
    "Or TreeMap for always-sorted by key.",
    "Ask: sort by key or value? ascending or descending?",
  ],
  "Difference between Encapsulation and Abstraction": [
    "Encapsulation: hide data — private fields, getters.",
    "Abstraction: hide complexity — interface/API.",
    "ATM example: button (abstraction) vs private balance (encapsulation).",
  ],
  "How do you create a Custom Exception in Java?": [
    "Extend RuntimeException for Spring services.",
    "Constructors calling super(message).",
    "Map to HTTP status in @ControllerAdvice.",
  ],
  "How do you create a Custom Class in Java?": [
    "Fields + constructor + accessors.",
    "equals/hashCode if in HashMap.",
    "Consider record for immutable DTO.",
  ],
  "Difference between HashMap, Hashtable, and ConcurrentHashMap": [
    "HashMap: not thread-safe, allows null key.",
    "Hashtable: legacy synchronized — avoid.",
    "CHM: bucket locks, no nulls, use in production concurrent code.",
  ],
  "How many elements can ConcurrentHashMap process at a time? What about HashMap?": [
    "Clarify: element count unlimited (memory-bound).",
    "Concurrency: HashMap unsafe multi-thread; CHM safe.",
    "CHM: many concurrent reads; writes lock per bucket.",
    "Do not confuse with old concurrencyLevel=16 segments myth as element limit.",
  ],
  "Difference between PUT and PATCH": [
    "PUT: full resource replacement, idempotent.",
    "PATCH: partial update of sent fields only.",
    "Example: PATCH only email field vs PUT entire user JSON.",
  ],
  "Difference between DROP and TRUNCATE": [
    "DROP: table object removed from schema.",
    "TRUNCATE: all rows removed, structure kept.",
    "TRUNCATE faster; FK constraints may block it.",
  ],
  "How do you create an Immutable Class in Java?": [
    "final class, final fields, no setters.",
    "Defensive copy List.copyOf in constructor.",
    "Records in Java 16+ for simple cases.",
  ],
  "Difference between map() and flatMap()": [
    "map: 1→1 transform.",
    "flatMap: 1→many, flattened — orders to line items.",
    "Optional chaining with flatMap avoids nested ifs.",
  ],
  "What is Serialization and why is it used?": [
    "Object to bytes for wire/storage.",
    "serialVersionUID for compatibility.",
    "Modern apps prefer JSON; warn about deserialization security.",
  ],
  "How do you handle Exceptions in Java?": [
    "try/catch/finally, don't swallow.",
    "Custom exceptions for domain errors.",
    "@ControllerAdvice for consistent API errors.",
  ],
  "Difference between @PathVariable and @RequestParam": [
    "PathVariable: /users/5 → id=5.",
    "RequestParam: ?page=0&size=10.",
    "RequestParam supports defaultValue and required=false.",
  ],
  "If a production issue occurs, how would you investigate after checking the logs?": [
    "Metrics/dashboards next — error rate, latency, CPU.",
    "Recent deploy? jstack if hung threads, heap dump if OOM.",
    "DB pool, slow queries, downstream circuit breaker.",
    "Mitigate, RCA, preventive alert/runbook.",
  ]
};
