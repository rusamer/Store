"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    cta: "Shop Now",
    link: "/products?sale=summer",
    bgColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    cta: "Discover",
    link: "/products?new=true",
    bgColor: "bg-gradient-to-r from-amber-500 to-pink-500",
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "On all orders over EGP 500",
    cta: "Learn More",
    link: "/shipping",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
]

export function PromoBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const banner = banners[currentBanner]

  return (
    <div className={`relative rounded-lg overflow-hidden ${banner.bgColor}`}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-xl">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{banner.title}</h2>
          <p className="text-white/90 text-lg mb-6">{banner.description}</p>
          <Button asChild size="lg" variant="secondary">
            <a href={banner.link}>{banner.cta}</a>
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevBanner}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous banner</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextBanner}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next banner</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentBanner ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  )
}
