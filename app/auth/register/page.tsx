"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Globe,
  BookOpen,
  Sparkles
} from "lucide-react"

type Step = "role" | "account" | "details"

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>("role")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "teacher",
    grade: "1",
    language: "en",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleSelect = (role: "student" | "teacher") => {
    setFormData((prev) => ({ ...prev, role }))
    setStep("account")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role,
          },
        },
      })

      if (authError) throw new Error(authError.message)
      if (!authData.user) throw new Error("Signup failed")

      setSuccess("Account created successfully! Setting up your profile...")

      // Wait a moment for the auth session to be established
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (formData.role === "student") {
        const { error: profileError } = await supabase.from("student_profiles").insert({
          id: authData.user.id,
          name: formData.name,
          grade: Number.parseInt(formData.grade),
          language: formData.language,
          email: formData.email,
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
          throw new Error(`Profile creation failed: ${profileError.message}`)
        }

        localStorage.setItem("user", JSON.stringify({
          id: authData.user.id,
          name: formData.name,
          email: authData.user.email,
          role: formData.role,
          grade: Number.parseInt(formData.grade)
        }))
      } else {
        const { error: profileError } = await supabase.from("teacher_profiles").insert({
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
          throw new Error(`Profile creation failed: ${profileError.message}`)
        }

        localStorage.setItem("user", JSON.stringify({
          id: authData.user.id,
          name: formData.name,
          email: authData.user.email,
          role: formData.role
        }))
      }

      setTimeout(() => {
        router.push(formData.role === "teacher" ? "/teacher/dashboard" : "/student/onboarding")
      }, 1500)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const stepIndicator = {
    role: 1,
    account: 2,
    details: 3
  }

  const currentStepNumber = stepIndicator[step]
  const totalSteps = 3

  return (
    <Card className="border-primary/20 shadow-2xl backdrop-blur-sm bg-background/95 hover:shadow-primary/20 transition-all duration-500">
      <CardHeader className="space-y-4 pb-6">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="mx-auto px-3 py-1 animate-pulse-soft">
            <Sparkles className="w-3 h-3 mr-1" />
            Join Learn Buddy
          </Badge>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-base">
            {step === "role" && "Choose your role to get started"}
            {step === "account" && "Set up your account credentials"}
            {step === "details" && "Complete your profile"}
          </CardDescription>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNum = i + 1
            const isActive = stepNum === currentStepNumber
            const isCompleted = stepNum < currentStepNumber
            
            return (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  isCompleted 
                    ? "bg-primary text-primary-foreground" 
                    : isActive 
                    ? "bg-primary/20 text-primary border-2 border-primary" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNum
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                    stepNum < currentStepNumber ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Role Selection Step */}
        {step === "role" && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                Select your role to customize your experience
              </p>
            </div>
            
            <div className="grid gap-4">
              <button
                onClick={() => handleRoleSelect("student")}
                className="group relative p-6 border-2 border-border hover:border-primary rounded-xl transition-all duration-300 text-left hover:shadow-lg hover:scale-105 bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      I'm a Student
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Learn at your own pace with personalized AI-powered lessons and adaptive content
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Personalized Learning
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
              
              <button
                onClick={() => handleRoleSelect("teacher")}
                className="group relative p-6 border-2 border-border hover:border-primary rounded-xl transition-all duration-300 text-left hover:shadow-lg hover:scale-105 bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      I'm a Teacher
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Track student progress, identify learning gaps, and get actionable insights
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Student Analytics
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Account Details Step */}
        {step === "account" && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setStep("details")
            }}
            className="space-y-5 animate-fade-in"
          >
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="pl-10 h-11 border-2 focus:border-primary transition-all hover:border-primary/50"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-11 border-2 focus:border-primary transition-all hover:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-11 border-2 focus:border-primary transition-all hover:border-primary/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 6 characters long
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-11 hover:bg-muted transition-all" 
                onClick={() => setStep("role")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit" className="flex-1 h-11 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all hover:scale-105">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {/* Details Step */}
        {step === "details" && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            {formData.role === "student" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Grade Level</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 h-11 border-2 rounded-lg border-border focus:border-primary focus:outline-none bg-background transition-all hover:border-primary/50"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                        <option key={g} value={g}>{`Grade ${g}`}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Preferred Language</label>
                  <div className="relative group">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 h-11 border-2 rounded-lg border-border focus:border-primary focus:outline-none bg-background transition-all hover:border-primary/50"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi (हिंदी)</option>
                      <option value="te">Telugu (తెలుగు)</option>
                      <option value="ta">Tamil (தமிழ்)</option>
                      <option value="kn">Kannada (ಕನ್ನಡ)</option>
                      <option value="ml">Malayalam (മലയാളം)</option>
                      <option value="gu">Gujarati (ગુજરાતી)</option>
                      <option value="bn">Bengali (বাংলা)</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Teacher Account Ready</h3>
                    <p className="text-sm text-muted-foreground">
                      Your account is ready to be created with full teacher features
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Student progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Learning gap identification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Class management tools
                  </li>
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 hover:bg-muted transition-all"
                onClick={() => setStep("account")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-11 bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all hover:scale-105 group relative overflow-hidden" 
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </form>
        )}

        <div className="text-center space-y-3 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href="/auth/login" 
              className="text-primary hover:text-primary/80 font-medium hover:underline transition-all"
            >
              Sign in here
            </Link>
          </p>
          
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">Terms</Link> and{" "}
            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
