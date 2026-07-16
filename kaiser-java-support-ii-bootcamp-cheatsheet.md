# Kaiser Permanente — Java Support II Bootcamp Cheatsheet

> **Role focus:** Production triage, debugging, observability — not algorithms.  
> **Stack:** Java · SQL · Kafka · Splunk · JIRA/Rally

---

## 1. Java Production Diagnostics

### 1.1 First 5 Minutes on a Java Incident

| Step | Action | What you're looking for |
|------|--------|-------------------------|
| 1 | Confirm blast radius | Which service, env, region, % traffic affected |
| 2 | Check recent changes | Deploy, config push, DB migration, cert rotation |
| 3 | Health endpoints | `/actuator/health`, readiness vs liveness |
| 4 | Metrics | CPU, heap, thread count, GC pause, error rate, latency p95 |
| 5 | Logs (Splunk) | ERROR/FATAL spike, stack traces, correlation IDs |
| 6 | Thread dump | If high CPU or hung requests — capture 3 dumps 10s apart |
| 7 | Heap dump | Only if OOM / leak suspected — **after** thread dump |

### 1.2 Essential JVM / Container Commands

```bash
# Process & JVM flags
jps -lv
ps -ef | grep java

# Thread dump (pick one — same data)
jstack <pid> > threaddump-$(date +%H%M%S).txt
kill -3 <pid>                              # sends SIGQUIT — dump to app logs
jcmd <pid> Thread.print > threaddump.txt

# Heap summary (no full dump)
jcmd <pid> GC.heap_info
jmap -heap <pid>                           # avoid in prod under load if possible

# Heap dump (heavy — coordinate with team)
jcmd <pid> GC.heap_dump /tmp/heap.hprof
# or: jmap -dump:live,format=b,file=/tmp/heap.hprof <pid>

# GC / JVM stats
jstat -gcutil <pid> 1000 10               # every 1s, 10 samples
jcmd <pid> VM.flags
jcmd <pid> VM.system_properties

# Kubernetes
kubectl get pods -n <ns> -l app=<service>
kubectl top pod -n <ns>
kubectl logs <pod> -n <ns> --since=15m | tail -200
kubectl exec -it <pod> -n <ns> -- jstack 1
kubectl describe pod <pod> -n <ns>        # OOMKilled, restarts, probes
```

### 1.3 Thread Dump — What to Scan (Top → Bottom)

1. **BLOCKED / waiting on lock** — count threads blocked on same monitor → deadlock or contention
2. **RUNNABLE at same stack frame** — infinite loop or hot path (CPU spike)
3. **`pool-N-thread-M` all WAITING** — thread pool exhaustion / DB pool starvation
4. **`http-nio-*` threads stuck** — slow downstream, DB, or external API
5. **`kafka-consumer-*` stuck** — consumer blocked on processing or commit
6. **Finalizer / GC threads** — memory pressure signal

**Deadlock signature:**
```
Found one Java-level deadlock:
```

**Thread pool exhaustion signature:**
```
"http-nio-8080-exec-47" #47 waiting on <java.util.concurrent.Semaphore>
... 200 similar lines ...
```

### 1.4 Common Production Exceptions — Triage Playbook

| Exception | Typical Root Cause | First Actions |
|-----------|-------------------|---------------|
| `OutOfMemoryError: Java heap space` | Memory leak, cache growth, large payloads | Heap dump; check `-Xmx`; Splunk for payload size spike |
| `OutOfMemoryError: Metaspace` | Classloader leak, hot redeploy | Restart pod; check dynamic class generation |
| `OutOfMemoryError: unable to create native thread` | Thread leak or `ulimit` | Thread dump; lower max threads; check OS limits |
| `java.net.SocketTimeoutException` | Downstream slow/down | Trace dependency; check connection pool metrics |
| `CannotGetJdbcConnectionException` | Pool exhausted, DB down, network | DB conn count; pool `active/idle`; firewall/creds |
| `SQLTimeoutException` | Slow query, lock, missing index | Identify SQL in stack; check DB blocking sessions |
| `DeadlockLoserDataAccessException` | DB row lock contention | Find blocking query; retry storm |
| `Connection reset by peer` | LB timeout, pod killed mid-request | Pod restarts; ingress timeout vs app timeout |
| `SSLHandshakeException` | Cert expiry, truststore mismatch | Cert dates; recent cert rotation |
| `JsonMappingException` / `HttpMessageNotReadable` | Schema drift, bad upstream payload | Sample bad payload; compare API contract version |
| `ConcurrentModificationException` | Non-thread-safe collection shared | Code path + thread dump |
| `RejectedExecutionException` | Thread pool saturated | Pool queue depth; scale or shed load |
| `org.apache.kafka.common.errors.TimeoutException` | Broker load, network, ISR shrink | Broker metrics; consumer lag; replication |

