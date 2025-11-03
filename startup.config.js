/**
 * PAMASIGA OS - Startup Template Configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for all branding, URLs, and settings.
 * When you fork this template for your startup, customize this file first.
 *
 * All documentation, workflows, and components read from this config.
 */

module.exports = {
  // ============================================================================
  // CORE IDENTITY
  // ============================================================================

  project: {
    // Your project/company name
    name: 'PAMASIGA OS',

    // Short tagline (used in meta tags, headers)
    tagline: 'AI-Augmented Software Development Platform',

    // Longer description (used in README, docs home)
    description: 'A reusable, high-quality project template for AI-augmented software development with industry-standard engineering practices.',

    // Project type (template, saas, library, etc.)
    type: 'template',

    // Version (semver)
    version: '0.1.0',

    // License
    license: 'MIT',

    // Keywords for SEO and discovery
    keywords: [
      'template',
      'ai-development',
      'engineering-practices',
      'ci-cd',
      'monorepo',
      'github-actions'
    ]
  },

  // ============================================================================
  // BRANDING
  // ============================================================================

  branding: {
    // Brand colors (used in docs site, GitHub labels)
    colors: {
      primary: '#0066FF',      // Tech Blue
      accent: '#00D9FF',       // Cyan
      success: '#00C851',      // Green
      warning: '#FFBB33',      // Amber
      danger: '#FF4444',       // Red
      dark: '#1a1a1a',         // Dark mode background
      light: '#ffffff'         // Light mode background
    },

    // Logo paths (relative to /public in docs site)
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      favicon: '/favicon.ico'
    },

    // Font family (Google Fonts or system fonts)
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "Courier New", monospace'
    }
  },

  // ============================================================================
  // LINKS & SOCIAL
  // ============================================================================

  links: {
    // GitHub repository
    github: {
      org: 'pamasiga',           // Replace with your GitHub org/username
      repo: 'pamasiga-os',       // Replace with your repo name
      url: 'https://github.com/pamasiga/pamasiga-os'
    },

    // Documentation site
    docs: {
      url: 'https://pamasiga.github.io/pamasiga-os',
      basePath: '/pamasiga-os'   // For GitHub Pages
    },

    // Social media
    social: {
      twitter: 'https://twitter.com/YOUR_HANDLE',
      linkedin: 'https://linkedin.com/company/YOUR_COMPANY',
      discord: 'https://discord.gg/YOUR_INVITE',
      slack: null  // Optional
    },

    // Contact
    contact: {
      email: 'hello@yourcompany.com',
      support: 'support@yourcompany.com'
    },

    // Website (if separate from docs)
    website: 'https://yourcompany.com'
  },

  // ============================================================================
  // TEAM & CONTRIBUTORS
  // ============================================================================

  team: {
    // Maintainers (show in docs)
    maintainers: [
      {
        name: 'Your Name',
        role: 'Creator & Lead',
        github: 'yourusername',
        twitter: 'yourhandle',
        avatar: 'https://github.com/yourusername.png'
      }
    ],

    // Organization info
    organization: {
      name: 'Your Company',
      url: 'https://yourcompany.com',
      foundedYear: 2025
    }
  },

  // ============================================================================
  // FEATURES & TECH STACK
  // ============================================================================

  features: {
    // What's included in this template
    included: [
      'Monorepo architecture',
      'AI development workflows',
      'GitHub Actions CI/CD',
      'Comprehensive documentation',
      'Code quality automation',
      'Security scanning',
      'Issue & PR templates',
      'Project management setup'
    ],

    // Tech stack (for docs/marketing)
    techStack: {
      // These are suggestions - users customize when they fork
      frontend: ['React', 'Next.js', 'TypeScript'],
      backend: ['Node.js', 'Express', 'Python', 'FastAPI'],
      database: ['PostgreSQL', 'Redis'],
      infrastructure: ['Docker', 'Kubernetes', 'Terraform'],
      cicd: ['GitHub Actions'],
      monitoring: ['Prometheus', 'Grafana']
    }
  },

  // ============================================================================
  // DOCUMENTATION CONFIGURATION
  // ============================================================================

  docs: {
    // Nextra theme config
    theme: {
      // Navigation
      navigation: true,
      sidebar: {
        defaultMenuCollapseLevel: 1,
        autoCollapse: true
      },

      // Table of contents
      toc: {
        float: true,
        extraContent: null
      },

      // Features
      darkMode: true,
      search: {
        placeholder: 'Search documentation...'
      },
      feedback: {
        content: 'Question? Give us feedback →',
        labels: 'feedback'
      },
      editLink: {
        text: 'Edit this page on GitHub →'
      },

      // Footer
      footer: {
        text: `MIT ${new Date().getFullYear()} © PAMASIGA OS`
      }
    },

    // Versioning
    versioning: {
      enabled: true,
      currentVersion: '0.1.0',
      versions: ['0.1.0']  // Add versions as you release
    },

    // AI Chat Assistant (future feature)
    aiChat: {
      enabled: false,  // Set to true when implemented
      provider: null   // 'openai', 'anthropic', etc.
    }
  },

  // ============================================================================
  // GITHUB CONFIGURATION
  // ============================================================================

  github: {
    // Branch protection
    branches: {
      main: 'main',
      develop: 'develop'
    },

    // Issue labels (auto-created by setup script)
    labels: {
      // Type labels
      types: [
        { name: 'bug', color: 'd73a4a', description: 'Something isn\'t working' },
        { name: 'feature', color: '0075ca', description: 'New feature request' },
        { name: 'enhancement', color: 'a2eeef', description: 'Improvement to existing feature' },
        { name: 'documentation', color: '0075ca', description: 'Documentation changes' },
        { name: 'research', color: '8b72c6', description: 'Investigation or spike work' },
        { name: 'audit', color: 'd876e3', description: 'Code audit findings' }
      ],

      // Priority labels
      priorities: [
        { name: 'priority:critical', color: 'b60205', description: 'Must be fixed immediately' },
        { name: 'priority:high', color: 'd93f0b', description: 'Important, plan for next sprint' },
        { name: 'priority:medium', color: 'fbca04', description: 'Normal priority' },
        { name: 'priority:low', color: '0e8a16', description: 'Nice to have' }
      ],

      // Area labels
      areas: [
        { name: 'area:frontend', color: 'bfdadc', description: 'Frontend code' },
        { name: 'area:backend', color: 'c5def5', description: 'Backend code' },
        { name: 'area:infra', color: 'f9d0c4', description: 'Infrastructure/DevOps' },
        { name: 'area:ci-cd', color: 'd4c5f9', description: 'CI/CD pipelines' },
        { name: 'area:security', color: 'ff6b6b', description: 'Security-related' },
        { name: 'area:docs', color: 'c2e0c6', description: 'Documentation' }
      ],

      // AI labels
      ai: [
        { name: 'AI-GENERATED', color: '7057ff', description: 'Primarily AI-written code' },
        { name: 'AI-SUGGESTED', color: 'a8c7fa', description: 'AI-assisted code' },
        { name: 'HUMAN-REVIEWED', color: '00ff00', description: 'AI code reviewed by human' }
      ]
    },

    // GitHub Discussions categories
    discussions: {
      enabled: true,
      categories: [
        { name: 'Announcements', emoji: '📢', description: 'Official announcements' },
        { name: 'General', emoji: '💬', description: 'General discussions' },
        { name: 'Ideas', emoji: '💡', description: 'Ideas and feature requests' },
        { name: 'Q&A', emoji: '🙋', description: 'Questions and answers' },
        { name: 'Architecture', emoji: '🏗️', description: 'Architecture & design discussions' },
        { name: 'Security', emoji: '🔒', description: 'Security discussions' },
        { name: 'Show and Tell', emoji: '🎉', description: 'Show off your work' }
      ]
    },

    // GitHub Projects
    projects: {
      defaultBoard: {
        name: 'Development Board',
        columns: ['Backlog', 'Ready', 'In Progress', 'In Review', 'Done']
      }
    }
  },

  // ============================================================================
  // CI/CD CONFIGURATION
  // ============================================================================

  cicd: {
    // Node versions to test against
    nodeVersions: ['18', '20', '22'],

    // Python versions (if applicable)
    pythonVersions: ['3.10', '3.11', '3.12'],

    // Test coverage threshold
    coverage: {
      enabled: true,
      threshold: 80  // percentage
    },

    // Deployment environments
    environments: {
      staging: {
        url: 'https://staging.yourcompany.com',
        branch: 'develop'
      },
      production: {
        url: 'https://yourcompany.com',
        branch: 'main'
      }
    },

    // Security scanning
    security: {
      dependencyCheck: true,
      secretScanning: true,
      sastScanning: true,
      containerScanning: true
    }
  },

  // ============================================================================
  // CUSTOMIZATION GUIDE
  // ============================================================================

  // This section helps new users understand what to customize
  customization: {
    instructions: [
      '1. Fork this repository to your GitHub account/organization',
      '2. Run `npm run setup` or `pnpm setup` to start the interactive wizard',
      '3. The wizard will ask for your project details and update this config',
      '4. Alternatively, manually edit this file and run `npm run apply-config`',
      '5. Commit your changes and push to your repository',
      '6. Enable GitHub Pages in repository settings',
      '7. Enable GitHub Discussions in repository settings',
      '8. Run `npm run create-labels` to create GitHub labels',
      '9. Start building your project in apps/, services/, packages/'
    ],

    requiredFields: [
      'project.name',
      'project.description',
      'links.github.org',
      'links.github.repo',
      'links.docs.url',
      'branding.colors.primary',
      'team.maintainers'
    ]
  }
}
