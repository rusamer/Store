"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("token")

    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock login
    if (email === "user@example.com" && password === "password") {
      const mockUser: User = {
        id: "user-1",
        name: "John Doe",
        email: "user@example.com",
        phone: "+20 123 456 7890",
        joinDate: new Date().toISOString(),
        orderCount: 0,
        isActive: true,
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      localStorage.setItem("token", "mock-jwt-token")

      return
    }

    throw new Error("Invalid credentials")
  }

  // Register function
  const register = async (userData: Partial<User>, password: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock register
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || "New User",
      email: userData.email || "new@example.com",
      phone: userData.phone,
      joinDate: new Date().toISOString(),
      orderCount: 0,
      isActive: true,
    }

    setUser(newUser)
    setIsAuthenticated(true)

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(newUser))
    localStorage.setItem("token", "mock-jwt-token")
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)

    // Remove from localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
