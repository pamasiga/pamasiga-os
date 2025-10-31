# AI Agent Rules

**Template Version:** 0.0.1
**Status:** Foundation Commit
**Last Updated:** 2025-01-31T00:00:00Z
**Note:** This is a template. Replace project-specific details later.

---

## Purpose

This document establishes rules and expectations for AI coding agents (Claude, Cursor, GitHub Copilot, etc.) operating within this repository. These rules ensure AI assistance enhances quality, security, and maintainability while preserving human authority over critical decisions.

---

## Core Responsibilities

### AI Agents Must

#### 1. Ask Before Major Changes
**Major changes include:**
- Architectural modifications (adding layers, changing patterns)
- New external dependencies or libraries
- Database schema changes
- API contract modifications (breaking changes)
- Security or authentication logic
- Infrastructure or deployment configuration

**Before proceeding, AI must:**
- Explain the proposed change and reasoning
- Present alternatives considered
- Highlight trade-offs and risks
- Wait for explicit human approval

#### 2. Provide Reasoning for Structural Decisions
- **Why this approach?** — explain the choice
- **What alternatives exist?** — briefly mention other options
- **What are the trade-offs?** — performance, complexity, maintainability
- **What are the risks?** — security, breaking changes, technical debt

**Example reasoning format:**
```
Change: Introduce Redis caching layer for user sessions

Reasoning:
- Current in-memory sessions don't scale across multiple instances
- Redis provides persistence and shared state
- Enables horizontal scaling of application servers

Alternatives:
- Database-backed sessions (slower, higher DB load)
- Sticky sessions (limits load balancing flexibility)

Trade-offs:
- Adds external dependency (Redis)
- Requires Redis availability monitoring
- Increases infrastructure complexity

Risks:
- Redis failure impacts all sessions (mitigation: fallback to DB)
- Cache invalidation complexity

Decision needed: Approve Redis integration?
```

#### 3. Show Diff Before Commit
- **Always present changes** for human review before committing
- **Summarize what changed** — files affected, scope of changes
- **Highlight critical changes** — security, API, schema
- **Confirm before executing commit**

#### 4. Mark AI-Generated Changes
All AI-generated or AI-suggested code must be tagged appropriately using commit labels and optional inline comments.

**Commit message labeling** (see next section)

**Inline marking (when appropriate):**
```javascript
// AI-GENERATED: Complex regex pattern for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

**When to use inline comments:**
- Complex algorithms or non-obvious logic
- Security-sensitive code
- Generated boilerplate that may need human review later

#### 5. Create or Modify Tests When Touching Logic
- **New features require new tests** — unit, integration, or E2E
- **Bug fixes include regression tests** — prove the fix works
- **Refactors maintain test coverage** — tests should still pass
- **Test changes are explained** — why tests were added or modified

**Test checklist:**
- ✅ Unit tests for new functions/methods
- ✅ Integration tests for API endpoints
- ✅ Edge cases covered (empty input, null, large data)
- ✅ Error cases tested (invalid input, failures)

#### 6. Prioritize Security, Clarity, Reversibility

**Security:**
- Never commit secrets, API keys, or credentials
- Validate all inputs at boundaries
- Use parameterized queries (no SQL injection)
- Sanitize outputs (no XSS)
- Follow principle of least privilege
- Flag security-sensitive changes for human review

**Clarity:**
- Code should be readable by junior developers
- Avoid overly clever or obfuscated solutions
- Use meaningful names and standard patterns
- Add comments for complex logic

**Reversibility:**
- Changes should be easy to roll back
- Database migrations include rollback scripts
- Feature flags for risky features
- Incremental changes over big rewrites

---

## AI Commit Labels

All commits involving AI assistance must include appropriate labels in the commit message footer.

### Label Definitions

#### `AI-SUGGESTED`
AI proposed the change, but a human wrote or heavily modified the code.

**Example:**
```
feat(auth): add password strength validation

Adds minimum password requirements: 8 chars, 1 uppercase, 1 number.

AI-SUGGESTED
```

#### `AI-GENERATED`
AI wrote the code with minimal or no human modification.

**Example:**
```
test(user-service): add unit tests for user creation

Covers happy path, validation errors, and duplicate email cases.

AI-GENERATED
```

#### `AI-FIX`
AI identified and fixed a bug or issue.

**Example:**
```
fix(api): resolve race condition in order processing

Added transaction lock to prevent duplicate order creation.

AI-FIX
```

#### `HUMAN-REVIEWED`
AI-generated code that has been explicitly reviewed and approved by a human.

**Example:**
```
feat(payment): integrate Stripe payment gateway

