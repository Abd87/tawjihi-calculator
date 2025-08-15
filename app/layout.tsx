import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ServiceWorker from './components/ServiceWorker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tawjihi Calculator - حاسبة التوجيهي | Calculate Your First Year Percentage',
  description: 'Free online Tawjihi calculator for first year students. Calculate your percentage instantly with English, Arabic, Islamic, and History subjects. احسب نسبة التوجيهي للسنة الأولى مجاناً.',
  keywords: [
    'tawjihi calculator',
    'حاسبة التوجيهي',
    'tawjihi percentage',
    'نسبة التوجيهي',
    'first year tawjihi',
    'التوجيهي السنة الأولى',
    'jordan tawjihi',
    'التوجيهي الأردني',
    'tawjihi subjects',
    'مواد التوجيهي',
    'english tawjihi',
    'arabic tawjihi',
    'islamic tawjihi',
    'history tawjihi',
    'tawjihi results',
    'نتائج التوجيهي',
    'tawjihi marks',
    'درجات التوجيهي',
    'tawjihi 2024',
    'التوجيهي 2024',
    'free tawjihi calculator',
    'حاسبة توجيهي مجانية',
    'online tawjihi calculator',
    'حاسبة توجيهي اونلاين'
  ],
  authors: [{ name: 'Abdlarahman Alshabatat' }],
  creator: 'Abdlarahman Alshabatat',
  publisher: 'Tawjihi Calculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tawjihi-calculator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tawjihi Calculator - حاسبة التوجيهي | Calculate Your First Year Percentage',
    description: 'Free online Tawjihi calculator for first year students. Calculate your percentage instantly with English, Arabic, Islamic, and History subjects.',
    url: 'https://tawjihi-calculator.vercel.app',
    siteName: 'Tawjihi Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tawjihi Calculator - Calculate Your First Year Percentage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawjihi Calculator - حاسبة التوجيهي',
    description: 'Free online Tawjihi calculator for first year students. Calculate your percentage instantly!',
    images: ['/og-image.png'],
    creator: '@tawjihi_calculator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual Google verification code
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
             
             {/* Structured Data for SEO */}
             <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                 __html: JSON.stringify({
                   "@context": "https://schema.org",
                   "@type": "WebApplication",
                   "name": "Tawjihi Calculator - حاسبة التوجيهي",
                   "description": "Free online Tawjihi calculator for first year students. Calculate your percentage instantly with English, Arabic, Islamic, and History subjects.",
                   "url": "https://tawjihi-calculator.vercel.app",
                   "applicationCategory": "EducationalApplication",
                   "operatingSystem": "Web Browser",
                   "offers": {
                     "@type": "Offer",
                     "price": "0",
                     "priceCurrency": "USD"
                   },
                   "author": {
                     "@type": "Person",
                     "name": "عبدالرحمن الشباطات",
                     "email": "ashbatat@gmail.com"
                   },
                   "creator": {
                     "@type": "Person",
                     "name": "عبدالرحمن الشباطات"
                   },
                   "publisher": {
                     "@type": "Organization",
                     "name": "Tawjihi Calculator"
                   },
                   "inLanguage": ["en", "ar"],
                   "dateCreated": "2024-01-01",
                   "dateModified": new Date().toISOString().split('T')[0],
                   "featureList": [
                     "Calculate Tawjihi percentage",
                     "English, Arabic, Islamic, History subjects",
                     "Instant results",
                     "PDF download",
                     "Bilingual support"
                   ],
                   "screenshot": "https://tawjihi-calculator.vercel.app/og-image.png",
                   "softwareVersion": "1.0.0",
                   "aggregateRating": {
                     "@type": "AggregateRating",
                     "ratingValue": "4.8",
                     "ratingCount": "150"
                   }
                 })
               }}
             />
           </body>
         </html>
  )
}
