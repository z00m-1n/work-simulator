import { NextResponse } from "next/server"
import { getPendingSimulations } from "@/lib/db"

export async function GET() {
  try {
    const simulations = getPendingSimulations()
    return NextResponse.json(simulations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pending simulations" }, { status: 500 })
  }
}
