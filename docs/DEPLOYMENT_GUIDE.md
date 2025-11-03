# Complete Deployment Guide

**PAMASIGA OS - Production Deployment**

This guide covers deploying your PAMASIGA OS project to production using GitHub Pages, Vercel, and Supabase.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Vercel Deployment](#vercel-deployment)
5. [Supabase Setup](#supabase-setup)
6. [GitHub Integration](#github-integration)
7. [CI/CD Configuration](#cicd-configuration)
8. [Custom Domain Setup](#custom-domain-setup)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools

```bash
# Node.js 18+
node --version  # Should be v18.0.0 or higher

# pnpm
pnpm --version  # Should be 8.0.0 or higher

# GitHub CLI
gh --version

# Vercel CLI
npm install -g vercel

# Supabase CLI (optional, for local development)
brew install supabase/tap/supabase
```

### Required Accounts

- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Supabase account (free tier works)

---

## Environment Setup

### 1. Create `.env.example` Template

```bash
# .env.example (commit this)
# Copy to .env.local and fill in values

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Vercel
NEXT_PUBLIC_SITE_URL=https://yoursite.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# AI Chat (optional)
OPENAI_API_KEY=sk-...
```

### 2. Create `.env.local` for Development

```bash
cp .env.example .env.local
# Fill in actual values
```

**⚠️ Never commit `.env.local` to git!**

---

## GitHub Pages Deployment

### Step 1: Enable GitHub Pages

1. Go to repository **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **/** (root)
4. Click **Save**

### Step 2: Verify Workflow

Check `.github/workflows/deploy-docs.yml` exists:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'website/**'

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          cache-dependency-path: website/pnpm-lock.yaml

      - name: Install dependencies
        working-directory: ./website
        run: pnpm install --frozen-lockfile

      - name: Build documentation
        working-directory: ./website
        run: pnpm build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./website/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Configure `next.config.mjs`

Ensure GitHub Pages configuration is correct:

```js
import nextra from 'nextra'

const isProd = process.env.NODE_ENV === 'production'

// Load startup config
const startupConfig = await import('../startup.config.js').then(m => m.default || m)

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

export default withNextra({
  output: 'export',
  basePath: isProd ? startupConfig.links.docs.basePath : '',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true
})
```

### Step 4: Deploy

```bash
# Push to main branch
git add .
git commit -m "docs: deploy to GitHub Pages"
git push origin main

# Check deployment status
gh workflow view "Deploy Documentation"

# Wait 1-2 minutes, then visit:
# https://YOUR_ORG.github.io/YOUR_REPO
```

---

## Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
vercel login
```

### Step 2: Link Project

```bash
# From project root
vercel link

# Or create new project
vercel --prod
```

### Step 3: Configure `vercel.json`

```json
{
  "buildCommand": "cd website && pnpm build",
  "outputDirectory": "website/out",
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "regions": ["iad1", "sfo1"],

  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://yourdomain.com"
  },

  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Step 4: Add Environment Variables

```bash
# Production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Preview
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
```

### Step 5: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to GitHub (auto-deploys)
git push origin main
```

### Step 6: Verify Deployment

```bash
# Open deployed site
vercel open

# View logs
vercel logs

# Check domains
vercel domains ls
```

---

## Supabase Setup

### Step 1: Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: Your project name
   - **Database Password**: Strong password (save it!)
   - **Region**: Closest to your users
4. Click **"Create new project"**
5. Wait ~2 minutes for provisioning

### Step 2: Get API Credentials

From Supabase dashboard:

1. Go to **Settings → API**
2. Copy:
   - **Project URL**: `https://xxx.supabase.co`
   - **Anon (public) key**: `eyJ...`
   - **Service role key**: `eyJ...` (keep secret!)

### Step 3: Configure Database

Run SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table (example)
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table users enable row level security;

-- Create policies
create policy "Users can read their own data"
  on users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on users for update
  using (auth.uid() = id);
```

### Step 4: Add to Environment Variables

```bash
# GitHub Secrets
gh secret set SUPABASE_URL --body "https://xxx.supabase.co"
gh secret set SUPABASE_ANON_KEY --body "eyJ..."
gh secret set SUPABASE_SERVICE_ROLE_KEY --body "eyJ..."

# Vercel Env
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Local .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ..." >> .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=eyJ..." >> .env.local
```

---

## GitHub Integration

### Step 1: Enable Features

```bash
# Enable Discussions
gh api repos/OWNER/REPO --method PATCH -f has_discussions=true

# Enable Issues (should be default)
gh api repos/OWNER/REPO --method PATCH -f has_issues=true

# Enable Projects
gh api repos/OWNER/REPO --method PATCH -f has_projects=true
```

### Step 2: Create Labels

```bash
pnpm run create-labels
```

### Step 3: Enable Branch Protection

```bash
# Protect main branch
gh api repos/OWNER/REPO/branches/main/protection \\
  --method PUT \\
  --field required_pull_request_reviews[required_approving_review_count]=1 \\
  --field required_status_checks[strict]=true \\
  --field enforce_admins=true
```

### Step 4: Create Project Board

1. Go to **Projects → New project**
2. Choose **Board** template
3. Name it "Development Board"
4. Add columns:
   - 📥 Backlog
   - 📋 Ready
   - 🏗️ In Progress
   - 👀 In Review
   - ✅ Done

### Step 5: Enable Workflows

Check that all workflows in `.github/workflows/` are enabled:

```bash
gh workflow list

# If disabled, enable them:
gh workflow enable deploy-docs.yml
gh workflow enable code-quality.yml
gh workflow enable security.yml
```

---

## CI/CD Configuration

### GitHub Actions Secrets

Add secrets for deployments:

```bash
# Vercel
gh secret set VERCEL_TOKEN --body "xxx"
gh secret set VERCEL_ORG_ID --body "team_xxx"
gh secret set VERCEL_PROJECT_ID --body "prj_xxx"

# Supabase
gh secret set SUPABASE_ACCESS_TOKEN --body "xxx"
gh secret set SUPABASE_DB_PASSWORD --body "xxx"
gh secret set SUPABASE_PROJECT_ID --body "xxx"
```

### Workflow Status Badges

Add to `README.md`:

```markdown
![Deploy Docs](https://github.com/OWNER/REPO/workflows/Deploy%20Documentation/badge.svg)
![Code Quality](https://github.com/OWNER/REPO/workflows/Code%20Quality/badge.svg)
![Security](https://github.com/OWNER/REPO/workflows/Security/badge.svg)
```

---

## Custom Domain Setup

### For GitHub Pages

1. Add `CNAME` file to `website/public/`:
   ```
   docs.yourdomain.com
   ```

2. Configure DNS:
   ```
   CNAME docs yourusername.github.io
   ```

3. Enable HTTPS in GitHub settings

### For Vercel

```bash
# Add domain
vercel domains add yourdomain.com

# Configure DNS (choose one):

# Option 1: Vercel Nameservers (recommended)
# ns1.vercel-dns.com
# ns2.vercel-dns.com

# Option 2: CNAME
# CNAME @ cname.vercel-dns.com

# Option 3: A Record
# A @ 76.76.21.21
```

---

## Monitoring & Analytics

### Vercel Analytics

```bash
# Install
cd website
pnpm add @vercel/analytics @vercel/speed-insights
```

```tsx
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

### Supabase Monitoring

View in Supabase dashboard:
- Database → Performance
- Database → Logs
- Database → Replication

### Error Tracking (Optional)

```bash
# Sentry
pnpm add @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs
```

---

## Troubleshooting

### GitHub Pages 404

**Problem**: Site shows 404

**Solutions**:
1. Check `basePath` in `next.config.mjs` matches repo name
2. Verify `output: 'export'` is set
3. Wait 1-2 minutes for deployment
4. Check GitHub Actions logs

### Vercel Build Fails

**Problem**: Deployment fails

**Solutions**:
```bash
# Test build locally
vercel build

# Check logs
vercel logs

# Verify environment variables
vercel env ls
```

### Supabase Connection Errors

**Problem**: Cannot connect to Supabase

**Solutions**:
1. Check `.env` variables are set
2. Verify project URL is correct
3. Check anon key matches project
4. Test with `supabase-js` client

### CI/CD Workflows Not Running

**Problem**: Workflows don't trigger

**Solutions**:
1. Check Actions are enabled in repo settings
2. Verify YAML syntax
3. Check branch triggers match
4. Review workflow permissions

---

## Checklist

### Pre-Deployment

- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Secrets added to GitHub
- [ ] DNS records configured (if custom domain)
- [ ] Database migrations applied

### Post-Deployment

- [ ] Site is accessible
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Error monitoring enabled
- [ ] Database backups configured
- [ ] Documentation updated

---

## Next Steps

- **Monitor Performance**: Set up alerts in Vercel and Supabase
- **Scale Database**: Upgrade Supabase plan as needed
- **Add CDN**: Configure Cloudflare for additional caching
- **Set Up Backups**: Automate database backups
- **Security Audit**: Run penetration tests

---

**🎉 Congratulations!** Your PAMASIGA OS project is now live!

For support, see:
- [Troubleshooting](/faq#troubleshooting)
- [GitHub Discussions](https://github.com/YOUR_ORG/pamasiga-os/discussions)
- [Documentation](https://YOUR_ORG.github.io/pamasiga-os)
