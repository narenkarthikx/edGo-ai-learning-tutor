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
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle, Users, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw new Error(authError.message)
      if (!data.user) throw new Error("Login failed")

      setSuccess("Login successful! Redirecting...")

      // Store user data in localStorage for layout compatibility
      const { data: studentProfile } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (studentProfile) {
        localStorage.setItem("user", JSON.stringify({
          id: data.user.id,
          name: studentProfile.name,
          email: data.user.email,
          role: "student",
          grade: studentProfile.grade
        }))
        setTimeout(() => router.push("/student/learn"), 1000)
      } else {
        // Check if teacher profile exists
        const { data: teacherProfile } = await supabase
          .from("teacher_profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()
        
        if (teacherProfile) {
          localStorage.setItem("user", JSON.stringify({
            id: data.user.id,
            name: teacherProfile.name,
            email: data.user.email,
            role: "teacher"
          }))
          setTimeout(() => router.push("/teacher/dashboard"), 1000)
        } else {
          throw new Error("User profile not found")
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-2xl backdrop-blur-sm bg-background/95 hover:shadow-primary/20 transition-all duration-500">
      <CardHeader className="space-y-4 pb-6">
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="mx-auto px-3 py-1 animate-pulse-soft">
            Welcome Back
          </Badge>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Sign in to Edvion
          </CardTitle>
          <CardDescription className="text-base">
            Continue your personalized learning journey
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800 animate-fade-in">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden" 
            disabled={loading}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing you in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </form>

        {/* Quick Access Buttons */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Quick Access</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-10 hover:bg-primary/10 hover:border-primary/50 transition-all"
              onClick={() => {
                setEmail("student@demo.com")
                setPassword("demo123")
              }}
            >
              <GraduationCap className="w-4 h-4" />
              Student Demo
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-10 hover:bg-primary/10 hover:border-primary/50 transition-all"
              onClick={() => {
                setEmail("teacher@demo.com")
                setPassword("demo123")
              }}
            >
              <Users className="w-4 h-4" />
              Teacher Demo
            </Button>
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              href="/auth/register" 
              className="text-primary hover:text-primary/80 font-medium hover:underline transition-all"
            >
              Create one here
            </Link>
          </p>
          
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">Terms</Link> and{" "}
            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
