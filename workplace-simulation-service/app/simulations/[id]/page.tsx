"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockSimulations, type Simulation } from "@/lib/mock-data"
import { SimulationDetail } from "@/components/simulation-detail"

export default function SimulationDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [simulation, setSimulation] = useState<Simulation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // mockSimulations에서 먼저 찾기
    let found = mockSimulations.find((s) => s.id === id)
    
    // 없으면 localStorage의 승인된 시뮬레이션에서 찾기
    if (!found) {
      try {
        const approvedSimulations = JSON.parse(localStorage.getItem("approvedSimulations") || "[]")
        found = approvedSimulations.find((s: Simulation) => s.id === id)
      } catch (error) {
        console.error("Failed to load approved simulations:", error)
      }
    }
    
    setSimulation(found || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted mx-auto rounded-lg mb-4" />
          <div className="h-4 w-48 bg-muted mx-auto rounded-lg" />
        </div>
      </div>
    )
  }

  if (!simulation) {
    return (
      <div className="min-h-screen py-20 text-center">
        <h1 className="text-2xl font-bold">시뮬레이션을 찾을 수 없습니다</h1>
        <p className="mt-2 text-muted-foreground">ID: {id}</p>
        <Link href="/simulations">
          <Button className="mt-4">목록으로 돌아가기</Button>
        </Link>
      </div>
    )
  }

  return <SimulationDetail simulation={simulation} />
}