### 1.5 Spring Boot Actuator Quick Checks

```bash
curl -s localhost:8080/actuator/health | jq .
curl -s localhost:8080/actuator/metrics/jvm.memory.used | jq .
curl -s localhost:8080/actuator/metrics/hikaricp.connections.active | jq .
curl -s localhost:8080/actuator/metrics/http.server.requests | jq .
```

### 1.6 JVM Flags Worth Knowing (Interview + Prod)

```
-Xms / -Xmx          heap min/max
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp
-XX:+UseG1GC         common in microservices
-XX:MaxGCPauseMillis=200
-Dspring.profiles.active=prod
```

---

## 2. SQL — Data Validation & Performance Triage

### 2.1 Incident SQL Workflow

1. **Reproduce with read-only query** — same filters as failing API
2. **Validate row counts** — expected vs actual
3. **Check freshness** — `MAX(updated_at)`, ETL watermark
4. **Find blocking** — who holds locks
5. **Explain plan** — full table scan? missing index?

### 2.2 Data Validation Templates (PostgreSQL / generic)

```sql
-- Row count sanity
SELECT COUNT(*) FROM patient_encounter WHERE encounter_date = CURRENT_DATE;

-- Duplicate key check (data integrity)
SELECT member_id, claim_id, COUNT(*)
FROM claims_staging
GROUP BY member_id, claim_id
HAVING COUNT(*) > 1;

-- Orphan / referential integrity
SELECT c.claim_id
FROM claims c
LEFT JOIN members m ON c.member_id = m.member_id
WHERE m.member_id IS NULL;

-- Stale pipeline detection
SELECT source_system, MAX(last_updated_ts), COUNT(*) AS row_count
FROM eligibility_feed
GROUP BY source_system
ORDER BY MAX(last_updated_ts);

-- Compare staging vs production counts
SELECT 'staging' AS env, COUNT(*) FROM staging.member_eligibility
UNION ALL
SELECT 'prod', COUNT(*) FROM prod.member_eligibility;
```

### 2.3 High-Yield Join Patterns

```sql
-- Member + latest eligibility (avoid duplicate rows)
SELECT m.member_id, m.full_name, e.plan_code, e.effective_date
FROM members m
JOIN LATERAL (
    SELECT plan_code, effective_date
    FROM member_eligibility e
    WHERE e.member_id = m.member_id
      AND e.effective_date <= CURRENT_DATE
    ORDER BY e.effective_date DESC
    LIMIT 1
) e ON TRUE;

-- Claims with provider (INNER = must exist; LEFT = optional)
SELECT c.claim_id, c.service_date, p.provider_npi, p.provider_name
FROM claims c
INNER JOIN providers p ON c.rendering_provider_id = p.provider_id
WHERE c.claim_status = 'PENDING'
  AND c.service_date >= CURRENT_DATE - INTERVAL '7 days';

-- Find mismatches between systems (support gold)
SELECT a.external_member_id, a.plan_code AS source_a, b.plan_code AS source_b
FROM eligibility_source_a a
FULL OUTER JOIN eligibility_source_b b
  ON a.external_member_id = b.external_member_id
WHERE a.plan_code IS DISTINCT FROM b.plan_code
   OR a.external_member_id IS NULL
   OR b.external_member_id IS NULL;
```

### 2.4 Slow Query / Lock Triage

```sql
-- PostgreSQL: active queries & duration
SELECT pid, usename, state, wait_event_type, wait_event,
       NOW() - query_start AS duration, LEFT(query, 200) AS query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- Blocking chain
SELECT blocked.pid AS blocked_pid,
       blocking.pid AS blocking_pid,
       LEFT(blocked.query, 100) AS blocked_query,
       LEFT(blocking.query, 100) AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking ON blocking.pid = ANY(pg_blocking_pids(blocked.pid));

-- Missing index hint (seq scans on large tables)
SELECT schemaname, relname, seq_scan, idx_scan, n_live_tup
FROM pg_stat_user_tables
WHERE n_live_tup > 100000 AND seq_scan > idx_scan
ORDER BY seq_scan DESC;

-- Execution plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT ... your slow query ...;
```

### 2.5 SQL Support Phrases for Interviews

