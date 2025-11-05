import nextra from 'nextra'

const isProd = process.env.NODE_ENV === 'production'

// Load startup config from parent directory
// Note: CommonJS module.exports is exposed as .default when imported in ESM
let startupConfig = {}
try {
  const configModule = await import('../startup.config.js')
  // Handle both ESM default export and CommonJS module.exports
  startupConfig = configModule.default || configModule

  // If startupConfig doesn't have the expected structure, it might be wrapped
  if (!startupConfig.project && configModule.default) {
    startupConfig = configModule.default
  }
} catch (e) {
  console.error('Failed to load startup.config.js:', e.message)
  // Fallback configuration for development
  startupConfig = {
    project: { name: 'PAMASIGA OS' },
    links: {
      github: { repo: 'pamasiga-os' },
      docs: { basePath: '' } // No basePath for local dev
    }
  }
}

const basePath = isProd ? (startupConfig.links?.docs?.basePath || '') : ''
console.log('Build config - isProd:', isProd, 'basePath:', basePath, 'configKeys:', Object.keys(startupConfig))

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
  // GitHub Pages deployment config
  output: 'export',
  // Set basePath for GitHub Pages repository sites (username.github.io/repository-name)
  // For root domain deployment (username.github.io), set this to ''
  basePath: isProd ? '/pamasiga-os' : '',
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
