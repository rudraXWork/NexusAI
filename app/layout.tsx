import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NexusAI — AI-Powered Data Automation Platform',
  description:
    'Deploy intelligent pipelines, automate complex data workflows, and scale your operations with NexusAI.',
  openGraph: {
    title: 'NexusAI — AI-Powered Data Automation Platform',
    description: 'Deploy intelligent pipelines and automate complex data workflows.',
    url: 'https://nexusai.vercel.app',
    siteName: 'NexusAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexusAI',
    description: 'Deploy intelligent pipelines, automate complex data workflows at any scale.',
  },
  alternates: {
    canonical: 'https://nexusai.vercel.app',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NexusAI',
  applicationCategory: 'BusinessApplication',
  description:
    'AI-powered data automation platform. Deploy intelligent pipelines, automate complex data workflows, and scale your operations.',
  url: 'https://nexusai.vercel.app',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '29',
    highPrice: '199',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Set theme before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('nexusai-theme');
            if (t === 'light') document.documentElement.dataset.theme = 'light';
          } catch(e) {}
        `}} />
        {/* Light mode + scroll-reveal — kept here so Tailwind never strips them */}
        <style dangerouslySetInnerHTML={{ __html: `
          [data-theme="light"] {
            --arctic:    #0B1922;
            --mint:      #172B36;
            --nocturnal: #E4EDE9;
            --noir:      #F1F6F4;
          }
          [data-theme="light"] .nav-scrolled-bg {
            background: rgba(241,246,244,0.95) !important;
            border-bottom: 1px solid rgba(23,43,54,0.1) !important;
          }

          /* Scroll reveal — hide before paint so JS never causes a jerk */
          main > section:not(:first-child),
          main > div,
          footer {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 600ms cubic-bezier(0.16,1,0.3,1),
                        transform 600ms cubic-bezier(0.16,1,0.3,1);
          }
          .sr-visible {
            opacity: 1 !important;
            transform: none !important;
          }
          @media (prefers-reduced-motion: reduce) {
            main > section:not(:first-child), main > div, footer {
              opacity: 1; transform: none; transition: none;
            }
          }
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
