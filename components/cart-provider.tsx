"use client"

import type { ReactNode } from "react"
import { CartProvider as InternalCartProvider } from "@/hooks/use-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  return <InternalCartProvider>{children}</InternalCartProvider>
}
