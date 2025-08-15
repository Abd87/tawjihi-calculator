import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tawjihi Calculator - حاسبة التوجيهي',
    short_name: 'Tawjihi Calc',
    description: 'Free online Tawjihi calculator for first year students. Calculate your percentage instantly!',
    start_url: '/',
    display: 'standalone',
    background_color: '#3B82F6',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'utilities'],
    lang: 'en',
    dir: 'ltr',
  }
}
