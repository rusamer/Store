"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Steps, Step } from "@/components/ui/steps"
import { useToast } from "@/hooks/use-toast"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const orderId = searchParams.get("orderId") || "ORD-123456"
  const [currentStep, setCurrentStep] = useState(0)

  // Simulate order tracking progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Show push notification
  useEffect(() => {
    toast({
      title: "Order Confirmed!",
      description: `Your order ${orderId} has been confirmed and is being processed.`,
    })
  }, [orderId, toast])

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3)

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h2 className="font-semibold text-lg">Order #{orderId}</h2>
              <p className="text-muted-foreground text-sm">Placed on {new Date().toLocaleDateString()}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/account/orders">View Order Details</Link>
            </Button>
          </div>

          <Separator className="my-4" />

          <h3 className="font-semibold mb-4">Order Status</h3>

          <Steps currentStep={currentStep}>
            <Step
              icon={<CheckCircle className="h-5 w-5" />}
              title="Order Confirmed"
              description="Your order has been confirmed"
            />
            <Step
              icon={<Package className="h-5 w-5" />}
              title="Order Processed"
              description="Your order is being prepared"
            />
            <Step icon={<Truck className="h-5 w-5" />} title="Shipped" description="Your order is on the way" />
            <Step icon={<Home className="h-5 w-5" />} title="Delivered" description="Your order has been delivered" />
          </Steps>

          <div className="mt-6 bg-muted p-4 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Estimated Delivery:</span> {estimatedDelivery.toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-muted-foreground">
              John Doe
              <br />
              123 Main Street
              <br />
              Cairo, Egypt
              <br />
              12345
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Payment Information</h3>
            <p className="text-muted-foreground">
              Credit Card
              <br />
              **** **** **** 1234
              <br />
              Payment Status: Completed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/support">
            Need Help? <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
