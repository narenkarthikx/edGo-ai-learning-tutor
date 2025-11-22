"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ExternalLink, Award, Target } from 'lucide-react'

interface SyllabusViewerProps {
  studentGrade: number
}

interface CurriculumTopic {
  chapter: number
  title: string
  keyTopics: string[]
  examWeight: 'High' | 'Medium' | 'Low'
}

interface SubjectInfo {
  name: string
  totalChapters: number
  topics: CurriculumTopic[]
  examPattern: {
    totalMarks: number
    duration: string
    sections: string[]
  }
}

export default function SyllabusViewer({ studentGrade }: SyllabusViewerProps) {
  const [selectedSubject, setSelectedSubject] = useState('mathematics')

  // Grade-specific curriculum data
  const getCurriculum = (grade: number) => {
    if (grade === 7) {
      return {
        mathematics: {
          name: "Mathematics",
          totalChapters: 14,
          topics: [
            {
              chapter: 1,
              title: "Integers",
              keyTopics: ["Adding and subtracting integers", "Multiplication and division", "Properties of integers"],
              examWeight: "High" as const
            },
            {
              chapter: 2,
              title: "Fractions and Decimals",
              keyTopics: ["Operations on fractions", "Decimal to fraction conversion", "Word problems"],
              examWeight: "High" as const
            },
            {
              chapter: 3,
              title: "Simple Equations",
              keyTopics: ["Setting up equations", "Solving equations", "Applications"],
              examWeight: "High" as const
            },
            {
              chapter: 4,
              title: "Lines and Angles",
              keyTopics: ["Types of angles", "Parallel lines", "Angle relationships"],
              examWeight: "Medium" as const
            }
          ],
          examPattern: {
            totalMarks: 80,
            duration: "2.5 hours",
            sections: ["Section A: 1 mark questions", "Section B: 2 mark questions", "Section C: 3 mark questions"]
          }
        },
        science: {
          name: "Science", 
          totalChapters: 18,
          topics: [
            {
              chapter: 1,
              title: "Nutrition in Plants",
              keyTopics: ["Photosynthesis", "Modes of nutrition", "Parasitic and saprotroph plants"],
              examWeight: "High" as const
            },
            {
              chapter: 2,
              title: "Nutrition in Animals",
              keyTopics: ["Human digestive system", "Digestion process", "Ruminants"],
              examWeight: "High" as const
            },
            {
              chapter: 3,
              title: "Heat",
              keyTopics: ["Temperature and thermometer", "Heat transfer", "Clothes for different seasons"],
              examWeight: "Medium" as const
            }
          ],
          examPattern: {
            totalMarks: 80,
            duration: "2.5 hours", 
            sections: ["Section A: 1 mark questions", "Section B: 2 mark questions", "Section C: 3 mark questions"]
          }
        }
      }
    } else {
      // Grade 10 curriculum
      return {
        mathematics: {
          name: "Mathematics",
          totalChapters: 15,
          topics: [
            {
              chapter: 3,
              title: "Quadratic Equations",
              keyTopics: ["Standard form", "Factorization method", "Quadratic formula", "Nature of roots"],
              examWeight: "High" as const
            },
            {
              chapter: 8,
              title: "Introduction to Trigonometry",
              keyTopics: ["Trigonometric ratios", "Trigonometric identities", "Values of ratios"],
              examWeight: "High" as const
            },
            {
              chapter: 7,
              title: "Coordinate Geometry",
              keyTopics: ["Distance formula", "Section formula", "Area of triangle"],
              examWeight: "High" as const
            },
            {
              chapter: 13,
              title: "Statistics",
              keyTopics: ["Mean of grouped data", "Mode", "Median", "Cumulative frequency"],
              examWeight: "Medium" as const
            }
          ],
          examPattern: {
            totalMarks: 100,
            duration: "3 hours",
            sections: ["Section I: 1 mark each", "Section II: 2 marks each", "Section III: 5 marks each", "Section IV: 8 marks each"]
          }
        },
        science: {
          name: "Science",
          totalChapters: 16,
          topics: [
            {
              chapter: 10,
              title: "Light - Reflection and Refraction",
              keyTopics: ["Laws of reflection", "Spherical mirrors", "Refraction", "Lenses"],
              examWeight: "High" as const
            },
            {
              chapter: 12,
              title: "Electricity",
              keyTopics: ["Electric current and circuit", "Ohm's law", "Resistors", "Electric power"],
              examWeight: "High" as const
            },
            {
              chapter: 8,
              title: "Heredity and Evolution",
              keyTopics: ["Heredity", "Mendelian experiments", "Evolution", "Speciation"],
              examWeight: "High" as const
            },
            {
              chapter: 6,
              title: "Life Processes",
              keyTopics: ["Nutrition", "Respiration", "Transportation", "Excretion"],
              examWeight: "Medium" as const
            }
          ],
          examPattern: {
            totalMarks: 100,
            duration: "3 hours",
            sections: ["Section I: 1 mark each", "Section II: 2 marks each", "Section III: 5 marks each", "Section IV: 8 marks each"]
          }
        }
      }
    }
  }

  const curriculum = getCurriculum(studentGrade)
  const currentSubject = curriculum[selectedSubject as keyof typeof curriculum] as SubjectInfo

  const openSelfStudys = (subject: string) => {
    window.open(`https://www.selfstudys.com/books/tamilnadu/class-${studentGrade}th/${subject}`, '_blank')
  }

  const getChapterWeight = (weight: string) => {
    switch (weight) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getHighPriorityTopics = () => {
    return currentSubject.topics.filter(topic => topic.examWeight === 'High')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Class {studentGrade} Tamil Nadu Curriculum
        </h2>
        <p className="text-lg text-gray-600">
          Complete syllabus overview with exam patterns and key focus areas
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-sm">📚 TNSCERT Aligned</Badge>
          <Badge variant="outline" className="text-sm">🎯 Grade {studentGrade} Focused</Badge>
          <Badge variant="outline" className="text-sm">⭐ High-Priority Topics</Badge>
        </div>
      </div>

      {/* Subject Tabs */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            🧮 <span className="hidden sm:inline">Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="science" className="flex items-center gap-2">
            🔬 <span className="hidden sm:inline">Science</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSubject} className="space-y-6">
          {currentSubject && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{selectedSubject === 'mathematics' ? '🧮' : '🔬'}</span>
                  <div>
                    <h3 className="text-2xl">{currentSubject.name}</h3>
                    <p className="text-sm text-gray-600">
                      Class {studentGrade} • {currentSubject.totalChapters} Chapters • Tamil Nadu State Board
                    </p>
                  </div>
                </CardTitle>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openSelfStudys(selectedSubject)}
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Textbook
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Exam Pattern */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Exam Pattern
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Marks:</span>
                      <p className="font-medium">{currentSubject.examPattern.totalMarks}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <p className="font-medium">{currentSubject.examPattern.duration}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-gray-600">Sections:</span>
                      <p className="font-medium text-xs">{currentSubject.examPattern.sections.length} sections</p>
                    </div>
                  </div>
                </div>

                {/* High Priority Topics */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                    <Target className="w-4 h-4" />
                    High Priority Topics (Exam Focus)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getHighPriorityTopics().map((topic) => (
                      <div key={topic.chapter} className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-200">
                        <Badge className="bg-red-600">Ch {topic.chapter}</Badge>
                        <span className="font-medium text-sm">{topic.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Topics */}
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Complete Chapter List
                </h4>
                <div className="grid gap-4">
                  {currentSubject.topics.map((topic) => (
                    <Card key={topic.chapter} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Chapter {topic.chapter}</Badge>
                            <h5 className="font-semibold">{topic.title}</h5>
                          </div>
                          <Badge className={getChapterWeight(topic.examWeight)}>
                            {topic.examWeight} Priority
                          </Badge>
                        </div>
                        
                        <div className="mt-3">
                          <h6 className="text-sm font-medium text-gray-700 mb-2">Key Topics:</h6>
                          <div className="flex flex-wrap gap-1">
                            {topic.keyTopics.map((keyTopic, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
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
          )}
        </TabsContent>
      </Tabs>

      {/* Additional Resources */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-900">
            <ExternalLink className="w-5 h-5" />
            Additional Study Resources
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">📚 Official Textbooks</h5>
              <p className="text-sm text-blue-700 mb-2">
                Access Tamil Nadu state board official textbooks and reference materials.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://www.selfstudys.com/state-wise/tamilnadu/class-${studentGrade}th`, '_blank')}
              >
                Download Books
              </Button>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 mb-2">🎯 Practice Resources</h5>
              <p className="text-sm text-blue-700 mb-2">
                Previous year question papers and practice sets for better preparation.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://www.selfstudys.com/state-wise/tamilnadu/class-${studentGrade}th`, '_blank')}
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