import type { Metadata } from 'next'
import './globals.scss'
import Header from '@/components/Header/Header'
import { ThemeProvider } from '@/context/themeContext'

export const metadata: Metadata = {
  title: 'REST Countries API ',
  description: 'NextJS with REST API',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
        <main>{children}</main>
      </body>
    </html>
  )
}
