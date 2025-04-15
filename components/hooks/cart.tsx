"use client"

import { useState } from "react"

// Types
export type Product = {
  id: string
  name: string
  price: number
  image?: string
  stock?: number
  discount?: number
  category?: string
  description?: string
  featured?: boolean
}

export type CartItem = Product & {
  quantity: number
}

// Simple hook for cart functionality
export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount && item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price
    return total + itemPrice * item.quantity
  }, 0)

  // Add item to cart
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    })
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
  }
}
