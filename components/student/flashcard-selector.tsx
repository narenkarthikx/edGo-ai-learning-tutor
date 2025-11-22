'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react'
import { getFlashcards, getAvailableChapters } from '@/lib/curriculum/flashcards-curriculum'

interface FlashcardSelectorProps {
  grade: number
  onSelectSet: (subject: string, chapter: number) => void
}

export function FlashcardSelector({ grade, onSelectSet }: FlashcardSelectorProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const subjects = grade === 7
    ? [
        { id: 'mathematics', name: 'Mathematics', icon: '🔢', color: 'from-blue-500 to-cyan-500' },
        { id: 'science', name: 'Science', icon: '🔬', color: 'from-green-500 to-emerald-500' },
      ]
    : [
        { id: 'mathematics', name: 'Mathematics', icon: '🔢', color: 'from-blue-500 to-cyan-500' },
        { id: 'science', name: 'Science', icon: '🔬', color: 'from-green-500 to-emerald-500' },
      ]

  if (!selectedSubject) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Flashcards for Class {grade}
          </h1>
          <p className="text-lg text-muted-foreground">
            Master your concepts with interactive flashcards!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const availableChapters = getAvailableChapters(grade, subject.id)
            const totalFlashcards = getFlashcards(grade, subject.id).reduce(
              (sum, set) => sum + set.cards.length,
              0
            )

            return (
              <Card
                key={subject.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${subject.color} flex items-center justify-center text-3xl mb-4`}>
                    {subject.icon}
                  </div>
                  <CardTitle className="text-2xl">{subject.name}</CardTitle>
                  <CardDescription>
                    Class {grade} Tamil Nadu Curriculum
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>{availableChapters.length} Chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                      <span>{totalFlashcards} Cards</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">How Flashcards Help You Learn</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Active Recall:</strong> Test yourself instead of passive reading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Spaced Repetition:</strong> Review concepts at the right intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Track Progress:</strong> See your improvement in real-time</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const availableChapters = getAvailableChapters(grade, selectedSubject)
  const flashcardSets = getFlashcards(grade, selectedSubject)
  const selectedSubjectInfo = subjects.find(s => s.id === selectedSubject)!

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setSelectedSubject(null)}
        >
          ← Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>{selectedSubjectInfo.icon}</span>
            {selectedSubjectInfo.name} Flashcards
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a chapter to start practicing
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {flashcardSets.map((set) => (
          <Card
            key={set.chapter}
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => onSelectSet(selectedSubject, set.chapter)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Chapter {set.chapter}
                  </Badge>
                  <CardTitle className="text-lg">{set.chapterTitle}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{set.cards.length}</div>
                  <div className="text-xs text-muted-foreground">cards</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {set.cards.slice(0, 3).map((card, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline"
                    className={
                      card.difficulty === 'easy' 
                        ? 'border-green-500 text-green-700' 
                        : card.difficulty === 'medium'
                        ? 'border-yellow-500 text-yellow-700'
                        : 'border-red-500 text-red-700'
                    }
                  >
                    {card.difficulty}
                  </Badge>
                ))}
                {set.cards.length > 3 && (
                  <Badge variant="outline">+{set.cards.length - 3} more</Badge>
                )}
              </div>
              <Button className="w-full mt-4" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {flashcardSets.length === 0 && (
        <Card className="text-center p-12">
          <CardContent>
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="mb-2">No Flashcards Available Yet</CardTitle>
            <CardDescription>
              Flashcards for this subject are coming soon!
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
