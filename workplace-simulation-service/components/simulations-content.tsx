"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SimulationCard } from "@/components/simulation-card"
import { categories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { Simulation } from "@/lib/db"

export function SimulationsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [searchQuery, setSearchQuery] = useState("")
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/simulations")
      .then((res) => res.json())
      .then((data) => {
        setSimulations(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch simulations:", error)
        setLoading(false)
      })
  }, [])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((c) => c !== categoryId)
      }
      return [...prev, categoryId]
    })
  }

  const filteredSimulations = useMemo(() => {
    return simulations.filter((sim) => {
      // 카테고리 매칭 (배열 또는 단일 값 처리)
      const simCategories = Array.isArray(sim.category) ? sim.category : [sim.category]
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(cat => simCategories.includes(cat))
      
      const matchesSearch =
        sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.situation.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [simulations, selectedCategories, searchQuery])

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">상담소</h1>
          <p className="mt-2 text-muted-foreground">다양한 업무 상황에서 어떻게 대응할지 투표하고 토론해보세요</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              placeholder="상담 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategories.length === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategories([])}
              className={cn(selectedCategories.length !== 0 && "bg-transparent")}
            >
              전체
            </Button>
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id)
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(category.id)}
                  className={cn(!isSelected && "bg-transparent")}
                >
                  {category.icon} {category.name}
                  {isSelected && selectedCategories.length > 1 && <span className="ml-1 text-xs">✓</span>}
                </Button>
              )
            })}
          </div>
          {selectedCategories.length > 0 && (
            <p className="text-sm text-muted-foreground">{selectedCategories.length}개 카테고리 선택됨</p>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        ) : filteredSimulations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSimulations.map((simulation) => (
              <SimulationCard key={simulation.id} simulation={simulation} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">검색 결과가 없습니다</h3>
            <p className="mt-1 text-muted-foreground">다른 키워드로 검색하거나 카테고리를 변경해보세요</p>
          </div>
        )}
      </div>
    </div>
  )
}
