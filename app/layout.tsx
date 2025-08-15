import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ServiceWorker from './components/ServiceWorker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tawjihi Calculator - حاسبة التوجيهي',
  description: 'Calculate your first year Tawjihi percentage - احسب نسبة التوجيهي للسنة الأولى',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#3B82F6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <ServiceWorker />
      </body>
    </html>
  )
}
