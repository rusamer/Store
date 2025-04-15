import Link from "next/link"
import { Smartphone, Shirt, Sparkles, Dumbbell, BookOpen, HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"

// Import the sample data
import { sampleCategories, sampleFeaturedProducts } from "@/lib/sample-data"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/70 text-white rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SAMEH STORE</h1>
          <p className="text-xl mb-6">Your one-stop shop for all your shopping needs</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sampleCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <Link href={`/products?category=${category.id}`} className="flex flex-col items-center">
                  <div className="mb-3 flex justify-center">
                    {category.icon === "Smartphone" && <Smartphone className="h-12 w-12 text-primary" />}
                    {category.icon === "Shirt" && <Shirt className="h-12 w-12 text-primary" />}
                    {category.icon === "Home" && <HomeIcon className="h-12 w-12 text-primary" />}
                    {category.icon === "Sparkles" && <Sparkles className="h-12 w-12 text-primary" />}
                    {category.icon === "Dumbbell" && <Dumbbell className="h-12 w-12 text-primary" />}
                    {category.icon === "BookOpen" && <BookOpen className="h-12 w-12 text-primary" />}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleFeaturedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-muted rounded-lg p-6 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Special Offer</h2>
            <p className="text-muted-foreground">Get 20% off on all products with code: SUMMER20</p>
          </div>
          <Button>Shop the Sale</Button>
        </div>
      </section>
    </div>
  )
}
