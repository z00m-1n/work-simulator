import { NextResponse } from "next/server"
import { createPendingSimulation } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, title, situation, choices, aiRecommendation, aiReasoning, persona } = body
    
    if (!category || !title || !situation || !choices || !persona) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    // choices 배열에 votes와 votesByPosition 초기화
    const initializedChoices = choices.map((choice: any) => ({
      ...choice,
      votes: 0,
      votesByPosition: {
        intern: 0,
        staff: 0,
        senior: 0,
        manager: 0,
        director: 0,
      },
    }))
    
    const simulation = createPendingSimulation({
      category,
      title,
      situation,
      choices: initializedChoices,
      aiRecommendation: aiRecommendation || "",
      aiReasoning: aiReasoning || "",
      persona,
    })
    
    return NextResponse.json(simulation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create suggestion" }, { status: 500 })
  }
}
