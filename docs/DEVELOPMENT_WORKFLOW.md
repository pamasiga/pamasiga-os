# Development Workflow

**Template Version:** 0.0.1
**Status:** Foundation Commit
**Last Updated:** 2025-01-31T00:00:00Z
**Note:** This is a template. Replace project-specific details later.

---

## Branching Model

### Branch Types

#### `main`
- **Purpose:** Production-ready code
- **Protection:** Branch protection enabled
- **Merge requirements:**
  - All CI checks pass
  - At least one human approval
  - Up-to-date with base branch
  - No unresolved review comments
- **Direct commits:** Prohibited
- **Deployment:** Automatically deploys to production (or staging in early phases)

#### `develop`
- **Purpose:** Integration branch for ongoing development
- **Protection:** Branch protection enabled
- **Merge requirements:**
  - All tests pass
  - Code review completed
- **Direct commits:** Discouraged (use feature branches)
- **Deployment:** Automatically deploys to development environment

#### `feature/*`
- **Purpose:** New features or enhancements
- **Naming:** `feature/short-description` or `feature/TICKET-123-description`
- **Created from:** `develop`
- **Merges into:** `develop`
- **Lifecycle:** Deleted after merge
- **Examples:**
  - `feature/user-authentication`
  - `feature/PROJ-456-payment-gateway`

#### `fix/*`
- **Purpose:** Bug fixes
- **Naming:** `fix/short-description` or `fix/BUG-789-description`
- **Created from:** `develop` (or `main` for hotfixes)
- **Merges into:** `develop` (or `main` for hotfixes)
- **Lifecycle:** Deleted after merge
- **Examples:**
  - `fix/login-validation-error`
  - `fix/BUG-123-memory-leak`

#### `hotfix/*`
- **Purpose:** Critical production fixes
- **Naming:** `hotfix/short-description`
- **Created from:** `main`
- **Merges into:** `main` AND `develop`
- **Lifecycle:** Deleted after merge
- **Priority:** High — expedited review and deploy
- **Examples:**
  - `hotfix/security-vulnerability-patch`
  - `hotfix/critical-payment-failure`

#### `release/*`
- **Purpose:** Prepare for production release
- **Naming:** `release/v1.2.0`
- **Created from:** `develop`
- **Merges into:** `main` AND `develop`
- **Lifecycle:** Deleted after merge
- **Activities:** Version bumps, final testing, changelog updates

---

## Pull Request (PR) Process

### Creating a Pull Request

#### 1. Prepare Your Branch
```bash
# Ensure you're on your feature branch
git checkout feature/your-feature

# Update with latest develop
git fetch origin
git rebase origin/develop

# Run tests locally
npm test  # or equivalent

# Run linter
npm run lint  # or equivalent
```

#### 2. Write a Clear PR Description

**Template:**
```markdown
## Summary
Brief description of what this PR does (1-2 sentences).

## Changes
- Added X feature
- Modified Y component
- Fixed Z bug

## Motivation
Why is this change needed? What problem does it solve?

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Security fix
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed
- [ ] All tests passing

## Screenshots / Examples (if applicable)
[Add screenshots, API examples, or usage examples]

## Security Considerations
[Any security implications? Input validation, authentication, data exposure?]

## Breaking Changes
- [ ] Yes (explain below)
- [ ] No

[If yes, describe migration path]

## Deployment Notes
[Any special deployment steps? Database migrations? Config changes?]

## AI Involvement
- [ ] AI-GENERATED
- [ ] AI-SUGGESTED
- [ ] AI-FIX
- [ ] HUMAN-REVIEWED

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No secrets committed
- [ ] Commit messages are clear
```

#### 3. Submit PR
- Assign reviewers
- Add relevant labels (bug, enhancement, security, etc.)
- Link related issues or tickets
- Request review

---

## Code Review Process

### Reviewer Responsibilities

#### What to Review

**Correctness:**
- Does the code do what it claims?
- Are edge cases handled?
- Are there potential bugs?

**Design:**
- Is the approach appropriate?
- Does it fit the existing architecture?
- Is it over-engineered or too simplistic?

**Readability:**
- Is the code easy to understand?
- Are names meaningful?
- Is it well-organized?

**Tests:**
- Are tests comprehensive?
- Do they cover edge cases and errors?
- Are tests maintainable?

**Security:**
- Are inputs validated?
- Are secrets handled properly?
- Are there potential vulnerabilities?

**Performance:**
- Are there obvious performance issues?
- Is the approach scalable?
- Are resources managed properly (connections, memory)?

**Documentation:**
- Are complex parts explained?
- Is the README or API docs updated?
- Are comments helpful (not redundant)?

#### Review Guidelines

**Be constructive:**
- Explain why something should change
- Suggest alternatives
- Ask questions rather than demand changes

**Be specific:**
- Reference line numbers
- Provide examples
- Link to documentation or standards

**Be timely:**
- Respond within 24 hours (or set team expectations)
- Don't block unnecessarily
- Approve when ready, even if minor suggestions remain

**Review checklist:**
- [ ] Code is readable and maintainable
- [ ] Tests are adequate
- [ ] Security is considered
- [ ] No obvious performance issues
- [ ] Documentation is updated
- [ ] Follows project conventions
- [ ] No secrets committed

---

### AI Submitting PRs

When AI submits a PR, it must include:

#### AI Reasoning Summary
```markdown
## AI Reasoning

**Approach:**
I implemented this feature using [pattern/library] because [reasoning].

**Alternatives Considered:**
- Option A: [brief description] — rejected because [reason]
- Option B: [brief description] — rejected because [reason]

**Trade-offs:**
- Pro: [benefit]
- Con: [limitation]

**Security Considerations:**
- Input validation: [approach]
- Authentication: [approach]
- Data handling: [approach]

**Test Strategy:**
- Unit tests cover [scenarios]
- Integration tests verify [behavior]
- Edge cases tested: [list]

**Human Review Requested For:**
- [ ] Architectural approach
- [ ] Security implementation
- [ ] Performance implications
- [ ] API design
```

