import { NextResponse } from "next/server"
import { getSimulationById } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const simulation = getSimulationById(params.id)
    
    if (!simulation) {
      return NextResponse.json({ error: "Simulation not found" }, { status: 404 })
    }
    
    return NextResponse.json(simulation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch simulation" }, { status: 500 })
  }
}
