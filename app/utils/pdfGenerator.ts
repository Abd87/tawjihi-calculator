interface Subject {
  name: string
  maxMarks: number
  score: number
}

const getSubjectName = (subjectName: string, language: string) => {
  if (language === 'ar') {
    switch (subjectName) {
      case 'english': return 'اللغة الإنجليزية'
      case 'arabic': return 'اللغة العربية'
      case 'islamic': return 'التربية الإسلامية'
      case 'history': return 'التاريخ'
      default: return subjectName
    }
  } else {
    switch (subjectName) {
      case 'english': return 'English'
      case 'arabic': return 'Arabic'
      case 'islamic': return 'Islamic'
      case 'history': return 'History'
      default: return subjectName
    }
  }
}

export const generatePDF = async (subjects: Subject[], result: { totalScore: number; percentage: number }, language: string) => {
  // Create a formatted text file with the results
  const content = language === 'ar' ? `
شهادة نتيجة التوجيهي
====================

${subjects.map(subject => `${getSubjectName(subject.name, language)}: ${subject.score}/${subject.maxMarks}`).join('\n')}

المجموع الكلي: ${result.totalScore}/300
نسبة السنة الأولى (30%): ${result.percentage.toFixed(2)}%

تم التطوير بواسطة عبدالرحمن الشباطات
  `.trim() : `
Tawjihi Result Certificate
==========================

${subjects.map(subject => `${getSubjectName(subject.name, language)}: ${subject.score}/${subject.maxMarks}`).join('\n')}

Total Score: ${result.totalScore}/300
First Year Percentage (30%): ${result.percentage.toFixed(2)}%

Developed by Abdlarahman Alshabatat
  `.trim()
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tawjihi-result-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
}
