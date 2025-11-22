import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle } from "lucide-react"

interface Lesson {
  id: string
  title: string
  subject: "literacy" | "numeracy" | "mathematics" | "science" | "english" | "social_studies" | "hindi" | "physics" | "chemistry" | "biology" | "computer_science"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  completed: boolean
}

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const difficultyColor = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-purple-100 text-purple-700",
  }

  const subjectNames = {
    literacy: "Literacy",
    numeracy: "Numeracy", 
    mathematics: "Mathematics",
    science: "Science",
    english: "English",
    social_studies: "Social Studies",
    hindi: "Hindi",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    computer_science: "Computer Science",
  }

  const subjectColor = {
    literacy: "text-blue-600",
    numeracy: "text-orange-600",
    mathematics: "text-purple-600",
    science: "text-green-600",
    english: "text-blue-500",
    social_studies: "text-yellow-600",
    hindi: "text-red-600",
    physics: "text-indigo-600",
    chemistry: "text-cyan-600", 
    biology: "text-emerald-600",
    computer_science: "text-gray-600",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
            <CardDescription>
              <span className={`${subjectColor[lesson.subject]}`}>{subjectNames[lesson.subject]}</span>
            </CardDescription>
          </div>
          {lesson.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${difficultyColor[lesson.difficulty]}`}
          >
            {lesson.difficulty}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            {lesson.duration} min
          </div>
        </div>
        <Button className="w-full" disabled={lesson.completed}>
          {lesson.completed ? "Completed" : "Start Lesson"}
        </Button>
      </CardContent>
    </Card>
  )
}
