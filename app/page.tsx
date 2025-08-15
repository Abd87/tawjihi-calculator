'use client'

import { useState, useEffect } from 'react'
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
  const [studentName, setStudentName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)

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
    setSubjects(prevSubjects => {
      const newSubjects = [...prevSubjects]
      newSubjects[index].score = Math.min(score, newSubjects[index].maxMarks)
      return newSubjects
    })
  }

  const calculateResult = () => {
    const totalScore = subjects.reduce((sum, subject) => sum + subject.score, 0)
    const maxTotal = subjects.reduce((sum, subject) => sum + subject.maxMarks, 0)
    const percentage = (totalScore / maxTotal) * 30 // 30% of the total percentage
    setResult({ totalScore, percentage })
    setShowNameInput(true)
    
    // Scroll to results section after a short delay to ensure DOM update
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section')
      if (resultsSection) {
        resultsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 100)
  }

  const resetCalculator = () => {
    setSubjects(prevSubjects => prevSubjects.map(subject => ({ ...subject, score: 0 })))
    setResult(null)
    setStudentName('')
    setShowNameInput(false)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          {/* Contact Info Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">
                  {language === 'en' ? 'Developer:' : 'المطور:'}
                </span>
                                 <span>عبدالرحمن الشباطات</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <a href="mailto:ashbatat@gmail.com" className="hover:text-blue-600 transition-colors">
                  ashbatat@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+962790881392" className="hover:text-blue-600 transition-colors" dir="ltr">
                  +962 79 088 1392
                </a>
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
          
          {/* Main Title */}
          <div className="flex justify-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-title-glow">
              {t('title')}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            {t('subtitle')}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-slide-up-delay">
            {language === 'en' 
              ? 'Enter your scores for each subject to calculate your Tawjihi percentage'
              : 'أدخل درجاتك لكل مادة لحساب نسبة التوجيهي'
            }
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Social Media Links - Left Side */}
            <div className="lg:w-1/4 space-y-4">
              {/* WhatsApp Group */}
              <a
                href="https://chat.whatsapp.com/IYDbChe9mByEe2Ayy5rUfP?mode=ac_t"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover-lift block"
              >
                <div className="text-3xl mb-3 animate-bounce">📱</div>
                <h4 className="font-bold text-lg mb-2">WhatsApp</h4>
                <p className="text-sm opacity-90">
                  مجموعة واتساب للتوجيهي
                </p>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/alwatheq_interactive/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-xl text-center hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover-lift block"
              >
                <div className="text-3xl mb-3 animate-pulse">📸</div>
                <h4 className="font-bold text-lg mb-2">Instagram</h4>
                <p className="text-sm opacity-90">
                  انضم إلينا على الإنستغرام
                </p>
              </a>

              {/* App Download */}
              <a
                href="https://play.google.com/store/apps/details?id=com.abd.watheq"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl text-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover-lift block"
              >
                <div className="text-3xl mb-3 animate-bounce">📱</div>
                <h4 className="font-bold text-lg mb-2">واثق الأول</h4>
                <p className="text-sm opacity-90">
                  {language === 'ar' ? 'حمل التطبيق' : 'Download App'}
                </p>
              </a>
            </div>

            {/* Calculator - Right Side */}
            <div className="lg:w-3/4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 animate-fade-in-up">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Enter Your Scores' : 'أدخل درجاتك'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map((subject, index) => (
                    <div key={subject.name} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-200 transform hover:scale-102">
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        {t(subject.name)}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          min="0"
                          max={subject.maxMarks}
                          value={subject.score}
                          onChange={(e) => updateSubjectScore(index, parseInt(e.target.value) || 0)}
                          className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          placeholder="0"
                        />
                        <span className="text-lg font-medium text-blue-600">
                          / {subject.maxMarks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                                 <div className="flex justify-center mt-10 space-x-12">
                  <button
                    onClick={calculateResult}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
                  >
                    {t('calculate')}
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-12 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
                  >
                    {language === 'en' ? 'Reset' : 'إعادة تعيين'}
                  </button>
                </div>
              </div>
            </div>
          </div>

                     {/* Results Section */}
           {result && (
             <div id="results-section" className="max-w-6xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 animate-fade-in-up">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {t('result')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 text-center hover-lift animate-pulse">
                    <h4 className="text-xl font-semibold text-blue-800 mb-4">
                      {t('total_score')}
                    </h4>
                    <p className="text-5xl font-bold text-blue-600">
                      {result.totalScore}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 text-center hover-lift animate-pulse">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">
                      {t('percentage')}
                    </h4>
                    <p className="text-5xl font-bold text-green-600">
                      {result.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>

                                 <div className="mt-8 text-center">
                   {showNameInput && (
                     <div className="mb-6">
                       <label className="block text-lg font-semibold text-gray-800 mb-3">
                         {language === 'en' ? 'Enter Your Name:' : 'أدخل اسمك:'}
                       </label>
                       <input
                         type="text"
                         value={studentName}
                         onChange={(e) => setStudentName(e.target.value)}
                         className="px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-center text-lg"
                         placeholder={language === 'en' ? 'Your Name' : 'اسمك'}
                       />
                     </div>
                   )}
                                                            <button 
                       onClick={() => {
                         // Show loading state
                         const button = event?.target as HTMLButtonElement
                         const originalText = button.innerHTML
                         const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                         button.innerHTML = '⏳ ' + (language === 'en' ? 'Generating PDF...' : 'جاري إنشاء PDF...')
                         button.disabled = true
                         
                                                   // Show mobile instruction if needed
                          if (isMobile) {
                            const instruction = language === 'en' 
                              ? 'PDF will open in a new tab. To save:\n\n1. Look for the share button (📤) in your browser\n2. Or tap the menu (⋮) and select "Share"\n3. Choose "Save to Files" or "Download"\n4. The PDF will stay open for 30 seconds'
                              : 'سيتم فتح PDF في تبويب جديد. للحفظ:\n\n1. ابحث عن زر المشاركة (📤) في المتصفح\n2. أو اضغط على القائمة (⋮) واختر "مشاركة"\n3. اختر "حفظ في الملفات" أو "تحميل"\n4. سيبقى PDF مفتوحاً لمدة 30 ثانية'
                            alert(instruction)
                          }
                        
                                                 generatePDF(subjects, result, language, studentName)
                           .then(() => {
                             // Success - restore button
                             const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                             if (isMobile) {
                               button.innerHTML = '✅ ' + (language === 'en' ? 'PDF Opened!' : 'تم فتح PDF!')
                             } else {
                               button.innerHTML = '✅ ' + (language === 'en' ? 'PDF Downloaded!' : 'تم تحميل PDF!')
                             }
                             setTimeout(() => {
                               button.innerHTML = originalText
                               button.disabled = false
                             }, 2000)
                           })
                          .catch((error) => {
                            // Error - restore button
                            button.innerHTML = '❌ ' + (language === 'en' ? 'Download Failed' : 'فشل التحميل')
                            setTimeout(() => {
                              button.innerHTML = originalText
                              button.disabled = false
                            }, 2000)
                          })
                      }}
                      disabled={!studentName.trim()}
                      className={`px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg animate-bounce ${
                        studentName.trim() 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' 
                          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      📄 {t('download_pdf')}
                    </button>
                 </div>
              </div>
            </div>
          )}



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
                           {t('developed_by')} عبدالرحمن الشباطات - 2025-2026
           </p>
           <div className="mt-4 space-x-4">
             <a href="mailto:ashbatat@gmail.com" className="text-blue-400 hover:text-blue-300">
               {language === 'en' ? 'Contact Us' : 'تواصل معنا'}
             </a>
             <a href="https://chat.whatsapp.com/IYDbChe9mByEe2Ayy5rUfP?mode=ac_t" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
               {language === 'en' ? 'Join Groups' : 'انضم للمجموعات'}
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
