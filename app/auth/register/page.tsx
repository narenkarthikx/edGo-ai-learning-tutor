"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<"role" | "account" | "details">("role")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    grade: "1",
    language: "en",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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

        // Store user data in localStorage for layout compatibility
        localStorage.setItem("user", JSON.stringify({
          id: authData.user.id,
          name: formData.name,
          email: authData.user.email,
          role: formData.role,
          grade: formData.role === "student" ? Number.parseInt(formData.grade) : undefined
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

        // Store user data in localStorage for layout compatibility  
        localStorage.setItem("user", JSON.stringify({
          id: authData.user.id,
          name: formData.name,
          email: authData.user.email,
          role: formData.role
        }))
      }

      router.push(formData.role === "teacher" ? "/teacher/dashboard" : "/student/onboarding")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          {step === "role" && "Choose your role to get started"}
          {step === "account" && "Create your account"}
          {step === "details" && "Personalize your learning"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Role Selection Step */}
        {step === "role" && (
          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("student")}
              className="w-full p-4 border-2 rounded-lg hover:border-primary transition-colors text-left"
            >
              <h3 className="font-semibold mb-1">I'm a Student</h3>
              <p className="text-sm text-muted-foreground">Learn at your own pace with personalized lessons</p>
            </button>
            <button
              onClick={() => handleRoleSelect("teacher")}
              className="w-full p-4 border-2 rounded-lg hover:border-primary transition-colors text-left"
            >
              <h3 className="font-semibold mb-1">I'm a Teacher</h3>
              <p className="text-sm text-muted-foreground">Track student progress and identify learning gaps</p>
            </button>
          </div>
        )}

        {/* Account Details Step */}
        {step === "account" && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setStep("details")
            }}
            className="space-y-4"
          >
            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("role")}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Next
              </Button>
            </div>
          </form>
        )}

        {/* Details Step */}
        {step === "details" && formData.role === "student" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

            <div>
              <label className="block text-sm font-medium mb-1">Grade Level</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>{`Grade ${g}`}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preferred Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="kn">Kannada</option>
                <option value="ml">Malayalam</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setStep("account")}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>
        )}

        {/* Teacher Details */}
        {step === "details" && formData.role === "teacher" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

            <p className="text-sm text-muted-foreground mb-4">
              We're ready to set up your account. Click below to complete registration.
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setStep("account")}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
