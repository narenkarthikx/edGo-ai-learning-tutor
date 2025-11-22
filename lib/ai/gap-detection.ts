export interface GapAnalysis {
  gapId: string
  area: string
  severity: "low" | "medium" | "high"
  confidence: number
  affectedSkills: string[]
  recommendation: string
  interventionLevel: "basic" | "intermediate" | "advanced"
}

export function detectLearningGaps(assessmentScores: Record<string, number>, classAverage: number): GapAnalysis[] {
  const gaps: GapAnalysis[] = []

  if (assessmentScores.literacy < classAverage - 10) {
    gaps.push({
      gapId: "gap-literacy-1",
      area: "Letter Recognition",
      severity: assessmentScores.literacy < 40 ? "high" : "medium",
      confidence: 0.85,
      affectedSkills: ["Phonetics", "Reading Fluency", "Spelling"],
      recommendation:
        "Daily 15-minute phonetic drills with visual aids. Practice sound-letter association through interactive games.",
      interventionLevel: assessmentScores.literacy < 40 ? "basic" : "intermediate",
    })
  }

  if (assessmentScores.phonetics && assessmentScores.phonetics < 50) {
    gaps.push({
      gapId: "gap-literacy-2",
      area: "Phonetics & Sound Recognition",
      severity: "high",
      confidence: 0.9,
      affectedSkills: ["Word Formation", "Reading Comprehension", "Pronunciation"],
      recommendation: "Focus on fundamental sound-letter mappings. Use audio reinforcement and repeat sounds daily.",
      interventionLevel: "basic",
    })
  }

  if (assessmentScores.comprehension && assessmentScores.comprehension < 45) {
    gaps.push({
      gapId: "gap-literacy-3",
      area: "Reading Comprehension",
      severity: "medium",
      confidence: 0.8,
      affectedSkills: ["Vocabulary", "Sentence Understanding", "Context Inference"],
      recommendation: "Start with simple stories. Use picture books and guided reading with teacher support.",
      interventionLevel: "intermediate",
    })
  }

  if (assessmentScores.numeracy < classAverage - 10) {
    gaps.push({
      gapId: "gap-numeracy-1",
      area: "Number Sense & Counting",
      severity: assessmentScores.numeracy < 40 ? "high" : "medium",
      confidence: 0.85,
      affectedSkills: ["Counting Sequences", "Subitizing", "Number Conservation"],
      recommendation:
        "Practice counting daily with manipulatives. Use fingers, blocks, or beads for tangible learning.",
      interventionLevel: assessmentScores.numeracy < 40 ? "basic" : "intermediate",
    })
  }

  if (assessmentScores.arithmetic && assessmentScores.arithmetic < 50) {
    gaps.push({
      gapId: "gap-numeracy-2",
      area: "Basic Arithmetic (Addition & Subtraction)",
      severity: "high",
      confidence: 0.88,
      affectedSkills: ["Single-digit Addition", "Single-digit Subtraction", "Mental Maths"],
      recommendation: "Focus on number bonds and fact fluency. Use visual manipulatives and repeated practice.",
      interventionLevel: "basic",
    })
  }

  if (assessmentScores.problemSolving && assessmentScores.problemSolving < 45) {
    gaps.push({
      gapId: "gap-numeracy-3",
      area: "Problem Solving & Reasoning",
      severity: "medium",
      confidence: 0.78,
      affectedSkills: ["Logical Thinking", "Word Problems", "Pattern Recognition"],
      recommendation:
        "Start with concrete word problems using real-world contexts. Build gradually to abstract reasoning.",
      interventionLevel: "intermediate",
    })
  }

  return gaps.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })
}

export function predictFutureGaps(progressData: Array<{ score: number; date: Date }>, difficulty: string): string[] {
  const predictions: string[] = []

  if (progressData.length >= 3) {
    const recent = progressData.slice(-3)
    const isStagnating = recent.every((p) => Math.abs(p.score - recent[0].score) < 5)

    if (isStagnating && recent[0].score < 60) {
      predictions.push("Student may need additional intervention or different instructional approach")
    }

    const trend = recent[recent.length - 1].score - recent[0].score
    if (trend < 0) {
      predictions.push("Alert: Score is decreasing - check for comprehension issues")
    }
  }

  return predictions
}
