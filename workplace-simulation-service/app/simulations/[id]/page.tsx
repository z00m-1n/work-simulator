import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockSimulations } from "@/lib/mock-data"
import { SimulationDetail } from "@/components/simulation-detail"

export default async function SimulationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const simulation = mockSimulations.find((s) => s.id === id)

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
