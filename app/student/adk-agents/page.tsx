'use client'

import { useState, useEffect } from 'react'
import { ADKAgentInterface } from '@/components/student/adk-agent-interface'
import { ADKAgentShowcase } from '@/components/student/adk-agent-showcase'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ADKAgentsPage() {
  const { t } = useTranslation()
  const [userGrade, setUserGrade] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserGrade(user.grade || 10)
    } else {
      setUserGrade(10)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="interface" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="interface" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            {t('agents.tryAgents')}
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {t('agents.aboutAgents')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="interface">
          <ADKAgentInterface 
            grade={userGrade || 10}
            subject="general"
            context={{
              difficulty: 'intermediate',
              learningStyle: 'visual'
            }}
          />
        </TabsContent>
        
        <TabsContent value="about">
          <ADKAgentShowcase />
        </TabsContent>
      </Tabs>
    </div>
  )
}
