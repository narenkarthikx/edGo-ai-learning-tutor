"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ProgressData {
  name: string
  mathematics: number
  science: number
  english: number
  social: number
  tamil: number
}

export default function ProgressPage() {
  const [user, setUser] = useState<any>(null)
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [userGrade, setUserGrade] = useState<number>(10)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setUserGrade(parsedUser.grade || 10)
      loadProgressData(parsedUser.grade || 10)
    }
  }, [])

  const loadProgressData = (grade: number) => {
    // Grade-specific Tamil Nadu curriculum progress data
    const data: ProgressData[] = grade === 7 ? [
      { name: "Sept", mathematics: 55, science: 60, english: 65, social: 58, tamil: 70 },
      { name: "Oct", mathematics: 62, science: 65, english: 68, social: 62, tamil: 72 },
      { name: "Nov", mathematics: 68, science: 70, english: 70, social: 65, tamil: 75 },
      { name: "Dec", mathematics: 72, science: 73, english: 72, social: 68, tamil: 77 },
    ] : [
      { name: "Sept", mathematics: 65, science: 70, english: 75, social: 68, tamil: 80 },
      { name: "Oct", mathematics: 72, science: 75, english: 78, social: 72, tamil: 82 },
      { name: "Nov", mathematics: 78, science: 80, english: 80, social: 75, tamil: 85 },
      { name: "Dec", mathematics: 82, science: 83, english: 82, social: 78, tamil: 87 },
    ]
    setProgressData(data)
  }

  if (!user) return null

  // Calculate overall performance
  const latestData = progressData[progressData.length - 1] || { mathematics: 0, science: 0, english: 0, social: 0, tamil: 0 }
  const overallAverage = Math.round((latestData.mathematics + latestData.science + latestData.english + latestData.social + latestData.tamil) / 5)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Grade {userGrade} Progress Report</h1>
        <p className="text-muted-foreground">Tamil Nadu State Board - TNSCERT Curriculum Tracking</p>
      </div>

      {/* Overall Performance */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>All subjects average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{overallAverage}%</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${overallAverage}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">↑ Ready for Board Exams</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mathematics</CardTitle>
            <CardDescription>Algebra, Geometry, Trigonometry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{latestData.mathematics}%</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${latestData.mathematics}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">Strong in Quadratic Equations</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Science</CardTitle>
            <CardDescription>Physics, Chemistry, Biology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{latestData.science}%</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${latestData.science}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">Excellent in Biology</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Subject Performance</CardTitle>
          <CardDescription>Grade {userGrade} Tamil Nadu Board Subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mathematics" fill="#3b82f6" name="Mathematics" />
              <Bar dataKey="science" fill="#10b981" name="Science" />
              <Bar dataKey="english" fill="#f59e0b" name="English" />
              <Bar dataKey="social" fill="#8b5cf6" name="Social Science" />
              <Bar dataKey="tamil" fill="#ef4444" name="Tamil" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tamil Nadu Board Exam Readiness */}
      <Card>
        <CardHeader>
          <CardTitle>{userGrade === 10 ? 'Board Exam Readiness' : 'Foundation Building'} - Class {userGrade}</CardTitle>
          <CardDescription>Subject-wise preparation status for TNSCERT {userGrade === 10 ? 'board examinations' : 'curriculum'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(userGrade === 7 ? [
              { skill: "Mathematics - Integers, Fractions & Basic Algebra", score: latestData.mathematics, status: "Good" },
              { skill: "Science - Plants, Animals & Basic Concepts", score: latestData.science, status: "Good" },
              { skill: "English - Reading, Writing & Grammar Basics", score: latestData.english, status: "Very Good" },
              { skill: "Social Science - History & Geography Basics", score: latestData.social, status: "Good" },
              { skill: "Tamil - Literature & Grammar", score: latestData.tamil, status: "Excellent" },
            ] : [
              { skill: "Mathematics - Algebra & Trigonometry", score: latestData.mathematics, status: "Good" },
              { skill: "Science - Physics, Chemistry, Biology", score: latestData.science, status: "Excellent" },
              { skill: "English - Grammar & Literature", score: latestData.english, status: "Very Good" },
              { skill: "Social Science - History & Geography", score: latestData.social, status: "Good" },
              { skill: "Tamil - Literature & Grammar", score: latestData.tamil, status: "Excellent" },
            ]).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">{item.score}%</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.score >= 85 ? 'bg-green-100 text-green-800' : 
                      item.score >= 75 ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>📚 Study Recommendations</CardTitle>
          <CardDescription>Personalized suggestions for Grade {userGrade} Tamil Nadu {userGrade === 10 ? 'Board preparation' : 'curriculum learning'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userGrade === 7 ? (
              <>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">🔢 Mathematics Foundation</h4>
                  <p className="text-sm text-blue-700">Practice more integer operations and fraction problems. Build strong number sense.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900">🔬 Science Exploration</h4>
                  <p className="text-sm text-green-700">Great curiosity! Focus on understanding plant nutrition and basic animal biology concepts.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900">📚 Reading Skills</h4>
                  <p className="text-sm text-yellow-700">Continue building English vocabulary. Practice reading short stories daily.</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">🔢 Mathematics Focus</h4>
                  <p className="text-sm text-blue-700">Practice more coordinate geometry problems. Review trigonometric identities.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900">🔬 Science Strength</h4>
                  <p className="text-sm text-green-700">Excellent progress! Focus on numerical problems in physics for board exam preparation.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900">🌍 Social Science</h4>
                  <p className="text-sm text-yellow-700">Review Indian National Movement timeline. Practice map work for geography.</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