AI-generated integration with manual review of security handling.

AI-GENERATED
HUMAN-REVIEWED
```

### When to Use Multiple Labels

Combine labels when appropriate:
```
refactor(db): optimize user query performance

Introduced indexed query and reduced N+1 queries.

AI-SUGGESTED
HUMAN-REVIEWED
```

---

## Guardrails & Restrictions

### AI Agents Cannot (Without Explicit Human Approval)

- ❌ **Deploy to production**
- ❌ **Modify CI/CD pipelines**
- ❌ **Change authentication or authorization logic**
- ❌ **Delete production data or databases**
- ❌ **Modify security configurations (CORS, CSP, etc.)**
- ❌ **Add external dependencies without explanation**
- ❌ **Bypass tests or linting**
- ❌ **Force-push to protected branches**
- ❌ **Modify .gitignore to expose secrets**

### AI Agents Should

- ✅ **Run tests before committing**
- ✅ **Run linters and formatters**
- ✅ **Check for known vulnerabilities (e.g., npm audit)**
- ✅ **Suggest improvements to existing code**
- ✅ **Generate documentation and examples**
- ✅ **Identify code smells and technical debt**
- ✅ **Propose refactoring opportunities**

---

## Self-Reflection Checklist Before Commit

Before committing, AI agents should verify:

- [ ] **Tests pass** — all existing and new tests
- [ ] **Linting passes** — no new warnings or errors
- [ ] **Security scan clean** — no new vulnerabilities
- [ ] **Documentation updated** — README, API docs, comments
- [ ] **Commit message is clear** — follows conventional commit format
- [ ] **Appropriate AI labels applied** — AI-GENERATED, AI-SUGGESTED, etc.
- [ ] **Reasoning provided** — if structural change
- [ ] **Human approval obtained** — if major change
- [ ] **Secrets not committed** — double-check .env files excluded
- [ ] **Reversibility considered** — can this be easily rolled back?

---

## Collaboration Model

### Human Role
- **Final decision authority** — especially on architecture and security
- **Code review and approval** — for AI-generated changes
- **Strategic direction** — what to build and why
- **Risk assessment** — evaluating trade-offs

### AI Agent Role
- **Code generation and boilerplate** — speed up development
- **Pattern application** — consistent code style and structure
- **Testing and validation** — comprehensive test coverage
- **Documentation** — keep docs in sync with code
- **Refactoring suggestions** — identify improvement opportunities
- **Security checks** — flag potential vulnerabilities

---

## Continuous Improvement

### AI Agent Feedback Loop
- **Track AI suggestions** — which were accepted, which rejected
- **Identify patterns** — recurring issues or improvements
- **Update rules** — based on team learnings
- **Share insights** — improve AI prompts and templates

### Escalation Path
If AI is uncertain or detects high-risk changes:
1. **Flag for human review** — explain the concern
2. **Provide context** — what's risky and why
3. **Suggest alternatives** — if available
4. **Wait for decision** — do not proceed without approval

---

## Examples

### Good AI Behavior

**Example 1: Adding a new feature**
```
AI: I'm about to add a new user registration endpoint.

Changes:
- POST /api/v1/users endpoint
- User validation logic
- Password hashing with bcrypt
- Email uniqueness check
- Unit and integration tests

Security considerations:
- Passwords hashed before storage
- Email validation prevents injection
- Rate limiting recommended (should I add?)

Tests included:
- Valid registration
- Duplicate email rejection
- Invalid email format
- Weak password rejection

Proceed with commit?
```

**Example 2: Proposing architectural change**
```
AI: Current approach stores uploaded files in database as blobs.
This doesn't scale well and increases DB size significantly.

Proposal: Migrate to S3-compatible object storage

Reasoning:
- Better scalability (no DB size limit)
- Faster retrieval (CDN integration)
- Cost-effective for large files

Trade-offs:
- New external dependency (S3 or MinIO)
- Migration effort for existing files
- Requires credentials management

Alternative: Keep small files in DB, offload large files to S3

This is a major architectural change. Should I proceed with planning?
```

### Poor AI Behavior

**Example 1: Making unauthorized changes**
```
❌ AI silently modifies authentication logic without explanation
❌ AI commits directly to main branch bypassing review
❌ AI adds external dependency without discussing trade-offs
```

**Example 2: Insufficient context**
```
❌ Commit message: "fix bug"
❌ No explanation of what was broken or how it was fixed
❌ No tests added to prevent regression
```

---

**This document evolves with the project. AI agents should reference this before making significant changes.**
