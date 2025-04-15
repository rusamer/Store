"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { ThemeContext } from "@/lib/theme-context"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [accentColor, setAccentColor] = React.useState<string>("blue")

  React.useEffect(() => {
    // Apply the accent color to the document element
    document.documentElement.setAttribute("data-accent", accentColor)

    // Load saved accent color from localStorage if available
    const savedAccentColor = localStorage.getItem("accentColor")
    if (savedAccentColor) {
      setAccentColor(savedAccentColor)
      document.documentElement.setAttribute("data-accent", savedAccentColor)
    }
  }, [accentColor])

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
      <NextThemesProvider {...props} defaultTheme="light" enableSystem={false}>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}
