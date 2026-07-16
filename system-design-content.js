const TOPICS = {

"intro": {
  title: "Introduction to System Design",
  html: `
<h2>Introduction to System Design</h2>
<p class="subtitle">Foundations of designing large-scale, reliable distributed systems</p>

<h3>What is System Design?</h3>
<p>System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. In software engineering interviews, it tests your ability to translate ambiguous requirements into a scalable, reliable, and maintainable architecture.</p>

<h3>Why It Matters</h3>
<div class="card-grid">
  <div class="card"><h4>Scalability</h4><p>Handle growth in users, data, and traffic without redesigning from scratch.</p></div>
  <div class="card"><h4>Reliability</h4><p>Systems must work correctly even when components fail.</p></div>
  <div class="card"><h4>Performance</h4><p>Meet latency and throughput SLAs under peak load.</p></div>
  <div class="card"><h4>Cost Efficiency</h4><p>Balance infrastructure spend against business needs.</p></div>
</div>

<h3>The System Design Interview Framework</h3>
<ol>
  <li><strong>Clarify Requirements</strong> — Functional (what the system does) and non-functional (scale, latency, availability). Ask about read/write ratio, expected QPS, data size, and retention.</li>
  <li><strong>Back-of-the-Envelope Estimation</strong> — Calculate storage, bandwidth, and QPS. Example: 100M DAU × 10 requests/day = ~12K QPS average, ~36K peak.</li>
  <li><strong>High-Level Design</strong> — Draw major components: clients, load balancers, app servers, databases, caches, queues.</li>
  <li><strong>Deep Dive</strong> — Focus on bottlenecks: database schema, sharding, caching strategy, consistency model.</li>
  <li><strong>Identify Bottlenecks &amp; Trade-offs</strong> — Discuss single points of failure, scaling limits, and alternatives.</li>
</ol>

<h3>Key Metrics to Know</h3>
<table>
  <tr><th>Metric</th><th>Typical Target</th><th>Notes</th></tr>
  <tr><td>Availability</td><td>99.9% – 99.999%</td><td>"Three nines" = 8.76 hrs downtime/year</td></tr>
  <tr><td>Latency (p99)</td><td>&lt; 200ms for APIs</td><td>User-facing services need low tail latency</td></tr>
  <tr><td>Durability</td><td>99.999999999% (11 nines)</td><td>S3-class object storage</td></tr>
  <tr><td>Throughput</td><td>Varies by system</td><td>Measure in requests/sec or events/sec</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: How do you approach a system design interview?</div>
  <div class="a">Start by asking clarifying questions for 3–5 minutes. State assumptions explicitly. Draw a simple diagram before diving deep. Prioritize the critical path (e.g., write path for a messaging app). Always discuss trade-offs — there is no perfect design.</div>
</div>
`
},

"scalability": {
  title: "Scalability and Performance",
  html: `
<h2>Scalability and Performance</h2>
<p class="subtitle">Building systems that grow gracefully under increasing load</p>

<h3>Vertical vs Horizontal Scaling</h3>
<div class="card-grid">
  <div class="card"><h4>Vertical (Scale Up)</h4><p>Add more CPU, RAM, or disk to a single machine. Simple but has hardware limits and creates a single point of failure.</p></div>
  <div class="card"><h4>Horizontal (Scale Out)</h4><p>Add more machines. Requires load balancing, data partitioning, and distributed coordination. Preferred at scale.</p></div>
</div>

<h3>Dimensions of Scalability</h3>
<ul>
  <li><strong>User Scalability</strong> — More concurrent users (stateless app servers help).</li>
  <li><strong>Data Scalability</strong> — Growing dataset (sharding, archival, tiered storage).</li>
  <li><strong>Geographic Scalability</strong> — Multi-region deployment, CDN, edge caching.</li>
  <li><strong>Feature Scalability</strong> — Modular architecture (microservices) to add features independently.</li>
</ul>

<h3>Performance Optimization Hierarchy</h3>
<ol>
  <li><strong>Algorithm &amp; Data Structure</strong> — O(n log n) vs O(n²) matters at scale.</li>
  <li><strong>Caching</strong> — Avoid redundant computation and I/O (biggest win in practice).</li>
  <li><strong>Database Optimization</strong> — Indexes, query tuning, connection pooling.</li>
  <li><strong>Async Processing</strong> — Offload non-critical work to background workers.</li>
  <li><strong>Hardware</strong> — SSDs, more RAM, faster network — last resort.</li>
</ol>

<h3>Common Bottlenecks</h3>
<table>
  <tr><th>Layer</th><th>Bottleneck</th><th>Solution</th></tr>
  <tr><td>Application</td><td>CPU-bound logic</td><td>Optimize code, add instances</td></tr>
  <tr><td>Database</td><td>Disk I/O, lock contention</td><td>Read replicas, sharding, caching</td></tr>
  <tr><td>Network</td><td>Bandwidth, serialization</td><td>Compression, binary protocols (gRPC)</td></tr>
  <tr><td>External APIs</td><td>Rate limits</td><td>Caching, circuit breakers, bulkheads</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: Your API latency spikes during peak hours. How do you diagnose?</div>
  <div class="a">Check metrics at each layer: p50/p95/p99 latency, error rates, CPU/memory, DB slow queries, cache hit ratio, queue depth. Use distributed tracing (Jaeger/Zipkin) to find the slow span. Common causes: missing index, cache stampede, connection pool exhaustion, or downstream service degradation.</div>
</div>
`
},

"latency-throughput": {
  title: "Latency and Throughput",
  html: `
<h2>Latency and Throughput</h2>
<p class="subtitle">Understanding the fundamental performance dimensions of distributed systems</p>

<h3>Definitions</h3>
<ul>
  <li><strong>Latency</strong> — Time to complete a single operation (measured in ms). Lower is better for user experience.</li>
  <li><strong>Throughput</strong> — Number of operations completed per unit of time (req/sec, MB/sec). Higher is better for system capacity.</li>
</ul>

<h3>Latency Percentiles</h3>
<p>Always report percentiles, not averages. Averages hide tail latency problems.</p>
<table>
  <tr><th>Percentile</th><th>Meaning</th><th>Why It Matters</th></tr>
  <tr><td>p50 (median)</td><td>Half of requests are faster</td><td>Typical user experience</td></tr>
  <tr><td>p95</td><td>95% of requests are faster</td><td>Most users' worst case</td></tr>
  <tr><td>p99</td><td>99% of requests are faster</td><td>Tail latency — SLA target</td></tr>
  <tr><td>p999</td><td>99.9% of requests are faster</td><td>Worst outliers, often from GC pauses</td></tr>
</table>

<h3>Latency vs Throughput Trade-off</h3>
<div class="diagram">Throughput ↑  ←—— Trade-off ——→  Latency ↓

Batching:     Higher throughput, higher latency per item
Pipelining:   Better utilization, moderate latency increase
Caching:      Lower latency, stale data risk
Async:        Higher throughput, eventual consistency</div>

<h3>Little's Law</h3>
<p><strong>L = λ × W</strong> — Average number of items in system (L) = arrival rate (λ) × average time in system (W).</p>
<p>Example: If 1000 req/sec arrive and each takes 50ms (0.05s), the system holds 1000 × 0.05 = 50 concurrent requests. If queue grows, latency increases unless you add capacity.</p>

<h3>Reducing Latency</h3>
<ul>
  <li>Keep data close to users (CDN, edge, multi-region)</li>
  <li>Minimize network hops and serialization overhead</li>
  <li>Use connection pooling and keep-alive</li>
  <li>Parallelize independent operations</li>
  <li>Precompute and cache hot data</li>
</ul>

<div class="interview-q">
  <div class="q">Q: Can you improve both latency and throughput simultaneously?</div>
  <div class="a">Often yes, but not always free. Examples: adding caching improves both; optimizing algorithms helps both; batching improves throughput but may increase per-item latency. The key is identifying whether you're CPU-bound, I/O-bound, or network-bound and optimizing the right bottleneck.</div>
</div>
`
},

"architectural-patterns": {
  title: "Architectural Patterns",
  html: `
<h2>Architectural Patterns</h2>
<p class="subtitle">Proven structural approaches for organizing large systems</p>

<h3>Layered (N-Tier) Architecture</h3>
<p>Separates concerns into presentation, business logic, and data layers. Simple and familiar but can become a "big ball of mud" if layers leak.</p>
<div class="diagram">Client → Presentation Layer → Business Logic → Data Access → Database</div>

<h3>Microservices</h3>
<p>Decompose into small, independently deployable services. Each owns its data. Enables team autonomy and technology diversity but adds operational complexity.</p>
<span class="tag tag-green">Pros: Independent scaling, fault isolation</span>
<span class="tag tag-red">Cons: Distributed transactions, network latency, ops overhead</span>

<h3>Event-Driven Architecture</h3>
<p>Components communicate via events through a message broker. Producers emit events; consumers react asynchronously. Enables loose coupling and scalability.</p>

<h3>Serverless / FaaS</h3>
<p>Run code without managing servers (AWS Lambda, Cloud Functions). Auto-scales, pay-per-use. Cold start latency and vendor lock-in are concerns.</p>

<h3>Space-Based Architecture</h3>
<p>Process units handle requests in memory; data grid distributes state. Eliminates database bottlenecks for extreme throughput (trading systems).</p>

<h3>Pipe and Filter</h3>
<p>Data flows through a series of processing steps (filters). Used in ETL pipelines, log processing (Kafka → Spark → storage).</p>

<h3>CQRS (Command Query Responsibility Segregation)</h3>
<p>Separate read and write models. Writes go to a command model; reads come from optimized read models (often eventually consistent). Useful when read/write patterns differ significantly.</p>

<h3>Comparison Table</h3>
<table>
  <tr><th>Pattern</th><th>Best For</th><th>Complexity</th></tr>
  <tr><td>Monolith</td><td>MVPs, small teams</td><td>Low</td></tr>
  <tr><td>Microservices</td><td>Large orgs, varied scale needs</td><td>High</td></tr>
  <tr><td>Event-Driven</td><td>Real-time, decoupled workflows</td><td>Medium-High</td></tr>
  <tr><td>Serverless</td><td>Spiky workloads, low ops</td><td>Medium</td></tr>
  <tr><td>CQRS</td><td>Read-heavy, complex domains</td><td>High</td></tr>
</table>
`
},

"availability": {
  title: "Availability and Availability Patterns",
  html: `
<h2>Availability and Availability Patterns</h2>
<p class="subtitle">Keeping systems operational despite failures</p>

<h3>Availability Definition</h3>
<p><strong>Availability = Uptime / (Uptime + Downtime)</strong></p>
<table>
  <tr><th>Level</th><th>Uptime</th><th>Downtime/Year</th></tr>
  <tr><td>99% (2 nines)</td><td>99%</td><td>3.65 days</td></tr>
  <tr><td>99.9% (3 nines)</td><td>99.9%</td><td>8.76 hours</td></tr>
  <tr><td>99.99% (4 nines)</td><td>99.99%</td><td>52.6 minutes</td></tr>
  <tr><td>99.999% (5 nines)</td><td>99.999%</td><td>5.26 minutes</td></tr>
</table>

<h3>Availability Patterns</h3>

<h4>1. Active-Passive (Failover)</h4>
<p>Primary handles traffic; standby takes over on failure. Simple but standby resources are idle.</p>
<div class="diagram">[Primary] ──heartbeat──▶ [Standby]
     │                        │
     └── on failure ──────────▶ takes over</div>

<h4>2. Active-Active</h4>
<p>Multiple instances serve traffic simultaneously. Higher utilization but requires conflict resolution and session affinity handling.</p>

<h4>3. N+1 Redundancy</h4>
<p>If you need N instances to handle load, deploy N+1 so one can fail without impact.</p>

<h4>4. Bulkhead Pattern</h4>
<p>Isolate components so failure in one doesn't cascade. Example: separate thread pools per downstream service.</p>

<h4>5. Health Checks &amp; Auto-Recovery</h4>
<p>Load balancers probe endpoints; orchestrators (Kubernetes) restart unhealthy pods automatically.</p>

<h4>6. Graceful Degradation</h4>
<p>Disable non-critical features during outages. Netflix disables recommendations before video playback.</p>

<h3>Measuring Availability</h3>
<ul>
  <li><strong>MTBF</strong> (Mean Time Between Failures) — How long between failures</li>
  <li><strong>MTTR</strong> (Mean Time To Recovery) — How fast you recover</li>
  <li><strong>Availability ≈ MTBF / (MTBF + MTTR)</strong></li>
</ul>

<div class="interview-q">
  <div class="q">Q: How do you design for 99.99% availability?</div>
  <div class="a">Eliminate single points of failure: multi-AZ deployment, redundant load balancers, database replication with automatic failover, health checks, circuit breakers, graceful degradation, runbooks for incidents, and chaos engineering to validate resilience. Target MTTR under 1 minute for automated failover.</div>
</div>
`
},

"replication": {
  title: "Replication",
  html: `
<h2>Replication</h2>
<p class="subtitle">Copying data across nodes for availability, durability, and read scalability</p>

<h3>Why Replicate?</h3>
<ul>
  <li><strong>High Availability</strong> — If one node fails, others continue serving.</li>
  <li><strong>Read Scalability</strong> — Distribute read load across replicas.</li>
  <li><strong>Geographic Proximity</strong> — Place replicas near users to reduce latency.</li>
  <li><strong>Durability</strong> — Multiple copies protect against disk failure.</li>
</ul>

<h3>Replication Strategies</h3>

<h4>Leader-Follower (Primary-Replica)</h4>
<p>All writes go to the leader; followers replicate asynchronously or synchronously. Most common pattern (PostgreSQL, MySQL, MongoDB).</p>
<div class="diagram">Write → [Leader] ──replicate──▶ [Follower 1]
                  └──replicate──▶ [Follower 2]
Read  → [Follower 1] or [Follower 2]</div>

<h4>Multi-Leader</h4>
<p>Multiple nodes accept writes. Requires conflict resolution (last-write-wins, vector clocks). Used for multi-datacenter deployments (CouchDB).</p>

<h4>Leaderless (Quorum-Based)</h4>
<p>Any node accepts reads/writes. Uses quorum reads/writes for consistency (Dynamo-style: W + R &gt; N). Examples: Cassandra, DynamoDB.</p>

<h3>Sync vs Async Replication</h3>
<table>
  <tr><th>Type</th><th>Pros</th><th>Cons</th></tr>
  <tr><td>Synchronous</td><td>Strong consistency, no data loss</td><td>Higher write latency, leader blocked on slow replica</td></tr>
  <tr><td>Asynchronous</td><td>Low write latency, leader not blocked</td><td>Replication lag, potential data loss on failover</td></tr>
  <tr><td>Semi-sync</td><td>Balance: wait for 1 replica ack</td><td>Partial protection</td></tr>
</table>

<h3>Replication Lag Problems</h3>
<ul>
  <li><strong>Read-your-writes</strong> — User writes then reads stale data from replica. Fix: route reads to leader or version-check.</li>
  <li><strong>Monotonic reads</strong> — User sees time going backward. Fix: sticky sessions to same replica.</li>
  <li><strong>Causal consistency</strong> — Related events appear out of order. Fix: track causality with version vectors.</li>
</ul>

<div class="interview-q">
  <div class="q">Q: Leader dies during async replication. What happens?</div>
  <div class="a">Unreplicated writes are lost. A follower is promoted to leader, but it may be missing recent writes. Options: (1) accept data loss, (2) use semi-sync replication, (3) use consensus protocols (Raft/Paxos) that require quorum acknowledgment before committing.</div>
</div>
`
},

"consistency": {
  title: "Consistency and Consistency Patterns",
  html: `
<h2>Consistency and Consistency Patterns</h2>
<p class="subtitle">How and when all nodes agree on data state</p>

<h3>Consistency Models (Weakest → Strongest)</h3>
<ol>
  <li><strong>Eventual Consistency</strong> — Given no new writes, all replicas converge. DNS, Cassandra default.</li>
  <li><strong>Causal Consistency</strong> — Causally related operations seen in order by all nodes.</li>
  <li><strong>Sequential Consistency</strong> — All nodes see operations in the same order (not necessarily real-time).</li>
  <li><strong>Linearizability</strong> — Strongest: operations appear instantaneous and in real-time order. ZooKeeper, etcd.</li>
</ol>

<h3>Consistency Patterns</h3>

<h4>Read-After-Write Consistency</h4>
<p>After a write, subsequent reads return the written value. Route reads to the write node or use version tokens.</p>

<h4>Monotonic Reads</h4>
<p>If a user reads value V, they never see an older value in subsequent reads. Achieved via sticky routing to same replica.</p>

<h4>Consistent Prefix</h4>
<p>If a sequence of writes happens in order, every reader sees them in that order. Important for timeline feeds.</p>

<h4>Strong Consistency via Consensus</h4>
<p>Raft and Paxos ensure all nodes agree on operation order before applying. Used in etcd, Consul, CockroachDB.</p>

<h3>Two-Phase Commit (2PC)</h3>
<p>Coordinator asks all participants to prepare, then commit. Blocks on coordinator failure. Used in distributed transactions but avoided at scale.</p>

<h3>Saga Pattern</h3>
<p>Sequence of local transactions with compensating actions for rollback. Preferred over 2PC in microservices.</p>
<div class="diagram">Order Service: create order → Payment: charge → Inventory: reserve
On failure: Inventory: release → Payment: refund → Order: cancel</div>

<div class="interview-q">
  <div class="q">Q: When would you choose eventual over strong consistency?</div>
  <div class="a">When availability and partition tolerance matter more than immediate consistency: social media likes, view counts, shopping cart, DNS. Strong consistency is needed for financial transactions, inventory deduction, and leader election.</div>
</div>
`
},

"cap": {
  title: "CAP Theorem",
  html: `
<h2>CAP Theorem</h2>
<p class="subtitle">The fundamental trade-off in distributed systems</p>

<h3>The Theorem</h3>
<p>In a distributed system, you can only guarantee <strong>two out of three</strong> properties simultaneously during a network partition:</p>
<div class="card-grid">
  <div class="card"><h4>C — Consistency</h4><p>Every read receives the most recent write or an error. All nodes see the same data at the same time.</p></div>
  <div class="card"><h4>A — Availability</h4><p>Every request receives a non-error response, without guarantee it reflects the latest write.</p></div>
  <div class="card"><h4>P — Partition Tolerance</h4><p>System continues operating despite network failures between nodes. Unavoidable in distributed systems.</p></div>
</div>

<h3>During Normal Operation</h3>
<p>When there is no partition, you can have all three. CAP only forces a choice <em>during</em> a network partition.</p>

<h3>CP Systems (Consistency + Partition Tolerance)</h3>
<p>Sacrifice availability during partition — return errors rather than stale data.</p>
<ul>
  <li><strong>ZooKeeper, etcd</strong> — Consensus-based, used for coordination</li>
  <li><strong>HBase, MongoDB (with majority write concern)</strong></li>
  <li><strong>Traditional RDBMS with sync replication</strong></li>
</ul>

<h3>AP Systems (Availability + Partition Tolerance)</h3>
<p>Sacrifice consistency during partition — serve potentially stale data.</p>
<ul>
  <li><strong>Cassandra, DynamoDB</strong> — Tunable consistency</li>
  <li><strong>CouchDB, Riak</strong></li>
  <li><strong>DNS</strong> — Eventually consistent by design</li>
</ul>

<h3>Common Misconceptions</h3>
<ul>
  <li>CAP is not "pick 2 forever" — it's about behavior during partitions.</li>
  <li>CA systems don't truly exist in distributed deployments (partitions happen).</li>
  <li>Consistency in CAP means linearizability, not ACID consistency.</li>
  <li>Most systems offer tunable consistency (e.g., Cassandra QUORUM vs ONE).</li>
</ul>

<div class="interview-q">
  <div class="q">Q: Is PostgreSQL CP or CA?</div>
  <div class="a">A single-node PostgreSQL is CA (no partition between client and server). In a distributed setup with replication, it becomes CP if you require synchronous replication (reject writes when replica is unreachable) or AP-ish if async replication allows stale reads from replicas.</div>
</div>
`
},

"pacelc": {
  title: "PACELC Theorem",
  html: `
<h2>PACELC Theorem</h2>
<p class="subtitle">An extension of CAP for normal (non-partition) operation</p>

<h3>The Formulation</h3>
<p><strong>If P (Partition)</strong> → choose between <strong>A</strong> (Availability) and <strong>C</strong> (Consistency).</p>
<p><strong>Else (normal operation)</strong> → choose between <strong>L</strong> (Latency) and <strong>C</strong> (Consistency).</p>

<h3>Why PACELC Matters</h3>
<p>CAP only addresses behavior during partitions. In practice, systems spend most time in normal operation where the latency vs consistency trade-off is equally important.</p>

<h3>System Classification</h3>
<table>
  <tr><th>System</th><th>During Partition</th><th>Else</th><th>Meaning</th></tr>
  <tr><td>Dynamo / Cassandra</td><td>PA</td><td>EL</td><td>Available during partition; low latency normally, eventual consistency</td></tr>
  <tr><td>MongoDB</td><td>PC</td><td>EC (tunable)</td><td>Consistent during partition; can tune latency vs consistency</td></tr>
  <tr><td>Bigtable / HBase</td><td>PC</td><td>EL</td><td>Consistent during partition; low latency normally</td></tr>
  <tr><td>MySQL (sync rep)</td><td>PC</td><td>EC</td><td>Consistent but higher latency on writes</td></tr>
  <tr><td>PostgreSQL</td><td>PC</td><td>EC</td><td>Strong consistency, latency depends on replication mode</td></tr>
</table>

<h3>Practical Implications</h3>
<ul>
  <li><strong>PA/EL systems</strong> — Best for high-throughput, latency-sensitive apps that tolerate staleness (feeds, analytics).</li>
  <li><strong>PC/EC systems</strong> — Best for financial, inventory, or coordination where correctness trumps speed.</li>
  <li>Many modern databases let you <strong>tune per operation</strong> (e.g., DynamoDB consistent vs eventual reads).</li>
</ul>

<div class="interview-q">
  <div class="q">Q: How does PACELC help in database selection?</div>
  <div class="a">Ask: (1) What happens during a network split? (2) In normal operation, can we tolerate stale reads for lower latency? If yes → PA/EL (Cassandra). If no → PC/EC (PostgreSQL with sync rep). Most real systems pick different points for reads vs writes.</div>
</div>
`
},

"database-storage": {
  title: "Database and Storage",
  html: `
<h2>Database and Storage</h2>
<p class="subtitle">Foundations of persistent data in distributed systems</p>

<h3>Storage Hierarchy</h3>
<div class="diagram">CPU Registers    ~1 ns
L1/L2/L3 Cache   ~1-10 ns
RAM              ~100 ns
SSD (NVMe)       ~100 μs
HDD              ~10 ms
Network (same DC) ~0.5 ms
Network (cross-region) ~100 ms</div>
<p>Each level is ~10-100x slower. Design systems to minimize trips down the hierarchy.</p>

<h3>Database Types Overview</h3>
<table>
  <tr><th>Type</th><th>Examples</th><th>Best For</th></tr>
  <tr><td>Relational (SQL)</td><td>PostgreSQL, MySQL</td><td>Structured data, ACID, complex queries</td></tr>
  <tr><td>Key-Value</td><td>Redis, DynamoDB</td><td>Caching, session store, simple lookups</td></tr>
  <tr><td>Document</td><td>MongoDB, CouchDB</td><td>Flexible schemas, JSON documents</td></tr>
  <tr><td>Column-Family</td><td>Cassandra, HBase</td><td>Write-heavy, time-series, wide rows</td></tr>
  <tr><td>Graph</td><td>Neo4j, Neptune</td><td>Relationships, social networks, fraud</td></tr>
  <tr><td>Time-Series</td><td>InfluxDB, TimescaleDB</td><td>Metrics, IoT, monitoring</td></tr>
  <tr><td>Search</td><td>Elasticsearch</td><td>Full-text search, log analytics</td></tr>
  <tr><td>Object Storage</td><td>S3, GCS</td><td>Files, images, backups, data lakes</td></tr>
</table>

<h3>ACID Properties</h3>
<ul>
  <li><strong>Atomicity</strong> — All or nothing (transaction succeeds fully or rolls back).</li>
  <li><strong>Consistency</strong> — Database moves from one valid state to another (constraints enforced).</li>
  <li><strong>Isolation</strong> — Concurrent transactions don't interfere (see Isolation Levels topic).</li>
  <li><strong>Durability</strong> — Committed data survives crashes (WAL, replication).</li>
</ul>

<h3>Storage Engine Basics</h3>
<ul>
  <li><strong>B-Tree</strong> — Default in most RDBMS. Good for range queries, balanced read/write.</li>
  <li><strong>LSM-Tree</strong> — Log-Structured Merge. Better write throughput (Cassandra, RocksDB, LevelDB).</li>
  <li><strong>WAL (Write-Ahead Log)</strong> — Append-only log written before data pages. Enables crash recovery.</li>
</ul>
`
},

"relational-db": {
  title: "Relational Databases",
  html: `
<h2>Relational Databases</h2>
<p class="subtitle">Structured, ACID-compliant data stores with powerful query capabilities</p>

<h3>Core Concepts</h3>
<ul>
  <li><strong>Tables</strong> — Rows and columns with defined schema.</li>
  <li><strong>Primary Key</strong> — Unique identifier per row.</li>
  <li><strong>Foreign Key</strong> — References another table, enforces referential integrity.</li>
  <li><strong>Indexes</strong> — B-tree structures speeding up lookups (trade write speed for read speed).</li>
  <li><strong>Joins</strong> — Combine data across tables (INNER, LEFT, RIGHT, FULL).</li>
</ul>

<h3>When to Use RDBMS</h3>
<span class="tag tag-green">Structured data with relationships</span>
<span class="tag tag-green">ACID transactions required</span>
<span class="tag tag-green">Complex queries (aggregations, joins)</span>
<span class="tag tag-green">Data integrity constraints</span>

<h3>Indexing Deep Dive</h3>
<p>Without an index, a query scans every row (O(n)). With a B-tree index, lookups are O(log n).</p>
<pre><code>-- Slow: full table scan
SELECT * FROM users WHERE email = 'user@example.com';

-- Fast: index seek on email column
CREATE INDEX idx_users_email ON users(email);</code></pre>
<p><strong>Composite index:</strong> <code>CREATE INDEX idx ON orders(user_id, created_at)</code> — useful for queries filtering on both columns. Order matters: leftmost prefix rule.</p>

<h3>Normalization vs Denormalization</h3>
<table>
  <tr><th>Approach</th><th>Pros</th><th>Cons</th></tr>
  <tr><td>Normalized (3NF)</td><td>No redundancy, easy updates</td><td>More joins, slower reads</td></tr>
  <tr><td>Denormalized</td><td>Faster reads, fewer joins</td><td>Data duplication, update anomalies</td></tr>
</table>

<h3>Popular Choices</h3>
<ul>
  <li><strong>PostgreSQL</strong> — Feature-rich, JSON support, extensions (PostGIS), strong community.</li>
  <li><strong>MySQL</strong> — High read performance, widely deployed, InnoDB for ACID.</li>
  <li><strong>SQL Server</strong> — Enterprise Windows/.NET ecosystems.</li>
</ul>
`
},

"isolation-levels": {
  title: "Database Isolation Levels",
  html: `
<h2>Database Isolation Levels</h2>
<p class="subtitle">Controlling how concurrent transactions interact</p>

<h3>Concurrency Problems</h3>
<table>
  <tr><th>Problem</th><th>Description</th></tr>
  <tr><td>Dirty Read</td><td>Read uncommitted data from another transaction</td></tr>
  <tr><td>Non-Repeatable Read</td><td>Same query returns different rows (another txn committed an update)</td></tr>
  <tr><td>Phantom Read</td><td>Same query returns different row count (another txn inserted/deleted)</td></tr>
  <tr><td>Lost Update</td><td>Two transactions overwrite each other's changes</td></tr>
</table>

<h3>SQL Standard Isolation Levels</h3>
<table>
  <tr><th>Level</th><th>Dirty Read</th><th>Non-Repeatable</th><th>Phantom</th><th>Performance</th></tr>
  <tr><td>Read Uncommitted</td><td>Possible</td><td>Possible</td><td>Possible</td><td>Fastest</td></tr>
  <tr><td>Read Committed</td><td>Prevented</td><td>Possible</td><td>Possible</td><td>Default in PostgreSQL, Oracle</td></tr>
  <tr><td>Repeatable Read</td><td>Prevented</td><td>Prevented</td><td>Possible*</td><td>Default in MySQL InnoDB</td></tr>
  <tr><td>Serializable</td><td>Prevented</td><td>Prevented</td><td>Prevented</td><td>Slowest, safest</td></tr>
</table>
<p>*PostgreSQL's Repeatable Read also prevents phantoms via MVCC snapshot isolation.</p>

<h3>Implementation: MVCC</h3>
<p><strong>Multi-Version Concurrency Control</strong> — Each transaction sees a consistent snapshot. Writers create new versions; readers don't block writers. Used by PostgreSQL, MySQL InnoDB.</p>

<h3>Locking Strategies</h3>
<ul>
  <li><strong>Optimistic Locking</strong> — Check version at commit time. Good for low-contention. Use a version column.</li>
  <li><strong>Pessimistic Locking</strong> — <code>SELECT ... FOR UPDATE</code>. Locks rows upfront. Good for high-contention.</li>
</ul>

<div class="interview-q">
  <div class="q">Q: Two users try to book the last seat simultaneously. How do you prevent double booking?</div>
  <div class="a">Use Serializable isolation or pessimistic locking: <code>SELECT * FROM seats WHERE id=1 FOR UPDATE</code> within a transaction. Alternatively, use optimistic locking with a version column and retry on conflict. At scale, consider a reservation queue or atomic decrement with a CHECK constraint.</div>
</div>
`
},

"scaling-databases": {
  title: "Scaling Databases",
  html: `
<h2>Scaling Databases</h2>
<p class="subtitle">Techniques to handle growing data and query load</p>

<h3>Read Scaling</h3>
<ul>
  <li><strong>Read Replicas</strong> — Route read queries to follower nodes. Leader handles writes.</li>
  <li><strong>Connection Pooling</strong> — PgBouncer, HikariCP. Reuse connections instead of opening new ones.</li>
  <li><strong>Materialized Views</strong> — Precomputed query results, refreshed periodically.</li>
  <li><strong>Denormalization</strong> — Duplicate data to avoid expensive joins on read path.</li>
</ul>

<h3>Write Scaling</h3>
<ul>
  <li><strong>Sharding</strong> — Partition data across multiple database instances (see Sharding topic).</li>
  <li><strong>Vertical Partitioning</strong> — Split tables by column (hot columns separate).</li>
  <li><strong>Batch Writes</strong> — Group inserts/updates to reduce round trips.</li>
  <li><strong>Write-Behind Caching</strong> — Buffer writes in cache, flush to DB asynchronously.</li>
</ul>

<h3>Scaling Progression</h3>
<div class="diagram">1. Optimize queries &amp; indexes
2. Add read replicas
3. Add caching layer (Redis)
4. Vertical scaling (bigger machine)
5. Sharding / federation
6. Move to distributed DB (CockroachDB, Spanner)</div>

<h3>Database Federation</h3>
<p>Split by function: users DB, products DB, orders DB. Each can scale independently. Cross-DB joins become application-level joins or are avoided via denormalization.</p>

<h3>Challenges</h3>
<ul>
  <li>Cross-shard queries and joins are expensive</li>
  <li>Distributed transactions are hard (avoid with sagas)</li>
  <li>Rebalancing shards requires data migration</li>
  <li>Global unique IDs need special handling (Snowflake IDs, UUID v7)</li>
</ul>
`
},

"sharding": {
  title: "Sharding and Partitioning",
  html: `
<h2>Sharding and Partitioning</h2>
<p class="subtitle">Splitting data across multiple nodes for horizontal scale</p>

<h3>Partitioning vs Sharding</h3>
<ul>
  <li><strong>Partitioning</strong> — Splitting data within a single database (PostgreSQL table partitioning).</li>
  <li><strong>Sharding</strong> — Splitting data across multiple database instances (each shard is a separate DB).</li>
</ul>

<h3>Sharding Strategies</h3>

<h4>Range-Based Sharding</h4>
<p>Shard by key range: users A-M → Shard 1, N-Z → Shard 2. Simple but hotspots possible (all new users in one range).</p>

<h4>Hash-Based Sharding</h4>
<p><code>shard = hash(user_id) % num_shards</code>. Even distribution but range queries require querying all shards.</p>

<h4>Directory-Based Sharding</h4>
<p>Lookup table maps keys to shards. Flexible rebalancing but lookup table is a bottleneck.</p>

<h4>Consistent Hashing</h4>
<p>Minimizes data movement when adding/removing shards. See Consistent Hashing topic.</p>

<h3>Shard Key Selection</h3>
<p>Choose a key that:</p>
<ul>
  <li>Distributes data evenly (high cardinality)</li>
  <li>Aligns with common query patterns (avoid scatter-gather)</li>
  <li>Doesn't create hotspots (e.g., sharding by <code>created_at</code> puts all writes on one shard)</li>
</ul>

<h3>Challenges</h3>
<table>
  <tr><th>Challenge</th><th>Solution</th></tr>
  <tr><td>Cross-shard joins</td><td>Denormalize, application-level joins, or avoid</td></tr>
  <tr><td>Cross-shard transactions</td><td>Saga pattern, 2PC (avoid), or design around it</td></tr>
  <tr><td>Rebalancing</td><td>Consistent hashing, dual-write migration</td></tr>
  <tr><td>Unique IDs</td><td>Snowflake ID, UUID, or per-shard auto-increment ranges</td></tr>
  <tr><td>Hot shards</td><td>Further sub-shard, caching, or virtual nodes</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: Design sharding for Twitter's user timeline.</div>
  <div class="a">Shard tweets by <code>user_id</code> (author). For home timeline: fan-out on write — when a user tweets, push tweet ID to all followers' timeline caches (Redis). For celebrities with millions of followers, use fan-out on read instead. Hybrid approach based on follower count threshold.</div>
</div>
`
},

"nosql": {
  title: "Non-Relational Databases",
  html: `
<h2>Non-Relational Databases</h2>
<p class="subtitle">Purpose-built data stores for specific access patterns</p>

<h3>Categories</h3>

<h4>Key-Value Stores</h4>
<p>Simple get/put/delete by key. Extremely fast. Redis (in-memory), DynamoDB (managed, persistent).</p>
<p><strong>Use cases:</strong> Caching, sessions, rate limiting, feature flags.</p>

<h4>Document Stores</h4>
<p>Store JSON/BSON documents with flexible schema. MongoDB, CouchDB.</p>
<p><strong>Use cases:</strong> Content management, catalogs, user profiles with varying attributes.</p>

<h4>Column-Family (Wide-Column)</h4>
<p>Data stored in rows with dynamic columns grouped in column families. Cassandra, HBase.</p>
<p><strong>Use cases:</strong> Time-series, IoT, write-heavy workloads, messaging (Discord uses Cassandra).</p>

<h4>Graph Databases</h4>
<p>Nodes and edges with index-free adjacency. Neo4j, Amazon Neptune.</p>
<p><strong>Use cases:</strong> Social graphs, recommendation engines, fraud detection, knowledge graphs.</p>

<h3>BASE vs ACID</h3>
<p>NoSQL often follows <strong>BASE</strong>: Basically Available, Soft state, Eventually consistent.</p>

<h3>When NoSQL Wins</h3>
<ul>
  <li>Schema flexibility and rapid iteration</li>
  <li>Massive horizontal scale (billions of rows)</li>
  <li>Simple access patterns (key lookup, not complex joins)</li>
  <li>High write throughput (LSM-tree engines)</li>
  <li>Geographic distribution built-in</li>
</ul>

<h3>When SQL Still Wins</h3>
<ul>
  <li>Complex transactions across multiple entities</li>
  <li>Ad-hoc analytical queries</li>
  <li>Strong consistency requirements</li>
  <li>Mature tooling and ecosystem</li>
</ul>
`
},

"choosing-db": {
  title: "Choosing the Right Database",
  html: `
<h2>Choosing the Right Database</h2>
<p class="subtitle">A decision framework for data store selection</p>

<h3>Decision Framework</h3>
<ol>
  <li><strong>What is the data shape?</strong> — Structured tables → SQL. Documents → MongoDB. Graph → Neo4j. Time-series → InfluxDB.</li>
  <li><strong>What are the access patterns?</strong> — Key lookup → Key-Value. Range scans → SQL/B-tree. Full-text → Elasticsearch.</li>
  <li><strong>Read vs Write ratio?</strong> — Read-heavy → replicas + cache. Write-heavy → Cassandra/ScyllaDB.</li>
  <li><strong>Consistency requirements?</strong> — Strong → PostgreSQL. Eventual → DynamoDB/Cassandra.</li>
  <li><strong>Scale requirements?</strong> — Single node sufficient → PostgreSQL. Petabytes → sharded NoSQL.</li>
  <li><strong>Operational capacity?</strong> — Managed (RDS, DynamoDB) vs self-hosted.</li>
</ol>

<h3>Polyglot Persistence</h3>
<p>Use multiple databases in one system, each optimized for its job:</p>
<div class="diagram">PostgreSQL  → User accounts, orders (ACID)
Redis        → Sessions, rate limits, hot cache
Elasticsearch → Product search
S3           → Images, documents
Cassandra    → Activity feed, time-series events</div>

<h3>Quick Reference</h3>
<table>
  <tr><th>Requirement</th><th>Recommendation</th></tr>
  <tr><td>ACID transactions</td><td>PostgreSQL, MySQL</td></tr>
  <tr><td>Sub-ms reads</td><td>Redis, Memcached</td></tr>
  <tr><td>Full-text search</td><td>Elasticsearch, Algolia</td></tr>
  <tr><td>Billions of writes/day</td><td>Cassandra, ScyllaDB</td></tr>
  <tr><td>File/media storage</td><td>S3, GCS, MinIO</td></tr>
  <tr><td>Real-time analytics</td><td>ClickHouse, Druid</td></tr>
  <tr><td>Graph traversal</td><td>Neo4j, Neptune</td></tr>
  <tr><td>Managed + serverless</td><td>DynamoDB, Firestore, Aurora Serverless</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: You're building an e-commerce platform. What databases do you use?</div>
  <div class="a">PostgreSQL for orders, payments, inventory (ACID). Redis for cart sessions and product cache. Elasticsearch for product search. S3 for product images. Optionally Cassandra for clickstream/analytics. Each chosen for its access pattern, not one-size-fits-all.</div>
</div>
`
},

"caching": {
  title: "Caching",
  html: `
<h2>Caching</h2>
<p class="subtitle">The single most effective performance optimization in distributed systems</p>

<h3>Cache Placement</h3>
<table>
  <tr><th>Location</th><th>Examples</th><th>Latency</th></tr>
  <tr><td>Client-side</td><td>Browser cache, mobile app cache</td><td>~0ms</td></tr>
  <tr><td>CDN</td><td>CloudFront, Cloudflare</td><td>~10-50ms</td></tr>
  <tr><td>API Gateway</td><td>Response caching at edge</td><td>~1ms</td></tr>
  <tr><td>Application</td><td>In-process (Caffeine, Guava)</td><td>~0.01ms</td></tr>
  <tr><td>Distributed</td><td>Redis, Memcached</td><td>~1ms</td></tr>
  <tr><td>Database</td><td>Query cache, buffer pool</td><td>~0.1ms</td></tr>
</table>

<h3>Caching Strategies</h3>

<h4>Cache-Aside (Lazy Loading)</h4>
<div class="diagram">Read:  App → Cache? → miss → DB → populate cache → return
Write: App → DB → invalidate cache</div>
<p>Most common. App manages cache explicitly. Risk of stale data if invalidation fails.</p>

<h4>Read-Through</h4>
<p>Cache sits in front of DB. On miss, cache itself loads from DB. Simpler app code but cache library must support it.</p>

<h4>Write-Through</h4>
<p>Writes go to cache and DB synchronously. Consistent but higher write latency.</p>

<h4>Write-Behind (Write-Back)</h4>
<p>Writes go to cache first; async flush to DB. Fast writes but risk of data loss on cache failure.</p>

<h3>Cache Eviction Policies</h3>
<ul>
  <li><strong>LRU</strong> (Least Recently Used) — Evict oldest accessed item. Most common.</li>
  <li><strong>LFU</strong> (Least Frequently Used) — Evict least accessed item.</li>
  <li><strong>TTL</strong> (Time To Live) — Expire after fixed duration.</li>
  <li><strong>FIFO</strong> — Evict oldest inserted item.</li>
</ul>

<h3>Cache Problems</h3>
<ul>
  <li><strong>Cache Stampede</strong> — Many requests miss cache simultaneously, overwhelming DB. Fix: locking, request coalescing, probabilistic early expiration.</li>
  <li><strong>Thundering Herd</strong> — Cache expires, all requests hit DB at once. Fix: stagger TTLs, background refresh.</li>
  <li><strong>Hot Key</strong> — One key gets disproportionate traffic. Fix: local cache, read replicas of cache, key splitting.</li>
</ul>

<div class="interview-q">
  <div class="q">Q: How do you cache a leaderboard that updates frequently?</div>
  <div class="a">Use Redis Sorted Sets for O(log n) rank updates. Cache the top 100 with short TTL (30s). For full leaderboard, use longer TTL with write-through on score updates. Consider precomputing ranks asynchronously and serving stale data with a "last updated" timestamp.</div>
</div>
`
},

"async-processing": {
  title: "Asynchronous Processing",
  html: `
<h2>Asynchronous Processing</h2>
<p class="subtitle">Decoupling work from the request-response cycle</p>

<h3>Why Async?</h3>
<ul>
  <li><strong>Reduce latency</strong> — Return immediately, process in background.</li>
  <li><strong>Handle spikes</strong> — Queue absorbs burst traffic.</li>
  <li><strong>Reliability</strong> — Retry failed tasks without user waiting.</li>
  <li><strong>Decoupling</strong> — Producer doesn't need to know about consumers.</li>
</ul>

<h3>Patterns</h3>

<h4>Task Queue</h4>
<p>Producer enqueues jobs; workers pull and process. Celery (Python), Sidekiq (Ruby), Bull (Node.js).</p>
<div class="diagram">API Server → [Queue] → Worker 1
                     → Worker 2
                     → Worker 3</div>

<h4>Event-Driven</h4>
<p>Producer emits events; multiple consumers react independently. See Event-Driven Architecture topic.</p>

<h4>Scheduled Jobs</h4>
<p>Cron jobs, Quartz, or cloud schedulers (AWS EventBridge) for periodic tasks: reports, cleanup, aggregation.</p>

<h4>Change Data Capture (CDC)</h4>
<p>Stream database changes to downstream systems. Debezium reads DB transaction log → Kafka → consumers.</p>

<h3>Idempotency</h3>
<p>Async systems must handle duplicate delivery. Design operations to be idempotent:</p>
<ul>
  <li>Use unique idempotency keys per operation</li>
  <li>Check "already processed" before executing</li>
  <li>Use upserts instead of blind inserts</li>
</ul>

<h3>Backpressure</h3>
<p>When consumers can't keep up with producers:</p>
<ul>
  <li>Rate limit producers</li>
  <li>Scale consumers horizontally</li>
  <li>Drop/dead-letter low-priority messages</li>
  <li>Apply backpressure at the queue level (max queue size)</li>
</ul>
`
},

"message-queues": {
  title: "Message Queues (Kafka, RabbitMQ)",
  html: `
<h2>Message Queues (Kafka, RabbitMQ)</h2>
<p class="subtitle">Reliable asynchronous communication between services</p>

<h3>Message Queue vs Stream</h3>
<table>
  <tr><th>Feature</th><th>Message Queue (RabbitMQ)</th><th>Event Stream (Kafka)</th></tr>
  <tr><td>Model</td><td>Queue: message consumed once</td><td>Log: messages persisted, replayable</td></tr>
  <tr><td>Ordering</td><td>Per-queue FIFO</td><td>Per-partition ordering</td></tr>
  <tr><td>Consumers</td><td>Competing consumers</td><td>Consumer groups, multiple independent readers</td></tr>
  <tr><td>Retention</td><td>Deleted after ack</td><td>Configurable (days/weeks)</td></tr>
  <tr><td>Throughput</td><td>~10-50K msg/sec</td><td>~1M+ msg/sec per cluster</td></tr>
  <tr><td>Best for</td><td>Task distribution, RPC async</td><td>Event sourcing, log aggregation, stream processing</td></tr>
</table>

<h3>Apache Kafka</h3>
<ul>
  <li><strong>Topics</strong> partitioned into ordered, immutable logs.</li>
  <li><strong>Producers</strong> write to partitions (key-based routing).</li>
  <li><strong>Consumer Groups</strong> — each partition consumed by one consumer in the group.</li>
  <li><strong>Replication</strong> — Each partition replicated across brokers (ISR — In-Sync Replicas).</li>
  <li><strong>Use cases:</strong> Activity feeds, log pipelines, event sourcing, real-time analytics (Kafka Streams, Flink).</li>
</ul>

<h3>RabbitMQ</h3>
<ul>
  <li><strong>Exchanges</strong> route messages to queues (direct, fanout, topic, headers).</li>
  <li><strong>Queues</strong> buffer messages for consumers.</li>
  <li><strong>Acknowledgments</strong> — Consumer acks after processing; unacked messages requeued on failure.</li>
  <li><strong>Use cases:</strong> Task queues, microservice communication, request-reply patterns.</li>
</ul>

<h3>Delivery Guarantees</h3>
<table>
  <tr><th>Guarantee</th><th>Meaning</th><th>How</th></tr>
  <tr><td>At-most-once</td><td>May lose messages</td><td>Fire and forget, no ack</td></tr>
  <tr><td>At-least-once</td><td>May duplicate messages</td><td>Ack after processing + retry (default)</td></tr>
  <tr><td>Exactly-once</td><td>No loss, no duplicates</td><td>Idempotent consumers + transactional writes (Kafka EOS)</td></tr>
</table>

<h3>Dead Letter Queue (DLQ)</h3>
<p>Messages that fail processing after max retries go to a DLQ for manual inspection and replay.</p>

<div class="interview-q">
  <div class="q">Q: Kafka vs RabbitMQ for an order processing system?</div>
  <div class="a">Kafka if you need event replay, multiple consumers reading the same events (analytics, notifications, inventory), high throughput, and audit trail. RabbitMQ if you need task distribution (one worker processes each order), complex routing, lower latency per message, and simpler ops for moderate scale.</div>
</div>
`
},

"monolith-vs-micro": {
  title: "Monolithic vs. Microservices",
  html: `
<h2>Monolithic vs. Microservices Architecture</h2>
<p class="subtitle">Choosing the right level of service decomposition</p>

<h3>Monolithic Architecture</h3>
<p>Single deployable unit containing all functionality.</p>
<span class="tag tag-green">Simple deployment</span>
<span class="tag tag-green">Easy debugging</span>
<span class="tag tag-green">No network overhead</span>
<span class="tag tag-green">ACID transactions across modules</span>
<span class="tag tag-red">Scaling requires scaling everything</span>
<span class="tag tag-red">Technology lock-in</span>
<span class="tag tag-red">Large codebase becomes unwieldy</span>

<h3>Microservices Architecture</h3>
<p>System decomposed into small, independently deployable services, each owning its data.</p>
<span class="tag tag-green">Independent scaling &amp; deployment</span>
<span class="tag tag-green">Team autonomy</span>
<span class="tag tag-green">Technology diversity</span>
<span class="tag tag-green">Fault isolation</span>
<span class="tag tag-red">Distributed system complexity</span>
<span class="tag tag-red">Network latency &amp; failures</span>
<span class="tag tag-red">Data consistency challenges</span>
<span class="tag tag-red">Operational overhead (K8s, service mesh)</span>

<h3>When to Start Monolith</h3>
<ul>
  <li>MVP or early-stage product</li>
  <li>Small team (&lt; 10 engineers)</li>
  <li>Unclear domain boundaries</li>
  <li>Need to iterate fast</li>
</ul>

<h3>When to Extract Microservices</h3>
<ul>
  <li>Clear domain boundaries emerge (DDD bounded contexts)</li>
  <li>Different components need different scaling (e.g., search vs checkout)</li>
  <li>Team grows and needs independent deployment</li>
  <li>Specific component needs different technology</li>
</ul>

<h3>Modular Monolith (Best of Both)</h3>
<p>Single deployment but with strict module boundaries. Modules communicate via interfaces, not direct DB access. Extract to microservice when a module needs independent scaling.</p>

<h3>Microservices Patterns</h3>
<ul>
  <li><strong>Database per Service</strong> — No shared databases between services.</li>
  <li><strong>API Composition</strong> — Gateway aggregates data from multiple services.</li>
  <li><strong>Saga</strong> — Distributed transaction via choreographed or orchestrated steps.</li>
  <li><strong>Strangler Fig</strong> — Gradually replace monolith by routing traffic to new services.</li>
</ul>
`
},

"event-driven": {
  title: "Event-Driven Architecture",
  html: `
<h2>Event-Driven Architecture</h2>
<p class="subtitle">Systems that react to events in real-time</p>

<h3>Core Concepts</h3>
<ul>
  <li><strong>Event</strong> — A significant change in state (OrderPlaced, UserRegistered).</li>
  <li><strong>Event Producer</strong> — Emits events without knowing consumers.</li>
  <li><strong>Event Consumer</strong> — Reacts to events independently.</li>
  <li><strong>Event Broker</strong> — Middleware routing events (Kafka, SNS/SQS, RabbitMQ).</li>
</ul>

<h3>Event Notification vs Event-Carried State Transfer</h3>
<table>
  <tr><th>Pattern</th><th>Event Contains</th><th>Consumer Action</th></tr>
  <tr><td>Event Notification</td><td>Minimal data (ID, type)</td><td>Calls producer's API for details</td></tr>
  <tr><td>Event-Carried State Transfer</td><td>Full state snapshot</td><td>Processes locally, no callback needed</td></tr>
</table>

<h3>Event Sourcing</h3>
<p>Store state changes as a sequence of events, not current state. Current state is derived by replaying events.</p>
<div class="diagram">Events: [AccountCreated] → [MoneyDeposited: $100] → [MoneyWithdrawn: $30]
Current Balance = replay events = $70</div>
<p><strong>Pros:</strong> Complete audit trail, temporal queries, easy event replay.<br>
<strong>Cons:</strong> Complex queries need materialized views (CQRS), event schema evolution.</p>

<h3>Choreography vs Orchestration</h3>
<div class="card-grid">
  <div class="card"><h4>Choreography</h4><p>Services react to events independently. No central coordinator. Decentralized but hard to track flow.</p></div>
  <div class="card"><h4>Orchestration</h4><p>Central orchestrator directs the workflow. Easier to monitor and debug but orchestrator is a SPOF.</p></div>
</div>

<h3>Real-World Example: E-Commerce Order</h3>
<div class="diagram">OrderService → OrderPlaced → PaymentService (charge)
                              → InventoryService (reserve)
                              → NotificationService (email)
                              → AnalyticsService (track)</div>
`
},

"api-gateway-bff": {
  title: "API Gateway and BFF",
  html: `
<h2>API Gateway and Backend for Frontend (BFF)</h2>
<p class="subtitle">Entry points that manage, aggregate, and optimize API traffic</p>

<h3>API Gateway</h3>
<p>Single entry point for all client requests. Routes to appropriate backend services.</p>

<h4>Responsibilities</h4>
<ul>
  <li><strong>Routing</strong> — Direct requests to correct microservice.</li>
  <li><strong>Authentication/Authorization</strong> — Validate JWT, API keys, OAuth tokens.</li>
  <li><strong>Rate Limiting</strong> — Protect backends from abuse (token bucket, sliding window).</li>
  <li><strong>SSL Termination</strong> — Handle HTTPS at the edge.</li>
  <li><strong>Request/Response Transformation</strong> — Protocol translation, field mapping.</li>
  <li><strong>Caching</strong> — Cache responses at the gateway level.</li>
  <li><strong>Load Balancing</strong> — Distribute across service instances.</li>
  <li><strong>Circuit Breaking</strong> — Fail fast when backends are unhealthy.</li>
</ul>

<h4>Popular Gateways</h4>
<p>Kong, AWS API Gateway, NGINX, Envoy, Spring Cloud Gateway, Traefik</p>

<h3>Backend for Frontend (BFF)</h3>
<p>A dedicated backend tailored to a specific client type (web, mobile, IoT). Solves the problem of one API not fitting all clients.</p>
<div class="diagram">Mobile App → Mobile BFF → [User Svc, Order Svc, Product Svc]
Web App    → Web BFF    → [User Svc, Order Svc, Product Svc, Analytics Svc]</div>

<h3>Gateway vs BFF</h3>
<table>
  <tr><th>Aspect</th><th>API Gateway</th><th>BFF</th></tr>
  <tr><td>Scope</td><td>Infrastructure (cross-cutting)</td><td>Application (client-specific)</td></tr>
  <tr><td>Logic</td><td>Routing, auth, rate limiting</td><td>Aggregation, formatting, client logic</td></tr>
  <tr><td>Ownership</td><td>Platform/DevOps team</td><td>Feature/client team</td></tr>
  <tr><td>Count</td><td>Usually one per environment</td><td>One per client type</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: Why not let mobile apps call microservices directly?</div>
  <div class="a">Multiple round trips drain battery and increase latency on mobile networks. Mobile needs different data shape (less fields, optimized images). BFF aggregates multiple service calls into one response, handles mobile-specific auth, and shields clients from backend changes.</div>
</div>
`
},

"rest-graphql-grpc": {
  title: "REST, GraphQL, and gRPC",
  html: `
<h2>REST, GraphQL, and gRPC</h2>
<p class="subtitle">Comparing the dominant API communication paradigms</p>

<h3>REST (Representational State Transfer)</h3>
<ul>
  <li>Resource-oriented: <code>GET /users/123</code>, <code>POST /orders</code></li>
  <li>Uses HTTP methods (GET, POST, PUT, PATCH, DELETE)</li>
  <li>Stateless — each request contains all needed information</li>
  <li>Typically JSON over HTTP/1.1 or HTTP/2</li>
</ul>
<span class="tag tag-green">Simple, cacheable, widely understood</span>
<span class="tag tag-red">Over-fetching, under-fetching, multiple round trips</span>

<h3>GraphQL</h3>
<ul>
  <li>Single endpoint: <code>POST /graphql</code></li>
  <li>Client specifies exactly what fields it needs</li>
  <li>Strongly typed schema with introspection</li>
  <li>Supports queries, mutations, and subscriptions</li>
</ul>
<pre><code>query {
  user(id: "123") {
    name
    orders(last: 5) { id, total, items { name } }
  }
}</code></pre>
<span class="tag tag-green">No over/under-fetching, single request</span>
<span class="tag tag-red">Complexity, caching harder, N+1 query risk</span>

<h3>gRPC</h3>
<ul>
  <li>RPC framework using Protocol Buffers (binary serialization)</li>
  <li>HTTP/2 based — multiplexing, header compression</li>
  <li>Strongly typed via .proto files, code generation</li>
  <li>Supports unary, server streaming, client streaming, bidirectional streaming</li>
</ul>
<span class="tag tag-green">High performance, streaming, strong contracts</span>
<span class="tag tag-red">Not browser-friendly, steeper learning curve</span>

<h3>Comparison</h3>
<table>
  <tr><th>Aspect</th><th>REST</th><th>GraphQL</th><th>gRPC</th></tr>
  <tr><td>Protocol</td><td>HTTP/1.1, HTTP/2</td><td>HTTP POST</td><td>HTTP/2</td></tr>
  <tr><td>Format</td><td>JSON (typically)</td><td>JSON</td><td>Protobuf (binary)</td></tr>
  <tr><td>Contract</td><td>OpenAPI/Swagger</td><td>GraphQL Schema</td><td>.proto files</td></tr>
  <tr><td>Browser</td><td>Native</td><td>Native</td><td>Needs gRPC-Web proxy</td></tr>
  <tr><td>Streaming</td><td>SSE, WebSocket</td><td>Subscriptions</td><td>Native bidirectional</td></tr>
  <tr><td>Best for</td><td>Public APIs, CRUD</td><td>Complex UIs, mobile</td><td>Service-to-service, microservices</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: When would you choose gRPC over REST?</div>
  <div class="a">Internal service-to-service communication where performance matters: low latency, high throughput, streaming data (log tailing, real-time feeds). REST is better for public-facing APIs, browser clients, and when human readability of payloads matters.</div>
</div>
`
},

"realtime-comms": {
  title: "Long Polling, WebSockets, SSE",
  html: `
<h2>Long Polling, WebSockets, Server-Sent Events</h2>
<p class="subtitle">Techniques for real-time server-to-client communication</p>

<h3>Short Polling</h3>
<p>Client repeatedly requests server at intervals. Simple but wasteful — many empty responses, high latency.</p>
<div class="diagram">Client: GET /updates → (no data) → wait 5s → GET /updates → (no data) → ...</div>

<h3>Long Polling</h3>
<p>Client sends request; server holds it open until data is available or timeout. Client immediately sends new request after response.</p>
<div class="diagram">Client: GET /updates → server holds → (30s later) → response with data
Client: GET /updates → server holds → ...</div>
<p><strong>Pros:</strong> Works over HTTP, firewall-friendly.<br><strong>Cons:</strong> Connection overhead, server holds many open connections.</p>

<h3>Server-Sent Events (SSE)</h3>
<p>Server pushes events over a single long-lived HTTP connection. Unidirectional (server → client only).</p>
<pre><code>// Server response (text/event-stream)
data: {"type": "message", "text": "Hello"}

data: {"type": "typing", "user": "Alice"}</code></pre>
<p><strong>Pros:</strong> Auto-reconnect, simple API (EventSource), works over HTTP.<br><strong>Cons:</strong> One-directional, limited to ~6 connections per domain in browsers.</p>

<h3>WebSockets</h3>
<p>Full-duplex, persistent TCP connection. Both client and server can send messages anytime.</p>
<div class="diagram">Client ←──WebSocket──→ Server
  (bidirectional, persistent connection)</div>
<p><strong>Pros:</strong> Lowest latency, bidirectional, efficient for high-frequency updates.<br><strong>Cons:</strong> More complex, proxy/load balancer configuration, no automatic reconnect.</p>

<h3>Comparison</h3>
<table>
  <tr><th>Feature</th><th>Long Polling</th><th>SSE</th><th>WebSocket</th></tr>
  <tr><td>Direction</td><td>Client-initiated</td><td>Server → Client</td><td>Bidirectional</td></tr>
  <tr><td>Protocol</td><td>HTTP</td><td>HTTP</td><td>WS (upgrade from HTTP)</td></tr>
  <tr><td>Reconnection</td><td>Manual</td><td>Automatic</td><td>Manual</td></tr>
  <tr><td>Overhead</td><td>High (per poll)</td><td>Low</td><td>Lowest</td></tr>
  <tr><td>Use case</td><td>Fallback</td><td>Live feeds, notifications</td><td>Chat, gaming, collaboration</td></tr>
</table>

<div class="interview-q">
  <div class="q">Q: Design real-time notifications for a web app.</div>
  <div class="a">Use SSE for one-way notifications (new messages, alerts) — simple, auto-reconnect. Fall back to long polling for older browsers. Use WebSockets only if bidirectional communication is needed (chat). Scale via Redis Pub/Sub: when an event occurs, publish to Redis; all server instances subscribed deliver to their connected SSE/WebSocket clients.</div>
</div>
`
},

"design-patterns": {
  title: "Design Patterns",
  html: `
<h2>Design Patterns in Distributed Systems</h2>
<p class="subtitle">Reusable solutions to common distributed system problems</p>

<h3>Creational / Structural</h3>
<ul>
  <li><strong>Sidecar</strong> — Attach helper container to main app (Envoy proxy alongside service).</li>
  <li><strong>Ambassador</strong> — Proxy that handles networking for the main container (service mesh).</li>
  <li><strong>Adapter</strong> — Normalize interface between incompatible services.</li>
</ul>

<h3>Behavioral / Resilience</h3>
<ul>
  <li><strong>Circuit Breaker</strong> — Stop calling failing service. See dedicated topic.</li>
  <li><strong>Retry with Exponential Backoff</strong> — Retry transient failures with increasing delays + jitter.</li>
  <li><strong>Bulkhead</strong> — Isolate resources so one failure doesn't sink the ship.</li>
  <li><strong>Timeout</strong> — Don't wait forever; fail fast and free resources.</li>
  <li><strong>Fallback</strong> — Return degraded response when primary path fails.</li>
</ul>

<h3>Data Patterns</h3>
<ul>
  <li><strong>CQRS</strong> — Separate read and write models.</li>
  <li><strong>Event Sourcing</strong> — Store events, derive state.</li>
  <li><strong>Saga</strong> — Distributed transactions via compensating actions.</li>
  <li><strong>Database per Service</strong> — Each microservice owns its data.</li>
  <li><strong>Materialized View</strong> — Precomputed read-optimized data from write model.</li>
</ul>

<h3>Communication Patterns</h3>
<ul>
  <li><strong>Request-Response</strong> — Synchronous HTTP/gRPC.</li>
  <li><strong>Publish-Subscribe</strong> — One-to-many event distribution.</li>
  <li><strong>Request-Reply over Queue</strong> — Async RPC via message queue.</li>
  <li><strong>Strangler Fig</strong> — Incrementally replace legacy system.</li>
</ul>

<h3>Deployment Patterns</h3>
<ul>
  <li><strong>Blue-Green</strong> — Two identical environments; switch traffic instantly.</li>
  <li><strong>Canary</strong> — Route small % of traffic to new version, monitor, gradually increase.</li>
  <li><strong>Rolling Update</strong> — Replace instances one at a time.</li>
  <li><strong>Feature Flags</strong> — Toggle features without deployment.</li>
</ul>
`
},

"resiliency": {
  title: "Resiliency",
  html: `
<h2>Resiliency</h2>
<p class="subtitle">Building systems that withstand and recover from failures</p>

<h3>Failure Modes in Distributed Systems</h3>
<ul>
  <li><strong>Hardware failure</strong> — Disk crash, network card failure, power outage.</li>
  <li><strong>Software bugs</strong> — Memory leaks, infinite loops, unhandled exceptions.</li>
  <li><strong>Network partitions</strong> — Services can't communicate (CAP theorem).</li>
  <li><strong>Cascading failures</strong> — One failure triggers others (thundering herd).</li>
  <li><strong>Dependency failure</strong> — Third-party API down, database unreachable.</li>
  <li><strong>Human error</strong> — Misconfiguration, bad deployment, accidental deletion.</li>
</ul>

<h3>Resiliency Principles</h3>
<ol>
  <li><strong>Assume failure will happen</strong> — Design for it, don't hope it won't.</li>
  <li><strong>Fail fast</strong> — Detect failures quickly with timeouts and health checks.</li>
  <li><strong>Limit blast radius</strong> — Bulkheads, circuit breakers, graceful degradation.</li>
  <li><strong>Automate recovery</strong> — Self-healing (K8s restarts), auto-failover.</li>
  <li><strong>Test failures</strong> — Chaos engineering (Chaos Monkey, Gremlin).</li>
</ol>

<h3>Chaos Engineering</h3>
<p>Intentionally inject failures in production to validate resilience:</p>
<ul>
  <li>Randomly terminate instances (Netflix Chaos Monkey)</li>
  <li>Inject network latency and packet loss</li>
  <li>Fill disk space, exhaust memory</li>
  <li>Simulate dependency failures</li>
</ul>

<h3>Redundancy Levels</h3>
<table>
  <tr><th>Level</th><th>Description</th><th>Availability</th></tr>
  <tr><td>No redundancy</td><td>Single instance</td><td>~99%</td></tr>
  <tr><td>Active-Passive</td><td>Standby ready</td><td>~99.9%</td></tr>
  <tr><td>Active-Active (multi-AZ)</td><td>Multiple zones</td><td>~99.99%</td></tr>
  <tr><td>Multi-Region</td><td>Geographic redundancy</td><td>~99.999%</td></tr>
</table>
`
},

"designing-resiliency": {
  title: "Designing for Resiliency",
  html: `
<h2>Designing for Resiliency</h2>
<p class="subtitle">Practical strategies to build fault-tolerant systems</p>

<h3>Defense in Depth</h3>
<div class="diagram">Layer 1: Input validation &amp; rate limiting
Layer 2: Timeouts on all external calls
Layer 3: Circuit breakers on dependencies
Layer 4: Bulkheads (resource isolation)
Layer 5: Graceful degradation
Layer 6: Retry with backoff (transient failures only)
Layer 7: Monitoring, alerting, runbooks</div>

<h3>Timeout Strategy</h3>
<p>Set timeouts at every level. Rule of thumb: client timeout &gt; server timeout &gt; DB timeout.</p>
<pre><code>Client timeout:     5000ms
API server timeout:   3000ms
DB query timeout:     1000ms
External API timeout: 2000ms</code></pre>

<h3>Retry Best Practices</h3>
<ul>
  <li>Only retry <strong>idempotent</strong> operations and <strong>transient</strong> errors (5xx, timeout).</li>
  <li>Use <strong>exponential backoff</strong>: 100ms → 200ms → 400ms → 800ms.</li>
  <li>Add <strong>jitter</strong> (random delay) to prevent synchronized retries.</li>
  <li>Set <strong>max retries</strong> (typically 3) and <strong>max total timeout</strong>.</li>
  <li>Never retry 4xx errors (client fault).</li>
</ul>

<h3>Graceful Degradation Examples</h3>
<table>
  <tr><th>Service</th><th>Full Experience</th><th>Degraded Experience</th></tr>
  <tr><td>Amazon</td><td>Personalized recommendations</td><td>Generic bestsellers</td></tr>
  <tr><td>Netflix</td><td>4K streaming</td><td>SD streaming</td></tr>
  <tr><td>Twitter</td><td>Real-time timeline</td><td>Cached/stale timeline</td></tr>
  <tr><td>Uber</td><td>Surge pricing</td><td>Flat rate pricing</td></tr>
</table>

<h3>Health Check Design</h3>
<ul>
  <li><strong>Liveness</strong> — Is the process running? (Restart if not)</li>
  <li><strong>Readiness</strong> — Can it accept traffic? (Remove from LB if not)</li>
  <li><strong>Deep health</strong> — Check dependencies (DB, cache). Use for monitoring, not LB routing (risky).</li>
</ul>

<div class="interview-q">
  <div class="q">Q: A downstream payment service is slow (5s response). Your checkout page is timing out. Fix?</div>
  <div class="a">(1) Set aggressive timeout on payment call (2s). (2) Circuit breaker opens after N failures. (3) Queue payment for async processing — show "payment processing" to user. (4) Bulkhead: dedicated thread pool for payment calls. (5) Cache payment method validation. (6) Alert on-call when circuit opens.</div>
</div>
`
},

"load-balancers": {
  title: "Load Balancers",
  html: `
<h2>Load Balancers</h2>
<p class="subtitle">Distributing traffic across multiple servers for scale and availability</p>

<h3>Types</h3>

<h4>Layer 4 (Transport Layer)</h4>
<p>Routes based on IP and port (TCP/UDP). Fast, no content inspection. Examples: AWS NLB, HAProxy (L4 mode).</p>

<h4>Layer 7 (Application Layer)</h4>
<p>Routes based on HTTP content: URL path, headers, cookies. Can do SSL termination, caching, request rewriting. Examples: AWS ALB, NGINX, Envoy.</p>

<h3>Load Balancing Algorithms</h3>
<table>
  <tr><th>Algorithm</th><th>How It Works</th><th>Best For</th></tr>
  <tr><td>Round Robin</td><td>Sequential rotation</td><td>Equal capacity servers</td></tr>
  <tr><td>Weighted Round Robin</td><td>Proportional to server capacity</td><td>Mixed capacity servers</td></tr>
  <tr><td>Least Connections</td><td>Route to fewest active connections</td><td>Long-lived connections</td></tr>
  <tr><td>Least Response Time</td><td>Route to fastest responder</td><td>Variable load per server</td></tr>
  <tr><td>IP Hash</td><td>Hash client IP to server</td><td>Session affinity (sticky)</td></tr>
  <tr><td>Consistent Hash</td><td>Hash to ring, minimal redistribution</td><td>Cache servers, distributed systems</td></tr>
</table>

<h3>Architecture Patterns</h3>
<div class="diagram">DNS LB → [LB 1] → [Server A, B, C]
              → [LB 2] → [Server D, E, F]

Client → CDN → LB → App Servers → LB → DB Replicas</div>

<h3>Global Server Load Balancing (GSLB)</h3>
<p>DNS-based routing to nearest/geographically optimal datacenter. Uses health checks, latency, and geo-proximity. AWS Route 53, Cloudflare Load Balancing.</p>

<h3>Key Considerations</h3>
<ul>
  <li><strong>Health Checks</strong> — HTTP /health endpoint, TCP connect check.</li>
  <li><strong>Session Affinity</strong> — Sticky sessions via cookie or IP hash. Avoid if possible (stateless is better).</li>
  <li><strong>SSL Termination</strong> — Decrypt at LB, forward HTTP internally (or re-encrypt with mTLS).</li>
  <li><strong>Connection Draining</strong> — Gracefully remove server from pool during deployment.</li>
</ul>
`
},

"circuit-breakers": {
  title: "Circuit Breakers",
  html: `
<h2>Circuit Breakers</h2>
<p class="subtitle">Preventing cascading failures by failing fast</p>

<h3>The Problem</h3>
<p>Service A calls Service B. B is slow/down. A's threads block waiting, exhausting its thread pool. A becomes unresponsive. Services calling A also fail. <strong>Cascading failure.</strong></p>

<h3>The Solution</h3>
<p>Circuit breaker wraps calls to a dependency. When failures exceed a threshold, the circuit <strong>opens</strong> and calls fail immediately without waiting.</p>

<h3>States</h3>
<div class="diagram">     failures &lt; threshold
[CLOSED] ──────────────────────▶ normal operation
     │
     │ failures ≥ threshold
     ▼
[OPEN] ──── fail fast (return error/fallback)
     │
     │ after timeout period
     ▼
[HALF-OPEN] ──── allow 1 test request
     │                    │
     │ success            │ failure
     ▼                    ▼
  [CLOSED]            [OPEN]</div>

<h3>Configuration</h3>
<ul>
  <li><strong>Failure threshold</strong> — e.g., 50% failures in last 10 requests</li>
  <li><strong>Open duration</strong> — e.g., 30 seconds before half-open test</li>
  <li><strong>Half-open requests</strong> — e.g., allow 3 test requests</li>
  <li><strong>Timeout</strong> — max wait per call (e.g., 2 seconds)</li>
</ul>

<h3>Implementations</h3>
<p>Resilience4j (Java), Polly (.NET), Hystrix (deprecated, Netflix), Istio service mesh (Envoy filters).</p>

<h3>Circuit Breaker + Fallback</h3>
<pre><code>// Pseudocode
result = circuitBreaker.execute(
  () => paymentService.charge(order),
  () => queuePaymentForLater(order)  // fallback
);</code></pre>

<h3>Monitoring</h3>
<p>Track circuit state transitions, failure rates, and fallback invocations. Alert when circuits open in production.</p>

<div class="interview-q">
  <div class="q">Q: Circuit breaker vs retry — when to use which?</div>
  <div class="a">Retry for transient failures (network blip, 503). Circuit breaker when the dependency is consistently failing — stop wasting resources retrying. Use both together: retry 2-3 times with backoff, then let circuit breaker open if failure rate is high. Never retry through an open circuit.</div>
</div>
`
},

"system-essentials": {
  title: "System Essentials",
  html: `
<h2>System Essentials</h2>
<p class="subtitle">Core building blocks every system designer must know</p>

<h3>Proxies</h3>
<ul>
  <li><strong>Forward Proxy</strong> — Sits in front of clients (VPN, corporate proxy). Client knows about it.</li>
  <li><strong>Reverse Proxy</strong> — Sits in front of servers (NGINX, HAProxy). Client doesn't know backend exists.</li>
</ul>

<h3>DNS (Domain Name System)</h3>
<p>Translates domain names to IP addresses. Hierarchical: Root → TLD (.com) → Authoritative.</p>
<ul>
  <li><strong>DNS caching</strong> — TTL-based, reduces lookup latency.</li>
  <li><strong>DNS load balancing</strong> — Return multiple A records, round-robin.</li>
  <li><strong>GeoDNS</strong> — Return IP based on user's geographic location.</li>
</ul>

<h3>CDN (Content Delivery Network)</h3>
<p>Distribute static content (images, JS, CSS, videos) to edge servers worldwide.</p>
<div class="diagram">User (Tokyo) → Edge Server (Tokyo) → cache hit → fast!
User (Tokyo) → Edge Server (Tokyo) → cache miss → Origin (US) → cache &amp; serve</div>
<p>Providers: CloudFront, Cloudflare, Akamai, Fastly.</p>

<h3>Rate Limiting</h3>
<table>
  <tr><th>Algorithm</th><th>How It Works</th></tr>
  <tr><td>Token Bucket</td><td>Tokens added at fixed rate; each request consumes one. Allows bursts.</td></tr>
  <tr><td>Leaky Bucket</td><td>Requests processed at fixed rate; overflow dropped. Smooth output.</td></tr>
  <tr><td>Fixed Window</td><td>Count requests per time window (e.g., 100/min). Simple but boundary burst issue.</td></tr>
  <tr><td>Sliding Window</td><td>Rolling window. More accurate, slightly more complex.</td></tr>
</table>

<h3>Idempotency</h3>
<p>Operation produces the same result regardless of how many times it's executed. Critical for retries and message queues. Implement via idempotency keys (UUID sent with request, stored and checked).</p>

<h3>Unique ID Generation</h3>
<ul>
  <li><strong>UUID v4</strong> — Random, 128-bit. No coordination needed but not sortable.</li>
  <li><strong>UUID v7</strong> — Time-ordered UUID. Sortable, good for DB indexes.</li>
  <li><strong>Snowflake ID</strong> — 64-bit: timestamp + machine ID + sequence. Twitter's approach. Sortable, unique, high throughput.</li>
  <li><strong>Auto-increment</strong> — Simple but doesn't work across shards without ranges.</li>
</ul>

<h3>Heartbeats &amp; Gossip Protocol</h3>
<p>Nodes periodically send heartbeats to detect failures. Gossip protocol: nodes randomly exchange state info, eventually converging — scalable membership detection (Cassandra, Consul).</p>
`
},

"consistent-hashing": {
  title: "Consistent Hashing",
  html: `
<h2>Consistent Hashing</h2>
<p class="subtitle">Minimal data redistribution when nodes are added or removed</p>

<h3>The Problem with Simple Hashing</h3>
<p><code>server = hash(key) % N</code> — When N changes (add/remove server), nearly ALL keys remap. Massive cache invalidation and data migration.</p>

<h3>Consistent Hashing Solution</h3>
<p>Both servers and keys are mapped onto a hash ring (0 to 2³²-1). A key is assigned to the first server encountered clockwise on the ring.</p>
<div class="diagram">         Hash Ring (0 ─────────────── 2³²)
              S1(位置25%)
         K1 ●──────→ S1
    S3(75%) ●         ● S2(50%)
         K2 ●──────→ S2
              K3 ●──────────→ S3</div>

<h3>Adding/Removing Nodes</h3>
<p>Only keys between the added/removed node and its predecessor need to move. With N nodes and K keys, only K/N keys move on average (vs K with modulo hashing).</p>

<h3>Virtual Nodes (Vnodes)</h3>
<p>Each physical server is mapped to multiple points on the ring. Ensures even distribution even with few physical nodes.</p>
<p>Example: 3 physical servers × 150 vnodes each = 450 points on ring. If one server fails, its 150 vnodes redistribute evenly across remaining servers.</p>

<h3>Applications</h3>
<ul>
  <li><strong>Distributed caches</strong> — Memcached, Redis Cluster</li>
  <li><strong>CDNs</strong> — Request routing to edge servers</li>
  <li><strong>Distributed databases</strong> — Cassandra, DynamoDB partition routing</li>
  <li><strong>Load balancers</strong> — Request affinity with minimal redistribution</li>
</ul>

<div class="interview-q">
  <div class="q">Q: Explain consistent hashing and why virtual nodes matter.</div>
  <div class="a">Consistent hashing maps keys and servers on a ring. Keys go to the next server clockwise. When a server is added/removed, only adjacent key ranges move. Virtual nodes solve uneven distribution: mapping each physical server to many ring positions ensures balanced load, especially with heterogeneous server capacities (more vnodes for bigger servers).</div>
</div>
`
},

"networking": {
  title: "Networking and Communication",
  html: `
<h2>Networking and Communication</h2>
<p class="subtitle">How services discover, connect, and communicate</p>

<h3>OSI / TCP/IP Model (Interview-Relevant Layers)</h3>
<table>
  <tr><th>Layer</th><th>Protocols</th><th>Relevance</th></tr>
  <tr><td>Application (L7)</td><td>HTTP, gRPC, DNS, WebSocket</td><td>API design, load balancing</td></tr>
  <tr><td>Transport (L4)</td><td>TCP, UDP</td><td>Connection management, reliability</td></tr>
  <tr><td>Network (L3)</td><td>IP, ICMP</td><td>Routing, subnets, VPCs</td></tr>
</table>

<h3>TCP vs UDP</h3>
<table>
  <tr><th>Feature</th><th>TCP</th><th>UDP</th></tr>
  <tr><td>Reliability</td><td>Guaranteed delivery, ordering</td><td>Best effort, no ordering</td></tr>
  <tr><td>Connection</td><td>Connection-oriented (3-way handshake)</td><td>Connectionless</td></tr>
  <tr><td>Speed</td><td>Slower (overhead)</td><td>Faster</td></tr>
  <tr><td>Use cases</td><td>HTTP, DB connections, file transfer</td><td>DNS, video streaming, gaming, VoIP</td></tr>
</table>

<h3>HTTP Versions</h3>
<ul>
  <li><strong>HTTP/1.1</strong> — Persistent connections, but head-of-line blocking (one request per connection at a time, or pipelined).</li>
  <li><strong>HTTP/2</strong> — Multiplexing (many requests on one connection), header compression, server push. Binary framing.</li>
  <li><strong>HTTP/3</strong> — Built on QUIC (UDP). Eliminates TCP head-of-line blocking. Faster connection setup.</li>
</ul>

<h3>Service Discovery</h3>
<ul>
  <li><strong>DNS-based</strong> — Service registered in DNS (simple, TTL-based).</li>
  <li><strong>Service Registry</strong> — Consul, etcd, ZooKeeper. Services register on startup, deregister on shutdown.</li>
  <li><strong>Kubernetes DNS</strong> — Built-in service discovery via cluster DNS (service-name.namespace.svc.cluster.local).</li>
</ul>

<h3>Service Mesh</h3>
<p>Infrastructure layer handling service-to-service communication. Sidecar proxy (Envoy) per pod handles mTLS, retries, circuit breaking, observability.</p>
<p>Istio, Linkerd — decouple communication concerns from application code.</p>

<h3>Network Security</h3>
<ul>
  <li><strong>TLS/mTLS</strong> — Encrypt data in transit. mTLS: both client and server authenticate.</li>
  <li><strong>VPC</strong> — Isolated network within cloud. Private subnets for databases.</li>
  <li><strong>Security Groups / NACLs</strong> — Firewall rules controlling inbound/outbound traffic.</li>
  <li><strong>API Authentication</strong> — JWT, OAuth 2.0, API keys, mTLS for service-to-service.</li>
</ul>
`
},

"real-world": {
  title: "Real-World Architectures & Engineering",
  html: `
<h2>Real-World Architectures &amp; Engineering</h2>
<p class="subtitle">How top companies solve system design at scale</p>

<h3>URL Shortener (bit.ly / TinyURL)</h3>
<div class="diagram">Client → LB → App Servers → Redis (cache) → DB (Cassandra/PostgreSQL)
Key: Base62 encoding of auto-increment ID or hash
Read-heavy (100:1) → aggressive caching
Capacity: 500M URLs × 500 bytes = 250GB storage</div>
<p><strong>Key decisions:</strong> Custom vs hash-based short URL, TTL for expired links, analytics pipeline for click tracking.</p>

<h3>Twitter / X Timeline</h3>
<ul>
  <li><strong>Fan-out on write</strong> — Tweet pushed to all followers' timeline caches. Fast reads, slow writes for celebrities.</li>
  <li><strong>Fan-out on read</strong> — Timeline assembled at read time. Slow reads, fast writes.</li>
  <li><strong>Hybrid</strong> — Fan-out on write for normal users; fan-out on read for users with &gt;1M followers.</li>
  <li>Storage: Cassandra for tweets, Redis for timelines, Manhattan for user data.</li>
</ul>

<h3>WhatsApp / Messenger</h3>
<ul>
  <li>WebSocket connections for real-time messaging.</li>
  <li>Message queue for offline delivery (store-and-forward).</li>
  <li>End-to-end encryption — server can't read messages.</li>
  <li>Connection servers handle millions of concurrent WebSockets.</li>
  <li>Cassandra for message storage (write-heavy, time-ordered).</li>
</ul>

<h3>Netflix</h3>
<ul>
  <li><strong>Microservices</strong> — 1000+ services on AWS.</li>
  <li><strong>EVCache</strong> — Memcached-based caching layer.</li>
  <li><strong>Cassandra</strong> — Viewing history, preferences.</li>
  <li><strong>Chaos Monkey</strong> — Random instance termination to test resilience.</li>
  <li><strong>Open Connect</strong> — Custom CDN for video delivery.</li>
  <li><strong>Recommendation engine</strong> — Separate ML pipeline, precomputed.</li>
</ul>

<h3>Uber</h3>
<ul>
  <li><strong>Geospatial indexing</strong> — Google S2 geometry library for matching riders/drivers.</li>
  <li><strong>Dispatch service</strong> — Real-time matching with geofencing.</li>
  <li><strong>Ringpop</strong> — Consistent hashing for shard assignment.</li>
  <li><strong>Schemaless</strong> — Custom DB on MySQL for trip data.</li>
  <li><strong>Kafka</strong> — Event streaming for trip events, analytics.</li>
</ul>

<h3>Design Approach for Interviews</h3>
<ol>
  <li><strong>Requirements</strong> — "Design Twitter" → clarify: read-heavy? fan-out? media support? DAU?</li>
  <li><strong>Estimate</strong> — 300M DAU, 200M tweets/day, ~2.3K write QPS, ~230K read QPS.</li>
  <li><strong>API</strong> — Define endpoints: POST /tweets, GET /timeline, POST /follow.</li>
  <li><strong>Data model</strong> — Users, Tweets, Follows, Timeline (denormalized).</li>
  <li><strong>High-level</strong> — LB → API → Cache → DB → Queue → Workers.</li>
  <li><strong>Deep dive</strong> — Timeline generation (fan-out), celebrity problem, media storage (S3).</li>
  <li><strong>Scale</strong> — Sharding by user_id, caching hot timelines, CDN for media.</li>
</ol>

<div class="interview-q">
  <div class="q">Q: Design a rate limiter for an API gateway.</div>
  <div class="a">Use Redis with sliding window counter. Key: <code>rate:{user_id}:{window}</code>. On each request: increment counter, check against limit. For distributed: Redis Cluster with consistent hashing. Algorithms: token bucket for burst tolerance. Return 429 with Retry-After header. Consider different tiers (free: 100/min, pro: 1000/min). Scale: Redis handles ~100K ops/sec; shard by user_id for higher.</div>
</div>
`
},

};
