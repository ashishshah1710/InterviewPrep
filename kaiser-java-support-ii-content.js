const TOPICS = {

overview: {
  title: 'Bootcamp Overview',
  html: `
<h2>Java Support II — Interview Bootcamp</h2>
<p class="subtitle">Kaiser Permanente (via Mindtel Global) · Production Support Focus</p>

<span class="tag tag-kaiser">Healthcare</span>
<span class="tag tag-blue">Java</span>
<span class="tag tag-green">SQL</span>
<span class="tag tag-yellow">Kafka</span>
<span class="tag tag-red">Splunk</span>

<div class="simple-box">
  <h4>What This Role Actually Is</h4>
  <p><strong>Java Support II</strong> is a <em>production engineer</em> role — not a greenfield developer role. You are the person who:</p>
  <ul>
    <li>Answers the bridge call when eligibility sync is 45 minutes behind</li>
    <li>Reads thread dumps while DBAs check blocking sessions</li>
    <li>Writes Splunk queries to prove the error spike started at 09:12 UTC</li>
    <li>Updates JIRA every 30 minutes so leadership knows member impact</li>
    <li>Coordinates app team, DBA, network, and Kafka ops until stable</li>
  </ul>
</div>

<h3>JD → Your Prep Map</h3>
<table>
  <tr><th>JD Requirement</th><th>What They Test</th><th>Bootcamp Section</th></tr>
  <tr><td>Java production diagnostics</td><td>Thread dumps, OOM, pool exhaustion, common exceptions</td><td>Java Diagnostics</td></tr>
  <tr><td>SQL hands-on</td><td>Data validation, joins, slow queries, blocking</td><td>SQL Support</td></tr>
  <tr><td>Apache Kafka</td><td>Consumer lag, rebalance, poison messages</td><td>Kafka Operations</td></tr>
  <tr><td>Splunk</td><td>SPL queries, error tracing, alerts</td><td>Splunk SPL</td></tr>
  <tr><td>JIRA / Rally + team coordination</td><td>Prioritization, incident comms, STAR stories</td><td>JIRA & Behavioral</td></tr>
</table>

<div class="analogy-box">
  <h4>Think of Yourself as an ER Triage Nurse — for Systems</h4>
  <p>Patients (services) arrive in crisis. You don't perform surgery (write new features) — you <strong>stabilize first</strong>, identify the critical injury (root cause), call the right specialist (DBA, network), and document everything for the chart (JIRA + RCA).</p>
</div>

<div class="task-box">
  <h4>How to Use This Guide (5 Days)</h4>
  <ol>
    <li><strong>Morning:</strong> Study one tech pillar (Java → SQL → Kafka → Splunk → Integration)</li>
    <li><strong>Afternoon:</strong> Run scenario simulations out loud — record yourself</li>
    <li><strong>Evening:</strong> 30-min review of cheatsheet commands + one STAR story</li>
  </ol>
</div>

<div class="answer-simple">
  <strong>30-Second Elevator Pitch:</strong> "I'm a hands-on Java production support engineer with 4 years triaging microservices at Amdocs — Splunk for log analysis, Kafka pipeline monitoring, SQL data validation, and JIRA-driven incident coordination including onsite go-live cutovers."
</div>
`
},

roadmap: {
  title: '5-Day Roadmap',
  html: `
<h2>5-Day Study Schedule</h2>
<p class="subtitle">Day 1 → Day 5 · Morning deep study · Afternoon scenario practice</p>

<div class="card-grid">
  <div class="card"><h4>Day 1</h4><p>Java production diagnostics — jstack, exceptions, first 5 minutes</p></div>
  <div class="card"><h4>Day 2</h4><p>SQL validation, joins, locks, slow query triage</p></div>
  <div class="card"><h4>Day 3</h4><p>Kafka architecture, consumer lag, poison pills</p></div>
  <div class="card"><h4>Day 4</h4><p>Splunk SPL — errors, correlation IDs, alerts</p></div>
  <div class="card"><h4>Day 5</h4><p>JIRA workflow, 3 scenarios, STAR behavioral mock</p></div>
</div>

<h3>Day 1 — Java Production Diagnostics</h3>
<table>
  <tr><th>Session</th><th>Focus</th><th>Exit Criteria</th></tr>
  <tr><td>AM (2h)</td><td>JVM triage: jstack, jcmd, jstat, kubectl logs/exec</td><td>Memorize Detect→Triage→Mitigate→Resolve→Document</td></tr>
  <tr><td>PM (2h)</td><td>Thread dumps: BLOCKED, deadlock, pool exhaustion</td><td>Read 2 sample dumps and narrate findings</td></tr>
  <tr><td>PM (1h)</td><td>Exception playbook: OOM, JDBC, Kafka timeout</td><td>Cause → 3 actions → bridge-call script</td></tr>
</table>

<h3>Day 2 — SQL Data Validation & Performance</h3>
<table>
  <tr><th>Session</th><th>Focus</th><th>Exit Criteria</th></tr>
  <tr><td>AM (2h)</td><td>Row counts, duplicates, orphans, stale timestamps</td><td>3 validation queries for eligibility schema</td></tr>
  <tr><td>PM (2h)</td><td>INNER/LEFT/LATERAL/FULL OUTER joins</td><td>Explain "wrong plan" triage with SQL first</td></tr>
  <tr><td>PM (1h)</td><td>pg_stat_activity, blocking PIDs, EXPLAIN</td><td>Narrate API-slow → pool → DB lock chain</td></tr>
</table>

<h3>Day 3 — Kafka Operations</h3>
<table>
  <tr><th>Session</th><th>Focus</th><th>Exit Criteria</th></tr>
  <tr><td>AM (2h)</td><td>Topics, partitions, consumer groups, offsets, lag</td><td>30-second whiteboard architecture</td></tr>
  <tr><td>PM (2h)</td><td>consumer-groups --describe, rebalance, poison pill</td><td>Lag +45k triage: Splunk + CLI + DB</td></tr>
  <tr><td>PM (1h)</td><td>Healthcare: PHI-safe logging, member_id partition key</td><td>Why lag ≠ just slow UX in healthcare</td></tr>
</table>

<h3>Day 4 — Splunk SPL & Observability</h3>
<table>
  <tr><th>Session</th><th>Focus</th><th>Exit Criteria</th></tr>
  <tr><td>AM (2h)</td><td>index, timechart, stats, rex, correlationId</td><td>Trace 8 SPL templates from memory</td></tr>
  <tr><td>PM (2h)</td><td>Alerts: error spike, JDBC, Kafka, deploy correlation</td><td>Draft alert + JIRA comment with search URL</td></tr>
  <tr><td>PM (1h)</td><td>Cross-stack timeline: Java + SQL + Kafka in one incident</td><td>10-line incident timeline exercise</td></tr>
</table>

<h3>Day 5 — Integration & Mock Interview</h3>
<table>
  <tr><th>Session</th><th>Focus</th><th>Exit Criteria</th></tr>
  <tr><td>AM (2h)</td><td>Sev 1–4, JIRA comments, prioritization framework</td><td>Practice incident comment template once</td></tr>
  <tr><td>PM (2h)</td><td>3 healthcare scenarios + STAR behavioral</td><td>45-min recorded mock interview</td></tr>
  <tr><td>PM (1h)</td><td>Map Amdocs experience → Kaiser language</td><td>3 STAR stories ready</td></tr>
</table>

<div class="diagram">Daily Rhythm (All 5 Days)
────────────────────────────────────────
08:00–10:00  Deep study (cheatsheet section of the day)
10:15–12:15  Hands-on / flashcards / narrate out loud
14:00–16:00  Scenario practice + Splunk/Kafka/SQL drills
16:15–17:00  Review + 5 bullet "what I'd say on bridge call"
────────────────────────────────────────</div>
`
},

'triage-framework': {
  title: 'Production Triage Framework',
  html: `
<h2>Detect → Triage → Mitigate → Resolve → Document</h2>
<p class="subtitle">The framework every Support II answer should follow</p>

<div class="diagram">  DETECT          TRIAGE           MITIGATE          RESOLVE          DOCUMENT
     │               │                 │                 │                │
  Alert /        Severity +        Rollback /        Root cause       JIRA timeline
  Splunk /       blast radius +    scale /           fix (code,       + Splunk URL
  user report    recent changes    circuit breaker   config, data)    + RCA 48h</div>

<h3>Phase 1: DETECT</h3>
<div class="steps-box">
  <h4>What triggers you?</h4>
  <ol>
    <li><strong>Splunk alert</strong> — ERROR count &gt; threshold in 5 min</li>
    <li><strong>PagerDuty / on-call page</strong> — SLO breach, pod crash loop</li>
    <li><strong>User report</strong> — help desk, provider portal, member app</li>
    <li><strong>Kafka lag dashboard</strong> — consumer group behind by N messages</li>
  </ol>
</div>

<h3>Phase 2: TRIAGE (First 5 Minutes)</h3>
<table>
  <tr><th>Question</th><th>Why It Matters</th></tr>
  <tr><td>What service / env / region?</td><td>Blast radius — one pod or entire west region?</td></tr>
  <tr><td>When did it start?</td><td>Correlate with deploy, batch job, cert expiry</td></tr>
  <tr><td>Who is impacted?</td><td>Members, providers, internal only?</td></tr>
  <tr><td>Is there a duplicate incident?</td><td>Don't spin up second bridge for same root cause</td></tr>
  <tr><td>What severity?</td><td>Sev-1 = patient care risk; Sev-2 = major degradation</td></tr>
</table>

<h3>Phase 3: MITIGATE (Stabilize Before Root Cause)</h3>
<ul>
  <li><strong>Rollback</strong> last deploy if error spike aligns with release</li>
  <li><strong>Scale</strong> consumers or app pods if capacity issue</li>
  <li><strong>Circuit breaker</strong> — stop calling failing downstream</li>
  <li><strong>Feature flag off</strong> — disable non-critical path</li>
  <li><strong>Rate limit</strong> — protect DB from retry storm</li>
  <li><strong>Restart pod</strong> — only if OOM/metaclass leak with known pattern (not blind restart loop)</li>
</ul>

<h3>Phase 4: RESOLVE</h3>
<p>Fix the actual root cause: bad query, missing index, poison Kafka message, cert rotation, config drift, data corruption in staging feed.</p>

<h3>Phase 5: DOCUMENT</h3>
<p>Update JIRA every 30 min during Sev-2. Attach Splunk saved searches, thread dump file names, Kafka lag screenshots. Schedule blameless RCA within 48 hours.</p>

<div class="answer-simple">
  <strong>Bridge Call Opener (Memorize):</strong> "I'm declaring Sev-2 for [service]. Member impact: [specific]. Mitigation in progress: [action]. Next update in 30 minutes or sooner if stabilized."
</div>

<div class="mistake-box">
  <h4>Level I vs Level II — What Interviewers Listen For</h4>
  <ul>
    <li><strong>Level I:</strong> "I restarted the pod and errors went away."</li>
    <li><strong>Level II:</strong> "I correlated Splunk ERROR spike with Kafka lag +45k, thread dump showed Hikari pool exhaustion, scaled consumers 4→8, engaged DBA on blocking PID 28491 per runbook — documenting timeline in JIRA INC-12345."</li>
  </ul>
</div>
`
},

checklist: {
  title: 'Day-Before Checklist',
  html: `
<h2>Interview Day — 30-Minute Review</h2>
<p class="subtitle">Run through this the morning of your interview</p>

<div class="task-box">
  <h4>Technical (15 min)</h4>
  <ul>
    <li>☐ Thread dump scan order: BLOCKED → deadlock → pool exhaustion → kafka-consumer stuck</li>
    <li>☐ 5 Splunk queries: error spike, exception stats, correlationId, JDBC, Kafka rebalance</li>
    <li>☐ Kafka: <code>kafka-consumer-groups --describe</code> — lag per partition</li>
    <li>☐ SQL: blocking sessions query + orphan row check</li>
    <li>☐ One-liner: Detect → Triage → Mitigate → Resolve → Document</li>
  </ul>
</div>

<div class="task-box">
  <h4>Behavioral (10 min)</h4>
  <ul>
    <li>☐ STAR story: led production incident / bridge coordination</li>
    <li>☐ STAR story: prioritized conflicting tickets under pressure</li>
    <li>☐ STAR story: onsite go-live / UAT coordination (your Mexico trip)</li>
  </ul>
</div>

<div class="task-box">
  <h4>Healthcare Context (5 min)</h4>
  <ul>
    <li>☐ No PHI in JIRA titles — use internal correlation IDs</li>
    <li>☐ Eligibility lag = stale plan data for members — real patient impact</li>
    <li>☐ Ask cross-domain: portal + provider tools + billing</li>
  </ul>
</div>

<div class="interview-q">
  <div class="q">Questions to Ask the Interviewer</div>
  <div class="a">
    <ul>
      <li>What does the on-call rotation look like for Support II?</li>
      <li>Which Splunk indexes/sourcetypes do your Java services log to?</li>
      <li>How do you handle Kafka consumer lag alerts today?</li>
      <li>What's the split between JIRA incidents vs Rally planned work?</li>
    </ul>
  </div>
</div>
`
},

day1: {
  title: 'Day 1: Java Diagnostics',
  html: `
<h2>Day 1 — Java Production Diagnostics</h2>
<p class="subtitle">Goal: Explain high-CPU / hung Java pod triage in under 2 minutes</p>

<h3>Morning Study</h3>
<ol>
  <li>Read <strong>First 5 Minutes</strong> and <strong>JVM Commands</strong> topics</li>
  <li>Memorize thread dump scan order</li>
  <li>Review top 8 exceptions table</li>
</ol>

<h3>Afternoon Practice</h3>
<ol>
  <li>Google "sample Java thread dump deadlock" — practice narrating findings</li>
  <li>Run through <strong>Scenario: High-CPU Java Freeze</strong> out loud</li>
  <li>Write 3 bullet "bridge call" script for OOM incident</li>
</ol>

<div class="simple-box">
  <h4>Key Commands to Drill</h4>
<pre><code>jstack &lt;pid&gt;                    # thread dump
jstat -gcutil &lt;pid&gt; 1000 10     # GC every 1s
kubectl exec -it &lt;pod&gt; -- jstack 1
curl localhost:8080/actuator/health</code></pre>
</div>

<div class="answer-simple">
  <strong>Day 1 Exit Test:</strong> Interviewer says "Pod CPU at 95% for 20 minutes." You respond with ordered steps: confirm blast radius → Splunk errors → thread dump × 3 → identify RUNNABLE hot stack or BLOCKED pool → mitigate.
</div>
`
},

day2: {
  title: 'Day 2: SQL Support',
  html: `
<h2>Day 2 — SQL Data Validation & Performance</h2>
<p class="subtitle">Goal: Walk through "wrong eligibility plan" with SQL before blaming Java</p>

<h3>Morning Study</h3>
<ol>
  <li>SQL workflow: read-only first, count + max(timestamp) + sample rows</li>
  <li>Validation queries: duplicates, orphans, staging vs prod counts</li>
  <li>Join patterns: LATERAL for latest eligibility record</li>
</ol>

<h3>Afternoon Practice</h3>
<ol>
  <li>Scenario: <strong>SQL Data Mismatch</strong> — full triage script</li>
  <li>Practice EXPLAIN ANALYZE narration</li>
  <li>Write blocking-session query from memory</li>
</ol>

<div class="analogy-box">
  <h4>SQL Is Your Source of Truth</h4>
  <p>Java logs tell you <em>what failed</em>. SQL tells you <em>whether the data is wrong</em>. In healthcare support, half of "API bugs" are stale ETL feeds or duplicate rows in staging — not code defects.</p>
</div>
`
},

day3: {
  title: 'Day 3: Kafka Operations',
  html: `
<h2>Day 3 — Apache Kafka Operations</h2>
<p class="subtitle">Goal: Triage consumer lag +45k on patient-eligibility topic</p>

<h3>Morning Study</h3>
<ol>
  <li>Whiteboard: producer → topic/partition → consumer group → offset → lag</li>
  <li>CLI: <code>kafka-consumer-groups --describe</code></li>
  <li>Lag symptom table: all partitions vs one partition vs rebalance loop</li>
</ol>

<h3>Afternoon Practice</h3>
<ol>
  <li>Scenario: <strong>Kafka Patient Data Lag</strong> — full timeline</li>
  <li>Explain poison pill message handling</li>
  <li>Practice 30-second Kafka architecture answer</li>
</ol>

<div class="answer-simple">
  <strong>30-Second Kafka Answer:</strong> "Producers append to partitioned topics replicated across brokers. Consumer groups assign partitions — max one consumer per partition. Offsets track read position. Lag is distance from log end. Growing lag means consumers can't keep up — usually slow DB writes, poison message, or under-scaled consumers."
</div>
`
},

day4: {
  title: 'Day 4: Splunk SPL',
  html: `
<h2>Day 4 — Splunk Observability</h2>
<p class="subtitle">Goal: Write 3 SPL queries live — error spike, trace request, JDBC exhaustion</p>

<h3>Morning Study</h3>
<ol>
  <li>SPL building blocks: index, sourcetype, earliest, timechart, stats, rex</li>
  <li>8 query templates in Splunk section</li>
  <li>correlationId tracing across microservices</li>
</ol>

<h3>Afternoon Practice</h3>
<ol>
  <li>Build 10-line incident timeline using only Splunk + Kafka + SQL evidence</li>
  <li>Draft one alert: ERROR &gt; 50 in 5 min → JIRA Sev-2</li>
  <li>Practice explaining <code>transaction</code> command for session grouping</li>
</ol>

<div class="mistake-box">
  <h4>Splunk Mistakes in Interviews</h4>
  <ul>
    <li>Unbounded search — always use <code>earliest=-1h</code></li>
    <li>Searching wrong index — ask which index prod Java logs use</li>
    <li>Logging PHI — use hashed member correlation ID only</li>
  </ul>
</div>
`
},

day5: {
  title: 'Day 5: Mock Interview',
  html: `
<h2>Day 5 — Full Simulation</h2>
<p class="subtitle">45-minute mock: technical scenario + behavioral + SQL live question</p>

<h3>Morning</h3>
<ol>
  <li>JIRA severity framework + incident comment template</li>
  <li>Ticket prioritization: safety → patient impact → breadth → duration</li>
</ol>

<h3>Afternoon Mock Structure</h3>
<table>
  <tr><th>Segment</th><th>Duration</th><th>Topic</th></tr>
  <tr><td>Intro + resume</td><td>5 min</td><td>Your elevator pitch</td></tr>
  <tr><td>Technical scenario 1</td><td>10 min</td><td>Kafka lag (healthcare)</td></tr>
  <tr><td>Technical scenario 2</td><td>10 min</td><td>Java high-CPU freeze</td></tr>
  <tr><td>SQL drill</td><td>5 min</td><td>Validate stale eligibility data</td></tr>
  <tr><td>Behavioral STAR × 2</td><td>10 min</td><td>Incident leadership + prioritization</td></tr>
  <tr><td>Your questions</td><td>5 min</td><td>On-call, Splunk, tooling</td></tr>
</table>

<div class="task-box">
  <h4>Map Your Amdocs Experience → Kaiser Language</h4>
  <ul>
    <li><strong>USCC go-live Mexico</strong> → "Led production cutover, 15+ incidents, cross-functional coordination"</li>
    <li><strong>Turbo Charging Kafka</strong> → "Monitored event-driven billing pipelines, 5M+ txn/month"</li>
    <li><strong>XL Axiata RCA</strong> → "Reduced incident detection 45 min → 5 min via Splunk-driven triage"</li>
    <li><strong>GitLab CI/CD</strong> → "Correlated deploy timing with Splunk error spikes"</li>
  </ul>
</div>
`
},

'java-first5': {
  title: 'First 5 Minutes on Incident',
  html: `
<h2>Java Incident — First 5 Minutes</h2>
<p class="subtitle">Ordered checklist before you touch anything in production</p>

<table>
  <tr><th>Step</th><th>Action</th><th>What You're Looking For</th></tr>
  <tr><td>1</td><td>Confirm blast radius</td><td>Service name, env (prod/stage), region, % traffic affected</td></tr>
  <tr><td>2</td><td>Check recent changes</td><td>Deploy in last 2h? Config push? DB migration? Cert rotation?</td></tr>
  <tr><td>3</td><td>Health endpoints</td><td><code>/actuator/health</code> — UP vs DOWN; readiness vs liveness</td></tr>
  <tr><td>4</td><td>Metrics dashboard</td><td>CPU, heap %, thread count, GC pause, error rate, p95 latency</td></tr>
  <tr><td>5</td><td>Splunk ERROR spike</td><td>When did errors start? Top exception class? correlationId samples</td></tr>
  <tr><td>6</td><td>Thread dump (if CPU/hung)</td><td>3 dumps 10 seconds apart — compare stack frames</td></tr>
  <tr><td>7</td><td>Heap dump (only if OOM)</td><td>After thread dump; coordinate — file is large and pauses JVM</td></tr>
</table>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Don't restart pods blindly. First answer: <strong>who is hurt, when did it start, what changed</strong>. Then gather evidence (logs + thread dump). Then mitigate. Restart is a mitigation — not investigation.</p>
</div>

<div class="analogy-box">
  <h4>Firefighter Analogy</h4>
  <p>You don't demolish the building because you see smoke. You locate the fire floor (blast radius), check if someone left the gas on (recent deploy), then contain spread (mitigate) before rebuilding (resolve).</p>
</div>
`
},

'java-commands': {
  title: 'JVM & Kubernetes Commands',
  html: `
<h2>Essential Java / K8s Commands</h2>
<p class="subtitle">Copy-paste reference for production triage</p>

<h3>Process Discovery</h3>
<pre><code>jps -lv                              # Java processes + JVM args
ps -ef | grep java</code></pre>

<h3>Thread Dump (choose one)</h3>
<pre><code>jstack &lt;pid&gt; &gt; threaddump-$(date +%H%M%S).txt
kill -3 &lt;pid&gt;                          # SIGQUIT → dumps to app log
jcmd &lt;pid&gt; Thread.print &gt; dump.txt</code></pre>

<h3>Heap & GC (lighter first)</h3>
<pre><code>jcmd &lt;pid&gt; GC.heap_info
jstat -gcutil &lt;pid&gt; 1000 10           # GC util every 1s, 10 samples
jcmd &lt;pid&gt; VM.flags
jcmd &lt;pid&gt; VM.system_properties</code></pre>

<h3>Heap Dump (heavy — get approval)</h3>
<pre><code>jcmd &lt;pid&gt; GC.heap_dump /tmp/heap.hprof</code></pre>

<h3>Spring Boot Actuator</h3>
<pre><code>curl -s localhost:8080/actuator/health | jq .
curl -s localhost:8080/actuator/metrics/jvm.memory.used | jq .
curl -s localhost:8080/actuator/metrics/hikaricp.connections.active | jq .
curl -s localhost:8080/actuator/metrics/http.server.requests | jq .</code></pre>

<h3>Kubernetes</h3>
<pre><code>kubectl get pods -n &lt;ns&gt; -l app=&lt;service&gt;
kubectl top pod -n &lt;ns&gt;
kubectl logs &lt;pod&gt; -n &lt;ns&gt; --since=15m | tail -200
kubectl exec -it &lt;pod&gt; -n &lt;ns&gt; -- jstack 1
kubectl describe pod &lt;pod&gt; -n &lt;ns&gt;    # OOMKilled? restart count?</code></pre>

<h3>JVM Flags Worth Knowing</h3>
<pre><code>-Xms / -Xmx                           heap min/max
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/tmp
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200</code></pre>
`
},

'thread-dumps': {
  title: 'Reading Thread Dumps',
  html: `
<h2>Thread Dump Analysis</h2>
<p class="subtitle">What to scan — top to bottom — in 3 minutes</p>

<div class="steps-box">
  <h4>Scan Order</h4>
  <ol>
    <li><strong>BLOCKED threads</strong> — many waiting on same lock → deadlock or contention</li>
    <li><strong>RUNNABLE at identical stack frame</strong> → infinite loop or CPU hot path</li>
    <li><strong>pool-N-thread-M all WAITING</strong> → thread pool or connection pool exhausted</li>
    <li><strong>http-nio-8080-exec-* stuck</strong> → slow DB, downstream API, or external call</li>
    <li><strong>kafka-consumer-* blocked</strong> → slow message handler or DB write in consumer</li>
    <li><strong>GC / Finalizer threads active</strong> → memory pressure — check heap</li>
  </ol>
</div>

<h3>Deadlock Signature</h3>
<pre><code>Found one Java-level deadlock:
---
"pool-1-thread-3":
  waiting to lock monitor 0x00007f8a1c003e88 (object 0x00000000ec123456, a java.lang.Object),
  which is held by "pool-1-thread-7"</code></pre>
<p><strong>Action:</strong> Identify lock holders. Short-term: restart if stuck. Long-term: fix lock ordering in code.</p>

<h3>Connection Pool Exhaustion</h3>
<pre><code>"http-nio-8080-exec-47" #47 prio=5 os_prio=0 tid=0x... nid=0x... waiting on condition
   java.lang.Thread.State: WAITING (parking)
        at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:196)
        ... 200 similar threads ...</code></pre>
<p><strong>Action:</strong> Check DB blocking sessions. Check for connection leak (not returned). Scale pool only as temp fix — find slow queries.</p>

<div class="interview-q">
  <div class="q">Interview: "You have high CPU but low traffic. What do you check in the thread dump?"</div>
  <div class="a">
    <p>Look for many <strong>RUNNABLE</strong> threads at the <em>same</em> stack frame — indicates tight loop or expensive regex/crypto in hot path. Compare 3 dumps 10s apart — if same frame, that's your CPU burner. Not pool exhaustion (those are WAITING).</p>
  </div>
</div>
`
},

'java-exceptions': {
  title: 'Common Production Exceptions',
  html: `
<h2>Exception Triage Playbook</h2>
<p class="subtitle">Exception → root cause → first 3 actions</p>

<table>
  <tr><th>Exception</th><th>Root Cause</th><th>First Actions</th></tr>
  <tr><td><code>OutOfMemoryError: Java heap space</code></td><td>Leak, cache growth, huge payload</td><td>Heap dump; check -Xmx; Splunk for payload size spike</td></tr>
  <tr><td><code>OutOfMemoryError: Metaspace</code></td><td>Classloader leak, hot redeploy</td><td>Restart pod; check dynamic proxies / Groovy scripts</td></tr>
  <tr><td><code>unable to create native thread</code></td><td>Thread leak, ulimit hit</td><td>Thread dump; reduce max threads; check OS limits</td></tr>
  <tr><td><code>SocketTimeoutException</code></td><td>Downstream slow or down</td><td>Trace dependency; compare LB timeout vs client timeout</td></tr>
  <tr><td><code>CannotGetJdbcConnectionException</code></td><td>Pool exhausted, DB down</td><td>Hikari active/idle metrics; DB session count; blocking query</td></tr>
  <tr><td><code>SQLTimeoutException</code></td><td>Slow query, lock, missing index</td><td>SQL from stack trace; pg_stat_activity; EXPLAIN</td></tr>
  <tr><td><code>RejectedExecutionException</code></td><td>Thread pool saturated</td><td>Queue depth; scale pods; shed load at gateway</td></tr>
  <tr><td><code>Kafka TimeoutException</code></td><td>Broker load, ISR shrink, network</td><td>Broker metrics; consumer lag; replication status</td></tr>
  <tr><td><code>SSLHandshakeException</code></td><td>Cert expired, truststore mismatch</td><td>Cert expiry dates; recent rotation in change log</td></tr>
  <tr><td><code>JsonMappingException</code></td><td>Schema drift, bad upstream payload</td><td>Sample bad message; API version mismatch</td></tr>
</table>

<div class="simple-box">
  <h4>Support II Pattern</h4>
  <p>Never say "I'd Google it." Say: "I'd check Splunk for this exception class spike, correlate timing with deploy, capture thread dump if pool-related, and open JIRA with saved search link."</p>
</div>
`
},

'sql-workflow': {
  title: 'SQL Incident Workflow',
  html: `
<h2>SQL Support Workflow</h2>
<p class="subtitle">Read-only first — validate data before blaming Java</p>

<div class="steps-box">
  <h4>5-Step SQL Triage</h4>
  <ol>
    <li><strong>Reproduce read-only</strong> — same WHERE clauses as failing API</li>
    <li><strong>Row count sanity</strong> — expected vs actual for today / this batch</li>
    <li><strong>Freshness check</strong> — <code>MAX(updated_at)</code> per source system</li>
    <li><strong>Integrity check</strong> — duplicates, orphans, cross-system mismatches</li>
    <li><strong>Performance check</strong> — blocking sessions, EXPLAIN for slow path</li>
  </ol>
</div>

<div class="answer-simple">
  <strong>Interview Phrases:</strong>
  <ul>
    <li>"I start read-only — no prod mutations during triage unless runbook-approved."</li>
    <li>"I compare count, max(timestamp), and sample rows before and after incident window."</li>
    <li>"I correlate DB spike with Kafka consumer surge or deploy in Splunk."</li>
  </ul>
</div>

<div class="analogy-box">
  <h4>Doctor Checks Vitals Before Surgery</h4>
  <p>Java stack trace is the symptom. SQL validation is the blood test — it tells you if the underlying data is actually sick.</p>
</div>
`
},

'sql-validation': {
  title: 'SQL Data Validation',
  html: `
<h2>Data Validation Query Templates</h2>
<p class="subtitle">Healthcare eligibility / claims examples</p>

<h3>Row Count Sanity</h3>
<pre><code>SELECT COUNT(*) FROM patient_encounter
WHERE encounter_date = CURRENT_DATE;</code></pre>

<h3>Duplicate Detection</h3>
<pre><code>SELECT member_id, claim_id, COUNT(*)
FROM claims_staging
GROUP BY member_id, claim_id
HAVING COUNT(*) > 1;</code></pre>

<h3>Orphan Rows (Missing Parent)</h3>
<pre><code>SELECT c.claim_id
FROM claims c
LEFT JOIN members m ON c.member_id = m.member_id
WHERE m.member_id IS NULL;</code></pre>

<h3>Stale Pipeline Detection</h3>
<pre><code>SELECT source_system, MAX(last_updated_ts), COUNT(*) AS row_count
FROM eligibility_feed
GROUP BY source_system
ORDER BY MAX(last_updated_ts);</code></pre>

<h3>Staging vs Production Count</h3>
<pre><code>SELECT 'staging' AS env, COUNT(*) FROM staging.member_eligibility
UNION ALL
SELECT 'prod', COUNT(*) FROM prod.member_eligibility;</code></pre>

<div class="interview-q">
  <div class="q">Scenario: Members see wrong plan in portal. Where do you start?</div>
  <div class="a">
    <ol>
      <li>Get affected member internal ID (not SSN in ticket)</li>
      <li>Query <code>member_eligibility</code> for latest effective plan</li>
      <li>Compare with source feed <code>eligibility_feed</code> MAX(timestamp)</li>
      <li>Check Kafka lag on eligibility-consumer — is sync behind?</li>
      <li>FULL OUTER JOIN source A vs B if multi-system mismatch</li>
    </ol>
  </div>
</div>
`
},

'sql-joins': {
  title: 'SQL Join Patterns',
  html: `
<h2>High-Yield Joins for Support</h2>
<p class="subtitle">When to use INNER vs LEFT vs LATERAL vs FULL OUTER</p>

<table>
  <tr><th>Join Type</th><th>Use When</th><th>Support Example</th></tr>
  <tr><td>INNER JOIN</td><td>Both sides must exist</td><td>Claim must have valid provider</td></tr>
  <tr><td>LEFT JOIN</td><td>Keep all from left, optional right</td><td>All members, eligibility may be null</td></tr>
  <tr><td>LATERAL</td><td>Latest row per entity</td><td>Current plan per member (no duplicates)</td></tr>
  <tr><td>FULL OUTER</td><td>Find mismatches across systems</td><td>Source A plan ≠ Source B plan</td></tr>
</table>

<h3>Latest Eligibility Per Member (LATERAL)</h3>
<pre><code>SELECT m.member_id, m.full_name, e.plan_code, e.effective_date
FROM members m
JOIN LATERAL (
    SELECT plan_code, effective_date
    FROM member_eligibility e
    WHERE e.member_id = m.member_id
      AND e.effective_date &lt;= CURRENT_DATE
    ORDER BY e.effective_date DESC
    LIMIT 1
) e ON TRUE;</code></pre>

<h3>Cross-System Mismatch (FULL OUTER)</h3>
<pre><code>SELECT a.external_member_id,
       a.plan_code AS source_a,
       b.plan_code AS source_b
FROM eligibility_source_a a
FULL OUTER JOIN eligibility_source_b b
  ON a.external_member_id = b.external_member_id
WHERE a.plan_code IS DISTINCT FROM b.plan_code
   OR a.external_member_id IS NULL
   OR b.external_member_id IS NULL;</code></pre>
`
},

'sql-performance': {
  title: 'Slow Query & Lock Triage',
  html: `
<h2>SQL Performance & Blocking</h2>
<p class="subtitle">When API is slow — pool, lock, or bad plan</p>

<h3>Active Queries (PostgreSQL)</h3>
<pre><code>SELECT pid, usename, state, wait_event_type, wait_event,
       NOW() - query_start AS duration,
       LEFT(query, 200) AS query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;</code></pre>

<h3>Blocking Chain</h3>
<pre><code>SELECT blocked.pid AS blocked_pid,
       blocking.pid AS blocking_pid,
       LEFT(blocked.query, 100) AS blocked_query,
       LEFT(blocking.query, 100) AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking
  ON blocking.pid = ANY(pg_blocking_pids(blocked.pid));</code></pre>

<h3>Missing Index Hint</h3>
<pre><code>SELECT schemaname, relname, seq_scan, idx_scan, n_live_tup
FROM pg_stat_user_tables
WHERE n_live_tup > 100000 AND seq_scan > idx_scan
ORDER BY seq_scan DESC;</code></pre>

<h3>Execution Plan</h3>
<pre><code>EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT ... your slow query ...;</code></pre>

<div class="diagram">API Slow Triage Chain
──────────────────────────────────────
Member reports timeout
    → Splunk: p95 latency spike on /eligibility
    → Actuator: hikaricp.connections.active = max
    → pg_stat_activity: 1 query running 8 minutes
    → Blocking PID found → DBA kills per runbook
    → Pool recovers → latency normalizes
──────────────────────────────────────</div>
`
},

'kafka-architecture': {
  title: 'Kafka Architecture',
  html: `
<h2>Kafka — How It Works</h2>
<p class="subtitle">30-second interview answer + mental model</p>

<div class="diagram">Producer                Topic: patient-eligibility-events
   │                              │
   │  key=member_id               ├── Partition 0  [msg1][msg2][msg3]...
   └──────────────────────────────├── Partition 1  [msg4][msg5]...
                                  └── Partition 2  [msg6]...

Consumer Group: eligibility-consumer-prod
   ├── Consumer A  → Partition 0  (offset: 10450)
   ├── Consumer B  → Partition 1  (offset: 8920)
   └── Consumer C  → Partition 2  (offset: 12001)

LAG = Log End Offset - Current Offset  (per partition)</div>

<div class="simple-box">
  <h4>Key Concepts</h4>
  <ul>
    <li><strong>Topic</strong> — named stream of events (e.g. patient-eligibility-events)</li>
    <li><strong>Partition</strong> — ordered sub-log; parallelism unit; use member_id as key for per-member ordering</li>
    <li><strong>Consumer Group</strong> — consumers cooperate; each partition assigned to one consumer max</li>
    <li><strong>Offset</strong> — bookmark of last read message</li>
    <li><strong>Lag</strong> — how far behind consumers are — THE critical support metric</li>
  </ul>
</div>

<div class="answer-simple">
  <strong>30-Second Answer:</strong> "Kafka is a distributed commit log. Producers write to partitioned topics replicated across brokers. Consumer groups divide partitions among consumers. Offsets track position. Lag measures backlog — growing lag means consumers can't keep pace, usually slow DB writes, poison message, or insufficient consumer instances."
</div>

<h3>Essential CLI</h3>
<pre><code>kafka-consumer-groups.sh --bootstrap-server &lt;broker&gt;:9092 \\
  --group eligibility-consumer-prod --describe

kafka-topics.sh --bootstrap-server &lt;broker&gt;:9092 \\
  --describe --topic patient-eligibility-events</code></pre>
`
},

'kafka-lag': {
  title: 'Consumer Lag Triage',
  html: `
<h2>Kafka Consumer Lag — Step by Step</h2>
<p class="subtitle">The #1 Kafka support scenario</p>

<table>
  <tr><th>Signal</th><th>Likely Cause</th><th>Action</th></tr>
  <tr><td>Lag growing on ALL partitions</td><td>Slow consumer processing</td><td>Thread dump; DB slowness; scale consumers ≤ partition count</td></tr>
  <tr><td>Lag on ONE partition only</td><td>Hot key / skewed member_id</td><td>Identify key; long-term repartition strategy</td></tr>
  <tr><td>Rebalance loop in logs</td><td>Processing &gt; max.poll.interval.ms</td><td>Speed handler; reduce batch size; tune interval</td></tr>
  <tr><td>Producer timeouts</td><td>Broker overload, ISR shrink</td><td>Broker disk/CPU; replication health</td></tr>
  <tr><td>Duplicate processing</td><td>Crash before offset commit</td><td>Idempotent consumer; dedup table</td></tr>
</table>

<div class="steps-box">
  <h4>Lag Triage Steps</h4>
  <ol>
    <li><code>kafka-consumer-groups --describe</code> — lag per partition</li>
    <li>Splunk — consumer ERROR, rebalance, deserialization failures</li>
    <li>DB — is consumer doing slow INSERT/UPDATE per message?</li>
    <li>Compare ingest rate vs processing rate (msgs/sec)</li>
    <li>Check for poison pill — one message causing repeated failures</li>
    <li>Mitigate: scale consumers, pause bad partition, send to DLT, replay later</li>
  </ol>
</div>

<div class="mistake-box">
  <h4>Poison Pill Message</h4>
  <p>A single malformed or toxic message crashes the handler on every retry — consumer never commits offset — lag grows forever on that partition. <strong>Fix:</strong> skip to DLT (dead letter topic) after N retries, fix data, replay from offset.</p>
</div>
`
},

'kafka-healthcare': {
  title: 'Kafka in Healthcare',
  html: `
<h2>Kafka — Healthcare Context</h2>
<p class="subtitle">Why streaming lag matters beyond "slow page load"</p>

<ul>
  <li><strong>Eligibility sync lag</strong> — member sees stale plan; provider authorization may fail; billing codes wrong</li>
  <li><strong>Audit trail topics</strong> — lag = delayed compliance reporting, not just UX</li>
  <li><strong>PHI in logs</strong> — NEVER log full SSN/member ID; use hashed correlation ID</li>
  <li><strong>Partition key = member_id</strong> — preserves order of all events for one member</li>
  <li><strong>HIPAA minimum necessary</strong> — Kafka message payloads may contain PHI — access controlled</li>
</ul>

<div class="analogy-box">
  <h4>Hospital Pneumatic Tube System</h4>
  <p>Kafka is the tube carrying lab results. Lag means results sit in the tube while doctors wait. In healthcare, delayed data isn't annoying — it can block care decisions.</p>
</div>
`
},

'splunk-basics': {
  title: 'Splunk SPL Basics',
  html: `
<h2>Splunk — Search Processing Language</h2>
<p class="subtitle">Foundation for production log investigation</p>

<h3>Core Fields</h3>
<p><code>index</code> · <code>sourcetype</code> · <code>host</code> · <code>source</code> · <code>_time</code> · <code>level</code> · <code>logger</code> · <code>message</code> · <code>traceId</code> · <code>correlationId</code> · <code>exception</code></p>

<h3>Basic Search</h3>
<pre><code>index=kp_apps sourcetype=springboot_log
| timechart span=5m count by level</code></pre>

<h3>SPL Pipeline Mental Model</h3>
<div class="diagram">Search (filter raw events)
    | where / | search
    | rex (extract fields with regex)
    | eval (compute new fields)
    | stats / | timechart (aggregate)
    | sort | table (present)</div>

<div class="simple-box">
  <h4>Golden Rules</h4>
  <ul>
    <li>Always bound time: <code>earliest=-1h</code></li>
    <li>Start narrow: index + sourcetype + level</li>
    <li>Save search → paste URL in JIRA for reproducibility</li>
    <li>Never search PHI — use internal correlation IDs</li>
  </ul>
</div>
`
},

'splunk-queries': {
  title: 'Splunk Query Templates',
  html: `
<h2>Production SPL Templates</h2>
<p class="subtitle">Copy, adapt index names, run in interview discussion</p>

<h3>1. Error Spike</h3>
<pre><code>index=kp_apps sourcetype=springboot_log level=ERROR earliest=-1h
| timechart span=5m count</code></pre>

<h3>2. Top Exceptions (last 30 min)</h3>
<pre><code>index=kp_apps sourcetype=springboot_log earliest=-30m
| rex field=_raw "(?&lt;exception_class&gt;[a-zA-Z0-9_.]+Exception)"
| stats count by exception_class
| sort - count</code></pre>

<h3>3. Trace Single Request</h3>
<pre><code>index=kp_apps correlationId="a1b2c3d4-e5f6-7890-abcd-ef1234567890" earliest=-24h
| sort _time
| table _time host service level message</code></pre>

<h3>4. JDBC / Connection Pool Errors</h3>
<pre><code>index=kp_apps earliest=-2h
("CannotGetJdbcConnectionException" OR "SQLTimeoutException"
 OR "HikariPool" OR "Connection is not available")
| stats count by host, message
| sort - count</code></pre>

<h3>5. Kafka Consumer Issues</h3>
<pre><code>index=kp_apps sourcetype=springboot_log earliest=-2h
("Consumer group" OR "offset commit" OR "rebalance"
 OR "RecordDeserializationException" OR "org.apache.kafka")
| rex field=_raw "group=(?&lt;consumer_group&gt;[^\\s,]+)"
| stats count by consumer_group, message</code></pre>

<h3>6. Kafka Lag Metric</h3>
<pre><code>index=kp_apps metric_name="kafka.consumer.lag" earliest=-6h
| timechart span=10m max(lag) by consumer_group</code></pre>

<h3>7. Deploy Correlation</h3>
<pre><code>index=kp_deployments OR index=kp_apps earliest=-4h
| eval event_type=if(match(source, "deploy"), "deploy", "app_log")
| sort _time
| table _time event_type host source message</code></pre>

<h3>8. High Latency Endpoints</h3>
<pre><code>index=kp_apps sourcetype=access_log earliest=-1h
| rex field=_raw "(?&lt;response_time&gt;\\d+)ms"
| where response_time > 5000
| stats avg(response_time) p95(response_time) count by uri
| sort - p95(response_time)</code></pre>
`
},

'splunk-alerts': {
  title: 'Splunk Alerts & JIRA',
  html: `
<h2>Alerting Workflow</h2>
<p class="subtitle">From Splunk detection to JIRA incident</p>

<h3>Alert SPL Template</h3>
<pre><code>index=kp_apps level=ERROR earliest=-5m
| stats count as error_count
| where error_count > 50</code></pre>

<div class="diagram">Alert Flow
────────────────────────────────────────
Splunk saved search (every 5 min)
    → Threshold breached (ERROR > 50)
    → PagerDuty / Slack notification
    → Auto-create JIRA INC ticket (Sev-2)
    → On-call acknowledges
    → Support II joins bridge
    → Splunk search URL pasted in JIRA
────────────────────────────────────────</div>

<div class="interview-q">
  <div class="q">"How do you avoid alert fatigue?"</div>
  <div class="a">
    <p>Tune thresholds per service baseline. Group related errors. Use correlation — don't page on single transient timeout. Require sustained breach (e.g. 3 consecutive 5-min windows). Document false positives in RCA and adjust alert.</p>
  </div>
</div>
`
},

'jira-severity': {
  title: 'JIRA Severity & Prioritization',
  html: `
<h2>Incident Severity Framework</h2>
<p class="subtitle">How Support II declares and prioritizes</p>

<table>
  <tr><th>Sev</th><th>Definition</th><th>Response</th></tr>
  <tr><td><strong>1</strong></td><td>Patient care / revenue critical, widespread</td><td>Bridge, exec comms, 15-min updates</td></tr>
  <tr><td><strong>2</strong></td><td>Major degradation, workaround exists</td><td>War room, hourly updates</td></tr>
  <tr><td><strong>3</strong></td><td>Limited impact, single team</td><td>Business hours queue</td></tr>
  <tr><td><strong>4</strong></td><td>Minor / cosmetic</td><td>Backlog</td></tr>
</table>

<h3>Ticket Prioritization Order</h3>
<ol>
  <li><strong>Safety & compliance</strong> — PHI exposure, audit failure</li>
  <li><strong>Patient/member impact</strong> — eligibility, claims, scheduling</li>
  <li><strong>Breadth</strong> — % users / regions affected</li>
  <li><strong>Duration</strong> — how long already broken</li>
  <li><strong>Workaround available?</strong> — manual process buys time</li>
</ol>
`
},

'jira-tickets': {
  title: 'JIRA Incident Comments',
  html: `
<h2>JIRA Comment Template</h2>
<p class="subtitle">What good Support II documentation looks like</p>

<pre><code>## Impact
- Service: eligibility-enrollment-api (prod, west)
- Started: 2026-07-15 09:12 UTC (Splunk alert)
- Users: ~12% enrollment failures (502 from gateway)

## Current Status
Investigating. DB connection pool exhausted on 3/8 pods.

## Actions Taken
1. Splunk: ERROR spike correlates with kafka lag +45k on eligibility-consumer
2. Thread dump: 180/200 threads waiting on Hikari pool
3. Scaled consumers 4→8 — lag stabilizing
4. DBA engaged — blocking session PID 28491 killed (runbook-approved)

## Next Steps
- Monitor lag & pool metrics 30 min
- RCA if stable by 11:00 UTC

## Links
- Splunk: &lt;saved search URL&gt;
- Bridge: &lt;Teams/Zoom link&gt;</code></pre>

<div class="mistake-box">
  <h4>Never Put PHI in JIRA</h4>
  <p>No member names, SSN, or MRN in ticket title or comments. Use internal member correlation ID only. HIPAA minimum necessary principle.</p>
</div>
`
},

'team-coordination': {
  title: 'Team Coordination Model',
  html: `
<h2>Incident Roles & Rally vs JIRA</h2>
<p class="subtitle">Team management aspect of Support II</p>

<table>
  <tr><th>Role</th><th>Responsibility</th></tr>
  <tr><td><strong>Incident Commander</strong></td><td>Owns timeline, severity, comms to leadership</td></tr>
  <tr><td><strong>Technical Lead (SME)</strong></td><td>Drives root cause investigation — often Support II</td></tr>
  <tr><td><strong>Scribe</strong></td><td>Updates JIRA in real time, captures action items</td></tr>
  <tr><td><strong>Comms Lead</strong></td><td>Status to help desk, provider relations</td></tr>
</table>

<ul>
  <li><strong>Rally</strong> — planned user stories, sprint work</li>
  <li><strong>JIRA</strong> — unplanned incidents, break/fix, RCA action items</li>
  <li><strong>Post-incident</strong> — blameless RCA within 48h; every action item = JIRA ticket with owner + due date</li>
</ul>
`
},

'scenario-kafka-lag': {
  title: 'Scenario: Kafka Eligibility Lag',
  html: `
<h2>Scenario 1: Patient Eligibility Stream Lag +45k</h2>
<p class="subtitle">Healthcare-centric · Full triage script for interview</p>

<div class="simple-box">
  <h4>Alert</h4>
  <p>09:12 UTC — PagerDuty: Kafka consumer lag alert on <code>eligibility-consumer-prod</code> exceeded 45,000 messages. Member portal reports stale plan data. Help desk ticket volume up 3×.</p>
</div>

<div class="scenario-timeline">
  <div class="step"><strong>0–2 min | DETECT + TRIAGE</strong><br>
  Declare <strong>Sev-2</strong>. Open JIRA INC. Join bridge. Confirm: topic <code>patient-eligibility-events</code>, env prod-west, started ~09:00. Check change log — batch replay job started 08:55.</div>

  <div class="step"><strong>2–5 min | SPLUNK</strong><br>
<pre><code>index=kp_apps metric_name="kafka.consumer.lag" earliest=-2h
| timechart span=5m max(lag) by consumer_group</code></pre>
  ERROR spike on eligibility-enrollment-service. Top exception: <code>SQLTimeoutException</code>. CorrelationId samples show DB write failures.</div>

  <div class="step"><strong>5–8 min | KAFKA CLI</strong><br>
<pre><code>kafka-consumer-groups.sh --bootstrap-server broker:9092 \\
  --group eligibility-consumer-prod --describe</code></pre>
  Lag evenly distributed on all 6 partitions — not hot key. Consumer count = 6 = partition count. Processing bottleneck, not under-scaled.</div>

  <div class="step"><strong>8–12 min | JAVA + SQL</strong><br>
  Thread dump on consumer pod: kafka-consumer threads WAITING on HikariPool.getConnection. SQL: blocking session on <code>member_eligibility</code> INSERT — batch job holding lock. pg_blocking_pids confirms PID 28491.</div>

  <div class="step"><strong>12–15 min | MITIGATE</strong><br>
  Per runbook: contact DBA to kill blocking session. Pause non-critical batch replay (08:55 job). Monitor lag — starts dropping. Do NOT blindly scale consumers — already at partition limit.</div>

  <div class="step"><strong>15–30 min | RESOLVE + DOCUMENT</strong><br>
  Lag &lt; 1000 by 09:45. Root cause: batch job lock contention with real-time consumer writes. JIRA updated q30min. Schedule RCA: separate batch window from real-time consumer path.</div>
</div>

<div class="answer-simple">
  <strong>What Impresses Interviewers:</strong> You correlated Kafka lag + SQL blocking + Splunk exception — not three separate guesses. You knew scaling consumers wouldn't help when already at partition count.
</div>
`
},

'scenario-java-cpu': {
  title: 'Scenario: High-CPU Java Freeze',
  html: `
<h2>Scenario 2: Enrollment API — CPU 95%, Requests Timing Out</h2>
<p class="subtitle">Java microservice freeze · Thread dump driven</p>

<div class="simple-box">
  <h4>Alert</h4>
  <p>14:30 UTC — Grafana: <code>enrollment-api</code> pods CPU 90–95%. Gateway p95 latency 12s (normal 200ms). No deploy in last 24h. Traffic normal.</p>
</div>

<div class="scenario-timeline">
  <div class="step"><strong>0–3 min | TRIAGE</strong><br>
  Sev-2 — enrollment timeouts affect member sign-up. 4 of 8 pods affected. kubectl top pod — uneven CPU (not all pods). Splunk: no ERROR spike yet — WARN on retry logic.</div>

  <div class="step"><strong>3–8 min | THREAD DUMP × 3</strong><br>
<pre><code>kubectl exec -it enrollment-api-7f8b9c -- jstack 1 > dump1.txt
# wait 10s, dump2, dump3</code></pre>
  120 threads RUNNABLE at <code>com.kp.eligibility.PlanMatcher.evaluateRules()</code> — same frame in all 3 dumps. Not deadlock. Not pool wait.</div>

  <div class="step"><strong>8–12 min | HYPOTHESIS</strong><br>
  Infinite loop or catastrophic backtracking in rules engine — triggered by specific plan configuration. Splunk: find correlationId of slow requests — trace to input plan_code=MA-PPO-2026-Q3.</div>

  <div class="step"><strong>12–18 min | MITIGATE</strong><br>
  Feature flag OFF for new plan rules path (if available). OR route traffic away from hot pods. Restart affected pods as temp relief. Engage dev SME with thread dump + sample payload.</div>

  <div class="step"><strong>18+ min | RESOLVE</strong><br>
  Dev identifies regression in rules for MA-PPO-2026-Q3. Hotfix or rollback rules config. Document: CPU triage without blind restart — evidence-based.</div>
</div>

<div class="mistake-box">
  <h4>Don't Say</h4>
  <p>"I'd restart all pods." Say: "I'd capture 3 thread dumps to distinguish CPU hot path vs pool exhaustion vs deadlock, then mitigate based on evidence."</p>
</div>
`
},

'scenario-sql-data': {
  title: 'Scenario: Wrong Eligibility Data',
  html: `
<h2>Scenario 3: Members See Wrong Health Plan</h2>
<p class="subtitle">SQL validation before Java blame · Data integrity</p>

<div class="simple-box">
  <h4>Report</h4>
  <p>Provider portal shows Member internal ID 7XK-9912 with Plan "HMO Basic" but member insists they enrolled in "HMO Premium" yesterday. 47 similar tickets since 06:00 UTC.</p>
</div>

<div class="scenario-timeline">
  <div class="step"><strong>0–3 min | TRIAGE</strong><br>
  Sev-2 if widespread. Not Sev-1 unless authorization blocked for urgent care. Pattern: 47 tickets — systemic, not one-off. Check Kafka lag and ETL schedule.</div>

  <div class="step"><strong>3–10 min | SQL VALIDATION</strong><br>
<pre><code>-- Latest plan for member
SELECT * FROM member_eligibility
WHERE member_id = '7XK-9912'
ORDER BY effective_date DESC LIMIT 5;

-- Feed freshness
SELECT source_system, MAX(last_updated_ts)
FROM eligibility_feed GROUP BY 1;

-- Cross-system mismatch
SELECT a.plan_code, b.plan_code
FROM source_enrollment a
FULL OUTER JOIN source_eligibility b
  ON a.member_id = b.member_id
WHERE a.plan_code IS DISTINCT FROM b.plan_code;</code></pre>
  Finding: enrollment system has HMO Premium; eligibility DB still HMO Basic. MAX(last_updated_ts) on feed = 2 days ago for source B.</div>

  <div class="step"><strong>10–15 min | KAFKA + SPLUNK</strong><br>
  Kafka lag on enrollment-sync-consumer = 0. Consumer healthy. Splunk shows enrollment events published but eligibility-writer logged <code>JsonMappingException</code> at 05:45 UTC — schema change in enrollment payload.</div>

  <div class="step"><strong>15–20 min | ROOT CAUSE</strong><br>
  Not SQL bug — upstream schema drift. Enrollment service deployed 05:30 with new field; eligibility consumer failed deserialization silently (DLT not configured). Data never written.</div>

  <div class="step"><strong>MITIGATE + RESOLVE</strong><br>
  Rollback enrollment deploy OR hotfix consumer schema. Replay Kafka messages from 05:30 offset after fix. Re-validate with FULL OUTER JOIN — mismatch count → 0. JIRA + RCA: require schema contract test in CI.</div>
</div>
`
},

'star-incident': {
  title: 'STAR: Incident Leadership',
  html: `
<h2>Behavioral Q1: Leading a Production Incident</h2>
<p class="subtitle">Team coordination · STAR method</p>

<div class="interview-q">
  <div class="q">"Tell me about a time you led or coordinated a production incident under pressure."</div>
</div>

<div class="star-box">
  <h4><span class="letter">S</span> Situation</h4>
  <p>During USCC-to-T-Mobile onsite go-live in Guadalajara, we hit a 2-month cutover window with 2+ microservices processing customer migration. Within 48 hours of go-live, we saw 15+ production incidents — tight deadlines, cross-functional teams in US and Mexico time zones.</p>

  <h4><span class="letter">T</span> Task</h4>
  <p>I was responsible for technical triage on the integration microservices — debug defects, stabilize services, and keep stakeholders informed for UAT sign-off.</p>

  <h4><span class="letter">A</span> Action</h4>
  <ul>
    <li>Established 30-minute status rhythm — JIRA updates with Splunk search links and impact %</li>
    <li>Prioritized incidents by migration blocker vs cosmetic — escalated blockers to bridge</li>
    <li>Used Splunk to correlate ERROR spikes with specific REST endpoints and SQL failures</li>
    <li>Coordinated 3 UAT cycles — validated API behavior and SQL-backed data flows before sign-off</li>
    <li>Documented root causes so offshore team could resolve similar issues without re-escalation</li>
  </ul>

  <h4><span class="letter">R</span> Result</h4>
  <p>Resolved 15+ incidents within the cutover window. Migration sign-off achieved on schedule. Reduced repeat incidents by documenting playbooks in JIRA. Leadership cited clear communication as factor in successful go-live.</p>
</div>

<div class="answer-simple">
  <strong>Tip:</strong> Emphasize coordination + communication + tooling (Splunk/JIRA), not just "I fixed a bug."
</div>
`
},

'star-prioritization': {
  title: 'STAR: Ticket Prioritization',
  html: `
<h2>Behavioral Q2: Prioritizing Conflicting Tickets</h2>
<p class="subtitle">JIRA workflow · Analytical judgment</p>

<div class="interview-q">
  <div class="q">"You have three P1 tickets at once: Kafka lag, Java OOM, and a SQL report wrong for one user. How do you prioritize?"</div>
</div>

<div class="star-box">
  <h4><span class="letter">S</span> Situation</h4>
  <p>At Amdocs on Turbo Charging billing platform (5M+ transactions/month), during peak billing window I received simultaneous escalations: consumer lag growing on catalog Kafka topic, OOM on rating service pod, and finance reporting one incorrect account balance.</p>

  <h4><span class="letter">T</span> Task</h4>
  <p>As support engineer on rotation, I had to prioritize without dropping SLA on revenue-impacting systems.</p>

  <h4><span class="letter">A</span> Action</h4>
  <ul>
    <li>Applied framework: <strong>breadth × revenue impact × workaround</strong></li>
    <li>Kafka lag — affecting all new catalog updates → highest breadth → tackled first with consumer-groups + Splunk</li>
    <li>OOM — auto-restarted by K8s but recurring → assigned teammate to heap analysis while I drove Kafka</li>
    <li>Single account report — wrong but isolated → Sev-3, scheduled after stabilization with SQL validation query</li>
    <li>Communicated prioritization rationale in JIRA comments so stakeholders understood delay on item 3</li>
  </ul>

  <h4><span class="letter">R</span> Result</h4>
  <p>Kafka lag cleared in 40 minutes (poison message to DLT). OOM root cause identified as cache misconfiguration. Single-account issue was stale read replica — fixed with SQL refresh. Zero missed SLA on billing run.</p>
</div>
`
},

'star-onsite': {
  title: 'STAR: Cross-Team Coordination',
  html: `
<h2>Behavioral Q3: Cross-Functional Coordination</h2>
<p class="subtitle">Team management · UAT · Stakeholder communication</p>

<div class="interview-q">
  <div class="q">"Describe a time you coordinated across multiple teams with conflicting priorities."</div>
</div>

<div class="star-box">
  <h4><span class="letter">S</span> Situation</h4>
  <p>XL Axiata Jakarta project — service upgrade across 8+ microservices. Incident detection was averaging 45 minutes because monitoring was fragmented and teams used different tools.</p>

  <h4><span class="letter">T</span> Task</h4>
  <p>I needed to improve detection time and coordinate upgrade validation across app, infra, and QA teams in different regions.</p>

  <h4><span class="letter">A</span> Action</h4>
  <ul>
    <li>Proposed unified Splunk dashboard for ERROR rate + dependency health across all 8 services</li>
    <li>Ran weekly triage sync — JIRA defect review with clear Sev assignment</li>
    <li>Created runbook: Detect → Triage → Mitigate with named roles per team</li>
    <li>Coordinated RCA sessions — blameless, action items assigned in JIRA with owners</li>
  </ul>

  <h4><span class="letter">R</span> Result</h4>
  <p>Incident detection dropped from 45 minutes to under 5 minutes (89% reduction). Upgrade completed with fewer escalations. Runbook adopted by adjacent teams.</p>
</div>

<div class="task-box">
  <h4>Practice Exercise</h4>
  <p>Record a 3-minute STAR answer for each question. Count "I" vs "we" — show leadership without claiming solo credit for team fixes.</p>
</div>
`
}

};

// Expose globally for sidebar script
if (typeof window !== 'undefined') {
  window.TOPICS = TOPICS;
}
