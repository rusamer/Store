"use client"

import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle, AlertCircle, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AccountOrders() {
  const { toast } = useToast()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockOrders = [
          {
            id: "ORD-123456",
            date: "2023-12-15T10:30:00Z",
            status: "delivered",
            total: 2499.98,
            items: [
              {
                id: "prod-1",
                name: "Premium Wireless Headphones",
                price: 1299.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "prod-2",
                name: "Stylish Smartwatch",
                price: 1199.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
            ],
          },
          {
            id: "ORD-123457",
            date: "2023-12-10T14:20:00Z",
            status: "shipped",
            total: 899.99,
            items: [
              {
                id: "prod-3",
                name: "Designer Sunglasses",
                price: 499.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "prod-4",
                name: "Leather Wallet",
                price: 399.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
            ],
          },
          {
            id: "ORD-123458",
            date: "2023-12-05T09:15:00Z",
            status: "processing",
            total: 1599.99,
            items: [
              {
                id: "prod-5",
                name: "Smartphone Case",
                price: 199.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "prod-6",
                name: "Bluetooth Speaker",
                price: 1399.99,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
            ],
          },
        ]

        setOrders(mockOrders)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        toast({
          title: "Error",
          description: "Failed to load your orders. Please try again.",
          variant: "destructive",
        })
        // Set empty array to prevent mapping errors
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [toast])

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900"
          >
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900"
          >
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
          >
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"
          >
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "processing")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "shipped")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "delivered")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({ order }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(order.status)}
            <Button variant="outline" size="sm" asChild>
              <Link href={`/order-confirmation?orderId=${order.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative h-12 w-12 rounded overflow-hidden">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × EGP {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="font-medium">EGP {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <p className="font-medium">Total</p>
            <p className="font-bold text-lg">EGP {order.total.toFixed(2)}</p>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            {getStatusIcon(order.status)}
            <span className="ml-2">
              {order.status === "processing" && "Your order is being processed"}
              {order.status === "shipped" && "Your order is on the way"}
              {order.status === "delivered" && "Your order has been delivered"}
              {order.status === "cancelled" && "Your order has been cancelled"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusIcon(status) {
  switch (status) {
    case "processing":
      return <Package className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "cancelled":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

function getStatusBadge(status) {
  switch (status) {
    case "processing":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900"
        >
          Processing
        </Badge>
      )
    case "shipped":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900"
        >
          Shipped
        </Badge>
      )
    case "delivered":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
        >
          Delivered
        </Badge>
      )
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"
        >
          Cancelled
        </Badge>
      )
    default:
      return <Badge variant="outline">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }
}
