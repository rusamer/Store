"use client"

import { createContext, useContext } from "react"

type ThemeContextType = {
  accentColor: string
  setAccentColor: (color: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  accentColor: "blue",
  setAccentColor: () => null,
})

export const useThemeContext = () => useContext(ThemeContext)
