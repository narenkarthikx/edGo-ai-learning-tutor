# Library Structure

This folder contains all the core business logic and utilities for the AI Skill Gap Radar project.

## 📁 Folder Organization

### `/ai` - AI & Machine Learning
Contains AI-related functionality and agent systems:
- **`adk-agents.ts`** - ADK multi-agent system (6 specialized AI agents)
- **`ai-tutor.ts`** - AI tutoring functionality
- **`gap-detection.ts`** - Learning gap detection algorithms

### `/curriculum` - Educational Content
Contains curriculum data and flashcard systems:
- **`class10-curriculum.ts`** - Tamil Nadu Class 10 curriculum data
- **`flashcards-curriculum.ts`** - Flashcard content for all subjects and grades

### `/utils` - Utilities
Contains helper functions and configurations:
- **`i18n/`** - Internationalization with react-i18next
  - `i18n.ts` - i18n configuration
  - `locales/` - Translation JSON files (English, Hindi, Telugu, Tamil)
- **`utils.ts`** - General utility functions

### `/supabase` - Database
Contains Supabase client and database-related utilities:
- Supabase client configuration
- Database helper functions

## 🔧 Core Files

### `supabase.ts`
Supabase client initialization and configuration for database operations.

## 📝 Usage Examples

### Importing AI Agents
```typescript
import { initializeADKSystem } from '@/lib/ai/adk-agents'
```

### Importing Curriculum Data
```typescript
import { TAMIL_NADU_CLASS_10_CURRICULUM } from '@/lib/curriculum/class10-curriculum'
import { getFlashcards } from '@/lib/curriculum/flashcards-curriculum'
```

### Importing Utilities
```typescript
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

// Example usage
const { t } = useTranslation()
const welcomeText = t('common.welcome')
```

### Importing Supabase
```typescript
import { supabase } from '@/lib/supabase'
```

## 🎯 Key Features

- **6 Specialized AI Agents**: Content Generator, Gap Analyzer, Assessment, Motivator, Tutor, General Assistant
- **Multi-grade Support**: Class 7 and Class 10 Tamil Nadu curriculum
- **Multi-language**: English, Hindi, Telugu, Tamil with react-i18next
- **Adaptive Learning**: Gap detection and personalized recommendations
- **Interactive Flashcards**: Subject-wise flashcard sets with progress tracking
