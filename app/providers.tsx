'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// Cookie utility functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const getCookie = (name: string): string | null => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'title': 'Tawjihi Calculator',
    'subtitle': 'Calculate your first year percentage',
    'english': 'English',
    'islamic': 'Islamic',
    'arabic': 'Arabic',
    'history': 'History',
    'calculate': 'Calculate',
    'result': 'Result',
    'total_score': 'Total Score',
    'percentage': 'Percentage',
    'download_pdf': 'Download PDF',
    'contact_us': 'Contact Us',
    'join_groups': 'Join Our Groups',
    'study_resources': 'Study Resources',
    'faq': 'FAQ',
    'name': 'Name',
    'phone': 'Phone',
    'email': 'Email',
    'submit': 'Submit',
    'max_marks': 'Max Marks',
    'your_score': 'Your Score',
    'first_year_percentage': 'First Year Percentage (30%)',
    'total_percentage': 'Total Percentage',
    'download_result': 'Download Result',
    'join_whatsapp': 'Join WhatsApp Group',
    'join_instagram': 'Follow on Instagram',
    'download_app': 'Download واثق الأول App',
    'footer_contact': 'Contact Information',
    'developed_by': 'Developed by',
  },
  ar: {
    'title': 'حاسبة التوجيهي',
    'subtitle': 'احسب نسبة السنة الأولى',
    'english': 'اللغة الإنجليزية',
    'islamic': 'التربية الإسلامية',
    'arabic': 'اللغة العربية',
    'history': 'التاريخ',
    'calculate': 'احسب',
    'result': 'النتيجة',
    'total_score': 'المجموع الكلي',
    'percentage': 'النسبة المئوية',
    'download_pdf': 'تحميل PDF',
    'contact_us': 'تواصل معنا',
    'join_groups': 'انضم لمجموعاتنا',
    'study_resources': 'الموارد الدراسية',
    'faq': 'الأسئلة الشائعة',
    'name': 'الاسم',
    'phone': 'رقم الهاتف',
    'email': 'البريد الإلكتروني',
    'submit': 'إرسال',
    'max_marks': 'الدرجة العظمى',
    'your_score': 'درجتك',
    'first_year_percentage': 'نسبة السنة الأولى (30%)',
    'total_percentage': 'النسبة المئوية الإجمالية',
    'download_result': 'تحميل النتيجة',
    'join_whatsapp': 'انضم لمجموعة الواتساب',
    'join_instagram': 'تابع على الإنستغرام',
    'download_app': 'حمل تطبيق واثق الأول',
    'footer_contact': 'معلومات التواصل',
    'developed_by': 'تم التطوير بواسطة',
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar') // Default to Arabic
  
  useEffect(() => {
    // Check for saved language preference in cookies
    const savedLanguage = getCookie('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage)
    } else {
      // Default to Arabic, but check browser language as fallback
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en'
      setLanguage(browserLang)
    }
  }, [])

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    // Save language preference in cookie for 1 year
    setCookie('language', newLanguage, 365)
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
