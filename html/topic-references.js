/**
 * External deep-dive references per topic (key = checklist link text or article h3 title).
 * Each topic: 1–2 curated links (official docs, Baeldung, Spring, etc.)
 */
const TOPIC_REFERENCES = {
  "Java Basics": [
    { label: "Oracle Java Tutorial", url: "https://docs.oracle.com/javase/tutorial/" },
    { label: "Baeldung Java", url: "https://www.baeldung.com/java-tutorial" }
  ],
  "OOP Principles (Abstraction, Encapsulation, Inheritance, Polymorphism)": [
    { label: "Oracle OOP Concepts", url: "https://docs.oracle.com/javase/tutorial/java/concepts/" },
    { label: "Baeldung OOP", url: "https://www.baeldung.com/java-oop" }
  ],
  "Multithreading & Executor Framework": [
    { label: "Oracle Concurrency", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/" },
    { label: "Baeldung ExecutorService", url: "https://www.baeldung.com/java-executor-service-tutorial" }
  ],
  "Multithreading & Concurrency (20 concepts)": [
    { label: "Baeldung Java Concurrency", url: "https://www.baeldung.com/java-concurrency" },
    { label: "Oracle JMM", url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html" }
  ],
  "Java Networking": [
    { label: "Oracle Networking", url: "https://docs.oracle.com/javase/tutorial/networking/" },
    { label: "Baeldung Sockets", url: "https://www.baeldung.com/a-guide-to-java-sockets" }
  ],
  "Exception Handling": [
    { label: "Oracle Exceptions", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/" },
    { label: "Baeldung Exceptions", url: "https://www.baeldung.com/java-exceptions" }
  ],
  "Collection Framework": [
    { label: "Oracle Collections", url: "https://docs.oracle.com/javase/tutorial/collections/" },
    { label: "Baeldung Collections", url: "https://www.baeldung.com/java-collections" }
  ],
  "HashMap Internal Working": [
    { label: "Baeldung HashMap", url: "https://www.baeldung.com/java-hashmap" },
    { label: "Oracle Map Interface", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html" }
  ],
  "ConcurrentHashMap": [
    { label: "Baeldung CHM", url: "https://www.baeldung.com/java-concurrent-map" },
    { label: "Oracle ConcurrentHashMap", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html" }
  ],
  "String vs StringBuilder vs StringBuffer": [
    { label: "Baeldung String vs StringBuilder", url: "https://www.baeldung.com/java-string-builder-string-buffer" },
    { label: "Oracle Strings", url: "https://docs.oracle.com/javase/tutorial/java/data/strings.html" }
  ],
  "Strings & Regular Expressions": [
    { label: "Oracle Regex", url: "https://docs.oracle.com/javase/tutorial/essential/regex/" },
    { label: "Baeldung Regex", url: "https://www.baeldung.com/java-regex" }
  ],
  "equals() vs ==": [
    { label: "Baeldung equals hashCode", url: "https://www.baeldung.com/java-equals-hashcode-contracts" },
    { label: "Oracle Object equals", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)" }
  ],
  "Advanced Java": [
    { label: "Oracle Advanced Topics", url: "https://docs.oracle.com/javase/tutorial/" },
    { label: "Baeldung Core Java", url: "https://www.baeldung.com/java-tutorial" }
  ],
  "File I/O & Serialization": [
    { label: "Oracle I/O", url: "https://docs.oracle.com/javase/tutorial/essential/io/" },
    { label: "Baeldung Serialization", url: "https://www.baeldung.com/java-serialization" }
  ],
  "Annotations & Reflection": [
    { label: "Oracle Annotations", url: "https://docs.oracle.com/javase/tutorial/java/annotations/" },
    { label: "Baeldung Reflection", url: "https://www.baeldung.com/java-reflection" }
  ],
  "JDBC": [
    { label: "Oracle JDBC", url: "https://docs.oracle.com/javase/tutorial/jdbc/" },
    { label: "Baeldung JDBC", url: "https://www.baeldung.com/java-jdbc" }
  ],
  "Java Testing (JUnit & Mockito)": [
    { label: "JUnit 5 User Guide", url: "https://junit.org/junit5/docs/current/user-guide/" },
    { label: "Baeldung Mockito", url: "https://www.baeldung.com/mockito-series" }
  ],
  "Web Development (REST / HTTP basics)": [
    { label: "MDN HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" },
    { label: "REST API Tutorial", url: "https://restfulapi.net/" }
  ],
  "Java 8 Features (Streams, Lambda, Functional Interfaces)": [
    { label: "Oracle Lambda", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html" },
    { label: "Baeldung Streams", url: "https://www.baeldung.com/java-8-streams" }
  ],
  "Optional Class": [
    { label: "Oracle Optional", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Optional.html" },
    { label: "Baeldung Optional", url: "https://www.baeldung.com/java-optional" }
  ],
  "Design Patterns (Backend-relevant)": [
    { label: "Refactoring Guru", url: "https://refactoring.guru/design-patterns" },
    { label: "Baeldung Design Patterns", url: "https://www.baeldung.com/design-patterns-series" }
  ],
  "Java Security & Spring Security Basics": [
    { label: "Spring Security Docs", url: "https://docs.spring.io/spring-security/reference/index.html" },
    { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }
  ],
  "CompletableFuture": [
    { label: "Baeldung CompletableFuture", url: "https://www.baeldung.com/java-completablefuture" },
    { label: "Oracle CompletableFuture", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html" }
  ],
  "Cloud Computing Fundamentals": [
    { label: "AWS Cloud Overview", url: "https://aws.amazon.com/what-is-cloud-computing/" },
    { label: "Google Cloud Basics", url: "https://cloud.google.com/learn/cloud-computing" }
  ],

  "Spring Core & Dependency Injection": [
    { label: "Spring IoC Container", url: "https://docs.spring.io/spring-framework/reference/core/beans.html" },
    { label: "Baeldung Spring DI", url: "https://www.baeldung.com/spring-di" }
  ],
  "Bean Lifecycle & Scopes": [
    { label: "Spring Bean Scopes", url: "https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html" },
    { label: "Baeldung Bean Lifecycle", url: "https://www.baeldung.com/spring-bean-lifecycle" }
  ],
  "@Component vs @Service vs @Repository": [
    { label: "Spring Stereotype Annotations", url: "https://docs.spring.io/spring-framework/reference/core/beans/definition.html" },
    { label: "Baeldung Spring Annotations", url: "https://www.baeldung.com/spring-component-repository-service" }
  ],
  "Spring Boot Auto Configuration": [
    { label: "Spring Boot Auto-config", url: "https://docs.spring.io/spring-boot/reference/using/auto-configuration.html" },
    { label: "Baeldung Auto-config", url: "https://www.baeldung.com/spring-boot-auto-configuration" }
  ],
  "Profiles & Configuration Management": [
    { label: "Spring Profiles", url: "https://docs.spring.io/spring-boot/reference/features/profiles.html" },
    { label: "Baeldung Spring Profiles", url: "https://www.baeldung.com/spring-profiles" }
  ],
  "REST API Design & Validation Framework": [
    { label: "Spring Web MVC", url: "https://docs.spring.io/spring-framework/reference/web/webmvc.html" },
    { label: "Baeldung Validation", url: "https://www.baeldung.com/spring-boot-bean-validation" }
  ],
  "Exception Handling using @ControllerAdvice": [
    { label: "Spring @ControllerAdvice", url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-advice.html" },
    { label: "Baeldung Exception Handling", url: "https://www.baeldung.com/exception-handling-for-rest-with-spring" }
  ],
  "@Transactional & Propagation": [
    { label: "Spring Transactions", url: "https://docs.spring.io/spring-framework/reference/data-access/transaction.html" },
    { label: "Baeldung @Transactional", url: "https://www.baeldung.com/transaction-configuration-with-jpa-and-spring" }
  ],
  "Interceptors & Filters": [
    { label: "Spring HandlerInterceptor", url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/handlermapping-interceptor.html" },
    { label: "Baeldung Filters vs Interceptors", url: "https://www.baeldung.com/spring-mvc-handlerinterceptor" }
  ],
  "Hibernate & JPA Internals": [
    { label: "Hibernate ORM Docs", url: "https://hibernate.org/orm/documentation/" },
    { label: "Baeldung JPA", url: "https://www.baeldung.com/jpa-hibernate-difference" }
  ],
  "Lazy vs Eager Loading": [
    { label: "Baeldung Lazy Loading", url: "https://www.baeldung.com/hibernate-lazy-eager-loading" },
    { label: "Hibernate Fetching", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#fetching" }
  ],
  "N+1 Query Problem": [
    { label: "Baeldung N+1", url: "https://www.baeldung.com/jpa-hibernate-n-plus-1-problem" },
    { label: "Hibernate Performance", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#performance" }
  ],
  "Caching & Performance Tuning": [
    { label: "Spring Cache", url: "https://docs.spring.io/spring-framework/reference/integration/cache.html" },
    { label: "Baeldung Spring Cache", url: "https://www.baeldung.com/spring-cache-tutorial" }
  ],
  "Spring Security & JWT Authentication": [
    { label: "Spring Security JWT", url: "https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html" },
    { label: "Baeldung JWT", url: "https://www.baeldung.com/spring-security-oauth-jwt" }
  ],
  "OAuth2 vs JWT": [
    { label: "OAuth 2.0 Spec", url: "https://oauth.net/2/" },
    { label: "Baeldung OAuth2", url: "https://www.baeldung.com/spring-security-oauth" }
  ],
  "Actuator": [
    { label: "Spring Boot Actuator", url: "https://docs.spring.io/spring-boot/reference/actuator/index.html" },
    { label: "Baeldung Actuator", url: "https://www.baeldung.com/spring-boot-actuators" }
  ],
  "Spring Framework Deep Dive (30 Q)": [
    { label: "Spring Boot Reference", url: "https://docs.spring.io/spring-boot/reference/index.html" },
    { label: "Baeldung Spring Boot", url: "https://www.baeldung.com/spring-boot" }
  ],

  "Docker Fundamentals for Java Apps": [
    { label: "Docker Docs", url: "https://docs.docker.com/get-started/" },
    { label: "Baeldung Docker Java", url: "https://www.baeldung.com/docker-java-spring-boot" }
  ],
  "Multi-stage Docker Builds for Spring Boot": [
    { label: "Docker Multi-stage", url: "https://docs.docker.com/build/building/multi-stage/" },
    { label: "Spring Boot Docker", url: "https://spring.io/guides/topicals/spring-boot-docker" }
  ],
  "JVM Memory Tuning Inside Containers": [
    { label: "Container-aware JVM", url: "https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html" },
    { label: "Baeldung JVM Containers", url: "https://www.baeldung.com/jvm-memory-management" }
  ],
  "Common Docker Production Mistakes": [
    { label: "Docker Best Practices", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" },
    { label: "12-Factor App", url: "https://12factor.net/" }
  ],

  "Deploy Spring Boot on AWS (EC2 / ECS / Lambda)": [
    { label: "AWS Spring Boot", url: "https://aws.amazon.com/blogs/opensource/category/java/" },
    { label: "Spring on AWS", url: "https://spring.io/guides" }
  ],
  "Dockerized Deployments": [
    { label: "Docker Deploy", url: "https://docs.docker.com/get-started/workshop/08_using_compose/" },
    { label: "Kubernetes Deployments", url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" }
  ],
  "Kubernetes Basics (Pods, Services, Autoscaling)": [
    { label: "Kubernetes Docs", url: "https://kubernetes.io/docs/home/" },
    { label: "K8s Concepts", url: "https://kubernetes.io/docs/concepts/" }
  ],
  "CI/CD Pipelines (GitHub Actions / Jenkins)": [
    { label: "GitHub Actions", url: "https://docs.github.com/en/actions" },
    { label: "Jenkins Docs", url: "https://www.jenkins.io/doc/" }
  ],
  "Logging, Monitoring & Distributed Tracing": [
    { label: "OpenTelemetry", url: "https://opentelemetry.io/docs/" },
    { label: "Spring Observability", url: "https://docs.spring.io/spring-boot/reference/actuator/observability.html" }
  ],
  "Prometheus & Grafana Basics": [
    { label: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/" },
    { label: "Grafana Docs", url: "https://grafana.com/docs/grafana/latest/" }
  ],
  "Terraform Fundamentals": [
    { label: "Terraform Intro", url: "https://developer.hashicorp.com/terraform/intro" },
    { label: "Terraform AWS", url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started" }
  ],
  "Deploying Spring Boot Microservice to Production": [
    { label: "Spring Boot Production", url: "https://docs.spring.io/spring-boot/reference/actuator/index.html" },
    { label: "12-Factor App", url: "https://12factor.net/" }
  ],

  "ACID Properties": [
    { label: "PostgreSQL ACID", url: "https://www.postgresql.org/docs/current/transaction-iso.html" },
    { label: "Baeldung ACID", url: "https://www.baeldung.com/cs/acid-transactions" }
  ],
  "SQL Indexing & Optimization": [
    { label: "Use The Index, Luke", url: "https://use-the-index-luke.com/" },
    { label: "PostgreSQL Indexes", url: "https://www.postgresql.org/docs/current/indexes.html" }
  ],
  "Transactions": [
    { label: "Oracle JDBC Transactions", url: "https://docs.oracle.com/javase/tutorial/jdbc/basics/transactions.html" },
    { label: "Baeldung Transactions", url: "https://www.baeldung.com/spring-transactional-propagation-isolation" }
  ],
  "Transaction Isolation Levels": [
    { label: "PostgreSQL Isolation", url: "https://www.postgresql.org/docs/current/transaction-iso.html" },
    { label: "Baeldung Isolation", url: "https://www.baeldung.com/spring-transactional-propagation-isolation" }
  ],
  "Normalization vs Denormalization": [
    { label: "Database Normalization", url: "https://www.studytonight.com/dbms/database-normalization.php" },
    { label: "Baeldung Normalization", url: "https://www.baeldung.com/cs/database-normalization" }
  ],
  "Joins (Inner, Left, Right, Full)": [
    { label: "W3Schools SQL Joins", url: "https://www.w3schools.com/sql/sql_join.asp" },
    { label: "PostgreSQL Joins", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html" }
  ],
  "Query Optimization": [
    { label: "Use The Index, Luke", url: "https://use-the-index-luke.com/" },
    { label: "Baeldung JPA Performance", url: "https://www.baeldung.com/jpa-hibernate-batch-insert-update" }
  ],
  "Hibernate Performance Tuning": [
    { label: "Hibernate Performance", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#performance" },
    { label: "Baeldung Hibernate Tips", url: "https://www.baeldung.com/hibernate-query-performance" }
  ],
  "Optimistic vs Pessimistic Locking": [
    { label: "Baeldung Locking", url: "https://www.baeldung.com/jpa-optimistic-locking" },
    { label: "Hibernate Locking", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#locking" }
  ],
  "Redis Caching Strategies": [
    { label: "Redis Docs", url: "https://redis.io/docs/" },
    { label: "Baeldung Redis", url: "https://www.baeldung.com/redis-spring" }
  ],
  "Cache Invalidation Scenarios": [
    { label: "Baeldung Cache Aside", url: "https://www.baeldung.com/spring-cache-tutorial" },
    { label: "AWS Caching", url: "https://aws.amazon.com/caching/" }
  ],
  "Connection Pooling (HikariCP)": [
    { label: "HikariCP Wiki", url: "https://github.com/brettwooldridge/HikariCP/wiki" },
    { label: "Baeldung HikariCP", url: "https://www.baeldung.com/hikaricp" }
  ],
  "Flyway / Liquibase Migrations": [
    { label: "Flyway Docs", url: "https://documentation.red-gate.com/fd" },
    { label: "Liquibase Docs", url: "https://docs.liquibase.com/" }
  ],
  "ElasticSearch Basics": [
    { label: "Elasticsearch Guide", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html" },
    { label: "Baeldung Elasticsearch", url: "https://www.baeldung.com/elasticsearch-java" }
  ],
  "Pagination": [
    { label: "Spring Data Pagination", url: "https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html" },
    { label: "Baeldung Pagination", url: "https://www.baeldung.com/spring-data-jpa-pagination-sorting" }
  ],
  "Deadlocks": [
    { label: "Oracle Deadlock", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/deadlock.html" },
    { label: "PostgreSQL Deadlocks", url: "https://www.postgresql.org/docs/current/explicit-locking.html" }
  ],

  "Monolith vs Microservices": [
    { label: "Microservices.io", url: "https://microservices.io/" },
    { label: "Martin Fowler Microservices", url: "https://martinfowler.com/articles/microservices.html" }
  ],
  "Service Discovery": [
    { label: "Spring Cloud Discovery", url: "https://spring.io/projects/spring-cloud-netflix" },
    { label: "Consul Service Discovery", url: "https://developer.hashicorp.com/consul/docs" }
  ],
  "API Gateway": [
    { label: "Spring Cloud Gateway", url: "https://docs.spring.io/spring-cloud-gateway/reference/" },
    { label: "AWS API Gateway", url: "https://docs.aws.amazon.com/apigateway/" }
  ],
  "Circuit Breaker Pattern": [
    { label: "Resilience4j", url: "https://resilience4j.readme.io/docs/circuitbreaker" },
    { label: "Martin Fowler Circuit Breaker", url: "https://martinfowler.com/bliki/CircuitBreaker.html" }
  ],
  "Distributed Tracing": [
    { label: "OpenTelemetry Tracing", url: "https://opentelemetry.io/docs/concepts/signals/traces/" },
    { label: "Spring Cloud Sleuth", url: "https://spring.io/projects/spring-cloud-sleuth" }
  ],
  "Configuration Management": [
    { label: "Spring Cloud Config", url: "https://spring.io/projects/spring-cloud-config" },
    { label: "12-Factor Config", url: "https://12factor.net/config" }
  ],
  "Load Balancing": [
    { label: "NGINX Load Balancing", url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/" },
    { label: "Spring Cloud LoadBalancer", url: "https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html" }
  ],
  "Synchronous vs Asynchronous Communication": [
    { label: "Baeldung Async", url: "https://www.baeldung.com/spring-async" },
    { label: "Kafka vs REST", url: "https://kafka.apache.org/documentation/" }
  ],
  "Retry & Fallback Mechanisms": [
    { label: "Resilience4j Retry", url: "https://resilience4j.readme.io/docs/retry" },
    { label: "Spring Retry", url: "https://docs.spring.io/spring-retry/docs/current/reference/html/" }
  ],
  "Resilience Patterns": [
    { label: "Azure Resilience", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/category/resiliency" },
    { label: "Resilience4j", url: "https://resilience4j.readme.io/docs/getting-started" }
  ],

  "15-Day System Design Interview Strategy": [
    { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
    { label: "ByteByteGo", url: "https://bytebytego.com/" }
  ],
  "High-Level Architecture Concepts": [
    { label: "AWS Architecture", url: "https://aws.amazon.com/architecture/" },
    { label: "Martin Fowler Architecture", url: "https://martinfowler.com/architecture/" }
  ],
  "Low-Level Design Questions": [
    { label: "Grokking LLD", url: "https://www.educative.io/courses/grokking-the-low-level-design-interview-using-ood-principles" },
    { label: "Refactoring Guru", url: "https://refactoring.guru/design-patterns" }
  ],
  "Parking Lot System Design": [
    { label: "Grokking LLD Parking Lot", url: "https://www.educative.io/courses/grokking-the-low-level-design-interview-using-ood-principles" },
    { label: "InterviewBit LLD", url: "https://www.interviewbit.com/low-level-design/" }
  ],
  "Rate Limiter Design": [
    { label: "System Design Rate Limiter", url: "https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users" },
    { label: "Baeldung Rate Limiting", url: "https://www.baeldung.com/spring-bucket4j" }
  ],
  "Restaurant Reservation System": [
    { label: "Grokking LLD", url: "https://www.educative.io/courses/grokking-the-low-level-design-interview-using-ood-principles" },
    { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
  ],
  "URL Shortener Design": [
    { label: "System Design URL Shortener", url: "https://bytebytego.com/courses/system-design-interview/design-a-url-shortener" },
    { label: "Grokking System Design", url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers" }
  ],
  "Notification Service Design": [
    { label: "System Design Notifications", url: "https://github.com/donnemartin/system-design-primer" },
    { label: "AWS SNS", url: "https://docs.aws.amazon.com/sns/" }
  ],
  "Flash Sale / Inventory Concurrency Design": [
    { label: "Baeldung Optimistic Locking", url: "https://www.baeldung.com/jpa-optimistic-locking" },
    { label: "System Design Flash Sale", url: "https://github.com/donnemartin/system-design-primer" }
  ],
  "Caching Strategies": [
    { label: "AWS Caching", url: "https://aws.amazon.com/caching/" },
    { label: "Baeldung Caching", url: "https://www.baeldung.com/spring-cache-tutorial" }
  ],
  "Database Scaling": [
    { label: "AWS DB Scaling", url: "https://aws.amazon.com/blogs/database/" },
    { label: "System Design Scaling", url: "https://github.com/donnemartin/system-design-primer#index-of-system-design-topics" }
  ],
  "Horizontal vs Vertical Scaling": [
    { label: "AWS Scaling", url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/scalability-and-elasticity.html" },
    { label: "Baeldung Scalability", url: "https://www.baeldung.com/cs/scalability-vs-performance" }
  ],
  "CAP Theorem": [
    { label: "CAP Theorem Explained", url: "https://www.baeldung.com/cs/cap-theorem" },
    { label: "Martin Fowler CAP", url: "https://martinfowler.com/articles/distributedComputing.html" }
  ],
  "Message Queues & Event-Driven Design": [
    { label: "Apache Kafka Docs", url: "https://kafka.apache.org/documentation/" },
    { label: "Martin Fowler EDA", url: "https://martinfowler.com/articles/201701-event-driven.html" }
  ],

  "Application suddenly becomes slow — what to check?": [
    { label: "Spring Boot Performance", url: "https://docs.spring.io/spring-boot/reference/actuator/metrics.html" },
    { label: "Baeldung Performance", url: "https://www.baeldung.com/spring-boot-performance" }
  ],
  "Database CPU reaches 100%": [
    { label: "PostgreSQL Performance", url: "https://www.postgresql.org/docs/current/performance-tips.html" },
    { label: "Use The Index, Luke", url: "https://use-the-index-luke.com/" }
  ],
  "Memory Leak Investigation": [
    { label: "Oracle Troubleshooting Memory", url: "https://docs.oracle.com/en/java/javase/17/troubleshoot/" },
    { label: "Baeldung Memory Leaks", url: "https://www.baeldung.com/java-memory-leaks" }
  ],
  "API response time increases after deployment": [
    { label: "Spring Boot Actuator", url: "https://docs.spring.io/spring-boot/reference/actuator/index.html" },
    { label: "OpenTelemetry", url: "https://opentelemetry.io/docs/" }
  ],
  "Thread Pool Exhaustion": [
    { label: "Baeldung Thread Pool", url: "https://www.baeldung.com/java-thread-pool" },
    { label: "Oracle Thread Pools", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/pools.html" }
  ],
  "High GC pauses": [
    { label: "Oracle GC Tuning", url: "https://docs.oracle.com/en/java/javase/17/gctuning/" },
    { label: "Baeldung GC", url: "https://www.baeldung.com/jvm-garbage-collectors" }
  ],
  "Service-to-Service communication failures": [
    { label: "Resilience4j", url: "https://resilience4j.readme.io/docs/getting-started" },
    { label: "Spring Cloud", url: "https://spring.io/projects/spring-cloud" }
  ],
  "Cache not reducing database load": [
    { label: "Redis Caching Patterns", url: "https://redis.io/docs/manual/patterns/" },
    { label: "Baeldung Cache", url: "https://www.baeldung.com/spring-cache-tutorial" }
  ],
  "Handling traffic spikes": [
    { label: "AWS Auto Scaling", url: "https://docs.aws.amazon.com/autoscaling/" },
    { label: "Kubernetes HPA", url: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/" }
  ],
  "Debugging production incidents": [
    { label: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/" },
    { label: "Spring Boot Actuator", url: "https://docs.spring.io/spring-boot/reference/actuator/index.html" }
  ]
};

/* Common article h3 titles on content pages */
Object.assign(TOPIC_REFERENCES, {
  "What is a Constructor?": [
    { label: "Oracle Classes", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html" },
    { label: "Baeldung Constructors", url: "https://www.baeldung.com/java-constructors" }
  ],
  "How does HashMap work internally?": [
    { label: "Baeldung HashMap", url: "https://www.baeldung.com/java-hashmap" },
    { label: "Oracle HashMap", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html" }
  ],
  "How does @Transactional work internally?": [
    { label: "Spring Transactions", url: "https://docs.spring.io/spring-framework/reference/data-access/transaction.html" },
    { label: "Baeldung @Transactional", url: "https://www.baeldung.com/transaction-configuration-with-jpa-and-spring" }
  ],
  "The N+1 Query Problem": [
    { label: "Baeldung N+1", url: "https://www.baeldung.com/jpa-hibernate-n-plus-1-problem" },
    { label: "Hibernate Performance", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#performance" }
  ],
  "Lazy vs Eager Loading": [
    { label: "Baeldung Lazy/Eager", url: "https://www.baeldung.com/hibernate-lazy-eager-loading" },
    { label: "Hibernate Fetching", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#fetching" }
  ],
  "How do you Dockerize a Spring Boot application?": [
    { label: "Spring Boot Docker", url: "https://spring.io/guides/topicals/spring-boot-docker" },
    { label: "Docker Multi-stage", url: "https://docs.docker.com/build/building/multi-stage/" }
  ],
  "How does Spring Boot decide which auto-configuration to apply?": [
    { label: "Spring Auto-config", url: "https://docs.spring.io/spring-boot/reference/using/auto-configuration.html" },
    { label: "Baeldung Auto-config", url: "https://www.baeldung.com/spring-boot-auto-configuration" }
  ]
});
