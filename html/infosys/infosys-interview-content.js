const TOPICS = {

"overview": {
  title: "Plan Overview",
  html: `
<h2>8-Day Infosys Interview Preparation Plan</h2>
<p class="subtitle">Java Spring Microservices Developer · Interview: July 18, 2026 · 4 Years Experience</p>

<span class="tag tag-blue">Infosys</span>
<span class="tag tag-green">Java 8/11/17</span>
<span class="tag tag-yellow">Spring Boot</span>
<span class="tag tag-red">Microservices</span>

<h3>Your Timeline</h3>
<table>
  <tr><th>Day</th><th>Date</th><th>Focus</th></tr>
  <tr><td>Day 1</td><td>July 9</td><td>Java Core — JVM, Collections, Concurrency</td></tr>
  <tr><td>Day 2</td><td>July 10</td><td>Java Streams, CompletableFuture, Modern Java</td></tr>
  <tr><td>Day 3</td><td>July 11</td><td>Spring Boot Internals, IoC, AOP</td></tr>
  <tr><td>Day 4</td><td>July 12</td><td>Spring Data JPA, Hibernate, Transactions</td></tr>
  <tr><td>Day 5</td><td>July 13</td><td>Microservices Communication &amp; Resilience</td></tr>
  <tr><td>Day 6</td><td>July 14</td><td>Security, Design Patterns, Cloud-Native</td></tr>
  <tr><td>Day 7</td><td>July 15</td><td>Database Optimization &amp; Project Review</td></tr>
  <tr><td>Day 8</td><td>July 16</td><td>Mock Interview &amp; Behavioral (STAR)</td></tr>
  <tr><td>Buffer</td><td>July 17</td><td>Light revision only — rest well</td></tr>
  <tr><td>Interview</td><td>July 18</td><td>Infosys technical + HR rounds</td></tr>
</table>

<h3>Actual Infosys Round Structure (3 Rounds)</h3>
<p>Based on real candidate experience for Java Backend Developer (3–5 years). Infosys runs <strong>2 Technical + 1 HR</strong> — not 4 rounds.</p>

<div class="card-grid">
  <div class="card"><h4>Round 1 — Technical (Base Knowledge)</h4><p>Java 8 (Streams, Lambda, Optional), HashMap/HashSet internals, Spring Boot vs Spring MVC, common annotations, Hibernate relationships if you mention ORM.</p></div>
  <div class="card"><h4>Round 2 — Technical (Manager)</h4><p>Project experience, how you think, how you approach problems. Analysis and problem-solving skills — not more coding.</p></div>
  <div class="card"><h4>Round 3 — HR</h4><p>CTC discussion based on experience level. Package is largely experience-band driven at Infosys.</p></div>
</div>

<p style="margin-top:16px;">See the full breakdown with expected questions in the sidebar: <strong>Real Infosys Interview Experience</strong>.</p>

<h3>What Infosys Tests at 4 Years (Priority Order)</h3>
<table>
  <tr><th>Priority</th><th>Round 1 Must-Know</th><th>Round 2 Must-Know</th></tr>
  <tr><td>🔴 Highest</td><td>Java 8: Streams, Lambda, Functional Interfaces, Optional, Method References</td><td>Project walkthrough — your role, architecture, challenges</td></tr>
  <tr><td>🔴 Highest</td><td>HashMap &amp; HashSet internal working</td><td>How you approach a problem step-by-step</td></tr>
  <tr><td>🟡 High</td><td>Spring Boot vs Spring MVC — differences, pros/cons</td><td>Real bugs/issues you fixed in production</td></tr>
  <tr><td>🟡 High</td><td>@SpringBootApplication, @Autowired, @RestController, @PathVariable, @RequestParam, @Service, @Repository</td><td>Why you chose your tech stack</td></tr>
  <tr><td>🟢 If on resume</td><td>Hibernate: @OneToMany, @ManyToOne, @ManyToMany, cascade, fetch types</td><td>What you'd improve in your project</td></tr>
</table>

<h3>Study Resources</h3>
<ul>
  <li><strong>Coding:</strong> LeetCode — Arrays, HashMap, Trees, Heaps (Medium focus)</li>
  <li><strong>Spring:</strong> Official Spring Boot docs, Baeldung (AOP, Transactions, JPA)</li>
  <li><strong>Microservices:</strong> <em>Microservices Patterns</em> by Chris Richardson (Saga, CQRS chapters)</li>
  <li><strong>System Design:</strong> Your <code>system-design-interview.html</code> guide in this project</li>
  <li><strong>Hands-on:</strong> Your Spring Boot <code>demo</code> project — explain every layer live</li>
</ul>
`
},

"infosys-rounds": {
  title: "Real Infosys Interview Experience",
  html: `
<h2>Real Infosys Interview Experience</h2>
<p class="subtitle">Java Backend Developer · 3–5 Years · Source: GeeksforGeeks (Oct 2024) · Adapted for your prep</p>

<div class="simple-box">
  <h4>Bottom Line</h4>
  <p>Infosys Java Backend interviews have <strong>3 rounds only</strong>: Technical 1 (Java + Spring basics) → Technical 2 (Manager — projects &amp; approach) → HR (CTC). Round 1 is heavily Java 8 focused. Round 2 is NOT more coding — it's about how you think and what you've built.</p>
</div>

<h3>Round 1 — Technical (Base Knowledge Test)</h3>
<p>This round checks whether your fundamentals are solid. Expect theory + maybe a small coding question, not hard LeetCode.</p>

<div class="steps-box">
  <h4>Part A: Java 8 (Mandatory — Most Questions Here)</h4>
  <p>Java 8 was a major release. Infosys interviewers treat it as the baseline for backend developers.</p>
  <ol>
    <li><strong>Lambda Expressions</strong> — syntax, where used, difference from anonymous inner class</li>
    <li><strong>Functional Interfaces</strong> — @FunctionalInterface, Predicate, Function, Consumer, Supplier</li>
    <li><strong>Method References</strong> — Class::method, instance::method, Class::new</li>
    <li><strong>Streams API</strong> — filter, map, flatMap, collect, intermediate vs terminal ops</li>
    <li><strong>Optional</strong> — orElse vs orElseGet, when to use, anti-patterns</li>
    <li><strong>Date/Time API</strong> — LocalDate, LocalDateTime, ZonedDateTime vs old Date/Calendar</li>
  </ol>
</div>

<div class="steps-box">
  <h4>Part B: Data Structures (Internal Working)</h4>
  <ol>
    <li><strong>HashMap</strong> — bucketing, hashCode, collision handling, load factor, thread safety</li>
    <li><strong>HashSet</strong> — how it uses HashMap internally (dummy value), uniqueness guarantee</li>
    <li><strong>equals() and hashCode()</strong> — contract and why it matters</li>
  </ol>
</div>

<div class="steps-box">
  <h4>Part C: Spring Boot (Framework)</h4>
  <ol>
    <li><strong>Spring Boot vs Spring MVC</strong> — clear difference (see dedicated section in Day 3)</li>
    <li><strong>Common annotations</strong> — know what each does and when to use it</li>
    <li><strong>Hibernate/JPA relationships</strong> — only if you mention ORM on resume</li>
  </ol>
</div>

<h3>Round 2 — Technical (Manager Round)</h3>

<div class="simple-box">
  <h4>What This Round Is Really About</h4>
  <p>A manager or senior person evaluates <strong>how you think</strong>, not whether you can reverse a linked list. They want to see if you can work on real projects.</p>
</div>

<div class="steps-box">
  <h4>What to Prepare</h4>
  <ol>
    <li><strong>Project explanation:</strong> What the system does, your exact role, tech stack, team size</li>
    <li><strong>Problem-solving approach:</strong> "If API is slow, what steps would you take?" — think aloud, step by step</li>
    <li><strong>Challenges faced:</strong> 2–3 real problems you solved (performance bug, integration issue, production outage)</li>
    <li><strong>Design thinking:</strong> "How would you design a simple REST API for employee management?" — keep it practical, not over-engineered</li>
    <li><strong>Scenario questions:</strong> "Customer reports data mismatch — how do you debug?"</li>
  </ol>
</div>

<div class="analogy-box">
  <h4>Round 1 vs Round 2 — Simple Difference</h4>
  <p><strong>Round 1:</strong> "What is @Autowired?" (tests knowledge)</p>
  <p><strong>Round 2:</strong> "Walk me through how you built the login API in your project and what you'd do if it started failing in production." (tests experience + thinking)</p>
</div>

<h3>Round 3 — HR Round</h3>
<ul>
  <li>Primarily <strong>CTC / salary discussion</strong> based on your experience band (3–5 years)</li>
  <li>Infosys packages are largely <strong>experience-level driven</strong> — skill may cause slight variation but band matters most</li>
  <li>Also expect: notice period, joining date, relocation willingness, basic background verification questions</li>
  <li>Prepare: current CTC breakdown (fixed + variable), expected CTC range, reason for leaving (positive framing)</li>
</ul>

<h3>Round 1 — Expected Questions Checklist</h3>
<table>
  <tr><th>Topic</th><th>Likely Questions</th></tr>
  <tr><td>Lambda</td><td>What is lambda? Difference from anonymous class? Write a lambda to filter a list.</td></tr>
  <tr><td>Functional Interface</td><td>What is @FunctionalInterface? Name built-in ones (Predicate, Function).</td></tr>
  <tr><td>Streams</td><td>Intermediate vs terminal ops? map vs flatMap? Collect list to Map?</td></tr>
  <tr><td>Optional</td><td>orElse vs orElseGet? When NOT to use Optional?</td></tr>
  <tr><td>HashMap</td><td>Internal working? What happens on collision? HashMap vs ConcurrentHashMap?</td></tr>
  <tr><td>HashSet</td><td>How does it ensure uniqueness? Internal implementation?</td></tr>
  <tr><td>Spring Boot vs MVC</td><td>Difference? Why Boot over MVC? Advantages/disadvantages?</td></tr>
  <tr><td>Annotations</td><td>@RestController vs @Controller? @PathVariable vs @RequestParam?</td></tr>
  <tr><td>Hibernate</td><td>@OneToMany vs @ManyToOne? Cascade types? Lazy vs Eager?</td></tr>
</table>

<h3>Round 2 — Expected Questions Checklist</h3>
<table>
  <tr><th>Topic</th><th>Likely Questions</th></tr>
  <tr><td>Project</td><td>Explain your project. What was your contribution? What tech did you use and why?</td></tr>
  <tr><td>Approach</td><td>How do you debug a production issue? How do you approach a new requirement?</td></tr>
  <tr><td>Problems</td><td>Toughest bug you fixed? Performance issue you resolved?</td></tr>
  <tr><td>Design</td><td>How would you design [simple system relevant to your domain]?</td></tr>
  <tr><td>Improvement</td><td>What would you do differently if you rebuilt the project today?</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: How is HashSet implemented internally?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> HashSet uses HashMap internally. It stores each element as a KEY in a HashMap, with a constant dummy object as the VALUE. Since HashMap keys must be unique, HashSet automatically has no duplicates.</div>
  <div class="a"><strong>Detailed Answer:</strong> HashSet maintains a HashMap&lt;E, Object&gt; where elements are keys and a static Object PRESENT is the value. add(e) calls map.put(e, PRESENT). contains(e) calls map.containsKey(e). This is why equals/hashCode contract is critical for custom objects in HashSet.</div>
</div>
`
},

"daily-rhythm": {
  title: "Daily Study Rhythm",
  html: `
<h2>Daily Study Rhythm</h2>
<p class="subtitle">Repeat this structure every day for maximum retention</p>

<h3>Time Blocks (5–6 hours total)</h3>
<table>
  <tr><th>Block</th><th>Duration</th><th>Activity</th></tr>
  <tr><td>Morning</td><td>90 min</td><td>Deep-dive reading + one concept map per topic</td></tr>
  <tr><td>Midday</td><td>120 min</td><td>Hands-on coding (LeetCode + Spring exercise)</td></tr>
  <tr><td>Evening</td><td>90 min</td><td>Verbal rehearsal — answer 5 questions aloud, record yourself</td></tr>
  <tr><td>Night</td><td>30 min</td><td>Flashcard review (annotations, patterns, failure stories)</td></tr>
</table>

<h3>Active Recall Techniques</h3>
<ul>
  <li><strong>Feynman Technique:</strong> Explain each concept in plain English without jargon. If you stumble, that's your gap.</li>
  <li><strong>Think-Aloud Coding:</strong> Narrate your approach before writing code — Infosys interviewers score process, not just output.</li>
  <li><strong>Production Anchoring:</strong> For every concept, prepare one sentence: "In my project, we used this when…"</li>
  <li><strong>Spaced Repetition:</strong> Revisit Day 1 topics on Day 4 and Day 7 even briefly.</li>
</ul>

<h3>What to Skip at 4 Years</h3>
<ul>
  <li>Basic syntax, loops, if-else explanations</li>
  <li>Generic "what is Java" definitions</li>
  <li>Reading entire framework documentation cover-to-cover</li>
</ul>

<h3>What to Prioritize</h3>
<ul>
  <li>Internals (HashMap, Spring proxies, Hibernate session)</li>
  <li>Failure modes (N+1, self-invocation, deadlock, circuit open)</li>
  <li>Design trade-offs with real examples</li>
  <li>Your resume projects — every bullet must have a story</li>
</ul>
`
},

"day1": {
  title: "Day 1 — Java Core & Concurrency",
  html: `
<h2>Day 1 — Java Core, JVM &amp; Concurrency</h2>
<p class="subtitle">July 9 · HashMap internals, memory model, thread safety</p>

<span class="tag tag-blue">Java</span>
<span class="tag tag-green">Collections</span>
<span class="tag tag-yellow">Concurrency</span>

<h3>Focus Topics</h3>
<ul>
  <li>JVM memory model, garbage collection basics</li>
  <li><code>HashMap</code>, <code>ConcurrentHashMap</code>, <code>equals</code>/<code>hashCode</code> contract</li>
  <li><code>volatile</code>, <code>synchronized</code>, <code>ReentrantLock</code>, thread pools</li>
  <li>Java 8: <code>Optional</code>, default/static interface methods</li>
  <li>Preview: CAP theorem, monolith vs microservices</li>
</ul>

<h3>Deep Dive: HashMap Internals (Java 8+)</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>A <code>HashMap</code> is like a <strong>library with numbered shelves</strong>. You give it a key (book title), it calculates a shelf number (hash), goes to that shelf, and finds your value (the book). Most of the time you go directly to the right shelf — that's why lookup is very fast (O(1) average).</p>
</div>

<div class="analogy-box">
  <h4>Real-Life Analogy</h4>
  <p>Imagine 16 mailboxes in an apartment building. When mail arrives for "Amit Sharma", the building manager runs a formula on the name to pick mailbox #7. If two people map to mailbox #7, their letters are stacked in a small pile inside that one box. If the pile gets too big (more than 8 letters), it gets reorganized into a sorted tree for faster searching.</p>
</div>

<div class="steps-box">
  <h4>Step-by-Step: What Happens When You Call map.put("name", "Ashish")</h4>
  <ol>
    <li><strong>Step 1 — Calculate hash:</strong> Java takes the key <code>"name"</code> and calls <code>hashCode()</code> on it. This gives a large number (e.g., 3658379).</li>
    <li><strong>Step 2 — Find bucket index:</strong> Java does a bit operation to convert that number into an array index (0 to 15 for a 16-slot array). Formula: <code>index = (arraySize - 1) &amp; hash</code>.</li>
    <li><strong>Step 3 — Check for collision:</strong> If that bucket is empty, store the key-value pair directly. If another key already exists there (collision), add it to a linked list in that bucket.</li>
    <li><strong>Step 4 — Tree conversion:</strong> If a bucket's linked list grows beyond 8 items, Java converts it to a Red-Black tree (faster search within that bucket).</li>
    <li><strong>Step 5 — Resize if needed:</strong> When the map is 75% full (load factor 0.75), the array doubles in size (16 → 32) and all entries are re-distributed. This is expensive but rare.</li>
  </ol>
</div>

<div class="steps-box">
  <h4>Step-by-Step: What Happens When You Call map.get("name")</h4>
  <ol>
    <li>Calculate hash of <code>"name"</code> — same formula as put.</li>
    <li>Go to that bucket index.</li>
    <li>If bucket has one entry, compare keys using <code>equals()</code>.</li>
    <li>If bucket has a list/tree, walk through entries until <code>equals()</code> matches.</li>
    <li>Return the value, or <code>null</code> if not found.</li>
  </ol>
</div>

<h4>Key Concepts Explained</h4>
<ul>
  <li><strong>Bucket array:</strong> Internal array where each slot is a "bucket". Default starts at 16 slots, always power of 2.</li>
  <li><strong>Load factor (0.75):</strong> When map is 75% full, it resizes. Like expanding a parking lot before it's completely full — keeps performance good.</li>
  <li><strong>Collision:</strong> Two different keys landing in the same bucket. Handled by linked list (or tree if list is long).</li>
  <li><strong>Not thread-safe:</strong> Two threads writing at the same time can corrupt data. Use <code>ConcurrentHashMap</code> in multi-threaded code.</li>
</ul>

<div class="mistake-box">
  <h4>Common Mistake in Interviews</h4>
  <p>Don't say "HashMap uses hashCode directly as index." It uses hashCode after bit manipulation to spread values evenly. Also, two keys can have the same hashCode — that's why <code>equals()</code> is still needed after finding the bucket.</p>
</div>

<h3>Deep Dive: HashSet Internals — Round 1 Must-Know</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>HashSet stores <strong>unique elements only</strong> — no duplicates. Internally, it uses a <strong>HashMap</strong> where your elements are the KEYS and a dummy constant object is the VALUE. Since HashMap keys must be unique, HashSet automatically rejects duplicates.</p>
</div>

<div class="steps-box">
  <h4>How HashSet.add() Works Internally</h4>
  <ol>
    <li>You call <code>set.add("Apple")</code></li>
    <li>HashSet internally calls <code>map.put("Apple", PRESENT)</code> where PRESENT is a static dummy Object</li>
    <li>HashMap checks if "Apple" key already exists (using hashCode + equals)</li>
    <li>If key is new → added. If key exists → put returns old value → HashSet knows it's a duplicate</li>
    <li><code>contains("Apple")</code> internally calls <code>map.containsKey("Apple")</code></li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How is HashSet implemented internally?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> HashSet uses HashMap internally. Elements are stored as KEYS, with a constant dummy object as VALUE. Uniqueness comes from HashMap's key uniqueness.</div>
  <div class="a"><strong>Detailed Answer:</strong> HashSet maintains HashMap&lt;E, Object&gt; with static Object PRESENT. add(e) → map.put(e, PRESENT). contains(e) → map.containsKey(e). Allows one null element. Not thread-safe — use Collections.synchronizedSet() or ConcurrentHashMap.newKeySet(). Time complexity O(1) average for add/remove/contains.</div>
</div>

<h3>Deep Dive: equals() and hashCode() Contract</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>equals()</code> answers: "Are these two objects the same?" <code>hashCode()</code> answers: "Which bucket should this object go in?" The rule is: <strong>if two objects are equal, they MUST have the same hashCode</strong>. Think of it as — if two people have the same name, they must be assigned the same mailbox.</p>
</div>

<div class="analogy-box">
  <h4>What Goes Wrong If You Break the Rule</h4>
  <p>You store an Employee with id=101 in a HashMap. Later you search for another Employee object also with id=101. If your <code>equals()</code> says they're equal but <code>hashCode()</code> returns different numbers, HashMap looks in the WRONG bucket and returns null — even though the data exists! This is a silent, hard-to-debug production bug.</p>
</div>

<pre><code>// RULE: if a.equals(b) is true → a.hashCode() MUST equal b.hashCode()
// The reverse is NOT required (different objects CAN have same hashCode)

@Override
public boolean equals(Object o) {
    if (this == o) return true;           // Same object in memory
    if (!(o instanceof Employee e)) return false;  // Not an Employee
    return Objects.equals(id, e.id);      // Compare by business key (id)
}

@Override
public int hashCode() {
    return Objects.hash(id);  // MUST use the SAME field(s) as equals()
}</code></pre>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Using <code>equals()</code> on id but <code>hashCode()</code> on name — they must use the same fields.</li>
    <li>Changing a field used in hashCode after putting object in HashMap — object becomes "lost".</li>
    <li>Not overriding both when you override one — always override both together.</li>
  </ul>
</div>

<h3>Deep Dive: Java Memory Model &amp; Concurrency</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When multiple threads access the same data, you get problems: <strong>visibility</strong> (Thread A changes a value but Thread B doesn't see it) and <strong>race conditions</strong> (two threads update the same counter and one update is lost). Java gives you tools to prevent this.</p>
</div>

<div class="analogy-box">
  <h4>Bank Account Analogy</h4>
  <p>Two people try to withdraw ₹100 from an account with ₹150 balance at the same time. Without synchronization, both read balance=150, both withdraw, both write balance=50 — but ₹200 was withdrawn! <code>synchronized</code> is like a "only one person at the counter" rule. <code>AtomicInteger</code> is like a smart ATM that handles one transaction at a time without a full lock.</p>
</div>

<table>
  <tr><th>Mechanism</th><th>Simple Explanation</th><th>When to Use</th><th>Example</th></tr>
  <tr><td><code>volatile</code></td><td>All threads immediately see the latest value. Like a shared whiteboard everyone reads from.</td><td>Simple flags (on/off, shutdown signal)</td><td><code>volatile boolean running = true;</code></td></tr>
  <tr><td><code>synchronized</code></td><td>Only one thread enters the block at a time. Others wait in queue.</td><td>Protecting a block of code that modifies shared data</td><td><code>synchronized(this) { count++; }</code></td></tr>
  <tr><td><code>ReentrantLock</code></td><td>Like synchronized but you can tryLock (with timeout), or make it fair (FIFO order)</td><td>When you need try-lock or timeout</td><td><code>lock.tryLock(5, SECONDS)</code></td></tr>
  <tr><td><code>AtomicInteger</code></td><td>Thread-safe counter without explicit locking. Uses CPU-level compare-and-swap.</td><td>Simple counters, sequence numbers</td><td><code>counter.incrementAndGet()</code></td></tr>
  <tr><td><code>LongAdder</code></td><td>Like AtomicInteger but faster when MANY threads compete. Keeps separate counters per thread internally.</td><td>High-traffic metrics (request counts)</td><td><code>metrics.increment()</code></td></tr>
</table>

<div class="simple-box">
  <h4>volatile vs synchronized — Quick Difference</h4>
  <p><code>volatile</code> = everyone sees the latest value, but <strong>does NOT prevent two threads from updating at the same time</strong> (count++ is NOT safe with volatile alone).</p>
  <p><code>synchronized</code> = only one thread at a time + everyone sees latest value. Use this (or AtomicInteger) when you need to read AND write safely.</p>
</div>

<h3>Deep Dive: Thread Pool Sizing</h3>
<pre><code>// CPU-bound: poolSize = number of cores (+1 optional)
// I/O-bound: poolSize = cores × (1 + waitTime/computeTime)

ExecutorService executor = Executors.newFixedThreadPool(
    Runtime.getRuntime().availableProcessors() * 2
);
// Prefer ThreadPoolExecutor with named threads + bounded queue
// Never use Executors.newCachedThreadPool() in production without limits</code></pre>

<h3>Deep Dive: Garbage Collection (High Level)</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When you create objects in Java (<code>new Employee()</code>), they live in memory (heap). When you stop using them, Java's <strong>Garbage Collector (GC)</strong> automatically cleans them up — you don't call <code>delete</code> like in C++. Sometimes this cleanup causes brief pauses (your app freezes for milliseconds).</p>
</div>

<div class="analogy-box">
  <h4>Restaurant Table Analogy</h4>
  <p><strong>Young Generation (Eden):</strong> New customers sit at temporary tables. After eating, most leave quickly (short-lived objects die here). Survivors move to a quieter area.</p>
  <p><strong>Old Generation:</strong> Regular customers who've been around a while. Cleaned less often but takes longer when it happens (Major GC = full cleanup, causes longer pauses).</p>
</div>

<ul>
  <li><strong>Minor GC:</strong> Cleans young generation. Fast (milliseconds), happens often. Most new objects die here.</li>
  <li><strong>Major/Full GC:</strong> Cleans old generation. Slower (can be seconds). This is what causes production slowness.</li>
  <li><strong>G1 GC (default Java 9+):</strong> Divides heap into small regions. Cleans the most full regions first. Good balance of throughput and pause time.</li>
  <li><strong>Production tip:</strong> If app is slow, run <code>jstack</code> (check threads) and check GC logs before restarting. Don't just restart blindly.</li>
</ul>

<div class="task-box">
  <h4>Practical Tasks — Day 1</h4>
  <ol>
    <li><strong>LRU Cache:</strong> Implement using <code>LinkedHashMap</code> (accessOrder=true) or from scratch with HashMap + Doubly Linked List.</li>
    <li><strong>Thread-safe counter:</strong> Compare <code>synchronized</code> vs <code>AtomicInteger</code> vs <code>LongAdder</code> under 10 threads × 1M increments.</li>
    <li><strong>Streams warm-up:</strong> Group employees by department, find top-3 salaries per dept using <code>Collectors.groupingBy</code> + <code>collectingAndThen</code>.</li>
    <li><strong>Scenario rehearsal:</strong> "Production CPU at 100%" — walk through: thread dump → identify hot method → GC log → profiler (JFR/VisualVM).</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How does HashMap work internally?</div>
  <div class="answer-simple"><strong>Simple Answer (30 sec):</strong> HashMap stores data in an array of buckets. When you put a key, it calculates a hash number, finds the bucket index, and stores the value there. If two keys land in the same bucket (collision), they're stored in a linked list. Lookup is O(1) on average because you go directly to the bucket.</div>
  <div class="a"><strong>Detailed Answer:</strong> HashMap uses an array of buckets. The key's hashCode is processed through bit manipulation to get a bucket index. Collisions are handled via linked list (or Red-Black tree when bucket has more than 8 entries). Default load factor is 0.75 — when 75% full, capacity doubles and all entries rehash. get() computes hash, finds bucket, then compares keys with equals(). Average O(1), worst case O(log n) with trees.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Difference between HashMap and ConcurrentHashMap?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> HashMap is NOT safe for multiple threads — data can get corrupted. ConcurrentHashMap IS safe — multiple threads can read and write at the same time without breaking data. Use ConcurrentHashMap in any shared/multi-threaded code.</div>
  <div class="a"><strong>Detailed Answer:</strong> HashMap is not thread-safe. ConcurrentHashMap uses bucket-level locking (Java 8+: CAS + synchronized on first node) allowing concurrent reads and fine-grained writes. It never throws ConcurrentModificationException during iteration. Avoid Hashtable — it locks the entire table and is slow.</div>
</div>

<div class="interview-q">
  <div class="q">Q: What is deadlock? How do you prevent it?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> Deadlock = two threads waiting for each other forever, like two people in a narrow hallway each refusing to step back. Fix: always acquire locks in the same order (e.g., always lock Account A before Account B).</div>
  <div class="a"><strong>Detailed Answer:</strong> Deadlock needs 4 conditions: mutual exclusion, hold-and-wait, no preemption, circular wait. Prevention: acquire locks in consistent global order, use tryLock with timeout, minimize lock scope. Detection: thread dump (jstack) shows "Found one Java-level deadlock".</div>
</div>

<div class="interview-q">
  <div class="q">Q: What does volatile guarantee?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> volatile means all threads see the latest value immediately. Good for simple flags like "should the worker thread stop?" But NOT safe for count++ — use AtomicInteger for that.</div>
  <div class="a"><strong>Detailed Answer:</strong> volatile ensures visibility across threads and prevents instruction reordering. It does NOT make compound operations atomic (i++ is still unsafe). Use AtomicInteger for counters. I used volatile for a shutdown flag where one thread writes and others read.</div>
</div>
`
},

"day2": {
  title: "Day 2 — Streams & Modern Java",
  html: `
<h2>Day 2 — Streams API, CompletableFuture &amp; Modern Java</h2>
<p class="subtitle">July 10 · Functional programming, async Java, Java 11/17 features</p>

<span class="tag tag-blue">Streams</span>
<span class="tag tag-green">CompletableFuture</span>
<span class="tag tag-yellow">Java 17</span>

<h3>Focus Topics</h3>
<ul>
  <li>Stream pipeline: lazy evaluation, intermediate vs terminal ops</li>
  <li><code>flatMap</code>, custom collectors, parallel streams pitfalls</li>
  <li><code>CompletableFuture</code> composition and error handling</li>
  <li>Java 11 (<code>HttpClient</code>, <code>var</code>) and Java 17 (records, sealed classes)</li>
</ul>

<h3>Deep Dive: Java 8 Functional Programming (Round 1 Hot Topics)</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Before Java 8, you needed anonymous inner classes for callbacks. Java 8 introduced <strong>Lambda expressions</strong> — short, readable functions you can pass around like variables. Combined with <strong>Functional Interfaces</strong> (interfaces with exactly one abstract method), this enables functional-style programming in Java.</p>
</div>

<h4>Lambda Expression Syntax</h4>
<pre><code>// Old way — anonymous inner class
Runnable r = new Runnable() {
    public void run() { System.out.println("Hello"); }
};

// Java 8 — lambda
Runnable r = () -> System.out.println("Hello");

// With parameters
Comparator&lt;String&gt; comp = (a, b) -> a.length() - b.length();</code></pre>

<h4>Functional Interfaces (Must Know for Infosys)</h4>
<table>
  <tr><th>Interface</th><th>Method</th><th>Simple Use</th><th>Example</th></tr>
  <tr><td>Predicate&lt;T&gt;</td><td>test(T) → boolean</td><td>Filter condition</td><td><code>.filter(x -> x > 10)</code></td></tr>
  <tr><td>Function&lt;T,R&gt;</td><td>apply(T) → R</td><td>Transform input to output</td><td><code>.map(String::length)</code></td></tr>
  <tr><td>Consumer&lt;T&gt;</td><td>accept(T) → void</td><td>Do something with value</td><td><code>.forEach(System.out::println)</code></td></tr>
  <tr><td>Supplier&lt;T&gt;</td><td>get() → T</td><td>Provide/generate a value</td><td><code>()-> fetchFromDB()</code></td></tr>
</table>

<h4>Method References (Shorthand for Lambda)</h4>
<pre><code>// Lambda                    →  Method Reference
list.forEach(x -> System.out.println(x))  →  list.forEach(System.out::println)
list.stream().map(s -> s.length())        →  list.stream().map(String::length)
stream.map(s -> Integer.parseInt(s))      →  stream.map(Integer::parseInt)</code></pre>

<h4>Java 8 Date/Time API (Often Asked)</h4>
<div class="simple-box">
  <p>Old <code>Date</code> and <code>Calendar</code> were mutable and error-prone. Java 8 introduced immutable, thread-safe date/time classes in <code>java.time</code> package.</p>
  <ul>
    <li><code>LocalDate</code> — date only: 2024-07-18</li>
    <li><code>LocalDateTime</code> — date + time: 2024-07-18T14:30:00</li>
    <li><code>ZonedDateTime</code> — with timezone: 2024-07-18T14:30:00+05:30[Asia/Kolkata]</li>
    <li><code>Period</code> / <code>Duration</code> — difference between dates/times</li>
  </ul>
</div>

<div class="interview-q">
  <div class="q">Q: What is a Functional Interface?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> An interface with exactly ONE abstract method. Lambda expressions can only be used where a functional interface is expected. Examples: Runnable, Comparator, Predicate, Function.</div>
  <div class="a"><strong>Detailed Answer:</strong> @FunctionalInterface annotation ensures compile-time check of single abstract method. Java 8 provides built-in ones in java.util.function: Predicate (test), Function (apply), Consumer (accept), Supplier (get). Lambdas provide the implementation without anonymous class boilerplate.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Difference between Lambda and Anonymous Inner Class?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> Lambda is shorter and can only implement functional interfaces. Anonymous class can implement any interface/extend class, can have multiple methods, and has its own 'this'. Lambda uses 'this' from enclosing class.</div>
  <div class="a"><strong>Detailed Answer:</strong> Lambda has no constructor, no explicit interface name, compiler infers types. Anonymous inner class creates .class file per usage; lambda uses invokedynamic (more efficient). Lambda cannot shadow enclosing variables unless they're effectively final.</div>
</div>

<h3>Deep Dive: Stream Pipeline — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Streams are like an <strong>assembly line in a factory</strong>. You put raw items (list of orders) on the line. Each station (filter, map, sort) processes them. Nothing actually happens until the last station (terminal operation like collect) turns the machine on. Before that, you're just building the pipeline.</p>
</div>

<div class="analogy-box">
  <h4>Factory Assembly Line Analogy</h4>
  <p><strong>Intermediate operations</strong> (filter, map, sorted) = setting up machines on the line. The factory doesn't run yet.</p>
  <p><strong>Terminal operation</strong> (collect, forEach, count) = pressing the START button. Now items flow through all machines and you get the final output.</p>
</div>

<pre><code>// Example: Get unique customer IDs from completed orders, sorted
List&lt;String&gt; result = orders.stream()
    .filter(o -> o.getStatus() == Status.COMPLETED)   // Step 1: keep only completed
    .map(Order::getCustomerId)                          // Step 2: extract customer ID
    .distinct()                                         // Step 3: remove duplicates
    .sorted()                                           // Step 4: sort alphabetically
    .collect(Collectors.toList());                      // Step 5: START — collect into list</code></pre>

<div class="steps-box">
  <h4>Key Rules to Remember</h4>
  <ol>
    <li><strong>Lazy:</strong> filter/map/sorted do NOTHING until you call collect/forEach/count.</li>
    <li><strong>One-time use:</strong> After terminal operation, stream is consumed. Can't reuse it.</li>
    <li><strong>No side effects:</strong> Don't modify external variables inside stream. Use collect to gather results.</li>
    <li><strong>Short-circuit:</strong> findFirst(), anyMatch(), limit(5) can stop early without processing all items.</li>
  </ol>
</div>

<h3>Deep Dive: map vs flatMap — The Easiest Explanation</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>map</strong> = transform one item into one item. 1 input → 1 output.</p>
  <p><strong>flatMap</strong> = transform one item into MANY items, then flatten them all into one stream. 1 input → many outputs → flattened list.</p>
</div>

<div class="analogy-box">
  <h4>Pizza Order Analogy</h4>
  <p><strong>map:</strong> Each order → get the customer's name. 10 orders → 10 names.</p>
  <p><strong>flatMap:</strong> Each order → get all toppings from that order. 10 orders with 3 toppings each → 30 toppings total (flattened into one list).</p>
</div>

<pre><code>// map: 1-to-1 — each name becomes its length
List&lt;Integer&gt; lengths = names.stream()
    .map(String::length)    // "Amit" → 4, "Raj" → 3
    .toList();              // [4, 3]

// flatMap: 1-to-many — each order has multiple items, flatten all
List&lt;String&gt; allItemNames = orders.stream()
    .flatMap(order -> order.getItems().stream())  // each order → stream of items
    .map(Item::getName)                            // get each item's name
    .toList();                                     // one flat list of ALL item names</code></pre>

<div class="simple-box">
  <h4>When to Use Which?</h4>
  <ul>
    <li>Use <strong>map</strong> when converting: Employee → employee.getName()</li>
    <li>Use <strong>flatMap</strong> when un-nesting: Order → all Items inside each order</li>
    <li>Use <strong>flatMap</strong> with Optional: chain optional values without nested if-checks</li>
  </ul>
</div>

<h3>Deep Dive: Advanced Collectors</h3>
<pre><code>// Group by department, count employees
Map&lt;String, Long&gt; countByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDept, Collectors.counting()));

// Top earner per department
Map&lt;String, Optional&lt;Employee&gt;&gt; topByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDept,
        Collectors.maxBy(Comparator.comparing(Employee::getSalary))
    ));

// Partition by salary threshold
Map&lt;Boolean, List&lt;Employee&gt;&gt; partitioned = employees.stream()
    .collect(Collectors.partitioningBy(e -> e.getSalary() > 100000));</code></pre>

<h3>Deep Dive: Parallel Streams — When NOT to Use</h3>
<ul>
  <li>Data set is small (&lt; 10,000 elements) — overhead exceeds benefit</li>
  <li>Operations have side effects or shared mutable state</li>
  <li>Order matters and you're not using an ordered collector</li>
  <li>I/O-bound tasks — use <code>CompletableFuture</code> instead</li>
  <li>Common ForkJoinPool is shared — a blocking parallel stream can starve other tasks</li>
</ul>

<h3>Deep Dive: CompletableFuture — Async Java Made Simple</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Normally, your code waits for each task to finish before starting the next (blocking). <code>CompletableFuture</code> lets you start a task in the background and continue doing other work. When the task finishes, you get notified. Like ordering food on Swiggy while continuing to work — you don't stand at the restaurant waiting.</p>
</div>

<div class="analogy-box">
  <h4>Restaurant Order Analogy</h4>
  <p><strong>Without CompletableFuture:</strong> Order food → stand and wait 20 min → food arrives → then order dessert → wait again. Total: 40 min.</p>
  <p><strong>With CompletableFuture:</strong> Order food (async) → order dessert (async) in parallel → both arrive around the same time. Total: ~20 min.</p>
</div>

<div class="steps-box">
  <h4>Common Methods — What They Do</h4>
  <ol>
    <li><code>supplyAsync(() -> fetchUser())</code> — Run task in background thread, return result later.</li>
    <li><code>thenApply(user -> user.getName())</code> — When done, transform the result (sync, like map).</li>
    <li><code>thenCompose(user -> fetchOrders(user))</code> — When done, run ANOTHER async task (like flatMap).</li>
    <li><code>thenCombine(ordersFuture, (u, o) -> new Dashboard(u, o))</code> — Wait for TWO futures, merge results.</li>
    <li><code>exceptionally(ex -> defaultValue)</code> — If anything fails, return a fallback instead of crashing.</li>
  </ol>
</div>

<pre><code>// Real example: Build a dashboard by fetching user and orders IN PARALLEL
CompletableFuture&lt;User&gt; userFuture =
    CompletableFuture.supplyAsync(() -> userService.fetchUser(userId));

CompletableFuture&lt;List&lt;Order&gt;&gt; ordersFuture =
    CompletableFuture.supplyAsync(() -> orderService.fetchOrders(userId));

// Wait for BOTH, then combine into Dashboard
CompletableFuture&lt;Dashboard&gt; dashboard = userFuture
    .thenCombine(ordersFuture, (user, orders) -> new Dashboard(user, orders))
    .exceptionally(ex -> {
        log.error("Dashboard failed", ex);
        return Dashboard.empty();  // fallback if either call fails
    });

Dashboard result = dashboard.join();  // block until ready (use at the end)</code></pre>

<div class="simple-box">
  <h4>thenApply vs thenCompose — Quick Difference</h4>
  <p><code>thenApply</code> = "When done, convert the result" (User → UserName). Returns a plain value.</p>
  <p><code>thenCompose</code> = "When done, call another async service" (User → CompletableFuture&lt;Orders&gt;). Returns another future. Use when the next step is also async (calling another microservice).</p>
</div>

<h3>Deep Dive: Java 17 Records</h3>
<pre><code>public record OrderDTO(Long id, String product, BigDecimal amount) {
    // Compact constructor for validation
    public OrderDTO {
        Objects.requireNonNull(product);
        if (amount.compareTo(BigDecimal.ZERO) &lt; 0)
            throw new IllegalArgumentException("Negative amount");
    }
}
// Auto-generates: constructor, equals, hashCode, toString, accessors
// Immutable by design — ideal for DTOs and value objects</code></pre>

<h3>Deep Dive: Optional Anti-Patterns</h3>
<ul>
  <li><strong>Don't:</strong> <code>Optional.ofNullable(getFromDB())</code> as method parameter type</li>
  <li><strong>Don't:</strong> <code>optional.get()</code> without <code>isPresent()</code> check — use <code>orElseThrow</code></li>
  <li><strong>Don't:</strong> Use Optional for fields — use nullable reference with validation</li>
  <li><strong>Do:</strong> Use as return type when absence is a valid outcome</li>
  <li><strong>Performance:</strong> <code>orElse()</code> always evaluates default; <code>orElseGet()</code> is lazy</li>
</ul>

<div class="task-box">
  <h4>Practical Tasks — Day 2</h4>
  <ol>
    <li>Given list of orders, return total revenue per customer (last 30 days), sorted descending — pure Streams.</li>
    <li><code>CompletableFuture</code> chain: fetch user + orders in parallel, merge into Dashboard DTO.</li>
    <li>Refactor imperative nested loops to Stream pipeline (and back) — practice both directions.</li>
    <li>Model an API response DTO as Java 17 record with compact constructor validation.</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: Difference between map and flatMap in Streams?</div>
  <div class="a">map applies a 1-to-1 transformation: T → R. flatMap applies 1-to-many then flattens: T → Stream&lt;R&gt; → R. Use flatMap when each element produces multiple results, like extracting items from orders, or chaining Optional values.</div>
</div>

<div class="interview-q">
  <div class="q">Q: When would you use parallelStream()?</div>
  <div class="a">Only for large in-memory datasets with CPU-intensive, stateless, associative operations. In production I rarely use it — CompletableFuture with a dedicated executor gives better control. Parallel streams share the common ForkJoinPool and can block other tasks if operations do I/O.</div>
</div>

<div class="interview-q">
  <div class="q">Q: thenApply vs thenCompose in CompletableFuture?</div>
  <div class="a">thenApply transforms the result synchronously (T → U). thenCompose chains an async operation that returns another CompletableFuture (flatMap equivalent). Use thenCompose when the next step is itself async, like calling another microservice.</div>
</div>
`
},

"day3": {
  title: "Day 3 — Spring Boot & AOP",
  html: `
<h2>Day 3 — Spring Boot Internals, IoC &amp; AOP</h2>
<p class="subtitle">July 11 · Auto-configuration, bean lifecycle, proxy mechanisms</p>

<span class="tag tag-blue">Spring Core</span>
<span class="tag tag-green">AOP</span>
<span class="tag tag-yellow">Auto-Config</span>

<h3>Focus Topics</h3>
<ul>
  <li>IoC container, dependency injection, bean scopes</li>
  <li>Spring Boot auto-configuration and conditional beans</li>
  <li>AOP: JDK dynamic proxy vs CGLIB</li>
  <li>Application startup lifecycle and Actuator</li>
</ul>

<h3>Deep Dive: Spring Boot vs Spring MVC — Infosys Favorite Question</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Spring MVC</strong> is the web framework — it handles HTTP requests, controllers, views. But YOU must configure everything manually (XML or Java config, Tomcat setup, dependencies).</p>
  <p><strong>Spring Boot</strong> sits ON TOP of Spring MVC. It gives you auto-configuration, embedded server, starter dependencies — so you can start building APIs in minutes without boilerplate setup.</p>
</div>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p><strong>Spring MVC</strong> = buying land, hiring architect, building house brick by brick.</p>
  <p><strong>Spring Boot</strong> = buying a furnished apartment — move in and start living (coding) immediately. The apartment IS built on land (MVC), but setup is done for you.</p>
</div>

<table>
  <tr><th>Aspect</th><th>Spring MVC</th><th>Spring Boot</th></tr>
  <tr><td>Configuration</td><td>Manual — web.xml, DispatcherServlet, component scan</td><td>Auto — @SpringBootApplication does it all</td></tr>
  <tr><td>Server</td><td>Deploy WAR to external Tomcat</td><td>Embedded Tomcat/Jetty — run as JAR</td></tr>
  <tr><td>Dependencies</td><td>Manage each jar version manually</td><td>Starter packs (spring-boot-starter-web)</td></tr>
  <tr><td>Production config</td><td>Manual profiles, property files</td><td>application.yml + auto-config + Actuator</td></tr>
  <tr><td>Best for</td><td>Legacy apps, fine-grained control</td><td>Microservices, REST APIs, fast development</td></tr>
</table>

<h3>Common Spring Boot Annotations — Know Every One (Round 1)</h3>
<table>
  <tr><th>Annotation</th><th>What It Does</th><th>Simple Example</th></tr>
  <tr><td>@SpringBootApplication</td><td>Main entry — enables auto-config + component scan + configuration</td><td>On main class with main()</td></tr>
  <tr><td>@RestController</td><td>Marks class as REST API controller. @ResponseBody on every method.</td><td>UserController returns JSON</td></tr>
  <tr><td>@Controller</td><td>MVC controller — returns view names (HTML pages), not JSON</td><td>Legacy web apps with JSP/Thymeleaf</td></tr>
  <tr><td>@RequestMapping</td><td>Maps URL path to method. Can be on class or method level.</td><td>@RequestMapping("/api/users")</td></tr>
  <tr><td>@GetMapping / @PostMapping</td><td>Shortcut for @RequestMapping(method=GET/POST)</td><td>@GetMapping("/{id}")</td></tr>
  <tr><td>@PathVariable</td><td>Extract value from URL path</td><td>/users/{id} → @PathVariable Long id</td></tr>
  <tr><td>@RequestParam</td><td>Extract value from query string</td><td>/users?page=1 → @RequestParam int page</td></tr>
  <tr><td>@RequestBody</td><td>Convert JSON request body to Java object</td><td>POST with JSON → @RequestBody User user</td></tr>
  <tr><td>@Autowired</td><td>Inject dependency automatically</td><td>Inject UserRepository into UserService</td></tr>
  <tr><td>@Service</td><td>Marks business logic layer bean</td><td>UserService class</td></tr>
  <tr><td>@Repository</td><td>Marks data access layer bean</td><td>UserRepository interface</td></tr>
  <tr><td>@Component</td><td>Generic Spring-managed bean</td><td>Utility classes, helpers</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: Difference between Spring Boot and Spring MVC?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> Spring MVC is the web framework for handling HTTP requests. Spring Boot is a wrapper that adds auto-configuration, embedded server, and starter dependencies on top of MVC — so you don't need manual setup.</div>
  <div class="a"><strong>Detailed Answer:</strong> Spring MVC requires manual DispatcherServlet config, component scanning, and external Tomcat deployment. Spring Boot provides @SpringBootApplication combining @Configuration, @EnableAutoConfiguration, @ComponentScan. Embedded server, starter dependencies, Actuator, and opinionated defaults make it ideal for microservices and REST APIs. Boot IS MVC underneath — every @RestController still uses Spring MVC's DispatcherServlet.</div>
</div>

<div class="interview-q">
  <div class="q">Q: @PathVariable vs @RequestParam?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> @PathVariable reads from the URL path (/users/101 → id=101). @RequestParam reads from query string (/users?page=1 → page=1).</div>
  <div class="a"><strong>Detailed Answer:</strong> @PathVariable for RESTful resource identifiers: GET /api/users/{id}. @RequestParam for optional filters/pagination: GET /api/users?status=ACTIVE&page=0. PathVariable is required by default; RequestParam can have defaultValue and required=false.</div>
</div>

<div class="interview-q">
  <div class="q">Q: @RestController vs @Controller?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> @RestController returns JSON/XML directly (API). @Controller returns view name for HTML pages (MVC web app). @RestController = @Controller + @ResponseBody on every method.</div>
  <div class="a"><strong>Detailed Answer:</strong> Use @RestController for REST APIs where methods return data serialized to JSON via HttpMessageConverter (Jackson). Use @Controller when returning view names resolved by ViewResolver to JSP/Thymeleaf templates. In Spring Boot microservices, almost always @RestController.</div>
</div>

<h3>Deep Dive: Spring IoC Container — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Normally YOU create objects: <code>OrderService service = new OrderService(new OrderRepository())</code>. With Spring, you just say "I need an OrderService" and Spring <strong>creates it for you</strong> along with all its dependencies. This is called <strong>Dependency Injection (DI)</strong>. The Spring container is the "factory" that manages all these objects (called <strong>beans</strong>).</p>
</div>

<div class="analogy-box">
  <h4>Restaurant Kitchen Analogy</h4>
  <p>Without Spring: The chef (you) must buy vegetables, hire helpers, set up equipment — all manually.</p>
  <p>With Spring: You tell the manager "I need a chef station ready." The manager (Spring container) automatically provides the chef, ingredients (dependencies), and equipment. You just cook (write business logic).</p>
</div>

<div class="steps-box">
  <h4>What Happens When You Run SpringApplication.run()</h4>
  <ol>
    <li><strong>Scan:</strong> Spring scans your packages for classes annotated with @Component, @Service, @Repository, @Controller.</li>
    <li><strong>Register:</strong> Each found class becomes a "Bean Definition" in the container.</li>
    <li><strong>Create:</strong> Spring creates instances. For @Service OrderService, it first creates OrderRepository (dependency), then injects it into OrderService.</li>
    <li><strong>Initialize:</strong> Calls @PostConstruct methods after all dependencies are injected.</li>
    <li><strong>Auto-configure:</strong> Spring Boot reads classpath and auto-creates beans like DataSource, JPA if JDBC driver is present.</li>
    <li><strong>Ready:</strong> Application starts accepting HTTP requests.</li>
  </ol>
</div>

<h3>Bean Scopes</h3>
<table>
  <tr><th>Scope</th><th>Description</th><th>Microservices Note</th></tr>
  <tr><td>singleton (default)</td><td>One instance per Spring container</td><td>Most beans — stateless services</td></tr>
  <tr><td>prototype</td><td>New instance every injection</td><td>Stateful objects, not for singleton deps</td></tr>
  <tr><td>request</td><td>One per HTTP request</td><td>Web apps — request-scoped user context</td></tr>
  <tr><td>session</td><td>One per HTTP session</td><td>Shopping cart, user preferences</td></tr>
</table>

<h3>Deep Dive: Constructor vs Field Injection</h3>
<pre><code>// PREFERRED — constructor injection (immutable, testable, required deps explicit)
@Service
@RequiredArgsConstructor  // Lombok generates constructor for final fields
public class OrderService {
    private final OrderRepository orderRepository;
    private final PaymentClient paymentClient;
}

// AVOID — field injection (hard to test, hides dependencies)
@Autowired
private OrderRepository orderRepository;</code></pre>

<h3>Deep Dive: Spring Boot Auto-Configuration — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Spring Boot automatically sets up common things for you based on what's in your project. Added MySQL driver? Spring creates a DataSource automatically. Added Spring Security? Security filter chain is configured. You don't write boilerplate — but you CAN override anything by defining your own @Bean.</p>
</div>

<div class="steps-box">
  <h4>How Auto-Config Decides What to Create</h4>
  <ol>
    <li>Spring Boot reads a list of auto-configuration classes from <code>META-INF/spring/...AutoConfiguration.imports</code></li>
    <li>Each class has conditions like: "Only create DataSource IF MySQL driver is on classpath AND user hasn't defined their own DataSource"</li>
    <li>If conditions match → bean is created. If not → skipped.</li>
    <li>You can override: define your own @Bean and auto-config backs off (@ConditionalOnMissingBean)</li>
  </ol>
</div>

<div class="simple-box">
  <h4>Example</h4>
  <p>You add <code>spring-boot-starter-data-jpa</code> + MySQL driver to pom.xml → Spring Boot automatically creates: DataSource, EntityManagerFactory, TransactionManager, JPA repositories. You just write your @Entity and @Repository interface.</p>
</div>

<h3>Deep Dive: Spring AOP — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>AOP lets you add behavior (logging, security, transactions) to many methods <strong>without copying the same code into every method</strong>. You write the logic once in an "Aspect" and tell Spring which methods to apply it to. Spring creates a "proxy" wrapper around your class that runs your extra logic before/after the real method.</p>
</div>

<div class="analogy-box">
  <h4>Security Guard Analogy</h4>
  <p>Your business method is like an office room. AOP is like placing a security guard at the door who checks ID before you enter ( @Before ) and logs when you leave ( @After ). You don't modify the room — the guard (proxy) wraps around it.</p>
</div>

<table>
  <tr><th>Annotation</th><th>When It Runs</th><th>Example Use</th></tr>
  <tr><td>@Before</td><td>Before method starts</td><td>Check permissions, log input</td></tr>
  <tr><td>@After</td><td>After method finishes (success or failure)</td><td>Cleanup resources</td></tr>
  <tr><td>@Around</td><td>Wraps entire method — most powerful</td><td>Measure execution time, retry logic</td></tr>
  <tr><td>@AfterReturning</td><td>Only if method succeeds</td><td>Log successful result</td></tr>
  <tr><td>@AfterThrowing</td><td>Only if method throws exception</td><td>Error logging, alerting</td></tr>
</table>

<h3>JDK Proxy vs CGLIB — Simple Explanation</h3>
<div class="simple-box">
  <p>Spring can't modify your original class directly. It creates a <strong>proxy</strong> (wrapper) that intercepts method calls.</p>
  <ul>
    <li><strong>JDK Proxy:</strong> Works when your class implements an interface. Creates a proxy implementing the same interface.</li>
    <li><strong>CGLIB:</strong> Works on concrete classes. Creates a subclass of your class at runtime. Cannot proxy final methods.</li>
    <li><strong>Spring Boot default:</strong> Uses CGLIB even when interface exists (spring.aop.proxy-target-class=true).</li>
  </ul>
</div>

<pre><code>@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(LogExecutionTime)")
    public Object logTime(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return pjp.proceed();
        } finally {
            log.info("{} took {}ms", pjp.getSignature().getName(),
                     System.currentTimeMillis() - start);
        }
    }
}</code></pre>

<h3>Critical: @Transactional Self-Invocation — Very Common Interview Trap</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><code>@Transactional</code> works through Spring's proxy. But when you call <code>this.someMethod()</code> from inside the same class, you're calling the REAL object, NOT the proxy. So @Transactional is completely ignored! This is one of the most common bugs in Spring projects.</p>
</div>

<div class="analogy-box">
  <h4>The Security Guard Problem</h4>
  <p>The security guard (proxy) sits at the building entrance. External visitors go through the guard. But if you (inside the building) walk directly to another room via an internal door, you bypass the guard entirely. That's what <code>this.method()</code> does — internal call, no proxy.</p>
</div>

<pre><code>@Service
public class OrderService {
    public void placeOrder(Order order) {
        saveOrder(order);
        this.updateInventory(order);  // ❌ BYPASSES PROXY — @Transactional IGNORED!
    }

    @Transactional
    public void updateInventory(Order order) {
        // This transaction NEVER starts when called via this.updateInventory()
    }
}</code></pre>

<div class="steps-box">
  <h4>3 Ways to Fix It</h4>
  <ol>
    <li><strong>Best:</strong> Move @Transactional method to a separate service class (InventoryService).</li>
    <li>Inject the service into itself (or get bean from ApplicationContext) and call via injected reference.</li>
    <li>Use <code>AopContext.currentProxy()</code> to get the proxy and call through it.</li>
  </ol>
</div>

<div class="task-box">
  <h4>Practical Tasks — Day 3</h4>
  <ol>
    <li>Add <code>@PostConstruct</code> logger in controller → service → repository; trace startup order.</li>
    <li>Write <code>@LogExecutionTime</code> custom annotation + <code>@Around</code> aspect.</li>
    <li>Reproduce and fix the <code>@Transactional</code> self-invocation bug.</li>
    <li>Draw Spring context startup sequence on paper in under 3 minutes.</li>
    <li>Explore Actuator: <code>/actuator/health</code>, <code>/actuator/metrics</code>, <code>/actuator/info</code>.</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How does Spring Boot auto-configuration work?</div>
  <div class="a">@EnableAutoConfiguration imports AutoConfiguration classes listed in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Each class uses @Conditional annotations — e.g., @ConditionalOnClass(DataSource.class) creates a DataSource bean only when JDBC is on the classpath and no user-defined DataSource exists. This enables convention-over-configuration while allowing overrides.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Difference between @Component, @Service, @Repository?</div>
  <div class="a">All are stereotype annotations meta-annotated with @Component. @Service marks business logic layer. @Repository marks persistence layer and enables PersistenceExceptionTranslation (converts JPA exceptions to Spring DataAccessException). @Controller/@RestController mark presentation layer. Functionally similar for component scanning, but semantic layering improves readability and enables layer-specific processing.</div>
</div>

<div class="interview-q">
  <div class="q">Q: JDK Proxy vs CGLIB — when does Spring use each?</div>
  <div class="a">If the bean implements an interface, Spring defaults to JDK dynamic proxy (interface-based). If no interface, CGLIB creates a runtime subclass. With spring.aop.proxy-target-class=true (Spring Boot default), CGLIB is used even with interfaces. CGLIB cannot proxy final classes or final methods.</div>
</div>
`
},

"day4": {
  title: "Day 4 — JPA & Transactions",
  html: `
<h2>Day 4 — Spring Data JPA, Hibernate &amp; Transaction Management</h2>
<p class="subtitle">July 12 · N+1 problem, propagation, locking strategies</p>

<span class="tag tag-blue">JPA</span>
<span class="tag tag-green">Hibernate</span>
<span class="tag tag-yellow">Transactions</span>

<h3>Focus Topics</h3>
<ul>
  <li>JPA entity lifecycle and persistence context</li>
  <li>N+1 query problem and fixes</li>
  <li><code>@Transactional</code> propagation, isolation, rollback rules</li>
  <li>Optimistic vs pessimistic locking</li>
  <li>Global exception handling with <code>@ControllerAdvice</code></li>
</ul>

<h3>Deep Dive: JPA Entity Lifecycle</h3>
<div class="diagram">NEW (transient)  ──persist()──►  MANAGED (in persistence context)
                                      │
                    flush/detach       │  remove()
                         ▼             ▼
                    DETACHED         REMOVED
                         │
                    merge() ──► MANAGED</div>
<ul>
  <li><strong>Managed:</strong> Hibernate tracks changes — dirty checking auto-updates DB on flush.</li>
  <li><strong>Detached:</strong> Outside persistence context — changes not tracked. Common after serializing to JSON or closing session.</li>
  <li><strong>LazyInitializationException:</strong> Accessing lazy collection outside @Transactional boundary.</li>
</ul>

<h3>Deep Dive: Hibernate Relationships (Round 1 If You Mention ORM)</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When two database tables are related (one department has many employees), you model this in Java using JPA annotations. Infosys commonly asks about the 3 relationship types and when to use each.</p>
</div>

<table>
  <tr><th>Annotation</th><th>Relationship</th><th>Real Example</th><th>Which Side Owns FK?</th></tr>
  <tr><td>@ManyToOne</td><td>Many entities → One entity</td><td>Many Employees → One Department</td><td>Many side (Employee table has department_id)</td></tr>
  <tr><td>@OneToMany</td><td>One entity → Many entities</td><td>One Department → Many Employees</td><td>Opposite side (mappedBy — no FK here)</td></tr>
  <tr><td>@OneToOne</td><td>One → One</td><td>One User → One Profile</td><td>Either side (choose one as owner)</td></tr>
  <tr><td>@ManyToMany</td><td>Many → Many</td><td>Many Students → Many Courses</td><td>Join table (student_course)</td></tr>
</table>

<pre><code>// ManyToOne — Employee belongs to one Department
@Entity
public class Employee {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")  // FK column in employee table
    private Department department;
}

// OneToMany — inverse side (mappedBy, no FK column)
@Entity
public class Department {
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List&lt;Employee&gt; employees;
}</code></pre>

<div class="simple-box">
  <h4>Cascade Types — Simple Meaning</h4>
  <ul>
    <li><strong>PERSIST:</strong> Save parent → automatically save children too</li>
    <li><strong>MERGE:</strong> Update parent → automatically update children</li>
    <li><strong>REMOVE:</strong> Delete parent → automatically delete children (dangerous!)</li>
    <li><strong>ALL:</strong> All of the above</li>
    <li><strong>Tip:</strong> Use cascade carefully — REMOVE on OneToMany can accidentally delete data</li>
  </ul>
</div>

<div class="interview-q">
  <div class="q">Q: @OneToMany vs @ManyToOne — what's the difference?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> They describe the same relationship from opposite sides. @ManyToOne is on the Employee side (many employees, one department). @OneToMany is on the Department side (one department, many employees). The @ManyToOne side owns the foreign key column.</div>
  <div class="a"><strong>Detailed Answer:</strong> @ManyToOne is the owning side with @JoinColumn (FK in database). @OneToMany uses mappedBy pointing to the owning side field name. Always put @JoinColumn on the many side. Use LAZY fetch on both for performance.</div>
</div>

<h3>Deep Dive: The N+1 Problem — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>You fetch 10 departments from the database (1 query). Then for EACH department, you fetch its employees separately (10 more queries). Total = 1 + 10 = <strong>11 queries</strong> instead of 1. With 100 departments, that's 101 queries! This kills performance in production.</p>
</div>

<div class="analogy-box">
  <h4>School Report Analogy</h4>
  <p><strong>Bad (N+1):</strong> Ask the office for a list of 10 classes (1 trip). Then visit each class individually to get student names (10 trips). Total: 11 trips.</p>
  <p><strong>Good (JOIN FETCH):</strong> Ask the office for all classes WITH their students in one form (1 trip). Total: 1 trip.</p>
</div>

<div class="steps-box">
  <h4>How to Detect N+1</h4>
  <ol>
    <li>Enable SQL logging in application.yml: <code>spring.jpa.show-sql=true</code></li>
    <li>Run your API endpoint</li>
    <li>Look for repeated SELECT queries with different IDs — that's N+1</li>
    <li>Or use Hibernate statistics / datasource proxy logging</li>
  </ol>
</div>

<pre><code>// ❌ BAD — causes N+1 (1 query for departments + N for employees)
List&lt;Department&gt; depts = departmentRepository.findAll();
depts.forEach(d -> d.getEmployees().size());  // triggers lazy load per department

// ✅ FIX 1 — JOIN FETCH (best when you always need employees)
@Query("SELECT d FROM Department d JOIN FETCH d.employees")
List&lt;Department&gt; findAllWithEmployees();

// ✅ FIX 2 — @EntityGraph (cleaner, declarative)
@EntityGraph(attributePaths = {"employees"})
List&lt;Department&gt; findAll();

// ✅ FIX 3 — DTO Projection (best for APIs — don't load full entities)
@Query("SELECT new DeptDTO(d.id, d.name, COUNT(e)) FROM Department d LEFT JOIN d.employees e GROUP BY d.id")
List&lt;DeptDTO&gt; findDeptSummaries();</code></pre>

<div class="simple-box">
  <h4>Lazy vs Eager — What to Use?</h4>
  <p><strong>Always use LAZY</strong> (default for @OneToMany). Load associations only when needed via JOIN FETCH or @EntityGraph. EAGER loading fetches everything always — causes slow queries and memory issues. LazyInitializationException means you accessed lazy data OUTSIDE a @Transactional method.</p>
</div>

<h3>Deep Dive: @Transactional Propagation — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When a @Transactional method calls another @Transactional method, <strong>propagation</strong> decides: "Do they share the same transaction, or does the inner method get its own?" This matters when you need some work to commit even if the outer work fails (like audit logging).</p>
</div>

<div class="analogy-box">
  <h4>Bank Transfer Analogy</h4>
  <p><strong>REQUIRED (default):</strong> Both operations are part of one bank transfer. If payment fails, order creation also rolls back. All or nothing.</p>
  <p><strong>REQUIRES_NEW:</strong> Audit log is a separate receipt. Even if the transfer fails, the receipt (audit log) is still saved. Independent transactions.</p>
</div>

<table>
  <tr><th>Propagation</th><th>Simple Meaning</th><th>Real Example</th></tr>
  <tr><td>REQUIRED (default)</td><td>Join existing transaction, or create new if none exists</td><td>Normal service methods — all succeed or all fail together</td></tr>
  <tr><td>REQUIRES_NEW</td><td>Always start a BRAND NEW transaction. Suspend the current one.</td><td>Audit log that must save even if parent fails</td></tr>
  <tr><td>NESTED</td><td>Savepoint inside existing transaction. Partial rollback possible.</td><td>Try optional step, rollback only that step if it fails</td></tr>
  <tr><td>SUPPORTS</td><td>Use transaction if one exists, otherwise run without</td><td>Read-only helper methods</td></tr>
</table>

<pre><code>// Example: Payment fails but audit log MUST be saved
@Transactional
public void processPayment(Payment payment) {
    paymentRepository.save(payment);       // part of outer transaction
    saveAuditLog("payment attempted");     // REQUIRES_NEW — commits independently
    riskyOperation();                      // if this throws, payment rolls back
                                           // but audit log is ALREADY saved
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void saveAuditLog(String message) {
    auditRepository.save(new AuditEntry(message));
}</code></pre>

<h3>Deep Dive: Transaction Isolation Levels</h3>
<table>
  <tr><th>Level</th><th>Dirty Read</th><th>Non-Repeatable Read</th><th>Phantom Read</th></tr>
  <tr><td>READ_UNCOMMITTED</td><td>Possible</td><td>Possible</td><td>Possible</td></tr>
  <tr><td>READ_COMMITTED (most DBs default)</td><td>No</td><td>Possible</td><td>Possible</td></tr>
  <tr><td>REPEATABLE_READ</td><td>No</td><td>No</td><td>Possible</td></tr>
  <tr><td>SERIALIZABLE</td><td>No</td><td>No</td><td>No</td></tr>
</table>

<h3>Deep Dive: Optimistic vs Pessimistic Locking</h3>
<pre><code>// Optimistic — @Version column, check on update
@Entity
public class Account {
    @Version
    private Long version;  // Hibernate increments on each update
    // UPDATE account SET balance=?, version=version+1 WHERE id=? AND version=?
    // If version mismatch → OptimisticLockException
}

// Pessimistic — database row lock
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT a FROM Account a WHERE a.id = :id")
Account findByIdForUpdate(@Param("id") Long id);</code></pre>
<ul>
  <li><strong>Optimistic:</strong> High concurrency, low contention. Retry on conflict.</li>
  <li><strong>Pessimistic:</strong> Financial transactions, inventory deduction. Risk of deadlocks.</li>
</ul>

<h3>Deep Dive: @ControllerAdvice Exception Handling</h3>
<pre><code>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ErrorResponse(message));
    }
}</code></pre>

<div class="task-box">
  <h4>Practical Tasks — Day 4</h4>
  <ol>
    <li>Create <code>@OneToMany</code> entity, demonstrate N+1 in SQL logs (show-sql=true), fix with JOIN FETCH.</li>
    <li>Test rollback: <code>REQUIRED</code> vs <code>REQUIRES_NEW</code> — verify which data persists.</li>
    <li>Build global exception handler returning consistent JSON error structure.</li>
    <li>SQL: Write 2nd-highest salary query (window function + subquery).</li>
    <li>Review your <code>RegisterRequest</code> validation and <code>application.yml</code> — explain every property.</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: What is the N+1 problem? How did you fix it?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> You fetch 10 departments (1 query), then load employees for each department separately (10 more queries) = 11 total. Fix: use JOIN FETCH to get departments AND employees in ONE query.</div>
  <div class="a"><strong>Detailed Answer:</strong> N+1 occurs when fetching N parent entities triggers 1 initial query plus N additional queries for each parent's children. I identified it via Hibernate SQL logging showing repeated SELECT patterns. Fixed using JOIN FETCH: "SELECT d FROM Department d JOIN FETCH d.employees". Alternative: @EntityGraph or DTO projections for APIs.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Explain @Transactional propagation types with a real scenario.</div>
  <div class="a">REQUIRED (default) joins existing transaction or creates new — standard for service methods. REQUIRES_NEW suspends current transaction and creates a new one — I used this for audit logging that must persist even when the parent business transaction rolls back. For example, payment fails but we still record the attempt. NESTED creates a savepoint for partial rollback within the same transaction.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Lazy vs Eager loading — what do you use in production?</div>
  <div class="a">Always default to LAZY for @OneToMany and @ManyToMany. EAGER causes unintended data loading and performance issues — Hibernate may load entire object graphs. Use explicit JOIN FETCH or @EntityGraph when you know you need the association. LazyInitializationException means you accessed a lazy collection outside a @Transactional boundary — fix by extending transaction scope or using fetch join.</div>
</div>
`
},

"day5": {
  title: "Day 5 — Microservices & Resilience",
  html: `
<h2>Day 5 — Microservices Architecture, Communication &amp; Resilience</h2>
<p class="subtitle">July 13 · Service decomposition, Saga, Circuit Breaker, Kafka vs RabbitMQ</p>

<span class="tag tag-blue">Microservices</span>
<span class="tag tag-green">Resilience4j</span>
<span class="tag tag-yellow">Event-Driven</span>

<h3>Focus Topics</h3>
<ul>
  <li>Service decomposition strategies and 12-Factor App</li>
  <li>Sync (REST/gRPC) vs async (messaging) communication</li>
  <li>Circuit Breaker, Retry, Bulkhead, Timeout patterns</li>
  <li>Saga pattern for distributed transactions</li>
  <li>Kafka vs RabbitMQ, API Gateway, Service Discovery</li>
</ul>

<h3>Deep Dive: When to Use Microservices</h3>
<div class="card-grid">
  <div class="card"><h4>Good Fit</h4><p>Large teams, independent deployment needs, different scaling requirements per service, polyglot persistence.</p></div>
  <div class="card"><h4>Bad Fit</h4><p>Small team, unclear domain boundaries, low traffic, strong ACID requirements across entities.</p></div>
</div>
<p><strong>Decomposition strategies:</strong> By business capability (Order, Payment, Inventory), by subdomain (DDD bounded contexts), or by transaction path (strangler fig pattern for migration).</p>

<h3>Deep Dive: Communication Patterns</h3>
<table>
  <tr><th>Pattern</th><th>Protocol</th><th>When</th><th>Trade-off</th></tr>
  <tr><td>Sync Request-Response</td><td>REST / gRPC</td><td>Real-time queries, user-facing flows</td><td>Tight coupling, cascading failures</td></tr>
  <tr><td>Async Messaging</td><td>Kafka / RabbitMQ</td><td>Event notification, decoupling, buffering</td><td>Eventual consistency, complexity</td></tr>
  <tr><td>Event Sourcing</td><td>Kafka (log)</td><td>Audit trail, temporal queries</td><td>High complexity, learning curve</td></tr>
</table>

<h3>Deep Dive: Circuit Breaker — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When a downstream service (like Payment API) keeps failing, instead of your service waiting and retrying forever (which wastes threads and makes YOUR service slow too), the <strong>Circuit Breaker "opens"</strong> and immediately returns an error/fallback. Like a home circuit breaker — when there's a fault, it trips to prevent fire.</p>
</div>

<div class="analogy-box">
  <h4>Electric Circuit Breaker Analogy</h4>
  <p><strong>CLOSED (normal):</strong> Electricity flows. Requests go to Payment Service normally.</p>
  <p><strong>OPEN (tripped):</strong> Too many failures detected. Circuit trips — requests immediately fail fast with fallback ("Payment temporarily unavailable"). No waiting, no wasted threads.</p>
  <p><strong>HALF-OPEN (testing):</strong> After 30 seconds, allow ONE test request. If it succeeds → CLOSED again. If it fails → back to OPEN.</p>
</div>

<div class="diagram">CLOSED (working fine)
    │
    │ failures exceed threshold (e.g., 5 failures in 10 seconds)
    ▼
OPEN (fail fast — return fallback immediately, don't call Payment Service)
    │
    │ wait duration passes (e.g., 30 seconds)
    ▼
HALF-OPEN (allow 1 test request)
    │
    ├── success → back to CLOSED
    └── failure → back to OPEN</div>

<pre><code>@CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
public PaymentResponse processPayment(PaymentRequest request) {
    return paymentClient.charge(request);  // calls external Payment Service
}

// This runs when circuit is OPEN or call fails
public PaymentResponse paymentFallback(PaymentRequest req, Exception ex) {
    return PaymentResponse.pending("Payment queued — will retry shortly");
}</code></pre>

<h3>Deep Dive: Saga Pattern — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>In a monolith, one database transaction handles everything (order + payment + inventory). In microservices, each service has its own database. You CAN'T use one big transaction across services. <strong>Saga</strong> = a series of local steps. If any step fails, run <strong>compensating actions</strong> (undo previous steps).</p>
</div>

<div class="analogy-box">
  <h4>Travel Booking Analogy</h4>
  <p>You book a flight, then hotel, then cab. If the cab booking fails, you cancel the hotel (compensate), then cancel the flight (compensate). Each booking is independent, but you have an undo plan for each step.</p>
</div>

<div class="steps-box">
  <h4>Order Flow Example</h4>
  <ol>
    <li><strong>Step 1:</strong> Order Service creates order → status: CREATED</li>
    <li><strong>Step 2:</strong> Payment Service charges customer → status: PAID</li>
    <li><strong>Step 3:</strong> Inventory Service reserves stock → status: CONFIRMED</li>
    <li><strong>If Step 3 fails:</strong> Compensate Step 2 (refund payment) → Compensate Step 1 (cancel order)</li>
  </ol>
</div>

<div class="simple-box">
  <h4>Choreography vs Orchestration</h4>
  <p><strong>Choreography:</strong> Each service listens for events and reacts. Order Service publishes "OrderCreated" → Payment Service hears it and charges → publishes "PaymentDone" → Inventory hears it. No central boss. Simple but hard to track flow.</p>
  <p><strong>Orchestration:</strong> One central "Saga Orchestrator" tells each service what to do step by step. Easier to debug and monitor. Better for complex flows.</p>
</div>

<h3>Deep Dive: Kafka vs RabbitMQ — Simple Comparison</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Kafka</strong> = a newspaper archive. Messages are stored and anyone can read them anytime, even re-read old ones. <strong>RabbitMQ</strong> = a post office mailbox. Message delivered once, then deleted. Each is good for different jobs.</p>
</div>

<table>
  <tr><th>Question</th><th>Kafka</th><th>RabbitMQ</th></tr>
  <tr><td>What is it?</td><td>Distributed event log (like a diary)</td><td>Message broker (like a post office)</td></tr>
  <tr><td>After consumer reads?</td><td>Message stays (configurable retention)</td><td>Message deleted (by default)</td></tr>
  <tr><td>Can re-read old messages?</td><td>YES — reset offset and replay</td><td>NO — once consumed, gone</td></tr>
  <tr><td>Best for</td><td>Event streaming, analytics, audit logs</td><td>Task queues, job processing, RPC</td></tr>
  <tr><td>Throughput</td><td>Very high (millions/sec)</td><td>Moderate (thousands/sec)</td></tr>
  <tr><td>Example use</td><td>Order placed → analytics, email, inventory all read same event</td><td>Send email job → worker picks up → done → delete</td></tr>
</table>

<div class="simple-box">
  <h4>Which Would You Choose?</h4>
  <p><strong>Kafka:</strong> "When an order is placed, multiple services need to know — analytics, notifications, inventory. They should read at their own pace and we might need to replay events."</p>
  <p><strong>RabbitMQ:</strong> "When an order is placed, send one email notification job to a worker queue. Process it once and move on."</p>
</div>

<h3>Deep Dive: API Gateway &amp; Service Discovery</h3>
<ul>
  <li><strong>API Gateway (Spring Cloud Gateway):</strong> Single entry point — routing, auth termination, rate limiting, request aggregation.</li>
  <li><strong>Service Discovery (Eureka/Consul):</strong> Services register on startup; clients resolve instances dynamically. Enables load balancing and health-check-based routing.</li>
  <li><strong>Config Server:</strong> Centralized configuration with environment-specific profiles. <code>@RefreshScope</code> beans reload on config change.</li>
</ul>

<h3>Idempotency in Distributed Systems</h3>
<pre><code>// Client sends Idempotency-Key header
@PostMapping("/payments")
public ResponseEntity&lt;Payment&gt; pay(@RequestBody PaymentRequest req,
    @RequestHeader("Idempotency-Key") String key) {
    return paymentService.processIdempotent(key, req);
}

// Service checks if key was already processed
if (idempotencyStore.exists(key)) {
    return idempotencyStore.getResult(key);  // return cached response
}</code></pre>

<div class="task-box">
  <h4>Practical Tasks — Day 5</h4>
  <ol>
    <li>Draw e-commerce order flow across Order, Payment, Inventory — mark sync/async boundaries.</li>
    <li>Implement Feign client with fallback or Resilience4j @CircuitBreaker.</li>
    <li>Walk through: Payment service down → circuit opens → fallback → half-open test → recovery.</li>
    <li>Design idempotency for duplicate payment requests — explain key storage and TTL.</li>
    <li>Write 1-page comparison: Kafka vs RabbitMQ for order event processing.</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How do you handle distributed transactions in microservices?</div>
  <div class="a">I avoid 2PC (two-phase commit) due to availability and coupling issues. Instead, I use the Saga pattern — a sequence of local transactions with compensating actions. For an order flow: create order → charge payment → reserve inventory. If inventory fails, compensate by refunding payment and cancelling order. Implementation can be choreography (event-driven) or orchestration (central coordinator). I accept eventual consistency and design for idempotency.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Kafka vs RabbitMQ — when would you choose each?</div>
  <div class="a">Kafka for event streaming where I need high throughput, message replay, and retention — e.g., order events consumed by analytics, notification, and audit services at their own pace. RabbitMQ for task queues and request-reply patterns — e.g., sending email notifications where each message is processed once and deleted. Kafka is a log; RabbitMQ is a mailbox.</div>
</div>

<div class="interview-q">
  <div class="q">Q: What is a Circuit Breaker? Why is it needed?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> Like a home electric breaker. When Payment Service keeps failing, the circuit "trips" (opens) and your service immediately returns a fallback instead of waiting forever. This prevents YOUR service from also becoming slow.</div>
  <div class="a"><strong>Detailed Answer:</strong> Circuit Breaker prevents cascading failures. When a downstream service fails repeatedly, the breaker opens and fails fast — returning a fallback. After a cooldown, it allows a test request (half-open). Protects threads and gives the failing service time to recover. Implemented with Resilience4j in payment integration.</div>
</div>
`
},

"day6": {
  title: "Day 6 — Security & Patterns",
  html: `
<h2>Day 6 — Security, Design Patterns &amp; Cloud-Native Practices</h2>
<p class="subtitle">July 14 · OAuth2/JWT, Spring Security, CQRS, deployment strategies</p>

<span class="tag tag-blue">Security</span>
<span class="tag tag-green">Design Patterns</span>
<span class="tag tag-yellow">DevOps</span>

<h3>Focus Topics</h3>
<ul>
  <li>OAuth2 flows and JWT authentication</li>
  <li>Spring Security filter chain (Spring Security 6)</li>
  <li>Design patterns in microservices context</li>
  <li>CQRS, Event Sourcing, container deployment</li>
</ul>

<h3>Deep Dive: JWT Authentication — Step by Step</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>JWT (JSON Web Token) is like a <strong>digital ID card</strong>. After you login, the server gives you a signed token. For every future request, you show this token instead of sending username/password again. The server verifies the signature to trust it's genuine.</p>
</div>

<div class="steps-box">
  <h4>Complete Login Flow — Step by Step</h4>
  <ol>
    <li>User sends username + password to <code>POST /login</code></li>
    <li>Auth Service validates credentials against database</li>
    <li>If valid, creates a JWT containing: user ID, roles, expiry time</li>
    <li>Signs the JWT with a secret key (HMAC) or private key (RSA)</li>
    <li>Returns JWT to client: <code>{ "token": "eyJhbG..." }</code></li>
    <li>Client stores token (memory or httpOnly cookie — NOT localStorage for XSS safety)</li>
    <li>For next requests: <code>Authorization: Bearer eyJhbG...</code></li>
    <li>Spring Security filter intercepts, validates signature + expiry</li>
    <li>Extracts roles from token → allows/denies access to API</li>
  </ol>
</div>

<div class="simple-box">
  <h4>JWT Structure (3 parts separated by dots)</h4>
  <p><code>eyJhbG.header.eyJzdWI.payload.SflKxw.signature</code></p>
  <ul>
    <li><strong>Header:</strong> Algorithm used (HS256, RS256)</li>
    <li><strong>Payload:</strong> Claims — user ID (sub), roles, expiry (exp), issuer (iss)</li>
    <li><strong>Signature:</strong> Cryptographic proof that token wasn't tampered with</li>
  </ul>
  <p><strong>Important:</strong> Payload is Base64 encoded, NOT encrypted. Anyone can decode and read it. Never put passwords or secrets in JWT payload.</p>
</div>

<h3>Deep Dive: OAuth2 Grant Types</h3>
<table>
  <tr><th>Grant Type</th><th>Use Case</th></tr>
  <tr><td>Authorization Code + PKCE</td><td>Web/mobile apps (most secure for user login)</td></tr>
  <tr><td>Client Credentials</td><td>Service-to-service (no user context)</td></tr>
  <tr><td>Refresh Token</td><td>Obtain new access token without re-login</td></tr>
  <tr><td>Password Grant (deprecated)</td><td>Legacy only — avoid in new systems</td></tr>
</table>

<h3>Deep Dive: Spring Security 6 Filter Chain</h3>
<pre><code>@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .build();
    }
}</code></pre>
<p><strong>Filter order:</strong> SecurityContextPersistence → Logout → Authentication → Authorization → FilterSecurityInterceptor. JWT filter extracts and validates token before reaching your controller.</p>

<h3>Deep Dive: Design Patterns for Microservices</h3>
<table>
  <tr><th>Pattern</th><th>Purpose</th><th>Example</th></tr>
  <tr><td>API Gateway</td><td>Single entry point</td><td>Spring Cloud Gateway routing</td></tr>
  <tr><td>Circuit Breaker</td><td>Fault tolerance</td><td>Resilience4j on external calls</td></tr>
  <tr><td>Saga</td><td>Distributed transactions</td><td>Order → Payment → Inventory</td></tr>
  <tr><td>Strangler Fig</td><td>Monolith migration</td><td>Gradually extract services</td></tr>
  <tr><td>CQRS</td><td>Separate read/write models</td><td>Write to PostgreSQL, read from Elasticsearch</td></tr>
  <tr><td>Event Sourcing</td><td>Store state changes as events</td><td>Bank account transaction log</td></tr>
  <tr><td>Bulkhead</td><td>Isolate thread pools</td><td>Separate pool for payment vs search</td></tr>
  <tr><td>Sidecar</td><td>Cross-cutting per-instance</td><td>Service mesh (Istio/Envoy)</td></tr>
  <tr><td>Strategy</td><td>Pluggable algorithms</td><td>Payment methods (UPI, Card, Wallet)</td></tr>
  <tr><td>Observer</td><td>Event notification</td><td>Domain events via Kafka</td></tr>
</table>

<h3>Deep Dive: CQRS — When to Use</h3>
<p><strong>Command Query Responsibility Segregation</strong> separates read and write models.</p>
<ul>
  <li><strong>Use when:</strong> Read/write ratio is heavily skewed, complex queries need different schema, multiple read views needed.</li>
  <li><strong>Skip when:</strong> Simple CRUD, small team, strong consistency required on reads.</li>
  <li><strong>Example:</strong> E-commerce product catalog — writes go to PostgreSQL, reads served from Redis/Elasticsearch with denormalized views updated via events.</li>
</ul>

<h3>Deep Dive: Deployment Strategies</h3>
<table>
  <tr><th>Strategy</th><th>How</th><th>Risk</th></tr>
  <tr><td>Rolling Update</td><td>Replace instances one by one</td><td>Low — mixed versions temporarily</td></tr>
  <tr><td>Blue-Green</td><td>Two identical environments; switch traffic</td><td>Low — instant rollback</td></tr>
  <tr><td>Canary</td><td>Route 5% traffic to new version, monitor, increase</td><td>Lowest — gradual exposure</td></tr>
</table>

<h3>Observability: Three Pillars</h3>
<ul>
  <li><strong>Logs:</strong> Structured JSON logging (ELK/EFK stack). Include correlation ID across services.</li>
  <li><strong>Metrics:</strong> Prometheus + Grafana. Key: latency percentiles, error rate, throughput.</li>
  <li><strong>Traces:</strong> Distributed tracing (Zipkin/Jaeger). Trace ID propagated via HTTP headers.</li>
</ul>

<div class="task-box">
  <h4>Practical Tasks — Day 6</h4>
  <ol>
    <li>Explain JWT auth flow in 2 minutes aloud — record and review.</li>
    <li>Configure Spring Security: permit /public, JWT for /api/**.</li>
    <li>Refactor payment processing to Strategy pattern (CreditCard, UPI, Wallet).</li>
    <li>Scenario: How do you secure service-to-service calls in Kubernetes? (mTLS, service accounts, network policies)</li>
    <li>Start behavioral prep: list 3 production incidents with resolution details.</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How does JWT authentication work in Spring Boot?</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> User logs in with username/password → server gives a signed JWT token → client sends token in every request header → Spring validates signature and expiry → allows or denies access. No session stored on server.</div>
  <div class="a"><strong>Detailed Answer:</strong> Client authenticates via login, receives signed JWT. Subsequent requests include Authorization Bearer header. Spring Security JwtDecoder validates signature and expiration. Claims (roles, user ID) extracted into SecurityContext. @PreAuthorize checks roles. Stateless — auth service issues JWT, other microservices validate with shared public key.</div>
</div>

<div class="interview-q">
  <div class="q">Q: What design patterns have you used in microservices?</div>
  <div class="a">Circuit Breaker for external payment gateway integration — prevents cascade failures. Saga for order processing across services. API Gateway as single entry point with auth and rate limiting. Strategy pattern for multiple payment methods. Observer pattern via Kafka domain events — order created event triggers notification and analytics services independently.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Blue-green vs canary deployment?</div>
  <div class="a">Blue-green maintains two identical environments. Deploy to green, test, then switch all traffic from blue to green. Instant rollback by switching back. Canary deploys new version to a small subset of instances, monitors metrics (error rate, latency), and gradually increases traffic. Canary is safer for catching issues early; blue-green is simpler for full cutover.</div>
</div>
`
},

"day7": {
  title: "Day 7 — Database & Project Review",
  html: `
<h2>Day 7 — Database Optimization, SQL &amp; Project Architecture Review</h2>
<p class="subtitle">July 15 · Query tuning, indexing, project presentation, system design mock</p>

<span class="tag tag-blue">SQL</span>
<span class="tag tag-green">Performance</span>
<span class="tag tag-yellow">System Design</span>

<h3>Focus Topics</h3>
<ul>
  <li>Query optimization, EXPLAIN plans, indexing strategies</li>
  <li>Complex SQL: joins, window functions, CTEs</li>
  <li>Connection pooling (HikariCP), caching (Redis)</li>
  <li>15-minute project presentation preparation</li>
  <li>System design mock exercise</li>
</ul>

<h3>Deep Dive: Database Indexing — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>An index is like the <strong>index at the back of a textbook</strong>. Instead of reading every page to find "HashMap", you look in the index, see "page 245", and go directly there. Without an index, the database scans EVERY row (full table scan) — very slow on large tables.</p>
</div>

<div class="analogy-box">
  <h4>Phone Book Analogy</h4>
  <p><strong>Without index:</strong> Find "Sharma" by reading every name in the city alphabetically from A to Z.</p>
  <p><strong>With index:</strong> Jump directly to "S" section, find "Sharma" in seconds.</p>
</div>

<div class="steps-box">
  <h4>When to Add an Index</h4>
  <ol>
    <li>Columns used in WHERE clauses frequently: <code>WHERE employee_id = 101</code></li>
    <li>Columns used in JOIN conditions: <code>JOIN orders ON users.id = orders.user_id</code></li>
    <li>Columns used in ORDER BY: <code>ORDER BY created_at DESC</code></li>
    <li>Composite index when you filter on multiple columns together</li>
  </ol>
</div>

<div class="mistake-box">
  <h4>When NOT to Add Indexes</h4>
  <ul>
    <li>Small tables (under 1000 rows) — full scan is fast enough</li>
    <li>Columns that change frequently — every UPDATE must also update the index</li>
    <li>Too many indexes slow down INSERT/UPDATE/DELETE operations</li>
  </ul>
</div>

<h3>How to Fix a Slow Query — Step by Step</h3>
<div class="steps-box">
  <ol>
    <li>Run <code>EXPLAIN ANALYZE SELECT ...</code> — look for "Seq Scan" (bad on big tables)</li>
    <li>Check if WHERE/JOIN columns have indexes</li>
    <li>Remove <code>SELECT *</code> — fetch only needed columns</li>
    <li>Check for N+1 in Hibernate SQL logs</li>
    <li>Add composite index if filtering on multiple columns</li>
    <li>Consider caching (Redis) for frequently-read, rarely-changed data</li>
    <li>For pagination at scale, use keyset pagination instead of OFFSET</li>
  </ol>
</div>

<h3>Deep Dive: Keyset vs Offset Pagination</h3>
<pre><code>-- OFFSET pagination (slow at scale — scans and discards rows)
SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 100000;

-- Keyset pagination (fast — uses index seek)
SELECT * FROM orders WHERE id > 100000 ORDER BY id LIMIT 20;</code></pre>

<h3>Deep Dive: Caching Strategies</h3>
<table>
  <tr><th>Pattern</th><th>How</th><th>Consistency</th></tr>
  <tr><td>Cache-Aside</td><td>App checks cache → miss → DB → write to cache</td><td>Stale data possible; set TTL</td></tr>
  <tr><td>Write-Through</td><td>Write to cache + DB synchronously</td><td>Strong but slower writes</td></tr>
  <tr><td>Cache Invalidation</td><td>Delete cache key on update</td><td>Better consistency</td></tr>
</table>

<h3>SQL Practice Queries</h3>
<pre><code>-- 1. Employees earning more than their manager
SELECT e.name FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- 2. Running total per month (window function)
SELECT order_date, amount,
       SUM(amount) OVER (PARTITION BY DATE_TRUNC('month', order_date)
                         ORDER BY order_date) AS running_total
FROM orders;

-- 3. Second highest salary
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Or with window function:
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
    FROM employees
) t WHERE rk = 2;

-- 4. Top 3 salaries per department
SELECT * FROM (
    SELECT name, department_id, salary,
           DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rk
    FROM employees
) t WHERE rk <= 3;</code></pre>

<h3>Round 2 Prep: Problem-Solving Approach Framework</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Round 2 manager won't ask "what is HashMap?" — they'll say "API is slow in production, what do you do?" You need a <strong>clear step-by-step approach</strong>, not a random answer. Practice thinking aloud using this framework.</p>
</div>

<div class="steps-box">
  <h4>Template: "How Do You Debug a Production Issue?"</h4>
  <ol>
    <li><strong>Understand scope:</strong> "When did it start? All users or specific? Which API endpoint?"</li>
    <li><strong>Check monitoring:</strong> "Look at Grafana/Dashboards — error rate, latency, CPU, memory"</li>
    <li><strong>Check logs:</strong> "Search application logs for exceptions around the incident time"</li>
    <li><strong>Check database:</strong> "Slow queries? Connection pool exhausted? Lock contention?"</li>
    <li><strong>Check recent changes:</strong> "Any deployment before the issue started?"</li>
    <li><strong>Reproduce:</strong> "Can I reproduce in staging with same input?"</li>
    <li><strong>Fix &amp; verify:</strong> "Apply fix, deploy, monitor metrics to confirm recovery"</li>
    <li><strong>Post-mortem:</strong> "Document root cause, add alerts to prevent recurrence"</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How would you approach building a REST API for employee CRUD? (Round 2 style)</div>
  <div class="answer-simple"><strong>Simple Answer:</strong> Start with requirements → design Entity and DTO → create Repository → Service layer with business logic → Controller with REST endpoints → add validation and exception handling → test with Postman.</div>
  <div class="a"><strong>Detailed Answer:</strong> 1) Clarify requirements (fields, auth needed?). 2) Employee entity with JPA annotations. 3) EmployeeRepository extends JpaRepository. 4) EmployeeService with create/read/update/delete. 5) EmployeeController with @RestController, @GetMapping/@PostMapping/@PutMapping/@DeleteMapping. 6) Request/Response DTOs to avoid exposing entity. 7) @Valid for input validation. 8) @ControllerAdvice for error handling. 9) Unit tests for service, integration tests for controller.</div>
</div>

<h3>Project Presentation Framework (15 Minutes — Round 2)</h3>
<ol>
  <li><strong>Business Context (2 min):</strong> What problem did the system solve? Who were the users?</li>
  <li><strong>Your Role (1 min):</strong> Team size, your specific responsibilities</li>
  <li><strong>Architecture (4 min):</strong> Draw diagram — clients, API gateway, services, DB, cache, queue</li>
  <li><strong>Tech Stack (2 min):</strong> Java version, Spring Boot, DB, messaging, cloud — justify choices</li>
  <li><strong>Key Challenges (4 min):</strong> 2–3 technical problems you solved (N+1, circuit breaker, performance)</li>
  <li><strong>What You'd Improve (2 min):</strong> Shows maturity — "I'd add distributed tracing", "migrate to keyset pagination"</li>
</ol>

<h3>System Design Quick Framework</h3>
<ol>
  <li><strong>Clarify (3 min):</strong> Functional requirements, scale (users, QPS, data size), read/write ratio</li>
  <li><strong>Estimate (2 min):</strong> Storage, bandwidth, QPS (peak = 3× average)</li>
  <li><strong>High-Level (5 min):</strong> Draw components — LB, app servers, DB, cache, queue</li>
  <li><strong>Deep Dive (10 min):</strong> Schema, API design, bottlenecks, scaling strategy</li>
  <li><strong>Trade-offs (5 min):</strong> SQL vs NoSQL, sync vs async, consistency vs availability</li>
</ol>
<p>Use your <code>system-design-interview.html</code> guide for detailed topic review.</p>

<div class="task-box">
  <h4>Practical Tasks — Day 7</h4>
  <ol>
    <li>Solve all 4 SQL queries above without looking at answers.</li>
    <li>Walk through: "Query takes 8 seconds" — your investigation checklist aloud.</li>
    <li>Prepare 15-minute project presentation with architecture diagram.</li>
    <li>Write 10 bullet points per resume project: scale, failures, trade-offs, your contribution.</li>
    <li>Practice one system design (URL shortener or notification system) using the framework above.</li>
  </ol>
</div>

<div class="interview-q">
  <div class="q">Q: How do you optimize a slow query?</div>
  <div class="a">First, run EXPLAIN ANALYZE to see the execution plan — look for Seq Scan on large tables. Check if appropriate indexes exist for WHERE and JOIN columns. Avoid SELECT *, functions on indexed columns, and implicit type conversions. For ORM-generated queries, enable SQL logging and look for N+1 patterns. Consider caching for frequently-read data. For pagination at scale, switch from OFFSET to keyset pagination. In one case, adding a composite index and rewriting a subquery to JOIN reduced query time from 12s to 80ms.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Difference between clustered and non-clustered index?</div>
  <div class="a">Clustered index determines physical row order in the table — only one per table (usually primary key). Non-clustered index is a separate structure with pointers to data rows — multiple allowed. In MySQL InnoDB, primary key is clustered. In PostgreSQL, indexes are all non-clustered (heap table). Querying on clustered index columns is faster since data is physically co-located.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Explain a project end-to-end.</div>
  <div class="a">Structure: Business problem → team/role → architecture diagram → tech stack with justification → 2 key challenges with your solution → metrics (throughput, latency, users) → what you'd improve. Keep it under 15 minutes. Emphasize YOUR contribution — "I designed the payment integration using Saga pattern" not "we built a system." Prepare for follow-ups: "Why Kafka?", "How did you handle failures?", "What was the hardest bug?"</div>
</div>
`
},

"day8": {
  title: "Day 8 — Mock Interview & STAR",
  html: `
<h2>Day 8 — Mock Interview, Revision &amp; Behavioral Preparation</h2>
<p class="subtitle">July 16 · Full mock rounds, STAR stories, final revision</p>

<span class="tag tag-blue">Mock Interview</span>
<span class="tag tag-green">STAR Method</span>
<span class="tag tag-yellow">HR Round</span>

<h3>Mock Interview Schedule — Match Real Infosys Format (2 Hours)</h3>
<table>
  <tr><th>Round</th><th>Duration</th><th>What to Practice</th></tr>
  <tr><td>Round 1: Technical (Base)</td><td>45–60 min</td><td>Java 8 (Lambda, Streams, Optional), HashMap/HashSet internals, Spring Boot vs MVC, annotations, Hibernate relationships</td></tr>
  <tr><td>Round 2: Technical (Manager)</td><td>45–60 min</td><td>Project walkthrough, problem-solving approach, "how would you debug X?", design a simple API</td></tr>
  <tr><td>Round 3: HR</td><td>20–30 min</td><td>CTC expectations, notice period, joining date, reason for leaving</td></tr>
</table>

<div class="simple-box">
  <h4>Adjust Your Prep Based on Real Format</h4>
  <p><strong>Spend 60% of time on Round 1 topics</strong> (Java 8 + Spring Boot basics) — this is where most candidates fail.</p>
  <p><strong>Spend 30% on Round 2</strong> — prepare 15-min project story + 3 problem-solving scenarios.</p>
  <p><strong>Spend 10% on HR</strong> — know your CTC numbers and have a clear expected range.</p>
</div>

<h3>HR Round — CTC Discussion (Round 3)</h3>

<div class="simple-box">
  <h4>What Infosys HR Actually Does</h4>
  <p>Unlike other companies with long behavioral interviews, Infosys HR round is primarily <strong>salary negotiation based on experience band</strong>. At 4 years, you fall in the 3–5 year bracket. Package is largely fixed per band — your skill may cause slight variation but experience level is the main driver.</p>
</div>

<div class="steps-box">
  <h4>Prepare These Numbers Before HR Round</h4>
  <ol>
    <li><strong>Current CTC breakdown:</strong> Fixed + Variable + Benefits (have exact numbers)</li>
    <li><strong>Expected CTC:</strong> Research Infosys 4 YOE range on AmbitionBox/Glassdoor — give a range, not a single number</li>
    <li><strong>Notice period:</strong> Exact days (30/60/90?) and whether negotiable</li>
    <li><strong>Joining date:</strong> Earliest possible date after notice period</li>
    <li><strong>Other offers:</strong> Be honest if asked — can strengthen negotiation</li>
  </ol>
</div>

<h3>STAR Method — Explained Simply</h3>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Behavioral questions ("Tell me about a time when…") need structured stories, not rambling. STAR gives you a 4-part template so your answer is clear, complete, and impressive in under 2 minutes.</p>
</div>

<div class="steps-box">
  <h4>Example STAR Story: Production Outage</h4>
  <ol>
    <li><strong>Situation (10 sec):</strong> "During peak billing on month-end, our payment API started timing out. 500+ users were affected."</li>
    <li><strong>Task (10 sec):</strong> "As the on-call developer, I needed to restore service within our 30-minute SLA."</li>
    <li><strong>Action (60 sec):</strong> "I checked application logs, found connection pool exhaustion in HikariCP. Thread dump showed 200 threads waiting for DB connections. I increased pool size temporarily, identified a missing connection close in a batch job, fixed the leak, and deployed the patch."</li>
    <li><strong>Result (20 sec):</strong> "Service restored in 22 minutes. After fix, p99 latency dropped from 8 seconds to 200ms. I added connection pool monitoring alerts to prevent recurrence."</li>
  </ol>
</div>

<h3>5 STAR Stories to Prepare</h3>
<table>
  <tr><th>Story</th><th>Theme</th><th>Key Metrics to Include</th></tr>
  <tr><td>Production outage you resolved</td><td>Problem-solving under pressure</td><td>MTTR, users affected, root cause</td></tr>
  <tr><td>Tight deadline delivery</td><td>Time management, prioritization</td><td>Days saved, features delivered</td></tr>
  <tr><td>Technical disagreement with teammate</td><td>Collaboration, communication</td><td>Outcome of discussion, compromise</td></tr>
  <tr><td>Learning new technology quickly</td><td>Learning agility</td><td>Time to productivity, what you built</td></tr>
  <tr><td>Performance improvement you led</td><td>Initiative, impact</td><td>Before/after metrics (latency, throughput)</td></tr>
</table>

<h3>90-Second "Tell Me About Yourself"</h3>
<pre><code>"I'm a Java developer with 4 years of experience building
enterprise microservices using Spring Boot. In my current role
at [Company], I [key achievement with metric]. I specialize in
[2-3 skills: REST APIs, event-driven architecture, database optimization].
I'm now looking to join Infosys because [specific reason: digital
practice, scale of projects, learning opportunities]. I'm excited
about this role because it aligns with my experience in [relevant area]."</code></pre>

<h3>Common HR Questions &amp; Strategy</h3>
<div class="interview-q">
  <div class="q">Q: Why are you leaving your current company?</div>
  <div class="a">Stay positive. Focus on growth, not complaints. "I've learned a lot in my current role, and now I'm looking for opportunities to work on larger-scale microservices projects and broaden my exposure to cloud-native architectures — which Infosys's digital practice offers."</div>
</div>

<div class="interview-q">
  <div class="q">Q: Why Infosys?</div>
  <div class="a">Research beforehand. Mention: global client exposure, mature Java/digital practice, training programs, opportunity to work on enterprise-scale systems. Be specific — not generic "good company" answers.</div>
</div>

<div class="interview-q">
  <div class="q">Q: Strengths and weaknesses?</div>
  <div class="a">Strength: tie to role — "Deep debugging skills — I systematically use thread dumps and SQL explain plans to resolve production issues." Weakness: real but with mitigation — "I sometimes dive too deep into optimization before validating requirements. I've learned to timebox investigation and deliver MVP first."</div>
</div>

<div class="interview-q">
  <div class="q">Q: Where do you see yourself in 3–5 years?</div>
  <div class="a">"A senior/lead developer or technical architect role, mentoring junior developers and owning end-to-end system design. I want to deepen my expertise in cloud-native microservices while contributing to architectural decisions."</div>
</div>

<h3>Questions to Ask the Interviewer</h3>
<ol>
  <li>"What does the team structure look like for this project — pod-based or feature-based?"</li>
  <li>"What is the current tech stack, and are there planned migrations?"</li>
  <li>"How does Infosys approach professional development and certifications?"</li>
  <li>"What are the biggest technical challenges the team is facing right now?"</li>
</ol>

<h3>Revision Checklist — Weak Areas</h3>
<ul>
  <li>Re-do any coding problem you struggled with during the week</li>
  <li>Review 50 flashcards covering: propagation types, Kafka vs RabbitMQ, CAP, HashMap internals</li>
  <li>Rehearse project presentation one final time (time it — must be under 15 min)</li>
  <li>Prepare 1-page cheatsheet: patterns, annotations, key metrics from your projects</li>
</ul>

<h3>Coding Tips for Interview Day</h3>
<ul>
  <li><strong>Clarify first:</strong> Input/output format, edge cases, constraints before coding</li>
  <li><strong>Brute force first:</strong> State naive solution, then optimize — shows structured thinking</li>
  <li><strong>Think aloud:</strong> Narrate your approach; interviewers score process</li>
  <li><strong>Test your code:</strong> Walk through with an example, including edge cases (empty, null, single element)</li>
  <li><strong>Complexity:</strong> State time and space complexity before and after optimization</li>
</ul>
`
},

"checklist": {
  title: "Interview Day Checklist",
  html: `
<h2>Interview Day Checklist — July 18</h2>
<p class="subtitle">Final preparation for Infosys interview day</p>

<h3>July 17 (Day Before) — Light Review Only</h3>
<ul>
  <li>1 hour: skim 1-page cheatsheet and flashcards</li>
  <li>Rehearse 90-second intro once</li>
  <li>Prepare clothes, resume printouts (2 copies), notebook, pen</li>
  <li>Confirm interview format (in-person / virtual), link, and timing</li>
  <li>Sleep 7+ hours — rest matters more than cramming</li>
</ul>

<h3>July 18 (Interview Day)</h3>
<table>
  <tr><th>Item</th><th>Status</th></tr>
  <tr><td>Resume matches what you'll say (dates, tech, metrics)</td><td>☐</td></tr>
  <tr><td>90-second intro practiced (not robotic)</td><td>☐</td></tr>
  <tr><td>2 resume copies printed</td><td>☐</td></tr>
  <tr><td>Pen + notebook for coding/diagrams</td><td>☐</td></tr>
  <tr><td>Government ID ready (if in-person)</td><td>☐</td></tr>
  <tr><td>Quiet space + stable internet (if virtual)</td><td>☐</td></tr>
  <tr><td>Camera/mic tested (if virtual)</td><td>☐</td></tr>
  <tr><td>Water bottle nearby</td><td>☐</td></tr>
  <tr><td>Join/login 5 minutes early</td><td>☐</td></tr>
  <tr><td>3 questions prepared for interviewer</td><td>☐</td></tr>
</table>

<h3>During the Interview</h3>
<ul>
  <li><strong>Think aloud</strong> during coding — they score your approach, not just the answer</li>
  <li><strong>Ask clarifying questions</strong> before jumping into code or design</li>
  <li><strong>Use STAR</strong> for behavioral questions — always include metrics in Results</li>
  <li><strong>Be honest</strong> — "I haven't used Kubernetes in production, but I understand pod/deployment concepts from Docker experience"</li>
  <li><strong>Project answers:</strong> Always say "I" not "we" for your specific contributions</li>
  <li><strong>If stuck:</strong> "Let me think through this step by step" — partial credit for approach</li>
  <li><strong>End strong:</strong> Ask thoughtful questions about team, tech stack, growth</li>
</ul>

<h3>High-Probability Topics — Final Review</h3>
<table>
  <tr><th>Area</th><th>Must-Know</th></tr>
  <tr><td>Java</td><td>HashMap internals, Streams, CompletableFuture, concurrency</td></tr>
  <tr><td>Spring</td><td>IoC/DI, AOP proxies, @Transactional, JPA/N+1, @ControllerAdvice</td></tr>
  <tr><td>Microservices</td><td>API Gateway, Circuit Breaker, Saga, Kafka basics, service discovery</td></tr>
  <tr><td>Security</td><td>JWT flow, OAuth2 concept, Spring Security filter chain</td></tr>
  <tr><td>Database</td><td>Joins, indexing, EXPLAIN, N+1, transaction isolation</td></tr>
  <tr><td>System Design</td><td>1 complete design with scaling, caching, DB choice justified</td></tr>
  <tr><td>Behavioral</td><td>5 STAR stories with metrics, 90-second intro, "Why Infosys"</td></tr>
</table>

<p style="margin-top:24px;color:var(--success);font-weight:600;">You've put in 8 days of focused preparation. Trust your experience, think aloud, and anchor answers in real production stories. Good luck!</p>
`
},

"trend-2026": {
  title: "2026 Microservices Trend Q&A",
  html: `
<h2>Java Microservices — 2026 Interview Trend Topics</h2>
<p class="subtitle">3–5 Years Experience · Most asked in 2026 backend interviews</p>

<span class="tag tag-blue">Core Java</span>
<span class="tag tag-green">Spring Boot</span>
<span class="tag tag-yellow">Kafka</span>
<span class="tag tag-red">Production</span>

<div class="simple-box">
  <h4>How to Use This Section</h4>
  <p>Each topic has a <strong>30-second answer</strong> (say this first) and a <strong>detailed answer</strong> (expand if interviewer asks "tell me more"). Anchor answers in your project where possible.</p>
</div>

<h3>1. ConcurrentHashMap Internals</h3>
<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Thread-safe HashMap. Multiple threads can read and write without corrupting data. Unlike Hashtable (locks entire table), ConcurrentHashMap locks at <strong>bucket level</strong> — much better concurrency.</p>
</div>
<div class="diagram">Java 8+ ConcurrentHashMap:

  Node&lt;K,V&gt;[] table (similar to HashMap)

  READ operations:  mostly lock-free (volatile reads)
  WRITE operations: CAS on first node, then synchronized on bucket head

  size() is approximate under concurrency (not exact lock)

  No null keys or null values allowed (unlike HashMap)</div>
<div class="interview-q">
  <div class="q">Q: ConcurrentHashMap vs HashMap vs Hashtable?</div>
  <div class="answer-simple"><strong>30 sec:</strong> HashMap = not thread-safe. Hashtable = thread-safe but locks entire table (slow). ConcurrentHashMap = thread-safe with bucket-level locking + CAS — best for concurrent apps.</div>
  <div class="a"><strong>Detailed:</strong> Java 8+ CHM uses synchronized on first node of bucket + CAS for inserts. Reads don't block writes in most cases. Iterator is weakly consistent (no ConcurrentModificationException). Use for shared caches, metrics maps, concurrent counters storage.</div>
</div>

<h3>2. JWT Authentication</h3>
<div class="steps-box">
  <h4>JWT Flow — Step by Step</h4>
  <ol>
    <li>Client POST /login with credentials</li>
    <li>Server validates → creates JWT (header.payload.signature)</li>
    <li>Client stores token, sends <code>Authorization: Bearer &lt;JWT&gt;</code></li>
    <li>JwtAuthenticationFilter validates signature + expiry</li>
    <li>Claims (userId, roles) → SecurityContext → controller</li>
  </ol>
</div>
<div class="interview-q">
  <div class="q">Q: How does JWT work in Spring Boot?</div>
  <div class="answer-simple"><strong>30 sec:</strong> Stateless auth. Login returns signed JWT. Every request sends Bearer token. Filter validates signature and expiry, extracts roles into SecurityContext. No server session.</div>
  <div class="a"><strong>Your project example:</strong> SecurityConfig sets STATELESS sessions. JwtAuthenticationFilter runs before UsernamePasswordAuthenticationFilter. Public: /api/auth/**. Protected: everything else. Secret from JWT_SECRET env variable.</div>
</div>

<h3>3. API Gateway</h3>
<div class="simple-box">
  <p>Single entry point for all microservices. Handles routing, auth termination, rate limiting, SSL, request aggregation. Clients never call services directly.</p>
</div>
<div class="diagram">Client → API Gateway → Order Service
                    → Payment Service
                    → User Service

Gateway responsibilities:
  • Route /api/orders/** → order-service
  • Validate JWT once (not in every service optionally)
  • Rate limiting, CORS, logging, circuit breaker at edge</div>
<div class="interview-q">
  <div class="q">Q: Why API Gateway instead of direct service calls?</div>
  <div class="answer-simple"><strong>30 sec:</strong> One URL for clients, central auth/rate-limiting/logging, hides internal topology, can aggregate multiple service calls into one response.</div>
</div>

<h3>4. Kafka Partitions</h3>
<div class="simple-box">
  <p>A Kafka <strong>topic</strong> is split into <strong>partitions</strong> for parallelism. Messages with same <strong>key</strong> go to same partition → ordering guaranteed per key.</p>
</div>
<div class="diagram">Topic: order-events (3 partitions)

  Partition 0: [evt1, evt4, evt7]  ← key=order-101 always here
  Partition 1: [evt2, evt5]
  Partition 2: [evt3, evt6]

  Consumer Group A: 3 consumers = 1 per partition (parallel read)
  More partitions = more parallelism (up to consumer count)</div>
<table>
  <tr><th>Concept</th><th>Meaning</th></tr>
  <tr><td>Partition</td><td>Ordered log slice within a topic</td></tr>
  <tr><td>Offset</td><td>Position of message in partition</td></tr>
  <tr><td>Consumer Group</td><td>Each partition consumed by one consumer in group</td></tr>
  <tr><td>Key</td><td>Same key → same partition (ordering per entity)</td></tr>
  <tr><td>Replication</td><td>Each partition replicated across brokers for fault tolerance</td></tr>
</table>

<h3>5. N+1 Problem</h3>
<div class="interview-q">
  <div class="q">Q: What is N+1 and how do you fix it?</div>
  <div class="answer-simple"><strong>30 sec:</strong> 1 query for N parent records + N queries for children = N+1 total. Fix with JOIN FETCH, @EntityGraph, or DTO projection. Detect via SQL logging.</div>
  <div class="a"><strong>Example:</strong> <code>findAll()</code> departments then <code>getEmployees()</code> each = 1+10 queries. Fix: <code>@Query("SELECT d FROM Dept d JOIN FETCH d.employees")</code> or @EntityGraph.</div>
</div>

<h3>6. Saga Pattern</h3>
<div class="simple-box">
  <p>Distributed transaction as sequence of local transactions. If step fails → run <strong>compensating transactions</strong> to undo previous steps. Accepts eventual consistency.</p>
</div>
<div class="diagram">Order Saga:
  1. Create Order     →  fail? nothing to undo
  2. Charge Payment →  fail? compensate: cancel order
  3. Reserve Stock  →  fail? compensate: refund + cancel order

Choreography = event-driven (services react to events)
Orchestration = central coordinator tells each service what to do</div>

<h3>7. Circuit Breaker</h3>
<div class="diagram">CLOSED (normal) → failures exceed threshold → OPEN (fail fast, fallback)
       ↑                                              ↓
       └──────── success ──────── HALF-OPEN (test 1 request)</div>
<div class="interview-q">
  <div class="q">Q: Circuit Breaker — why and when?</div>
  <div class="answer-simple"><strong>30 sec:</strong> When downstream service fails repeatedly, stop calling it (fail fast with fallback). Prevents thread exhaustion and cascading failures. Resilience4j in Spring Boot.</div>
</div>

<h3>8. Rate Limiting</h3>
<div class="simple-box">
  <p>Limit requests per client/IP/API key in a time window. Prevents abuse, DDoS, fair usage. Implemented at API Gateway or with Bucket4j/Redis.</p>
</div>
<table>
  <tr><th>Algorithm</th><th>How</th><th>Use</th></tr>
  <tr><td>Token Bucket</td><td>Tokens refill at fixed rate; each request consumes one</td><td>Allow bursts (most common)</td></tr>
  <tr><td>Fixed Window</td><td>Max N requests per minute</td><td>Simple but boundary spike issue</td></tr>
  <tr><td>Sliding Window</td><td>Rolling time window</td><td>Smoother than fixed window</td></tr>
</table>
<p><strong>Response when limited:</strong> HTTP 429 Too Many Requests + <code>Retry-After</code> header.</p>

<h3>9. Distributed Locking</h3>
<div class="simple-box">
  <p>When multiple service instances need exclusive access to a shared resource (e.g. process one job, update inventory). <strong>Redis (Redisson)</strong> or <strong>ZooKeeper</strong> provide distributed locks across JVMs.</p>
</div>
<div class="interview-q">
  <div class="q">Q: Why not synchronized() in microservices?</div>
  <div class="answer-simple"><strong>30 sec:</strong> synchronized only works within one JVM. Microservices run multiple instances — need distributed lock (Redis/ZooKeeper) so only one instance processes critical section globally.</div>
  <div class="a"><strong>Pattern:</strong> Acquire lock with TTL (prevent deadlock if instance crashes). Do work. Release lock. Always set lock expiry.</div>
</div>

<h3>10. Production Troubleshooting</h3>
<div class="steps-box">
  <h4>Latency / Error Spike Checklist</h4>
  <ol>
    <li>Check dashboards — which endpoint? error rate? p95?</li>
    <li>Search logs by traceId / correlation ID</li>
    <li>Recent deployment? rollback candidate?</li>
    <li>DB — slow queries, connection pool exhausted?</li>
    <li>Downstream service timeout / circuit open?</li>
    <li>Thread dump (jstack) if CPU high</li>
    <li>GC logs if pauses suspected</li>
    <li>Fix → deploy → monitor 30 min → post-mortem</li>
  </ol>
</div>

<h3>2026 Trend — Quick Reference Table</h3>
<table>
  <tr><th>Topic</th><th>30-Second Answer</th></tr>
  <tr><td>ConcurrentHashMap</td><td>Thread-safe HashMap, bucket-level locking, no null keys</td></tr>
  <tr><td>JWT</td><td>Stateless signed token, filter validates, SecurityContext holds roles</td></tr>
  <tr><td>API Gateway</td><td>Single entry, routing, auth, rate limit, hide internal services</td></tr>
  <tr><td>Kafka Partitions</td><td>Parallelism + ordering per key; consumer group assigns partitions</td></tr>
  <tr><td>N+1</td><td>1+N queries; fix JOIN FETCH / EntityGraph / DTO</td></tr>
  <tr><td>Saga</td><td>Local txs + compensating actions; choreography or orchestration</td></tr>
  <tr><td>Circuit Breaker</td><td>Fail fast when downstream down; closed/open/half-open</td></tr>
  <tr><td>Rate Limiting</td><td>Token bucket at gateway; 429 when exceeded</td></tr>
  <tr><td>Distributed Lock</td><td>Redis/ZK lock across instances; TTL mandatory</td></tr>
  <tr><td>Prod Troubleshooting</td><td>Metrics → logs → traceId → DB → thread dump → fix</td></tr>
</table>
`
},

"trend-production-api": {
  title: "Production & API Design Q&A",
  html: `
<h2>Production &amp; API Design — Manager Round Q&amp;A</h2>
<p class="subtitle">"How did you…?" questions — use STAR + metrics</p>

<div class="simple-box">
  <h4>Answer Formula</h4>
  <p><strong>Context</strong> (what system) → <strong>Problem</strong> (what broke/slow) → <strong>Your actions</strong> (numbered steps + tools) → <strong>Result</strong> (numbers: latency, MTTR, error %)</p>
</div>

<div class="interview-q">
  <div class="q">1. How did you design your APIs?</div>
  <div class="answer-simple"><strong>30 sec:</strong> Layered REST — Controller → Service → Repository. Resource URLs, DTOs for in/out, @Valid validation, consistent ErrorResponse via @RestControllerAdvice, proper HTTP codes, JWT on protected routes.</div>
  <div class="a"><strong>Detail:</strong> POST /api/auth/register returns 201. Ownership checks in service (403). Never expose entities. Version with /api/v1/ in production. OpenAPI docs for consumers.</div>
</div>

<div class="interview-q">
  <div class="q">2. How did you optimize slow APIs?</div>
  <div class="answer-simple"><strong>30 sec:</strong> Measured p95 → found DB bottleneck → added index, fixed N+1, added pagination and cache → p95 dropped from 3s to 200ms.</div>
  <div class="a"><strong>Steps:</strong> Actuator metrics → slow query log → EXPLAIN → index on filter columns → JOIN FETCH → Redis cache with TTL → verify in Grafana.</div>
</div>

<div class="interview-q">
  <div class="q">3. How did you debug latency issues?</div>
  <div class="answer-simple"><strong>30 sec:</strong> traceId in logs → APM/metrics per endpoint → DB explain → thread dump if CPU high → reproduce in staging.</div>
</div>

<div class="interview-q">
  <div class="q">4. How did you secure your APIs?</div>
  <div class="answer-simple"><strong>30 sec:</strong> JWT stateless auth, BCrypt passwords, SecurityFilterChain, ownership checks in service, secrets in env vars, @Valid input, HTTPS, rate limit on login.</div>
  <div class="a"><strong>Your demo:</strong> JwtAuthenticationFilter, SecurityConfig STATELESS, findOwnedEntry for journal authorization, JWT_SECRET from environment.</div>
</div>

<div class="interview-q">
  <div class="q">5. How did you prevent duplicate requests?</div>
  <div class="answer-simple"><strong>30 sec:</strong> Unique DB constraints (409 Conflict), Idempotency-Key header stored in Redis with TTL, Kafka consumer dedup by eventId.</div>
</div>

<div class="interview-q">
  <div class="q">6. Retries, circuit breakers, idempotency?</div>
  <div class="answer-simple"><strong>30 sec:</strong> Resilience4j retry (3x, exponential backoff on 503/timeout). Circuit breaker fail-fast + fallback. Idempotency key makes retries safe — no double charge.</div>
</div>

<div class="interview-q">
  <div class="q">7. Trace requests across microservices?</div>
  <div class="answer-simple"><strong>30 sec:</strong> X-Request-Id / traceId in MDC → propagate in Feign/WebClient headers → centralized logs (ELK) → Zipkin/Jaeger for span visualization.</div>
</div>

<div class="interview-q">
  <div class="q">8. Metrics and logs after deployment?</div>
  <div class="answer-simple"><strong>30 sec:</strong> Actuator health/metrics, p95 latency, error rate alerts, JSON logs with traceId, HikariCP pool metrics, failed login spikes, 30–60 min watch post-deploy.</div>
</div>

<div class="interview-q">
  <div class="q">9. Production incident — STAR example</div>
  <div class="answer-simple"><strong>S:</strong> Order API 503s, 200 users affected. <strong>T:</strong> On-call, 30-min SLA. <strong>A:</strong> Grafana → HikariCP pool exhausted → jstack confirmed → restart + fix connection leak + pool alert. <strong>R:</strong> Restored in 22 min, post-mortem added leak detection.</div>
</div>

<h3>What NOT to Say</h3>
<div class="warn-box">
  <ul>
    <li>"We just restarted" — without root cause analysis</li>
    <li>"The team fixed it" — say what <strong>you</strong> did</li>
    <li>No numbers — always mention latency, error %, MTTR</li>
  </ul>
</div>
`
}

};
