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
  
  // Professional Table Design
  const tableStartX = 20
  const tableEndX = 190
  const tableStartY = 80
  const rowHeight = 12
  const cellPadding = 5
  
  // Column positions
  const col1X = tableStartX + cellPadding
  const col2X = 70 + cellPadding
  const col3X = 110 + cellPadding
  const col4X = 150 + cellPadding
  
  // Column widths
  const col1Width = 50
  const col2Width = 30
  const col3Width = 30
  const col4Width = 40
  
  // Draw table header
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  
  // Header background (light gray)
  doc.setFillColor(240, 240, 240)
  doc.rect(tableStartX, tableStartY, tableEndX - tableStartX, rowHeight, 'F')
  
  // Header text
  doc.setTextColor(0, 0, 0)
  doc.text('Subject', col1X, tableStartY + 8)
  doc.text('Score', col2X, tableStartY + 8)
  doc.text('Max', col3X, tableStartY + 8)
  doc.text('Percentage', col4X, tableStartY + 8)
  
  // Header border
  doc.setDrawColor(100, 100, 100)
  doc.setLineWidth(0.5)
  doc.rect(tableStartX, tableStartY, tableEndX - tableStartX, rowHeight)
  
  // Draw vertical lines for header
  doc.line(col2X - cellPadding, tableStartY, col2X - cellPadding, tableStartY + rowHeight)
  doc.line(col3X - cellPadding, tableStartY, col3X - cellPadding, tableStartY + rowHeight)
  doc.line(col4X - cellPadding, tableStartY, col4X - cellPadding, tableStartY + rowHeight)
  
  // Subject rows
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  let currentY = tableStartY + rowHeight
  
  subjects.forEach((subject, index) => {
    const subjectName = getSubjectName(subject.name, language)
    const score = subject.score.toString()
    const maxMarks = subject.maxMarks.toString()
    const percentage = ((subject.score / subject.maxMarks) * 100).toFixed(1) + '%'
    
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250)
      doc.rect(tableStartX, currentY, tableEndX - tableStartX, rowHeight, 'F')
    } else {
      doc.setFillColor(255, 255, 255)
      doc.rect(tableStartX, currentY, tableEndX - tableStartX, rowHeight, 'F')
    }
    
    // Row border
    doc.setDrawColor(200, 200, 200)
    doc.rect(tableStartX, currentY, tableEndX - tableStartX, rowHeight)
    
    // Vertical lines
    doc.line(col2X - cellPadding, currentY, col2X - cellPadding, currentY + rowHeight)
    doc.line(col3X - cellPadding, currentY, col3X - cellPadding, currentY + rowHeight)
    doc.line(col4X - cellPadding, currentY, col4X - cellPadding, currentY + rowHeight)
    
    // Cell content
    doc.text(subjectName, col1X, currentY + 8)
    doc.text(score, col2X, currentY + 8)
    doc.text(maxMarks, col3X, currentY + 8)
    doc.text(percentage, col4X, currentY + 8)
    
    currentY += rowHeight
  })
  
  // Total row with special styling
  doc.setFillColor(52, 73, 94)
  doc.rect(tableStartX, currentY, tableEndX - tableStartX, rowHeight, 'F')
  
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  
  const totalLabel = 'Total'
  const totalScore = result.totalScore.toString()
  const totalMax = '300'
  const totalPercentage = ((result.totalScore / 300) * 100).toFixed(1) + '%'
  
  // Total row border
  doc.setDrawColor(52, 73, 94)
  doc.setLineWidth(1)
  doc.rect(tableStartX, currentY, tableEndX - tableStartX, rowHeight)
  
  // Vertical lines for total row
  doc.line(col2X - cellPadding, currentY, col2X - cellPadding, currentY + rowHeight)
  doc.line(col3X - cellPadding, currentY, col3X - cellPadding, currentY + rowHeight)
  doc.line(col4X - cellPadding, currentY, col4X - cellPadding, currentY + rowHeight)
  
  doc.text(totalLabel, col1X, currentY + 8)
  doc.text(totalScore, col2X, currentY + 8)
  doc.text(totalMax, col3X, currentY + 8)
  doc.text(totalPercentage, col4X, currentY + 8)
  
  currentY += rowHeight + 20
  
  // Final percentage result
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  const finalLabel = 'First Year Percentage (30%)'
  const finalPercentage = `${result.percentage.toFixed(2)}%`
  
  doc.text(finalLabel, 30, currentY)
  doc.text(finalPercentage, 150, currentY)
  
  // Contact information
  currentY += 30
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  const contactLabel = 'Contact Information:'
  doc.text(contactLabel, 30, currentY)
  
  currentY += 10
  doc.setFont('helvetica', 'normal')
  doc.text('Developer: Abdlarahman Alshabatat', 30, currentY)
  
  currentY += 8
  doc.text('Email: ashbatat@gmail.com', 30, currentY)
  
  currentY += 8
  doc.text('Phone: +962 79 088 1392', 30, currentY)
  
  // Website information
  currentY += 15
  doc.setFont('helvetica', 'bold')
  const websiteLabel = 'Visit our website:'
  doc.text(websiteLabel, 30, currentY)
  
  currentY += 8
  doc.setFont('helvetica', 'normal')
  doc.text(website, 30, currentY)
  
  // Footer
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const footer = 'Generated by Tawjihi Calculator - Developed by Abdlarahman Alshabatat'
  doc.text(footer, 105, 270, { align: 'center' })
  
  // Save the PDF
  doc.save(`tawjihi-result-${studentName}-${Date.now()}.pdf`)
}
