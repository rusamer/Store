"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const StepsContext = React.createContext({ currentStep: 0 })

export function Steps({ currentStep = 0, children }) {
  return (
    <StepsContext.Provider value={{ currentStep }}>
      <div className="flex w-full flex-col gap-2">
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { step: index })
        })}
      </div>
    </StepsContext.Provider>
  )
}

export function Step({ step, title, description, icon, children }) {
  const { currentStep } = React.useContext(StepsContext)
  const isActive = currentStep === step
  const isCompleted = currentStep > step

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2 text-center",
            isActive
              ? "border-primary bg-primary text-primary-foreground"
              : isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground text-muted-foreground",
          )}
        >
          {icon || step + 1}
        </div>
        {step !== 3 && <div className={cn("h-full w-0.5", isCompleted ? "bg-primary" : "bg-muted-foreground/30")} />}
      </div>
      <div className="flex flex-col pb-8">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {children}
      </div>
    </div>
  )
}
