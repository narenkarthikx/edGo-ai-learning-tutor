import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Gap {
  id: string
  area: string
  severity: "low" | "medium" | "high"
  recommendation: string
}

export default function GapDetector({ gap }: { gap: Gap }) {
  const severityColor = {
    low: "bg-green-50 border-green-200",
    medium: "bg-yellow-50 border-yellow-200",
    high: "bg-red-50 border-red-200",
  }

  const severityIcon = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  }

  return (
    <Card className={`border-2 ${severityColor[gap.severity]}`}>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <AlertCircle className={`w-5 h-5 ${severityIcon[gap.severity]}`} />
            <h3 className="font-semibold text-foreground">{gap.area}</h3>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${
                gap.severity === "high"
                  ? "bg-red-100 text-red-700"
                  : gap.severity === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {gap.severity} Priority
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <TrendingUp className="w-4 h-4 mr-2" />
            Practice Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
