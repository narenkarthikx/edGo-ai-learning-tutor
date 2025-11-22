"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ExternalLink, Clock, Award, Target } from 'lucide-react'
import { TAMIL_NADU_CLASS_10_CURRICULUM } from '@/lib/curriculum/class10-curriculum'

export default function SyllabusPage() {
  const [selectedSubject, setSelectedSubject] = useState('mathematics')

  const subjects = [
    { key: 'mathematics', name: 'Mathematics', icon: '🧮', color: 'bg-blue-100 text-blue-800' },
    { key: 'science', name: 'Science', icon: '🔬', color: 'bg-green-100 text-green-800' },
    { key: 'english', name: 'English', icon: '📚', color: 'bg-purple-100 text-purple-800' },
    { key: 'socialScience', name: 'Social Science', icon: '🌍', color: 'bg-orange-100 text-orange-800' }
  ]

  const getSubjectData = (key: string) => {
    return TAMIL_NADU_CLASS_10_CURRICULUM[key as keyof typeof TAMIL_NADU_CLASS_10_CURRICULUM]
  }

  const getChapterWeight = (weight: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800', 
      'Low': 'bg-gray-100 text-gray-800'
    }
    return colors[weight as keyof typeof colors] || colors.Low
  }

  const openSelfStudys = (subject: string) => {
    const subjectMap = {
      'mathematics': 'mathematics',
      'science': 'science', 
      'english': 'english',
      'socialScience': 'social-science'
    }
    const mappedSubject = subjectMap[subject as keyof typeof subjectMap] || 'mathematics'
    window.open(`https://www.selfstudys.com/books/tamilnadu/class-10th/${mappedSubject}`, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Tamil Nadu Class 10 Syllabus
        </h1>
        <p className="text-lg text-gray-600">
          Complete TNSCERT curriculum overview for board exam preparation
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-sm">📚 TNSCERT Aligned</Badge>
          <Badge variant="outline" className="text-sm">🎯 Board Exam Focused</Badge>
          <Badge variant="outline" className="text-sm">⭐ High-Priority Topics</Badge>
        </div>
      </div>

      {/* Subject Tabs */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full grid-cols-4">
          {subjects.map((subject) => (
            <TabsTrigger 
              key={subject.key} 
              value={subject.key}
              className="flex items-center gap-2"
            >
              <span>{subject.icon}</span>
              <span className="hidden sm:inline">{subject.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {subjects.map((subject) => {
          const subjectData = getSubjectData(subject.key)
          if (!subjectData) return null

          return (
            <TabsContent key={subject.key} value={subject.key} className="space-y-6">
              {/* Subject Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{subject.icon}</span>
                    <div>
                      <h2 className="text-2xl">{subjectData.name}</h2>
                      <p className="text-sm text-gray-600">
                        {subjectData.totalChapters} Chapters • {subjectData.examPattern.totalMarks} Marks • {subjectData.examPattern.duration}
                      </p>
                    </div>
                  </CardTitle>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openSelfStudys(subject.key)}
                        className="gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Textbooks
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Exam Pattern */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Exam Pattern
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Marks:</span>
                        <p className="font-medium">{subjectData.examPattern.totalMarks}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-medium">{subjectData.examPattern.duration}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Sections:</span>
                        <p className="font-medium text-xs">{subjectData.examPattern.sections.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* High Priority Topics */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                      <Target className="w-4 h-4" />
                      High Priority Topics for Board Exams
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {subjectData.topics
                        .filter(topic => topic.examWeight === 'High')
                        .map((topic) => (
                          <div key={topic.chapter} className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-200">
                            <Badge className="bg-red-600">Ch {topic.chapter}</Badge>
                            <span className="font-medium text-sm">{topic.title}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  {/* All Chapters */}
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Complete Chapter List
                  </h3>
                  <div className="grid gap-4">
                    {subjectData.topics.map((topic) => (
                      <Card key={topic.chapter} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">Chapter {topic.chapter}</Badge>
                              <h4 className="font-semibold">{topic.title}</h4>
                            </div>
                            <Badge className={getChapterWeight(topic.examWeight)}>
                              {topic.examWeight} Priority
                            </Badge>
                          </div>
                          
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Key Topics:</h5>
                            <div className="flex flex-wrap gap-1">
                              {topic.keyTopics.map((keyTopic, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="text-xs"
                                >
                                  {keyTopic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>

      {/* External Resources */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-900">
            <ExternalLink className="w-5 h-5" />
            Free Educational Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">📚 Official Textbooks</h4>
              <p className="text-sm text-blue-700 mb-2">
                Download free TNSCERT textbooks for all subjects
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.selfstudys.com/state-wise/tamilnadu/class-10th', '_blank')}
              >
                Access Textbooks
              </Button>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">🎯 Board Exam Resources</h4>
              <p className="text-sm text-blue-700 mb-2">
                Previous year papers, sample papers, and model answers
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.selfstudys.com/state-wise/tamilnadu/class-10th', '_blank')}
              >
                Practice Papers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}