import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fredhii.com'),
  title: {
    default: 'Fredy Acuna',
    template: '%s | Fredy Acuna'
  },
  description:
    'Personal portfolio and blog of Fredy Acuna - Software Engineer sharing insights on web development, technology, and projects.',
  keywords: [
    'Fredy Acuna',
    'Software Engineer',
    'Web Development',
    'Portfolio',
    'Blog',
    'Next.js',
    'React'
  ],
  authors: [{ name: 'Fredy Acuna' }],
  creator: 'Fredy Acuna',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fredhii.com',
    siteName: 'Fredy Acuna',
    title: 'Fredy Acuna',
    description:
      'Personal portfolio and blog of Fredy Acuna - Software Engineer sharing insights on web development, technology, and projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fredy Acuna'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fredy Acuna',
    description:
      'Personal portfolio and blog of Fredy Acuna - Software Engineer.',
    creator: '@fredhii',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://fredhii.com',
    types: {
      'application/rss+xml': '/feed.xml'
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
