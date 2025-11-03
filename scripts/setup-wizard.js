#!/usr/bin/env node

/**
 * PAMASIGA OS - Setup Wizard
 *
 * Interactive wizard to customize this template for your startup.
 * Run: npm run setup or pnpm setup
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

// Helper to ask questions
function ask(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${question}${colors.reset}`, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper to display header
function header(text) {
  console.log(`\n${colors.bright}${colors.blue}${'='.repeat(60)}`);
  console.log(`  ${text}`);
  console.log(`${'='.repeat(60)}${colors.reset}\n`);
}

// Helper to display section
function section(text) {
  console.log(`\n${colors.magenta}▶ ${text}${colors.reset}\n`);
}

// Helper to display success
function success(text) {
  console.log(`${colors.green}✓ ${text}${colors.reset}`);
}

// Helper to display warning
function warning(text) {
  console.log(`${colors.yellow}⚠ ${text}${colors.reset}`);
}

// Main wizard
async function runWizard() {
  header('PAMASIGA OS - Template Setup Wizard');

  console.log('Welcome! This wizard will help you customize PAMASIGA OS for your startup.\n');
  console.log('Press CTRL+C at any time to exit.\n');

  const config = {};

  // ========================================================================
  // PROJECT IDENTITY
  // ========================================================================

  section('1. Project Identity');

  config.projectName = await ask('Project/Company Name (e.g., "Acme Corp"): ') || 'My Startup';
  config.projectTagline = await ask('Tagline (short description): ') || 'Building the future';
  config.projectDescription = await ask('Description (longer, 1-2 sentences): ') || config.projectTagline;
  config.projectType = await ask('Project type (template/saas/library/platform) [template]: ') || 'template';
  config.license = await ask('License (MIT/Apache-2.0/GPL-3.0) [MIT]: ') || 'MIT';

  // ========================================================================
  // GITHUB CONFIGURATION
  // ========================================================================

  section('2. GitHub Configuration');

  config.githubOrg = await ask('GitHub username/organization: ');
  config.githubRepo = await ask('GitHub repository name: ') || 'my-project';
  config.githubUrl = `https://github.com/${config.githubOrg}/${config.githubRepo}`;

  // ========================================================================
  // BRANDING
  // ========================================================================

  section('3. Branding');

  config.colorPrimary = await ask('Primary brand color (hex) [#0066FF]: ') || '#0066FF';
  config.colorAccent = await ask('Accent color (hex) [#00D9FF]: ') || '#00D9FF';

  // ========================================================================
  // LINKS & CONTACT
  // ========================================================================

  section('4. Links & Contact');

  config.websiteUrl = await ask('Website URL (optional): ') || `https://${config.githubOrg}.github.io/${config.githubRepo}`;
  config.docsUrl = await ask(`Documentation URL [${config.websiteUrl}]: `) || config.websiteUrl;
  config.email = await ask('Contact email: ') || `hello@${config.githubOrg}.com`;

  console.log('\nSocial links (press Enter to skip):');
  config.twitterUrl = await ask('  Twitter URL: ') || null;
  config.linkedinUrl = await ask('  LinkedIn URL: ') || null;
  config.discordUrl = await ask('  Discord invite: ') || null;

  // ========================================================================
  // TEAM
  // ========================================================================

  section('5. Team Information');

  config.maintainerName = await ask('Your name: ') || 'Maintainer';
  config.maintainerGithub = await ask('Your GitHub username: ') || config.githubOrg;
  config.maintainerRole = await ask('Your role [Creator & Lead]: ') || 'Creator & Lead';
  config.organizationName = await ask(`Organization name [${config.projectName}]: `) || config.projectName;

  // ========================================================================
  // FEATURES
  // ========================================================================

  section('6. Features & Tech Stack (optional, just for documentation)');

  console.log('What tech stack will you use? (comma-separated, or press Enter to skip)\n');
  const frontend = await ask('  Frontend (e.g., React, Vue, Angular): ');
  const backend = await ask('  Backend (e.g., Node.js, Python, Go): ');
  const database = await ask('  Database (e.g., PostgreSQL, MongoDB): ');

  config.techStack = {
    frontend: frontend ? frontend.split(',').map(s => s.trim()) : [],
    backend: backend ? backend.split(',').map(s => s.trim()) : [],
    database: database ? database.split(',').map(s => s.trim()) : []
  };

  // ========================================================================
  // CONFIRMATION
  // ========================================================================

  header('Configuration Summary');

  console.log(`${colors.bright}Project:${colors.reset}      ${config.projectName}`);
  console.log(`${colors.bright}Tagline:${colors.reset}      ${config.projectTagline}`);
  console.log(`${colors.bright}GitHub:${colors.reset}       ${config.githubUrl}`);
  console.log(`${colors.bright}Docs:${colors.reset}         ${config.docsUrl}`);
  console.log(`${colors.bright}Email:${colors.reset}        ${config.email}`);
  console.log(`${colors.bright}Colors:${colors.reset}       Primary: ${config.colorPrimary}, Accent: ${config.colorAccent}`);
  console.log(`${colors.bright}Maintainer:${colors.reset}   ${config.maintainerName} (@${config.maintainerGithub})\n`);

  const confirm = await ask('Does this look correct? (y/n): ');

  if (confirm.toLowerCase() !== 'y') {
    console.log('\n❌ Setup cancelled. Run `npm run setup` again to retry.\n');
    rl.close();
    return;
  }

  // ========================================================================
  // WRITE CONFIGURATION
  // ========================================================================

  section('Writing Configuration');

  const configPath = path.join(__dirname, '..', 'startup.config.js');
  const configContent = generateConfigFile(config);

  try {
    fs.writeFileSync(configPath, configContent, 'utf8');
    success(`Configuration written to: startup.config.js`);
  } catch (error) {
    console.error(`\n${colors.reset}❌ Error writing config file:`, error.message);
    rl.close();
    return;
  }

  // ========================================================================
  // UPDATE PACKAGE.JSON
  // ========================================================================

  try {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkg.name = config.githubRepo.toLowerCase().replace(/\s+/g, '-');
      pkg.description = config.projectDescription;
      pkg.repository = {
        type: 'git',
        url: `${config.githubUrl}.git`
      };
      pkg.author = config.maintainerName;
      pkg.license = config.license;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
      success('Updated package.json');
    }
  } catch (error) {
    warning(`Could not update package.json: ${error.message}`);
  }

  // ========================================================================
  // UPDATE README
  // ========================================================================

  try {
    const readmePath = path.join(__dirname, '..', 'README.md');
    let readme = fs.readFileSync(readmePath, 'utf8');

    // Replace template placeholders
    readme = readme.replace(/PAMASIGA OS/g, config.projectName);
    readme = readme.replace(/YOUR_ORG/g, config.githubOrg);
    readme = readme.replace(/pamasiga-os/g, config.githubRepo);

    fs.writeFileSync(readmePath, readme, 'utf8');
    success('Updated README.md');
  } catch (error) {
    warning(`Could not update README.md: ${error.message}`);
  }

  // ========================================================================
  // NEXT STEPS
  // ========================================================================

  header('Setup Complete! 🎉');

  console.log('Your PAMASIGA OS template has been customized.\n');
  console.log(`${colors.bright}Next steps:${colors.reset}\n`);
  console.log('  1. Review the generated startup.config.js');
  console.log('  2. Run `npm run create-labels` to create GitHub labels');
  console.log('  3. Enable GitHub Pages in repository settings');
  console.log('  4. Enable GitHub Discussions in repository settings');
  console.log('  5. Install docs dependencies: `cd website && pnpm install`');
  console.log('  6. Start building: Add your code to apps/, services/, packages/\n');
  console.log(`${colors.bright}Documentation:${colors.reset}`);
  console.log('  - See docs/ADOPTION_GUIDE.md for detailed customization');
  console.log('  - See docs/GITHUB_ECOSYSTEM_PLAN.md for workflow setup\n');
  console.log(`${colors.green}Happy building! 🚀${colors.reset}\n`);

  rl.close();
}

// Generate the configuration file content
function generateConfigFile(config) {
  const currentYear = new Date().getFullYear();

  return `/**
 * ${config.projectName} - Startup Template Configuration
 *
 * Generated by PAMASIGA OS setup wizard
 * This is the SINGLE SOURCE OF TRUTH for all branding, URLs, and settings.
 */

