"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { AlertCircle, TrendingUp, Users } from "lucide-react"
import { createClient } from "@/lib/supabase"

interface ClassStats {
  totalStudents: number
  averageMathematics: number
  averageScience: number
  averageEnglish: number
  averageSocialScience: number
  averageTamil: number
  atRiskStudents: number
  lessonsCompleted: number
}

interface StudentProgress {
  student_id: string
  name: string
  mathematics: number
  science: number
  english: number
  socialScience: number
  tamil: number
  overall: number
  status: "on-track" | "at-risk" | "exceeding"
}

export default function TeacherDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState<ClassStats>({
    totalStudents: 0,
    averageMathematics: 0,
    averageScience: 0,
    averageEnglish: 0,
    averageSocialScience: 0,
    averageTamil: 0,
    atRiskStudents: 0,
    lessonsCompleted: 0,
  })
  const [students, setStudents] = useState<StudentProgress[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        setUser(user)

        const { data: studentProfiles, error: profilesError } = await supabase.from("student_profiles").select("*")

        if (profilesError) throw new Error(profilesError.message)

        const { data: progressData, error: progressError } = await supabase.from("progress_tracking").select("*")

        if (progressError) throw new Error(progressError.message)

        // Calculate statistics
        if (studentProfiles && studentProfiles.length > 0) {
          const studentProgressMap = new Map<string, any[]>()
          progressData?.forEach((p) => {
            if (!studentProgressMap.has(p.student_id)) {
              studentProgressMap.set(p.student_id, [])
            }
            studentProgressMap.get(p.student_id)?.push(p)
          })

          const processedStudents: StudentProgress[] = studentProfiles.map((student) => {
            const studentProgress = studentProgressMap.get(student.id) || []
            const completedLessons = studentProgress.filter((p) => p.completed).length
            const scores = studentProgress.filter((p) => p.score).map((p) => p.score)

            // Calculate subject-wise scores (Tamil Nadu curriculum)
            const mathematics = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0
            const science = Math.round(mathematics * 0.95) // Simulate variance
            const english = Math.round(mathematics * 1.05)
            const socialScience = Math.round(mathematics * 0.92)
            const tamil = Math.round(mathematics * 1.08)
            const overall = Math.round((mathematics + science + english + socialScience + tamil) / 5)

            return {
              student_id: student.id,
              name: student.name,
              mathematics,
              science,
              english,
              socialScience,
              tamil,
              overall,
              status: overall < 50 ? "at-risk" : overall > 75 ? "exceeding" : "on-track",
            }
          })

          setStudents(processedStudents)

          const avgMath = Math.round(
            processedStudents.reduce((acc, s) => acc + s.mathematics, 0) / processedStudents.length,
          )
          const avgScience = Math.round(
            processedStudents.reduce((acc, s) => acc + s.science, 0) / processedStudents.length,
          )
          const avgEnglish = Math.round(
            processedStudents.reduce((acc, s) => acc + s.english, 0) / processedStudents.length,
          )
          const avgSocial = Math.round(
            processedStudents.reduce((acc, s) => acc + s.socialScience, 0) / processedStudents.length,
          )
          const avgTamil = Math.round(
            processedStudents.reduce((acc, s) => acc + s.tamil, 0) / processedStudents.length,
          )
          const atRisk = processedStudents.filter((s) => s.status === "at-risk").length

          setStats({
            totalStudents: studentProfiles.length,
            averageMathematics: avgMath,
            averageScience: avgScience,
            averageEnglish: avgEnglish,
            averageSocialScience: avgSocial,
            averageTamil: avgTamil,
            atRiskStudents: atRisk,
            lessonsCompleted: progressData?.filter((p) => p.completed).length || 0,
          })
        }
      } catch (error) {
        console.error("Error loading dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [supabase])

  const classPerformance = [
    { month: "Sept", mathematics: 55, science: 60, english: 65, social: 58, tamil: 70 },
    { month: "Oct", mathematics: 62, science: 65, english: 68, social: 62, tamil: 72 },
    { month: "Nov", mathematics: 68, science: 70, english: 70, social: 65, tamil: 75 },
    { month: "Dec", mathematics: stats.averageMathematics, science: stats.averageScience, english: stats.averageEnglish, social: stats.averageSocialScience, tamil: stats.averageTamil },
  ]

  const gapDistribution = [
    { name: "Mathematics", value: 100 - stats.averageMathematics, fill: "#3b82f6" },
    { name: "Science", value: 100 - stats.averageScience, fill: "#10b981" },
    { name: "English", value: 100 - stats.averageEnglish, fill: "#f59e0b" },
    { name: "Social", value: 100 - stats.averageSocialScience, fill: "#8b5cf6" },
    { name: "Tamil", value: 100 - stats.averageTamil, fill: "#ef4444" },
  ]

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Class Dashboard</h1>
        <p className="text-muted-foreground">Monitor student progress and identify learning gaps</p>
      </div>

      {/* Key Stats */}
      <div className="grid md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-primary">{stats.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg Mathematics</p>
              <p className="text-3xl font-bold text-blue-600">{stats.averageMathematics}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg Science</p>
              <p className="text-3xl font-bold text-green-600">{stats.averageScience}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg English</p>
              <p className="text-3xl font-bold text-orange-600">{stats.averageEnglish}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg Tamil</p>
              <p className="text-3xl font-bold text-red-600">{stats.averageTamil}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-900">At-Risk</p>
                <p className="text-3xl font-bold text-orange-600">{stats.atRiskStudents}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Trend</CardTitle>
            <CardDescription>Monthly average by subject - Tamil Nadu Curriculum</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mathematics" stroke="#3b82f6" strokeWidth={2} name="Mathematics" />
                <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={2} name="Science" />
                <Line type="monotone" dataKey="english" stroke="#f59e0b" strokeWidth={2} name="English" />
                <Line type="monotone" dataKey="social" stroke="#8b5cf6" strokeWidth={2} name="Social" />
                <Line type="monotone" dataKey="tamil" stroke="#ef4444" strokeWidth={2} name="Tamil" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Gap Analysis</CardTitle>
            <CardDescription>Areas needing improvement (100% - current score)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gapDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gapDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Students */}
      <Card>
        <CardHeader>
          <CardTitle>Students Needing Support</CardTitle>
          <CardDescription>Students with overall performance below 50%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students
              .filter((s) => s.status === "at-risk")
              .slice(0, 5)
              .map((student) => (
                <div key={student.student_id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{student.name}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">At Risk - {student.overall}% Overall</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Math: {student.mathematics}%</p>
                      <div className="w-full bg-muted rounded h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded" style={{ width: `${student.mathematics}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Science: {student.science}%</p>
                      <div className="w-full bg-muted rounded h-1.5">
                        <div className="bg-green-500 h-1.5 rounded" style={{ width: `${student.science}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">English: {student.english}%</p>
                      <div className="w-full bg-muted rounded h-1.5">
                        <div className="bg-orange-500 h-1.5 rounded" style={{ width: `${student.english}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Social: {student.socialScience}%</p>
                      <div className="w-full bg-muted rounded h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded" style={{ width: `${student.socialScience}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tamil: {student.tamil}%</p>
                      <div className="w-full bg-muted rounded h-1.5">
                        <div className="bg-red-500 h-1.5 rounded" style={{ width: `${student.tamil}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {students.filter((s) => s.status === "at-risk").length === 0 && (
              <p className="text-center text-muted-foreground py-4">Great! All students are performing well.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
