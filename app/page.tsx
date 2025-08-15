'use client'

import { useState } from 'react'
import { useLanguage } from './providers'
import { generatePDF } from './utils/pdfGenerator'

interface Subject {
  name: string
  maxMarks: number
  score: number
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: 'english', maxMarks: 100, score: 0 },
    { name: 'arabic', maxMarks: 100, score: 0 },
    { name: 'islamic', maxMarks: 60, score: 0 },
    { name: 'history', maxMarks: 40, score: 0 },
  ])
  const [result, setResult] = useState<{ totalScore: number; percentage: number } | null>(null)
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  // Cookie consent management
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowCookieBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowCookieBanner(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const updateSubjectScore = (index: number, score: number) => {
    const newSubjects = [...subjects]
    newSubjects[index].score = Math.min(score, newSubjects[index].maxMarks)
    setSubjects(newSubjects)
  }

  const calculateResult = () => {
    const totalScore = subjects.reduce((sum, subject) => sum + subject.score, 0)
    const maxTotal = subjects.reduce((sum, subject) => sum + subject.maxMarks, 0)
    const percentage = (totalScore / maxTotal) * 30 // 30% of the total percentage
    setResult({ totalScore, percentage })
  }

  const resetCalculator = () => {
    setSubjects(subjects.map(subject => ({ ...subject, score: 0 })))
    setResult(null)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
             {/* Header */}
       <header className="bg-white shadow-lg">
         <div className="container mx-auto px-4 py-4">
           {/* Contact Info Bar */}
           <div className="flex flex-col md:flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
             <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
               <div className="flex items-center space-x-2">
                 <span className="font-semibold">
                   {language === 'en' ? 'Developer:' : 'المطور:'}
                 </span>
                 <span>عبد الرحمن الشبطات</span>
               </div>
                               <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <a href="mailto:ashbatat@gmail.com" className="hover:text-blue-600 transition-colors">
                    ashbatat@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <a href="tel:+962790881392" className="hover:text-blue-600 transition-colors">
                    +962 79 088 1392
                  </a>
                </div>
             </div>
             <button
               onClick={toggleLanguage}
               className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
             >
               {language === 'en' ? 'العربية' : 'English'}
             </button>
           </div>
           
           {/* Main Title */}
           <div className="flex justify-center">
             <h1 className="text-2xl font-bold text-gray-800">
               {t('title')}
             </h1>
           </div>
         </div>
       </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('subtitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Enter your scores for each subject to calculate your Tawjihi percentage'
              : 'أدخل درجاتك لكل مادة لحساب نسبة التوجيهي'
            }
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {language === 'en' ? 'Enter Your Scores' : 'أدخل درجاتك'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.map((subject, index) => (
                <div key={subject.name} className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(subject.name)}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="0"
                      max={subject.maxMarks}
                      value={subject.score}
                      onChange={(e) => updateSubjectScore(index, parseInt(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-500">
                      / {subject.maxMarks}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={calculateResult}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {t('calculate')}
              </button>
              <button
                onClick={resetCalculator}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                {language === 'en' ? 'Reset' : 'إعادة تعيين'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {t('result')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">
                    {t('total_score')}
                  </h4>
                  <p className="text-3xl font-bold text-blue-600">
                    {result.totalScore}
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <h4 className="text-lg font-medium text-green-800 mb-2">
                    {t('percentage')}
                  </h4>
                  <p className="text-3xl font-bold text-green-600">
                    {result.percentage.toFixed(2)}%
                  </p>
                </div>
              </div>

                             <div className="mt-6 text-center">
                 <button 
                   onClick={() => generatePDF(subjects, result, language)}
                   className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                 >
                   {t('download_pdf')}
                 </button>
               </div>
            </div>
          )}

                     {/* Social Links Section */}
           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
               {language === 'en' ? 'Join Our Community' : 'انضم لمجتمعنا'}
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* WhatsApp Group */}
               <a
                 href="https://chat.whatsapp.com/IYDbChe9mByEe2Ayy5rUfP?mode=ac_t"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-green-600 text-white p-6 rounded-lg text-center hover:bg-green-700 transition-colors"
               >
                 <div className="text-3xl mb-2">📱</div>
                 <h4 className="font-semibold mb-2">WhatsApp</h4>
                 <p className="text-sm opacity-90">
                   {language === 'ar' ? 'انضم لمجموعة الواتساب' : 'Join WhatsApp Group'}
                 </p>
               </a>

               {/* Instagram */}
               <a
                 href="https://www.instagram.com/alwatheq_interactive/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg text-center hover:from-purple-600 hover:to-pink-600 transition-colors"
               >
                 <div className="text-3xl mb-2">📸</div>
                 <h4 className="font-semibold mb-2">Instagram</h4>
                 <p className="text-sm opacity-90">
                   {language === 'ar' ? 'تابع على الإنستغرام' : 'Follow on Instagram'}
                 </p>
               </a>

               {/* App Download */}
               <a
                 href="https://play.google.com/store/apps/details?id=com.abd.watheq"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-blue-600 text-white p-6 rounded-lg text-center hover:bg-blue-700 transition-colors"
               >
                 <div className="text-3xl mb-2">📱</div>
                 <h4 className="font-semibold mb-2">واثق الأول</h4>
                 <p className="text-sm opacity-90">
                   {language === 'ar' ? 'حمل التطبيق' : 'Download App'}
                 </p>
               </a>
             </div>
           </div>

           {/* Additional Information */}
           <div className="bg-white rounded-xl shadow-lg p-6">
             <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
               {language === 'en' ? 'Important Notes' : 'ملاحظات مهمة'}
             </h3>
             <div className="space-y-3 text-gray-600">
               <p>
                 {language === 'en' 
                   ? '• This calculator is for first year Tawjihi subjects only'
                   : '• هذه الحاسبة للمواد الأساسية للسنة الأولى فقط'
                 }
               </p>
               <p>
                 {language === 'en'
                   ? '• Marks distribution: English (100), Arabic (100), Islamic (60), History (40)'
                   : '• توزيع الدرجات: الإنجليزية (100)، العربية (100)، الإسلامية (60)، التاريخ (40)'
                 }
               </p>
               <p>
                 {language === 'en'
                   ? '• The percentage shown is 30% of your total score (out of 300 marks)'
                   : '• النسبة المئوية المعروضة هي 30% من مجموع درجاتك (من أصل 300 درجة)'
                 }
               </p>
               <p>
                 {language === 'en'
                   ? '• For official results, please refer to the Ministry of Education'
                   : '• للنتائج الرسمية، يرجى الرجوع إلى وزارة التربية والتعليم'
                 }
               </p>
             </div>
           </div>
        </div>
      </main>

             {/* Footer */}
       <footer className="bg-gray-800 text-white py-8 mt-12">
         <div className="container mx-auto px-4 text-center">
           <p className="text-sm">
             {t('developed_by')} Tawjihi Calculator Team
           </p>
           <div className="mt-4 space-x-4">
             <a href="#" className="text-blue-400 hover:text-blue-300">
               {t('contact_us')}
             </a>
             <a href="#" className="text-blue-400 hover:text-blue-300">
               {t('join_groups')}
             </a>
           </div>
         </div>
       </footer>

       {/* Cookie Consent Banner */}
       {showCookieBanner && (
         <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
           <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
             <div className="mb-4 md:mb-0 md:mr-4">
               <p className="text-sm">
                 {language === 'en' 
                   ? 'We use cookies to improve your experience and remember your language preference.'
                   : 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتذكر تفضيلات اللغة الخاصة بك.'
                 }
               </p>
             </div>
             <div className="flex space-x-3">
               <button
                 onClick={acceptCookies}
                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
               >
                 {language === 'en' ? 'Accept' : 'قبول'}
               </button>
               <button
                 onClick={declineCookies}
                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
               >
                 {language === 'en' ? 'Decline' : 'رفض'}
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }
