"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  categories,
  positions,
  generateRandomNickname,
  type Simulation,
  type Choice,
  type Comment,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function CommentItem({
  comment,
  simulation,
  choiceLabels,
  depth = 0,
  onReply,
  selectedChoice,
  onLike,
}: {
  comment: Comment
  simulation: Simulation
  choiceLabels: string[]
  depth?: number
  onReply: (parentId: string, content: string) => void
  selectedChoice: string | null
  onLike: (commentId: string) => void
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const choiceIndex = simulation.choices.findIndex((c) => c.id === comment.choiceId)

  const canReply = depth < 1 && selectedChoice

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent("")
      setShowReplyForm(false)
    }
  }

  return (
    <div className={cn("relative", depth > 0 && "ml-8 mt-3")}>
      {depth > 0 && <div className="absolute -left-4 top-0 bottom-0 w-px bg-border" />}
      <Card className={cn(depth > 0 && "border-muted")}>
        <CardContent className="pt-4 pb-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full bg-muted",
                depth === 0 ? "h-10 w-10" : "h-8 w-8",
              )}
            >
              <svg
                className={cn("text-muted-foreground", depth === 0 ? "h-5 w-5" : "h-4 w-4")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("font-medium text-foreground", depth > 0 && "text-sm")}>{comment.author}</span>
                <Badge variant="outline" className="text-xs">
                  {choiceLabels[choiceIndex]}안 선택
                </Badge>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className={cn("mt-1.5 text-foreground", depth > 0 && "text-sm")}>{comment.content}</p>
              <div className="mt-2 flex items-center gap-4">
                <button
                  onClick={() => onLike(comment.id)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  추천 {comment.likes}
                </button>
                {canReply && (
                  <button
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                  >
                    답글
                  </button>
                )}
              </div>

              {showReplyForm && (
                <div className="mt-3 space-y-2">
                  <Textarea
                    placeholder="답글을 작성해주세요..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowReplyForm(false)}
                      className="bg-transparent"
                    >
                      취소
                    </Button>
                    <Button size="sm" onClick={handleSubmitReply} disabled={!replyContent.trim()}>
                      답글 작성
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {comment.replies && comment.replies.length > 0 && depth < 1 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              simulation={simulation}
              choiceLabels={choiceLabels}
              depth={depth + 1}
              onReply={onReply}
              selectedChoice={selectedChoice}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SimulationDetail({ simulation: initialSimulation }: { simulation: Simulation }) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(initialSimulation.comments)
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [simulation, setSimulation] = useState(initialSimulation)
  const [voting, setVoting] = useState(false)

  // 투표 기록 확인 및 로드
  useEffect(() => {
    const voteKey = `vote_${simulation.id}`
    const savedVote = localStorage.getItem(voteKey)
    
    if (savedVote) {
      setSelectedChoice(savedVote)
      setHasVoted(true)
      setShowResults(true)
    }
  }, [simulation.id])

  const category = categories.find((c) => c.id === simulation.category)
  const totalVotes = simulation.totalVotes + (hasVoted ? 1 : 0)

  const handleVote = async () => {
    if (selectedChoice && !voting) {
      setVoting(true)
      try {
        const response = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            simulationId: simulation.id,
            choiceId: selectedChoice,
            position: positionFilter !== "all" ? positionFilter : undefined,
          }),
        })

        if (response.ok) {
          // 업데이트된 시뮬레이션 데이터 가져오기
          const simResponse = await fetch(`/api/simulations/${simulation.id}`)
          const updatedSim = await simResponse.json()
          setSimulation(updatedSim)
          setHasVoted(true)
          setShowResults(true)
          
          // localStorage에 투표 기록 저장
          const voteKey = `vote_${simulation.id}`
          localStorage.setItem(voteKey, selectedChoice)
        }
      } catch (error) {
        console.error("Vote failed:", error)
      } finally {
        setVoting(false)
      }
    }
  }

  const getVotePercentage = (choice: Choice) => {
    if (positionFilter === "all") {
      const votes = choice.votes
      return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
    } else {
      const positionVotes = choice.votesByPosition?.[positionFilter as keyof typeof choice.votesByPosition] || 0
      const totalPositionVotes = simulation.choices.reduce(
        (acc, c) => acc + (c.votesByPosition?.[positionFilter as keyof typeof c.votesByPosition] || 0),
        0,
      )
      return totalPositionVotes > 0 ? Math.round((positionVotes / totalPositionVotes) * 100) : 0
    }
  }

  const getVoteCount = (choice: Choice) => {
    if (positionFilter === "all") {
      return choice.votes
    }
    return choice.votesByPosition?.[positionFilter as keyof typeof choice.votesByPosition] || 0
  }

  const handleAddComment = async () => {
    if (newComment.trim() && selectedChoice) {
      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            simulationId: simulation.id,
            choiceId: selectedChoice,
            author: generateRandomNickname(),
            content: newComment,
          }),
        })

        if (response.ok) {
          const comment = await response.json()
          setComments([comment, ...comments])
          setNewComment("")
        }
      } catch (error) {
        console.error("Failed to add comment:", error)
      }
    }
  }

  const handleAddReply = (parentId: string, content: string) => {
    if (!selectedChoice) return

    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      author: generateRandomNickname(),
      choiceId: selectedChoice,
      content,
      timestamp: "방금 전",
      likes: 0,
    }

    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          }
        }
        return comment
      })
    }

    setComments(addReplyToComment(comments))
  }

  const handleLike = (commentId: string) => {
    const updateLikes = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        if (comment.replies) {
          return { ...comment, replies: updateLikes(comment.replies) }
        }
        return comment
      })
    }
    setComments(updateLikes(comments))
  }

  const getTotalCommentCount = (comments: Comment[]): number => {
    return comments.reduce((acc, comment) => {
      return acc + 1 + (comment.replies ? getTotalCommentCount(comment.replies) : 0)
    }, 0)
  }

  const totalCommentCount = getTotalCommentCount(comments)
  const choiceLabels = ["A", "B", "C", "D", "E", "F"]

  // 카테고리 배열 처리
  const categoryIds = Array.isArray(simulation.category) ? simulation.category : [simulation.category]
  const simulationCategories = categoryIds
    .map((id) => categories.find((c) => c.id === id))
    .filter((c) => c !== undefined)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/simulations" className="hover:text-foreground transition-colors">
            상담소
          </Link>
          <span>/</span>
          <span className="text-foreground">{simulation.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {simulationCategories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.icon} {category.name}
              </Badge>
            ))}
            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">진행중</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">{simulation.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{totalVotes.toLocaleString()}명 참여</span>
            <span>{totalCommentCount}개 댓글</span>
          </div>
        </div>

        {/* Situation Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">상황 설명</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{simulation.situation}</p>
          </CardContent>
        </Card>

        {/* Voting Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">당신의 선택은?</CardTitle>
              {showResults && (
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.id}>
                        {pos.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {simulation.choices.map((choice, index) => {
              const percentage = getVotePercentage(choice)
              const voteCount = getVoteCount(choice)
              const isSelected = selectedChoice === choice.id
              const isWinner =
                showResults && percentage === Math.max(...simulation.choices.map((c) => getVotePercentage(c)))

              return (
                <button
                  key={choice.id}
                  onClick={() => !hasVoted && setSelectedChoice(choice.id)}
                  disabled={hasVoted}
                  className={cn(
                    "relative w-full text-left p-4 rounded-lg border-2 transition-all",
                    isSelected && !hasVoted && "border-primary bg-primary/5",
                    isSelected && hasVoted && "border-primary bg-primary/10",
                    !isSelected && !hasVoted && "border-border hover:border-primary/50 hover:bg-muted/50",
                    !isSelected && hasVoted && "border-border",
                    hasVoted && "cursor-default",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {choiceLabels[index]}
                    </span>
                    <span className={cn("font-medium", isSelected && "text-primary")}>{choice.text}</span>
                    {isWinner && showResults && <Badge className="ml-auto bg-emerald-500 text-white">최다 선택</Badge>}
                  </div>

                  {showResults && (
                    <div className="mt-3 ml-10">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{voteCount}표</span>
                        <span className="font-semibold text-foreground">{percentage}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isSelected ? "bg-primary" : "bg-muted-foreground/30",
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              )
            })}

            <div className="flex gap-3 pt-4">
              {!hasVoted ? (
                <Button onClick={handleVote} disabled={!selectedChoice} className="flex-1">
                  투표하기
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowResults(!showResults)}
                  className="flex-1 bg-transparent"
                >
                  {showResults ? "결과 숨기기" : "결과 보기"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className={cn("relative", !hasVoted && "pointer-events-none")}>
          {!hasVoted && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
              <div className="text-center p-6">
                <svg
                  className="mx-auto h-12 w-12 text-muted-foreground mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <p className="font-medium text-foreground">투표 후 열람 가능합니다</p>
                <p className="text-sm text-muted-foreground mt-1">위에서 선택지를 골라 투표해주세요</p>
              </div>
            </div>
          )}

          {/* Tabs for Discussion and AI Recommendation */}
          <Tabs defaultValue="discussion" className="mb-8">
            <TabsList className="w-full">
              <TabsTrigger value="discussion" className="flex-1">
                토론 ({totalCommentCount})
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1">
                AI 추천 답변
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussion" className="mt-6">
              {/* Comment Form */}
              {hasVoted && (
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <Textarea
                      placeholder="왜 그런 선택을 하셨나요? 의견을 공유해주세요..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="mt-3 flex justify-end">
                      <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                        댓글 작성
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      simulation={simulation}
                      choiceLabels={choiceLabels}
                      depth={0}
                      onReply={handleAddReply}
                      selectedChoice={hasVoted ? selectedChoice : null}
                      onLike={handleLike}
                    />
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">아직 댓글이 없습니다. 첫 번째 의견을 남겨보세요!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-6">
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                      <svg
                        className="h-5 w-5 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI 추천 답변</CardTitle>
                      <p className="text-sm text-muted-foreground">AI가 분석한 최적의 대응 방안</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-background p-4 mb-4">
                    <p className="font-semibold text-primary">{simulation.aiRecommendation}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">추천 이유</h4>
                    <p className="text-muted-foreground leading-relaxed">{simulation.aiReasoning}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      * AI 답변은 참고용이며, 실제 상황에서는 다양한 요소를 고려하여 판단하시기 바랍니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
