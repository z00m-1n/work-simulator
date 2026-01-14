import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  id: string
  name: string
  icon: string
  description: string
  count: number
}

export function CategoryCard({ id, name, icon, description, count }: CategoryCardProps) {
  return (
    <Link href={`/simulations?category=${id}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium text-primary">{count}</span>개의 시뮬레이션
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
