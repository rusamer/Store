"use client"

import { Inter } from "next/font/google"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
            <AlertTriangle className="h-20 w-20 text-destructive mb-6" />
            <h1 className="text-4xl font-bold mb-4">Critical Error</h1>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              We apologize for the inconvenience. A critical error has occurred and the application cannot continue.
            </p>
            <Button onClick={reset} size="lg">
              Try to recover
            </Button>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
