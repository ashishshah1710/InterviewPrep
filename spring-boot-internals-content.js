const TOPICS = {

overview: {
  title: 'Overview',
  html: `
<h2>Spring Boot Internals — Interview Guide</h2>
<p class="subtitle">How Spring Boot works under the hood · For developers & production support engineers</p>

<span class="tag tag-spring">Spring Boot 3</span>
<span class="tag tag-blue">Auto Configuration</span>
<span class="tag tag-green">IoC Container</span>

<div class="simple-box">
  <h4>Why This Guide Exists</h4>
  <p>Spring Boot feels like magic on day one — add a dependency, run <code>main()</code>, and Tomcat + DataSource + Jackson appear. In interviews (and production support), you must explain <strong>what actually happens</strong> when the JVM starts. This guide covers internals, not just annotations.</p>
</div>

<div class="card-grid">
  <div class="card"><h4>Startup</h4><p>SpringApplication.run() → Context → Beans → Tomcat</p></div>
  <div class="card"><h4>Auto-Config</h4><p>Conditional beans based on classpath</p></div>
  <div class="card"><h4>IoC / DI</h4><p>Spring manages object creation & wiring</p></div>
  <div class="card"><h4>Production</h4><p>Actuator, profiles, startup failure triage</p></div>
</div>

<div class="answer-simple">
  <strong>30-Second Pitch:</strong> "Spring Boot is Spring Framework plus opinionated auto-configuration. When I run the app, it creates an ApplicationContext, scans my components, loads auto-config classes from the classpath, applies @Conditional rules, registers beans, and starts embedded Tomcat — all without XML."
</div>
`
},

'spring-vs-boot': {
  title: 'Spring vs Spring Boot',
  html: `
<h2>Spring Framework vs Spring Boot</h2>
<p class="subtitle">What each layer provides</p>

<table>
  <tr><th>Spring Framework</th><th>Spring Boot</th></tr>
  <tr><td>Core IoC container, DI, AOP</td><td>Auto-configuration on top of Framework</td></tr>
  <tr><td>Manual @Configuration, XML (legacy)</td><td>Starter dependencies (spring-boot-starter-web)</td></tr>
  <tr><td>Deploy WAR to external Tomcat</td><td>Embedded Tomcat/Jetty/Undertow</td></tr>
  <tr><td>You wire everything</td><td>Intelligent defaults + easy override</td></tr>
  <tr><td>Actuator not included</td><td>Actuator, metrics, health built-in</td></tr>
</table>

<div class="analogy-box">
  <h4>Analogy</h4>
  <p><strong>Spring Framework</strong> = engine + chassis. <strong>Spring Boot</strong> = complete car with GPS, AC, and keyless start — you can still swap parts, but you don't build from scratch.</p>
</div>

<div class="interview-q">
  <div class="q">What problem does Spring Boot solve?</div>
  <div class="a">"Spring Framework is powerful but requires lots of boilerplate — web.xml, dispatcher servlet config, DataSource beans, Jackson setup. Spring Boot eliminates that with auto-configuration and starters. You focus on business logic; Boot configures infrastructure based on what's on the classpath."</div>
</div>
`
},

'ioc-di': {
  title: 'IoC & Dependency Injection',
  html: `
<h2>Inversion of Control (IoC) & Dependency Injection</h2>
<p class="subtitle">The foundation of everything in Spring</p>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Instead of <code>new UserService()</code> inside your controller, Spring <strong>creates</strong> the object and <strong>injects</strong> it. You declare what you need; the container wires it. That's <strong>Dependency Injection</strong>. The container controls object creation — that's <strong>Inversion of Control</strong>.</p>
</div>

<h3>Injection Types</h3>
<table>
  <tr><th>Type</th><th>How</th><th>Preferred?</th></tr>
  <tr><td>Constructor</td><td><code>public UserController(UserService svc)</code></td><td>✅ Yes — immutable, testable</td></tr>
  <tr><td>Field</td><td><code>@Autowired private UserService svc;</code></td><td>❌ Avoid — hard to test</td></tr>
  <tr><td>Setter</td><td><code>@Autowired setService(...)</code></td><td>Sometimes for optional deps</td></tr>
</table>

<pre><code>@RestController
public class UserController {
    private final UserService userService;

    // Constructor injection — Spring auto-wires
    public UserController(UserService userService) {
        this.userService = userService;
    }
}</code></pre>

<div class="interview-q">
  <div class="q">What is the Spring IoC container?</div>
  <div class="a">"The ApplicationContext is the IoC container. It holds all bean definitions, creates instances, resolves dependencies, manages lifecycle (init/destroy), and provides features like AOP and event publishing. ApplicationContext is the heart of every Spring Boot app."</div>
</div>
`
},

'bean-lifecycle': {
  title: 'Bean Lifecycle & Scopes',
  html: `
<h2>Bean Lifecycle & Scopes</h2>
<p class="subtitle">From instantiation to destruction</p>

<div class="diagram">Bean Lifecycle
────────────────────────────────────────
1. Instantiate bean (constructor)
2. Populate properties / inject dependencies
3. @PostConstruct / InitializingBean.afterPropertiesSet()
4. Bean ready — used in application
5. Context shutdown
6. @PreDestroy / DisposableBean.destroy()
────────────────────────────────────────</div>

<h3>Bean Scopes</h3>
<table>
  <tr><th>Scope</th><th>Description</th><th>Default?</th></tr>
  <tr><td>singleton</td><td>One instance per container</td><td>✅ Default</td></tr>
  <tr><td>prototype</td><td>New instance every injection</td><td></td></tr>
  <tr><td>request</td><td>One per HTTP request (web)</td><td></td></tr>
  <tr><td>session</td><td>One per HTTP session (web)</td><td></td></tr>
</table>

<pre><code>@Component
@Scope("prototype")
public class ReportGenerator { ... }

@PostConstruct
public void init() {
    log.info("Bean initialized");
}</code></pre>

<div class="mistake-box">
  <h4>Production Gotcha</h4>
  <p>Stateful singleton beans with mutable fields = thread-safety bugs under concurrent HTTP requests. Support engineers see weird intermittent bugs from this — always check if a singleton caches per-user data incorrectly.</p>
</div>
`
},

'spring-run': {
  title: 'SpringApplication.run()',
  html: `
<h2>What Happens When You Call SpringApplication.run()?</h2>
<p class="subtitle">The full startup sequence behind one line of code</p>

<pre><code>SpringApplication.run(Application.class, args);</code></pre>

<div class="diagram">Startup Sequence
────────────────────────────────────────
SpringApplication.run()
    │
    ├─► Create SpringApplication instance
    │     - Detect app type (Servlet / Reactive)
    │     - Load listeners, initializers
    │
    ├─► Prepare Environment
    │     - Load application.yml / .properties
    │     - Resolve active profiles (dev, prod)
    │     - Apply env variables & command-line args
    │
    ├─► Create ApplicationContext
    │     - AnnotationConfigServletWebServerApplicationContext
    │
    ├─► context.refresh()  ◄── THE BIG STEP
    │     ├─ Component scan (@Service, @Repository, etc.)
    │     ├─ Process @Configuration classes
    │     ├─ Load & evaluate Auto-Configurations
    │     ├─ Register all beans in container
    │     └─ Start embedded Tomcat (WebServer)
    │
    ├─► Call ApplicationRunner / CommandLineRunner beans
    │
    └─► Publish ApplicationReadyEvent
         → App accepts HTTP on port 8080 (default)
────────────────────────────────────────</div>

<div class="answer-simple">
  <strong>Interview Answer:</strong> "run() creates the ApplicationContext, loads environment config, scans components, applies conditional auto-configurations, registers beans, starts embedded Tomcat, and publishes ApplicationReadyEvent. The heavy lifting is context.refresh()."
</div>
`
},

'springboot-app': {
  title: '@SpringBootApplication',
  html: `
<h2>@SpringBootApplication — The Entry Point</h2>
<p class="subtitle">Three annotations in one</p>

<pre><code>@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}</code></pre>

<p><code>@SpringBootApplication</code> is a composed annotation:</p>

<table>
  <tr><th>Annotation</th><th>Purpose</th></tr>
  <tr><td>@SpringBootConfiguration</td><td>Specialized @Configuration on main class</td></tr>
  <tr><td>@EnableAutoConfiguration</td><td>Enable Boot's auto-config magic</td></tr>
  <tr><td>@ComponentScan</td><td>Scan current package & sub-packages for @Component, @Service, @Repository, @Controller</td></tr>
</table>

<div class="analogy-box">
  <h4>Component Scan Rule</h4>
  <p>If your main class is <code>com.example.demo.DemoApplication</code>, scan covers <code>com.example.demo.*</code> but <strong>NOT</strong> <code>com.example.other</code>. Beans outside the package won't be found unless you add <code>@ComponentScan("com.example")</code>.</p>
</div>

<div class="interview-q">
  <div class="q">My @Service in another package isn't being picked up. Why?</div>
  <div class="a">"Component scan only covers the main class package and below. Move the class, or add @ComponentScan with a broader base package, or define the bean explicitly with @Bean in a @Configuration class."</div>
</div>
`
},

'auto-config': {
  title: 'Auto Configuration',
  html: `
<h2>Auto Configuration — The Real Magic</h2>
<p class="subtitle">How Boot configures DataSource, Tomcat, Jackson without XML</p>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Spring Boot ships hundreds of pre-built configuration classes. At startup, it checks your classpath: "Is JDBC driver present? Is spring-boot-starter-web present?" If yes, it auto-creates the beans you'd otherwise write manually — but <strong>only if you haven't already defined your own</strong>.</p>
</div>

<h3>Where Auto-Config Classes Are Listed</h3>
<p><strong>Spring Boot 3.x:</strong></p>
<pre><code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports

org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration
org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration</code></pre>

<h3>Example: DataSource Auto-Config Flow</h3>
<div class="steps-box">
  <h4>Step by Step</h4>
  <ol>
    <li><code>DataSourceAutoConfiguration</code> listed in AutoConfiguration.imports</li>
    <li><code>@ConditionalOnClass(DataSource.class)</code> — JDBC on classpath? ✅</li>
    <li><code>@ConditionalOnMissingBean(DataSource.class)</code> — user defined one? ❌</li>
    <li>Reads <code>spring.datasource.url</code>, username, password from application.yml</li>
    <li>Creates HikariCP DataSource bean and registers in context</li>
  </ol>
</div>

<pre><code>// Override auto-config — your bean wins
@Configuration
public class DataSourceConfig {
    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
        return new HikariDataSource(config);
    }
}</code></pre>

<div class="answer-simple">
  <strong>Key Interview Line:</strong> "Auto-configuration is opt-in by classpath and opt-out by custom beans. @ConditionalOnMissingBean ensures my custom DataSource replaces the default without conflict."
</div>
`
},

conditionals: {
  title: 'Conditional Annotations',
  html: `
<h2>@Conditional Annotations</h2>
<p class="subtitle">The decision engine behind auto-configuration</p>

<table>
  <tr><th>Annotation</th><th>Condition</th><th>Example</th></tr>
  <tr><td>@ConditionalOnClass</td><td>Class exists on classpath</td><td>Kafka auto-config if kafka-clients.jar present</td></tr>
  <tr><td>@ConditionalOnMissingBean</td><td>No bean of type exists yet</td><td>Default DataSource skipped if you defined one</td></tr>
  <tr><td>@ConditionalOnBean</td><td>Bean already registered</td><td>Security filter after SecurityFilterChain exists</td></tr>
  <tr><td>@ConditionalOnProperty</td><td>Property matches value</td><td><code>spring.kafka.enabled=true</code></td></tr>
  <tr><td>@ConditionalOnWebApplication</td><td>Servlet or Reactive app</td><td>Tomcat only for servlet apps</td></tr>
  <tr><td>@ConditionalOnMissingClass</td><td>Class NOT on classpath</td><td>Fallback when library absent</td></tr>
</table>

<pre><code>@Configuration
@ConditionalOnClass(KafkaTemplate.class)
@ConditionalOnProperty(name = "spring.kafka.enabled", havingValue = "true", matchIfMissing = true)
public class KafkaAutoConfiguration {
    @Bean
    @ConditionalOnMissingBean
    public KafkaTemplate&lt;String, String&gt; kafkaTemplate(...) { ... }
}</code></pre>

<h3>Exclude Auto-Configuration</h3>
<pre><code>@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
// or in application.yml:
spring:
  autoconfigure:
    exclude:
      - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration</code></pre>

<div class="interview-q">
  <div class="q">How do you see what Boot auto-configured?</div>
  <div class="a">"Run with --debug flag, or set logging.level.org.springframework.boot.autoconfigure=DEBUG. The conditions report shows which auto-configs matched and which were skipped. Actuator /conditions endpoint also works if exposed."</div>
</div>
`
},

'application-yml': {
  title: 'application.yml & Properties',
  html: `
<h2>External Configuration</h2>
<p class="subtitle">application.yml, properties, env vars, and @ConfigurationProperties</p>

<h3>Configuration Priority (highest wins)</h3>
<ol>
  <li>Command-line arguments</li>
  <li>SPRING_APPLICATION_JSON (inline JSON env var)</li>
  <li>Java System properties (<code>-Dserver.port=9090</code>)</li>
  <li>OS environment variables (<code>SERVER_PORT=9090</code>)</li>
  <li>application-{profile}.yml</li>
  <li>application.yml</li>
</ol>

<pre><code># application.yml example
spring:
  application:
    name: eligibility-api
  datasource:
    url: jdbc:postgresql://localhost:5432/eligibility
    username: \${DB_USER:postgres}
    password: \${DB_PASSWORD:secret}

server:
  port: 8080

logging:
  level:
    com.kaiser.eligibility: DEBUG</code></pre>

<h3>@ConfigurationProperties — Type-Safe Config</h3>
<pre><code>@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(String secret, long expirationMs) {}

// Binds app.jwt.secret and app.jwt.expiration-ms from yml</code></pre>

<div class="simple-box">
  <h4>Production Support Tip</h4>
  <p>Most startup failures in prod are <strong>missing env vars</strong> — <code>spring.datasource.url</code> not set, wrong profile active, JWT_SECRET missing. Always check: <code>SPRING_PROFILES_ACTIVE</code> and K8s ConfigMap/Secret mounts.</p>
</div>
`
},

profiles: {
  title: 'Spring Profiles',
  html: `
<h2>Spring Profiles (dev / staging / prod)</h2>
<p class="subtitle">Environment-specific configuration</p>

<pre><code># application-dev.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/devdb

# application-prod.yml
spring:
  datasource:
    url: \${DATABASE_URL}   # from K8s secret</code></pre>

<pre><code># Activate profile
spring.profiles.active=prod
# or: java -jar app.jar --spring.profiles.active=prod
# or: SPRING_PROFILES_ACTIVE=prod</code></pre>

<pre><code>@Profile("prod")
@Service
public class ProdEmailService implements EmailService { ... }

@Profile("dev")
@Service
public class DevEmailService implements EmailService { ... }</code></pre>

<div class="interview-q">
  <div class="q">App works in dev but fails in prod. First check?</div>
  <div class="a">"Active profile and environment-specific properties. Prod may be missing DATABASE_URL, using wrong profile, or hitting stricter security config. I compare application-prod.yml expectations against actual K8s env vars and Splunk startup logs."</div>
</div>
`
},

'custom-beans': {
  title: '@Configuration & @Bean',
  html: `
<h2>Custom Beans with @Configuration</h2>
<p class="subtitle">When auto-config isn't enough</p>

<pre><code>@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}</code></pre>

<p><code>@Bean</code> methods tell Spring: "call this method once, put the return value in the container." Other beans can inject <code>RestTemplate</code> via constructor.</p>

<table>
  <tr><th>Annotation</th><th>Use For</th></tr>
  <tr><td>@Component</td><td>Generic Spring-managed class</td></tr>
  <tr><td>@Service</td><td>Business logic layer</td></tr>
  <tr><td>@Repository</td><td>Data access layer (exception translation)</td></tr>
  <tr><td>@Controller / @RestController</td><td>Web layer (REST endpoints)</td></tr>
  <tr><td>@Configuration</td><td>Class that defines @Bean methods</td></tr>
</table>
`
},

'spring-data-jpa': {
  title: 'Spring Data JPA',
  html: `
<h2>Spring Data JPA & Repositories</h2>
<p class="subtitle">Database access without boilerplate SQL</p>

<pre><code>public interface MemberRepository extends JpaRepository&lt;Member, Long&gt; {
    List&lt;Member&gt; findByPlanCode(String planCode);
    Optional&lt;Member&gt; findByMemberId(String memberId);
}</code></pre>

<p>Spring Data generates the implementation at runtime from the method name. <code>findByPlanCode</code> → <code>WHERE plan_code = ?</code></p>

<h3>Entity Example</h3>
<pre><code>@Entity
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "member_id", unique = true)
    private String memberId;

    private String planCode;
}</code></pre>

<div class="interview-q">
  <div class="q">JpaRepository vs CrudRepository?</div>
  <div class="a">"CrudRepository has basic CRUD. JpaRepository adds JPA-specific methods: flush(), saveAllInBatch(), deleteInBatch(), and pagination via Pageable. In production I use JpaRepository for pagination and batch operations."</div>
</div>
`
},

transactions: {
  title: '@Transactional',
  html: `
<h2>Transaction Management</h2>
<p class="subtitle">@Transactional and propagation</p>

<pre><code>@Service
public class EnrollmentService {
    private final MemberRepository repo;

    @Transactional
    public void enrollMember(EnrollmentRequest req) {
        Member member = repo.findByMemberId(req.memberId())
            .orElseThrow(() -> new NotFoundException("Member not found"));
        member.setPlanCode(req.planCode());
        repo.save(member);
        // If exception here → entire transaction rolls back
    }
}</code></pre>

<table>
  <tr><th>Propagation</th><th>Behavior</th></tr>
  <tr><td>REQUIRED (default)</td><td>Join existing tx or create new</td></tr>
  <tr><td>REQUIRES_NEW</td><td>Always new tx — suspends current</td></tr>
  <tr><td>READ_ONLY</td><td>Optimization hint — no writes</td></tr>
</table>

<div class="mistake-box">
  <h4>Common Bug</h4>
  <p><code>@Transactional</code> on a <strong>private</strong> method or <strong>self-invocation</strong> (calling this.save() from same class) — transaction won't apply. Spring AOP proxy only intercepts external calls. Support sees partial DB writes from this.</p>
</div>
`
},

hibernate: {
  title: 'Hibernate & JPA Internals',
  html: `
<h2>Hibernate — What Happens Under JPA</h2>
<p class="subtitle">Session, lazy loading, N+1 problem</p>

<div class="simple-box">
  <h4>In Simple Terms</h4>
  <p>Hibernate is the JPA <strong>implementation</strong> Spring Boot uses by default. It maps Java objects to SQL tables. The <code>EntityManager</code> / Hibernate <code>Session</code> is the bridge between your code and the database.</p>
</div>

<h3>Lazy Loading & N+1 Problem</h3>
<pre><code>@Entity
public class Order {
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List&lt;OrderItem&gt; items;
}

// N+1: 1 query for orders + N queries for each order's items
List&lt;Order&gt; orders = orderRepo.findAll();  // 1 query
orders.forEach(o -> o.getItems().size());   // N queries!</code></pre>

<p><strong>Fix:</strong> <code>@EntityGraph</code>, JOIN FETCH in JPQL, or <code>@BatchSize</code>.</p>

<div class="interview-q">
  <div class="q">LazyInitializationException in production — cause?</div>
  <div class="a">"Accessing a lazy association outside an open Hibernate session — usually after @Transactional method returns and session closed. Fix: fetch join in query, @Transactional on the calling service method, or use DTO projection instead of entity in API response."</div>
</div>
`
},

'rest-controllers': {
  title: 'REST Controllers',
  html: `
<h2>Spring MVC REST Layer</h2>
<p class="subtitle">@RequestMapping, request/response flow</p>

<div class="diagram">HTTP Request Flow
────────────────────────────────────────
Client → Embedded Tomcat
    → DispatcherServlet (Front Controller)
    → HandlerMapping (find @GetMapping method)
    → HandlerAdapter (invoke controller method)
    → @RestController method returns object
    → HttpMessageConverter (Jackson → JSON)
    → HTTP Response to client
────────────────────────────────────────</div>

<pre><code>@RestController
@RequestMapping("/api/v1/members")
public class MemberController {
    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity&lt;MemberDto&gt; getMember(@PathVariable String id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity&lt;MemberDto&gt; create(@Valid @RequestBody CreateMemberRequest req) {
        MemberDto created = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}</code></pre>
`
},

'spring-security': {
  title: 'Spring Security',
  html: `
<h2>Spring Security Basics</h2>
<p class="subtitle">Filter chain, JWT, and auto-configuration</p>

<div class="diagram">Security Filter Chain (simplified)
────────────────────────────────────────
Request
  → SecurityContextPersistenceFilter
  → JwtAuthenticationFilter (custom)
  → UsernamePasswordAuthenticationFilter
  → AuthorizationFilter (roles/permissions)
  → DispatcherServlet → Controller
────────────────────────────────────────</div>

<pre><code>@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}</code></pre>

<div class="interview-q">
  <div class="q">All endpoints return 401 after deploy. Debug steps?</div>
  <div class="a">"Check SecurityFilterChain config — were permitAll paths changed? Verify JWT secret env var matches between services. Check Splunk for AuthenticationException. Test /actuator/health first — if that fails too, it's a broad security config issue not JWT."</div>
</div>
`
},

'exception-handling': {
  title: 'Exception Handling',
  html: `
<h2>@ControllerAdvice & Global Exception Handling</h2>
<p class="subtitle">Consistent API error responses</p>

<pre><code>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleNotFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleValidation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("VALIDATION_ERROR", msg));
    }
}</code></pre>

<p>In production support, consistent error JSON helps Splunk parsing — search for <code>errorCode</code> or <code>exception_class</code> across services.</p>
`
},

actuator: {
  title: 'Spring Boot Actuator',
  html: `
<h2>Actuator — Production Monitoring Endpoints</h2>
<p class="subtitle">Health, metrics, and support engineer's best friend</p>

<pre><code># application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,env,beans
  endpoint:
    health:
      show-details: when_authorized</code></pre>

<table>
  <tr><th>Endpoint</th><th>Purpose</th><th>Support Use</th></tr>
  <tr><td>/actuator/health</td><td>App + dependency health</td><td>Is DB/Kafka UP?</td></tr>
  <tr><td>/actuator/metrics</td><td>JVM, HTTP, Hikari metrics</td><td>Pool exhaustion, latency</td></tr>
  <tr><td>/actuator/env</td><td>Property values (sanitized)</td><td>Wrong config in prod?</td></tr>
  <tr><td>/actuator/beans</td><td>All registered beans</td><td>Missing bean debug</td></tr>
  <tr><td>/actuator/conditions</td><td>Auto-config report</td><td>Why wasn't DataSource created?</td></tr>
</table>

<pre><code>curl -s localhost:8080/actuator/health | jq .
curl -s localhost:8080/actuator/metrics/jvm.memory.used
curl -s localhost:8080/actuator/metrics/hikaricp.connections.active</code></pre>
`
},

'startup-failures': {
  title: 'Startup Failure Debugging',
  html: `
<h2>Debugging Spring Boot Startup Failures</h2>
<p class="subtitle">Production support playbook for APPLICATION FAILED TO START</p>

<table>
  <tr><th>Error</th><th>Cause</th><th>Fix</th></tr>
  <tr><td>Failed to configure a DataSource</td><td>No URL / driver / wrong profile</td><td>Set spring.datasource.* or exclude auto-config</td></tr>
  <tr><td>Port 8080 already in use</td><td>Another process on port</td><td>server.port or kill conflicting process</td></tr>
  <tr><td>BeanCreationException</td><td>Missing dependency, config error</td><td>Read nested cause in stack trace</td></tr>
  <tr><td>NoSuchBeanDefinitionException</td><td>Component not scanned</td><td>Check package, @ComponentScan scope</td></tr>
  <tr><td>Cycle dependency</td><td>A needs B, B needs A</td><td>@Lazy, refactor, or constructor redesign</td></tr>
  <tr><td>ClassNotFoundException on startup</td><td>Missing jar / wrong Boot version</td><td>Check pom.xml / Gradle deps</td></tr>
</table>

<div class="steps-box">
  <h4>Support Triage Steps</h4>
  <ol>
    <li>Read <code>Description:</code> line in startup log — Boot prints human-readable reason</li>
    <li>Check <code>SPRING_PROFILES_ACTIVE</code> and env vars vs application-prod.yml</li>
    <li>Run with <code>--debug</code> for conditions report</li>
    <li>Compare last successful deploy config with current (GitLab CI artifact)</li>
    <li>Splunk: search <code>APPLICATION FAILED TO START</code> with host and timestamp</li>
  </ol>
</div>

<pre><code># Useful debug logging
logging.level.org.springframework.boot.autoconfigure=DEBUG
logging.level.org.springframework.context=DEBUG</code></pre>
`
},

'interview-qa': {
  title: 'Top Interview Q&A',
  html: `
<h2>Spring Boot — Top 15 Interview Questions</h2>
<p class="subtitle">Quick reference with answers</p>

<div class="interview-q">
  <div class="q">1. What does @SpringBootApplication do?</div>
  <div class="a">Combines @Configuration + @ComponentScan + @EnableAutoConfiguration. Entry point for scanning, bean registration, and conditional auto-config.</div>
</div>

<div class="interview-q">
  <div class="q">2. How does auto-configuration work?</div>
  <div class="a">Classes in AutoConfiguration.imports evaluated at startup. @ConditionalOnClass/MissingBean/Property decide which beans to create. User-defined beans override defaults.</div>
</div>

<div class="interview-q">
  <div class="q">3. Difference between @Component, @Service, @Repository?</div>
  <div class="a">All are @Component stereotypes. @Service = business layer. @Repository = persistence + exception translation. Semantics for readability and AOP pointcuts.</div>
</div>

<div class="interview-q">
  <div class="q">4. What is ApplicationContext?</div>
  <div class="a">The Spring IoC container. Manages bean lifecycle, dependency injection, events, and resources. Created during SpringApplication.run().</div>
</div>

<div class="interview-q">
  <div class="q">5. Constructor vs field injection?</div>
  <div class="a">Constructor — preferred. Immutable, required dependencies explicit, easy to unit test without Spring. Field injection hides dependencies and needs reflection in tests.</div>
</div>

<div class="interview-q">
  <div class="q">6. What are Spring Boot starters?</div>
  <div class="a">Curated dependency bundles. spring-boot-starter-web pulls Tomcat, Spring MVC, Jackson. Transitive deps + matching auto-config.</div>
</div>

<div class="interview-q">
  <div class="q">7. How do profiles work?</div>
  <div class="a">Environment-specific config via application-{profile}.yml. Activated by spring.profiles.active. Beans can use @Profile("prod") for environment-specific implementations.</div>
</div>

<div class="interview-q">
  <div class="q">8. What is DispatcherServlet?</div>
  <div class="a">Front controller in Spring MVC. Receives all HTTP requests, delegates to @Controller methods via HandlerMapping and HandlerAdapter, converts response via HttpMessageConverter.</div>
</div>

<div class="interview-q">
  <div class="q">9. @Transactional — how does it work?</div>
  <div class="a">Spring AOP proxy wraps the bean. Method call starts/commits/rollbacks DB transaction via PlatformTransactionManager. Only works on public methods called through proxy.</div>
</div>

<div class="interview-q">
  <div class="q">10. Spring Boot 2 vs 3 main changes?</div>
  <div class="a">Java 17+ required. Jakarta EE (jakarta.* not javax.*). Native/GraalVM improvements. AutoConfiguration.imports replaces spring.factories. Security config uses SecurityFilterChain bean.</div>
</div>

<div class="answer-simple">
  <strong>Final Tip:</strong> In Support II interviews, tie every Spring answer to production: "When I see BeanCreationException in Splunk, I check the nested cause and compare env vars with application-prod.yml."
</div>
`
}

};

// Expose globally for sidebar script
if (typeof window !== 'undefined') {
  window.TOPICS = TOPICS;
}
