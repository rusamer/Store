"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, AreaChart, Line, Area, XAxis, YAxis, Tooltip } from "recharts"
import { getCustomerBehaviorData } from "@/lib/api"

export function CustomerBehaviorChart({ type }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const behaviorData = await getCustomerBehaviorData(type)
        setData(behaviorData)
      } catch (error) {
        console.error(`Failed to fetch ${type} data:`, error)
      }
    }

    fetchData()
  }, [type])

  return (
    <Card className="p-4 mt-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "cart" ? (
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--destructive))"
                fill="hsl(var(--destructive) / 0.2)"
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
