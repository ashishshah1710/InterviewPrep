const TOPICS = {

"overview": {
  title: "Java Backend Top 50 Overview",
  html: `
<h2>Java Backend Top 50 Overview</h2>
<p class="subtitle">Java Backend Interview Guide · 2026 Edition · 50 Core Questions</p>

<span class="tag tag-blue">Java</span>
<span class="tag tag-green">Spring Boot 3</span>
<span class="tag tag-yellow">Microservices</span>
<span class="tag tag-red">Kafka</span>
<span class="tag tag-blue">SQL</span>

<p>From HashMap internals to production war stories — this guide covers the 50 questions senior Java backend interviews ask most often. Each topic includes a plain-English explanation, internal mechanics, code samples, a 30-second answer, and common mistakes.</p>

<h3>All 50 Questions</h3>
<table>
  <tr><th>#</th><th>Question</th><th>Category</th></tr>
  <tr><td>Q01</td><td>How does HashMap work internally?</td><td>Java</td></tr>
  <tr><td>Q02</td><td>What happens when two keys have the same hashcode?</td><td>Java</td></tr>
  <tr><td>Q03</td><td>Why should equals() and hashCode() always be overridden together?</td><td>Java</td></tr>
  <tr><td>Q04</td><td>How is ConcurrentHashMap thread-safe?</td><td>Java</td></tr>
  <tr><td>Q05</td><td>What is the difference between volatile, synchronized, and Lock?</td><td>Java</td></tr>
  <tr><td>Q06</td><td>Explain the Java Memory Model (JMM)</td><td>Java</td></tr>
  <tr><td>Q07</td><td>What happens internally when you create a new object?</td><td>Java</td></tr>
  <tr><td>Q08</td><td>How does Garbage Collection work?</td><td>Java</td></tr>
  <tr><td>Q09</td><td>Explain ExecutorService and ThreadPoolExecutor</td><td>Java</td></tr>
  <tr><td>Q10</td><td>CompletableFuture vs Future?</td><td>Java</td></tr>
  <tr><td>Q11</td><td>How do Java Streams work internally?</td><td>Java</td></tr>
  <tr><td>Q12</td><td>How would you make a class immutable?</td><td>Java</td></tr>
  <tr><td>Q13</td><td>What happens internally when a Spring Boot application starts?</td><td>Spring Boot</td></tr>
  <tr><td>Q14</td><td>How does Dependency Injection work?</td><td>Spring Boot</td></tr>
  <tr><td>Q15</td><td>Why is constructor injection preferred?</td><td>Spring Boot</td></tr>
  <tr><td>Q16</td><td>Explain the complete Spring Bean lifecycle</td><td>Spring Boot</td></tr>
  <tr><td>Q17</td><td>How does Spring Boot Auto Configuration work?</td><td>Spring Boot</td></tr>
  <tr><td>Q18</td><td>How do you implement global exception handling?</td><td>Spring Boot</td></tr>
  <tr><td>Q19</td><td>How do you secure REST APIs using JWT?</td><td>Spring Boot</td></tr>
  <tr><td>Q20</td><td>How do you improve Spring Boot application performance?</td><td>Spring Boot</td></tr>
  <tr><td>Q21</td><td>Why did you choose Microservices over Monolith?</td><td>Microservices</td></tr>
  <tr><td>Q22</td><td>How do your microservices communicate?</td><td>Microservices</td></tr>
  <tr><td>Q23</td><td>When would you use synchronous vs asynchronous communication?</td><td>Microservices</td></tr>
  <tr><td>Q24</td><td>What is the purpose of an API Gateway?</td><td>Microservices</td></tr>
  <tr><td>Q25</td><td>How does Service Discovery work?</td><td>Microservices</td></tr>
  <tr><td>Q26</td><td>Explain Circuit Breaker with a real example</td><td>Microservices</td></tr>
  <tr><td>Q27</td><td>What is the Saga Pattern?</td><td>Microservices</td></tr>
  <tr><td>Q28</td><td>How do you maintain data consistency across microservices?</td><td>Microservices</td></tr>
  <tr><td>Q29</td><td>How do you handle retries and timeouts?</td><td>Microservices</td></tr>
  <tr><td>Q30</td><td>How do you version REST APIs?</td><td>Microservices</td></tr>
  <tr><td>Q31</td><td>Explain Kafka architecture</td><td>Kafka</td></tr>
  <tr><td>Q32</td><td>How does Kafka guarantee message ordering?</td><td>Kafka</td></tr>
  <tr><td>Q33</td><td>What happens if a consumer crashes?</td><td>Kafka</td></tr>
  <tr><td>Q34</td><td>What is a Consumer Group?</td><td>Kafka</td></tr>
  <tr><td>Q35</td><td>How are Kafka offsets managed?</td><td>Kafka</td></tr>
  <tr><td>Q36</td><td>How do you prevent duplicate message processing?</td><td>Kafka</td></tr>
  <tr><td>Q37</td><td>How do you improve Kafka performance?</td><td>Kafka</td></tr>
  <tr><td>Q38</td><td>Write a query to find the second highest salary</td><td>SQL</td></tr>
  <tr><td>Q39</td><td>How would you optimize a slow SQL query?</td><td>SQL</td></tr>
  <tr><td>Q40</td><td>Explain Clustered vs Non-Clustered Index</td><td>SQL</td></tr>
  <tr><td>Q41</td><td>What are ACID properties?</td><td>SQL</td></tr>
  <tr><td>Q42</td><td>What are database isolation levels?</td><td>SQL</td></tr>
  <tr><td>Q43</td><td>How do you identify and resolve deadlocks?</td><td>SQL</td></tr>
  <tr><td>Q44</td><td>Explain window functions with an example</td><td>SQL</td></tr>
  <tr><td>Q45</td><td>Explain your current project architecture</td><td>Scenario-Based</td></tr>
  <tr><td>Q46</td><td>Describe a production issue you resolved</td><td>Scenario-Based</td></tr>
  <tr><td>Q47</td><td>How do you debug a memory leak?</td><td>Scenario-Based</td></tr>
  <tr><td>Q48</td><td>How do you investigate high CPU usage in production?</td><td>Scenario-Based</td></tr>
  <tr><td>Q49</td><td>Explain one end-to-end API you developed</td><td>Scenario-Based</td></tr>
  <tr><td>Q50</td><td>If your application suddenly receives 10x traffic, how would you handle it?</td><td>Scenario-Based</td></tr>
</table>
`
},

"q01": {
  title: "HashMap Internal Working",
  html: `
<h2>How does HashMap work internally?</h2>
<p class="subtitle">Java · Core Collections · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>HashMap</code> stores key-value pairs in an array of <strong>buckets</strong>. It computes <code>hash(key) % array.length</code> to find a bucket, then walks a linked list or tree at that bucket to find the exact key using <code>equals()</code>. When the map grows, it <strong>resizes</strong> and rehashes entries into a larger array.</p>
</div>

<h3>How It Works Internally</h3>
<p>Since Java 8, each bucket is a node that can be a singly linked list or, when a bucket exceeds 8 nodes (and table length ≥ 64), a balanced red-black tree. The hash function spreads keys across buckets; collisions are expected and handled by chaining.</p>
<ul>
  <li><strong>Put:</strong> compute hash → index → if empty, insert; else compare keys with <code>equals()</code>; update value or append node; resize if load factor exceeded (default 0.75).</li>
  <li><strong>Get:</strong> same index lookup → traverse bucket until <code>equals()</code> matches.</li>
  <li><strong>Resize:</strong> doubles capacity; re-distributes entries — costly but amortized O(1).</li>
</ul>

<pre><code>// Java 17 — custom key must implement equals/hashCode
Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
scores.put("alice", 95);   // hash → bucket index → store Node
scores.get("alice");       // same index → equals match → return 95</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> HashMap uses an array of buckets. It hashes the key, maps to an index, and stores a Node (list or tree) at that bucket. Lookup compares hash first, then <code>equals()</code>. It resizes when load factor exceeds 0.75, rehashing all entries. Average get/put is O(1); worst case O(log n) per bucket with trees.</div>

<h3>Detailed Interview Answer</h3>
<p>Interviewers want more than &quot;array of linked lists.&quot; Explain the full put path: <code>hashCode()</code> is spread with an internal <code>hash()</code> method to reduce clustering, then masked to index with <code>(n - 1) &amp; hash</code> when capacity is power of two.</p>
<p>Mention Java 8 treeification: when many keys collide in one bucket, linked list degrades to O(n); tree keeps worst-case O(log n). Un-treeify happens when bucket shrinks below 6 nodes.</p>
<p>HashMap is not thread-safe — concurrent put can corrupt the table. For concurrency, use <code>ConcurrentHashMap</code>. Null keys/values are allowed (one null key).</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Saying HashMap is always O(1) without mentioning collisions and resize cost</li>
    <li>Using mutable objects as keys without overriding <code>equals()</code>/<code>hashCode()</code></li>
    <li>Confusing HashMap with HashTable (synchronized, no nulls)</li>
    <li>Expecting iteration order — use <code>LinkedHashMap</code> or <code>TreeMap</code></li>
  </ul>
</div>
`
},

"q02": {
  title: "Same Hashcode Collision",
  html: `
<h2>What happens when two keys have the same hashcode?</h2>
<p class="subtitle">Java · HashMap Collisions · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Same <code>hashCode()</code> does <strong>not</strong> mean same key. Both keys land in the <strong>same bucket</strong>, and HashMap stores them in a chain (list or tree). On get/put it walks the bucket and uses <code>equals()</code> to find the exact key.</p>
</div>

<h3>How It Works Internally</h3>
<p>Collisions are normal — hash codes compress many objects into fewer buckets. HashMap never assumes hash equality implies key equality.</p>
<div class="steps-box">
  <h4>Collision Resolution Flow</h4>
  <ol>
    <li>Compute bucket index from hash.</li>
    <li>If bucket empty → insert new node.</li>
    <li>If bucket occupied → compare existing key with <code>equals()</code>.</li>
    <li>If equal → replace value; if not → add to chain or tree.</li>
    <li>On get → traverse until <code>equals()</code> returns true.</li>
  </ol>
</div>

<pre><code>// Two different keys CAN share hashCode (rare but legal)
class BadKey {
    private final String id;
    @Override public int hashCode() { return 42; } // constant — all collide
    @Override public boolean equals(Object o) { /* compare id */ }
}</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Think of apartment mailboxes: two different residents (keys) might share mailbox number 42 (hash collision). The mail carrier (HashMap) opens box 42 and reads each name tag (<code>equals()</code>) until the right person is found.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> They map to the same bucket. HashMap chains entries in that bucket as a linked list or tree. Operations still work because <code>equals()</code> distinguishes keys. Performance degrades if many keys collide — poor <code>hashCode()</code> implementations cause long chains.</div>

<h3>Detailed Interview Answer</h3>
<p>Distinguish <code>hashCode()</code> collision from <code>equals()</code> equality. Two equal keys must have the same hash code (contract), but the reverse is false. Poor hash distribution — e.g., returning constant 1 — turns HashMap into a linked list with O(n) operations.</p>
<p>Java 8 mitigates extreme collisions with tree bins. Still, correct <code>hashCode()</code> using fields that define equality (IDE-generated or records) is essential for performance.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Believing same hashcode means duplicate key error</li>
    <li>Implementing <code>hashCode()</code> without <code>equals()</code></li>
    <li>Using only part of the key in <code>hashCode()</code> but full key in <code>equals()</code></li>
  </ul>
</div>
`
},

"q03": {
  title: "equals() and hashCode() Contract",
  html: `
<h2>Why should equals() and hashCode() always be overridden together?</h2>
<p class="subtitle">Java · Object Contract · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>The Java contract says: if two objects are <code>equals()</code>, they <strong>must</strong> have the same <code>hashCode()</code>. Hash-based collections (<code>HashMap</code>, <code>HashSet</code>) use hash first, then <code>equals()</code>. Break the contract and objects vanish from maps/sets or cannot be retrieved.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Reflexive:</strong> x.equals(x) is true.</li>
  <li><strong>Symmetric:</strong> x.equals(y) ⇔ y.equals(x).</li>
  <li><strong>Consistent:</strong> repeated calls same result if state unchanged.</li>
  <li><strong>hashCode contract:</strong> equal objects → equal hash codes.</li>
</ul>

<pre><code>// Broken — equals uses id, hashCode uses name
class User {
    Long id;
    @Override public boolean equals(Object o) { /* compare id */ }
    @Override public int hashCode() { return name.hashCode(); } // BUG
}
// user1.equals(user2) true but different buckets → get() returns null</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> HashMap/HashSet locate entries by hashCode first. If equal objects produce different hashes, they land in different buckets and lookups fail. Override both together using the same fields that define equality. Records and Lombok handle this automatically.</div>

<h3>Detailed Interview Answer</h3>
<p>Classic bug: override <code>equals()</code> for business identity (database id) but inherit <code>Object.hashCode()</code> (identity-based). Two &quot;equal&quot; logical users hash differently — <code>set.add(a)</code> then <code>set.contains(b)</code> returns false.</p>
<p>Best practice: use the same set of fields in both methods. For entities with generated ids, either don&apos;t put them in HashSet until persisted, or use business natural keys. Java 16+ records give canonical equals/hashCode from components.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Overriding equals but not hashCode</li>
    <li>Including mutable fields in hashCode (object moves buckets after mutation)</li>
    <li>Using <code>==</code> in equals for String comparison instead of <code>Objects.equals</code></li>
  </ul>
</div>
`
},

"q04": {
  title: "ConcurrentHashMap Thread Safety",
  html: `
<h2>How is ConcurrentHashMap thread-safe?</h2>
<p class="subtitle">Java · Concurrency · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>ConcurrentHashMap</code> splits the table into <strong>segments</strong> (Java 7) or uses <strong>per-bucket locking / CAS</strong> (Java 8+). Threads can read and write different buckets concurrently without locking the entire map. It never throws <code>ConcurrentModificationException</code> on iteration.</p>
</div>

<h3>How It Works Internally</h3>
<p>Java 8+ CHM: array of nodes like HashMap, but updates use synchronized on the bucket head or CAS for empty buckets. <code>size()</code> uses a counter with striped adders. Iterators are weakly consistent — reflect state at some point, may miss concurrent updates.</p>
<ul>
  <li><strong>put:</strong> CAS if empty bucket; else synchronized on first node.</li>
  <li><strong>get:</strong> usually lock-free, volatile reads.</li>
  <li><strong>compute/merge:</strong> atomic per-key operations.</li>
</ul>

<pre><code>ConcurrentHashMap&lt;String, AtomicInteger&gt; counters = new ConcurrentHashMap&lt;&gt;();
counters.computeIfAbsent("pageViews", k -&gt; new AtomicInteger())
        .incrementAndGet();</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Instead of one cashier for the whole store (Hashtable), each aisle has its own checkout (bucket lock). Shoppers in different aisles check out simultaneously; only two people grabbing the last item in the same aisle wait briefly.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> ConcurrentHashMap uses fine-grained locking — synchronized per bucket or CAS — not a global map lock. Reads are mostly lock-free. It provides atomic methods like <code>putIfAbsent</code> and <code>compute</code>. Unlike Collections.synchronizedMap, it scales under contention and has weakly consistent iterators.</div>

<h3>Detailed Interview Answer</h3>
<p>Contrast with <code>Hashtable</code> (every method synchronized — scalability bottleneck) and wrapping HashMap (still not safe for compound actions like check-then-put). CHM&apos;s <code>putIfAbsent</code> is atomic — critical for caches and deduplication.</p>
<p>Note: thread-safe map ≠ thread-safe value. If values are mutable, you still need synchronization on the value object.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Using CHM for compound check-then-act without <code>compute</code></li>
    <li>Assuming iteration sees a perfect snapshot</li>
    <li>Replacing all synchronized blocks with CHM when you need transactional multi-map updates</li>
  </ul>
</div>
`
},

"q05": {
  title: "volatile vs synchronized vs Lock",
  html: `
<h2>What is the difference between volatile, synchronized, and Lock?</h2>
<p class="subtitle">Java · Concurrency Primitives · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>volatile</code> guarantees <strong>visibility</strong> of one variable across threads (no caching in CPU registers). <code>synchronized</code> provides mutual exclusion <strong>and</strong> visibility for a block or method. <code>Lock</code> (e.g., <code>ReentrantLock</code>) is explicit locking with try-lock, timeouts, and fair ordering.</p>
</div>

<h3>Key Concepts</h3>
<table>
  <tr><th>Feature</th><th>volatile</th><th>synchronized</th><th>Lock</th></tr>
  <tr><td>Atomicity for compound ops</td><td>No</td><td>Yes</td><td>Yes</td></tr>
  <tr><td>Visibility</td><td>Yes</td><td>Yes</td><td>Yes (unlock)</td></tr>
  <tr><td>Blocking</td><td>No</td><td>Yes</td><td>Configurable</td></tr>
  <tr><td>tryLock / timeout</td><td>No</td><td>No</td><td>Yes</td></tr>
</table>

<pre><code>// volatile — flag visible to all threads
private volatile boolean shutdown = false;

// ReentrantLock — explicit control
private final Lock lock = new ReentrantLock();
public void transfer() {
    if (lock.tryLock(2, TimeUnit.SECONDS)) {
        try { /* critical section */ }
        finally { lock.unlock(); }
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> volatile ensures reads/writes go to main memory for one field — good for flags, not for i++. synchronized is JVM-managed monitor lock for atomic blocks. Lock is manual, supports tryLock, fairness, and multiple Conditions. Use volatile for simple visibility, synchronized for simple mutual exclusion, Lock for advanced control.</div>

<h3>Detailed Interview Answer</h3>
<p><code>count++</code> on volatile int is not thread-safe — read-modify-write is three steps. Use <code>AtomicInteger</code> or synchronization. synchronized is reentrant and releases lock on exception; always pair Lock with try/finally.</p>
<p>Prefer higher-level tools when possible: concurrent collections, executor services. Low-level locks when you need timed acquisition or separate read/write locks (<code>ReadWriteLock</code>).</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Using volatile for counters or check-then-act</li>
    <li>Forgetting <code>unlock()</code> in finally with Lock</li>
    <li>Synchronizing on String literals or boxed integers (shared monitors)</li>
  </ul>
</div>
`
},

"q06": {
  title: "Java Memory Model (JMM)",
  html: `
<h2>Explain the Java Memory Model (JMM)</h2>
<p class="subtitle">Java · Memory &amp; Visibility · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>The JMM defines <strong>when writes by one thread become visible</strong> to another. Without rules, CPUs and compilers reorder instructions and cache values locally. Happens-before relationships (locks, volatile, thread start/join) give predictable visibility guarantees.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Main memory vs working memory:</strong> each thread has local copies; flushes/reads coordinated by JMM.</li>
  <li><strong>happens-before:</strong> if A happens-before B, B sees A&apos;s effects.</li>
  <li><strong>Unlock → Lock:</strong> unlock on monitor happens-before subsequent lock on same monitor.</li>
  <li><strong>volatile write → volatile read</strong> of same variable.</li>
  <li><strong>Program order</strong> within a single thread.</li>
</ul>

<pre><code>// Without happens-before, reader may see stale or reordered values
class Holder {
    private int x = 0;
    private volatile boolean ready = false;
    void writer() { x = 42; ready = true; }  // volatile write HB reader
    void reader() {
        if (ready) System.out.println(x);    // sees 42, not 0
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> JMM specifies visibility and ordering across threads. Compilers and CPUs may reorder unless happens-before edges exist — from synchronized, volatile, atomic classes, or concurrent utilities. It explains why double-checked locking failed before volatile and why data races are undefined behavior.</div>

<h3>Detailed Interview Answer</h3>
<p>JMM is why &quot;it works on my machine&quot; fails under load — subtle races. Interviewers expect happens-before examples: releasing a lock publishes all writes made inside the critical section to the next acquirer.</p>
<p>Connect JMM to practical APIs: <code>ConcurrentHashMap</code>, <code>CountDownLatch</code>, and <code>CompletableFuture</code> establish safe publication. Without JMM understanding, developers misuse volatile as a silver bullet.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Assuming assignment order is visible order across threads</li>
    <li>Ignoring visibility and only thinking about atomicity</li>
    <li>Using non-thread-safe objects published without safe initialization</li>
  </ul>
</div>
`
},

"q07": {
  title: "Object Creation Internals",
  html: `
<h2>What happens internally when you create a new object?</h2>
<p class="subtitle">Java · JVM Internals · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>new MyClass()</code> triggers: <strong>class loading</strong> (if needed) → <strong>memory allocation</strong> on the heap → <strong>zeroing</strong> fields → <strong>constructor chain</strong> (super first) → return reference. The JVM may allocate on Eden (young gen) and eventually GC will reclaim it if unreachable.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>Object Creation Steps</h4>
  <ol>
    <li><strong>Check loaded class:</strong> loader resolves <code>MyClass</code>.</li>
    <li><strong>Allocate memory:</strong> TLAB (thread-local allocation buffer) fast path on Eden, else synchronized heap alloc.</li>
    <li><strong>Initialize header:</strong> mark word, klass pointer.</li>
    <li><strong>Instance initializer:</strong> default field values, instance blocks, constructor body.</li>
    <li><strong>Return reference</strong> to stack or register.</li>
  </ol>
</div>

<pre><code>// Bytecode: new + dup + invokespecial &lt;init&gt;
User user = new User("alice"); // heap object, reference on stack</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Building a house: get permits (class load), pour foundation (heap alloc), install default wiring (zeroing), then your contractor finishes interior (constructor). You get the address (reference), not the house itself moved to your wallet.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> JVM loads class, allocates heap memory (often Eden via TLAB), sets header, runs constructors chain from Object downward, returns reference. No stack object — objects live on heap; stack holds reference. Escape analysis may scalar-replace short-lived objects in optimized JIT code.</div>

<h3>Detailed Interview Answer</h3>
<p>Mention TLAB for allocation performance — reduces contention on Eden. Discuss that <code>new</code> is not the only path: reflection, deserialization, <code>clone()</code>, unsafe (internal).</p>
<p>Advanced: JIT escape analysis can eliminate allocation if object never escapes method scope — important when discussing &quot;allocation is cheap until it isn&apos;t.&quot;</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Saying objects allocate on the stack</li>
    <li>Skipping super constructor order in inheritance questions</li>
    <li>Confusing class loading with object creation every time</li>
  </ul>
</div>
`
},

"q08": {
  title: "Garbage Collection",
  html: `
<h2>How does Garbage Collection work?</h2>
<p class="subtitle">Java · JVM GC · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>GC finds <strong>unreachable objects</strong> on the heap and reclaims memory. Most collectors generational: young gen (Eden + Survivors) for short-lived objects, old gen for long-lived. Minor GC is frequent and fast; major/full GC compacts old gen and can pause the app.</p>
</div>

<h3>How It Works Internally</h3>
<ul>
  <li><strong>Mark:</strong> trace from GC roots (stacks, static fields, JNI).</li>
  <li><strong>Sweep/Copy:</strong> young gen copy survivors to Survivor or promote to Old.</li>
  <li><strong>Compact:</strong> reduce fragmentation in Old gen.</li>
  <li><strong>Collectors:</strong> G1 (default Java 9+), ZGC, Shenandoah for low pause.</li>
</ul>

<pre><code>// JVM flags — Spring Boot in containers
// -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC
// Monitor: GC pause, promotion rate, heap after GC</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> GC traces reachable objects from roots, reclaims unreachable memory. Generational hypothesis: most objects die young — Eden collections are cheap. Long-lived objects promoted to Old gen. Tune heap sizes, choose G1/ZGC, minimize allocation rate and premature promotion. Watch pause times and throughput.</div>

<h3>Detailed Interview Answer</h3>
<p>Explain GC roots and reachability — not reference counting (Java doesn&apos;t use it for heap). Minor GC stops-the-world briefly on young gen; promotion failure triggers costly Old gen collection.</p>
<p>Production tuning: align heap with container limits, avoid giant caches holding objects in Old gen, fix leaks (static maps, thread locals). Tools: GC logs, async-profiler, heap dumps.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Calling <code>System.gc()</code> expecting help</li>
    <li>Setting huge heap without understanding pause tradeoffs</li>
    <li>Confusing memory leak with normal GC activity</li>
  </ul>
</div>
`
},

"q09": {
  title: "ExecutorService & ThreadPoolExecutor",
  html: `
<h2>Explain ExecutorService and ThreadPoolExecutor</h2>
<p class="subtitle">Java · Thread Pools · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>ExecutorService</code> manages a <strong>pool of worker threads</strong> and a <strong>task queue</strong>. You submit <code>Runnable</code>/<code>Callable</code> instead of creating raw <code>Thread</code> objects. <code>ThreadPoolExecutor</code> lets you configure core/max pool size, queue type, and rejection policy.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>Task Submission Flow</h4>
  <ol>
    <li>If active threads &lt; corePoolSize → create thread.</li>
    <li>Else enqueue task.</li>
    <li>If queue full and threads &lt; maxPoolSize → create extra thread.</li>
    <li>Else run <code>RejectedExecutionHandler</code> (Abort, CallerRuns, Discard).</li>
  </ol>
</div>

<pre><code>ThreadPoolExecutor executor = new ThreadPoolExecutor(
    4, 16, 60, TimeUnit.SECONDS,
    new ArrayBlockingQueue&lt;&gt;(100),
    new ThreadPoolExecutor.CallerRunsPolicy());

Future&lt;String&gt; result = executor.submit(() -&gt; fetchData());
executor.shutdown();
executor.awaitTermination(30, TimeUnit.SECONDS);</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> ExecutorService abstracts thread lifecycle. ThreadPoolExecutor controls core/max threads, keep-alive, queue, and rejection. Never use <code>Executors.newCachedThreadPool()</code> unbounded in production — risk OOM. Size pools from metrics; always shutdown gracefully on app stop.</div>

<h3>Detailed Interview Answer</h3>
<p>Contrast fixed vs cached vs custom pools. Spring Boot uses Tomcat thread pool for requests — separate from @Async pools. CallerRunsPolicy provides backpressure by running task on submitter thread.</p>
<p>Shutdown: <code>shutdown()</code> stops new tasks; <code>awaitTermination</code> waits; on Spring context destroy, register lifecycle hooks.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Unbounded queue with fixed pool — hides overload until OOM</li>
    <li>Not shutting down pools on redeploy (thread leak)</li>
    <li>Blocking tasks on IO pool sized for CPU</li>
  </ul>
</div>
`
},

"q10": {
  title: "CompletableFuture vs Future",
  html: `
<h2>CompletableFuture vs Future?</h2>
<p class="subtitle">Java · Async Programming · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>Future</code> is a ticket for async result — you <code>get()</code> and block. <code>CompletableFuture</code> adds <strong>composition</strong>: chain stages with <code>thenApply</code>, combine with <code>allOf</code>, handle errors with <code>exceptionally</code>, without blocking until the end.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><code>Future.get()</code> — blocking, no chaining, no manual completion.</li>
  <li><code>CompletableFuture.supplyAsync()</code> — runs on ForkJoinPool or custom executor.</li>
  <li><code>thenCompose</code> — flatMap for nested futures.</li>
  <li><code>orTimeout / completeOnTimeout</code> — Java 9+ timeout support.</li>
</ul>

<pre><code>CompletableFuture&lt;OrderDto&gt; future =
    CompletableFuture.supplyAsync(() -&gt; inventoryClient.getStock(id))
        .thenApply(stock -&gt; pricingService.calculate(stock))
        .exceptionally(ex -&gt; OrderDto.fallback(id));

OrderDto order = future.join(); // or get with timeout</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Future is a restaurant pager — you wait until it buzzes. CompletableFuture is ordering on an app: you get notified when appetizer is ready, then main course pipelines automatically, and you set a fallback if kitchen is closed.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Future is blocking retrieval only. CompletableFuture supports non-blocking pipelines, combining multiple async calls, exception handling, and manual completion. Use CompletableFuture for parallel IO-bound calls; always pass a dedicated executor, not the common pool, in server apps.</div>

<h3>Detailed Interview Answer</h3>
<p>Show parallel pattern: fetch user, orders, recommendations with <code>CompletableFuture.allOf</code>, then merge — cuts latency vs sequential. Mention <code>thenCompose</code> vs <code>thenApply</code> — flatten nested futures.</p>
<p>In Spring Boot 3, virtual threads reduce need for reactive complexity, but CompletableFuture still valuable for fan-out inside a request.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Using default ForkJoinPool for blocking JDBC/HTTP</li>
    <li>Chaining with thenApply when thenCompose needed</li>
    <li>Ignoring exceptional completion — silent failures</li>
  </ul>
</div>
`
},

"q11": {
  title: "Java Streams Internals",
  html: `
<h2>How do Java Streams work internally?</h2>
<p class="subtitle">Java · Functional API · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Streams are <strong>lazy pipelines</strong>: source → intermediate ops (filter, map) → terminal op (collect, reduce). Elements flow one at a time through the pipeline; nothing runs until a terminal operation triggers evaluation.</p>
</div>

<h3>How It Works Internally</h3>
<p>Each intermediate operation wraps the previous stage (sink chaining). Spliterator splits data for parallel streams. Short-circuit ops like <code>findFirst</code> stop early.</p>

<pre><code>List&lt;String&gt; names = users.stream()
    .filter(u -&gt; u.isActive())
    .map(User::getName)
    .sorted()
    .toList(); // terminal — executes pipeline</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Streams build a lazy operation pipeline evaluated on terminal call. Internally stages link via Spliterator/Sink objects. Sequential streams process element-by-element; parallel fork splits source. They don&apos;t store data — one-time use. Prefer streams for declarative transforms, loops when performance-critical or indexed access needed.</div>

<h3>Detailed Interview Answer</h3>
<p>Discuss laziness: <code>filter</code> before <code>map</code> reduces work. Parallel streams use common ForkJoinPool — risky for blocking IO. Boxing and iterator overhead can make simple loops faster on small collections.</p>
<p>Streams are not collections — cannot add/remove. For debugging, peek() sparingly in dev only.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Reusing a stream after terminal operation</li>
    <li>Parallel streams on small data or with synchronized side effects</li>
    <li>Mutating external state inside forEach</li>
  </ul>
</div>
`
},

"q12": {
  title: "Making a Class Immutable",
  html: `
<h2>How would you make a class immutable?</h2>
<p class="subtitle">Java · Design · 2026</p>
<span class="tag tag-blue">Java</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>An immutable class cannot change after construction. Make it <strong>final</strong>, fields <strong>final</strong>, no setters, defensively copy mutable inputs/outputs, and ensure nested objects are immutable too.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>All fields private final; initialize via constructor.</li>
  <li>No mutator methods; operations return new instances.</li>
  <li>Copy mutable arguments: <code>List.copyOf()</code>, <code>Arrays.copyOf()</code>.</li>
  <li>Don&apos;t leak internal references via getters.</li>
</ul>

<pre><code>public final class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) {
        this.amount = Objects.requireNonNull(amount);
        this.currency = Objects.requireNonNull(currency);
    }
    public Money add(Money other) {
        return new Money(amount.add(other.amount), currency);
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> final class, all fields final, no setters, deep copy mutable fields on way in and out, use immutable types like String, LocalDate, records for DTOs. Immutability gives thread safety without locks and safer sharing in concurrent systems.</div>

<h3>Detailed Interview Answer</h3>
<p>Java records (Java 16+) provide compact immutable carriers — great for value objects. Distinguish immutability from unmodifiable views (<code>Collections.unmodifiableList</code> wraps mutable backing list).</p>
<p>In microservices, immutable command/event objects simplify reasoning and Kafka replay.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Returning internal mutable List from getter</li>
    <li>final class with mutable Date field exposed</li>
    <li>Thinking @Value from Lombok alone fixes deep immutability without copy</li>
  </ul>
</div>
`
},

"q13": {
  title: "Spring Boot Startup Internals",
  html: `
<h2>What happens internally when a Spring Boot application starts?</h2>
<p class="subtitle">Spring Boot 3 · Application Context · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>SpringApplication.run()</code> creates an <strong>ApplicationContext</strong>, loads environment (properties, profiles), scans components, registers bean definitions, runs auto-configuration, instantiates singleton beans, starts embedded Tomcat, and publishes <code>ApplicationReadyEvent</code>.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>Startup Phases</h4>
  <ol>
    <li>Create <code>SpringApplication</code> — infer app type (Servlet/Reactive).</li>
    <li>Prepare <code>Environment</code> — application.properties, env vars, profiles.</li>
    <li>Refresh context — bean factory, post-processors, component scan.</li>
    <li>Auto-configuration — <code>@Conditional</code> classes from <code>META-INF/spring</code>.</li>
    <li>Finish bean creation — dependency injection, <code>@PostConstruct</code>.</li>
    <li>Start web server — Tomcat on port 8080 by default.</li>
    <li>Run <code>ApplicationRunner</code> / <code>CommandLineRunner</code> beans.</li>
  </ol>
</div>

<pre><code>@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Starting Spring Boot is like opening a restaurant: read the menu config (properties), hire staff (beans), wire kitchen stations (DI), turn on ovens (Tomcat), then open doors (ready event).</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Spring Boot bootstraps an ApplicationContext, merges configuration, component-scans, applies conditional auto-config, creates and wires beans, starts embedded server, fires lifecycle events. Failures often come from missing beans, profile misconfig, or port binding — use <code>--debug</code> for condition report.</div>

<h3>Detailed Interview Answer</h3>
<p>Mention <code>SpringApplicationRunListeners</code> and ordering: <code>BeanFactoryPostProcessor</code> before bean instantiation. Auto-config is last-wins with your explicit @Bean definitions.</p>
<p>Spring Boot 3 on Java 17 uses Jakarta EE namespaces. Native image (AOT) pre-computes bean factory at build time — different startup path for GraalVM.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Component scan missing package of @Configuration class</li>
    <li>Assuming auto-config always runs — excluded by @SpringBootApplication exclude</li>
    <li>Heavy work in @PostConstruct slowing startup in Kubernetes</li>
  </ul>
</div>
`
},

"q14": {
  title: "Dependency Injection",
  html: `
<h2>How does Dependency Injection work?</h2>
<p class="subtitle">Spring Boot 3 · IoC Container · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Instead of <code>new OrderRepository()</code> inside a service, Spring <strong>creates and injects</strong> dependencies. The IoC container holds bean definitions, resolves types, manages lifecycle, and wires via constructor, setter, or field injection.</p>
</div>

<h3>How It Works Internally</h3>
<p>At refresh: Spring reads @Component/@Service metadata → creates BeanDefinition → instantiates via reflection → satisfies @Autowired dependencies (by type, then name) → applies proxies for @Transactional/@Cacheable.</p>

<pre><code>@Service
public class OrderService {
    private final OrderRepository repository;
    private final PaymentClient paymentClient;

    public OrderService(OrderRepository repository, PaymentClient paymentClient) {
        this.repository = repository;
        this.paymentClient = paymentClient;
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Spring IoC container creates singleton beans (default), resolves dependency graph, injects via constructor preferably. @Autowired on constructor is implicit in Spring 4.3+ with single constructor. DI enables testing with mocks and swapping implementations via @Profile or @Qualifier.</div>

<h3>Detailed Interview Answer</h3>
<p>Explain circular dependency: constructor cycle fails; setter/field may work with early proxies (discouraged). @Primary and @Qualifier resolve ambiguity.</p>
<p>DI is not magic — understand scope: singleton vs prototype, request scope needs web context. Prototype injected into singleton gets one instance unless @Lookup or ObjectProvider.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Field injection in production code (hard to test)</li>
    <li>Calling <code>new</code> on Spring-managed classes</li>
    <li>Circular dependencies patched with @Lazy instead of redesign</li>
  </ul>
</div>
`
},

"q15": {
  title: "Constructor Injection Preferred",
  html: `
<h2>Why is constructor injection preferred?</h2>
<p class="subtitle">Spring Boot 3 · Best Practices · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Constructor injection makes dependencies <strong>required and explicit</strong>, enables <code>final</code> fields, simplifies unit tests, and fails fast at startup if a bean is missing — not at runtime on first request.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Immutability:</strong> dependencies as final fields.</li>
  <li><strong>Testability:</strong> <code>new Service(mockRepo)</code> without Spring.</li>
  <li><strong>Fail-fast:</strong> context won&apos;t start if dependency missing.</li>
  <li><strong>No reflection injection</strong> after construction for required deps.</li>
</ul>

<pre><code>@RestController
@RequiredArgsConstructor // Lombok generates constructor for final fields
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/orders/{id}")
    public OrderDto get(@PathVariable Long id) {
        return orderService.findById(id);
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Constructor injection documents required dependencies, allows final fields, fails at startup on misconfiguration, and avoids hidden @Autowired fields. Spring auto-wires single constructor without @Autowired. Use setter only for optional dependencies.</div>

<h3>Detailed Interview Answer</h3>
<p>Field injection is popular in tutorials but rejected in mature codebases — hides dependencies, requires reflection, incompatible with final. Constructor injection aligns with SOLID — explicit dependencies visible in API.</p>
<p>Optional deps: use @Autowired(required=false) on setter or ObjectProvider&lt;T&gt; for lazy optional beans.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Too many constructor params (god class) — split responsibilities</li>
    <li>Mixing field and constructor injection inconsistently</li>
    <li>Using @Autowired on every constructor when only one exists</li>
  </ul>
</div>
`
},

"q16": {
  title: "Spring Bean Lifecycle",
  html: `
<h2>Explain the complete Spring Bean lifecycle</h2>
<p class="subtitle">Spring Boot 3 · Bean Lifecycle · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>A bean goes from <strong>definition</strong> → <strong>instantiation</strong> → <strong>dependency injection</strong> → <strong>initialization callbacks</strong> → <strong>ready use</strong> → <strong>destruction</strong> on shutdown. Extension points: BeanPostProcessor, @PostConstruct, InitializingBean, @PreDestroy.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>Lifecycle Order (simplified)</h4>
  <ol>
    <li>Instantiate bean (constructor).</li>
    <li>Populate properties / inject dependencies.</li>
    <li><code>BeanNameAware</code>, <code>BeanFactoryAware</code>, etc.</li>
    <li><code>BeanPostProcessor.postProcessBeforeInitialization</code></li>
    <li><code>@PostConstruct</code> / <code>afterPropertiesSet()</code></li>
    <li><code>BeanPostProcessor.postProcessAfterInitialization</code> (AOP proxies here)</li>
    <li>Bean in use.</li>
    <li>On shutdown: <code>@PreDestroy</code>, <code>destroy()</code>, disposable callbacks.</li>
  </ol>
</div>

<pre><code>@Component
public class CacheWarmer {
    @PostConstruct
    public void warm() { /* load cache */ }

    @PreDestroy
    public void cleanup() { /* flush connections */ }
}</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Hiring an employee: offer letter (bean definition), first day paperwork (DI), orientation (@PostConstruct), daily work (bean usage), exit interview on last day (@PreDestroy).</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Spring creates bean, injects deps, runs BeanPostProcessors, calls @PostConstruct, wraps with AOP proxy if needed, serves requests, then @PreDestroy on context close. BeanPostProcessor is how @Transactional and @Async proxies are applied.</div>

<h3>Detailed Interview Answer</h3>
<p>Key interview point: @Transactional works on proxied beans — self-invocation within same class bypasses proxy. Initialization should be lightweight; defer heavy work to ApplicationReadyEvent.</p>
<p>Prototype beans: Spring creates and hands off — container does not manage full destroy cycle for prototypes.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Heavy DB calls in @PostConstruct blocking startup</li>
    <li>Calling @Transactional method from same class via this.</li>
    <li>Assuming prototype injected into singleton gets new instance each call</li>
  </ul>
</div>
`
},

"q17": {
  title: "Spring Boot Auto Configuration",
  html: `
<h2>How does Spring Boot Auto Configuration work?</h2>
<p class="subtitle">Spring Boot 3 · Auto-Config · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Auto-configuration is a set of <strong>conditional @Configuration classes</strong> on the classpath. If you have JDBC + HikariCP, Spring Boot auto-creates a <code>DataSource</code>. You override with your own @Bean or properties.</p>
</div>

<h3>How It Works Internally</h3>
<p><code>spring.factories</code> (Boot 2) / <code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code> (Boot 3) lists auto-config classes. Each uses @ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty.</p>

<pre><code>@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {
    @Bean
    DataSource dataSource(DataSourceProperties props) {
        return DataSourceBuilder.create().build();
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Boot loads auto-config classes conditionally from classpath metadata. @ConditionalOnMissingBean lets your @Bean win. Enable debug logging for condition evaluation report. Starters bundle dependencies + auto-config — spring-boot-starter-web pulls Tomcat, Jackson, MVC.</div>

<h3>Detailed Interview Answer</h3>
<p>Explain ordering: @AutoConfigureBefore/After for DataSource before JPA. Custom starters package auto-config for internal libraries.</p>
<p>Security auto-config changed in Boot 3 — default security requires explicit SecurityFilterChain bean for custom rules.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Fighting auto-config without understanding @ConditionalOnMissingBean</li>
    <li>Excluding too much via @EnableAutoConfiguration exclude</li>
    <li>Expecting same beans in test without @Import or test slices</li>
  </ul>
</div>
`
},

"q18": {
  title: "Global Exception Handling",
  html: `
<h2>How do you implement global exception handling?</h2>
<p class="subtitle">Spring Boot 3 · REST Error Handling · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Use <code>@ControllerAdvice</code> with <code>@ExceptionHandler</code> methods to catch exceptions across all controllers and return consistent JSON error responses with proper HTTP status codes.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><code>@RestControllerAdvice</code> = @ControllerAdvice + @ResponseBody.</li>
  <li>Map domain exceptions to 404, 409, 422, etc.</li>
  <li>Include error code, message, timestamp, path — not stack traces in prod.</li>
  <li>Spring 6+ <code>ProblemDetail</code> (RFC 7807) support.</li>
</ul>

<pre><code>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity&lt;ProblemDetail&gt; notFound(OrderNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setProperty("errorCode", "ORDER_NOT_FOUND");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problem);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity&lt;Map&lt;String, Object&gt;&gt; validation(MethodArgumentNotValidException ex) {
        var errors = ex.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> @RestControllerAdvice centralizes exception mapping. Each @ExceptionHandler returns ResponseEntity with status and body. Separate business exceptions from infrastructure failures. Log server-side details; return safe messages to clients. Use ProblemDetail for standard error format.</div>

<h3>Detailed Interview Answer</h3>
<p>Order matters: most specific handler first. @ExceptionHandler(Exception.class) as fallback returns 500 without leaking internals. Integrate with observability — add traceId from MDC to error response.</p>
<p>For validation: @Valid on request DTO + MethodArgumentNotValidException handler. For security: AccessDeniedException → 403.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>try/catch in every controller method</li>
    <li>Returning stack traces to API consumers</li>
    <li>Same 400 for validation and business rule violations</li>
  </ul>
</div>
`
},

"q19": {
  title: "Secure REST APIs with JWT",
  html: `
<h2>How do you secure REST APIs using JWT?</h2>
<p class="subtitle">Spring Boot 3 · Security · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Client logs in → server issues signed <strong>JWT</strong> (access token). Subsequent requests send <code>Authorization: Bearer &lt;token&gt;</code>. Resource server validates signature, expiry, and authorities — stateless, no server session.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>JWT Flow</h4>
  <ol>
    <li>POST /auth/login with credentials.</li>
    <li>Auth service issues access token (short TTL) + optional refresh token.</li>
    <li>Client stores token securely (memory / httpOnly cookie).</li>
    <li>JwtAuthenticationFilter parses header, validates with secret/public key.</li>
    <li>SecurityContext holds Authentication for @PreAuthorize checks.</li>
  </ol>
</div>

<pre><code>@Bean
SecurityFilterChain security(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -&gt; csrf.disable())
        .sessionManagement(s -&gt; s.sessionCreationPolicy(STATELESS))
        .authorizeHttpRequests(auth -&gt; auth
            .requestMatchers("/auth/**").permitAll()
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated())
        .oauth2ResourceServer(oauth2 -&gt; oauth2.jwt(Customizer.withDefaults()))
        .build();
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Use Spring Security OAuth2 Resource Server with JWT. Validate signature (HMAC or RSA), exp, issuer, audience. Short-lived access tokens, refresh for renewal. Apply method security with @PreAuthorize. Never store JWT in localStorage if XSS risk — prefer httpOnly cookies for browsers.</div>

<h3>Detailed Interview Answer</h3>
<p>Distinguish authentication (who) vs authorization (what). JWT payload contains claims — don&apos;t put PII or secrets. Rotate signing keys; support JWKS endpoint for microservices.</p>
<p>For microservices: API Gateway validates JWT once; downstream trusts internal network or mTLS. Revocation: short TTL + refresh token blacklist in Redis for logout.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Accepting alg=none or weak HMAC secret</li>
    <li>Long-lived access tokens without revocation strategy</li>
    <li>Trusting client-side role claims without server validation</li>
  </ul>
</div>
`
},

"q20": {
  title: "Spring Boot Performance",
  html: `
<h2>How do you improve Spring Boot application performance?</h2>
<p class="subtitle">Spring Boot 3 · Performance · 2026</p>
<span class="tag tag-green">Spring Boot</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Measure first, then optimize the <strong>slowest layer</strong>: database queries, external HTTP, serialization, thread pools, or GC. Caching, connection pooling, pagination, and async where appropriate beat premature micro-optimizations.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>DB: indexes, avoid N+1 (@EntityGraph, join fetch), read replicas.</li>
  <li>HTTP: WebClient connection pooling, timeouts, compression.</li>
  <li>Caching: @Cacheable on hot reads, Redis for distributed.</li>
  <li>JVM: right-size heap, G1/ZGC, reduce allocation churn.</li>
  <li>Observability: Micrometer, tracing, slow query log.</li>
</ul>

<pre><code>@Cacheable(value = "products", key = "#id")
public ProductDto findById(Long id) {
    return productRepository.findById(id)
        .map(ProductMapper::toDto)
        .orElseThrow(() -&gt; new ProductNotFoundException(id));
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Profile with metrics and traces — fix p99 bottlenecks. Optimize SQL and connection pools, add caching for read-heavy paths, tune Tomcat and HikariCP, use pagination, compress responses, enable HTTP/2. Consider virtual threads in Boot 3.2+ for IO-bound workloads. Load test before and after.</div>

<h3>Detailed Interview Answer</h3>
<p>Structured answer: (1) measure RED metrics, (2) database — explain N+1 fix with batch fetching, (3) resilience timeouts preventing thread starvation, (4) horizontal scale with stateless services.</p>
<p>Mention Spring Boot 3 native compilation for cold start in serverless — trade build complexity for startup time.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Caching everything including frequently changing data</li>
    <li>Increasing heap instead of fixing memory leak</li>
    <li>Parallel streams on request threads for blocking JDBC</li>
  </ul>
</div>
`
},

"q21": {
  title: "Microservices vs Monolith",
  html: `
<h2>Why did you choose Microservices over Monolith?</h2>
<p class="subtitle">Microservices · Architecture · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Choose microservices when <strong>independent scaling, team autonomy, and technology diversity</strong> outweigh operational complexity. Start monolith-first unless domain boundaries and org structure are clear — microservices solve people and scale problems, not small apps.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Pros:</strong> isolated deploys, fault isolation, team ownership per domain.</li>
  <li><strong>Cons:</strong> distributed debugging, data consistency, infra cost, network latency.</li>
  <li><strong>When monolith wins:</strong> early product, small team, unclear boundaries.</li>
  <li><strong>Strangler pattern:</strong> extract services gradually from monolith.</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> We chose microservices because bounded contexts (orders, payments, inventory) had different scale profiles and separate teams needed independent release cycles. We accepted operational overhead — service mesh, observability, eventual consistency — in exchange for scalability and fault isolation. We would not split a small CRUD app prematurely.</div>

<h3>Detailed Interview Answer</h3>
<p>Interviewers want tradeoff awareness, not fanaticism. Cite Conway&apos;s Law — team structure mirrors architecture. Mention you&apos;d use modular monolith as middle ground.</p>
<p>Real reason examples: payment service PCI scope isolation, catalog team deploying daily while billing monthly.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Claiming microservices are always more scalable</li>
    <li>Splitting by technical layer (DAO service) not business capability</li>
    <li>Ignoring distributed transaction complexity</li>
  </ul>
</div>
`
},

"q22": {
  title: "Microservice Communication",
  html: `
<h2>How do your microservices communicate?</h2>
<p class="subtitle">Microservices · Integration · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>We use <strong>synchronous REST/gRPC</strong> for request-response flows needing immediate answers, and <strong>asynchronous Kafka</strong> for events, notifications, and decoupled workflows. API Gateway is the external entry point.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Sync:</strong> OpenFeign/WebClient, gRPC for low-latency internal calls.</li>
  <li><strong>Async:</strong> Kafka topics for domain events (OrderPlaced, PaymentCompleted).</li>
  <li><strong>Contracts:</strong> OpenAPI, schema registry for Avro/JSON schemas.</li>
  <li><strong>Resilience:</strong> timeouts, circuit breakers on sync paths.</li>
</ul>

<pre><code>@FeignClient(name = "inventory-service")
public interface InventoryClient {
    @GetMapping("/api/stock/{productId}")
    StockDto getStock(@PathVariable Long productId);
}

// Event-driven
kafkaTemplate.send("order-events", new OrderPlacedEvent(orderId));</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Sync is a phone call — you wait for an answer now. Async is email — you send and continue; they reply when ready. Use the right channel for urgency and coupling tolerance.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> REST/Feign for user-facing read paths needing low latency; Kafka for event propagation between services. Gateway handles external routing and auth. Internal mTLS or service mesh for security. Schema registry enforces event contract compatibility.</div>

<h3>Detailed Interview Answer</h3>
<p>Describe concrete topology: Order Service calls Inventory sync for stock check; publishes OrderPlaced to Kafka for Shipping and Analytics. Explain why chatty sync chains are avoided.</p>
<p>Mention idempotent consumers and correlation IDs propagated in headers for tracing.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Sync chain A→B→C→D for everything</li>
    <li>No contract versioning on events</li>
    <li>Sharing database between services</li>
  </ul>
</div>
`
},

"q23": {
  title: "Sync vs Async Communication",
  html: `
<h2>When would you use synchronous vs asynchronous communication?</h2>
<p class="subtitle">Microservices · Messaging Patterns · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Synchronous</strong> when the caller needs an immediate result to continue (e.g., validate payment before confirming order). <strong>Asynchronous</strong> when you can decouple in time (send confirmation email, update analytics, notify warehouse).</p>
</div>

<h3>Key Concepts</h3>
<table>
  <tr><th>Use Sync When</th><th>Use Async When</th></tr>
  <tr><td>User waits for response</td><td>Fire-and-forget side effects</td></tr>
  <tr><td>Strong consistency needed now</td><td>Eventual consistency acceptable</td></tr>
  <tr><td>Simple query/aggregate</td><td>Peak load buffering</td></tr>
  <tr><td>Low fan-out</td><td>Multiple subscribers</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> Sync for request-response on critical path where user or transaction blocks on outcome. Async for notifications, audit, analytics, and long-running work. Async improves resilience and elasticity but adds complexity — ordering, duplicates, observability. Never block user on non-critical async work.</div>

<h3>Detailed Interview Answer</h3>
<p>Example: checkout — sync payment authorization, async fraud scoring if SLA allows. Hybrid: return 202 Accepted with tracking id while processing continues.</p>
<p>Discuss backpressure: Kafka absorbs spikes; sync calls need rate limiting and circuit breakers.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Async for operations user must confirm succeeded immediately</li>
    <li>Sync email send blocking checkout</li>
    <li>No dead-letter queue on async failures</li>
  </ul>
</div>
`
},

"q24": {
  title: "API Gateway Purpose",
  html: `
<h2>What is the purpose of an API Gateway?</h2>
<p class="subtitle">Microservices · Edge Layer · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>The API Gateway is the <strong>single front door</strong> for clients. It handles routing, authentication, rate limiting, SSL termination, request aggregation, and hides internal service topology from mobile/web apps.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Routing:</strong> /orders → order-service, /payments → payment-service.</li>
  <li><strong>Cross-cutting:</strong> JWT validation, CORS, logging, metrics.</li>
  <li><strong>Aggregation:</strong> BFF pattern — one call composes multiple services.</li>
  <li><strong>Implementations:</strong> Spring Cloud Gateway, Kong, AWS API Gateway.</li>
</ul>

<pre><code>// Spring Cloud Gateway route
spring.cloud.gateway.routes[0].id=orders
spring.cloud.gateway.routes[0].uri=lb://order-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/orders/**</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>A hotel concierge (gateway): guests don&apos;t wander hallways finding housekeeping. One desk routes requests, checks ID, and coordinates behind the scenes.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> API Gateway centralizes external access — route to services, validate tokens, apply rate limits, transform protocols. Clients see one base URL. Avoid putting business logic in gateway; keep it thin edge policy. Service mesh handles east-west; gateway handles north-south.</div>

<h3>Detailed Interview Answer</h3>
<p>Contrast BFF (per client type) vs generic gateway. Mention canary routing and blue-green at gateway level. Security: terminate TLS, forward internal identity headers cautiously (never forge without validation).</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Fat gateway with domain logic becoming monolith</li>
    <li>Skipping gateway and exposing all service URLs to clients</li>
    <li>No rate limiting at edge</li>
  </ul>
</div>
`
},

"q25": {
  title: "Service Discovery",
  html: `
<h2>How does Service Discovery work?</h2>
<p class="subtitle">Microservices · Infrastructure · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Services register their network location with a <strong>registry</strong> (Eureka, Consul, Kubernetes DNS). Clients resolve logical name <code>order-service</code> to current IP/port list and load-balance across healthy instances.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>Discovery Flow</h4>
  <ol>
    <li>Service starts → registers with Eureka/Consul heartbeat.</li>
    <li>Client or load balancer queries registry.</li>
    <li>Receives instance list → round-robin / least-connections.</li>
    <li>Unhealthy instances removed after missed heartbeats.</li>
  </ol>
</div>

<pre><code>@FeignClient(name = "inventory-service") // resolves via discovery + LoadBalancer
public interface InventoryClient { /* ... */ }</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Service discovery maps service names to dynamic instances. On Kubernetes, CoreDNS + Services replace Eureka for many teams. Spring Cloud LoadBalancer picks instances. Health checks prune dead pods. Enables scaling and rolling deploys without hardcoded URLs.</div>

<h3>Detailed Interview Answer</h3>
<p>Client-side (Eureka + Ribbon/LoadBalancer) vs server-side (K8s kube-proxy). In cloud-native stacks, K8s service names often suffice; Eureka still common in Spring estates.</p>
<p>Discuss cache staleness — client may call dead instance until refresh; retries and circuit breakers mitigate.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Hardcoding service URLs in config</li>
    <li>No health checks — routing to starting/crashing pods</li>
    <li>Running Eureka when K8s already provides discovery</li>
  </ul>
</div>
`
},

"q26": {
  title: "Circuit Breaker Example",
  html: `
<h2>Explain Circuit Breaker with a real example</h2>
<p class="subtitle">Microservices · Resilience · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When calls to Inventory Service fail repeatedly, the <strong>circuit opens</strong> — further calls fail fast without waiting. After a cooldown, a <strong>half-open</strong> trial call tests recovery. Prevents thread exhaustion and cascade failures.</p>
</div>

<h3>How It Works Internally</h3>
<p>States: CLOSED (normal) → OPEN (reject) → HALF_OPEN (probe). Resilience4j tracks failure rate and slow call rate in sliding window.</p>

<pre><code>@CircuitBreaker(name = "inventory", fallbackMethod = "fallbackStock")
public StockDto getStock(Long productId) {
    return inventoryClient.fetch(productId);
}

public StockDto fallbackStock(Long productId, Throwable t) {
    return cache.get(productId).orElse(StockDto.unknown());
}</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Home circuit breaker trips when wiring overloads — cuts power to prevent fire. You don&apos;t keep flipping switches; you wait, fix the fault, then test one appliance (half-open).</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Circuit breaker stops calling a failing dependency after threshold failures, returns fallback fast. Example: inventory down during sale — open circuit, serve cached stock status, keep product page up. Pair with timeout and bulkhead. Reset after wait duration with trial request.</div>

<h3>Detailed Interview Answer</h3>
<p>Real scenario: Black Friday, inventory DB slow — 50% calls timeout. Without breaker, order service threads exhausted, checkout fails entirely. Breaker opens after 50% failure in 10s window; fallback shows &quot;availability uncertain.&quot;</p>
<p>Tune thresholds per dependency SLA; monitor circuit state metrics.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Circuit breaker without timeout (slow calls never count as failure)</li>
    <li>Dangerous fallback — assume in-stock for purchases</li>
    <li>Same breaker config for all dependencies</li>
  </ul>
</div>
`
},

"q27": {
  title: "Saga Pattern",
  html: `
<h2>What is the Saga Pattern?</h2>
<p class="subtitle">Microservices · Distributed Transactions · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>A saga is a sequence of <strong>local transactions</strong> across services. If step 3 fails, execute <strong>compensating transactions</strong> to undo steps 1 and 2. Replaces 2PC across microservices with eventual consistency.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Choreography:</strong> services react to events (OrderPlaced → ReserveStock → ChargePayment).</li>
  <li><strong>Orchestration:</strong> central coordinator directs steps and compensations.</li>
  <li><strong>Compensation:</strong> ReleaseStock, RefundPayment — not always literal undo.</li>
</ul>

<pre><code>// Orchestration pseudo-flow
1. CreateOrder (PENDING)
2. ReserveInventory → fail → CancelOrder (compensate)
3. ChargePayment → fail → ReleaseInventory + CancelOrder
4. ConfirmOrder (CONFIRMED)</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Booking a trip: reserve hotel, book flight, rent car. If flight fails, cancel hotel (compensate) — you don&apos;t leave orphaned reservations.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Saga coordinates multi-service business transactions via local commits plus compensating actions on failure. Choreography uses events; orchestration uses a saga manager. No distributed locks — accept eventual consistency and design idempotent steps. Used for order fulfillment, travel booking, payments.</div>

<h3>Detailed Interview Answer</h3>
<p>Compare to 2PC — sagas don&apos;t block resources across DBs but compensation can be complex (payment refund async). Every step must be idempotent for safe retries.</p>
<p>Tools: Temporal, Axon, or custom state machine in order service with outbox pattern.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Assuming compensation equals rollback (shipped goods need return flow)</li>
    <li>Missing idempotency on saga steps</li>
    <li>No visibility into saga state for support teams</li>
  </ul>
</div>
`
},

"q28": {
  title: "Cross-Service Data Consistency",
  html: `
<h2>How do you maintain data consistency across microservices?</h2>
<p class="subtitle">Microservices · Data · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Each service owns its <strong>database</strong>. Cross-service consistency uses <strong>eventual consistency</strong>: domain events, outbox pattern, sagas, and idempotent consumers — not shared transactions.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Database per service:</strong> no cross-DB joins in production.</li>
  <li><strong>Transactional outbox:</strong> write business row + event in same local TX.</li>
  <li><strong>CDC / polling:</strong> relay outbox to Kafka reliably.</li>
  <li><strong>Read models:</strong> materialized views for queries spanning domains.</li>
</ul>

<pre><code>@Transactional
public void placeOrder(Order order) {
    orderRepository.save(order);
    outboxRepository.save(new OutboxEvent("OrderPlaced", order.getId()));
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Avoid distributed transactions. Use saga for multi-step writes, outbox for reliable event publish, idempotent consumers for at-least-once delivery. Expose compensations and accept temporary inconsistency in read models. CQRS can separate write and query consistency needs.</div>

<h3>Detailed Interview Answer</h3>
<p>Outbox solves dual-write problem — don&apos;t write DB then fire Kafka without atomicity. Debezium CDC streams outbox table to message bus.</p>
<p>For reads needing joined data: API composition, BFF aggregation, or dedicated read store fed by events.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Shared database anti-pattern</li>
    <li>Expecting immediate cross-service consistency everywhere</li>
    <li>Publishing to Kafka before local commit succeeds</li>
  </ul>
</div>
`
},

"q29": {
  title: "Retries and Timeouts",
  html: `
<h2>How do you handle retries and timeouts?</h2>
<p class="subtitle">Microservices · Resilience · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Timeouts</strong> cap wait time so threads aren&apos;t stuck forever. <strong>Retries</strong> handle transient failures (network blip) with exponential backoff and jitter. Never retry non-idempotent operations without deduplication keys.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>Connect timeout: 1–2s; read timeout: based on p99 SLA.</li>
  <li>Retry only idempotent methods (GET, PUT with idempotency key).</li>
  <li>Exponential backoff: 100ms, 200ms, 400ms + random jitter.</li>
  <li>Max attempts — then fail or circuit break.</li>
</ul>

<pre><code>@Retry(name = "payment", fallbackMethod = "paymentFailed")
@TimeLimiter(name = "payment")
public CompletableFuture&lt;PaymentResult&gt; charge(PaymentRequest req) {
    return CompletableFuture.supplyAsync(() -&gt; paymentClient.charge(req));
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Set aggressive timeouts on outbound calls. Retry transient 5xx/timeout with exponential backoff and jitter, max 3 attempts. Use idempotency keys for POST payments. Combine with circuit breaker to avoid retry storms on persistent outages. Log and metric each retry.</div>

<h3>Detailed Interview Answer</h3>
<p>Retry storm example: inventory down, 1000 instances each retry 5 times — amplifies load 5000x. Circuit breaker pauses retries when open.</p>
<p>Spring Retry, Resilience4j, or service mesh (Istio) policies. Distinguish client timeout from server still processing — use idempotency for safe replay.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Retrying POST without idempotency key (double charge)</li>
    <li>Immediate retry with no backoff</li>
    <li>Same timeout for all dependencies</li>
  </ul>
</div>
`
},

"q30": {
  title: "REST API Versioning",
  html: `
<h2>How do you version REST APIs?</h2>
<p class="subtitle">Microservices · API Design · 2026</p>
<span class="tag tag-yellow">Microservices</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Version when you make <strong>breaking changes</strong>. Common approaches: URL path (<code>/api/v2/orders</code>), header (<code>Accept-Version: 2</code>), or content negotiation. Support old version during migration window.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Backward compatible:</strong> add optional fields — no new version needed.</li>
  <li><strong>Breaking:</strong> rename/remove fields, change semantics → new version.</li>
  <li><strong>Deprecation:</strong> Sunset header, docs, metrics on v1 traffic.</li>
  <li><strong>Events:</strong> schema versioning in Kafka with compatibility mode.</li>
</ul>

<pre><code>@RestController
@RequestMapping("/api/v2/orders")
public class OrderControllerV2 {
    @GetMapping("/{id}")
    public OrderResponseV2 get(@PathVariable Long id) { /* ... */ }
}</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>API versions are like book editions — v1 readers keep their copy until they upgrade; publisher supports both until v1 goes out of print (deprecation).</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Prefer backward-compatible evolution. For breaks, use URL versioning for clarity (/v2/) or Accept header for purity. Run v1 and v2 in parallel, monitor adoption, set deprecation date. Version events in schema registry with BACKWARD compatibility for consumers.</div>

<h3>Detailed Interview Answer</h3>
<p>Team policy example: 12-month deprecation, semantic versioning for APIs. Gateway routes /v1 and /v2 to same service with different controllers or adapters.</p>
<p>Expand-contract pattern for DB migrations supporting both versions during transition.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Versioning every small additive change</li>
    <li>Breaking mobile clients without coordination</li>
    <li>No telemetry on old version usage before removal</li>
  </ul>
</div>
`
},

"q31": {
  title: "Kafka Architecture",
  html: `
<h2>Explain Kafka architecture</h2>
<p class="subtitle">Kafka · Distributed Streaming · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Kafka is a distributed <strong>commit log</strong>. Producers append records to <strong>topics</strong> partitioned across <strong>brokers</strong>. Consumers read at their own pace from partitions. ZooKeeper (older) or KRaft (newer) manages cluster metadata.</p>
</div>

<h3>How It Works Internally</h3>
<ul>
  <li><strong>Topic:</strong> logical stream split into partitions for parallelism.</li>
  <li><strong>Partition:</strong> ordered, immutable sequence of records.</li>
  <li><strong>Replication:</strong> each partition has leader + follower replicas.</li>
  <li><strong>ISR:</strong> in-sync replicas eligible for leader election.</li>
  <li><strong>Retention:</strong> time/size based — not a queue that deletes on read.</li>
</ul>

<pre><code>// Producer — Spring Kafka
kafkaTemplate.send("order-events", orderId.toString(), orderPlacedEvent);

// Consumer
@KafkaListener(topics = "order-events", groupId = "shipping-service")
public void handle(ConsumerRecord&lt;String, OrderPlacedEvent&gt; record) { /* ... */ }</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Kafka is a DVR for your data — producers record channels (topics), consumers rewind and play at their speed. Multiple viewers (consumer groups) can watch the same show independently.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Kafka clusters brokers storing partitioned topics replicated for fault tolerance. Producers write to partition leaders; followers replicate. Consumers track offsets per partition. High throughput via sequential disk I/O and batching. KRaft mode removes ZooKeeper dependency in modern clusters.</div>

<h3>Detailed Interview Answer</h3>
<p>Explain why partitions matter — unit of parallelism and ordering boundary. Replication factor 3 typical in prod. Min in-sync replicas (min.insync.replicas) prevents silent data loss on acks=1.</p>
<p>Contrast with traditional MQ — Kafka retains, supports replay, multiple consumer groups read same data.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Treating Kafka as work queue with one consumer deleting messages</li>
    <li>Too few partitions limiting throughput</li>
    <li>acks=0 or 1 in critical financial events without understanding risk</li>
  </ul>
</div>
`
},

"q32": {
  title: "Kafka Message Ordering",
  html: `
<h2>How does Kafka guarantee message ordering?</h2>
<p class="subtitle">Kafka · Ordering · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Kafka guarantees order <strong>within a single partition</strong>, not across the whole topic. Use the same <strong>partition key</strong> (e.g., orderId) so all events for one entity land in one partition and stay ordered.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>Producer sends records with key → hash(key) % numPartitions.</li>
  <li>Single partition consumer processes sequentially per thread.</li>
  <li>Cross-partition ordering requires application-level design or single partition (limits scale).</li>
  <li>max.in.flight.requests.per.connection &gt; 1 without idempotence can reorder on retry.</li>
</ul>

<pre><code>// Same orderId always same partition — ordered lifecycle events
kafkaTemplate.send("order-events", orderId.toString(), event);</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Ordering is per partition only. Partition by business key for entity-level order. Enable idempotent producer and limited in-flight requests if strict ordering with retries. Multiple consumers in same group split partitions — each partition assigned to one consumer at a time.</div>

<h3>Detailed Interview Answer</h3>
<p>Example: OrderCreated before OrderPaid must share orderId key. Global ordering across all orders is rarely needed and expensive (one partition).</p>
<p>Discuss compaction topics for changelog ordering by key for Kafka Streams state stores.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Expecting total topic order with multiple partitions</li>
    <li>Null keys round-robin — related events scattered</li>
    <li>Parallel processing within partition breaking order</li>
  </ul>
</div>
`
},

"q33": {
  title: "Kafka Consumer Crash",
  html: `
<h2>What happens if a consumer crashes?</h2>
<p class="subtitle">Kafka · Consumer Failure · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>If a consumer crashes <strong>before committing offset</strong>, another consumer in the group <strong>rebalances</strong>, takes over partitions, and reprocesses from last committed offset — at-least-once delivery. Processing must be <strong>idempotent</strong>.</p>
</div>

<h3>How It Works Internally</h3>
<div class="steps-box">
  <h4>Failure Scenario</h4>
  <ol>
    <li>Consumer polls batch, processes message, crashes before commitSync.</li>
    <li>Heartbeat timeout → coordinator triggers rebalance.</li>
    <li>Partition reassigned to surviving consumer.</li>
    <li>New consumer reads from last committed offset — message reprocessed.</li>
  </ol>
</div>

<pre><code>@KafkaListener(topics = "payments")
public void consume(PaymentEvent event) {
    if (processedIds.add(event.getId())) { // idempotent dedup
        paymentService.apply(event);
    }
    // offset committed after successful listener (auto or manual)
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Uncommitted offsets mean redelivery after rebalance. Design idempotent handlers with business keys or dedup table. Tune session.timeout.ms and max.poll.interval.ms for processing time. Use manual commit after DB transaction commits for consistency.</div>

<h3>Detailed Interview Answer</h3>
<p>Transactional consume-process-produce: read_committed isolation. Store offset in same DB transaction as business write (exactly-once semantics pattern).</p>
<p>Long processing causes rebalance if poll interval exceeded — pause consumer or increase max.poll.interval.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Committing offset before side effects complete</li>
    <li>No idempotency on payment/credit handlers</li>
    <li>Ignoring rebalance storm during deploys</li>
  </ul>
</div>
`
},

"q34": {
  title: "Kafka Consumer Group",
  html: `
<h2>What is a Consumer Group?</h2>
<p class="subtitle">Kafka · Consumption Model · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Consumers sharing the same <code>group.id</code> cooperate: each partition is assigned to <strong>one consumer in the group</strong>. Add consumers to scale until consumers = partitions. Different groups independently read the same topic.</p>
</div>

<h3>How It Works Internally</h3>
<ul>
  <li>Group coordinator broker manages membership.</li>
  <li>Rebalance on consumer join/leave/crash.</li>
  <li>Range or cooperative-sticky assignors distribute partitions.</li>
  <li>Each group maintains its own offset per partition.</li>
</ul>

<pre><code>@KafkaListener(topics = "order-events", groupId = "shipping-service")
// 3 instances, 6 partitions → ~2 partitions each</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>A book club (consumer group) splits chapters (partitions) among members — each chapter read by one person. Another club (different group) can read the same book independently at their own pace.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Consumer group enables parallel consumption with one consumer per partition max. Scale consumers up to partition count. Rebalance redistributes on scaling events. Separate groups for shipping vs analytics on same topic. Static membership reduces rebalance churn in K8s.</div>

<h3>Detailed Interview Answer</h3>
<p>Plan partition count for peak parallelism — adding consumers beyond partitions wastes resources. Cooperative rebalance (Kafka 2.4+) reduces stop-the-world consumption pauses.</p>
<p>Same group.id on all instances of one microservice; never share group.id across different services.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>More consumers than partitions expecting linear scale</li>
    <li>Same groupId for unrelated services</li>
    <li>Frequent rolling deploys causing rebalance lag spikes</li>
  </ul>
</div>
`
},

"q35": {
  title: "Kafka Offset Management",
  html: `
<h2>How are Kafka offsets managed?</h2>
<p class="subtitle">Kafka · Offsets · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>An <strong>offset</strong> is the consumer&apos;s bookmark per partition. Committed offsets live in internal topic <code>__consumer_offsets</code> (or external store). On restart, consumer seeks to last committed offset + 1.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Auto commit:</strong> periodic background commit — simple but can lose messages on crash.</li>
  <li><strong>Manual commit:</strong> sync/async after successful processing.</li>
  <li><strong>seek():</strong> replay or skip for reprocessing jobs.</li>
  <li><strong>earliest vs latest:</strong> behavior when no offset exists.</li>
</ul>

<pre><code>@Bean
ConcurrentKafkaListenerContainerFactory&lt;String, Event&gt; factory() {
    factory.getContainerProperties().setAckMode(AckMode.MANUAL_IMMEDIATE);
    factory.setConsumerFactory(consumerFactory);
    return factory;
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Offsets track read position per group-partition. Auto-commit risks reprocess or skip on failure windows. Manual commit after business transaction is safer. Reset offsets with kafka-consumer-groups.sh for replays. Monitor consumer lag metric — distance from log end.</div>

<h3>Detailed Interview Answer</h3>
<p>Consumer lag = high watermark − current offset. Alert on growing lag. Exactly-once: transactional producer + consume-transform-produce in Kafka Streams or store offsets in DB with business data.</p>
<p>auto.offset.reset=earliest for new groups catching up; latest for real-time only.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Committing before DB transaction commits</li>
    <li>Resetting offsets in prod without understanding replay volume</li>
    <li>Ignoring consumer lag alerts until hours behind</li>
  </ul>
</div>
`
},

"q36": {
  title: "Prevent Duplicate Processing",
  html: `
<h2>How do you prevent duplicate message processing?</h2>
<p class="subtitle">Kafka · Idempotency · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Kafka delivers <strong>at-least-once</strong> by default. Prevent duplicate side effects with <strong>idempotent consumers</strong>: track processed message IDs, use natural business keys, or database unique constraints.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>Idempotent producer (enable.idempotence=true) — dedup broker-side retries.</li>
  <li>Consumer dedup table: INSERT processed_event_id with UNIQUE constraint.</li>
  <li>Business idempotency: PaymentId as primary key.</li>
  <li>Transactional outbox + single consumer per key for ordering.</li>
</ul>

<pre><code>@Transactional
public void handle(OrderEvent event) {
    if (processedEventRepository.existsById(event.getEventId())) return;
    orderService.apply(event);
    processedEventRepository.save(new ProcessedEvent(event.getEventId()));
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Assume duplicates will arrive. Store eventId in dedup table with unique index before applying side effects. Use idempotent producer for write retries. Design operations as upserts or state checks (only transition PENDING→PAID once). Exactly-once end-to-end is hard — aim for effective-once via idempotency.</div>

<h3>Detailed Interview Answer</h3>
<p>Compare dedup window in Redis (TTL) vs permanent DB table. Kafka Streamsrocksdb dedup with TTL for windowed joins.</p>
<p>Payment example: idempotency-key header stored with unique constraint — replay returns same receipt.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Relying on exactly-once without understanding failure windows</li>
    <li>Check-then-act race without unique constraint</li>
    <li>Dedup only in memory — lost on restart</li>
  </ul>
</div>
`
},

"q37": {
  title: "Kafka Performance Tuning",
  html: `
<h2>How do you improve Kafka performance?</h2>
<p class="subtitle">Kafka · Tuning · 2026</p>
<span class="tag tag-red">Kafka</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Tune <strong>batching</strong>, <strong>compression</strong>, <strong>partition count</strong>, and <strong>consumer parallelism</strong>. Producers batch records; consumers fetch in batches; brokers use sequential disk I/O — right-sizing matters more than raw CPU.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>Producer: linger.ms, batch.size, compression.type=lz4/zstd.</li>
  <li>Consumer: fetch.min.bytes, max.poll.records.</li>
  <li>Brokers: num.network.threads, log.segment.bytes, adequate disk IO.</li>
  <li>Partitions: enough for target throughput, not thousands per topic blindly.</li>
</ul>

<pre><code>spring.kafka.producer.batch-size=32768
spring.kafka.producer.linger-ms=10
spring.kafka.producer.compression-type=lz4
spring.kafka.listener.concurrency=6</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Shipping packages: sending one envelope per truck is wasteful. Batch boxes on pallets (batching), compress soft goods (compression), and run enough trucks (partitions) for highway capacity.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Increase partitions to match consumer parallelism needed. Enable producer batching and compression. Right-size fetch and poll settings. Monitor broker disk, network, under-replicated partitions, and consumer lag. Avoid oversized messages — use claim check pattern with S3 for blobs.</div>

<h3>Detailed Interview Answer</h3>
<p>Benchmark with realistic message size. Too many partitions increases broker metadata overhead and rebalance cost. SSD/NVMe disks critical for retention-heavy topics.</p>
<p>Spring Kafka concurrency should align with partition count per listener container.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Single partition bottleneck on hot topic</li>
    <li>Giant JSON payloads without compression or external storage</li>
    <li>Consumer concurrency higher than partitions (idle threads)</li>
  </ul>
</div>
`
},

"q38": {
  title: "Second Highest Salary SQL",
  html: `
<h2>Write a query to find the second highest salary</h2>
<p class="subtitle">SQL · Classic Query · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Find the maximum salary that is still less than the overall maximum — or rank salaries and pick rank 2. Handle duplicates: &quot;second highest&quot; usually means <strong>second distinct</strong> salary value.</p>
</div>

<h3>Key Concepts</h3>
<p>Multiple valid approaches — interviewers want clarity on duplicates and NULL handling.</p>

<pre><code>-- DISTINCT + subquery (portable)
SELECT MAX(salary) AS second_highest
FROM employee
WHERE salary &lt; (SELECT MAX(salary) FROM employee);

-- Window function (modern, clear intent)
SELECT DISTINCT salary AS second_highest
FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
    FROM employee
) ranked
WHERE rk = 2;

-- OFFSET (if exactly one row at second rank with DENSE_RANK)
SELECT salary FROM employee
ORDER BY salary DESC
OFFSET 1 LIMIT 1; -- fragile with duplicates</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Second tallest person in a room — if two people tie for first height, second place is the next shorter height, not another person at first-place height (use DENSE_RANK vs ROW_NUMBER).</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Use MAX where salary less than (SELECT MAX(salary)) for second distinct value, or DENSE_RANK() OVER (ORDER BY salary DESC) = 2 for clarity with ties. Ask interviewer about duplicate salaries. Index on salary helps large tables.</div>

<h3>Detailed Interview Answer</h3>
<p>Clarify requirements: second distinct vs second row. ROW_NUMBER gives one employee; DENSE_RANK gives salary level. Nth highest generalizes to rank = N.</p>
<p>Performance: index on salary DESC; avoid sorting full table repeatedly in loops.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>OFFSET 1 LIMIT 1 without handling duplicate top salaries</li>
    <li>Not clarifying distinct vs any second row</li>
    <li>Nested correlated subqueries on unindexed column</li>
  </ul>
</div>
`
},

"q39": {
  title: "Optimize Slow SQL Query",
  html: `
<h2>How would you optimize a slow SQL query?</h2>
<p class="subtitle">SQL · Performance · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Run <strong>EXPLAIN</strong>, find the expensive step (full table scan, bad join, sort), then fix with indexes, query rewrite, statistics update, or schema change. Measure before and after with real data volume.</p>
</div>

<h3>Key Concepts</h3>
<div class="steps-box">
  <h4>Optimization Steps</h4>
  <ol>
    <li>EXPLAIN ANALYZE — actual rows, seq scan vs index scan.</li>
    <li>Check missing indexes on WHERE/JOIN columns.</li>
    <li>Avoid SELECT *; reduce returned columns.</li>
    <li>Fix N+1 in app or use JOIN/batch fetch.</li>
    <li>Update statistics; consider partial/covering indexes.</li>
    <li>Partition large tables; archive cold data.</li>
  </ol>
</div>

<pre><code>EXPLAIN ANALYZE
SELECT o.id, c.name
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'PENDING'
  AND o.created_at &gt; NOW() - INTERVAL '7 days';

CREATE INDEX idx_orders_status_created ON orders(status, created_at);</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> EXPLAIN the query on production-scale data. Add composite indexes matching filter and join columns. Eliminate functions on indexed columns in WHERE. Reduce rows early with selective predicates. Cache read-heavy aggregates. Verify plan change with ANALYZE and latency metrics.</div>

<h3>Detailed Interview Answer</h3>
<p>Covering index includes all SELECT columns — index-only scan. Watch cardinality — low-selectivity indexes useless. OR conditions may need UNION rewrite.</p>
<p>ORM-generated SQL — enable SQL logging, tune fetch joins vs lazy loading.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Indexing every column without analyzing queries</li>
    <li>Optimizing in dev with 100 rows — plan differs at scale</li>
    <li>Hinting force index without measuring</li>
  </ul>
</div>
`
},

"q40": {
  title: "Clustered vs Non-Clustered Index",
  html: `
<h2>Explain Clustered vs Non-Clustered Index</h2>
<p class="subtitle">SQL · Indexing · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Clustered index</strong> determines physical row order (one per table in SQL Server — usually PK). <strong>Non-clustered index</strong> is separate structure with key + pointer to row — many allowed, like a book index at the back.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Clustered:</strong> leaf pages store actual row data; range scans efficient on key.</li>
  <li><strong>Non-clustered:</strong> leaf stores index key + row locator (RID or clustered key).</li>
  <li><strong>PostgreSQL/MySQL InnoDB:</strong> PK is clustered; secondary indexes point to PK.</li>
  <li>Covering non-clustered index includes all queried columns — avoids lookup.</li>
</ul>

<pre><code>-- SQL Server example
CREATE CLUSTERED INDEX CX_orders_created ON orders(created_at);
CREATE NONCLUSTERED INDEX IX_orders_customer ON orders(customer_id)
    INCLUDE (total_amount, status);</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Clustered index sorts table data physically — one per table in SQL Server. Non-clustered is auxiliary lookup structure — many per table. Secondary indexes in InnoDB reference primary key. Choose clustered key on common range scan column; add non-clustered for filter/join columns.</div>

<h3>Detailed Interview Answer</h3>
<p>Tradeoffs: random GUID clustered key causes fragmentation — use sequential ID. Heap tables (no clustered) in SQL Server use RID lookups costly with many NC indexes.</p>
<p>Interview on MySQL: InnoDB always clusters on PK; understanding helps explain secondary index double lookup.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Multiple clustered indexes on SQL Server (impossible)</li>
    <li>Wide clustered key bloating all secondary indexes</li>
    <li>Confusing unique constraint with clustered index automatically</li>
  </ul>
</div>
`
},

"q41": {
  title: "ACID Properties",
  html: `
<h2>What are ACID properties?</h2>
<p class="subtitle">SQL · Transactions · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>ACID guarantees reliable transactions: <strong>Atomicity</strong> (all or nothing), <strong>Consistency</strong> (valid state), <strong>Isolation</strong> (concurrent txs don&apos;t interfere), <strong>Durability</strong> (committed survives crash).</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Atomicity:</strong> rollback on failure — WAL undo logs.</li>
  <li><strong>Consistency:</strong> constraints, triggers enforced — app + DB rules.</li>
  <li><strong>Isolation:</strong> controlled visibility — isolation levels.</li>
  <li><strong>Durability:</strong> commit persists to disk — redo logs, fsync.</li>
</ul>

<pre><code>@Transactional
public void transfer(Long from, Long to, BigDecimal amount) {
    accountRepo.debit(from, amount);
    accountRepo.credit(to, amount);
    // rollback on RuntimeException — atomicity
}</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Bank transfer: money leaves A and arrives at B together (atomic), balances stay non-negative (consistent), your transfer doesn&apos;t mix with another teller&apos;s mid-flight (isolated), and survives power outage after receipt prints (durable).</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> ACID — Atomicity all-or-nothing via rollback; Consistency preserves invariants; Isolation levels control concurrent visibility; Durability via write-ahead log after commit. Spring @Transactional maps to DB transaction with default isolation per database.</div>

<h3>Detailed Interview Answer</h3>
<p>Consistency is often misunderstood — DB enforces constraints but business rules span services. Distributed ACID (2PC) rare in microservices; local ACID per service + sagas globally.</p>
<p>Durability vs performance: async replication may weaken durability guarantees in some cloud DB configs.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Expecting ACID across microservice databases</li>
    <li>@Transactional on private method (proxy bypass)</li>
    <li>Confusing consistency with CAP theorem consistency</li>
  </ul>
</div>
`
},

"q42": {
  title: "Database Isolation Levels",
  html: `
<h2>What are database isolation levels?</h2>
<p class="subtitle">SQL · Concurrency · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Isolation levels trade <strong>consistency</strong> for <strong>concurrency</strong>. From weakest to strongest: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE. Higher levels prevent more anomalies but may lock more.</p>
</div>

<h3>Key Concepts</h3>
<table>
  <tr><th>Level</th><th>Dirty Read</th><th>Non-Repeatable</th><th>Phantom</th></tr>
  <tr><td>READ UNCOMMITTED</td><td>Possible</td><td>Possible</td><td>Possible</td></tr>
  <tr><td>READ COMMITTED</td><td>No</td><td>Possible</td><td>Possible</td></tr>
  <tr><td>REPEATABLE READ</td><td>No</td><td>No</td><td>Varies</td></tr>
  <tr><td>SERIALIZABLE</td><td>No</td><td>No</td><td>No</td></tr>
</table>

<pre><code>@Transactional(isolation = Isolation.REPEATABLE_READ)
public BigDecimal getBalance(Long accountId) {
    return accountRepository.findBalance(accountId);
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Isolation levels define what one transaction sees from others. Default READ COMMITTED in PostgreSQL/Oracle; REPEATABLE READ in MySQL InnoDB. Dirty read = uncommitted data; non-repeatable = row changes on re-read; phantom = new rows appear. Use SERIALIZABLE only when necessary — performance cost.</div>

<h3>Detailed Interview Answer</h3>
<p>MVCC in PostgreSQL gives snapshot isolation at READ COMMITTED — each statement sees snapshot. Phantom reads handled differently per engine.</p>
<p>Optimistic locking (@Version) alternative to SERIALIZABLE for concurrent updates — detect conflict at commit.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Defaulting to SERIALIZABLE everywhere</li>
    <li>Not knowing database default isolation</li>
    <li>Long transactions under REPEATABLE READ holding locks</li>
  </ul>
</div>
`
},

"q43": {
  title: "Identify and Resolve Deadlocks",
  html: `
<h2>How do you identify and resolve deadlocks?</h2>
<p class="subtitle">SQL · Locking · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Deadlock: Tx A holds lock 1 waits for 2, Tx B holds 2 waits for 1. DB <strong>detects cycle</strong> and aborts one victim. Fix by consistent lock ordering, shorter transactions, indexes reducing lock scope, retries.</p>
</div>

<h3>Key Concepts</h3>
<div class="steps-box">
  <h4>Investigation Steps</h4>
  <ol>
    <li>Check DB deadlock graphs / error logs (SQL Server, PostgreSQL log).</li>
    <li>Identify tables and lock order in conflicting queries.</li>
    <li>Reproduce with concurrent load test.</li>
    <li>Align update order across services (always lock parent then child).</li>
    <li>Add retry on deadlock SQLState 40001.</li>
  </ol>
</div>

<pre><code>-- Always update accounts in ascending id order
Long first = Math.min(fromId, toId);
Long second = Math.max(fromId, toId);
lockAccount(first);
lockAccount(second);</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Deadlocks are circular lock waits — DB kills one transaction. Find via deadlock reports and slow query logs. Resolve with consistent resource access order, smaller transactions, proper indexes, lower isolation where safe. Application retry with backoff on transient deadlock exception.</div>

<h3>Detailed Interview Answer</h3>
<p>Example: transfer A→B and B→A concurrently without ordering. Gap locks in InnoDB on range scans cause surprise deadlocks — explain with example.</p>
<p>Monitoring: track deadlock rate metric; alert on spikes after release.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Infinite retry without backoff on persistent logic bug</li>
    <li>Long transactions holding locks during external HTTP calls</li>
    <li>Table-level locks from missing indexes</li>
  </ul>
</div>
`
},

"q44": {
  title: "SQL Window Functions",
  html: `
<h2>Explain window functions with an example</h2>
<p class="subtitle">SQL · Analytics · 2026</p>
<span class="tag tag-blue">SQL</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Window functions compute across a <strong>set of rows related to current row</strong> without collapsing groups like GROUP BY. Define window with PARTITION BY, ORDER BY, and frame (ROWS/RANGE BETWEEN).</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>ROW_NUMBER:</strong> unique rank per row.</li>
  <li><strong>RANK / DENSE_RANK:</strong> handle ties differently.</li>
  <li><strong>LAG / LEAD:</strong> previous/next row values.</li>
  <li><strong>SUM() OVER:</strong> running totals.</li>
</ul>

<pre><code>-- Top 3 salaries per department
SELECT emp_name, dept, salary
FROM (
    SELECT emp_name, dept, salary,
           ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
    FROM employee
) t
WHERE rn &lt;= 3;

-- Running total per customer
SELECT order_id, customer_id, amount,
       SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total
FROM orders;</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>GROUP BY collapses a stack of cards into one pile. Window functions let you see each card while also showing &quot;your rank in the deck&quot; or &quot;running sum of values below you&quot; without hiding individual cards.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Window functions use OVER (PARTITION BY ... ORDER BY ...) to calculate rank, running sums, or neighbors per row. Unlike GROUP BY, rows stay visible. Common: ROW_NUMBER for top-N per group, LAG for period-over-period comparison. Efficient with partition-aligned indexes.</div>

<h3>Detailed Interview Answer</h3>
<p>Top-N per group is classic interview — correlate subquery vs window — window clearer. Frame clause: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for running aggregate.</p>
<p>Performance: sort cost on partition; limit columns in subquery before window if possible.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Filtering window alias in WHERE instead of subquery/QUALIFY</li>
    <li>Confusing RANK vs ROW_NUMBER with ties</li>
    <li>Missing ORDER BY in window — nondeterministic results</li>
  </ul>
</div>
`
},

"q45": {
  title: "Current Project Architecture",
  html: `
<h2>Explain your current project architecture</h2>
<p class="subtitle">Scenario-Based · Architecture · 2026</p>
<span class="tag tag-red">Scenario-Based</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Describe a <strong>layered story</strong>: client apps → API Gateway → microservices (names + responsibilities) → databases/cache/Kafka → observability. Tie each choice to a business or scale requirement.</p>
</div>

<h3>Key Concepts</h3>
<div class="steps-box">
  <h4>Structure Your Answer</h4>
  <ol>
    <li><strong>Context:</strong> domain (e.g., telecom billing, e-commerce).</li>
    <li><strong>High-level diagram:</strong> gateway, 4–6 services, data stores.</li>
    <li><strong>Sync vs async paths</strong> with concrete examples.</li>
    <li><strong>Cross-cutting:</strong> auth, logging, CI/CD, K8s.</li>
    <li><strong>Your role:</strong> services you owned and decisions you made.</li>
  </ol>
</div>

<pre><code>// Example stack narrative
Mobile/Web → API Gateway (JWT) → Order / Payment / Inventory services
                              → Kafka (domain events)
                              → PostgreSQL per service + Redis cache
                              → Prometheus + Grafana + Jaeger</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>Explain architecture like a city map: highways (gateway), districts (services), utilities (Kafka, DB), and traffic cameras (monitoring) — not every building brick, but how the city functions.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> I work on [domain] using Spring Boot microservices behind an API Gateway. [Service A] handles orders, [B] payments — we communicate via REST for sync checkout and Kafka for async notifications. Each service has its own PostgreSQL; Redis caches catalog reads. Deployed on Kubernetes with JWT auth, Resilience4j, and full observability stack.</div>

<h3>Detailed Interview Answer</h3>
<p>Customize with your real project — interviewers detect templates. Mention one tradeoff you lived: e.g., chose saga over 2PC for order cancel. Quantify scale: requests/day, topics, pod count.</p>
<p>Draw on whiteboard: north-south vs east-west traffic, where auth terminates, where data ownership boundaries lie.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Buzzword soup without your personal contribution</li>
    <li>No data flow for one concrete user action</li>
    <li>Claiming microservices without explaining service boundaries</li>
  </ul>
</div>
`
},

"q46": {
  title: "Production Issue Resolved",
  html: `
<h2>Describe a production issue you resolved</h2>
<p class="subtitle">Scenario-Based · Incident Response · 2026</p>
<span class="tag tag-red">Scenario-Based</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Use <strong>STAR</strong>: Situation (symptom), Task (your role), Action (investigation + fix), Result (metrics improved). Show structured debugging, communication, and prevention — not heroics.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li>Symptom: p99 latency, error rate, customer tickets.</li>
  <li>Timeline: correlate with deploy, traffic, dependency outage.</li>
  <li>Evidence: traces, slow queries, thread dumps.</li>
  <li>Fix: immediate mitigation + long-term root cause.</li>
  <li>Follow-up: postmortem, alerts, runbook.</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> Example: checkout p99 jumped 200ms to 8s after release. I traced to N+1 query in OrderService — 200 SQL calls per request. Rolled back, added @EntityGraph fix, verified with load test — p99 back to 180ms. Added integration test and SQL query count assertion in CI to prevent regression.</div>

<h3>Detailed Interview Answer</h3>
<p>Pick a real incident with numbers. Walk through: detected via alert → assembled war room → narrowed with Jaeger → found connection pool wait not CPU → missing index on status column added in migration without index.</p>
<p>Emphasize blameless postmortem and action items: synthetic monitor, dashboard, documentation.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Vague story without metrics or root cause</li>
    <li>Only describing restart without investigation</li>
    <li>Taking sole credit for team effort awkwardly</li>
  </ul>
</div>
`
},

"q47": {
  title: "Debug Memory Leak",
  html: `
<h2>How do you debug a memory leak?</h2>
<p class="subtitle">Scenario-Based · JVM Debugging · 2026</p>
<span class="tag tag-red">Scenario-Based</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Memory leak = objects no longer needed but still referenced (GC roots reachable). Heap grows, GC more frequent, eventual OOM. Capture <strong>heap dumps</strong> at different times, compare dominators, find growing collections.</p>
</div>

<h3>Key Concepts</h3>
<div class="steps-box">
  <h4>Investigation Steps</h4>
  <ol>
    <li>Confirm leak: heap used after GC climbs over hours/days.</li>
    <li>Enable GC logs / monitor heap in Grafana.</li>
    <li>Capture heap dump: jcmd, Actuator /heapdump, Eclipse MAT.</li>
    <li>Compare histograms — which class count grows?</li>
    <li>Find GC root path — static map, cache, ThreadLocal, listener.</li>
    <li>Fix and verify heap plateaus under soak test.</li>
  </ol>
</div>

<pre><code># Capture heap dump
jcmd &lt;pid&gt; GC.heap_dump /tmp/heap.hprof

# Spring Boot Actuator (secure in prod)
GET /actuator/heapdump</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>A closet that never gets cleaned — clothes (objects) you forgot you owned (references) pile up. Heap dump is inventory; dominator tree shows which box holds the most forgotten clothes.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Watch heap after full GC trending up. Take two heap dumps hours apart, compare top object counts in MAT. Trace GC roots to culprits — unbounded caches, static lists, ThreadLocals not cleared, listeners not removed. Fix retention, add cache bounds, verify with load soak. Common in long-lived Spring apps with growing in-memory maps.</div>

<h3>Detailed Interview Answer</h3>
<p>Distinguish leak vs needed heap growth (legitimate cache warming). Metaspace leaks from classloader reload in hot deploy scenarios.</p>
<p>Tools: async-profiler alloc profile, JFR, VisualVM. Production: capture from one pod without killing fleet.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Increasing -Xmx forever instead of fixing leak</li>
    <li>Analyzing heap dump from JVM already OOM-killed too late</li>
    <li>Clearing ThreadLocal ignored in thread pool apps</li>
  </ul>
</div>
`
},

"q48": {
  title: "High CPU in Production",
  html: `
<h2>How do you investigate high CPU usage in production?</h2>
<p class="subtitle">Scenario-Based · Performance Debugging · 2026</p>
<span class="tag tag-red">Scenario-Based</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>High CPU means threads doing heavy work — tight loops, regex catastrophes, excessive GC, crypto, or JSON serialization. Take <strong>thread dumps</strong> repeatedly, find hot stacks; use <strong>profiler</strong> for method-level CPU share.</p>
</div>

<h3>Key Concepts</h3>
<div class="steps-box">
  <h4>Investigation Steps</h4>
  <ol>
    <li>Confirm which pods/hosts — all or subset?</li>
    <li>Check CPU vs load vs latency — CPU high but idle threads suggests GC.</li>
    <li>3–5 thread dumps 10s apart — recurring runnable stacks.</li>
    <li>async-profiler CPU flame graph on affected pod.</li>
    <li>Correlate with traffic pattern, deploy, batch job cron.</li>
    <li>Mitigate: scale, throttle, disable feature flag.</li>
  </ol>
</div>

<pre><code># Thread dump
jcmd &lt;pid&gt; Thread.print &gt; threads.txt

# async-profiler (example)
asprof -d 60 -f cpu.html &lt;pid&gt;</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Identify hot JVM threads with repeated thread dumps — look for RUNNABLE stacks on same method. Profile with async-profiler for flame graph. Common causes: infinite retry loop, inefficient serialization, missing DB index causing CPU burn in app processing, or GC thrashing from heap too small. Compare with traffic and recent releases.</div>

<h3>Detailed Interview Answer</h3>
<p>GC CPU: check GC logs — if time in GC &gt; 10%, tune heap or fix allocation rate. Compare user vs system CPU — crypto libraries spike system.</p>
<p>Kubernetes: CPU limit throttling shows as high latency not always 100% CPU metric — check cfs throttling.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Single thread dump conclusion</li>
    <li>Scaling pods without fixing O(n²) algorithm</li>
    <li>Ignoring CPU throttling from K8s limits</li>
  </ul>
</div>
`
},

"q49": {
  title: "End-to-End API Developed",
  html: `
<h2>Explain one end-to-end API you developed</h2>
<p class="subtitle">Scenario-Based · API Delivery · 2026</p>
<span class="tag tag-red">Scenario-Based</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Walk the full lifecycle: <strong>requirement</strong> → design (contract, DB) → implementation (controller, service, repo) → validation/security → tests → deployment → monitoring. Use one concrete endpoint like POST /orders.</p>
</div>

<h3>Key Concepts</h3>
<div class="steps-box">
  <h4>End-to-End Flow Example: Create Order</h4>
  <ol>
    <li>Client POST /api/v1/orders with JWT and idempotency-key header.</li>
    <li>Gateway validates token, routes to Order Service.</li>
    <li>Controller validates DTO, calls OrderService @Transactional.</li>
    <li>Service checks inventory via Feign, saves order, writes outbox event.</li>
    <li>Outbox relay publishes OrderPlaced to Kafka.</li>
    <li>Returns 201 with Location header; metrics and trace span recorded.</li>
  </ol>
</div>

<pre><code>@PostMapping("/orders")
@ResponseStatus(HttpStatus.CREATED)
public OrderResponse create(@Valid @RequestBody CreateOrderRequest req,
                            @RequestHeader("Idempotency-Key") String key) {
    return orderService.createOrder(req, key);
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> I built POST /orders: OpenAPI contract first, JPA entity and migration, service with inventory Feign call, transactional outbox to Kafka, global exception handler, JWT security, integration tests with Testcontainers, CI pipeline, Prometheus metrics on success/failure. Idempotency-key prevents duplicate orders on client retry.</div>

<h3>Detailed Interview Answer</h3>
<p>Show design decisions: why async notification via Kafka vs sync email. Discuss error paths: inventory 409 → 422 to client with clear code. Testing pyramid: unit service tests, MockMvc controller, Testcontainers PostgreSQL + Kafka integration.</p>
<p>Operational readiness: dashboard for order create rate, alert on error ratio, runbook for inventory dependency down.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Only describing happy path</li>
    <li>No mention of testing or observability</li>
    <li>Vague &quot;I used Spring&quot; without your design choices</li>
  </ul>
</div>
`
},

"q50": {
  title: "Handle 10x Traffic Spike",
  html: `
<h2>If your application suddenly receives 10x traffic, how would you handle it?</h2>
<p class="subtitle">Scenario-Based · Scale &amp; Resilience · 2026</p>
<span class="tag tag-red">Scenario-Based</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Survive first (scale, cache, shed load), then optimize bottlenecks. Assume stateless app tier scales horizontally; protect database and dependencies with pools, queues, and rate limits.</p>
</div>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Immediate:</strong> HPA scale pods, enable CDN/cache, rate limit at gateway.</li>
  <li><strong>Protect DB:</strong> connection pool limits, read replicas, cache hot reads.</li>
  <li><strong>Async:</strong> queue non-critical work (emails, reports).</li>
  <li><strong>Degrade:</strong> disable non-essential features via feature flags.</li>
  <li><strong>Plan ahead:</strong> load tests, capacity model, multi-AZ.</li>
</ul>

<pre><code># Kubernetes HPA example
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 3
  maxReplicas: 30
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70</code></pre>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p>A restaurant flash mob: open extra registers (scale pods), serve a limited menu (degrade), take reservations for desserts later (async), and put a bouncer at the door (rate limit) so the kitchen (database) doesn&apos;t collapse.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Short term: auto-scale app pods, turn up caching, rate limit at gateway, shed non-critical features. Protect database with pool sizing and read replicas — scaling app 10x without DB capacity makes it worse. Queue async work to Kafka. Long term: load test for 10x, HPA/KEDA policies, CDN for static assets, circuit breakers on dependencies, capacity runbooks.</div>

<h3>Detailed Interview Answer</h3>
<p>Structured response: detect (traffic alert) → mitigate (scale + cache) → identify bottleneck (often DB or downstream) → fix (query index, partition Kafka) → post-incident capacity planning.</p>
<p>Mention cost controls — max replicas cap, scheduled scaling before known events (sales). Virtual threads help IO-bound services absorb more concurrent requests per pod.</p>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Scaling only application tier — DB becomes bottleneck</li>
    <li>No rate limiting — thundering herd kills shared dependencies</li>
    <li>Never load testing until real 10x event</li>
  </ul>
</div>
`
}

};