- "I start read-only — never mutate prod during triage unless runbook says otherwise."
- "I compare **count, max(timestamp), and sample rows** before and after the incident window."
- "I correlate DB spike timing with deploy, batch job, or Kafka consumer surge in Splunk."

---

## 3. Apache Kafka — Operations & Triage

### 3.1 Architecture (30-Second Interview Answer)

> Producers write to **topic partitions**. Each partition is an ordered log replicated across brokers. **Consumer groups** divide partitions among consumers — one consumer per partition max. Offsets track read position. Lag = how far behind the consumer is from the log end.

### 3.2 Key Metrics & Commands

```bash
# Consumer group lag (critical)
kafka-consumer-groups.sh --bootstrap-server <broker>:9092 \
  --group eligibility-consumer-prod --describe

# List groups
kafka-consumer-groups.sh --bootstrap-server <broker>:9092 --list

# Topic metadata
kafka-topics.sh --bootstrap-server <broker>:9092 \
  --describe --topic patient-eligibility-events

# Under-replicated partitions (broker stress)
kafka-topics.sh --bootstrap-server <broker>:9092 --describe | grep -v "Leader:"
```

| Signal | Likely Cause | Action |
|--------|--------------|--------|
| Lag growing on all partitions | Slow consumer processing | Thread dump; DB slowness; scale consumers ≤ partitions |
| Lag on one partition | Hot key / skewed key | Rebalance keys; increase partitions (long-term) |
| Consumer rebalancing loop | Slow processing > `max.poll.interval.ms` | Increase interval or speed up handler; reduce batch size |
| Producer timeouts | Broker load, ISR shrink, network | Broker disk/CPU; min.insync.replicas; retry storm |
| Repeated messages | At-least-once + crash before commit | Idempotent consumer; check offset commit logs |

### 3.3 Consumer Lag Triage Steps

1. `kafka-consumer-groups --describe` — which group, which topic, lag per partition
2. Splunk — consumer ERROR logs, processing time, rebalance events
3. DB — is consumer writing to DB and blocking?
4. Compare message rate vs processing rate (msgs/sec)
5. Check `max.poll.records`, handler exceptions, poison pill message
6. **Poison pill:** skip/DLT after N retries; fix and replay from offset

### 3.4 Healthcare Streaming Context

- **PHI in logs:** never log full member ID/SSN — use hashed correlation ID
- **Ordering:** same `member_id` as partition key preserves per-member order
- **Compliance:** audit trail topics — lag = delayed compliance reporting, not just UX

---

## 4. Splunk — SPL Templates for Production Support

### 4.1 SPL Basics

```
index=<app_index> sourcetype=<java_log>
| timechart span=5m count by level
```

**Fields to know:** `index`, `sourcetype`, `host`, `source`, `_time`, `level`, `logger`, `message`, `traceId`, `correlationId`, `exception`, `stack_trace`

### 4.2 Error Spike Detection

```spl
index=kp_apps sourcetype=springboot_log level=ERROR earliest=-1h
| timechart span=5m count
```

```spl
index=kp_apps sourcetype=springboot_log earliest=-30m
| rex field=_raw "(?<exception_class>[a-zA-Z0-9_.]+Exception)"
| stats count by exception_class
| sort - count
```

### 4.3 Trace a Single Request (Correlation ID)

```spl
index=kp_apps correlationId="a1b2c3d4-e5f6-7890-abcd-ef1234567890" earliest=-24h
| sort _time
| table _time host service level message
```

### 4.4 JDBC / Connection Pool Errors

```spl
index=kp_apps earliest=-2h
("CannotGetJdbcConnectionException" OR "SQLTimeoutException" OR "HikariPool" OR "Connection is not available")
| stats count by host, message
| sort - count
```

### 4.5 Kafka Consumer Issues

```spl
index=kp_apps sourcetype=springboot_log earliest=-2h
("Consumer group" OR "offset commit" OR "rebalance" OR "RecordDeserializationException" OR "org.apache.kafka")
| rex field=_raw "group=(?<consumer_group>[^\s,]+)"
| stats count by consumer_group, message
```

```spl
index=kp_apps metric_name="kafka.consumer.lag" earliest=-6h
| timechart span=10m max(lag) by consumer_group
```

### 4.6 Deploy / Change Correlation

```spl
index=kp_deployments OR index=kp_apps
| eval event_type=if(match(source, "deploy"), "deploy", "app_log")
| where _time > relative_time(now(), "-4h")
| sort _time
| table _time event_type host source message
```

### 4.7 High Latency Endpoints

```spl
index=kp_apps sourcetype=access_log earliest=-1h
| rex field=_raw "(?<response_time>\d+)ms"
| where response_time > 5000
| stats avg(response_time) p95(response_time) count by uri
| sort - p95(response_time)
```

