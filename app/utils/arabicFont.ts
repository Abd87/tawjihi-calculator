// Arabic font for PDF generation
// This is a simplified Arabic font encoded in base64
export const arabicFontBase64 = `
// Note: This is a placeholder for a proper Arabic font
// In a real implementation, you would need to include a complete Arabic font file
// For now, we'll use English labels in the PDF to ensure compatibility
`

// Function to get Arabic text in English for PDF
export const getArabicTextInEnglish = (text: string): string => {
  const translations: { [key: string]: string } = {
    'اللغة الإنجليزية': 'English Language',
    'اللغة العربية': 'Arabic Language', 
    'التربية الإسلامية': 'Islamic Education',
    'التاريخ': 'History',
    'احسب': 'Calculate',
    'إعادة تعيين': 'Reset',
    'النتيجة': 'Result',
    'المجموع': 'Total Score',
    'النسبة المئوية': 'Percentage',
    'تحميل PDF': 'Download PDF',
    'أدخل اسمك': 'Enter Your Name',
    'حاسبة التوجيهي': 'Tawjihi Calculator',
    'احسب نسبة التوجيهي': 'Calculate Tawjihi Percentage'
  }
  
  return translations[text] || text
}
