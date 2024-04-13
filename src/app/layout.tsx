import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MacroCalculator',
  description: 'Calcule seus macros nescessarios.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ptBR">
      <link rel="icon" href="/icon.png" />

      <body className={cn(inter.className, 'h-dvh sm:h-screen')}>
        {children}
      </body>
    </html>
  )
}
