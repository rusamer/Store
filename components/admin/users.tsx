"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Eye, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUsers } from "@/lib/api"

export function AdminUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All Users</DropdownMenuItem>
            <DropdownMenuItem>New Users</DropdownMenuItem>
            <DropdownMenuItem>Active Users</DropdownMenuItem>
            <DropdownMenuItem>Inactive Users</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{user.orderCount}</TableCell>
                  <TableCell>
                    {user.isActive ? (
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
                    <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedUser && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>User Profile</DialogTitle>
              <DialogDescription>View user details and order history</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">User Information</h3>
                  <p className="font-medium">{selectedUser.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {selectedUser.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {selectedUser.phone || "Not provided"}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Joined on {new Date(selectedUser.joinDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="font-medium">{selectedUser.orderCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="font-medium">EGP {selectedUser.totalSpent?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Order</p>
                      <p className="font-medium">
                        {selectedUser.lastOrderDate
                          ? new Date(selectedUser.lastOrderDate).toLocaleDateString()
                          : "Never"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{selectedUser.isActive ? "Active" : "Inactive"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="orders">
                <TabsList className="w-full">
                  <TabsTrigger value="orders" className="flex-1">
                    Order History
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="flex-1">
                    Saved Addresses
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="flex-1">
                    Wishlist
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4 mt-4">
                  {selectedUser.orders && selectedUser.orders.length > 0 ? (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      {selectedUser.orders.map((order) => (
                        <Card key={order.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Order #{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">EGP {order.total.toFixed(2)}</p>
                                <Badge variant="outline">
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No orders found for this user</p>
                  )}
                </TabsContent>

                <TabsContent value="addresses" className="space-y-4 mt-4">
                  {selectedUser.addresses && selectedUser.addresses.length > 0 ? (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      {selectedUser.addresses.map((address, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <p className="font-medium">{address.name}</p>
                            <p className="text-sm">{address.address}</p>
                            <p className="text-sm">
                              {address.city}, {address.state} {address.postalCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{address.isDefault && "Default Address"}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No saved addresses found</p>
                  )}
                </TabsContent>

                <TabsContent value="wishlist" className="space-y-4 mt-4">
                  {selectedUser.wishlist && selectedUser.wishlist.length > 0 ? (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      {selectedUser.wishlist.map((product) => (
                        <Card key={product.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Added on {new Date(product.addedDate).toLocaleDateString()}
                                </p>
                              </div>
                              <p className="font-medium">EGP {product.price.toFixed(2)}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No wishlist items found</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
