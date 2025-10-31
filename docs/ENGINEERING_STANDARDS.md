# Engineering Standards

**Template Version:** 0.0.1
**Status:** Foundation Commit
**Last Updated:** 2025-01-31T00:00:00Z
**Note:** This is a template. Replace project-specific details later.

---

## Core Principles

### Maintainability & Long-Term Quality
- **Code is read 10x more than written** — optimize for clarity
- **Future teams must understand today's decisions** — document reasoning
- **Technical debt is tracked and addressed** — never swept under the rug
- **Refactoring is continuous** — not a separate phase

### Fundamental Design Rules
- **SOLID** — Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion
- **DRY** — Don't Repeat Yourself (but avoid premature abstraction)
- **KISS** — Keep It Simple, Stupid
- **YAGNI** — You Aren't Gonna Need It (build what's needed now)

### Security First
- **Assume hostile input** — validate at every boundary
- **Principle of least privilege** — minimal permissions by default
- **Defense in depth** — multiple layers of protection
- **Fail securely** — errors should not leak sensitive information
- **Security reviews are mandatory** — before merge and before deploy

### Test-First Thinking
- **Tests are requirements** — they define expected behavior
- **Write tests before or with code** — not after
- **Tests must be maintainable** — clear, focused, fast
- **Coverage is a metric, not a goal** — focus on critical paths
- **Integration and E2E tests protect against regressions**

---

## Architecture Rules

### Modularity & Scalability
- **Loose coupling, high cohesion** — modules should be independent
- **Service boundaries are clear** — well-defined interfaces
- **Horizontal scaling over vertical** — design for distributed systems
- **Stateless where possible** — easier to scale and debug
- **Event-driven patterns for async operations** — decouple producers and consumers

### Recommended Architecture Patterns
- **Hexagonal/Clean Architecture** — domain logic isolated from infrastructure
- **Ports and Adapters** — infrastructure details are pluggable
- **Repository Pattern** — abstract data access
- **CQRS where beneficial** — separate read and write models for complex domains
- **API Gateway Pattern** — centralized routing and cross-cutting concerns

### Minimal Coupling
- **Avoid tight framework coupling** — business logic should be framework-agnostic
- **Dependency injection over hard dependencies** — make dependencies explicit
- **Use interfaces/protocols** — depend on abstractions, not concrete implementations
- **Avoid circular dependencies** — refactor when detected

### Logging & Observability from Start
- **Structured logging** — JSON or key-value pairs
- **Log levels used correctly** — ERROR, WARN, INFO, DEBUG
- **Correlation IDs for tracing** — track requests across services
- **Metrics collection** — latency, throughput, error rates
- **Health checks and readiness probes** — for orchestration and monitoring
- **Distributed tracing ready** — OpenTelemetry or similar

---

## Coding Conventions

### Semantic Commits
Use conventional commit format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `refactor` — code change that neither fixes a bug nor adds a feature
- `test` — adding or updating tests
- `chore` — maintenance tasks
- `security` — security-related changes
- `perf` — performance improvements

**Example:**
```
feat(auth): add JWT token refresh endpoint

Implements token refresh flow to extend user sessions
without requiring re-authentication.

Refs: #123
```

### Typed APIs & Stable Interfaces
- **Use strong typing** — TypeScript, type hints, schemas
- **API contracts are versioned** — breaking changes require version bump
- **Schema definitions for all APIs** — OpenAPI, GraphQL schema, Protobuf
- **Input validation at boundaries** — reject invalid data early
- **Return types are explicit** — avoid `any` or untyped responses

### Meaningful Names
- **Variables and functions describe intent** — `getUserById`, not `fetch`
- **Avoid abbreviations unless widely known** — `request` over `req` in function names
- **Boolean variables are questions** — `isActive`, `hasPermission`, `canEdit`
- **Constants are UPPER_SNAKE_CASE** — `MAX_RETRY_ATTEMPTS`
- **Classes are nouns** — `UserRepository`, `OrderService`
- **Functions are verbs** — `calculateTotal`, `validateInput`

### No Hidden State or Magic Patterns
- **Explicit over implicit** — avoid hidden side effects
- **No global mutable state** — pass dependencies explicitly
- **Avoid reflection/metaprogramming for core logic** — use when necessary, document heavily
- **Configuration is explicit** — no "magic" config files loaded from unknown locations
- **Dependencies are declared** — no surprise imports or runtime discovery

---

## Code Quality Standards

### Readability
- **Code reviews ask "can a junior understand this?"**
- **Complex logic has explanatory comments**
- **Functions are small and focused** — typically under 50 lines
- **Nesting depth is limited** — extract functions when deeply nested
- **Naming is more important than cleverness**

### Performance
- **Measure before optimizing** — profile first
- **Optimize critical paths** — focus on high-impact areas
- **Avoid premature optimization** — clarity first, speed second (unless critical)
- **Use appropriate data structures** — O(n) vs O(1) matters at scale
- **Cache strategically** — with clear invalidation rules

### Error Handling
- **Errors are explicit** — use Result types or explicit error returns
- **Never swallow errors silently** — log or propagate
- **Provide context in errors** — what failed and why
- **Distinguish between recoverable and fatal errors**
- **User-facing errors are helpful** — not just stack traces

---

## Documentation Standards

### Code-Level Documentation
- **Public APIs are documented** — parameters, return types, behavior
- **Complex algorithms have explanation comments** — why, not what
- **TODOs include context** — `TODO(username): reason and context`
- **Examples for non-obvious usage** — in docstrings or tests

### Repository Documentation
- **README explains purpose and quickstart** — 5-minute setup
- **ARCHITECTURE.md for high-level design** — diagrams and key decisions
- **API documentation is generated** — from code annotations
- **CHANGELOG.md tracks user-facing changes** — following semantic versioning
- **CONTRIBUTING.md for contributors** — coding standards, PR process

---

## Review & Merge Standards

### Code Review Checklist
- ✅ **Code is readable and maintainable**
- ✅ **Tests are included and passing**
- ✅ **Security implications considered**
- ✅ **Performance impact assessed**
- ✅ **Documentation updated**
- ✅ **No secrets or sensitive data committed**
- ✅ **Follows project conventions**
- ✅ **Breaking changes are documented**

### Merge Requirements
- **All tests pass** — CI must be green
- **At least one human approval** — for non-trivial changes
- **No unresolved review comments**
- **Commit history is clean** — squash or rebase before merge
- **Branch is up to date with target** — merge or rebase latest changes

---

## Continuous Improvement

### Retrospectives
- **Regular reviews of engineering practices**
- **Identify bottlenecks and pain points**
- **Update standards based on learnings**
- **Share knowledge across team**

### Metrics to Track
- **Build and test duration** — optimize for fast feedback
- **Code review turnaround time** — aim for same-day reviews
- **Deployment frequency** — higher frequency indicates maturity
- **Mean time to recovery (MTTR)** — how quickly issues are resolved
- **Test coverage trends** — improving or declining?

---

**These standards evolve with the project. Propose changes via documented RFCs (Request for Comments).**
