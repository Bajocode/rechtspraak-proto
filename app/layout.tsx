import type { Metadata } from 'next'

import './globals.css'
import { Inter } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { Nav } from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Phase 2 Template',
  description: 'a Baseline Template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  function cn(arg0: any, arg1: string): string | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
              <div className="flex h-20 items-center justify-between py-6">
                <Nav />
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
