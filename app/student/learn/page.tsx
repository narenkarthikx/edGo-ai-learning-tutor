"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, BarChart3, Zap, AlertCircle, Globe } from "lucide-react"
import LessonCard from "@/components/student/lesson-card"
import GapDetector from "@/components/student/gap-detector"
import { createClient } from "@/lib/supabase"
import { translations, type Language } from "@/lib/utils/translations"

// Lazy load heavy components
const AIChatTutor = lazy(() => import("@/components/student/ai-chat-tutor"))
const AdaptiveAssessment = lazy(() => import("@/components/student/adaptive-assessment"))
const StudyMaterials = lazy(() => import("@/components/student/study-materials"))
// Import SyllabusViewer with relative path
import SyllabusViewer from "../../../components/student/syllabus-viewer"

// Loading component
const ComponentLoader = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
)

interface Lesson {
  id: string
  title: string
  subject: "literacy" | "numeracy" | "mathematics" | "science" | "english" | "social_studies" | "hindi" | "physics" | "chemistry" | "biology" | "computer_science"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  completed: boolean
  adaptiveScore?: number
}

interface Gap {
  id: string
  area: string
  severity: "low" | "medium" | "high"
  recommendation: string
}

export default function LearnPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [gaps, setGaps] = useState<Gap[]>([])
  const [activeTab, setActiveTab] = useState<"recommended" | "gaps" | "all" | "ai-tutor" | "assessment" | "materials" | "syllabus">("recommended")
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<Language>("en")
  const t = translations[language]

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()
        if (!authUser) return

        setUser(authUser)

        const { data: profileData } = await supabase.from("student_profiles").select("*").eq("id", authUser.id).single()

        setProfile(profileData)
        if (profileData?.language) {
          setLanguage(profileData.language as Language)
        }

        const { data: gapsData } = await supabase
          .from("learning_gaps")
          .select("*")
          .eq("student_id", authUser.id)
          .order("severity", { ascending: false })

        const formattedGaps: Gap[] =
          gapsData?.map((g) => ({
            id: g.id,
            area: g.area,
            severity: g.severity as "low" | "medium" | "high",
            recommendation: g.recommendation,
          })) || []

        setGaps(formattedGaps)

        const adaptiveLessons = generateAdaptiveLessons(profileData, formattedGaps)
        setLessons(adaptiveLessons)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase])

  const generateAdaptiveLessons = (profile: any, gaps: Gap[]): Lesson[] => {
    const grade = profile?.grade || 10
    const initialDifficulty = profile?.initial_difficulty || "intermediate"

    // Generate grade-specific lessons
    let allLessons: Lesson[] = grade === 7 ? [
      // Class 7 Tamil Nadu curriculum lessons
      {
        id: "math7-1",
        title: "Integers - Positive & Negative Numbers",
        subject: "mathematics",
        difficulty: "beginner",
        duration: 20,
        completed: false,
        adaptiveScore: 75,
      },
      {
        id: "math7-2",
        title: "Fractions and Decimals Basics",
        subject: "mathematics",
        difficulty: "beginner",
        duration: 18,
        completed: false,
        adaptiveScore: 70,
      },
      {
        id: "sci7-1",
        title: "Nutrition in Plants - Photosynthesis",
        subject: "science",
        difficulty: "beginner",
        duration: 15,
        completed: false,
        adaptiveScore: 78,
      },
      {
        id: "sci7-2",
        title: "Nutrition in Animals",
        subject: "science",
        difficulty: "beginner",
        duration: 15,
        completed: false,
        adaptiveScore: 72,
      },
      {
        id: "eng7-1",
        title: "English Grammar - Nouns & Verbs",
        subject: "english",
        difficulty: "beginner",
        duration: 15,
        completed: false,
        adaptiveScore: 80,
      },
      {
        id: "soc7-1",
        title: "History - Ancient India",
        subject: "social_studies",
        difficulty: "beginner",
        duration: 18,
        completed: false,
        adaptiveScore: 68,
      },
      {
        id: "math7-3",
        title: "Simple Equations with One Variable",
        subject: "mathematics",
        difficulty: "intermediate",
        duration: 22,
        completed: false,
        adaptiveScore: 65,
      }
    ] : [
      // Class 10 Tamil Nadu curriculum lessons
      {
        id: "math10-1",
        title: "Quadratic Equations & Polynomial",
        subject: "mathematics",
        difficulty: "advanced",
        duration: 25,
        completed: false,
        adaptiveScore: 78,
      },
      {
        id: "math10-2", 
        title: "Trigonometry - Ratios & Identities",
        subject: "mathematics",
        difficulty: "advanced",
        duration: 30,
        completed: false,
        adaptiveScore: 72,
      },
      {
        id: "sci10-1",
        title: "Acids, Bases and Salts",
        subject: "science",
        difficulty: "intermediate",
        duration: 20,
        completed: false,
        adaptiveScore: 80,
      },
      {
        id: "sci10-2",
        title: "Light - Reflection & Refraction",
        subject: "science",
        difficulty: "advanced",
        duration: 25,
        completed: false,
        adaptiveScore: 75,
      },
      {
        id: "eng10-1",
        title: "English Grammar & Writing Skills",
        subject: "english",
        difficulty: "intermediate",
        duration: 18,
        completed: false,
        adaptiveScore: 82,
      },
      {
        id: "soc10-1",
        title: "Indian National Movement",
        subject: "social_studies",
        difficulty: "intermediate",
        duration: 22,
        completed: false,
        adaptiveScore: 68,
      },
      {
        id: "tamil10-1",
        title: "திருக்குறள் - அறத்துப்பால்",
        subject: "hindi", // Using hindi field for Tamil content
        difficulty: "intermediate",
        duration: 20,
        completed: false,
        adaptiveScore: 70,
      },
      {
        id: "math10-3",
        title: "Coordinate Geometry",
        subject: "mathematics",
        difficulty: "advanced",
        duration: 28,
        completed: false,
        adaptiveScore: 65,
      }
    ]

    // Add high-priority lessons based on gaps
    if (gaps.length > 0) {
      const highSeverityGaps = gaps.filter((g) => g.severity === "high")
      
      if (highSeverityGaps.some((g) => g.area.includes("Math") || g.area.includes("Algebra"))) {
        allLessons.unshift({
          id: `priority-math${grade}`,
          title: grade === 7 
            ? "🚨 Essential: Number Fundamentals Review" 
            : "🚨 Essential: Algebra Fundamentals Review",
          subject: "mathematics",
          difficulty: "intermediate",
          duration: grade === 7 ? 25 : 35,
          completed: false,
          adaptiveScore: 50,
        })
      }
      
      if (highSeverityGaps.some((g) => g.area.includes("Science") || g.area.includes("Physics"))) {
        allLessons.unshift({
          id: `priority-sci${grade}`,
          title: grade === 7 
            ? "🚨 Critical: Basic Science Concepts Review" 
            : "🚨 Critical: Science Concepts Review",
          subject: "science",
          difficulty: "intermediate", 
          duration: grade === 7 ? 20 : 30,
          completed: false,
          adaptiveScore: 45,
        })
      }
    }

    return allLessons.filter((l) => {
      if (initialDifficulty === "beginner") return l.difficulty !== "advanced"
      return true
    })
  }

  const handleLanguageChange = async (newLanguage: Language) => {
    setLanguage(newLanguage)
    if (user && profile) {
      await supabase.from("student_profiles").update({ language: newLanguage }).eq("id", user.id)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    )
  }

  const recommendedLessons = lessons.slice(0, 2)
  const moreLessons = lessons.slice(2)

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex items-center gap-2 justify-end">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {t.common.welcome}, {profile?.name}!
        </h1>
        <p className="text-muted-foreground">
          Grade {profile?.grade} • {t.student.myLessons}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.student.completedLessons}</p>
                <p className="text-3xl font-bold text-primary">0</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.student.learningStreak}</p>
                <p className="text-3xl font-bold text-primary">0 days</p>
              </div>
              <Zap className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.student.skillLevel}</p>
                <p className="text-3xl font-bold text-primary">-</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gap Alert */}
      {gaps.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  {gaps.length} {t.student.learningGaps} Detected
                </h3>
                <p className="text-sm text-blue-800 mb-3">We've identified areas where you might need extra support.</p>
                <Button size="sm" onClick={() => setActiveTab("gaps")} className="bg-blue-600 hover:bg-blue-700">
                  View Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("recommended")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "recommended"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Recommended
        </button>
        <button
          onClick={() => setActiveTab("gaps")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "gaps"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t.student.learningGaps} ({gaps.length})
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "all"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Lessons
        </button>
        <button
          onClick={() => setActiveTab("ai-tutor")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "ai-tutor"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🤖 AI Tutor
        </button>
        <button
          onClick={() => setActiveTab("assessment")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "assessment"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📝 Smart Test
        </button>
        <button
          onClick={() => setActiveTab("materials")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "materials"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📚 Study Materials
        </button>
        <button
          onClick={() => setActiveTab("syllabus")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "syllabus"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📋 Syllabus
        </button>
      </div>

      {/* Content */}
      {activeTab === "recommended" && (
        <div className="space-y-6">
          {recommendedLessons.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {recommendedLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "gaps" && (
        <div className="space-y-4">
          {gaps.length > 0 ? (
            gaps.map((gap) => <GapDetector key={gap.id} gap={gap} />)
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No gaps detected. Great progress!</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "all" && (
        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}

      {activeTab === "ai-tutor" && (
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<ComponentLoader />}>
            <AIChatTutor 
              studentGrade={profile?.grade || 10}
              studentSubjects={['Mathematics', 'Science', 'English', 'Social Studies', 'Tamil']}
            />
          </Suspense>
        </div>
      )}

      {activeTab === "assessment" && (
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<ComponentLoader />}>
            <AdaptiveAssessment 
              studentId={user?.id || ""}
              subject={"mathematics"}
              onComplete={(results) => {
                console.log("Assessment completed:", results)
                // Here you could update the student's progress in Supabase
              }}
            />
          </Suspense>
        </div>
      )}

      {activeTab === "materials" && (
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<ComponentLoader />}>
            <StudyMaterials 
              studentGrade={profile?.grade || 10}
              studentSubjects={['Math', 'Science', 'English', 'Social Studies', 'Tamil']}
            />
          </Suspense>
        </div>
      )}

      {activeTab === "syllabus" && (
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<ComponentLoader />}>
            <SyllabusViewer 
              studentGrade={profile?.grade || 10}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
}
