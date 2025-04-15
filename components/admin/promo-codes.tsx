"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, Tag, Percent, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { getPromoCodes } from "@/lib/api"

export function AdminPromoCodes() {
  const { toast } = useToast()
  const [promoCodes, setPromoCodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPromoCode, setSelectedPromoCode] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    maxUses: "",
    maxUsesPerUser: "",
    minOrderAmount: "",
    expiryDate: "",
    isActive: true,
  })

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const data = await getPromoCodes()
        setPromoCodes(data)
      } catch (error) {
        console.error("Failed to fetch promo codes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPromoCodes()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddPromoCode = () => {
    setSelectedPromoCode(null)
    setFormData({
      code: "",
      type: "percentage",
      value: "",
      maxUses: "",
      maxUsesPerUser: "",
      minOrderAmount: "",
      expiryDate: "",
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  const handleEditPromoCode = (promoCode) => {
    setSelectedPromoCode(promoCode)
    setFormData({
      code: promoCode.code,
      type: promoCode.type,
      value: promoCode.value.toString(),
      maxUses: promoCode.maxUses.toString(),
      maxUsesPerUser: promoCode.maxUsesPerUser.toString(),
      minOrderAmount: promoCode.minOrderAmount.toString(),
      expiryDate: promoCode.expiryDate.split("T")[0],
      isActive: promoCode.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDeletePromoCode = (promoCodeId) => {
    // In a real app, this would be an API call
    setPromoCodes(promoCodes.filter((promoCode) => promoCode.id !== promoCodeId))
    toast({
      title: "Promo code deleted",
      description: "The promo code has been deleted successfully.",
    })
  }

  const handleToggleActive = (promoCodeId, isActive) => {
    // In a real app, this would be an API call
    setPromoCodes(
      promoCodes.map((promoCode) => (promoCode.id === promoCodeId ? { ...promoCode, isActive } : promoCode)),
    )

    toast({
      title: isActive ? "Promo code activated" : "Promo code deactivated",
      description: `The promo code has been ${isActive ? "activated" : "deactivated"} successfully.`,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.code || !formData.value) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    if (selectedPromoCode) {
      // Update existing promo code
      setPromoCodes(
        promoCodes.map((promoCode) =>
          promoCode.id === selectedPromoCode.id
            ? {
                ...promoCode,
                ...formData,
                value: Number.parseFloat(formData.value),
                maxUses: Number.parseInt(formData.maxUses),
                maxUsesPerUser: Number.parseInt(formData.maxUsesPerUser),
                minOrderAmount: Number.parseFloat(formData.minOrderAmount),
              }
            : promoCode,
        ),
      )

      toast({
        title: "Promo code updated",
        description: "The promo code has been updated successfully.",
      })
    } else {
      // Add new promo code
      const newPromoCode = {
        id: `promo-${Date.now()}`,
        ...formData,
        value: Number.parseFloat(formData.value),
        maxUses: Number.parseInt(formData.maxUses),
        maxUsesPerUser: Number.parseInt(formData.maxUsesPerUser),
        minOrderAmount: Number.parseFloat(formData.minOrderAmount),
        usedCount: 0,
        createdAt: new Date().toISOString(),
      }

      setPromoCodes([...promoCodes, newPromoCode])

      toast({
        title: "Promo code added",
        description: "The promo code has been added successfully.",
      })
    }

    setIsDialogOpen(false)
  }

  const getPromoTypeIcon = (type) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4 text-primary" />
      case "fixed":
        return <Tag className="h-4 w-4 text-primary" />
      case "free_shipping":
        return <Truck className="h-4 w-4 text-primary" />
      default:
        return null
    }
  }

  const getPromoTypeLabel = (type, value) => {
    switch (type) {
      case "percentage":
        return `${value}% off`
      case "fixed":
        return `EGP ${value} off`
      case "free_shipping":
        return "Free shipping"
      default:
        return ""
    }
  }

  const filteredPromoCodes = promoCodes.filter((promoCode) =>
    promoCode.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search promo codes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button onClick={handleAddPromoCode}>
          <Plus className="h-4 w-4 mr-2" />
          Add Promo Code
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Min. Order</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromoCodes.map((promoCode) => {
                const isExpired = new Date(promoCode.expiryDate) < new Date()

                return (
                  <TableRow key={promoCode.id}>
                    <TableCell className="font-medium uppercase">{promoCode.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getPromoTypeIcon(promoCode.type)}
                        <span className="ml-2">{getPromoTypeLabel(promoCode.type, promoCode.value)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {promoCode.usedCount} / {promoCode.maxUses === 0 ? "∞" : promoCode.maxUses}
                    </TableCell>
                    <TableCell>
                      {promoCode.minOrderAmount > 0 ? `EGP ${promoCode.minOrderAmount.toFixed(2)}` : "None"}
                    </TableCell>
                    <TableCell>{new Date(promoCode.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {isExpired ? (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"
                        >
                          Expired
                        </Badge>
                      ) : promoCode.isActive ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900"
                        >
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPromoCode(promoCode)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeletePromoCode(promoCode.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

              {filteredPromoCodes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No promo codes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPromoCode ? "Edit Promo Code" : "Add New Promo Code"}</DialogTitle>
            <DialogDescription>
              {selectedPromoCode
                ? "Update the promo code details below."
                : "Fill in the promo code details below to add a new promo code."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code *</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="SUMMER10"
                className="uppercase"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Discount Type *</Label>
              <RadioGroup
                name="type"
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage" className="flex items-center">
                    <Percent className="h-4 w-4 mr-2" />
                    Percentage Discount
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    Fixed Amount Discount
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free_shipping" id="free_shipping" />
                  <Label htmlFor="free_shipping" className="flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Free Shipping
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.type !== "free_shipping" && (
              <div className="space-y-2">
                <Label htmlFor="value">
                  {formData.type === "percentage" ? "Discount Percentage *" : "Discount Amount (EGP) *"}
                </Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  min="0"
                  step={formData.type === "percentage" ? "1" : "0.01"}
                  max={formData.type === "percentage" ? "100" : undefined}
                  value={formData.value}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUses">Maximum Uses (0 for unlimited)</Label>
                <Input
                  id="maxUses"
                  name="maxUses"
                  type="number"
                  min="0"
                  value={formData.maxUses}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUsesPerUser">Maximum Uses Per User (0 for unlimited)</Label>
                <Input
                  id="maxUsesPerUser"
                  name="maxUsesPerUser"
                  type="number"
                  min="0"
                  value={formData.maxUsesPerUser}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minOrderAmount">Minimum Order Amount (EGP)</Label>
                <Input
                  id="minOrderAmount"
                  name="minOrderAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.minOrderAmount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <DialogFooter>
              <Button type="submit">{selectedPromoCode ? "Update Promo Code" : "Add Promo Code"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
