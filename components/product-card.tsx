"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/currency"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
    discount?: number
    stock?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : null

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  return (
    <div
      className="group relative border rounded-lg overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="aspect-square relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            -{product.discount}%
          </Badge>
        )}

        {/* Quick Action Buttons - Visible on Hover */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button size="icon" variant="secondary" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={handleAddToWishlist}>
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/products/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-lg truncate hover:text-primary transition-colors">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="mt-2 flex items-center">
          {discountedPrice ? (
            <>
              <span className="font-bold">{formatPrice(discountedPrice)}</span>
              <span className="text-muted-foreground line-through ml-2 text-sm">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="font-bold">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
