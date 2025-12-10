# Edvion - Learning with Vision

An intelligent AI-powered tutoring platform for Tamil Nadu State Board students with multi-agent system, adaptive learning, and comprehensive curriculum coverage.

## ✨ Key Features

- **6 Specialized AI Agents** - Content Generator, Gap Analyzer, Assessment, Motivator, AI Tutor, General Assistant
- **Adaptive Learning** - Personalized learning paths based on student performance
- **Interactive Flashcards** - Grade-specific flashcards for all subjects
- **Smart Assessments** - Adaptive testing with automatic gap detection
- **Progress Tracking** - Visual dashboards for students and teachers
- **Multilingual Support** - Tamil, English, and Hindi
- **Teacher Analytics** - Comprehensive class and student performance insights

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Add your Supabase and Gemini API credentials

# Run database setup
# Execute scripts/setup-database.sql in Supabase SQL Editor

# Start development server
npm run dev
```

**📖 Full setup instructions:** [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **AI**: Google Gemini 2.5-flash
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Authentication
- **UI**: Shadcn/ui Components

## 📖 Documentation

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Commands and quick links
- **[SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)** - System overview and tech stack
- **[VISUAL_DIAGRAMS.md](./VISUAL_DIAGRAMS.md)** - Architecture diagrams

### Feature Guides
- [ADK AI Agents](./docs/ADK_AGENTS_GUIDE.md)
- [Flashcards System](./docs/FLASHCARDS_GUIDE.md)
- [Curriculum Guide](./docs/CLASS10_CURRICULUM_GUIDE.md)

## 📁 Project Structure

```
edvion/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (AI, assessments)
│   ├── student/           # Student dashboard
│   └── teacher/           # Teacher dashboard
├── components/            # React components
├── lib/                   # Core logic (AI, curriculum, utils)
└── docs/                  # Documentation
```

## 🎓 Supported

- **Grades**: Class 7 & 10 (Tamil Nadu State Board)
- **Subjects**: Mathematics, Science, English, Social Science, Tamil
- **Languages**: Tamil, English, Hindi

---

**Built with ❤️ for Tamil Nadu students**
