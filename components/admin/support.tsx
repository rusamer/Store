"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MessageCircle, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { getSupportTickets } from "@/lib/api"

export function AdminSupport() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getSupportTickets()
        setTickets(data)
      } catch (error) {
        console.error("Failed to fetch support tickets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsDialogOpen(true)
    setReplyText("")
  }

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply message.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "admin",
      text: replyText,
      timestamp: new Date().toISOString(),
    }

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      status: "answered",
      lastUpdated: new Date().toISOString(),
    }

    setTickets(tickets.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket)))

    setSelectedTicket(updatedTicket)
    setReplyText("")

    toast({
      title: "Reply sent",
      description: "Your reply has been sent to the customer.",
    })
  }

  const handleCloseTicket = () => {
    // In a real app, this would be an API call
    const updatedTicket = {
      ...selectedTicket,
      status: "closed",
      lastUpdated: new Date().toISOString(),
    }

    setTickets(tickets.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket)))

    setSelectedTicket(updatedTicket)

    toast({
      title: "Ticket closed",
      description: "The support ticket has been closed.",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900"
          >
            New
          </Badge>
        )
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900"
          >
            In Progress
          </Badge>
        )
      case "answered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
          >
            Answered
          </Badge>
        )
      case "closed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900"
          >
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
    }
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
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
            <DropdownMenuItem>All Tickets</DropdownMenuItem>
            <DropdownMenuItem>New</DropdownMenuItem>
            <DropdownMenuItem>In Progress</DropdownMenuItem>
            <DropdownMenuItem>Answered</DropdownMenuItem>
            <DropdownMenuItem>Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Tickets</TabsTrigger>
          <TabsTrigger value="closed">Closed Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets
                    .filter((ticket) => ticket.status !== "closed")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.customer.name}</TableCell>
                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewTicket(ticket)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  {filteredTickets.filter((ticket) => ticket.status !== "closed").length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No active tickets found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets
                    .filter((ticket) => ticket.status === "closed")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.customer.name}</TableCell>
                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewTicket(ticket)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  {filteredTickets.filter((ticket) => ticket.status === "closed").length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No closed tickets found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedTicket && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ticket #{selectedTicket.id}</DialogTitle>
              <DialogDescription>{selectedTicket.subject}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{selectedTicket.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedTicket.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedTicket.customer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-4 border rounded-md p-4">
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "customer" ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTicket.status !== "closed" && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="min-h-[100px]"
                  />

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleCloseTicket}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Close Ticket
                    </Button>

                    <Button onClick={handleSendReply}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              )}

              {selectedTicket.status === "closed" && (
                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="text-muted-foreground">This ticket is closed. No further replies can be sent.</p>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
