"use client"

import { FormDescription } from "@/components/ui/form"

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
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"

export function AccountAddresses() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockAddresses = [
          {
            id: "addr-1",
            name: "Home",
            address: "123 Main St, Apt 4B",
            city: "Cairo",
            state: "Cairo Governorate",
            postalCode: "12345",
            isDefault: true,
          },
          {
            id: "addr-2",
            name: "Work",
            address: "456 Office Blvd",
            city: "Cairo",
            state: "Cairo Governorate",
            postalCode: "12345",
            isDefault: false,
          },
        ]

        setAddresses(mockAddresses)
      } catch (error) {
        console.error("Failed to fetch addresses:", error)
        toast({
          title: "Error",
          description: "Failed to load your addresses. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAddresses()
  }, [toast])

  const addressSchema = z.object({
    name: z.string().min(1, "Address name is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Province is required"),
    postalCode: z.string().min(4, "Postal code is required"),
    isDefault: z.boolean().default(false),
  })

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      isDefault: false,
    },
  })

  const handleAddAddress = () => {
    setSelectedAddress(null)
    form.reset({
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      isDefault: false,
    })
    setIsDialogOpen(true)
  }

  const handleEditAddress = (address) => {
    setSelectedAddress(address)
    form.reset({
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId))

    toast({
      title: "Address deleted",
      description: "The address has been deleted successfully.",
    })
  }

  const onSubmit = (values) => {
    if (selectedAddress) {
      // Update existing address
      setAddresses(addresses.map((addr) => (addr.id === selectedAddress.id ? { ...addr, ...values } : addr)))

      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } else {
      // Add new address
      const newAddress = {
        id: `addr-${Date.now()}`,
        ...values,
      }

      setAddresses([...addresses, newAddress])

      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
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
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <Button onClick={handleAddAddress}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
            <p className="text-muted-foreground mb-4">You haven't saved any addresses yet.</p>
            <Button onClick={handleAddAddress}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={address.isDefault}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>
              {selectedAddress ? "Update your address details below" : "Fill in the details for your new address"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Home, Work, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Apt 4B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Cairo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Cairo Governorate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Set as Default Address</FormLabel>
                      <FormDescription>This will be used as your default shipping address</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">{selectedAddress ? "Update Address" : "Add Address"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
