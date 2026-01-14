"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { categories } from "@/lib/mock-data"
import type { Simulation } from "@/lib/db"

const ADMIN_PASSWORD = "0000"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 저장된 인증 상태 확인
    const authStatus = sessionStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadPendingSimulations()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      setPasswordError("")
    } else {
      setPasswordError("비밀번호가 올바르지 않습니다.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_authenticated")
    setPassword("")
  }

  const loadPendingSimulations = async () => {
    try {
      const response = await fetch("/api/admin/pending")
      const data = await response.json()
      setSimulations(data)
    } catch (error) {
      console.error("Failed to load pending simulations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = (simulation: Simulation, action: "approve" | "reject") => {
    setSelectedSimulation(simulation)
    setActionType(action)
  }

  const confirmAction = async () => {
    if (!selectedSimulation) return

    try {
      const endpoint =
        actionType === "approve"
          ? `/api/admin/approve/${selectedSimulation.id}`
          : `/api/admin/reject/${selectedSimulation.id}`

      const response = await fetch(endpoint, {
        method: "POST",
      })

      if (response.ok) {
        setSimulations(simulations.filter((s) => s.id !== selectedSimulation.id))
        setSelectedSimulation(null)
        setActionType(null)
        setRejectReason("")
      }
    } catch (error) {
      console.error("Action failed:", error)
    }
  }

  const stats = {
    pending: simulations.length,
    approved: 47,
    rejected: 12,
  }

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">관리자 로그인</CardTitle>
            <CardDescription>관리자 페이지에 접근하려면 비밀번호를 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError("")
                  }}
                  className={passwordError ? "border-red-500" : ""}
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">관리자 대시보드</h1>
            <p className="mt-2 text-muted-foreground">제안된 상담 케이스를 검토하고 승인/거절합니다.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            로그아웃
          </Button>
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
                <CardTitle>최근 처리 내역</CardTitle>
                <CardDescription>지난 7일간 처리된 상담 케이스</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "급한 퇴근 요청에 대한 상사의 추가 업무 지시", status: "approved", date: "2024-01-15" },
                    { title: "프로젝트 일정 지연에 대한 책임 소재", status: "approved", date: "2024-01-14" },
                    { title: "부적절한 내용 포함된 제안", status: "rejected", date: "2024-01-14" },
                    { title: "고객사의 무리한 요구사항 변경", status: "approved", date: "2024-01-13" },
                    { title: "동료의 업무 실수를 발견했을 때", status: "approved", date: "2024-01-12" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.status === "approved" ? "bg-emerald-500/10" : "bg-destructive/10"
                          }`}
                        >
                          {item.status === "approved" ? (
                            <svg
                              className="h-4 w-4 text-emerald-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
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
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          item.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                            : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        }
                      >
                        {item.status === "approved" ? "승인됨" : "거절됨"}
                      </Badge>
                    </div>
                  ))}
                </div>
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
