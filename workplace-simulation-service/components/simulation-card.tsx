import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Simulation } from "@/lib/mock-data"
import { categories } from "@/lib/mock-data"

interface SimulationCardProps {
  simulation: Simulation
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  // 카테고리가 배열이거나 단일 값일 수 있음
  const categoryIds = Array.isArray(simulation.category) ? simulation.category : [simulation.category]
  const simulationCategories = categoryIds
    .map((id) => categories.find((c) => c.id === id))
    .filter((c) => c !== undefined)
  
  const totalVotes = simulation.totalVotes || simulation.choices.reduce((acc, c) => acc + c.votes, 0)
  
  // 승인 시간 포맷팅
  const formatApprovedDate = (dateString: string | undefined) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffHours < 1) return "방금 전"
    if (diffHours < 24) return `${diffHours}시간 전`
    if (diffDays < 7) return `${diffDays}일 전`
    
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
  }

  return (
    <Link href={`/simulations/${simulation.id}`}>
      <Card className="group h-full cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {simulationCategories.map((category) => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.icon} {category.name}
              </Badge>
            ))}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {simulation.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{simulation.situation}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            {simulation.approvedAt && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {formatApprovedDate(simulation.approvedAt)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {simulation.choices.length}개 선택지
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {totalVotes.toLocaleString()}명 참여
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {simulation.comments.length}개 댓글
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
