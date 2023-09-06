import '../globals.css'
import type { Metadata } from 'next'
import { i18n, Locale } from '@/i18n.config'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fredhii | Personal Portfolio',
  description:
    'Fredy is a Data Engineer and Full-stack Software Developer. Mainly skilled in JavaScript, Golang, and Python, with a strong knowledge of C, C#, Shell, Unix, SQL, PostgreSQL, MongoDB, Scrum, AWS (Certified cloud practitioner), GCP and Jira'
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning={true}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
