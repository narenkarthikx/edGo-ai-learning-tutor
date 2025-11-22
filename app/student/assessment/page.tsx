"use client"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AssessmentPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Skill Assessment</h1>
        <p className="text-muted-foreground">Let's assess your current skills to personalize your learning path</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Literacy Assessment */}
        <Link href="/student/assessment/literacy">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Literacy Assessment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Assess reading and writing skills through interactive exercises
                  </p>
                  <div className="text-xs text-muted-foreground mb-4">Estimated time: 10 minutes</div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    Start Assessment <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Numeracy Assessment */}
        <Link href="/student/assessment/numeracy">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Numeracy Assessment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Assess math and problem-solving skills through practical problems
                  </p>
                  <div className="text-xs text-muted-foreground mb-4">Estimated time: 10 minutes</div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    Start Assessment <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-blue-900 mb-2">About These Assessments</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Questions adapt based on your answers</li>
            <li>• No time limits - go at your own pace</li>
            <li>• Results help personalize your learning path</li>
            <li>• You can retake assessments anytime</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
