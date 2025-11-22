"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, BookOpen, TrendingUp, Brain, Sparkles } from "lucide-react"

import { createClient } from "@/lib/supabase"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/student/learn" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-foreground hidden sm:inline">Learn Buddy</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">Grade {user.grade}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r bg-muted/20 min-h-screen">
          <div className="p-6 space-y-2">
            <Link href="/student/learn">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-medium">Learn</span>
              </div>
            </Link>
            <Link href="/student/flashcards">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">Flashcards</span>
              </div>
            </Link>
            <Link href="/student/adk-agents">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-medium">AI Agents</span>
              </div>
            </Link>
            <Link href="/student/progress">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium">My Progress</span>
              </div>
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 max-w-6xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}
