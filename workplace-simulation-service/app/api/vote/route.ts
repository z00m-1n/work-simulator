import { NextResponse } from "next/server"
import { voteOnChoice } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { simulationId, choiceId, position } = body
    
    if (!simulationId || !choiceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    const success = voteOnChoice(simulationId, choiceId, position)
    
    if (!success) {
      return NextResponse.json({ error: "Vote failed" }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process vote" }, { status: 500 })
  }
}
