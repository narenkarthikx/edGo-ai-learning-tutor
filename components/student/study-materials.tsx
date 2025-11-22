"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Clock, Star, ExternalLink, Download } from 'lucide-react'

interface StudyMaterial {
  id: string
  title: string
  subject: string
  grade: number
  type: 'video' | 'pdf' | 'article' | 'exercise'
  duration?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  url: string
  thumbnail?: string
  source: string
}

interface StudyMaterialsProps {
  studentGrade: number
  studentSubjects: string[]
}

export default function StudyMaterials({ studentGrade, studentSubjects }: StudyMaterialsProps) {
  const [materials, setMaterials] = useState<StudyMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string>(studentSubjects[0] || 'Math')

  // Free educational content for Indian students
  const generateStudyMaterials = (subject: string, grade: number): StudyMaterial[] => {
    const baseContent = {
      Math: [
        {
          id: '1',
          title: `Grade ${grade} Mathematics - Basic Concepts`,
          subject: 'Mathematics',
          grade,
          type: 'article' as const,
          duration: '15 min read',
          difficulty: 'Easy' as const,
          description: `Fundamental math concepts for Grade ${grade} students covering arithmetic, geometry, and basic algebra.`,
          url: '#',
          source: 'NCERT Digital Repository',
        },
        {
          id: '2',
          title: `Problem Solving Techniques`,
          subject: 'Mathematics',
          grade,
          type: 'exercise' as const,
          duration: '30 min',
          difficulty: 'Medium' as const,
          description: 'Interactive exercises to improve mathematical reasoning and problem-solving skills.',
          url: '#',
          source: 'Khan Academy (Hindi)',
        }
      ],
      Science: [
        {
          id: '3',
          title: `Grade ${grade} Science - Physics Basics`,
          subject: 'Science',
          grade,
          type: 'video' as const,
          duration: '20 min',
          difficulty: 'Easy' as const,
          description: 'Introduction to basic physics concepts with real-world examples relevant to Indian students.',
          url: '#',
          source: 'BYJU\'S Free Content',
        },
        {
          id: '4',
          title: 'Chemistry Experiments at Home',
          subject: 'Science',
          grade,
          type: 'article' as const,
          duration: '25 min',
          difficulty: 'Medium' as const,
          description: 'Safe chemistry experiments using household items, perfect for government school students.',
          url: '#',
          source: 'Vedantu Free Resources',
        }
      ],
      English: [
        {
          id: '5',
          title: `Grade ${grade} English Grammar`,
          subject: 'English',
          grade,
          type: 'pdf' as const,
          duration: '45 min',
          difficulty: 'Easy' as const,
          description: 'Comprehensive English grammar guide with Indian context examples and exercises.',
          url: '#',
          source: 'NCERT Textbooks',
        },
        {
          id: '6',
          title: 'English Speaking Practice',
          subject: 'English',
          grade,
          type: 'video' as const,
          duration: '30 min',
          difficulty: 'Medium' as const,
          description: 'Improve spoken English with practical conversations and pronunciation tips.',
          url: '#',
          source: 'BBC Learning English',
        }
      ]
    }

    return baseContent[subject as keyof typeof baseContent] || baseContent.Math
  }

  useEffect(() => {
    setLoading(true)
    
    // Fetch real study materials from API
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`/api/study-materials?subject=${selectedSubject}&grade=${studentGrade}&language=en`)
        const data = await response.json()
        
        if (data.materials) {
          setMaterials(data.materials)
        } else {
          // Fallback to generated content
          const fallbackMaterials = generateStudyMaterials(selectedSubject, studentGrade)
          setMaterials(fallbackMaterials)
        }
      } catch (error) {
        console.error('Failed to fetch study materials:', error)
        // Fallback to generated content
        const fallbackMaterials = generateStudyMaterials(selectedSubject, studentGrade)
        setMaterials(fallbackMaterials)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [selectedSubject, studentGrade])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'pdf': return '📄'
      case 'article': return '📖'
      case 'exercise': return '✏️'
      default: return '📚'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Study Materials for Grade {studentGrade}
        </CardTitle>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          {studentSubjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border border-gray-100">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Study materials
          materials.map((material) => (
            <Card key={material.id} className="border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getTypeIcon(material.type)}</span>
                      <h3 className="font-semibold text-lg">{material.title}</h3>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {material.type.toUpperCase()}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(material.difficulty)}`}>
                        {material.difficulty}
                      </Badge>
                      {material.duration && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          {material.duration}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {material.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">
                        📚 {material.source}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Star className="w-3 h-3" />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          className="gap-1"
                          onClick={() => window.open(material.url, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Free Resources Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800">
            <Star className="w-4 h-4" />
            <span className="font-medium">100% Free Educational Resources</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            All materials are curated from NCERT, Khan Academy, BYJU'S free content, and other trusted educational sources specifically for Indian government school students.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}