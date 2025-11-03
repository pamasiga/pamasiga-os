import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

// Theme configuration
// Note: This config is used in the browser. For build-time config (like basePath),
// see next.config.mjs which loads from ../startup.config.js
const config = {
  project: {
    name: 'PAMASIGA OS',
    tagline: 'AI-Augmented Software Development Platform'
  },
  branding: {
    colors: {
      primary: '#0066FF',
      accent: '#00D9FF'
    }
  },
  links: {
    github: {
      org: 'pamasiga',
      repo: 'pamasiga-os',
      url: 'https://github.com/pamasiga/pamasiga-os'
    },
    docs: {
      url: 'https://pamasiga.github.io/pamasiga-os'
    },
    social: {}
  },
  team: {
    maintainers: []
  },
  docs: {
    theme: {
      footer: {
        text: 'MIT © PAMASIGA OS'
      }
    }
  }
}

// Custom logo component
function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
      <span style={{
        fontSize: '24px',
        background: `linear-gradient(135deg, ${config.branding.colors.primary}, ${config.branding.colors.accent})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {config.project.name}
      </span>
    </div>
  )
}

// Theme configuration
const themeConfig = {
  // Logo
  logo: Logo,

  // Project link (GitHub)
  project: {
    link: config.links.github.url,
  },

  // Chat link - only include if configured
  // Uncomment and set config.links.social.discord to enable
  // chat: {
  //   link: 'https://discord.gg/your-invite',
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  //     </svg>
  //   )
  // },

  // Documentation repository base
  docsRepositoryBase: `${config.links.github.url}/tree/main/website`,

  // Footer
  footer: {
    text: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>{config.project.name}</div>
            <div style={{ fontSize: '14px', opacity: 0.7 }}>{config.project.tagline}</div>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {config.links.social.twitter && (
              <a href={config.links.social.twitter} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, hover: { opacity: 1 } }}>
                Twitter
              </a>
            )}
            {config.links.social.linkedin && (
              <a href={config.links.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>
                LinkedIn
              </a>
            )}
            <a href={config.links.github.url} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>
              GitHub
            </a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid', borderColor: 'var(--nextra-border-color)', paddingTop: '16px', fontSize: '14px', opacity: 0.7 }}>
          {config.docs.theme.footer.text}
        </div>
      </div>
    )
  },

  // Edit link
  editLink: {
    text: 'Edit this page on GitHub →'
  },

  // Feedback link
  feedback: {
    content: 'Questions? Give us feedback →',
    labels: 'feedback'
  },

  // Table of contents
  toc: {
    float: true,
    title: 'On This Page',
    extraContent: null
  },

  // Navigation
  navigation: true,

  // Dark mode
  darkMode: true,

  // Primary color (hue)
  primaryHue: 210, // Blue hue for primary color

  // Search
  search: {
    placeholder: 'Search documentation...'
  },

  // Sidebar
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: false,
    toggleButton: true
  },

  // Head tags (SEO)
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url = config.links.docs.url + (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || config.project.name} />
        <meta property="og:description" content={frontMatter.description || config.project.description} />
        <meta name="description" content={frontMatter.description || config.project.description} />
        <meta name="keywords" content={config.project.keywords?.join(', ')} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={config.links.social.twitter} />
        <meta name="twitter:title" content={frontMatter.title || config.project.name} />
        <meta name="twitter:description" content={frontMatter.description || config.project.description} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" content="/apple-touch-icon.png" />
      </>
    )
  },

  // Custom banner (announcements)
  banner: {
    key: 'template-banner',
    text: (
      <a href={config.links.github.url} target="_blank" rel="noopener noreferrer">
        🎉 PAMASIGA OS is open-source! Star us on GitHub →
      </a>
    )
  },

  // Use options
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: `%s – ${config.project.name}`
      }
    }
    return {
      titleTemplate: config.project.name
    }
  }
}

export default themeConfig
