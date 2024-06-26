import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mira Frontend Challenge',
  description: 'This web application is a frontend challenge made for Mira',
  icons: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      sizes: '32x32',
      url: '/images/favicon.gif',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
