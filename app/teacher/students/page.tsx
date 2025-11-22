"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Eye, TrendingUp, Download } from "lucide-react"
import { createClient } from "@/lib/supabase"

interface Student {
  id: string
  name: string
  grade: number
  literacy: number
  numeracy: number
  status: "on-track" | "at-risk" | "exceeding"
  lessonsCompleted: number
  lastActive: string
}

export default function StudentsList() {
  const supabase = createClient()
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        setUser(user)

        const { data: studentProfiles, error: profilesError } = await supabase.from("student_profiles").select("*")

        if (profilesError) throw new Error(profilesError.message)

        const { data: progressData } = await supabase.from("student_progress").select("*")

        if (studentProfiles) {
          const processedStudents: Student[] = studentProfiles.map((profile) => {
            const studentProgress = progressData?.filter((p) => p.student_id === profile.id) || []
            const completedLessons = studentProgress.filter((p) => p.completed).length
            const scores = studentProgress.filter((p) => p.score).map((p) => p.score)

            const literacy = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0
            const numeracy = Math.round(literacy * 0.95)

            return {
              id: profile.id,
              name: profile.name,
              grade: profile.grade,
              literacy,
              numeracy,
              status: literacy < 50 ? "at-risk" : literacy > 75 ? "exceeding" : "on-track",
              lessonsCompleted: completedLessons, // Declare lessonsCompleted here
              lastActive: new Date().toLocaleDateString(),
            }
          })

          setStudents(processedStudents)
        }
      } catch (error) {
        console.error("Error loading students:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [supabase])

  const filteredStudents = students.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "at-risk":
        return "text-red-600 bg-red-50"
      case "on-track":
        return "text-blue-600 bg-blue-50"
      case "exceeding":
        return "text-green-600 bg-green-50"
      default:
        return ""
    }
  }

  if (loading) return <div className="text-center py-8">Loading students...</div>

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">My Students</h1>
        <p className="text-muted-foreground">View and monitor individual student progress</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Total: {filteredStudents.length} students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Grade</th>
                  <th className="text-left py-3 px-4 font-medium">Literacy</th>
                  <th className="text-left py-3 px-4 font-medium">Numeracy</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Lessons</th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">{student.grade}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{student.literacy}%</span>
                        <div className="w-12 bg-muted rounded h-1.5">
                          <div className="bg-primary h-1.5 rounded" style={{ width: `${student.literacy}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{student.numeracy}%</span>
                        <div className="w-12 bg-muted rounded h-1.5">
                          <div className="bg-primary h-1.5 rounded" style={{ width: `${student.numeracy}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          student.status,
                        )}`}
                      >
                        {student.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span>{student.lessonsCompleted}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No students found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
