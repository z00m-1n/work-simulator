import { Suspense } from "react"
import { SimulationsContent } from "@/components/simulations-content"

export default function SimulationsPage() {
  return (
    <Suspense fallback={<SimulationsLoading />}>
      <SimulationsContent />
    </Suspense>
  )
}

function SimulationsLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <div className="h-9 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="mt-2 h-5 w-96 bg-muted animate-pulse rounded-lg" />
        </div>
        <div className="mb-8 space-y-4">
          <div className="h-10 w-64 bg-muted animate-pulse rounded-lg" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-8 w-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
