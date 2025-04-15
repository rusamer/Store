"use client"
import { ResponsiveContainer, Tooltip, Legend } from "recharts"
import { cn } from "@/lib/utils"

// Simplified Chart component
export function Chart({ children, data, layout = "horizontal", ...props }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

// Simplified ChartContainer
export function ChartContainer({ children, className, ...props }) {
  return (
    <div className={cn("flex aspect-video justify-center text-xs", className)} {...props}>
      {children}
    </div>
  )
}

// Simplified ChartTooltip
export const ChartTooltip = Tooltip

// Simplified ChartTooltipContent
export function ChartTooltipContent({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          </div>
          {payload.map((item) => (
            <div key={item.name} className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">{item.name}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

// Export other components
export const ChartLegend = Legend
export const ChartLegendContent = null
export const ChartStyle = null
