const TOPICS = {

"overview": {
  title: "Overview",
  html: `
<h2>API Gateway &amp; Rate Limiting Interview Guide</h2>
<p class="subtitle">Java Backend · Spring Boot · Microservices · Lenskart · Swiggy · JP Morgan · Product Companies · 2026</p>

<span class="tag tag-blue">API Gateway</span>
<span class="tag tag-green">Rate Limiting</span>
<span class="tag tag-yellow">Spring Cloud Gateway</span>
<span class="tag tag-red">Redis</span>
<span class="tag tag-blue">Production</span>

<p>API Gateway and Rate Limiting are now <strong>must-know topics</strong> for Java backend interviews at product companies. Interviewers expect you to explain not just definitions, but <em>architecture decisions</em>, <em>trade-offs</em>, and <em>production experience</em>.</p>

<div class="simple-box">
  <h4>How to Use This Guide</h4>
  <p>Each question includes: <strong>In Simple Terms</strong> (plain English), internal mechanics, diagrams/code, a <strong>30-second interview answer</strong>, and common mistakes. Practice explaining Q23 (real project) and Q9 (Spring Cloud Gateway) out loud — these are experience-based follow-ups.</p>
</div>

<h3>All 25 Questions</h3>
<table>
  <tr><th>#</th><th>Question</th><th>Section</th></tr>
  <tr><td>Q1</td><td>What is an API Gateway, and why do we need it?</td><td>API Gateway</td></tr>
  <tr><td>Q2</td><td>API Gateway vs Load Balancer — What's the difference?</td><td>API Gateway</td></tr>
  <tr><td>Q3</td><td>What responsibilities should an API Gateway handle?</td><td>API Gateway</td></tr>
  <tr><td>Q4</td><td>How does routing work inside an API Gateway?</td><td>API Gateway</td></tr>
  <tr><td>Q5</td><td>How do you implement authentication using JWT at the API Gateway?</td><td>API Gateway</td></tr>
  <tr><td>Q6</td><td>How does an API Gateway improve security?</td><td>API Gateway</td></tr>
  <tr><td>Q7</td><td>How do you prevent a single microservice from getting overloaded?</td><td>API Gateway</td></tr>
  <tr><td>Q8</td><td>What happens if the API Gateway itself goes down?</td><td>API Gateway</td></tr>
  <tr><td>Q9</td><td>Have you used Spring Cloud Gateway? Explain your experience.</td><td>API Gateway</td></tr>
  <tr><td>Q10</td><td>How does API Gateway communicate with service discovery?</td><td>API Gateway</td></tr>
  <tr><td>Q11</td><td>What is rate limiting, and why is it required?</td><td>Rate Limiting</td></tr>
  <tr><td>Q12</td><td>Which rate-limiting algorithms do you know?</td><td>Rate Limiting</td></tr>
  <tr><td>Q13</td><td>Why is Token Bucket preferred over Fixed Window?</td><td>Rate Limiting</td></tr>
  <tr><td>Q14</td><td>Explain Token Bucket with a real-world example.</td><td>Rate Limiting</td></tr>
  <tr><td>Q15</td><td>How does Redis help implement distributed rate limiting?</td><td>Rate Limiting</td></tr>
  <tr><td>Q16</td><td>What happens when Redis becomes unavailable?</td><td>Rate Limiting</td></tr>
  <tr><td>Q17</td><td>How do you apply different limits for free and premium users?</td><td>Rate Limiting</td></tr>
  <tr><td>Q18</td><td>Where should rate limiting be implemented?</td><td>Rate Limiting</td></tr>
  <tr><td>Q19</td><td>What HTTP status code is returned when the limit is exceeded?</td><td>Rate Limiting</td></tr>
  <tr><td>Q20</td><td>How do you avoid race conditions with multiple servers?</td><td>Rate Limiting</td></tr>
  <tr><td>Q21</td><td>How does rate limiting reduce infrastructure cost?</td><td>Rate Limiting</td></tr>
  <tr><td>Q22</td><td>How would you monitor rate-limit metrics in production?</td><td>Rate Limiting</td></tr>
  <tr><td>Q23</td><td>Have you implemented rate limiting in a real project?</td><td>Rate Limiting</td></tr>
  <tr><td>Q24</td><td>How do you test whether rate limiting works correctly?</td><td>Rate Limiting</td></tr>
  <tr><td>Q25</td><td>What challenges did you face while implementing rate limiting?</td><td>Rate Limiting</td></tr>
</table>

<div class="diagram">Client (Mobile/Web)
       │
       ▼
┌──────────────────┐
│   API Gateway    │  ← Auth, Rate Limit, Routing, SSL
│  (Spring Cloud   │
│    Gateway)      │
└────────┬─────────┘
         │  Service Discovery (Eureka / K8s)
    ┌────┼────┬─────────┐
    ▼    ▼    ▼         ▼
 Order  User Payment  Inventory
 Service Service Service Service
         │
         ▼
    ┌─────────┐
    │  Redis  │  ← Distributed rate-limit counters
    └─────────┘</div>
`
},

"q01": {
  title: "Q1 — What is an API Gateway?",
  html: `
<h2>What is an API Gateway, and why do we need it?</h2>
<p class="subtitle">API Gateway · Microservices · Entry Point</p>
<span class="tag tag-blue">API Gateway</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>An <strong>API Gateway</strong> is the <em>single front door</em> to your backend. Instead of clients calling 10 different microservices directly, they call one gateway URL. The gateway handles routing, security, and cross-cutting concerns so individual services stay focused on business logic.</p>
</div>

<div class="analogy-box">
  <h4>Real-World Analogy</h4>
  <p>Think of a hotel reception desk. Guests don't walk into the kitchen, laundry, or housekeeping directly — they go to reception, which routes their request to the right department. The API Gateway is that reception desk for your microservices.</p>
</div>

<h3>Why Do We Need It?</h3>
<ul>
  <li><strong>Single entry point</strong> — Clients need one URL, not a map of internal service IPs/ports.</li>
  <li><strong>Cross-cutting concerns</strong> — Authentication, rate limiting, logging, and CORS belong at the edge, not duplicated in every service.</li>
  <li><strong>Protocol translation</strong> — REST on the outside, gRPC or internal HTTP on the inside.</li>
  <li><strong>Service abstraction</strong> — Refactor or split services without breaking mobile apps.</li>
  <li><strong>Security boundary</strong> — Internal services stay in a private network; only the gateway is public.</li>
</ul>

<div class="diagram">WITHOUT Gateway:                    WITH Gateway:
Mobile ──► Order Service             Mobile ──► API Gateway ──► Order Service
Mobile ──► User Service                          │              ──► User Service
Mobile ──► Payment Service                       └──────────────► Payment Service
(3 URLs, 3 auth implementations, exposed internals)</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> An API Gateway is a reverse proxy that sits between clients and microservices, providing a single entry point. It handles routing, authentication, rate limiting, SSL termination, and request aggregation. We need it to avoid duplicating cross-cutting logic across services, hide internal architecture, and simplify client integration.</div>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Calling it "just a load balancer" — it does much more than distribute traffic.</li>
    <li>Putting business logic in the gateway — it should stay thin (routing + cross-cutting only).</li>
    <li>Skipping the gateway in monolith-to-microservices migration and letting clients call services directly.</li>
  </ul>
</div>
`
},

"q02": {
  title: "Q2 — Gateway vs Load Balancer",
  html: `
<h2>API Gateway vs Load Balancer — What's the difference?</h2>
<p class="subtitle">L4 vs L7 · Architecture · Trade-offs</p>
<span class="tag tag-blue">API Gateway</span>
<span class="tag tag-yellow">Load Balancer</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>A <strong>Load Balancer</strong> distributes traffic across multiple <em>identical</em> servers (same app, different instances). An <strong>API Gateway</strong> routes requests to <em>different services</em> based on URL/path and applies business-aware policies like JWT validation and rate limiting.</p>
</div>

<h3>Key Differences</h3>
<table>
  <tr><th>Aspect</th><th>Load Balancer</th><th>API Gateway</th></tr>
  <tr><td>OSI Layer</td><td>L4 (TCP) or L7 (HTTP)</td><td>L7 (HTTP/HTTPS)</td></tr>
  <tr><td>Primary job</td><td>Distribute load across replicas</td><td>Route to different services + policies</td></tr>
  <tr><td>Routing</td><td>Round-robin, least connections</td><td>Path, header, host-based routing</td></tr>
  <tr><td>Auth / JWT</td><td>Usually no</td><td>Yes — validate tokens at edge</td></tr>
  <tr><td>Rate limiting</td><td>Basic (connection-level)</td><td>Per-user, per-API, per-tier</td></tr>
  <tr><td>Request transformation</td><td>No</td><td>Header injection, body rewrite</td></tr>
  <tr><td>Examples</td><td>AWS ALB/NLB, HAProxy, Nginx</td><td>Spring Cloud Gateway, Kong, AWS API Gateway</td></tr>
</table>

<h3>In Production — They Work Together</h3>
<div class="diagram">Internet
   │
   ▼
┌─────────────┐
│ Load Balancer│  ← Distributes traffic across gateway instances
└──────┬──────┘
       │
  ┌────┴────┐
  ▼         ▼
Gateway-1  Gateway-2   ← API Gateway cluster (HA)
  │
  ├──► Order Service (3 replicas behind another LB)
  └──► User Service (2 replicas)</div>

<p>In Kubernetes, an Ingress Controller often combines both roles — it load-balances to gateway pods AND routes <code>/orders</code> vs <code>/users</code>.</p>

<div class="answer-simple"><strong>30-Second Answer:</strong> A load balancer distributes traffic among identical instances of the same service for availability and scale. An API Gateway routes to different microservices, handles auth, rate limiting, and request transformation. In production you typically use both: LB in front of gateway instances for HA, gateway for intelligent routing and policies.</div>
`
},

"q03": {
  title: "Q3 — Gateway Responsibilities",
  html: `
<h2>What responsibilities should an API Gateway handle?</h2>
<p class="subtitle">Cross-Cutting Concerns · Edge Layer</p>
<span class="tag tag-blue">API Gateway</span>

<div class="card-grid">
  <div class="card"><h4>Routing</h4><p>Path-based (<code>/api/orders/**</code>), header-based, or host-based routing to the correct downstream service.</p></div>
  <div class="card"><h4>Authentication</h4><p>Validate JWT/OAuth2 tokens. Reject unauthenticated requests before they hit backend services.</p></div>
  <div class="card"><h4>Authorization</h4><p>Check roles/scopes from token claims. Route admin APIs only for admin users.</p></div>
  <div class="card"><h4>Rate Limiting</h4><p>Protect backends from abuse. Apply per-user, per-IP, or per-API limits.</p></div>
  <div class="card"><h4>SSL Termination</h4><p>Handle HTTPS at the edge. Internal service-to-service traffic can use plain HTTP or mTLS.</p></div>
  <div class="card"><h4>Request/Response Transformation</h4><p>Add internal headers (<code>X-User-Id</code>), strip sensitive headers, rewrite paths.</p></div>
  <div class="card"><h4>CORS</h4><p>Handle preflight OPTIONS requests so browsers can call your API from web apps.</p></div>
  <div class="card"><h4>Logging &amp; Tracing</h4><p>Generate/propagate correlation IDs. Central access logs for all API traffic.</p></div>
  <div class="card"><h4>Circuit Breaking</h4><p>Stop forwarding to unhealthy downstream services. Return fallback responses.</p></div>
  <div class="card"><h4>Request Aggregation</h4><p>Combine multiple backend calls into one response (BFF pattern).</p></div>
</div>

<h3>What Should NOT Be in the Gateway</h3>
<ul>
  <li>Business logic (order calculation, discount rules)</li>
  <li>Database access</li>
  <li>Heavy data transformation or enrichment</li>
  <li>Long-running computations — gateway should stay stateless and fast</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> The gateway handles routing, authentication, authorization, rate limiting, SSL termination, CORS, logging/tracing, and resilience (circuit breaking, timeouts). It should NOT contain business logic — keep it thin so it remains fast, stateless, and easy to scale horizontally.</div>
`
},

"q04": {
  title: "Q4 — Routing in API Gateway",
  html: `
<h2>How does routing work inside an API Gateway?</h2>
<p class="subtitle">Predicates · Filters · Spring Cloud Gateway</p>
<span class="tag tag-blue">API Gateway</span>
<span class="tag tag-green">Spring Cloud Gateway</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Routing = <strong>match incoming request</strong> (predicates) → <strong>apply policies</strong> (filters) → <strong>forward to target service</strong> (URI). Think: "If URL starts with /orders, send to order-service after checking JWT."</p>
</div>

<h3>Routing Flow</h3>
<div class="steps-box">
  <h4>Step-by-Step</h4>
  <ol>
    <li>Request arrives: <code>GET /api/orders/123</code></li>
    <li><strong>Predicates</strong> evaluate: Path matches <code>/api/orders/**</code>? Method is GET? Header present?</li>
    <li>First matching route wins (order matters in config)</li>
    <li><strong>Pre-filters</strong> run: JWT validation, rate limit check, add headers</li>
    <li>Request forwarded to downstream URI (static or via service discovery)</li>
    <li><strong>Post-filters</strong> run: add response headers, log latency</li>
    <li>Response returned to client</li>
  </ol>
</div>

<h3>Spring Cloud Gateway Example</h3>
<pre><code>// application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service          # lb = load-balanced via Eureka
          predicates:
            - Path=/api/orders/**
            - Method=GET,POST
          filters:
            - StripPrefix=1                  # remove /api before forwarding
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 100
                redis-rate-limiter.burstCapacity: 200
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**</code></pre>

<h3>Routing Strategies</h3>
<table>
  <tr><th>Strategy</th><th>Example</th><th>Use Case</th></tr>
  <tr><td>Path-based</td><td><code>/api/v1/orders/**</code></td><td>Most common — REST API versioning</td></tr>
  <tr><td>Header-based</td><td><code>X-API-Version: 2</code></td><td>Canary releases, A/B testing</td></tr>
  <tr><td>Host-based</td><td><code>orders.myapp.com</code></td><td>Multi-tenant or subdomain routing</td></tr>
  <tr><td>Weight-based</td><td>90% v1, 10% v2</td><td>Gradual rollout of new service version</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> Routing uses predicates to match requests (path, method, headers) and filters to apply policies before forwarding. In Spring Cloud Gateway, each route has a URI (often <code>lb://service-name</code> for Eureka), predicates for matching, and filters for auth/rate-limit/transform. First matching route wins.</div>
`
},

"q05": {
  title: "Q5 — JWT Auth at Gateway",
  html: `
<h2>How do you implement authentication using JWT at the API Gateway?</h2>
<p class="subtitle">JWT · OAuth2 · Spring Security · Gateway Filters</p>
<span class="tag tag-blue">API Gateway</span>
<span class="tag tag-red">Security</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>The gateway validates the JWT <em>before</em> forwarding the request. It checks signature, expiry, and issuer. If valid, it extracts user info (userId, roles) and passes them as headers to downstream services — so microservices trust the gateway and don't re-validate the token.</p>
</div>

<h3>JWT Validation Flow at Gateway</h3>
<div class="steps-box">
  <h4>Step-by-Step</h4>
  <ol>
    <li>Client sends: <code>Authorization: Bearer eyJhbGciOi...</code></li>
    <li>Gateway filter extracts token from header</li>
    <li>Validate signature using public key (RS256) or shared secret (HS256)</li>
    <li>Check <code>exp</code> (not expired), <code>iss</code> (correct issuer), <code>aud</code> (audience)</li>
    <li>Extract claims: <code>sub</code> (userId), <code>roles</code>, <code>scope</code></li>
    <li>Add internal headers: <code>X-User-Id: 42</code>, <code>X-Roles: USER,PREMIUM</code></li>
    <li>Forward to downstream — microservice reads headers, skips token validation</li>
  </ol>
</div>

<pre><code>// Custom Gateway Filter (Spring Cloud Gateway + WebFlux)
@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {

    @Override
    public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String authHeader = exchange.getRequest()
            .getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        Claims claims = jwtParser.parseClaimsJws(token).getBody();

        ServerHttpRequest mutated = exchange.getRequest().mutate()
            .header("X-User-Id", claims.getSubject())
            .header("X-Roles", String.join(",", claims.get("roles", List.class)))
            .build();

        return chain.filter(exchange.mutate().request(mutated).build());
    }

    @Override public int getOrder() { return -100; } // run early
}</code></pre>

<h3>Public vs Protected Routes</h3>
<pre><code>spring:
  cloud:
    gateway:
      routes:
        - id: auth-public
          uri: lb://auth-service
          predicates:
            - Path=/api/auth/login,/api/auth/register
          # No JWT filter — public endpoints
        - id: protected-routes
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - JwtAuthFilter   # custom filter applied here</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Implement a gateway filter that extracts the Bearer token, validates signature and expiry, extracts claims (userId, roles), and injects them as trusted internal headers for downstream services. Public routes like login/register skip the filter. Use RS256 with a public key from your auth server (Keycloak, Auth0) for production.</div>

<div class="mistake-box">
  <h4>Common Mistakes</h4>
  <ul>
    <li>Letting downstream services re-parse JWT without verifying gateway stripped the original token</li>
    <li>Not validating token expiry — accepting expired tokens</li>
    <li>Trusting client-sent <code>X-User-Id</code> headers — gateway must overwrite them</li>
  </ul>
</div>
`
},

"q06": {
  title: "Q6 — Gateway Security",
  html: `
<h2>How does an API Gateway improve security?</h2>
<p class="subtitle">Defense in Depth · Zero Trust Edge</p>
<span class="tag tag-red">Security</span>

<h3>Security Benefits</h3>
<ul>
  <li><strong>Hide internal network</strong> — Microservices are not exposed to the internet. Only gateway ports are public.</li>
  <li><strong>Centralized auth</strong> — One place to enforce JWT/OAuth2; no service can accidentally skip authentication.</li>
  <li><strong>IP whitelisting / geo-blocking</strong> — Block traffic from specific regions or IPs at the edge.</li>
  <li><strong>Request size limits</strong> — Reject oversized payloads before they reach backends (DoS protection).</li>
  <li><strong>Header sanitization</strong> — Strip dangerous headers clients shouldn't control.</li>
  <li><strong>Rate limiting</strong> — Prevent brute-force login, scraping, and API abuse.</li>
  <li><strong>SSL/TLS termination</strong> — Enforce HTTPS; internal traffic can use mTLS between gateway and services.</li>
  <li><strong>WAF integration</strong> — AWS WAF, Cloudflare in front of gateway for SQL injection, XSS protection.</li>
  <li><strong>Audit logging</strong> — Every API call logged centrally for compliance (SOC2, PCI-DSS).</li>
</ul>

<div class="diagram">Internet (untrusted)
       │
       ▼
┌─────────────────┐
│  WAF / CDN      │  DDoS, bot protection
└────────┬────────┘
         ▼
┌─────────────────┐
│  API Gateway    │  JWT, rate limit, IP filter
│  (DMZ / public) │
└────────┬────────┘
         │  Private VPC / K8s cluster
    ┌────┴────┐
    ▼         ▼
 Order Svc   User Svc   ← Not reachable from internet</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> The gateway acts as a security perimeter — it hides internal services, centralizes authentication, enforces rate limits, validates input size, and provides audit logs. Combined with WAF and private networking, it implements defense-in-depth so a compromised client cannot directly attack microservices.</div>
`
},

"q07": {
  title: "Q7 — Prevent Service Overload",
  html: `
<h2>How do you prevent a single microservice from getting overloaded?</h2>
<p class="subtitle">Rate Limiting · Circuit Breaker · Bulkhead · Timeouts</p>
<span class="tag tag-yellow">Resilience</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>When one service (say Payment) gets hammered, you need <strong>multiple layers of protection</strong> at the gateway and within the service mesh so traffic is throttled, failures are isolated, and cascading outages are prevented.</p>
</div>

<h3>Protection Layers</h3>
<table>
  <tr><th>Technique</th><th>Where</th><th>What It Does</th></tr>
  <tr><td>Rate Limiting</td><td>Gateway</td><td>Cap requests/sec to Payment service globally</td></tr>
  <tr><td>Circuit Breaker</td><td>Gateway / Resilience4j</td><td>Stop calling Payment when error rate exceeds threshold</td></tr>
  <tr><td>Timeouts</td><td>Gateway</td><td>Don't wait forever — return 504 after 3s</td></tr>
  <tr><td>Bulkhead</td><td>Gateway thread pools</td><td>Isolate Payment calls from Order calls</td></tr>
  <tr><td>Retry with backoff</td><td>Gateway</td><td>Retry transient failures, not overload</td></tr>
  <tr><td>Queue / async</td><td>Service itself</td><td>Accept request, process later (Kafka)</td></tr>
  <tr><td>Auto-scaling</td><td>K8s HPA</td><td>Scale Payment pods when CPU/latency rises</td></tr>
</table>

<pre><code>// Spring Cloud Gateway — per-route rate limit to protect Payment
spring:
  cloud:
    gateway:
      routes:
        - id: payment-service
          uri: lb://payment-service
          predicates:
            - Path=/api/payments/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 50    # 50 req/sec sustained
                redis-rate-limiter.burstCapacity: 100   # allow bursts up to 100
            - name: CircuitBreaker
              args:
                name: paymentCircuitBreaker
                fallbackUri: forward:/fallback/payment</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Protect overloaded services using rate limiting at the gateway (cap requests per route), circuit breakers (stop forwarding when errors spike), timeouts, and bulkheads (isolate thread pools). Combine with auto-scaling on the service side and async processing for non-critical paths. The gateway is the first line of defense.</div>
`
},

"q08": {
  title: "Q8 — Gateway Failure",
  html: `
<h2>What happens if the API Gateway itself goes down?</h2>
<p class="subtitle">High Availability · Disaster Recovery</p>
<span class="tag tag-red">Availability</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>If the gateway is a <strong>single instance</strong>, everything goes down — no client can reach any service. That's why production gateways are always deployed as a <strong>cluster behind a load balancer</strong> with health checks and auto-recovery.</p>
</div>

<h3>HA Architecture</h3>
<div class="diagram">                    ┌─────────────┐
Clients ──────────►│ Load Balancer│ (AWS ALB / Nginx / K8s Ingress)
                    └──────┬──────┘
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Gateway-1    Gateway-2    Gateway-3   (stateless, identical)
              │            │            │
              └────────────┼────────────┘
                           ▼
                    Microservices</div>

<h3>Strategies When Gateway Fails</h3>
<ul>
  <li><strong>Multiple instances</strong> — Run 3+ gateway pods across availability zones.</li>
  <li><strong>Health checks</strong> — LB removes unhealthy gateway instances automatically.</li>
  <li><strong>Stateless design</strong> — Gateway holds no session state; any instance handles any request. Rate-limit state lives in Redis.</li>
  <li><strong>Auto-restart</strong> — K8s liveness/readiness probes restart crashed pods.</li>
  <li><strong>Blue-green / rolling deploy</strong> — Zero-downtime gateway updates.</li>
  <li><strong>Multi-region failover</strong> — DNS failover to gateway in another region (advanced).</li>
</ul>

<div class="analogy-box">
  <h4>Interview Tip</h4>
  <p>Follow up with: "The gateway is stateless, so scaling horizontally is straightforward. The real SPOF risk is Redis (for rate limiting) or the load balancer itself — those also need HA (Redis Sentinel/Cluster, multi-AZ LB)."</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> A single gateway instance is a SPOF — if it dies, all API traffic stops. Production mitigates this with multiple stateless gateway instances behind a load balancer, health checks, auto-restart via K8s, and multi-AZ deployment. Rate-limit state in Redis also needs HA (Sentinel/Cluster).</div>
`
},

"q09": {
  title: "Q9 — Spring Cloud Gateway Experience",
  html: `
<h2>Have you used Spring Cloud Gateway? Explain your experience.</h2>
<p class="subtitle">Spring Cloud · WebFlux · Production Experience</p>
<span class="tag tag-green">Spring Cloud Gateway</span>

<div class="simple-box">
  <h4>Sample Interview Answer (Adapt to Your Project)</h4>
  <p>"In our microservices project, we used <strong>Spring Cloud Gateway</strong> as the single entry point. It runs on <strong>Project Reactor (WebFlux)</strong>, so it's non-blocking and handles high concurrency efficiently. We integrated it with <strong>Eureka</strong> for service discovery and <strong>Redis</strong> for distributed rate limiting."</p>
</div>

<h3>What to Mention</h3>
<div class="steps-box">
  <h4>Technical Details Interviewers Want</h4>
  <ol>
    <li><strong>Stack:</strong> Spring Boot 3 + Spring Cloud Gateway + Eureka + Redis + Resilience4j</li>
    <li><strong>Routes configured</strong> in YAML or Java <code>RouteLocator</code> bean</li>
    <li><strong>Custom filters:</strong> JWT validation filter, request logging filter</li>
    <li><strong>Built-in filters used:</strong> <code>StripPrefix</code>, <code>RequestRateLimiter</code>, <code>CircuitBreaker</code></li>
    <li><strong>Why WebFlux:</strong> Gateway is I/O-bound (proxying requests) — reactive model scales better than servlet threads</li>
    <li><strong>Observability:</strong> Micrometer metrics + Zipkin tracing propagated via gateway</li>
  </ol>
</div>

<pre><code>// Java-based route configuration
@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("order-service", r -> r
                .path("/api/orders/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .requestRateLimiter(c -> c
                        .setRateLimiter(redisRateLimiter())
                        .setKeyResolver(userKeyResolver())))
                .uri("lb://order-service"))
            .build();
    }

    @Bean
    KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest().getHeaders()
                .getFirst("X-User-Id") != null
                ? exchange.getRequest().getHeaders().getFirst("X-User-Id")
                : exchange.getRequest().getRemoteAddress()
                    .getAddress().getHostAddress());
    }
}</code></pre>

<h3>Spring Cloud Gateway vs Zuul</h3>
<table>
  <tr><th>Feature</th><th>Spring Cloud Gateway</th><th>Zuul 1</th></tr>
  <tr><td>Model</td><td>Reactive (WebFlux)</td><td>Blocking (Servlet)</td></tr>
  <tr><td>Performance</td><td>Higher throughput</td><td>Thread-per-request bottleneck</td></tr>
  <tr><td>Status</td><td>Actively maintained</td><td>Maintenance mode</td></tr>
  <tr><td>Spring Boot 3</td><td>Supported</td><td>Not compatible</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> "We used Spring Cloud Gateway on WebFlux as our API entry point with Eureka service discovery and Redis-backed rate limiting. I configured path-based routes, a custom JWT filter, and Resilience4j circuit breakers. Chose it over Zuul for non-blocking I/O and Spring Boot 3 compatibility."</div>
`
},

"q10": {
  title: "Q10 — Service Discovery Integration",
  html: `
<h2>How does API Gateway communicate with service discovery (Eureka/Kubernetes)?</h2>
<p class="subtitle">Eureka · Kubernetes · Dynamic Routing</p>
<span class="tag tag-blue">Service Discovery</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Instead of hardcoding <code>http://10.0.1.5:8080</code>, the gateway asks the <strong>service registry</strong> "where is order-service?" and gets a list of healthy instances. It then load-balances across them using <code>lb://order-service</code>.</p>
</div>

<h3>With Eureka (Spring Cloud)</h3>
<div class="steps-box">
  <h4>Flow</h4>
  <ol>
    <li>Each microservice registers with Eureka on startup: <code>order-service → [10.0.1.5:8080, 10.0.1.6:8080]</code></li>
    <li>Gateway route URI: <code>lb://order-service</code> (lb = load-balanced)</li>
    <li>Gateway's <code>ReactiveLoadBalancerClientFilter</code> resolves name via Eureka</li>
    <li>Picks an instance (round-robin) and forwards the request</li>
    <li>If instance dies, Eureka deregisters it; gateway stops routing there</li>
  </ol>
</div>

<pre><code># Gateway application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service        # resolved via Eureka
          predicates:
            - Path=/api/orders/**
eureka:
  client:
    service-url:
      defaultZone: http://eureka-server:8761/eureka/</code></pre>

<h3>With Kubernetes</h3>
<p>In K8s, service discovery is built-in via <strong>DNS and Services</strong>. No Eureka needed.</p>
<pre><code># Gateway route in K8s — use K8s Service name
spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: http://order-service.default.svc.cluster.local:8080
          # Or with Spring Cloud Kubernetes discovery:
          uri: lb://order-service   # K8s Endpoints provide instances</code></pre>

<table>
  <tr><th>Environment</th><th>Discovery</th><th>Gateway URI</th></tr>
  <tr><td>Spring Cloud + Eureka</td><td>Eureka Server</td><td><code>lb://service-name</code></td></tr>
  <tr><td>Kubernetes</td><td>K8s Service/Endpoints</td><td><code>lb://service-name</code> or K8s DNS</td></tr>
  <tr><td>Consul</td><td>HashiCorp Consul</td><td><code>lb://service-name</code></td></tr>
  <tr><td>Static (dev only)</td><td>None</td><td><code>http://localhost:8081</code></td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> The gateway uses <code>lb://service-name</code> URIs. With Eureka, the ReactiveLoadBalancerClientFilter queries the registry for healthy instances and load-balances. With Kubernetes, K8s Services/Endpoints provide the same via DNS or Spring Cloud Kubernetes. This eliminates hardcoded IPs and enables dynamic scaling.</div>
`
},

"q11": {
  title: "Q11 — What is Rate Limiting?",
  html: `
<h2>What is rate limiting, and why is it required?</h2>
<p class="subtitle">Traffic Control · API Protection · Fair Usage</p>
<span class="tag tag-green">Rate Limiting</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Rate limiting controls <strong>how many requests</strong> a client can make in a given time window. Exceed the limit → request is rejected (HTTP 429). It's like a bouncer at a club saying "only 100 people per hour."</p>
</div>

<h3>Why Is It Required?</h3>
<ul>
  <li><strong>Protect backend services</strong> — Prevent one client from overwhelming your servers (accidental loops, misconfigured clients).</li>
  <li><strong>Prevent abuse</strong> — Stop scraping, brute-force attacks, credential stuffing.</li>
  <li><strong>Fair usage</strong> — Ensure all users get reasonable access, not just the heaviest consumer.</li>
  <li><strong>Cost control</strong> — Cloud resources scale with traffic; unlimited requests = unlimited bills.</li>
  <li><strong>SLA enforcement</strong> — Free tier: 100 req/min; Premium: 10,000 req/min.</li>
  <li><strong>Stability during spikes</strong> — Flash sales (Lenskart), food rush (Swiggy) need controlled admission.</li>
  <li><strong>Third-party API quotas</strong> — Your service calls external APIs with limits; rate limit your users accordingly.</li>
</ul>

<div class="analogy-box">
  <h4>Real-World Example — Swiggy</h4>
  <p>During lunch rush, Swiggy rate-limits search API calls per user to prevent one bot from scraping all restaurant data. Order placement API has higher limits for premium users. Without this, the order service would crash under spike load.</p>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Rate limiting restricts how many requests a client can make per time window. It's required to protect backends from overload, prevent abuse and scraping, enforce fair usage and tiered SLAs, and control infrastructure costs. Typically implemented at the API Gateway using Redis for distributed counting.</div>
`
},

"q12": {
  title: "Q12 — Rate Limiting Algorithms",
  html: `
<h2>Which rate-limiting algorithms do you know?</h2>
<p class="subtitle">Fixed Window · Sliding Window · Token Bucket · Leaky Bucket</p>
<span class="tag tag-green">Rate Limiting</span>

<h3>Four Main Algorithms</h3>

<h4>1. Fixed Window Counter</h4>
<p>Count requests in fixed time windows (e.g., 0:00–1:00, 1:00–2:00). Reset counter at window boundary.</p>
<div class="diagram">Window 1 (0:00-1:00): [||||||||||] 10/10 FULL
Window 2 (1:00-2:00): [          ] 0/10 reset</div>
<p><strong>Pros:</strong> Simple, low memory. <strong>Cons:</strong> Boundary spike — 10 req at 0:59 + 10 req at 1:01 = 20 in 2 seconds.</p>

<h4>2. Sliding Window Log</h4>
<p>Store timestamp of each request. Count requests in the last N seconds from current time.</p>
<p><strong>Pros:</strong> Accurate, no boundary spike. <strong>Cons:</strong> Memory-heavy (stores every timestamp).</p>

<h4>3. Sliding Window Counter</h4>
<p>Hybrid — weighted count from current + previous window. Good balance of accuracy and memory.</p>

<h4>4. Token Bucket ⭐ (Most Popular)</h4>
<p>Bucket holds tokens (max = burst capacity). Tokens refill at a fixed rate. Each request consumes 1 token. No token → reject.</p>
<div class="diagram">Bucket capacity: 10 tokens
Refill rate: 2 tokens/second

t=0s:  [██████████] 10 tokens → allow burst of 10
t=1s:  [████████  ] 8 tokens  (used 2, refilled 2... net -2+2=8)
t=5s:  [██████████] 10 tokens (refilled to max capacity)</div>

<h4>5. Leaky Bucket</h4>
<p>Requests enter a queue; processed at a fixed rate (like water leaking from a bucket). Smooths traffic but doesn't allow bursts.</p>

<table>
  <tr><th>Algorithm</th><th>Burst Allowed</th><th>Memory</th><th>Accuracy</th><th>Production Use</th></tr>
  <tr><td>Fixed Window</td><td>At boundary only</td><td>Low</td><td>Low</td><td>Simple internal APIs</td></tr>
  <tr><td>Sliding Window Log</td><td>No</td><td>High</td><td>High</td><td>Strict compliance APIs</td></tr>
  <tr><td>Token Bucket</td><td>Yes (controlled)</td><td>Low</td><td>High</td><td>Most APIs (AWS, Stripe, SCG)</td></tr>
  <tr><td>Leaky Bucket</td><td>No</td><td>Medium</td><td>High</td><td>Traffic shaping, queues</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> I know Fixed Window (simple but boundary spike problem), Sliding Window (accurate, memory-heavy), Token Bucket (allows controlled bursts, most popular in production), and Leaky Bucket (smooth output rate, no bursts). Token Bucket is preferred for APIs because it handles traffic spikes gracefully while enforcing sustained rate limits.</div>
`
},

"q13": {
  title: "Q13 — Token Bucket vs Fixed Window",
  html: `
<h2>Why is the Token Bucket algorithm preferred over Fixed Window?</h2>
<p class="subtitle">Burst Handling · Boundary Problem · Production Choice</p>
<span class="tag tag-green">Rate Limiting</span>

<h3>The Fixed Window Boundary Problem</h3>
<div class="diagram">Limit: 100 requests/minute

Fixed Window disaster:
  0:59 → 100 requests ✅ (window 1 exhausted)
  1:00 → 100 requests ✅ (window 2 reset!)
  
  Result: 200 requests in 2 seconds! 💥 Backend overloaded</div>

<p>Fixed Window allows <strong>2× the limit</strong> at window boundaries because counters reset abruptly.</p>

<h3>How Token Bucket Fixes This</h3>
<div class="diagram">Limit: 100 req/min, burst capacity: 100 tokens, refill: ~1.67 tokens/sec

  t=0:00 → Client sends 100 requests → uses all 100 tokens → bucket empty
  t=0:01 → Only ~1.67 tokens refilled → max 1-2 requests allowed
  t=0:30 → ~50 tokens refilled → can handle moderate burst
  t=1:00 → bucket full again (100 tokens)

  No sudden 2× spike at any boundary!</div>

<h3>Comparison</h3>
<table>
  <tr><th>Aspect</th><th>Fixed Window</th><th>Token Bucket</th></tr>
  <tr><td>Boundary spike</td><td>Yes — 2× limit possible</td><td>No — smooth refill</td></tr>
  <tr><td>Burst traffic</td><td>Only at window reset</td><td>Controlled via bucket capacity</td></tr>
  <tr><td>User experience</td><td>All-or-nothing per window</td><td>Burst then throttle — smoother</td></tr>
  <tr><td>Implementation</td><td>Simple counter + TTL</td><td>Counter + refill rate (still simple in Redis)</td></tr>
  <tr><td>Used by</td><td>Basic internal tools</td><td>AWS API Gateway, Stripe, Spring Cloud Gateway</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> Fixed Window suffers a boundary spike — a client can send the full limit at the end of one window and again at the start of the next, effectively doubling throughput for a few seconds. Token Bucket refills tokens continuously at a fixed rate and allows controlled bursts via bucket capacity, giving smoother and fairer rate limiting. That's why production systems prefer it.</div>
`
},

"q14": {
  title: "Q14 — Token Bucket Example",
  html: `
<h2>Explain Token Bucket with a real-world example.</h2>
<p class="subtitle">Analogy · Mechanics · Interview Story</p>
<span class="tag tag-green">Rate Limiting</span>

<div class="analogy-box">
  <h4>Real-World Analogy — Coffee Shop Stamp Card</h4>
  <p>Imagine a coffee shop loyalty program:</p>
  <ul>
    <li>You get a stamp card that holds <strong>max 10 stamps</strong> (bucket capacity)</li>
    <li>The shop gives you <strong>2 stamps per hour</strong> automatically (refill rate)</li>
    <li>Each coffee costs <strong>1 stamp</strong> (1 token per request)</li>
    <li>No stamps? You wait until more are added (rate limited — HTTP 429)</li>
    <li>Come after a week away? Card is full with 10 stamps — enjoy a burst of 10 coffees, then wait (controlled burst)</li>
  </ul>
</div>

<h3>Technical Walkthrough</h3>
<div class="steps-box">
  <h4>API: 100 requests/minute, burst 50</h4>
  <ol>
    <li><strong>Initial state:</strong> Bucket has 50 tokens (burst capacity)</li>
    <li><strong>Client sends 30 requests:</strong> 30 tokens consumed → 20 remaining → all allowed</li>
    <li><strong>Client sends 25 more:</strong> Only 20 tokens left → 20 allowed, 5 rejected (429)</li>
    <li><strong>After 1 minute:</strong> ~1.67 tokens/sec × 60 = ~100 tokens refilled (capped at 50 burst) → bucket full again</li>
    <li><strong>Sustained load:</strong> Client sends 2 req/sec → matches refill rate → steady state, no rejections</li>
  </ol>
</div>

<pre><code>// Token Bucket logic (simplified)
class TokenBucket {
    double tokens;           // current tokens
    double maxTokens;        // burst capacity = 50
    double refillRate;       // tokens per second = 100/60 ≈ 1.67
    long lastRefillTime;

    boolean allowRequest() {
        refill();  // add tokens based on elapsed time
        if (tokens >= 1) {
            tokens -= 1;
            return true;   // allowed
        }
        return false;      // 429 Too Many Requests
    }

    void refill() {
        long now = System.currentTimeMillis();
        double elapsed = (now - lastRefillTime) / 1000.0;
        tokens = Math.min(maxTokens, tokens + elapsed * refillRate);
        lastRefillTime = now;
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Token Bucket is like a coffee stamp card — max 10 stamps, 2 added per hour, 1 stamp per coffee. You can burst 10 coffees if you've saved up, then you're throttled until stamps refill. Technically: bucket holds tokens up to burst capacity, refills at a fixed rate, each request consumes one token. No tokens = HTTP 429.</div>
`
},

"q15": {
  title: "Q15 — Redis Distributed Rate Limiting",
  html: `
<h2>How does Redis help implement distributed rate limiting?</h2>
<p class="subtitle">Redis · INCR · Lua Scripts · Multi-Instance</p>
<span class="tag tag-red">Redis</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>With 5 gateway instances, each needs the <strong>same counter</strong> for user X. Redis acts as a shared, in-memory store with atomic operations — all gateway nodes read/write the same count in microseconds.</p>
</div>

<h3>Why Not In-Memory?</h3>
<div class="diagram">Gateway-1: user:42 count = 5  ─┐
Gateway-2: user:42 count = 3  ─┼─ Different counters! Limit of 10 → actually 10×5 = 50 allowed
Gateway-3: user:42 count = 7  ─┘

Redis: user:42 count = 15  ← Single source of truth across all gateways</div>

<h3>Implementation Approaches</h3>

<h4>1. Fixed Window with INCR + EXPIRE</h4>
<pre><code>// Pseudo-code for each request
key = "rate:" + userId + ":" + currentMinute
count = Redis INCR key
if count == 1:
    Redis EXPIRE key 60    // TTL = window size
if count > LIMIT:
    return 429</code></pre>

<h4>2. Token Bucket with Lua Script (Atomic)</h4>
<pre><code>// Lua script runs atomically in Redis — no race conditions
// KEYS[1] = bucket key, ARGV[1] = max tokens, ARGV[2] = refill rate, ARGV[3] = now
local tokens = tonumber(redis.call('HGET', KEYS[1], 'tokens') or ARGV[1])
local last_refill = tonumber(redis.call('HGET', KEYS[1], 'last_refill') or ARGV[3])
local elapsed = ARGV[3] - last_refill
tokens = math.min(ARGV[1], tokens + elapsed * ARGV[2])
if tokens >= 1 then
    tokens = tokens - 1
    redis.call('HSET', KEYS[1], 'tokens', tokens, 'last_refill', ARGV[3])
    redis.call('EXPIRE', KEYS[1], 3600)
    return 1   -- allowed
else
    return 0   -- rejected
end</code></pre>

<h4>3. Spring Cloud Gateway Built-in</h4>
<pre><code>// Uses Redis automatically with RequestRateLimiter filter
spring:
  cloud:
    gateway:
      routes:
        - id: api
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
                key-resolver: "#{@userKeyResolver}"</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Redis provides a shared, atomic counter accessible by all gateway instances in microseconds. Use INCR+EXPIRE for fixed window, or Lua scripts for atomic Token Bucket operations. Spring Cloud Gateway has built-in Redis rate limiting via RequestRateLimiter filter. Without Redis, each instance maintains separate counters and limits are ineffective.</div>
`
},

"q16": {
  title: "Q16 — Redis Unavailable",
  html: `
<h2>What happens when Redis becomes unavailable?</h2>
<p class="subtitle">Fail-Open vs Fail-Closed · Fallback Strategies</p>
<span class="tag tag-red">Redis</span>
<span class="tag tag-yellow">Resilience</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Redis is the brain of distributed rate limiting. If it goes down, every gateway instance loses shared state. You must decide: <strong>block all traffic (fail-closed)</strong> or <strong>allow all traffic (fail-open)</strong> — each has trade-offs.</p>
</div>

<h3>Two Strategies</h3>
<table>
  <tr><th>Strategy</th><th>Behavior</th><th>Pros</th><th>Cons</th></tr>
  <tr><td><strong>Fail-Open</strong></td><td>Allow requests when Redis is down</td><td>Service stays available</td><td>No rate protection during outage</td></tr>
  <tr><td><strong>Fail-Closed</strong></td><td>Reject requests when Redis is down</td><td>Backend protected</td><td>All API traffic blocked — bad UX</td></tr>
</table>

<h3>Production Best Practice — Layered Fallback</h3>
<div class="steps-box">
  <h4>Recommended Approach</h4>
  <ol>
    <li><strong>Primary:</strong> Redis cluster (Sentinel or Cluster mode) for HA</li>
    <li><strong>Fallback 1:</strong> Local in-memory rate limiter (per instance, less accurate but better than nothing)</li>
    <li><strong>Fallback 2:</strong> Fail-open with alerting — PagerDuty fires when Redis is down</li>
    <li><strong>Circuit breaker on Redis calls:</strong> Don't block request thread waiting for Redis timeout (default 3s) — fail fast in 50ms</li>
  </ol>
</div>

<pre><code>// Resilient rate limiter with fallback
public boolean isAllowed(String userId) {
    try {
        return redisRateLimiter.tryAcquire(userId);  // primary
    } catch (RedisConnectionException e) {
        log.warn("Redis down, falling back to local limiter");
        metrics.increment("rate_limit.redis.fallback");
        return localRateLimiter.tryAcquire(userId);  // fallback
    }
}</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> When Redis is unavailable, rate limiting breaks unless you have a fallback. Fail-open keeps the API running but removes protection. Fail-closed protects backends but blocks all traffic. Production uses Redis HA (Sentinel/Cluster), a local in-memory fallback limiter, fast-fail circuit breakers on Redis calls, and alerting. Most teams choose fail-open with local fallback to balance availability and protection.</div>
`
},

"q17": {
  title: "Q17 — Free vs Premium Limits",
  html: `
<h2>How do you apply different limits for free and premium users?</h2>
<p class="subtitle">Tiered Rate Limiting · Key Resolution · Business Logic</p>
<span class="tag tag-green">Rate Limiting</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Free users get 100 requests/hour; premium users get 10,000. The gateway reads the user's tier from the JWT (or database) and applies the matching limit using different Redis keys or configurable buckets.</p>
</div>

<h3>Implementation Approaches</h3>

<h4>Approach 1: Tier in JWT + Dynamic Key</h4>
<pre><code>// Key resolver reads tier from JWT claims
@Bean
KeyResolver tierKeyResolver() {
    return exchange -> {
        String userId = exchange.getRequest().getHeaders().getFirst("X-User-Id");
        String tier = exchange.getRequest().getHeaders().getFirst("X-Tier"); // FREE, PREMIUM
        return Mono.just(tier + ":" + userId);  // "PREMIUM:42" vs "FREE:42"
    };
}

// Different limits per route/filter config
// FREE tier route: replenishRate=10, burstCapacity=20
// PREMIUM tier route: replenishRate=1000, burstCapacity=2000</code></pre>

<h4>Approach 2: Single Filter with Tier Config Map</h4>
<pre><code>Map&lt;String, RateLimitConfig&gt; tierLimits = Map.of(
    "FREE",    new RateLimitConfig(100, 60),      // 100 req/hour
    "PREMIUM", new RateLimitConfig(10000, 60),   // 10K req/hour
    "ENTERPRISE", new RateLimitConfig(100000, 60)
);

// In filter: read tier → lookup config → check Redis with tier-specific limit</code></pre>

<h4>Approach 3: Redis Hash per User</h4>
<pre><code>// Redis key: rate:user:42
// Hash fields: { tier: "PREMIUM", count: 45, window_start: 1710000000 }
// Lookup tier → apply corresponding limit dynamically</code></pre>

<table>
  <tr><th>Tier</th><th>Limit</th><th>Burst</th><th>Example APIs</th></tr>
  <tr><td>Free</td><td>100/hour</td><td>20</td><td>Search, browse</td></tr>
  <tr><td>Premium</td><td>10,000/hour</td><td>500</td><td>All APIs + bulk export</td></tr>
  <tr><td>Internal</td><td>Unlimited</td><td>—</td><td>Service-to-service</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> Extract user tier from JWT claims (FREE/PREMIUM), use it in the Redis key (e.g., <code>PREMIUM:userId</code>) and apply tier-specific limits from a config map. Spring Cloud Gateway's KeyResolver pattern makes this clean. Free: 100 req/hour; Premium: 10K req/hour. Store tier in JWT to avoid DB lookup on every request.</div>
`
},

"q18": {
  title: "Q18 — Gateway vs Microservice Limiting",
  html: `
<h2>Where should rate limiting be implemented — API Gateway or microservice?</h2>
<p class="subtitle">Defense in Depth · Layered Protection</p>
<span class="tag tag-blue">Architecture</span>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p><strong>Both</strong> — but for different purposes. Gateway rate limiting protects the whole system from external abuse. Service-level rate limiting protects individual services from internal overload or misbehaving internal callers.</p>
</div>

<table>
  <tr><th>Aspect</th><th>API Gateway</th><th>Microservice</th></tr>
  <tr><td>Scope</td><td>Global — all external traffic</td><td>Per-service — specific endpoint protection</td></tr>
  <tr><td>Key</td><td>User ID, API key, IP address</td><td>Service name, endpoint, internal caller</td></tr>
  <tr><td>Granularity</td><td>Per-API route level</td><td>Per-endpoint, per-method level</td></tr>
  <tr><td>Protects against</td><td>External abuse, DDoS, scraping</td><td>Internal cascade, noisy neighbor</td></tr>
  <tr><td>Example</td><td>100 req/min per user globally</td><td>Payment service: max 50 req/sec total</td></tr>
</table>

<div class="diagram">External Client
       │
       ▼
┌─────────────────┐
│  API Gateway    │  ← Layer 1: 100 req/min per user (external)
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
 Payment   Order
 Service   Service
    │         │
    ▼         ▼
 Layer 2:   Layer 2:
 50 req/s   200 req/s
 (protect   (protect
  payment    order DB
  provider)  connection pool)</div>

<h3>When to Use Only Gateway</h3>
<ul>
  <li>Small team, simple architecture</li>
  <li>All traffic is external (no service-to-service calls)</li>
  <li>Uniform limits across all APIs</li>
</ul>

<h3>When to Add Service-Level</h3>
<ul>
  <li>Expensive operations (PDF generation, ML inference) need tighter per-endpoint limits</li>
  <li>Internal microservices call each other — gateway can't see internal traffic</li>
  <li>Different services have different capacity (Payment provider quota vs read-only search)</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> Implement rate limiting at the API Gateway for external traffic (per-user, per-API global limits). Add service-level limits for expensive endpoints or internal service-to-service calls the gateway can't see. This defense-in-depth approach protects both the system edge and individual service capacity. Start with gateway-only; add service-level as you scale.</div>
`
},

"q19": {
  title: "Q19 — HTTP Status Code for Rate Limit",
  html: `
<h2>What HTTP status code is returned when the limit is exceeded?</h2>
<p class="subtitle">HTTP 429 · Response Headers · RFC 6585</p>
<span class="tag tag-green">Rate Limiting</span>

<div class="simple-box">
  <h4>Answer</h4>
  <p><strong>HTTP 429 Too Many Requests</strong> — defined in RFC 6585. Tells the client they've exceeded the rate limit and should retry later.</p>
</div>

<h3>Proper 429 Response</h3>
<pre><code>HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1710000060

{
  "error": "rate_limit_exceeded",
  "message": "You have exceeded the rate limit of 100 requests per minute.",
  "retryAfterSeconds": 30
}</code></pre>

<h3>Important Response Headers</h3>
<table>
  <tr><th>Header</th><th>Purpose</th><th>Example</th></tr>
  <tr><td><code>Retry-After</code></td><td>Seconds until client can retry</td><td><code>Retry-After: 30</code></td></tr>
  <tr><td><code>X-RateLimit-Limit</code></td><td>Max requests in window</td><td><code>100</code></td></tr>
  <tr><td><code>X-RateLimit-Remaining</code></td><td>Requests left in window</td><td><code>0</code></td></tr>
  <tr><td><code>X-RateLimit-Reset</code></td><td>Unix timestamp when window resets</td><td><code>1710000060</code></td></tr>
</table>

<h3>Other Related Status Codes</h3>
<ul>
  <li><strong>503 Service Unavailable</strong> — Server overloaded (not client fault); use with <code>Retry-After</code></li>
  <li><strong>403 Forbidden</strong> — Wrong choice; implies authorization failure, not rate limit</li>
  <li><strong>200 with error body</strong> — Anti-pattern; always use proper HTTP status codes</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> Return HTTP 429 Too Many Requests with a <code>Retry-After</code> header indicating when to retry, plus <code>X-RateLimit-Limit</code>, <code>Remaining</code>, and <code>Reset</code> headers so clients can self-throttle. Include a JSON body explaining the limit. Never return 200 or 403 for rate limiting.</div>
`
},

"q20": {
  title: "Q20 — Avoid Race Conditions",
  html: `
<h2>How do you avoid race conditions when multiple servers update request counts?</h2>
<p class="subtitle">Atomic Operations · Lua Scripts · Redlock</p>
<span class="tag tag-red">Concurrency</span>

<div class="simple-box">
  <h4>The Problem</h4>
  <p>Gateway-1 and Gateway-2 both read count=9, both increment to 10, both allow the request — but limit was 10, so 11 requests got through. This is a <strong>read-modify-write race condition</strong>.</p>
</div>

<h3>Solutions</h3>

<h4>1. Redis INCR (Atomic Increment) ✅ Simplest</h4>
<pre><code>// INCR is atomic — no race condition possible
count = Redis INCR rate:user:42
if count > LIMIT:
    return 429
// Even if 100 gateways call INCR simultaneously, count is always accurate</code></pre>

<h4>2. Lua Scripts (Atomic Multi-Step) ✅ Token Bucket</h4>
<pre><code>// Entire token bucket logic runs as one atomic operation in Redis
// No other command can interleave between read and write
EVAL token_bucket_script 1 rate:user:42 100 1.67 1710000000</code></pre>

<h4>3. Redis Transactions (MULTI/EXEC)</h4>
<pre><code>MULTI
GET rate:user:42
INCR rate:user:42
EXEC
// Less preferred — WATCH can cause retries under high contention</code></pre>

<h4>4. Redlock (Distributed Lock) — Usually Overkill</h4>
<pre><code>// Acquire lock → read → write → release lock
// Adds latency; use only for complex multi-key operations
lock = redlock.acquire("rate:user:42", 100ms)
try {
    count = redis.get("rate:user:42")
    if (count < LIMIT) { redis.incr("rate:user:42"); allow(); }
} finally { lock.release(); }</code></pre>

<div class="diagram">❌ Race Condition:
  Gateway-1: READ count=9 → WRITE count=10 → ALLOW
  Gateway-2: READ count=9 → WRITE count=10 → ALLOW  (both read 9!)

✅ Redis INCR (atomic):
  Gateway-1: INCR → 10 → ALLOW
  Gateway-2: INCR → 11 → REJECT  (INCR is serialized by Redis)</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Use Redis atomic operations — INCR for simple counters, Lua scripts for complex Token Bucket logic. Redis is single-threaded, so INCR and Lua EVAL execute atomically with no interleaving. Avoid read-modify-write patterns with separate GET/SET. Redlock is overkill for rate limiting — INCR or Lua is sufficient and faster.</div>
`
},

"q21": {
  title: "Q21 — Rate Limiting & Cost",
  html: `
<h2>How does rate limiting reduce infrastructure cost?</h2>
<p class="subtitle">Cost Optimization · Capacity Planning · FinOps</p>
<span class="tag tag-yellow">Cost</span>

<h3>Direct Cost Savings</h3>
<ul>
  <li><strong>Right-size infrastructure</strong> — Without rate limits, you over-provision for worst-case abuse scenarios. With limits, you size for legitimate peak traffic.</li>
  <li><strong>Prevent runaway costs</strong> — A bug causing infinite retry loops can burn through cloud budget in hours. Rate limits cap the damage.</li>
  <li><strong>Reduce auto-scaling events</strong> — Fewer unnecessary scale-ups from abusive traffic = fewer EC2/K8s nodes running.</li>
  <li><strong>Protect paid third-party APIs</strong> — SMS gateway, payment processor, Google Maps API — each call costs money. Rate limit your users to match your quota.</li>
  <li><strong>Database connection savings</strong> — Fewer requests = fewer DB connections = smaller connection pool = smaller RDS instance.</li>
</ul>

<h3>Real Example</h3>
<div class="analogy-box">
  <h4>Lenskart Flash Sale Scenario</h4>
  <p>Without rate limiting: 1M users hit "Buy Now" simultaneously → 50 K8s pods auto-scale → ₹5L cloud bill for 1 hour.<br>
  With rate limiting (100 req/sec per user, queue excess): Legitimate traffic served smoothly on 10 pods → ₹50K bill. Bots and scrapers blocked at gateway → zero backend cost.</p>
</div>

<table>
  <tr><th>Without Rate Limiting</th><th>With Rate Limiting</th></tr>
  <tr><td>Size for worst-case DDoS</td><td>Size for legitimate peak + 20% buffer</td></tr>
  <tr><td>50 pods at peak</td><td>10-15 pods at peak</td></tr>
  <tr><td>Uncontrolled third-party API costs</td><td>Capped per-user API calls</td></tr>
  <tr><td>Runaway retry storms</td><td>Capped at gateway — fail fast</td></tr>
</table>

<div class="answer-simple"><strong>30-Second Answer:</strong> Rate limiting lets you right-size infrastructure for legitimate traffic instead of worst-case abuse. It prevents runaway auto-scaling, caps third-party API costs, reduces database load, and stops retry storms from bugs. A flash sale without rate limits might need 5× the pods — rate limiting can cut cloud costs by 60-80% during spikes.</div>
`
},

"q22": {
  title: "Q22 — Monitor Rate Limit Metrics",
  html: `
<h2>How would you monitor rate-limit metrics in production?</h2>
<p class="subtitle">Observability · Prometheus · Grafana · Alerting</p>
<span class="tag tag-blue">Observability</span>

<h3>Key Metrics to Track</h3>
<table>
  <tr><th>Metric</th><th>Type</th><th>Alert Threshold</th></tr>
  <tr><td><code>rate_limit_requests_total{result="allowed"}</code></td><td>Counter</td><td>— (baseline tracking)</td></tr>
  <tr><td><code>rate_limit_requests_total{result="rejected"}</code></td><td>Counter</td><td>&gt; 5% of total → investigate</td></tr>
  <tr><td><code>rate_limit_rejected_by_tier{tier="FREE"}</code></td><td>Counter</td><td>Spike → possible abuse or limit too low</td></tr>
  <tr><td><code>rate_limit_redis_latency_ms</code></td><td>Histogram</td><td>p99 &gt; 10ms → Redis performance issue</td></tr>
  <tr><td><code>rate_limit_redis_errors_total</code></td><td>Counter</td><td>&gt; 0 → Redis connectivity issue</td></tr>
  <tr><td><code>rate_limit_fallback_active</code></td><td>Gauge</td><td>= 1 → Redis down, using local fallback</td></tr>
</table>

<h3>Implementation with Micrometer + Prometheus</h3>
<pre><code>@Component
public class RateLimitMetrics {
    private final Counter allowed;
    private final Counter rejected;

    public RateLimitMetrics(MeterRegistry registry) {
        allowed = Counter.builder("rate_limit.requests")
            .tag("result", "allowed").register(registry);
        rejected = Counter.builder("rate_limit.requests")
            .tag("result", "rejected").register(registry);
    }

    public void recordAllowed() { allowed.increment(); }
    public void recordRejected(String tier) {
        rejected.increment();
        // Also log for debugging: userId, tier, endpoint
    }
}</code></pre>

<h3>Grafana Dashboard Panels</h3>
<ul>
  <li>Requests allowed vs rejected over time (stacked area chart)</li>
  <li>Top 10 rate-limited users/API keys (table)</li>
  <li>429 response rate by API endpoint (heatmap)</li>
  <li>Redis latency percentiles (p50, p95, p99)</li>
  <li>Rate limit rejections by tier (FREE vs PREMIUM)</li>
</ul>

<h3>Alerting Rules</h3>
<pre><code># Prometheus alert rules
- alert: HighRateLimitRejectionRate
  expr: rate(rate_limit_requests_total{result="rejected"}[5m])
        / rate(rate_limit_requests_total[5m]) > 0.05
  for: 5m
  annotations:
    summary: "More than 5% of requests are being rate limited"

- alert: RateLimitRedisDown
  expr: rate_limit_redis_errors_total > 0
  for: 1m
  annotations:
    summary: "Redis unavailable for rate limiting — fallback active"</code></pre>

<div class="answer-simple"><strong>30-Second Answer:</strong> Track allowed vs rejected request counters, rejection rate by tier/endpoint, Redis latency and error rates, and fallback activation. Use Micrometer → Prometheus → Grafana. Alert when rejection rate exceeds 5%, Redis errors occur, or fallback mode activates. Log rejected requests with userId and endpoint for debugging abuse patterns.</div>
`
},

"q23": {
  title: "Q23 — Real Project Architecture",
  html: `
<h2>Have you implemented rate limiting in a real project? Explain the architecture.</h2>
<p class="subtitle">Production Architecture · STAR Method · Sample Answer</p>
<span class="tag tag-green">Experience</span>

<div class="simple-box">
  <h4>Sample STAR Answer (Adapt to Your Experience)</h4>
  <p><strong>Situation:</strong> Our e-commerce platform had 15 microservices. During a sale event, the search API was getting hammered by bots, causing order service latency to spike due to shared DB connection pool.</p>
  <p><strong>Task:</strong> Implement rate limiting to protect backend services without blocking legitimate users.</p>
</div>

<h3>Architecture We Built</h3>
<div class="diagram">Mobile App / Web
       │
       ▼
┌──────────────────┐
│  AWS ALB         │
└────────┬─────────┘
         ▼
┌──────────────────┐     ┌─────────────┐
│ Spring Cloud     │────►│ Redis Cluster│
│ Gateway (3 pods) │     │ (3 nodes)    │
└────────┬─────────┘     └─────────────┘
         │
    ┌────┼────────┐
    ▼    ▼        ▼
 Search Order  Payment
 Service Service Service</div>

<div class="steps-box">
  <h4>Implementation Details</h4>
  <ol>
    <li><strong>Gateway:</strong> Spring Cloud Gateway with <code>RequestRateLimiter</code> filter</li>
    <li><strong>Algorithm:</strong> Token Bucket via Redis Lua script</li>
    <li><strong>Key resolution:</strong> JWT → extract userId + tier → Redis key <code>rate:{tier}:{userId}</code></li>
    <li><strong>Limits:</strong> FREE: 100/min, PREMIUM: 5000/min, Anonymous (IP): 30/min</li>
    <li><strong>Response:</strong> HTTP 429 with <code>Retry-After</code> and rate limit headers</li>
    <li><strong>Fallback:</strong> Local in-memory limiter when Redis unreachable (fail-open)</li>
    <li><strong>Monitoring:</strong> Prometheus metrics + Grafana dashboard + PagerDuty alerts</li>
  </ol>
</div>

<h3>Results</h3>
<ul>
  <li>Bot traffic blocked at gateway — 0 impact on backend during sale</li>
  <li>Legitimate user 429 rate: &lt; 0.1%</li>
  <li>Reduced peak pod count from 40 to 12 (70% cost saving during sale)</li>
  <li>Redis p99 latency: 2ms — negligible overhead</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> "We implemented Token Bucket rate limiting in Spring Cloud Gateway with Redis Cluster. JWT claims determined user tier (FREE/PREMIUM) for different limits. Bots were blocked at the gateway during sales events, reducing peak pods by 70%. We monitored via Prometheus/Grafana and had a local fallback when Redis was unavailable."</div>

<div class="mistake-box">
  <h4>Interview Tip</h4>
  <p>Even if you haven't done this in production, describe the architecture above confidently and say "This is the approach I would implement" — then walk through the design decisions. Interviewers care about your understanding, not just resume claims.</p>
</div>
`
},

"q24": {
  title: "Q24 — Testing Rate Limiting",
  html: `
<h2>How do you test whether rate limiting works correctly?</h2>
<p class="subtitle">Integration Tests · Load Tests · Chaos Testing</p>
<span class="tag tag-green">Testing</span>

<h3>Testing Layers</h3>

<h4>1. Unit Tests — Algorithm Logic</h4>
<pre><code>@Test
void tokenBucket_allowsUpToBurstCapacity() {
    TokenBucket bucket = new TokenBucket(10, 10, 1.0); // 10 tokens, 1/sec refill
    for (int i = 0; i < 10; i++) {
        assertTrue(bucket.allowRequest());  // first 10 allowed
    }
    assertFalse(bucket.allowRequest());     // 11th rejected
}

@Test
void tokenBucket_refillsOverTime() throws InterruptedException {
    TokenBucket bucket = new TokenBucket(5, 5, 5.0); // 5 tokens, 5/sec
    for (int i = 0; i < 5; i++) bucket.allowRequest();
    Thread.sleep(1100);  // wait 1 second
    assertTrue(bucket.allowRequest());  // refilled
}</code></pre>

<h4>2. Integration Tests — Gateway + Redis</h4>
<pre><code>@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
class RateLimitIntegrationTest {

    @Container static GenericContainer redis =
        new GenericContainer("redis:7").withExposedPorts(6379);

    @Test
    void exceedsLimit_returns429() {
        String token = getJwtForUser("user-42", "FREE");
        // Send 101 requests (limit is 100/min)
        for (int i = 0; i < 100; i++) {
            assertEquals(200, callApi(token).getStatusCode());
        }
        ResponseEntity r = callApi(token);
        assertEquals(429, r.getStatusCode());
        assertNotNull(r.getHeaders().get("Retry-After"));
    }
}</code></pre>

<h4>3. Load Tests — k6 / Gatling</h4>
<pre><code>// k6 load test script
import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 50,           // 50 virtual users
    duration: '60s',
};

export default function() {
    let res = http.get('https://api.example.com/orders', {
        headers: { 'Authorization': 'Bearer ' + __ENV.TOKEN }
    });
    check(res, {
        'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
        '429 has Retry-After': (r) => r.status !== 429 || r.headers['Retry-After'],
    });
}</code></pre>

<h4>4. Manual / Postman Tests</h4>
<ul>
  <li>Send requests rapidly in Postman Collection Runner — verify 429 after limit</li>
  <li>Check response headers: <code>X-RateLimit-Remaining</code> decrements correctly</li>
  <li>Test different tiers: FREE user gets 429 earlier than PREMIUM user</li>
</ul>

<h4>5. Chaos Tests</h4>
<ul>
  <li>Kill Redis → verify fallback limiter activates</li>
  <li>Verify fail-open doesn't crash the gateway</li>
  <li>Multi-gateway test: 2 instances share same Redis counter correctly</li>
</ul>

<div class="answer-simple"><strong>30-Second Answer:</strong> Test at three levels: unit tests for Token Bucket algorithm logic, integration tests with Testcontainers Redis verifying 429 after limit exceeded, and load tests with k6 simulating concurrent users. Also test tier differences (FREE vs PREMIUM), response headers, and chaos scenarios like Redis failure triggering fallback.</div>
`
},

"q25": {
  title: "Q25 — Implementation Challenges",
  html: `
<h2>What challenges did you face while implementing rate limiting?</h2>
<p class="subtitle">Production Pitfalls · Lessons Learned · Interview Gold</p>
<span class="tag tag-red">Challenges</span>

<h3>Common Challenges &amp; Solutions</h3>

<div class="card-grid">
  <div class="card">
    <h4>1. Clock Skew Across Nodes</h4>
    <p>Gateway pods with different system clocks caused inconsistent Token Bucket refill. <strong>Fix:</strong> Use Redis TIME command as source of truth for timestamps, not local clock.</p>
  </div>
  <div class="card">
    <h4>2. Redis as Single Point of Failure</h4>
    <p>Redis outage = no rate limiting. <strong>Fix:</strong> Redis Sentinel/Cluster + local in-memory fallback + fast-fail circuit breaker (50ms timeout).</p>
  </div>
  <div class="card">
    <h4>3. Key Design — IP vs User</h4>
    <p>Rate limiting by IP breaks for mobile users behind carrier NAT (1000 users, 1 IP). <strong>Fix:</strong> Use JWT userId for authenticated, IP for anonymous, API key for B2B.</p>
  </div>
  <div class="card">
    <h4>4. Burst Traffic During Sales</h4>
    <p>Fixed limits too strict for legitimate flash sale traffic. <strong>Fix:</strong> Token Bucket with generous burst capacity; pre-warm Redis keys; dynamic limit adjustment via config server.</p>
  </div>
  <div class="card">
    <h4>5. Testing in Staging</h4>
    <p>Single gateway instance in staging — couldn't test distributed counter sharing. <strong>Fix:</strong> Testcontainers with multiple gateway instances pointing to same Redis in CI.</p>
  </div>
  <div class="card">
    <h4>6. Monitoring Blind Spots</h4>
    <p>Didn't know rate limiting was rejecting 15% of traffic until users complained. <strong>Fix:</strong> Added Prometheus counters day one; Grafana dashboard; alert at 5% rejection rate.</p>
  </div>
  <div class="card">
    <h4>7. Retry Storms Amplifying Load</h4>
    <p>Clients retried 429 responses immediately, making overload worse. <strong>Fix:</strong> Enforce <code>Retry-After</code> header; document exponential backoff in API docs; client SDK respects 429.</p>
  </div>
  <div class="card">
    <h4>8. Hot Key Problem in Redis</h4>
    <p>One viral user's key got disproportionate Redis CPU. <strong>Fix:</strong> Shard hot keys: <code>rate:user:42:shard-{0-9}</code>; local caching for hot keys with short TTL.</p>
  </div>
</div>

<div class="answer-simple"><strong>30-Second Answer:</strong> Main challenges: clock skew (fixed with Redis TIME), Redis SPOF (Sentinel + local fallback), NAT IP collisions (use JWT userId), burst traffic during sales (Token Bucket with dynamic config), and retry storms (enforce Retry-After with exponential backoff). Key lesson: add monitoring from day one — we missed 15% rejection rate until users complained.</div>

<div class="mistake-box">
  <h4>How to Answer in Interview</h4>
  <p>Pick 2-3 challenges you've actually thought about. Explain the problem, what went wrong (or could go wrong), and your fix. Interviewers love "we deployed X, saw Y problem in metrics, fixed with Z" stories — even from personal projects or staging environments.</p>
</div>
`
}

};
