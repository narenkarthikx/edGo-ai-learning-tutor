"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { CheckCircle, RotateCcw } from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "reading"
  difficulty: "beginner" | "intermediate" | "advanced"
  options?: string[]
  correctAnswer?: string
  passage?: string
}

export default function LiteracyAssessmentPage() {
  const router = useRouter()
  const supabase = createClient()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }
        setUser(user)

        const { data, error } = await supabase.from("lessons").select("*").eq("subject", "literacy").limit(5)

        if (error) throw new Error(error.message)

        // Generate mock questions if no data
        const mockQuestions: Question[] = [
          {
            id: "1",
            question: 'What does the word "beautiful" mean?',
            type: "multiple-choice",
            difficulty: "beginner",
            options: ["Ugly and plain", "Attractive and pleasing", "Boring and dull", "Strange and odd"],
            correctAnswer: "Attractive and pleasing",
          },
          {
            id: "2",
            question: "Which word is spelled correctly?",
            type: "multiple-choice",
            difficulty: "beginner",
            options: ["Freind", "Frend", "Friend", "Freend"],
            correctAnswer: "Friend",
          },
          {
            id: "3",
            question: "Read the passage and answer: The cat sat on the mat. What animal is mentioned?",
            type: "reading",
            difficulty: "intermediate",
            passage: "The cat sat on the mat and looked out the window.",
            options: ["Dog", "Cat", "Bird", "Mouse"],
            correctAnswer: "Cat",
          },
          {
            id: "4",
            question: "What is the main idea of a story?",
            type: "multiple-choice",
            difficulty: "intermediate",
            options: [
              "The first sentence",
              "The central or most important point",
              "The number of paragraphs",
              "The longest sentence",
            ],
            correctAnswer: "The central or most important point",
          },
          {
            id: "5",
            question: "Which sentence is grammatically correct?",
            type: "multiple-choice",
            difficulty: "advanced",
            options: [
              "She go to school every day",
              "She goes to school every day",
              "She going to school every day",
              "She gone to school every day",
            ],
            correctAnswer: "She goes to school every day",
          },
        ]

        setQuestions(mockQuestions)
      } catch (error) {
        console.error("Error loading assessment:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAssessment()
  }, [router, supabase])

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))

    // Calculate score
    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1)
    }

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 500)
    } else {
      completeAssessment()
    }
  }

  const completeAssessment = async () => {
    try {
      if (!user) return

      const finalScore = Math.round((score / questions.length) * 100)

      const { error } = await supabase.from("student_progress").insert({
        student_id: user.id,
        lesson_id: "literacy-assessment",
        completed: true,
        score: finalScore,
        attempts: 1,
        completed_at: new Date(),
      })

      if (error) throw new Error(error.message)

      if (finalScore < 50) {
        await supabase.from("learning_gaps").insert({
          student_id: user.id,
          area: "General Literacy",
          severity: "high",
          recommendation: "Focus on basic phonetics and word recognition",
        })
      }

      setCompleted(true)
    } catch (error) {
      console.error("Error completing assessment:", error)
    }
  }

  if (loading) return <div className="text-center py-8">Loading assessment...</div>

  if (completed) {
    const finalScore = Math.round((score / questions.length) * 100)

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Assessment Complete!</h2>
            <p className="text-muted-foreground mb-8">Your literacy assessment has been recorded</p>

            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Your Score</p>
              <p className="text-5xl font-bold text-primary">{finalScore}%</p>
              <p className="text-sm text-muted-foreground mt-2">
                {score} out of {questions.length} questions correct
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => router.push("/student/learn")} className="w-full" size="lg">
                Continue to Learning
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestionIndex(0)
                  setAnswers({})
                  setScore(0)
                  setCompleted(false)
                }}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) return null

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Literacy Assessment</h2>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{currentQuestion.question}</h3>
            {currentQuestion.passage && (
              <div className="p-4 bg-muted/50 rounded-lg mb-4 italic text-muted-foreground">
                {currentQuestion.passage}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 border-2 rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-colors font-medium"
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skip button */}
      <Button
        variant="outline"
        onClick={() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
          } else {
            completeAssessment()
          }
        }}
      >
        Skip Question
      </Button>
    </div>
  )
}
