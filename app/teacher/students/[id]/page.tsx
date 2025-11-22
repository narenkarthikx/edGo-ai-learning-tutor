"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowLeft, AlertCircle } from "lucide-react"

interface StudentDetail {
  id: string
  name: string
  grade: number
  language: string
  learning_style: string
  literacy_score: number
  numeracy_score: number
  lessons_completed: number
  total_time_spent: number
}

export default function StudentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [student, setStudent] = useState<StudentDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const { data, error } = await supabase.from("student_profiles").select("*").eq("id", params.id).single()

        if (error) throw new Error(error.message)

        setStudent({
          id: data.id,
          name: data.name,
          grade: data.grade,
          language: data.language,
          learning_style: data.learning_style,
          literacy_score: 65,
          numeracy_score: 62,
          lessons_completed: 24,
          total_time_spent: 840,
        })
      } catch (error) {
        console.error("Error loading student:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [params.id, supabase])

  if (loading) return <div className="text-center py-8">Loading student details...</div>
  if (!student) return <div className="text-center py-8">Student not found</div>

  const progressData = [
    { week: "Week 1", literacy: 45, numeracy: 42 },
    { week: "Week 2", literacy: 50, numeracy: 48 },
    { week: "Week 3", literacy: 58, numeracy: 55 },
    { week: "Week 4", literacy: 65, numeracy: 62 },
  ]

  const skillBreakdown = [
    { skill: "Letter Recognition", score: 85 },
    { skill: "Word Formation", score: 72 },
    { skill: "Reading Comprehension", score: 68 },
    { skill: "Basic Arithmetic", score: 78 },
    { skill: "Problem Solving", score: 65 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{student.name}</h1>
          <p className="text-muted-foreground">
            Grade {student.grade} - {student.language.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Literacy Score</p>
            <p className="text-3xl font-bold text-primary">{student.literacy_score}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Numeracy Score</p>
            <p className="text-3xl font-bold text-primary">{student.numeracy_score}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Lessons Completed</p>
            <p className="text-3xl font-bold text-primary">{student.lessons_completed}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Time Spent (mins)</p>
            <p className="text-3xl font-bold text-primary">{student.total_time_spent}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Literacy vs Numeracy scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="literacy" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="numeracy" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
            <CardDescription>Individual skill assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-primary font-semibold">{item.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Identified Learning Gaps
          </CardTitle>
          <CardDescription>Areas recommended for additional support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { area: "Phonetics", recommendation: "Practice phonetic sounds daily" },
              { area: "Sentence Construction", recommendation: "Work on sentence building exercises" },
              { area: "Multi-digit Arithmetic", recommendation: "Strengthen foundational addition/subtraction" },
            ].map((gap, idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-orange-50">
                <h4 className="font-semibold text-orange-900 mb-1">{gap.area}</h4>
                <p className="text-sm text-orange-700">{gap.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
