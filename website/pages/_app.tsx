import type { AppProps } from 'next/app'
// Optional: Install @vercel/analytics and @vercel/speed-insights packages to enable
// import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/next'
// import AIChat from '../components/AIChat'

// Import global styles
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      {/* Optional: Uncomment after installing @vercel/analytics */}
      {/* <Analytics /> */}

      {/* Optional: Uncomment after installing @vercel/speed-insights */}
      {/* <SpeedInsights /> */}

      {/* Optional: Uncomment after setting up /api/chat endpoint */}
      {/*
      <AIChat
        apiEndpoint="/api/chat"
        position="bottom-right"
      />
      */}
    </>
  )
}
