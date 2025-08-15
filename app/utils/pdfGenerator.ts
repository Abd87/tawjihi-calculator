import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  label: {
    width: '50%',
    fontSize: 12,
    color: '#374151',
  },
  value: {
    width: '50%',
    fontSize: 12,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1f2937',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#6b7280',
  },
})

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
  try {
    const MyDocument = Document({
      children: [
        Page({
          size: 'A4',
          style: styles.page,
          children: [
            View({
              style: styles.header,
              children: [
                Text({
                  children: language === 'ar' ? 'شهادة نتيجة التوجيهي' : 'Tawjihi Result Certificate'
                })
              ]
            }),
            View({
              style: styles.section,
              children: [
                ...subjects.map((subject) =>
                  View({
                    key: subject.name,
                    style: styles.row,
                    children: [
                      Text({
                        style: styles.label,
                        children: getSubjectName(subject.name, language)
                      }),
                      Text({
                        style: styles.value,
                        children: `${subject.score}/${subject.maxMarks}`
                      })
                    ]
                  })
                ),
                View({
                  style: styles.row,
                  children: [
                    Text({
                      style: styles.label,
                      children: language === 'ar' ? 'المجموع الكلي' : 'Total Score'
                    }),
                    Text({
                      style: styles.value,
                      children: `${result.totalScore}/300`
                    })
                  ]
                })
              ]
            }),
            View({
              style: styles.result,
              children: [
                Text({
                  style: styles.resultText,
                  children: `${language === 'ar' ? 'نسبة السنة الأولى (30%)' : 'First Year Percentage (30%)'}: ${result.percentage.toFixed(2)}%`
                })
              ]
            }),
            View({
              style: styles.footer,
              children: [
                Text({
                  children: language === 'ar' ? 'تم التطوير بواسطة عبدالرحمن الشباطات' : 'Developed by Abdlarahman Alshabatat'
                })
              ]
            })
          ]
        })
      ]
    })

    const blob = await pdf(MyDocument).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tawjihi-result-${Date.now()}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('PDF generation failed:', error)
    // Fallback: create a simple text file
    const content = `
Tawjihi Result Certificate
==========================

${subjects.map(subject => `${getSubjectName(subject.name, language)}: ${subject.score}/${subject.maxMarks}`).join('\n')}

Total Score: ${result.totalScore}/300
First Year Percentage (30%): ${result.percentage.toFixed(2)}%

Developed by Abdlarahman Alshabatat
    `.trim()
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tawjihi-result-${Date.now()}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }
}
