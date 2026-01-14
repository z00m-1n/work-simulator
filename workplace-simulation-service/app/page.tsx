import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SimulationCard } from "@/components/simulation-card"
import { mockSimulations } from "@/lib/mock-data"

export default function HomePage() {
  const popularSimulations = [...mockSimulations].sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="whitespace-nowrap">당신이라면 어떻게</span>
              <br />
              <span>하시겠습니까?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              실제 업무 상황을 시뮬레이션하고, 동료들의 의견을 들어보세요.
              <br />
              다양한 관점을 통해 더 나은 직장 생활을 만들어갑니다.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/simulations">
                <Button size="lg" className="px-8">
                  상담소 둘러보기
                </Button>
              </Link>
              <Link href="/suggest">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  상황 제안하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Simulations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">인기 상담</h2>
              <p className="mt-1 text-muted-foreground">가장 많은 참여가 이루어진 상황들</p>
            </div>
            <Link href="/simulations">
              <Button variant="outline" className="bg-transparent">
                전체 보기
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularSimulations.map((simulation) => (
              <SimulationCard key={simulation.id} simulation={simulation} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-background py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5,234</div>
              <div className="mt-1 text-sm text-muted-foreground">총 참여자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{mockSimulations.length}</div>
              <div className="mt-1 text-sm text-muted-foreground">상담 케이스</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1,847</div>
              <div className="mt-1 text-sm text-muted-foreground">토론 댓글</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">94%</div>
              <div className="mt-1 text-sm text-muted-foreground">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">당신만의 업무 상황을 공유해보세요</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
                답답했던 상황, 고민되는 상황이 있으신가요? AI가 익명성을 보장하며 상황을 다듬어 드립니다.
              </p>
              <Link href="/suggest">
                <Button size="lg" variant="secondary" className="mt-8">
                  상황 제안하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
