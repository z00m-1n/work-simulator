import { NextResponse } from "next/server"
import { rejectSimulation } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = rejectSimulation(params.id)
    
    if (!success) {
      return NextResponse.json({ error: "Rejection failed" }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to reject simulation" }, { status: 500 })
  }
}
