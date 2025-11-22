"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Mic, Volume2, CheckCircle } from 'lucide-react'

interface AdaptiveAssessmentProps {
  studentId: string
  subject: 'literacy' | 'numeracy' | 'mathematics' | 'science' | 'english' | 'social_studies' | 'hindi' | 'physics' | 'chemistry' | 'biology' | 'computer_science'
  onComplete: (results: any) => void
}

export default function AdaptiveAssessment({ studentId, subject, onComplete }: AdaptiveAssessmentProps) {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simulated AI-generated questions (replace with actual Gemini API call)
  useEffect(() => {
    const loadAdaptiveQuestions = async () => {
      setLoading(true)
      try {
        // Call the Gemini API to generate questions
        const response = await fetch('/api/generate-assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject,
            grade: 10, // Grade 10 Tamil Nadu curriculum
            difficulty: 'intermediate'
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.questions && data.questions.length > 0) {
            // Convert the API format to component format
            const formattedQuestions = data.questions.map((q: any, index: number) => ({
              id: q.id || index + 1,
              question: q.question,
              type: q.type || "multiple_choice",
              options: q.options || [`A) Option 1`, `B) Option 2`, `C) Option 3`, `D) Option 4`],
              correct: q.correct_answer || q.correct || 0,
              explanation: q.explanation || "This is the correct answer.",
              hint: q.hint || "Think step by step"
            }))
            setQuestions(formattedQuestions)
          } else {
            throw new Error("No questions received")
          }
        } else {
          throw new Error("API request failed")
        }
      } catch (error) {
        console.error('Failed to load questions:', error)
        // Grade 10 fallback questions
        const fallbackQuestions = [
          {
            id: 1,
            question: subject === 'mathematics' ? 
              "Solve: If x² - 5x + 6 = 0, what are the values of x?" :
              subject === 'science' ?
              "Which gas is produced when zinc reacts with hydrochloric acid?" :
              "Choose the correct passive voice: 'Ram writes a letter'",
            type: "multiple_choice",
            options: subject === 'mathematics' ? 
              ["A) x = 2, 3", "B) x = 1, 6", "C) x = -2, -3", "D) x = 2, -3"] :
              subject === 'science' ?
              ["A) Oxygen", "B) Hydrogen", "C) Carbon dioxide", "D) Nitrogen"] :
              ["A) A letter is written by Ram", "B) A letter was written by Ram", "C) A letter has been written by Ram", "D) A letter will be written by Ram"],
            correct: 0,
            explanation: subject === 'mathematics' ? 
              "Using factorization: x² - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3" :
              subject === 'science' ?
              "When acids react with metals, hydrogen gas is produced: Zn + HCl → ZnCl₂ + H₂" :
              "Present simple 'writes' becomes 'is written' in passive voice",
            hint: subject === 'mathematics' ? 
              "Try to factor the polynomial into two linear factors" :
              subject === 'science' ?
              "Think about the general reaction: Acid + Metal → Salt + ?" :
              "Present simple: Subject + V1 becomes Object + is/am/are + V3 + by + Subject"
          }
        ]
        setQuestions(fallbackQuestions)
      } finally {
        setLoading(false)
      }
    }

    loadAdaptiveQuestions()
  }, [studentId, subject])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex.toString()
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Assessment complete
      const results = calculateResults()
      onComplete(results)
    }
  }

  const calculateResults = () => {
    let correctCount = 0
    let totalQuestions = questions.length
    
    answers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index]?.correct) {
        correctCount++
      }
    })

    const score = (correctCount / totalQuestions) * 100
    
    return {
      score,
      correctAnswers: correctCount,
      totalQuestions,
      strengths: score > 70 ? ['Good understanding'] : [],
      gaps: score < 50 ? ['Needs more practice'] : [],
      recommendations: generateRecommendations(score)
    }
  }

  const generateRecommendations = (score: number) => {
    if (score >= 80) return ['Continue with more advanced topics']
    if (score >= 60) return ['Practice similar questions', 'Try interactive games']
    return ['Review basics', 'One-on-one tutoring recommended', 'Use visual aids']
  }

  const speakQuestion = () => {
    const question = questions[currentQuestion]
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question.question)
      speechSynthesis.speak(utterance)
    }
  }

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-IN'

      setIsListening(true)
      recognition.start()

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        const question = questions[currentQuestion]
        
        // Simple voice matching (can be enhanced with AI)
        question.options.forEach((option: string, index: number) => {
          if (transcript.includes(option.toLowerCase())) {
            handleAnswer(index)
          }
        })
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Brain className="w-8 h-8 animate-pulse text-primary mr-2" />
            <span>AI is preparing personalized questions for you...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (questions.length === 0) return null

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== undefined

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Adaptive Assessment</CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <h3 className="text-lg font-medium flex-1">{question.question}</h3>
            <Button
              variant="outline"
              size="icon"
              onClick={speakQuestion}
              title="Listen to question"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>

          {question.image && (
            <div className="text-center text-6xl py-4">
              {question.image}
            </div>
          )}

          {question.hint && (
            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              💡 Hint: {question.hint}
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option: string, index: number) => (
            <Button
              key={index}
              variant={answers[currentQuestion] === index.toString() ? "default" : "outline"}
              className="h-auto py-4 text-left justify-start"
              onClick={() => handleAnswer(index)}
            >
              {answers[currentQuestion] === index.toString() && (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              {option}
            </Button>
          ))}
        </div>

        {/* Voice Input */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={startVoiceInput}
            disabled={isListening}
            className="flex items-center gap-2"
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
            {isListening ? 'Listening...' : 'Answer by Voice'}
          </Button>
        </div>

        {/* Explanation (shown after answering) */}
        {isAnswered && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-1">Explanation:</h4>
            <p className="text-green-700 text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}