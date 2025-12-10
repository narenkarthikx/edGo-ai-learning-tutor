"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { BookOpen, Zap, TrendingUp, Globe } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(1)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [preferences, setPreferences] = useState({
    learningStyle: "visual",
    difficulty: "beginner",
    interests: [] as string[],
    studyTime: "evening",
    goals: "improve_grades"
  })

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) router.push("/auth/login")
      setUser(user)
    }
    getUser()
  }, [router, supabase.auth])

  const handleCompleteOnboarding = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Update the student profile with onboarding preferences
      const { error } = await supabase
        .from("student_profiles")
        .update({
          learning_style: preferences.learningStyle,
          difficulty_level: preferences.difficulty, // Fixed: was initial_difficulty
          updated_at: new Date().toISOString(),
          // Store additional preferences in a JSON field (if your DB supports it)
          // OR you can add these as separate columns
        })
        .eq("id", user.id)

      // Store detailed preferences in localStorage for immediate use
      const userData = localStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        user.learning_style = preferences.learningStyle
        user.difficulty_level = preferences.difficulty
        user.interests = preferences.interests
        user.study_time = preferences.studyTime
        user.goals = preferences.goals
        user.onboarding_completed = true
        localStorage.setItem("user", JSON.stringify(user))
      }

      router.push("/student/learn")
    } catch (err: any) {
      console.error("Onboarding error:", err.message)
      setError(`Setup failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
            ></div>
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to Edvion</CardTitle>
              <CardDescription>Let's set up your personalized learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <BookOpen className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Adaptive Learning</h3>
                  <p className="text-sm text-muted-foreground">Lessons tailored to your pace and style</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">See your improvement over time</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Gap Detection</h3>
                  <p className="text-sm text-muted-foreground">Identify areas needing extra support</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Globe className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Multilingual</h3>
                  <p className="text-sm text-muted-foreground">Learn in your preferred language</p>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full" size="lg">
                Let's Get Started
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Learning Preferences */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>How Do You Like to Learn?</CardTitle>
              <CardDescription>Help us personalize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block font-medium mb-3">Preferred Learning Style</label>
                <div className="space-y-2">
                  {[
                    { id: "visual", label: "Visual (Images & Videos)", icon: "👁️" },
                    { id: "audio", label: "Audio (Listening & Speaking)", icon: "🎧" },
                    { id: "kinesthetic", label: "Hands-on (Interactive & Practice)", icon: "✋" },
                    { id: "reading", label: "Reading & Writing", icon: "📖" },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setPreferences((p) => ({ ...p, learningStyle: style.id }))}
                      className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                        preferences.learningStyle === style.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-lg mr-2">{style.icon}</span>
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={() => setStep(3)} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Interests & Study Time */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Your Interests</CardTitle>
              <CardDescription>This helps us create lessons you'll enjoy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block font-medium mb-3">What subjects interest you most? (Select all that apply)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "mathematics", label: "Mathematics 🔢", icon: "🔢" },
                    { id: "science", label: "Science 🔬", icon: "🔬" },
                    { id: "english", label: "English 📚", icon: "📚" },
                    { id: "history", label: "History 🏛️", icon: "🏛️" },
                    { id: "geography", label: "Geography 🌍", icon: "🌍" },
                    { id: "computer", label: "Computers 💻", icon: "💻" },
                    { id: "arts", label: "Arts & Crafts 🎨", icon: "🎨" },
                    { id: "sports", label: "Sports ⚽", icon: "⚽" },
                  ].map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => {
                        const newInterests = preferences.interests.includes(interest.id)
                          ? preferences.interests.filter(i => i !== interest.id)
                          : [...preferences.interests, interest.id]
                        setPreferences(p => ({ ...p, interests: newInterests }))
                      }}
                      className={`p-3 border-2 rounded-lg text-left transition-colors ${
                        preferences.interests.includes(interest.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-3">When do you prefer to study?</label>
                <div className="space-y-2">
                  {[
                    { id: "morning", label: "Morning (6 AM - 12 PM) 🌅", description: "Fresh start to the day" },
                    { id: "afternoon", label: "Afternoon (12 PM - 6 PM) ☀️", description: "After lunch break" },
                    { id: "evening", label: "Evening (6 PM - 10 PM) 🌆", description: "After school/activities" },
                    { id: "flexible", label: "Flexible ⏰", description: "Anytime works for me" },
                  ].map((time) => (
                    <button
                      key={time.id}
                      onClick={() => setPreferences(p => ({ ...p, studyTime: time.id }))}
                      className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                        preferences.studyTime === time.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <h3 className="font-semibold">{time.label}</h3>
                      <p className="text-sm text-muted-foreground">{time.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Goals & Difficulty */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Starting Difficulty</CardTitle>
              <CardDescription>Choose a level that matches your current ability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                {[
                  { id: "beginner", label: "Beginner", description: "Just starting out" },
                  { id: "intermediate", label: "Intermediate", description: "Some experience" },
                  { id: "advanced", label: "Advanced", description: "Strong foundation" },
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setPreferences((p) => ({ ...p, difficulty: level.id }))}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                      preferences.difficulty === level.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <h3 className="font-semibold">{level.label}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setStep(3)}
                >
                  Back
                </Button>
                <Button onClick={handleCompleteOnboarding} className="w-full flex-1" disabled={loading} size="lg">
                  {loading ? "Setting up..." : "Start Learning! 🚀"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
