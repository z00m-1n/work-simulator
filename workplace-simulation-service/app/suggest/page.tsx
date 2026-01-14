"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { categories, positions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Step = "input" | "processing" | "preview" | "submitted"

interface GeneratedSimulation {
  title: string
  situation: string
  choices: { id: string; text: string }[]
}

export default function SuggestPage() {
  const [step, setStep] = useState<Step>("input")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [situation, setSituation] = useState("")
  const [position, setPosition] = useState("")
  const [yearsOfExperience, setYearsOfExperience] = useState("")
  const [generatedSimulation, setGeneratedSimulation] = useState<GeneratedSimulation | null>(null)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedSituation, setEditedSituation] = useState("")
  const [editedChoices, setEditedChoices] = useState<{ id: string; text: string }[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((c) => c !== categoryId)
      }
      return [...prev, categoryId]
    })
  }

  const handleGenerate = async () => {
    if (selectedCategories.length === 0 || !situation.trim() || !position) return

    setStep("processing")

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const generated = {
      title: "팀 미팅에서 다른 의견을 제시해야 할 때",
      situation: `팀 미팅에서 상사가 제안한 방향에 대해 다른 의견이 있습니다. 당신의 의견이 프로젝트에 더 좋은 결과를 가져올 수 있다고 확신하지만, 분위기상 반대 의견을 내기가 조심스럽습니다. 어떻게 대응하시겠습니까?`,
      choices: [
        { id: "a", text: "미팅 중 정중하게 의견을 제시한다" },
        { id: "b", text: "미팅 후 상사에게 따로 말씀드린다" },
        { id: "c", text: "동료에게 먼저 의견을 공유하고 함께 제안한다" },
        { id: "d", text: "일단 상사의 의견을 따른다" },
      ],
    }

    setGeneratedSimulation(generated)
    setEditedTitle(generated.title)
    setEditedSituation(generated.situation)
    setEditedChoices([...generated.choices])
    setStep("preview")
  }

  const handleSubmit = async () => {
    // localStorage에 제안된 시뮬레이션 저장
    const newSimulation = {
      id: `pending-${Date.now()}`,
      category: selectedCategories[0] || "project",
      title: editedTitle,
      situation: editedSituation,
      choices: editedChoices.map((choice) => ({
        ...choice,
        votes: 0,
        votesByPosition: { intern: 0, staff: 0, senior: 0, manager: 0, director: 0 },
      })),
      comments: [],
      aiRecommendation: "",
      aiReasoning: "",
      totalVotes: 0,
      status: "pending" as const,
      createdAt: new Date().toISOString().split("T")[0],
      persona: {
        position: position,
        yearsOfExperience: parseInt(yearsOfExperience) || 1,
      },
    }

    try {
      const pendingSimulations = JSON.parse(localStorage.getItem("pendingSimulations") || "[]")
      pendingSimulations.push(newSimulation)
      localStorage.setItem("pendingSimulations", JSON.stringify(pendingSimulations))
      setStep("submitted")
    } catch (error) {
      console.error("Failed to save simulation:", error)
      alert("제출에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleReset = () => {
    setStep("input")
    setSelectedCategories([])
    setSituation("")
    setPosition("")
    setYearsOfExperience("")
    setGeneratedSimulation(null)
    setEditedTitle("")
    setEditedSituation("")
    setEditedChoices([])
  }

  const updateChoice = (index: number, text: string) => {
    setEditedChoices((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], text }
      return updated
    })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">상황 제안하기</h1>
          <p className="mt-2 text-muted-foreground">
            업무 중 답답했던 상황을 공유해주세요. AI가 익명성을 보장하며 다듬어 드립니다.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {["상황 입력", "AI 다듬기", "미리보기", "제출 완료"].map((label, index) => {
              const stepOrder: Step[] = ["input", "processing", "preview", "submitted"]
              const currentIndex = stepOrder.indexOf(step)
              const isActive = index <= currentIndex
              const isCurrent = index === currentIndex

              return (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                    >
                      {index + 1}
                    </div>
                    <span className={`mt-2 text-xs ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`h-0.5 flex-1 mx-2 ${index < currentIndex ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Input */}
        {step === "input" && (
          <Card>
            <CardHeader>
              <CardTitle>어떤 상황이 답답하셨나요?</CardTitle>
              <CardDescription>구체적으로 작성할수록 좋은 시뮬레이션이 만들어집니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>카테고리 (중복 선택 가능)</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id)
                    return (
                      <Button
                        key={cat.id}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(!isSelected && "bg-transparent")}
                      >
                        {cat.icon} {cat.name}
                        {isSelected && <span className="ml-1 text-xs">✓</span>}
                      </Button>
                    )
                  })}
                </div>
                {selectedCategories.length > 0 && (
                  <p className="text-sm text-muted-foreground">{selectedCategories.length}개 선택됨</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">해당 상황의 직급</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="직급을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.name}>
                        {pos.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">경력 (년차)</Label>
                <Input
                  id="years"
                  type="number"
                  min="1"
                  max="30"
                  placeholder="예: 3"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="situation">상황 설명</Label>
                <Textarea
                  id="situation"
                  placeholder="예: 상사가 금요일 퇴근 직전에 주말에 출근해서 일하라고 했는데, 중요한 개인 일정이 있어서 정말 난감했어요..."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  개인정보나 회사명 등은 AI가 자동으로 익명 처리합니다. 솔직하게 작성해주세요.
                </p>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={selectedCategories.length === 0 || !situation.trim() || !position}
                className="w-full"
              >
                AI로 시뮬레이션 생성하기
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Processing */}
        {step === "processing" && (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI가 상황을 다듬고 있습니다</h3>
              <p className="mt-2 text-muted-foreground">익명성을 보장하며 객관적인 시뮬레이션으로 변환 중...</p>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preview - 수정 가능하도록 변경 */}
        {step === "preview" && generatedSimulation && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI가 생성한 시뮬레이션</CardTitle>
                  <Badge variant="secondary">수정 가능</Badge>
                </div>
                <CardDescription>
                  내용을 확인하고 필요시 수정 후 제출해주세요. 운영자 승인 후 공개됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">제목</Label>
                  <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="font-medium" />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">페르소나</Label>
                  <div className="flex gap-2">
                    <Badge variant="outline">{position}</Badge>
                    {yearsOfExperience && <Badge variant="outline">{yearsOfExperience}년차</Badge>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">상황 설명</Label>
                  <Textarea value={editedSituation} onChange={(e) => setEditedSituation(e.target.value)} rows={4} />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">선택지</Label>
                  <div className="space-y-2">
                    {editedChoices.map((choice, index) => (
                      <div key={choice.id} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <Input value={choice.text} onChange={(e) => updateChoice(index, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
                다시 작성
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                제출하기
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Submitted */}
        {step === "submitted" && (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">제출이 완료되었습니다!</h3>
              <p className="mt-2 text-muted-foreground">
                운영자가 검토 후 승인하면 다른 회원들도 참여할 수 있게 됩니다.
                <br />
                보통 1-2일 내에 처리됩니다.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Button variant="outline" onClick={handleReset} className="bg-transparent">
                  새 상황 제안하기
                </Button>
                <Button asChild>
                  <a href="/simulations">상담소 보기</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guidelines */}
        {step === "input" && (
          <Card className="mt-8 border-dashed">
            <CardHeader>
              <CardTitle className="text-base">작성 가이드</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 shrink-0 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  실제 경험한 상황을 구체적으로 작성해주세요
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 shrink-0 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  여러 가지 선택지가 가능한 상황이 좋습니다
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 shrink-0 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  회사명, 사람 이름 등은 AI가 자동으로 익명 처리합니다
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 shrink-0 text-destructive"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  비방, 욕설, 차별적 내용은 승인되지 않습니다
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