### 4.8 Splunk Alert Template (Interview Talking Point)

```spl
index=kp_apps level=ERROR earliest=-5m
| stats count as error_count
| where error_count > 50
```

**Alert workflow:** threshold → Slack/PagerDuty → auto-create JIRA Sev-2 → link Splunk search URL in ticket.

### 4.9 Interview SPL Tips

- Always bound time: `earliest=-1h` (reduces noise + cost)
- Use `transaction` for session grouping:  
  `index=kp_apps correlationId=* | transaction correlationId maxspan=5m`
- Save searches → share link in JIRA for reproducibility

---

## 5. JIRA / Rally — Incident Workflow

### 5.1 Severity Framework (Typical Enterprise)

| Sev | Definition | Response |
|-----|------------|----------|
| **1** | Patient care / revenue critical, widespread outage | Bridge call, exec comms, 15-min updates |
| **2** | Major feature degraded, workaround exists | War room, hourly updates |
| **3** | Limited impact, single team | Normal queue, business hours |
| **4** | Minor / cosmetic | Backlog |

### 5.2 Ticket Prioritization (Support II)

1. **Safety & compliance** — PHI exposure, audit failure
2. **Patient/member impact** — eligibility, claims, scheduling
3. **Breadth** — % users / regions affected
4. **Duration** — how long already broken
5. **Workaround** — manual process available?

### 5.3 Good JIRA Incident Comment Template

```
## Impact
- Service: eligibility-enrollment-api (prod, west)
- Started: 2026-07-15 09:12 UTC (detected via Splunk alert)
- Users: ~12% enrollment failures (502 from gateway)

## Current Status
Investigating. DB connection pool exhausted on 3/8 pods.

## Actions Taken
1. Splunk: ERROR spike correlates with kafka lag on eligibility-consumer (+45k)
2. Thread dump: 180/200 threads waiting on Hikari pool
3. Scaled consumers 4→8 — lag stabilizing
4. Engaged DBA — blocking session PID 28491 killed (runbook-approved)

## Next Steps
- Monitor lag & pool metrics 30 min
- RCA doc if stable by 11:00 UTC

## Links
- Splunk: <saved search URL>
- Bridge: <zoom/teams link>
```

### 5.4 Rally ↔ Engineering Coordination

- **Rally user story** = planned work | **JIRA incident** = unplanned break/fix
- During incident: single **incident commander**, **scribe** updates JIRA, **SME** drives technical triage
- Post-incident: blameless RCA, action items as JIRA tickets with owners + due dates

---

## 6. Production Triage Framework (Memorize This)

```
DETECT → TRIAGE → MITIGATE → RESOLVE → DOCUMENT
```

| Phase | Actions |
|-------|---------|
| **Detect** | Alert (Splunk/PagerDuty), user report, monitoring dashboard |
| **Triage** | Severity, blast radius, recent changes, duplicate incidents |
| **Mitigate** | Rollback, scale, circuit breaker, disable feature flag, rate limit |
| **Resolve** | Root cause fix — code, config, data, infra |
| **Document** | JIRA timeline, Splunk searches, thread dump links, RCA within 48h |

### 6.1 "Level II" Communication Script

> "I'm declaring Sev-2 for eligibility sync delay. Member impact: new enrollments may show stale plan data for up to 30 minutes. Mitigation: we scaled consumers and paused non-critical batch replay. Next update in 30 minutes or sooner if lag clears."

---

## 7. Healthcare / Kaiser Context Notes

- **HIPAA:** minimum necessary in tickets — no PHI in JIRA title; use internal IDs
- **Integrated care model:** outages may hit member portal + provider tools + billing — ask cross-domain impact
- **Batch vs real-time:** many health systems have nightly ETL — distinguish "broken since deploy" vs "batch didn't run"
- **Change windows:** prod changes often restricted — note if incident aligns with CAB-approved release

---

## 8. Day-Before Interview Quick Review (30 min)

- [ ] Thread dump: BLOCKED, deadlock, pool exhaustion
- [ ] 5 Splunk queries: error spike, correlationId, JDBC, Kafka, deploy correlation
- [ ] Kafka lag: `consumer-groups --describe`
- [ ] SQL: blocking sessions + orphan row check
- [ ] STAR story: led incident bridge / coordinated UAT / cutover
- [ ] One-liner: "Detect → Triage → Mitigate → Resolve → Document"

---

*Generated for Kaiser Permanente Java Support II interview prep — Mindtel Global.*
