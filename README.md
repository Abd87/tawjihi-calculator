# Tawjihi Calculator - حاسبة التوجيهي

A modern, bilingual web application for calculating Tawjihi (Jordanian high school) exam percentages. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Accurate Calculations**: Calculate your Tawjihi percentage based on subject scores
- 🌐 **Bilingual Support**: Full English and Arabic language support
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations
- 📊 **PDF Export**: Download your results as a PDF document
- 🔄 **Real-time Updates**: Instant calculation updates as you enter scores

## Prerequisites

Before running this project, you need to install:

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS version for stability

2. **npm** (comes with Node.js)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd tawjihi-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## How to Use

1. **Select Language**: Choose between English and Arabic using the language toggle button
2. **Enter Scores**: Input your scores for each subject:
   - English (اللغة الإنجليزية)
   - Islamic Studies (التربية الإسلامية)
   - Arabic (اللغة العربية)
   - History (التاريخ)
3. **Calculate**: Click the "Calculate" button to see your results
4. **View Results**: See your total score and percentage
5. **Download**: Optionally download your results as a PDF

## Project Structure

```
tawjihi-calculator/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main calculator page
│   └── providers.tsx        # Language context and translations
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library
- **React PDF** - PDF generation
- **Supabase** - Backend services (for future features)

## Features in Development

- [ ] PDF result download
- [ ] Contact form integration
- [ ] Social media links
- [ ] Study resources section
- [ ] FAQ section
- [ ] User accounts and result history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions:
- Create an issue on GitHub
- Contact the development team
- Join our WhatsApp group

## Acknowledgments

- Ministry of Education, Jordan
- Tawjihi students and teachers
- Open source community

---

**Note**: This calculator is for educational purposes. For official results, please refer to the Ministry of Education.
