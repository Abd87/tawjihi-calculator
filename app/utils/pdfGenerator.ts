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
  const MyDocument = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>{language === 'ar' ? 'شهادة نتيجة التوجيهي' : 'Tawjihi Result Certificate'}</Text>
          </View>

          <View style={styles.section}>
            {subjects.map((subject) => (
              <View key={subject.name} style={styles.row}>
                <Text style={styles.label}>
                  {getSubjectName(subject.name, language)}
                </Text>
                <Text style={styles.value}>{subject.score}/{subject.maxMarks}</Text>
              </View>
            ))}
            <View style={styles.row}>
              <Text style={styles.label}>
                {language === 'ar' ? 'المجموع الكلي' : 'Total Score'}
              </Text>
              <Text style={styles.value}>{result.totalScore}/300</Text>
            </View>
          </View>

          <View style={styles.result}>
            <Text style={styles.resultText}>
              {language === 'ar' ? 'نسبة السنة الأولى (30%)' : 'First Year Percentage (30%)'}: {result.percentage.toFixed(2)}%
            </Text>
          </View>

          <View style={styles.footer}>
            <Text>
              {language === 'ar' ? 'تم التطوير بواسطة عبدالرحمن الشباطات' : 'Developed by Abdlarahman Alshabatat'}
            </Text>
          </View>
        </Page>
      </Document>
    )
  }

  const blob = await pdf(<MyDocument />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tawjihi-result-${Date.now()}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