module.exports = {
  // ============================================================================
  // CORE IDENTITY
  // ============================================================================

  project: {
    name: '${config.projectName}',
    tagline: '${config.projectTagline}',
    description: '${config.projectDescription}',
    type: '${config.projectType}',
    version: '0.1.0',
    license: '${config.license}',
    keywords: ${JSON.stringify(config.techStack.frontend.concat(config.techStack.backend).concat(config.techStack.database))}
  },

  // ============================================================================
  // BRANDING
  // ============================================================================

  branding: {
    colors: {
      primary: '${config.colorPrimary}',
      accent: '${config.colorAccent}',
      success: '#00C851',
      warning: '#FFBB33',
      danger: '#FF4444',
      dark: '#1a1a1a',
      light: '#ffffff'
    },
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      favicon: '/favicon.ico'
    },
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "Courier New", monospace'
    }
  },

  // ============================================================================
  // LINKS & SOCIAL
  // ============================================================================

  links: {
    github: {
      org: '${config.githubOrg}',
      repo: '${config.githubRepo}',
      url: '${config.githubUrl}'
    },
    docs: {
      url: '${config.docsUrl}',
      basePath: '/${config.githubRepo}'
    },
    social: {
      twitter: ${config.twitterUrl ? `'${config.twitterUrl}'` : 'null'},
      linkedin: ${config.linkedinUrl ? `'${config.linkedinUrl}'` : 'null'},
      discord: ${config.discordUrl ? `'${config.discordUrl}'` : 'null'}
    },
    contact: {
      email: '${config.email}',
      support: 'support@${config.githubOrg}.com'
    },
    website: '${config.websiteUrl}'
  },

  // ============================================================================
  // TEAM & CONTRIBUTORS
  // ============================================================================

  team: {
    maintainers: [
      {
        name: '${config.maintainerName}',
        role: '${config.maintainerRole}',
        github: '${config.maintainerGithub}',
        avatar: 'https://github.com/${config.maintainerGithub}.png'
      }
    ],
    organization: {
      name: '${config.organizationName}',
      url: '${config.websiteUrl}',
      foundedYear: ${currentYear}
    }
  },

  // ============================================================================
  // FEATURES & TECH STACK
  // ============================================================================

  features: {
    included: [
      'Monorepo architecture',
      'GitHub Actions CI/CD',
      'Comprehensive documentation',
      'Code quality automation',
      'Security scanning',
      'Issue & PR templates'
    ],
    techStack: {
      frontend: ${JSON.stringify(config.techStack.frontend || [])},
      backend: ${JSON.stringify(config.techStack.backend || [])},
      database: ${JSON.stringify(config.techStack.database || [])},
      infrastructure: ['Docker', 'Kubernetes'],
      cicd: ['GitHub Actions']
    }
  },

  // ============================================================================
  // DOCUMENTATION CONFIGURATION
  // ============================================================================

  docs: {
    theme: {
      navigation: true,
      darkMode: true,
      search: { placeholder: 'Search documentation...' },
      footer: { text: \`${config.license} \${new Date().getFullYear()} © ${config.projectName}\` }
    },
    versioning: { enabled: true, currentVersion: '0.1.0', versions: ['0.1.0'] },
    aiChat: { enabled: false }
  },

  // ============================================================================
  // GITHUB CONFIGURATION
  // ============================================================================

  github: {
    branches: { main: 'main', develop: 'develop' },
    labels: {
      types: [
        { name: 'bug', color: 'd73a4a', description: 'Something isn\\'t working' },
        { name: 'feature', color: '0075ca', description: 'New feature request' },
        { name: 'enhancement', color: 'a2eeef', description: 'Improvement to existing feature' },
        { name: 'documentation', color: '0075ca', description: 'Documentation changes' }
      ],
      priorities: [
        { name: 'priority:critical', color: 'b60205', description: 'Must be fixed immediately' },
        { name: 'priority:high', color: 'd93f0b', description: 'Important' },
        { name: 'priority:medium', color: 'fbca04', description: 'Normal priority' },
        { name: 'priority:low', color: '0e8a16', description: 'Nice to have' }
      ],
      areas: [
        { name: 'area:frontend', color: 'bfdadc', description: 'Frontend code' },
        { name: 'area:backend', color: 'c5def5', description: 'Backend code' },
        { name: 'area:infra', color: 'f9d0c4', description: 'Infrastructure' }
      ]
    },
    discussions: { enabled: true }
  },

  // ============================================================================
  // CI/CD CONFIGURATION
  // ============================================================================

  cicd: {
    nodeVersions: ['18', '20', '22'],
    coverage: { enabled: true, threshold: 80 },
    security: {
      dependencyCheck: true,
      secretScanning: true,
      sastScanning: true
    }
  }
}
`;
}

// Run the wizard
runWizard().catch((error) => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
