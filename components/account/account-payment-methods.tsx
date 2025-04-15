"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Plus, Pencil, Trash2 } from "lucide-react"

export function AccountPaymentMethods() {
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockPaymentMethods = [
          {
            id: "pm-1",
            type: "credit_card",
            cardNumber: "**** **** **** 1234",
            cardHolder: "John Doe",
            expiryDate: "12/25",
            isDefault: true,
          },
          {
            id: "pm-2",
            type: "credit_card",
            cardNumber: "**** **** **** 5678",
            cardHolder: "John Doe",
            expiryDate: "06/24",
            isDefault: false,
          },
        ]

        setPaymentMethods(mockPaymentMethods)
      } catch (error) {
        console.error("Failed to fetch payment methods:", error)
        toast({
          title: "Error",
          description: "Failed to load your payment methods. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentMethods()
  }, [toast])

  const paymentMethodSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
    cardHolder: z.string().min(2, { message: "Cardholder name is required" }),
    expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
    cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
    isDefault: z.boolean().default(false),
  })

  const form = useForm({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    },
  })

  const handleAddPaymentMethod = () => {
    setSelectedPaymentMethod(null)
    form.reset({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    })
    setIsDialogOpen(true)
  }

  const handleEditPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod)
    form.reset({
      cardNumber: "1234567890123456", // In a real app, you wouldn't pre-fill this
      cardHolder: paymentMethod.cardHolder,
      expiryDate: paymentMethod.expiryDate,
      cvv: "",
      isDefault: paymentMethod.isDefault,
    })
    setIsDialogOpen(true)
  }

  const handleDeletePaymentMethod = (paymentMethodId) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== paymentMethodId))

    toast({
      title: "Payment method deleted",
      description: "The payment method has been deleted successfully.",
    })
  }

  const onSubmit = (values) => {
    // Mask the card number for display
    const maskedCardNumber = `**** **** **** ${values.cardNumber.slice(-4)}`

    if (selectedPaymentMethod) {
      // Update existing payment method
      setPaymentMethods(
        paymentMethods.map((pm) =>
          pm.id === selectedPaymentMethod.id
            ? {
                ...pm,
                cardHolder: values.cardHolder,
                expiryDate: values.expiryDate,
                isDefault: values.isDefault,
              }
            : pm,
        ),
      )

      toast({
        title: "Payment method updated",
        description: "Your payment method has been updated successfully.",
      })
    } else {
      // Add new payment method
      const newPaymentMethod = {
        id: `pm-${Date.now()}`,
        type: "credit_card",
        cardNumber: maskedCardNumber,
        cardHolder: values.cardHolder,
        expiryDate: values.expiryDate,
        isDefault: values.isDefault,
      }

      setPaymentMethods([...paymentMethods, newPaymentMethod])

      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      })
    }

    setIsDialogOpen(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Button onClick={handleAddPaymentMethod}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No payment methods saved</h3>
            <p className="text-muted-foreground mb-4">You haven't saved any payment methods yet.</p>
            <Button onClick={handleAddPaymentMethod}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((paymentMethod) => (
            <Card key={paymentMethod.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium text-lg">{paymentMethod.cardNumber}</h3>
                    </div>
                    {paymentMethod.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditPaymentMethod(paymentMethod)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePaymentMethod(paymentMethod.id)}
                      disabled={paymentMethod.isDefault}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{paymentMethod.cardHolder}</p>
                  <p>Expires: {paymentMethod.expiryDate}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedPaymentMethod ? "Edit Payment Method" : "Add New Payment Method"}</DialogTitle>
            <DialogDescription>
              {selectedPaymentMethod
                ? "Update your payment method details below"
                : "Fill in the details for your new payment method"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Set as Default Payment Method</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">{selectedPaymentMethod ? "Update Payment Method" : "Add Payment Method"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
