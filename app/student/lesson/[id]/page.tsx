"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { ArrowLeft, CheckCircle, Volume2 } from "lucide-react"

interface LessonContent {
  id: string
  title: string
  subject: "literacy" | "numeracy"
  difficulty: "beginner" | "intermediate" | "advanced"
  sections: Array<{
    title: string
    content: string
    examples?: string[]
    type: "text" | "interactive" | "practice"
  }>
  duration: number
}

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [lesson, setLesson] = useState<LessonContent | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()
        if (!authUser) {
          router.push("/auth/login")
          return
        }
        setUser(authUser)

        // Fetch user profile to get grade information
        const { data: profile, error: profileError } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (profileError) {
          console.error("Error fetching user profile:", profileError)
          // Default to grade 10 if profile not found
          setUserProfile({ grade: 10, language: 'en' })
        } else {
          setUserProfile(profile)
        }

        // Generate lesson content based on user's grade
        const userGrade = profile?.grade || 10
        const mockLesson: LessonContent = generateLessonByGrade(params.id as string, userGrade)
        setLesson(mockLesson)
      } catch (error) {
        console.error("Error loading lesson:", error)
      } finally {
        setLoading(false)
      }
    }

    loadLesson()
  }, [params.id, router, supabase])

  const generateLessonByGrade = (lessonId: string, grade: number): LessonContent => {
    if (grade === 7) {
      return {
        id: lessonId,
        title: "Basic Grammar & Sentence Structure",
        subject: "literacy",
        difficulty: "beginner",
        duration: 15,
        sections: [
          {
            title: "Introduction",
            type: "text",
            content: "Welcome! In this lesson, you will learn about basic grammar and sentence structure appropriate for Class 7 students.",
          },
          {
            title: "Parts of Speech",
            type: "interactive",
            content: "Let's understand the basic parts of speech: nouns, verbs, adjectives, and adverbs.",
            examples: [
              "Noun - A person, place, or thing (Example: book, school, teacher)",
              "Verb - An action word (Example: run, write, think)",
              "Adjective - Describes a noun (Example: beautiful, large, smart)",
            ],
          },
          {
            title: "Simple Sentences",
            type: "interactive",
            content: "Learn how to form simple sentences with subject and predicate.",
            examples: [
              "The cat (subject) sleeps (predicate).",
              "Students (subject) study hard (predicate).",
              "My mother (subject) cooks delicious food (predicate).",
            ],
          },
          {
            title: "Practice",
            type: "practice",
            content: "Now practice making your own simple sentences!",
          },
        ],
      }
    } else {
      // Grade 10 content
      return {
        id: lessonId,
        title: "Advanced Grammar & Literature Analysis",
        subject: "literacy",
        difficulty: "advanced",
        duration: 25,
        sections: [
          {
            title: "Introduction",
            type: "text",
            content: "Welcome! This lesson covers advanced grammar concepts and literature analysis for Class 10 board exam preparation.",
          },
          {
            title: "Complex Grammar",
            type: "interactive",
            content: "Study advanced grammar including conditional sentences, passive voice, and reported speech.",
            examples: [
              "Conditional: If I study hard, I will pass the exam.",
              "Passive Voice: The book was written by the author.",
              "Reported Speech: She said that she would come tomorrow.",
            ],
          },
          {
            title: "Literary Devices",
            type: "interactive",
            content: "Understand metaphors, similes, personification, and other literary devices used in poetry and prose.",
            examples: [
              "Metaphor: Life is a journey (Life = Journey)",
              "Simile: As brave as a lion (comparison using 'as')",
              "Personification: The wind whispered (wind given human quality)",
            ],
          },
          {
            title: "Board Exam Practice",
            type: "practice",
            content: "Practice with previous year board exam questions and essay writing techniques.",
          },
        ],
      }
    }
  }

  const handleCompleteLesson = async () => {
    try {
      if (!user || !lesson) return

      const { error } = await supabase.from("student_progress").insert({
        student_id: user.id,
        lesson_id: lesson.id,
        completed: true,
        score: 100,
        attempts: 1,
        completed_at: new Date(),
      })

      if (error) throw new Error(error.message)

      setCompleted(true)
      setTimeout(() => router.push("/student/learn"), 2000)
    } catch (error) {
      console.error("Error completing lesson:", error)
    }
  }

  if (loading) return <div className="text-center py-8">Loading lesson...</div>
  if (!lesson) return <div className="text-center py-8">Lesson not found</div>

  const currentLessonSection = lesson.sections[currentSection]
  const progress = ((currentSection + 1) / lesson.sections.length) * 100

  if (completed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center max-w-md">
          <CardContent className="pt-12 pb-12">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
            <p className="text-muted-foreground mb-6">Great job completing this lesson.</p>
            <Button onClick={() => router.push("/student/learn")} className="w-full">
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground">
            {lesson.duration} min • {lesson.difficulty}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Section {currentSection + 1} of {lesson.sections.length}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>{currentLessonSection.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground leading-relaxed">{currentLessonSection.content}</p>

          {currentLessonSection.examples && (
            <div className="space-y-3">
              <h3 className="font-semibold">Examples:</h3>
              {currentLessonSection.examples.map((example, idx) => (
                <div key={idx} className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-3">
                  <span className="text-primary font-bold">{idx + 1}.</span>
                  <span>{example}</span>
                </div>
              ))}
            </div>
          )}

          {/* Audio button for pronunciation */}
          {currentLessonSection.type === "interactive" && (
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Volume2 className="w-4 h-4" />
              Listen to Pronunciation
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentSection((prev) => Math.max(0, prev - 1))}
          disabled={currentSection === 0}
        >
          Previous
        </Button>

        {currentSection < lesson.sections.length - 1 ? (
          <Button onClick={() => setCurrentSection((prev) => prev + 1)} className="flex-1">
            Next Section
          </Button>
        ) : (
          <Button onClick={handleCompleteLesson} className="flex-1">
            Complete Lesson
          </Button>
        )}
      </div>
    </div>
  )
}
