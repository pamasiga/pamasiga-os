# PAMASIGA OS - Adoption Guide

**Welcome!** This guide will help you adopt PAMASIGA OS as the foundation for your startup's engineering infrastructure.

---

## 📋 Table of Contents

1. [What You're Getting](#what-youre-getting)
2. [Prerequisites](#prerequisites)
3. [Quick Start (5 minutes)](#quick-start-5-minutes)
4. [Detailed Customization](#detailed-customization)
5. [GitHub Setup](#github-setup)
6. [Documentation Site Setup](#documentation-site-setup)
7. [CI/CD Configuration](#cicd-configuration)
8. [Project Structure](#project-structure)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## 🎁 What You're Getting

PAMASIGA OS is a **production-ready template** that provides:

### Infrastructure
- ✅ **Monorepo structure** - apps/, services/, packages/ organization
- ✅ **CI/CD pipelines** - GitHub Actions for test, build, security, deploy
- ✅ **Documentation site** - Nextra-powered GitHub Pages
- ✅ **Development tools** - Justfile, EditorConfig, VSCode settings

### GitHub Ecosystem
- ✅ **Issue templates** - Bug reports, feature requests, audits
- ✅ **PR templates** - With comprehensive checklists
- ✅ **Label system** - Type, priority, area, AI labels
- ✅ **Discussions** - Community engagement
- ✅ **Projects** - Kanban boards for workflow management

### Engineering Standards
- ✅ **AI-augmented workflows** - Rules for AI coding assistants
- ✅ **Code review process** - Standards and checklists
- ✅ **Security practices** - Scanning, secrets management
- ✅ **Quality gates** - Linting, testing, coverage

### Documentation
- ✅ **Engineering standards** - Architecture, patterns, conventions
- ✅ **Development workflow** - Branching, commits, releases
- ✅ **Repository policies** - Contribution guidelines
- ✅ **AI agent rules** - Governance for AI assistants

---

## 🔧 Prerequisites

Before you begin, ensure you have:

### Required
- **GitHub account** (personal or organization)
- **Git** installed locally
- **Node.js** 18+ and **pnpm** 8+ (or npm/yarn)
- **GitHub CLI** (`gh`) - [Install here](https://cli.github.com/)

### Optional (but recommended)
- **Docker** - For containerization
- **Just** command runner - [Install here](https://github.com/casey/just)
- **VS Code** or **Cursor** - With included settings

### Check your setup

```bash
# Check versions
git --version
node --version
pnpm --version
gh --version

# Authenticate with GitHub
gh auth login
```

---

## 🚀 Quick Start (5 minutes)

### Step 1: Fork the Repository

Click the **"Use this template"** button on GitHub, or:

```bash
# Clone the template
git clone https://github.com/YOUR_ORG/pamasiga-os.git my-startup
cd my-startup

# Or use degit for a clean copy
npx degit YOUR_ORG/pamasiga-os my-startup
cd my-startup
```

### Step 2: Run the Setup Wizard

```bash
# Install dependencies
npm install
# or
pnpm install

# Run the interactive setup wizard
npm run setup
```

The wizard will ask you:
- Project name
- GitHub repository details
- Brand colors
- Contact information
- Team members
- Tech stack

### Step 3: Create Your GitHub Repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "init: Customize PAMASIGA OS for [Your Startup]"

# Create GitHub repository
gh repo create my-startup --public --source=. --remote=origin --push

# Or push to existing repository
git remote add origin https://github.com/YOUR_ORG/my-startup.git
git push -u origin main
```

### Step 4: Set Up GitHub Features

```bash
# Create labels from your config
npm run create-labels

# Enable Discussions
gh api repos/YOUR_ORG/my-startup --method PATCH -f has_discussions=true

# Enable GitHub Pages
# (Do this in GitHub repository settings → Pages → Source: gh-pages branch)
```

### Step 5: Deploy Documentation

```bash
# Install docs dependencies
cd website
pnpm install

# Build and preview locally
pnpm dev
# Visit http://localhost:3000

# Deploy to GitHub Pages
cd ..
git add .
git commit -m "docs: initial documentation site"
git push

# GitHub Actions will automatically deploy to gh-pages
```

🎉 **Done!** Your customized PAMASIGA OS instance is ready.

---

## 🎨 Detailed Customization

### Configuration File: `startup.config.js`

This is the **single source of truth** for all settings. Everything reads from here.

#### Key Sections

##### 1. Project Identity

```javascript
project: {
  name: 'Your Startup',
  tagline: 'Building the future',
  description: 'Longer description...',
  type: 'saas', // template, library, platform, etc.
  version: '0.1.0',
  license: 'MIT'
}
```

##### 2. Branding

```javascript
branding: {
  colors: {
    primary: '#0066FF',   // Your brand color
    accent: '#00D9FF',    // Accent color
    success: '#00C851',   // Green for success states
    warning: '#FFBB33',   // Yellow for warnings
    danger: '#FF4444'     // Red for errors
  },
  logo: {
    light: '/logo-light.svg',  // Logo for light mode
    dark: '/logo-dark.svg',    // Logo for dark mode
    favicon: '/favicon.ico'
  }
}
```

**Add your logos:**
1. Place logo files in `website/public/`
2. Update paths in config
3. Recommended: SVG format, transparent background

##### 3. Links & Social

```javascript
links: {
  github: {
    org: 'your-org',
    repo: 'your-repo',
    url: 'https://github.com/your-org/your-repo'
  },
  docs: {
    url: 'https://your-org.github.io/your-repo'
  },
  social: {
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/company/yourcompany',
    discord: 'https://discord.gg/yourinvite'
  },
  contact: {
    email: 'hello@yourcompany.com'
  }
}
```

##### 4. Team

```javascript
team: {
  maintainers: [
    {
      name: 'Your Name',
      role: 'Founder & CTO',
      github: 'yourusername',
      twitter: 'yourhandle',
      avatar: 'https://github.com/yourusername.png'
    },
    // Add more team members
  ]
}
```

##### 5. GitHub Configuration

```javascript
github: {
  labels: {
    types: [
      { name: 'bug', color: 'd73a4a', description: '...' },
      // Add custom labels for your workflow
    ],
    // Customize priorities, areas, etc.
  },
  discussions: {
    enabled: true,
    categories: [
      // Customize discussion categories
    ]
  }
}
```

##### 6. CI/CD Settings

```javascript
cicd: {
  nodeVersions: ['18', '20', '22'],  // Test matrix
  coverage: {
    enabled: true,
    threshold: 80  // Minimum coverage %
  },
  security: {
    dependencyCheck: true,
    secretScanning: true,
    sastScanning: true
  }
}
```

### Manual Updates

After editing `startup.config.js`, apply changes:

```bash
# Re-create GitHub labels
npm run create-labels

# Rebuild documentation
cd website
pnpm build

# Update package.json
npm run apply-config  # (if script exists)
```

---

## 🐙 GitHub Setup

### Enable GitHub Features

#### 1. GitHub Discussions

```bash
# Via CLI
gh api repos/OWNER/REPO --method PATCH -f has_discussions=true

# Or in GitHub Settings:
# Settings → General → Features → Check "Discussions"
```

Create discussion categories:
- 📢 Announcements (maintainers only)
- 💬 General
- 💡 Ideas
- 🙋 Q&A
- 🏗️ Architecture
- 🔒 Security
- 🎉 Show and Tell

#### 2. GitHub Projects

```bash
# Create a new project board
gh project create --owner OWNER --title "Development Board"

# Or manually:
# Projects → New project → Board template
```

Set up columns:
- 📥 Backlog
- 🔍 Needs Triage
- 📋 Ready
- 🏗️ In Progress
- 👀 In Review
- ✅ Done

Enable automation:
- Auto-add new issues to Backlog
- Move to "In Progress" when assigned
- Move to "Done" when closed

#### 3. Branch Protection

Protect your `main` branch:

```bash
# Via CLI (requires admin permissions)
gh api repos/OWNER/REPO/branches/main/protection \
  --method PUT \
  --field required_pull_request_reviews[required_approving_review_count]=1 \
  --field required_status_checks[strict]=true \
  --field enforce_admins=true

# Or in GitHub Settings:
# Settings → Branches → Add rule for "main"
```

Recommended rules:
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Include administrators
- ✅ Restrict who can push (maintainers only)

#### 4. GitHub Pages

Enable in repository settings:

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **/** (root)
4. Click **Save**

Custom domain (optional):
1. Add CNAME file to `website/public/`
2. Configure DNS with your provider
3. Add custom domain in Pages settings

---

## 📚 Documentation Site Setup

### Technology: Nextra

PAMASIGA OS uses **Nextra** - a modern Next.js-based documentation framework.

### Directory Structure

```
website/
├── pages/              # Documentation pages (MDX)
│   ├── index.mdx      # Homepage
│   ├── getting-started/
│   ├── guides/
│   ├── api/
│   └── _meta.json     # Sidebar configuration
├── components/         # React components
├── public/            # Static assets (logos, images)
├── theme.config.jsx   # Theme customization
├── next.config.mjs    # Next.js config
└── package.json
```

### Customize Theme

Edit `website/theme.config.jsx`:

```jsx
import { useConfig } from 'nextra-theme-docs'
import config from '../startup.config.js'

export default {
  logo: <span>{config.project.name}</span>,
  project: {
    link: config.links.github.url
  },
  docsRepositoryBase: `${config.links.github.url}/tree/main/website`,
  primaryHue: 210, // Adjust for your brand color
  footer: {
    text: config.docs.theme.footer.text
  },
  // Add more customizations
}
```

### Add Custom CSS

Create `website/styles/globals.css`:

```css
:root {
  --primary: #0066FF;
  --accent: #00D9FF;
}

/* Custom styles */
```

### Write Documentation

Create MDX files in `website/pages/`:

```mdx
---
title: Getting Started
---

# Getting Started

Welcome to {config.project.name}!

## Installation

\`\`\`bash
npm install your-package
\`\`\`

## Usage

...
```

### Local Development

```bash
cd website
pnpm dev
# Visit http://localhost:3000
```

### Deploy

Deployment is **automatic** via GitHub Actions when you push to `main`:

```bash
git add website/
git commit -m "docs: update documentation"
git push
```

View your site at: `https://YOUR_ORG.github.io/YOUR_REPO`

---

## ⚙️ CI/CD Configuration

### Workflow Files

All workflows are in `.github/workflows/`:

```
.github/workflows/
├── code-quality.yml    # Linting, formatting
├── tests.yml           # Unit, integration, e2e tests
├── security.yml        # Dependency scan, SAST
├── build.yml           # Build frontend/backend
├── deploy.yml          # Deploy to staging/production
└── docs.yml            # Deploy documentation to GitHub Pages
```

### Customize Workflows

#### 1. Test Matrix

Edit `.github/workflows/tests.yml`:

```yaml
strategy:
  matrix:
    node: [18, 20, 22]  # Test on multiple Node versions
    os: [ubuntu-latest, macos-latest, windows-latest]  # Multi-OS
```

#### 2. Add Secrets

For deployments, add secrets:

```bash
# Via CLI
gh secret set AWS_ACCESS_KEY_ID --body "your-key"
gh secret set AWS_SECRET_ACCESS_KEY --body "your-secret"

# Or in GitHub Settings → Secrets and variables → Actions
```

Use in workflows:

```yaml
- name: Deploy
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
```

#### 3. Environments

Create environments for staging/production:

1. Settings → Environments → New environment
2. Add protection rules (approvals, wait timer)
3. Add environment secrets

Reference in workflows:

```yaml
jobs:
  deploy:
    environment: production
    steps:
      - name: Deploy to production
```

#### 4. Custom Workflows

Add your own workflows for:
- Database migrations
- End-to-end tests
- Performance benchmarks
- Lighthouse audits
- Dependency updates (Dependabot/Renovate)

### Workflow Status Badges

Add to your README.md:

```markdown
![Tests](https://github.com/OWNER/REPO/workflows/Tests/badge.svg)
![Build](https://github.com/OWNER/REPO/workflows/Build/badge.svg)
![Security](https://github.com/OWNER/REPO/workflows/Security/badge.svg)
```

---

## 📂 Project Structure

### Monorepo Organization

```
my-startup/
├── apps/              # User-facing applications
│   ├── web/          # Next.js web app
│   ├── mobile/       # React Native app
│   └── cli/          # Command-line tool
├── services/          # Backend microservices
│   ├── api/          # REST/GraphQL API
│   ├── auth/         # Authentication service
│   └── worker/       # Background jobs
├── packages/          # Shared libraries
│   ├── ui/           # Component library
│   ├── utils/        # Utility functions
│   ├── config/       # Shared configuration
│   └── types/        # TypeScript types
├── infra/            # Infrastructure as Code
│   ├── terraform/    # Terraform configs
│   ├── kubernetes/   # K8s manifests
│   └── docker/       # Dockerfiles
├── scripts/          # Automation scripts
│   ├── setup-wizard.js
│   ├── create-github-labels.js
│   └── deploy.sh
├── tests/            # Integration & E2E tests
├── docs/             # Documentation (markdown)
├── website/          # Documentation site (Nextra)
├── .github/          # GitHub templates & workflows
├── startup.config.js # SINGLE SOURCE OF TRUTH
└── package.json      # Root package.json
```

### Where to Put Your Code

| What                  | Where                      | Example                          |
| --------------------- | -------------------------- | -------------------------------- |
| Frontend app          | `apps/web/`                | Next.js, React, Vue app          |
| Mobile app            | `apps/mobile/`             | React Native, Flutter            |
| API server            | `services/api/`            | Express, FastAPI, NestJS         |
| Background jobs       | `services/worker/`         | Bull, Celery workers             |
| UI components         | `packages/ui/`             | Shared React components          |
| Shared utilities      | `packages/utils/`          | Date formatters, validators      |
| Docker configs        | `infra/docker/`            | Dockerfiles, docker-compose.yml  |
| Kubernetes manifests  | `infra/kubernetes/`        | Deployments, services, ingresses |
| Deployment scripts    | `scripts/`                 | Bash/Node.js automation          |
| Integration tests     | `tests/`                   | Cross-service test suites        |

---

## 🌟 Best Practices

### Development Workflow

1. **Create an issue first** - Discuss before coding
2. **Create feature branch** - `feature/issue-123-add-login`
3. **Make small commits** - Clear, atomic commits
4. **Write tests** - Unit + integration
5. **Open PR** - Use the PR template
6. **Request review** - At least 1 approval
7. **Merge** - Squash and merge
8. **Deploy** - Automated via CI/CD

### Commit Messages

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Add tests
- `chore`: Maintenance
- `security`: Security fix
- `perf`: Performance improvement

Examples:

```
feat(auth): add OAuth2 login flow

Implements OAuth2 authentication with Google and GitHub providers.
Includes user session management and token refresh.

Closes #42

---

fix(api): handle null values in user response

Fixes a bug where null email addresses caused 500 errors.

Fixes #103
```

### AI Development

When using AI assistants (Claude, Copilot, etc.):

1. **Label AI contributions** - Use AI-GENERATED, AI-SUGGESTED labels
2. **Always review AI code** - Add HUMAN-REVIEWED label after review
3. **Write tests for AI code** - Verify functionality
4. **Document AI decisions** - Explain why AI suggestion was accepted
5. **Ask before major changes** - Don't let AI make architecture decisions alone

See `docs/AI_AGENT_RULES.md` for complete guidelines.

### Security

1. **Never commit secrets** - Use environment variables
2. **Use `.env.example`** - Template for required variables
3. **Enable secret scanning** - GitHub Advanced Security
4. **Run security audits** - `npm audit` weekly
5. **Update dependencies** - Enable Dependabot
6. **Review dependencies** - Check licenses and security

### Testing

Test coverage targets:

| Layer                | Target Coverage |
| -------------------- | --------------- |
| Unit tests           | > 80%           |
| Integration tests    | > 70%           |
| E2E tests            | Critical paths  |

Run tests:

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests with coverage
npm run test:coverage
```

---

## 🐛 Troubleshooting

### GitHub CLI Issues

**Problem:** `gh: command not found`

**Solution:**
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
```

**Problem:** `gh auth status` shows not authenticated

**Solution:**
```bash
gh auth login
# Follow prompts to authenticate
```

### Documentation Site Issues

**Problem:** `next: command not found`

**Solution:**
```bash
cd website
pnpm install
# Ensure dependencies are installed
```

**Problem:** GitHub Pages showing 404

**Solution:**
1. Check that `gh-pages` branch exists
2. Verify Pages source is set to `gh-pages` branch
3. Check `basePath` in `next.config.mjs` matches repo name
4. Wait 1-2 minutes for deployment to complete

**Problem:** Styles not loading on GitHub Pages

**Solution:**
- Ensure `basePath` is correctly set in `next.config.mjs`
- Check that `output: 'export'` is set for static export
- Verify images have `unoptimized: true`

### CI/CD Issues

**Problem:** Workflows not running

**Solution:**
1. Check `.github/workflows/` files exist
2. Verify YAML syntax (use YAML linter)
3. Check workflow triggers (`on: push`, `on: pull_request`)
4. Ensure Actions are enabled in repository settings

**Problem:** Tests failing in CI but passing locally

**Solution:**
- Check Node.js versions match
- Verify environment variables are set in GitHub Secrets
- Check file paths (case sensitivity on Linux/macOS)
- Review CI logs for specific errors

### Setup Wizard Issues

**Problem:** Setup wizard crashes

**Solution:**
```bash
# Make sure Node.js 18+ is installed
node --version

# Install dependencies first
npm install

# Run with debugging
node scripts/setup-wizard.js
```

---

## 🚀 Next Steps

### After Setup

1. **Read the documentation**
   - `docs/ENGINEERING_STANDARDS.md`
   - `docs/DEVELOPMENT_WORKFLOW.md`
   - `docs/AI_AGENT_RULES.md`
   - `docs/REPO_POLICY.md`

2. **Customize your stack**
   - Add frontend framework (React, Vue, Angular)
   - Add backend framework (Express, FastAPI, Django)
   - Choose databases (PostgreSQL, MongoDB, Redis)

3. **Set up development environment**
   - Install Docker Desktop
   - Set up local database
   - Configure environment variables

4. **Create your first feature**
   - Create an issue
   - Make a branch
   - Write code + tests
   - Open a PR
   - Get it reviewed and merged

5. **Invite your team**
   - Add collaborators in GitHub settings
   - Share the documentation
   - Set up team discussions
   - Assign roles (maintainer, contributor, moderator)

### Get Help

- 📖 **Documentation**: Your docs site at `https://YOUR_ORG.github.io/YOUR_REPO`
- 💬 **Discussions**: GitHub Discussions in your repository
- 🐛 **Issues**: Report bugs or request features
- 📧 **Email**: Contact maintainers via email in config

---

## 📄 License

PAMASIGA OS template is released under the **MIT License**.

When you adopt this template:
- ✅ You can use it for commercial projects
- ✅ You can modify it however you like
- ✅ You can distribute your modifications
- ✅ You don't need to open-source your project
- ❌ No warranty or liability
- ✅ Attribution appreciated but not required

---

## 🙏 Contributing Back

If you make improvements to the PAMASIGA OS template itself:

1. Fork the **original** PAMASIGA OS repository
2. Make your improvements
3. Submit a PR to help others
4. Share your experience in Discussions

Ideas for contributions:
- New language/framework templates
- Improved CI/CD workflows
- Additional documentation
- Better automation scripts
- Integration guides (AWS, GCP, Azure, etc.)

---

**Welcome to PAMASIGA OS!** 🎉

You now have a world-class engineering foundation for your startup.
Focus on building your product - we've got the infrastructure covered.

Happy building! 🚀

---

**Document Version:** 1.0
**Last Updated:** 2025-11-03
**Maintained by:** PAMASIGA OS Team
