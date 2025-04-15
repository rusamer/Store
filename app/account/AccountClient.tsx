"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { AccountOrders } from "@/components/account/account-orders"
import { AccountAddresses } from "@/components/account/account-addresses"
import { AccountPaymentMethods } from "@/components/account/account-payment-methods"
import { AccountSettings } from "@/components/account/account-settings"

export default function AccountClient() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated, logout } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to view your account",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [isAuthenticated, router, toast])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  // Don't render anything on the server to avoid hydration issues
  if (!isClient) {
    return null
  }

  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <AccountOrders />
        </TabsContent>

        <TabsContent value="addresses">
          <AccountAddresses />
        </TabsContent>

        <TabsContent value="payment">
          <AccountPaymentMethods />
        </TabsContent>

        <TabsContent value="settings">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
