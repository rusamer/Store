"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, BarChart, AreaChart, Line, Bar, Area, Tooltip, XAxis, YAxis } from "recharts"
import { getSalesData } from "@/lib/api"

export function SalesChart() {
  const [data, setData] = useState([])
  const [period, setPeriod] = useState("week")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await getSalesData(period)
        setData(salesData)
      } catch (error) {
        console.error("Failed to fetch sales data:", error)
      }
    }

    fetchData()
  }, [period])

  return (
    <Card className="p-4">
      <Tabs defaultValue="line" className="h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
          </TabsList>

          <TabsList>
            <TabsTrigger value="week" onClick={() => setPeriod("week")}>
              Week
            </TabsTrigger>
            <TabsTrigger value="month" onClick={() => setPeriod("month")}>
              Month
            </TabsTrigger>
            <TabsTrigger value="year" onClick={() => setPeriod("year")}>
              Year
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="line" className="h-full">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--secondary))" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="bar" className="h-full">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(var(--primary))" />
                <Bar dataKey="orders" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="area" className="h-full">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(var(--secondary))"
                  fill="hsl(var(--secondary) / 0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
