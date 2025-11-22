'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Lightbulb, 
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  Brain
} from 'lucide-react'
import { Flashcard, FlashcardSet } from '@/lib/curriculum/flashcards-curriculum'
import { cn } from '@/lib/utils'

interface FlashcardViewerProps {
  flashcardSet: FlashcardSet
  onComplete?: (results: FlashcardResult) => void
}

interface FlashcardResult {
  totalCards: number
  correct: number
  incorrect: number
  skipped: number
  accuracy: number
}

export function FlashcardViewer({ flashcardSet, onComplete }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [results, setResults] = useState<Record<string, 'correct' | 'incorrect' | 'skipped'>>({})
  const [isComplete, setIsComplete] = useState(false)

  const currentCard = flashcardSet.cards[currentIndex]
  const progress = ((currentIndex + 1) / flashcardSet.cards.length) * 100
  const answeredCount = Object.keys(results).length

  useEffect(() => {
    setIsFlipped(false)
    setShowHint(false)
  }, [currentIndex])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentIndex < flashcardSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      completeSession()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleMarkResult = (result: 'correct' | 'incorrect' | 'skipped') => {
    setResults(prev => ({
      ...prev,
      [currentCard.id]: result
    }))
    
    // Auto advance after marking
    setTimeout(() => {
      handleNext()
    }, 500)
  }

  const completeSession = () => {
    setIsComplete(true)
    
    const correct = Object.values(results).filter(r => r === 'correct').length
    const incorrect = Object.values(results).filter(r => r === 'incorrect').length
    const skipped = flashcardSet.cards.length - correct - incorrect
    const accuracy = correct / flashcardSet.cards.length * 100

    const finalResults: FlashcardResult = {
      totalCards: flashcardSet.cards.length,
      correct,
      incorrect,
      skipped,
      accuracy
    }

    if (onComplete) {
      onComplete(finalResults)
    }
  }

  const restartSession = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowHint(false)
    setResults({})
    setIsComplete(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (isComplete) {
    const correct = Object.values(results).filter(r => r === 'correct').length
    const incorrect = Object.values(results).filter(r => r === 'incorrect').length
    const accuracy = (correct / flashcardSet.cards.length * 100)

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Session Complete! 🎉</CardTitle>
          <CardDescription>
            Great work on {flashcardSet.chapterTitle}!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{correct}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{incorrect}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{accuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
            <p className="text-lg font-medium mb-2">
              {accuracy >= 80 ? '🌟 Excellent!' : accuracy >= 60 ? '👍 Good Job!' : '💪 Keep Practicing!'}
            </p>
            <p className="text-sm text-muted-foreground">
              {accuracy >= 80 
                ? 'You have mastered this topic!' 
                : accuracy >= 60 
                ? 'You\'re doing well! Review the ones you missed.' 
                : 'Don\'t worry! Practice makes perfect. Try again!'}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4">
          <Button onClick={restartSession} className="flex-1" variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={() => window.location.reload()} className="flex-1">
            <BookOpen className="w-4 h-4 mr-2" />
            Choose Another Topic
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Card {currentIndex + 1} of {flashcardSet.cards.length}</span>
          <span>{answeredCount} answered</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
      <div key={currentCard.id}>
        <Card 
          className={cn(
            "min-h-[400px] cursor-pointer transition-all duration-300 hover:shadow-lg",
            isFlipped && "shadow-xl"
          )}
          onClick={handleFlip}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-xs mb-2">
                  Chapter {currentCard.chapter} • {currentCard.topic}
                </CardDescription>
                <Badge className={getDifficultyColor(currentCard.difficulty)}>
                  {currentCard.difficulty}
                </Badge>
              </div>
              {results[currentCard.id] && (
                <Badge 
                  variant={results[currentCard.id] === 'correct' ? 'default' : 'destructive'}
                >
                  {results[currentCard.id] === 'correct' ? '✓ Correct' : '✗ Incorrect'}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="min-h-[250px] flex flex-col justify-center">
            {!isFlipped ? (
              <div className="text-center">
                <div className="mb-4">
                  <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  {currentCard.question}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click card to reveal answer
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                </div>
                <p className="text-lg md:text-xl mb-4 text-green-600 dark:text-green-400 font-medium">
                  {currentCard.answer}
                </p>
                <p className="text-sm text-muted-foreground">
                  Click card to see question again
                </p>
              </div>
            )}

            {/* Hint Section */}
            {currentCard.hint && !isFlipped && (
              <div className="mt-6">
                {!showHint ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowHint(true)
                    }}
                    className="mx-auto"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Show Hint
                  </Button>
                ) : (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-900 dark:text-yellow-100">
                        {currentCard.hint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-4">
            {/* Mark Result Buttons (shown only when flipped) */}
            {isFlipped && !results[currentCard.id] && (
              <div className="flex gap-2 w-full">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMarkResult('incorrect')
                  }}
                  variant="outline"
                  className="flex-1 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Incorrect
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMarkResult('correct')
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Correct
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-2 w-full">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                variant="outline"
                disabled={currentIndex === 0}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  if (!results[currentCard.id]) {
                    handleMarkResult('skipped')
                  } else {
                    handleNext()
                  }
                }}
                variant="outline"
                className="flex-1"
              >
                {currentIndex === flashcardSet.cards.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
          <div className="font-bold text-green-600">
            {Object.values(results).filter(r => r === 'correct').length}
          </div>
          <div className="text-muted-foreground">Correct</div>
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
          <div className="font-bold text-red-600">
            {Object.values(results).filter(r => r === 'incorrect').length}
          </div>
          <div className="text-muted-foreground">Incorrect</div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="font-bold">
            {flashcardSet.cards.length - answeredCount}
          </div>
          <div className="text-muted-foreground">Remaining</div>
        </div>
      </div>
    </div>
  )
}
