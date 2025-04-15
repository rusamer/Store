import Link from "next/link"
import { Smartphone, Shirt, Home, Sparkles, Dumbbell, BookOpen, ShoppingBag } from "lucide-react"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    icon: string
    productCount: number
  }
}

// Map of icon names to Lucide icon components
const iconMap = {
  Smartphone: Smartphone,
  Shirt: Shirt,
  Home: Home,
  Sparkles: Sparkles,
  Dumbbell: Dumbbell,
  BookOpen: BookOpen,
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Get the icon component or default to ShoppingBag
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || ShoppingBag

  return (
    <Link href={`/products?category=${category.id}`}>
      <div className="flex flex-col items-center p-4 bg-background rounded-lg border hover:border-primary transition-colors">
        <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-3">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-medium text-center">{category.name}</h3>
        <p className="text-sm text-muted-foreground">{category.productCount} products</p>
      </div>
    </Link>
  )
}
