"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, BarChart3, Users } from "lucide-react"

import { createClient } from "@/lib/supabase"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "teacher") {
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
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/teacher/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-foreground hidden sm:inline">Edvion</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">Teacher</p>
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
            <Link href="/teacher/dashboard">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="font-medium">Dashboard</span>
              </div>
            </Link>
            <Link href="/teacher/students">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">My Students</span>
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
