"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
}

export function Logo({ size = "medium" }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    small: "h-6",
    medium: "h-8",
    large: "h-10",
  }

  // Default to light theme logo before mounting
  const isDark = mounted && theme === "dark"

  return (
    <Link href="/" className="flex items-center">
      <div className={`${sizeClasses[size]} font-bold flex items-center`}>
        <div className="bg-primary text-primary-foreground rounded-md p-1 mr-1">S</div>
        <span className={isDark ? "text-white" : "text-black"}>SAMEH</span>
      </div>
    </Link>
  )
}
