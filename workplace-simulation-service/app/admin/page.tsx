"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { categories, type Simulation } from "@/lib/mock-data"

interface RejectedSimulation extends Simulation {
  rejectReason: string
  rejectedAt: string
}

export default function AdminPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [rejectedSimulations, setRejectedSimulations] = useState<RejectedSimulation[]>([])
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  // localStorage에서 대기 중인 시뮬레이션 로드
  useEffect(() => {
    try {
      const pending = JSON.parse(localStorage.getItem("pendingSimulations") || "[]")
      setSimulations(pending)
      
      const rejected = JSON.parse(localStorage.getItem("rejectedSimulations") || "[]")
      setRejectedSimulations(rejected)
    } catch (error) {
      console.error("Failed to load simulations:", error)
    }
  }, [])

  const handleAction = (simulation: Simulation, action: "approve" | "reject") => {
    setSelectedSimulation(simulation)
    setActionType(action)
  }

  const confirmAction = () => {
    if (!selectedSimulation) return

    try {
      // 대기 목록에서 제거
      const updatedPending = simulations.filter((s) => s.id !== selectedSimulation.id)
      localStorage.setItem("pendingSimulations", JSON.stringify(updatedPending))
      setSimulations(updatedPending)

      if (actionType === "approve") {
        // 승인된 시뮬레이션을 localStorage에 추가
        const approvedSimulations = JSON.parse(localStorage.getItem("approvedSimulations") || "[]")
        const approvedSimulation = {
          ...selectedSimulation,
          status: "active" as const,
          id: `sim-${Date.now()}`, // 새로운 ID 할당
        }
        approvedSimulations.push(approvedSimulation)
        localStorage.setItem("approvedSimulations", JSON.stringify(approvedSimulations))
      } else if (actionType === "reject" && rejectReason.trim()) {
        // 거절된 시뮬레이션을 localStorage에 추가
        const rejectedSimulations = JSON.parse(localStorage.getItem("rejectedSimulations") || "[]")
        const rejectedSimulation: RejectedSimulation = {
          ...selectedSimulation,
          rejectReason: rejectReason.trim(),
          rejectedAt: new Date().toISOString().split("T")[0],
        }
        rejectedSimulations.push(rejectedSimulation)
        localStorage.setItem("rejectedSimulations", JSON.stringify(rejectedSimulations))
        setRejectedSimulations(rejectedSimulations)
      }

      setSelectedSimulation(null)
      setActionType(null)
      setRejectReason("")
    } catch (error) {
      console.error("Failed to process simulation:", error)
      alert("처리에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const stats = {
    pending: simulations.length,
    approved: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("approvedSimulations") || "[]").length : 0,
    rejected: rejectedSimulations.length,
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">관리자 대시보드</h1>
          <p className="mt-2 text-muted-foreground">제안된 상담 케이스를 검토하고 승인/거절합니다.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">대기 중</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                  <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">승인됨</p>
                  <p className="text-3xl font-bold text-foreground">{stats.approved}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                  <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">거절됨</p>
                  <p className="text-3xl font-bold text-foreground">{stats.rejected}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                  <svg className="h-6 w-6 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Simulations */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">대기 중 ({stats.pending})</TabsTrigger>
            <TabsTrigger value="history">처리 내역</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {simulations.length > 0 ? (
              <div className="space-y-4">
                {simulations.map((simulation) => {
                  const category = categories.find((c) => c.id === simulation.category)
                  return (
                    <Card key={simulation.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="secondary">
                                {category?.icon} {category?.name}
                              </Badge>
                              <Badge variant="outline">{simulation.persona.position}</Badge>
                              <Badge variant="outline">{simulation.persona.yearsOfExperience}년차</Badge>
                              <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">대기 중</Badge>
                              <span className="text-xs text-muted-foreground">{simulation.createdAt}에 제출됨</span>
                            </div>
                            <CardTitle className="text-lg">{simulation.title}</CardTitle>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                              onClick={() => handleAction(simulation, "reject")}
                            >
                              거절
                            </Button>
                            <Button size="sm" onClick={() => handleAction(simulation, "approve")}>
                              승인
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">상황 설명</p>
                            <p className="text-foreground">{simulation.situation}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">선택지</p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {simulation.choices.map((choice, index) => (
                                <div
                                  key={choice.id}
                                  className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  <span className="text-foreground">{choice.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <svg
                      className="h-8 w-8 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground">모든 제안을 처리했습니다</h3>
                  <p className="mt-1 text-muted-foreground">새로운 제안이 들어오면 여기에 표시됩니다.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>거절된 상담 케이스</CardTitle>
                <CardDescription>거절 사유와 함께 확인할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent>
                {rejectedSimulations.length > 0 ? (
                  <div className="space-y-4">
                    {rejectedSimulations.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                              <svg
                                className="h-4 w-4 text-destructive"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.rejectedAt}에 거절됨</p>
                            </div>
                          </div>
                          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                            거절됨
                          </Badge>
                        </div>
                        <div className="ml-11 p-3 bg-muted/50 rounded-md">
                          <p className="text-xs font-medium text-muted-foreground mb-1">거절 사유</p>
                          <p className="text-sm text-foreground">{item.rejectReason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    거절된 케이스가 없습니다.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Approval/Rejection Dialog */}
        <Dialog open={!!selectedSimulation} onOpenChange={() => setSelectedSimulation(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{actionType === "approve" ? "상담 케이스 승인" : "상담 케이스 거절"}</DialogTitle>
              <DialogDescription>
                {actionType === "approve"
                  ? "이 상담 케이스를 승인하면 모든 사용자에게 공개됩니다."
                  : "거절 사유를 입력해주세요. 제안자에게 전달됩니다."}
              </DialogDescription>
            </DialogHeader>

            {selectedSimulation && (
              <div className="py-4">
                <p className="font-medium text-foreground mb-2">{selectedSimulation.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{selectedSimulation.situation}</p>
              </div>
            )}

            {actionType === "reject" && (
              <div className="space-y-2">
                <Textarea
                  placeholder="거절 사유를 입력해주세요..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSimulation(null)} className="bg-transparent">
                취소
              </Button>
              <Button
                onClick={confirmAction}
                className={
                  actionType === "reject" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""
                }
                disabled={actionType === "reject" && !rejectReason.trim()}
              >
                {actionType === "approve" ? "승인하기" : "거절하기"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
