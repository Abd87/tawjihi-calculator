interface Subject {
  name: string
  maxMarks: number
  score: number
}

const getSubjectName = (subjectName: string, language: string) => {
  // Always use English names in PDF for better compatibility
  switch (subjectName) {
    case 'english': return 'English'
    case 'arabic': return 'Arabic'
    case 'islamic': return 'Islamic'
    case 'history': return 'History'
    default: return subjectName
  }
}

export const generatePDF = async (subjects: Subject[], result: { totalScore: number; percentage: number }, language: string, studentName: string) => {
  // Dynamically import jsPDF to avoid build issues
  const { jsPDF } = await import('jspdf')
  
  const doc = new jsPDF()
  
  // For Arabic support, we'll use a different approach
  // Since Arabic fonts are complex to embed, we'll use English labels but keep Arabic content where needed
  
  // Title
  const title = 'Tawjihi Result Certificate'
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 105, 20, { align: 'center' })
  
  // Website branding
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  const website = 'tawjihi-calculator.vercel.app'
  doc.text(website, 105, 30, { align: 'center' })
  
  // Line separator
  doc.line(20, 35, 190, 35)
  
  // Student name
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  const nameLabel = 'Student Name:'
  doc.text(nameLabel, 30, 50)
  doc.setFont('helvetica', 'normal')
  doc.text(studentName, 80, 50)
  
  // Date
  const dateLabel = 'Date:'
  doc.setFont('helvetica', 'bold')
  doc.text(dateLabel, 30, 65)
  doc.setFont('helvetica', 'normal')
  const currentDate = new Date().toLocaleDateString()
  doc.text(currentDate, 80, 65)
  
  // Table header
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  
  // Define table dimensions
  const tableStartX = 20
  const tableEndX = 190
  const subjectColX = 30
  const scoreColX = 120
  const maxColX = 150
  const percentageColX = 170
  
  // Draw table header
  doc.text('Subject', subjectColX, 85)
  doc.text('Score', scoreColX, 85)
  doc.text('Max', maxColX, 85)
  doc.text('Percentage', percentageColX, 85)
  
  // Draw top border
  doc.line(tableStartX, 90, tableEndX, 90)
  
  // Draw vertical lines for columns
  doc.line(subjectColX - 5, 85, subjectColX - 5, 90) // Left border
  doc.line(scoreColX - 5, 85, scoreColX - 5, 90)     // Score column left
  doc.line(maxColX - 5, 85, maxColX - 5, 90)         // Max column left
  doc.line(percentageColX - 5, 85, percentageColX - 5, 90) // Percentage column left
  doc.line(tableEndX, 85, tableEndX, 90)             // Right border
  
  // Subject scores in table format
  doc.setFont('helvetica', 'normal')
  let yPosition = 105
  
  subjects.forEach((subject) => {
    const subjectName = getSubjectName(subject.name, language)
    const score = subject.score.toString()
    const maxMarks = subject.maxMarks.toString()
    const percentage = ((subject.score / subject.maxMarks) * 100).toFixed(1) + '%'
    
    // Draw horizontal line for each row
    doc.line(tableStartX, yPosition - 5, tableEndX, yPosition - 5)
    
    // Draw vertical lines for each row
    doc.line(subjectColX - 5, yPosition - 10, subjectColX - 5, yPosition - 5)
    doc.line(scoreColX - 5, yPosition - 10, scoreColX - 5, yPosition - 5)
    doc.line(maxColX - 5, yPosition - 10, maxColX - 5, yPosition - 5)
    doc.line(percentageColX - 5, yPosition - 10, percentageColX - 5, yPosition - 5)
    doc.line(tableEndX, yPosition - 10, tableEndX, yPosition - 5)
    
    doc.text(subjectName, subjectColX, yPosition)
    doc.text(score, scoreColX, yPosition)
    doc.text(maxMarks, maxColX, yPosition)
    doc.text(percentage, percentageColX, yPosition)
    yPosition += 10
  })
  
  // Total row with thicker border
  doc.line(tableStartX, yPosition + 2, tableEndX, yPosition + 2)
  
  // Draw vertical lines for total row
  doc.line(subjectColX - 5, yPosition - 8, subjectColX - 5, yPosition + 2)
  doc.line(scoreColX - 5, yPosition - 8, scoreColX - 5, yPosition + 2)
  doc.line(maxColX - 5, yPosition - 8, maxColX - 5, yPosition + 2)
  doc.line(percentageColX - 5, yPosition - 8, percentageColX - 5, yPosition + 2)
  doc.line(tableEndX, yPosition - 8, tableEndX, yPosition + 2)
  
  yPosition += 10
  
  doc.setFont('helvetica', 'bold')
  const totalLabel = 'Total'
  const totalScore = result.totalScore.toString()
  const totalMax = '300'
  const totalPercentage = ((result.totalScore / 300) * 100).toFixed(1) + '%'
  
  doc.text(totalLabel, subjectColX, yPosition)
  doc.text(totalScore, scoreColX, yPosition)
  doc.text(totalMax, maxColX, yPosition)
  doc.text(totalPercentage, percentageColX, yPosition)
  
  // Draw bottom border for total row
  doc.line(tableStartX, yPosition + 5, tableEndX, yPosition + 5)
  
  // Draw final vertical lines
  doc.line(subjectColX - 5, yPosition, subjectColX - 5, yPosition + 5)
  doc.line(scoreColX - 5, yPosition, scoreColX - 5, yPosition + 5)
  doc.line(maxColX - 5, yPosition, maxColX - 5, yPosition + 5)
  doc.line(percentageColX - 5, yPosition, percentageColX - 5, yPosition + 5)
  doc.line(tableEndX, yPosition, tableEndX, yPosition + 5)
  
  // Final percentage result
  yPosition += 20
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const finalLabel = 'First Year Percentage (30%)'
  const finalPercentage = `${result.percentage.toFixed(2)}%`
  
  doc.text(finalLabel, 30, yPosition)
  doc.text(finalPercentage, 150, yPosition)
  
  // Contact information
  yPosition += 30
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  const contactLabel = 'Contact Information:'
  doc.text(contactLabel, 30, yPosition)
  
  yPosition += 10
  doc.setFont('helvetica', 'normal')
  doc.text('Developer: Abdlarahman Alshabatat', 30, yPosition)
  
  yPosition += 8
  doc.text('Email: ashbatat@gmail.com', 30, yPosition)
  
  yPosition += 8
  doc.text('Phone: +962 79 088 1392', 30, yPosition)
  
  // Website information
  yPosition += 15
  doc.setFont('helvetica', 'bold')
  const websiteLabel = 'Visit our website:'
  doc.text(websiteLabel, 30, yPosition)
  
  yPosition += 8
  doc.setFont('helvetica', 'normal')
  doc.text(website, 30, yPosition)
  
  // Footer
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const footer = 'Generated by Tawjihi Calculator - Developed by Abdlarahman Alshabatat'
  doc.text(footer, 105, 270, { align: 'center' })
  
  // Save the PDF
  doc.save(`tawjihi-result-${studentName}-${Date.now()}.pdf`)
}
