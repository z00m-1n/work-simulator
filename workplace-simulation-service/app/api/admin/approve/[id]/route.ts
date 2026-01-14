import { NextResponse } from "next/server"
import { approveSimulation } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const success = await approveSimulation(id)
    
    if (!success) {
      return NextResponse.json({ error: "Approval failed" }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve simulation" }, { status: 500 })
  }
}
