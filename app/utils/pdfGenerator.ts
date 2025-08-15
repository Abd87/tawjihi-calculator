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
  // Dynamically import jsPDF to avoid build issues
  const { jsPDF } = await import('jspdf')
  
  const doc = new jsPDF()
  
  // Title
  const title = language === 'ar' ? 'Tawjihi Result Certificate' : 'Tawjihi Result Certificate'
  doc.setFontSize(20)
  doc.text(title, 105, 20, { align: 'center' })
  
  // Line separator
  doc.line(20, 30, 190, 30)
  
  // Subject scores
  doc.setFontSize(12)
  let yPosition = 50
  
  subjects.forEach((subject) => {
    const subjectName = getSubjectName(subject.name, language)
    const score = `${subject.score}/${subject.maxMarks}`
    
    // For Arabic, use English labels but keep Arabic subject names
    const displayName = language === 'ar' ? 
      (subject.name === 'english' ? 'English' :
       subject.name === 'arabic' ? 'Arabic' :
       subject.name === 'islamic' ? 'Islamic' :
       subject.name === 'history' ? 'History' : subject.name) : subjectName
    
    doc.text(displayName, 30, yPosition)
    doc.text(score, 150, yPosition)
    yPosition += 10
  })
  
  // Total score
  doc.line(20, yPosition + 5, 190, yPosition + 5)
  yPosition += 15
  
  const totalLabel = 'Total Score'
  const totalScore = `${result.totalScore}/300`
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(totalLabel, 30, yPosition)
  doc.text(totalScore, 150, yPosition)
  
  // Percentage result
  yPosition += 20
  doc.setFontSize(16)
  const percentageLabel = 'First Year Percentage (30%)'
  const percentage = `${result.percentage.toFixed(2)}%`
  
  doc.text(percentageLabel, 30, yPosition)
  doc.text(percentage, 150, yPosition)
  
  // Footer
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const footer = 'Developed by Abdlarahman Alshabatat'
  doc.text(footer, 105, 270, { align: 'center' })
  
  // Save the PDF
  doc.save(`tawjihi-result-${Date.now()}.pdf`)
}
