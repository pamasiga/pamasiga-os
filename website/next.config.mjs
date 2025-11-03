import nextra from 'nextra'

const isProd = process.env.NODE_ENV === 'production'

// Load startup config from parent directory
let startupConfig = {}
try {
  const config = await import('../startup.config.js')
  startupConfig = config.default || config
} catch (e) {
  // Fallback configuration for development
  startupConfig = {
    project: { name: 'PAMASIGA OS' },
    links: {
      github: { repo: 'pamasiga-os' },
      docs: { basePath: '' } // No basePath for local dev
    }
  }
}

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: true,
  search: {
    codeblocks: true
  },
  defaultShowCopyCode: true
})

export default withNextra({
  // GitHub Pages deployment config - reads from startup.config.js
  output: 'export',
  basePath: isProd ? (startupConfig.links?.docs?.basePath || '') : '',
  images: {
    unoptimized: true // Required for static export
  },

  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,

  // Trailing slash for better GitHub Pages compatibility
  trailingSlash: true

  // Note: i18n is not compatible with static export
  // For multilingual support, use Nextra's built-in i18n instead
})