#### Required AI Labels
- Mark commits with appropriate labels (AI-GENERATED, AI-SUGGESTED, etc.)
- Flag sections needing human attention
- Explain complex or non-obvious code

---

## Workflow Stages

### 1. Plan
- **Define requirements** — what needs to be built?
- **Design approach** — how will it work?
- **Identify risks** — what could go wrong?
- **Break into tasks** — manageable steps
- **AI may assist** — suggesting approaches, identifying edge cases

### 2. Draft (AI)
- **AI generates code** — following standards and patterns
- **AI writes tests** — covering expected behavior
- **AI documents** — inline comments, README updates
- **AI self-reviews** — using checklist from AI_AGENT_RULES.md

### 3. Review (Human)
- **Human reviews AI output** — using review checklist
- **Request changes if needed** — with clear reasoning
- **Approve when ready** — explicit approval required
- **AI iterates** — addressing feedback

### 4. Test
- **Automated tests run** — CI pipeline executes
- **Manual testing if needed** — for UI or complex flows
- **Performance testing** — if performance-critical
- **Security scanning** — automated vulnerability checks

### 5. Merge
- **Squash or rebase** — clean commit history
- **Merge to target branch** — develop or main
- **Delete feature branch** — keep repo clean
- **Deploy automatically** — or trigger manual deploy

---

## Commit Standards

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Example:**
```
feat(auth): add OAuth2 login support

Implements OAuth2 authentication flow with Google and GitHub
providers. Includes token refresh and user profile sync.

Refs: #456
AI-GENERATED
HUMAN-REVIEWED
```

### Types
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `refactor` — code change without behavior change
- `test` — adding or updating tests
- `chore` — maintenance (deps, build, etc.)
- `security` — security-related changes
- `perf` — performance improvements

### Commit Best Practices
- **Atomic commits** — one logical change per commit
- **Clear subject line** — max 72 characters
- **Detailed body** — explain why, not just what
- **Reference issues** — use `Refs: #123` or `Fixes: #123`
- **Include AI labels** — when AI was involved

---

## Continuous Integration (CI)

### CI Pipeline Stages

#### 1. Lint & Format
- Run code linter (ESLint, Pylint, etc.)
- Check code formatting (Prettier, Black, etc.)
- Fail if violations found

#### 2. Build
- Compile code (if applicable)
- Check for build errors
- Validate configurations

#### 3. Test
- Run unit tests
- Run integration tests
- Run E2E tests (if applicable)
- Generate coverage report

#### 4. Security Scan
- Dependency vulnerability scan (npm audit, Snyk, etc.)
- Static analysis security testing (SAST)
- Secret detection (prevent committed secrets)

#### 5. Deploy (if applicable)
- Deploy to development environment (from develop)
- Deploy to staging (from release/*)
- Deploy to production (from main)

### CI Requirements for Merge
- ✅ All tests pass
- ✅ Linting passes
- ✅ Build succeeds
- ✅ No high-severity security vulnerabilities
- ✅ Code coverage meets threshold (if enforced)

---

## Release Process

### Versioning
Follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- `MAJOR` — breaking changes
- `MINOR` — new features (backwards compatible)
- `PATCH` — bug fixes (backwards compatible)

### Release Steps

#### 1. Create Release Branch
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0
```

#### 2. Prepare Release
- Update version numbers (package.json, etc.)
- Update CHANGELOG.md
- Run full test suite
- Final QA and manual testing

#### 3. Merge to Main
```bash
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags
```

#### 4. Merge Back to Develop
```bash
git checkout develop
git merge release/v1.2.0
git push origin develop
```

#### 5. Deploy
- Deploy to production
- Monitor for errors
- Update documentation

#### 6. Clean Up
```bash
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

---

## Hotfix Process

For critical production issues:

#### 1. Create Hotfix Branch
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix
```

#### 2. Fix and Test
- Implement minimal fix
- Add regression test
- Test thoroughly

#### 3. Fast-Track Review
- Create PR with HIGH PRIORITY label
- Expedited review process
- Security and critical fixes reviewed ASAP

#### 4. Merge to Main
```bash
git checkout main
git merge hotfix/critical-fix
git tag v1.2.1
git push origin main --tags
```

#### 5. Merge to Develop
```bash
git checkout develop
git merge hotfix/critical-fix
git push origin develop
```

#### 6. Deploy and Monitor
- Deploy immediately
- Monitor metrics and logs
- Communicate to team and stakeholders

---

## Best Practices

### Do:
- ✅ **Keep branches short-lived** — merge frequently
- ✅ **Rebase before merging** — clean history
- ✅ **Write meaningful commits** — future you will thank you
- ✅ **Test locally before pushing** — catch issues early
- ✅ **Communicate with team** — coordinate large changes
- ✅ **Review promptly** — unblock team members
- ✅ **Ask questions** — better to clarify than assume

### Don't:
- ❌ **Commit directly to main or develop** — use feature branches
- ❌ **Merge without review** — even for "small" changes
- ❌ **Push broken code** — tests should pass locally first
- ❌ **Leave PRs open indefinitely** — merge or close
- ❌ **Ignore CI failures** — investigate and fix
- ❌ **Commit secrets** — use environment variables or vaults
- ❌ **Force push to shared branches** — unless coordinated

---

**This workflow balances speed with quality. Adapt as the team grows and learns.**
