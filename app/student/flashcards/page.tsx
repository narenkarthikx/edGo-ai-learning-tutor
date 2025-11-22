'use client'

import { useState, useEffect } from 'react'
import { FlashcardSelector } from '@/components/student/flashcard-selector'
import { FlashcardViewer } from '@/components/student/flashcard-viewer'
import { getFlashcards } from '@/lib/curriculum/flashcards-curriculum'
import { FlashcardSet } from '@/lib/curriculum/flashcards-curriculum'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function FlashcardsPage() {
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null)
  const [userGrade, setUserGrade] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user grade from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserGrade(user.grade || 10)
    } else {
      // Default to grade 10 if not set
      setUserGrade(10)
    }
    setLoading(false)
  }, [])

  const handleSelectSet = (subject: string, chapter: number) => {
    const flashcardSets = getFlashcards(userGrade!, subject, chapter)
    if (flashcardSets.length > 0) {
      setSelectedSet(flashcardSets[0])
    }
  }

  const handleComplete = () => {
    // Return to selector after completing
    setTimeout(() => {
      setSelectedSet(null)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!userGrade) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground">
              Please set up your profile to access flashcards.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {!selectedSet ? (
        <FlashcardSelector grade={userGrade} onSelectSet={handleSelectSet} />
      ) : (
        <FlashcardViewer flashcardSet={selectedSet} onComplete={handleComplete} />
      )}
    </div>
  )
}
