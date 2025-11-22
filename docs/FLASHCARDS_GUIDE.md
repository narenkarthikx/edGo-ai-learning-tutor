# 🎴 Interactive Flashcards System

An intuitive and comprehensive flashcard learning system for Tamil Nadu curriculum students (Class 7 & Class 10).

## ✨ Features

### 🎯 Core Features
- **Grade-Specific Content**: Separate flashcard sets for Class 7 and Class 10
- **Multi-Subject Support**: Mathematics, Science, and more
- **Chapter-Based Organization**: Flashcards organized by curriculum chapters
- **Difficulty Levels**: Easy, Medium, and Hard cards for progressive learning
- **Interactive Flipping**: Click to flip between question and answer
- **Built-in Hints**: Helpful hints to guide learning
- **Progress Tracking**: Track correct, incorrect, and skipped cards
- **Completion Statistics**: View accuracy and performance metrics

### 📊 Learning Analytics
- Real-time progress tracking
- Performance metrics (Correct/Incorrect/Skipped)
- Accuracy percentage calculation
- Visual feedback on completion

### 🎨 User Experience
- Clean, modern interface
- Color-coded difficulty badges
- Smooth transitions
- Mobile-responsive design
- Dark mode support

## 📚 Content Structure

### Class 7 Flashcards
**Mathematics:**
- Chapter 1: Integers (4 cards)
- Chapter 2: Fractions and Decimals (3 cards)

**Science:**
- Chapter 1: Nutrition in Plants (4 cards)

### Class 10 Flashcards
**Mathematics:**
- Chapter 1: Real Numbers (4 cards)
- Chapter 4: Quadratic Equations (4 cards)
- Chapter 8: Introduction to Trigonometry (3 cards)

**Science:**
- Chapter 3: Electricity (4 cards)
- Chapter 5: Acids, Bases and Salts (4 cards)

## 🚀 Usage

### For Students

1. **Navigate to Flashcards**
   - Go to `/student/flashcards`
   - Or click "Flashcards" in the sidebar

2. **Select Subject**
   - Choose Mathematics, Science, or other available subjects
   - View available chapters

3. **Choose Chapter**
   - Select a chapter to start practicing
   - See total number of flashcards available

4. **Practice**
   - Click card to flip between question and answer
   - Use "Show Hint" if you need help
   - Mark your answer as Correct or Incorrect
   - Navigate with Previous/Next buttons

5. **Review Results**
   - View completion summary
   - See accuracy percentage
   - Option to retry or choose another topic

### For Developers

#### Adding New Flashcards

Edit `lib/flashcards-curriculum.ts`:

```typescript
{
  subject: 'mathematics',
  grade: 10,
  chapter: 1,
  chapterTitle: 'Real Numbers',
  cards: [
    {
      id: 'math-10-1-1',
      question: 'What is Euclid\'s Division Lemma?',
      answer: 'For any positive integers a and b...',
      hint: 'Think of division: dividend = ...',
      difficulty: 'medium',
      topic: 'Euclid\'s Division Algorithm',
      chapter: 1
    }
  ]
}
```

#### AI-Generated Flashcards

Use the API endpoint `/api/generate-flashcards`:

```typescript
const response = await fetch('/api/generate-flashcards', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    subject: 'mathematics',
    grade: 10,
    chapter: 1,
    chapterTitle: 'Real Numbers',
    count: 10
  })
})

const { flashcards } = await response.json()
```

## 📁 File Structure

```
lib/
  └── flashcards-curriculum.ts    # Flashcard data and utilities

components/student/
  ├── flashcard-viewer.tsx         # Main flashcard component
  └── flashcard-selector.tsx       # Subject/chapter selector

app/
  ├── student/flashcards/
  │   └── page.tsx                 # Flashcards page
  └── api/generate-flashcards/
      └── route.ts                 # AI flashcard generation
```

## 🎓 Learning Benefits

### Active Recall
Test yourself instead of passive reading, which strengthens memory

### Spaced Repetition
Review concepts at optimal intervals for long-term retention

### Self-Assessment
Immediate feedback helps identify areas needing more practice

### Confidence Building
Progressive difficulty levels build confidence step by step

## 🔧 Technical Details

### Components

**FlashcardViewer**
- Props: `flashcardSet`, `onComplete`
- Features: Flip animation, hint system, progress tracking
- State management: Current card, flip state, results

**FlashcardSelector**
- Props: `grade`, `onSelectSet`
- Features: Subject selection, chapter browsing
- Displays: Card count, difficulty distribution

### Data Structure

```typescript
interface Flashcard {
  id: string
  question: string
  answer: string
  hint?: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  chapter: number
}

interface FlashcardSet {
  subject: string
  grade: number
  chapter: number
  chapterTitle: string
  cards: Flashcard[]
}
```

### Utility Functions

- `getFlashcards(grade, subject, chapter?)` - Get flashcard sets
- `getAvailableChapters(grade, subject)` - List available chapters
- `getRandomFlashcards(grade, subject, count)` - Random selection
- `getFlashcardsByDifficulty(grade, subject, difficulty)` - Filter by difficulty

## 🎨 Design Philosophy

1. **Simplicity**: Clean interface without distractions
2. **Intuitive**: Natural flip interaction
3. **Encouraging**: Positive feedback and progress visualization
4. **Accessible**: Works on all devices and screen sizes
5. **Performance**: Fast loading and smooth animations

## 🌟 Future Enhancements

- [ ] More subjects (English, Social Science, Tamil)
- [ ] More chapters for existing subjects
- [ ] Spaced repetition algorithm
- [ ] Study streak tracking
- [ ] Collaborative flashcard creation
- [ ] Export/Import flashcard sets
- [ ] Audio pronunciation for language cards
- [ ] Image-based flashcards
- [ ] Offline mode support

## 📱 Mobile Optimization

- Touch-friendly tap to flip
- Swipe gestures for navigation
- Responsive layout for all screen sizes
- Optimized for portrait and landscape modes

## 🤝 Contributing

To add more flashcards:

1. Follow the existing data structure
2. Ensure questions are clear and educational
3. Provide helpful hints
4. Mix difficulty levels appropriately
5. Align with Tamil Nadu curriculum
6. Test on both mobile and desktop

## 📝 Best Practices

### Creating Flashcards

1. **Questions**: Clear, concise, tests understanding
2. **Answers**: Detailed with explanations
3. **Hints**: Guide thinking without revealing answer
4. **Difficulty**: 
   - Easy: Basic definitions, simple concepts
   - Medium: Application, understanding
   - Hard: Complex problems, analysis

### Study Tips

1. Start with easy cards to build confidence
2. Use hints before flipping if stuck
3. Mark honestly to track real progress
4. Review incorrect cards more frequently
5. Practice regularly in short sessions

---

**Built for Tamil Nadu Government School Students** 🇮🇳
