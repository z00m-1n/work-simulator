import { NextResponse } from "next/server"
import { getApprovedSimulations } from "@/lib/db"

export async function GET() {
  try {
    const simulations = getApprovedSimulations()
    return NextResponse.json(simulations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch simulations" }, { status: 500 })
  }
}
