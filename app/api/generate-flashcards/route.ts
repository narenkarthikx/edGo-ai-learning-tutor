import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { subject, grade, chapter, chapterTitle, count = 10 } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    })

    const prompt = `
Generate ${count} educational flashcards for Tamil Nadu Class ${grade} students.

Subject: ${subject}
Chapter ${chapter}: ${chapterTitle}

Generate flashcards in the following JSON format:
[
  {
    "question": "Clear, concise question",
    "answer": "Detailed answer with explanation",
    "hint": "Optional helpful hint",
    "difficulty": "easy|medium|hard",
    "topic": "Specific topic within the chapter"
  }
]

Guidelines:
1. Questions should be clear and test understanding, not just memorization
2. Include a mix of difficulty levels (40% easy, 40% medium, 20% hard)
3. Answers should be educational and explain concepts
4. Hints should guide thinking without giving away the answer
5. Follow Tamil Nadu board exam patterns
6. Use simple language appropriate for Class ${grade}
7. Include practical examples where relevant

Return ONLY valid JSON array, no additional text.
`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = response.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.slice(7, -3).trim()
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.slice(3, -3).trim()
    }

    const flashcards = JSON.parse(jsonText)

    return NextResponse.json({ 
      flashcards,
      metadata: {
        subject,
        grade,
        chapter,
        chapterTitle,
        generated: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    )
  }
}
