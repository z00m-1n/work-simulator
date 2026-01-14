import { NextResponse } from "next/server"
import { addComment } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { simulationId, choiceId, author, content } = body
    
    if (!simulationId || !choiceId || !author || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    const comment = addComment(simulationId, choiceId, author, content)
    
    if (!comment) {
      return NextResponse.json({ error: "Comment creation failed" }, { status: 400 })
    }
    
    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
  }
}
