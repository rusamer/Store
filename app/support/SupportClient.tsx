"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MessageSquare, FileText, ShoppingBag, Truck, CreditCard, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function SupportClient() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      id: "orders",
      label: "Orders & Shipping",
      icon: ShoppingBag,
      questions: [
        {
          question: "How do I track my order?",
          answer:
            "You can track your order by logging into your account and navigating to the 'Orders' section. There, you'll find a list of all your orders and their current status. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
        },
        {
          question: "What are the shipping costs?",
          answer:
            "Shipping costs vary based on your location and the size/weight of your order. We offer free shipping on all orders over EGP 500. For orders below this amount, shipping costs typically range from EGP 30 to EGP 50 depending on your location within Egypt.",
        },
        {
          question: "How long will it take to receive my order?",
          answer:
            "Delivery times depend on your location. For major cities like Cairo and Alexandria, delivery typically takes 1-3 business days. For other areas, it may take 3-5 business days. During peak seasons or sales events, delivery times might be slightly longer.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Currently, we only ship within Egypt. We're working on expanding our shipping options to include international destinations in the near future.",
        },
      ],
    },
    {
      id: "returns",
      label: "Returns & Refunds",
      icon: RefreshCw,
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging intact. Some items, such as personal care products and underwear, are not eligible for return due to hygiene reasons.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "To initiate a return, log into your account, go to 'Orders', select the order containing the item you wish to return, and click on 'Return Item'. Follow the instructions to complete the return process. You can also contact our customer support team for assistance.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive your returned item and verify its condition, we'll process your refund within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and bank, but typically takes an additional 5-10 business days.",
        },
        {
          question: "Do I have to pay for return shipping?",
          answer:
            "For returns due to our error (wrong item, defective product, etc.), we cover the return shipping costs. For returns due to change of mind or other reasons, the customer is responsible for return shipping costs.",
        },
      ],
    },
    {
      id: "payments",
      label: "Payments & Pricing",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards (Visa, MasterCard), QR code payments, Apple Pay, and Google Pay. We also offer cash on delivery for certain areas.",
        },
        {
          question: "Is it safe to use my credit card on your website?",
          answer:
            "Yes, our website uses industry-standard SSL encryption to protect your personal and payment information. We do not store your full credit card details on our servers.",
        },
        {
          question: "Why was my payment declined?",
          answer:
            "Payments can be declined for various reasons including insufficient funds, incorrect card details, expired cards, or bank security measures. Please verify your payment information and try again, or contact your bank for more information.",
        },
        {
          question: "Do you offer installment payment options?",
          answer:
            "Yes, we offer installment payment options for orders over EGP 1000 through select banks. The available installment plans and terms are displayed during checkout.",
        },
      ],
    },
    {
      id: "account",
      label: "Account & Orders",
      icon: FileText,
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking on the 'Login' button in the top right corner of our website and selecting 'Register'. Fill in the required information including your name, email, and payment details to complete the registration process.",
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer:
            "Click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password.",
        },
        {
          question: "Can I change my shipping address after placing an order?",
          answer:
            "You can change your shipping address if your order hasn't been processed yet. Contact our customer support team as soon as possible with your order number and the new shipping address.",
        },
        {
          question: "How do I cancel an order?",
          answer:
            "To cancel an order, go to your account, navigate to 'Orders', select the order you wish to cancel, and click on 'Cancel Order'. Please note that orders that have already been shipped cannot be cancelled.",
        },
      ],
    },
    {
      id: "products",
      label: "Products & Stock",
      icon: Truck,
      questions: [
        {
          question: "How do I know if a product is in stock?",
          answer:
            "Product pages display the current stock status. If a product is in stock, you'll see the available quantity. If it's out of stock, you'll see an 'Out of Stock' label. You can also sign up for stock notifications for out-of-stock items.",
        },
        {
          question: "Can I pre-order items that are out of stock?",
          answer:
            "For select items, we offer pre-ordering. If pre-ordering is available for an out-of-stock item, you'll see a 'Pre-Order' button on the product page instead of the standard 'Add to Cart' button.",
        },
        {
          question: "Do you offer product warranties?",
          answer:
            "Many of our products come with manufacturer warranties. The warranty information is listed on the product page under 'Specifications'. Additionally, we offer extended warranty options for select electronics and appliances.",
        },
        {
          question: "How do I report a defective product?",
          answer:
            "If you receive a defective product, please contact our customer support team within 48 hours of delivery. Provide your order number, a description of the defect, and if possible, photos or videos demonstrating the issue.",
        },
      ],
    },
  ]

  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  const handleStartChat = () => {
    // Trigger the live chat button
    document.querySelector(".fixed.bottom-4.right-4")?.dispatchEvent(new MouseEvent("click"))

    toast({
      title: "Live chat initiated",
      description: "A support agent will be with you shortly.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Support Center</h1>
      <p className="text-muted-foreground mb-8">
        Find answers to common questions or get in touch with our support team.
      </p>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-12">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <Tabs defaultValue="faqs" className="space-y-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="faqs">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faqs" className="space-y-8">
          {searchQuery && filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any FAQs matching your search. Please try different keywords or contact our support
                team.
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          ) : (
            <>
              {filteredFAQs.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">{category.label}</h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              <div className="text-center py-6">
                <h3 className="text-lg font-medium mb-2">Didn't find what you're looking for?</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is here to help you with any questions or concerns.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={handleStartChat}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Live Chat
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="contact" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Live Chat
                </CardTitle>
                <CardDescription>Chat with our support team in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Available 24/7 for immediate assistance with your questions or concerns.
                </p>
                <Button className="w-full" onClick={handleStartChat}>
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Email Support
                </CardTitle>
                <CardDescription>Send us an email and we'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For non-urgent inquiries, email us at support@samehstore.com
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Contact Form</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Order Issues
                </CardTitle>
                <CardDescription>Get help with your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For order-related issues, please have your order number ready.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/account/orders">View Orders</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
              <CardDescription>Our support team is available during the following hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Live Chat & Phone Support</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>10:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Email Support</h3>
                  <p className="text-muted-foreground">
                    Email support is available 24/7. We aim to respond to all emails within 24 hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
