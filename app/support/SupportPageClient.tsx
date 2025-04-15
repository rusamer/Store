"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, Search, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SupportPageClient() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      id: "orders",
      label: "Orders & Shipping",
      faqs: [
        {
          question: "How do I track my order?",
          answer:
            "You can track your order by logging into your account and visiting the 'Orders' section. There, you'll find a list of all your orders and their current status. Click on any order to view detailed tracking information.",
        },
        {
          question: "What are the shipping costs?",
          answer:
            "Shipping costs depend on your location and the size of your order. We offer free shipping on orders over EGP 500. For orders below this amount, a flat shipping fee of EGP 50 is applied. Shipping costs are always displayed at checkout before payment.",
        },
        {
          question: "How long will it take to receive my order?",
          answer:
            "Delivery times vary depending on your location. For major cities in Egypt, delivery typically takes 2-3 business days. For other areas, it may take 3-5 business days. International shipping can take 7-14 business days depending on the destination country.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "You can change or cancel your order within 1 hour of placing it. After this time, your order enters our processing system and cannot be modified. To request changes or cancellation within the allowed timeframe, please contact our customer support team immediately.",
        },
      ],
    },
    {
      id: "returns",
      label: "Returns & Refunds",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "We accept returns within 14 days of delivery for most items in their original condition and packaging. Some products, such as personal care items and underwear, cannot be returned for hygiene reasons. Please check the product description for any specific return policy exceptions.",
        },
        {
          question: "How do I return an item?",
          answer:
            "To return an item, log into your account, go to 'Orders', select the order containing the item you wish to return, and click 'Return Items'. Follow the instructions to generate a return label and arrange pickup or drop-off. You can also contact our customer support team for assistance.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Once we receive and inspect your return, we'll process your refund. This typically takes 3-5 business days. The refund will be issued to your original payment method. It may take an additional 5-10 business days for the refund to appear in your account, depending on your bank or credit card company.",
        },
        {
          question: "Do I have to pay for return shipping?",
          answer:
            "If you're returning an item due to a defect, damage, or because we sent the wrong item, return shipping is free. For returns due to change of mind or other reasons, a return shipping fee of EGP 30 will be deducted from your refund amount.",
        },
      ],
    },
    {
      id: "account",
      label: "Account & Payment",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Login' button in the top right corner of our website, then select 'Register'. Fill in your personal information, including your name, email address, and payment details. Once you've completed the form and agreed to our terms and conditions, click 'Register' to create your account.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards (Visa, Mastercard), QR code payments, Apple Pay, and Google Pay. All payments are processed securely through our payment gateway to ensure your financial information remains protected.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we take security very seriously. All payment information is encrypted using industry-standard SSL technology. We do not store your full credit card details on our servers. Our payment processing complies with PCI DSS (Payment Card Industry Data Security Standard) requirements.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "If you've forgotten your password, click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password.",
        },
      ],
    },
    {
      id: "products",
      label: "Products & Inventory",
      faqs: [
        {
          question: "How can I check if a product is in stock?",
          answer:
            "Product availability is displayed on each product page. If an item is in stock, you'll see the available quantity or simply 'In Stock'. If an item is out of stock, it will be marked as 'Out of Stock'. You can also sign up for notifications to be alerted when out-of-stock items become available again.",
        },
        {
          question: "Are your products authentic?",
          answer:
            "Yes, we guarantee that all products sold on SAMEH STORE are 100% authentic. We source our products directly from manufacturers or authorized distributors to ensure quality and authenticity. If you ever receive a product you believe is not authentic, please contact us immediately for a full refund.",
        },
        {
          question: "Do you offer product warranties?",
          answer:
            "Warranty terms vary by product and manufacturer. Most electronics and appliances come with a manufacturer's warranty, typically ranging from 1-2 years. Warranty information is listed on the product page under 'Specifications'. To claim warranty service, please contact our customer support with your order details and a description of the issue.",
        },
        {
          question: "Can I request products that aren't available on your website?",
          answer:
            "Yes, we accept special product requests. Please contact our customer support team with details of the product you're looking for. While we cannot guarantee availability, we'll do our best to source the item for you or suggest suitable alternatives.",
        },
      ],
    },
  ]

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Support & FAQs</h1>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="faqs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faqs">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs" className="mt-6">
            {searchQuery && filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {(searchQuery ? filteredFaqs : faqCategories).map((category) => (
                  <div key={category.id} className="mb-6">
                    {!searchQuery && <h2 className="text-xl font-bold mb-3">{category.label}</h2>}

                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </Accordion>
            )}

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#live-chat">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Live Chat
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>Chat with our support team in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Our live chat support is available:</p>
                  <p className="mb-1">Monday - Friday: 9:00 AM - 10:00 PM</p>
                  <p className="mb-4">Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                  <Button className="w-full" id="live-chat">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Email Support
                  </CardTitle>
                  <CardDescription>Get help via email</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours.</p>
                  <p className="mb-1">General Inquiries: info@samehstore.com</p>
                  <p className="mb-4">Support: support@samehstore.com</p>
                  <Button className="w-full" asChild>
                    <Link href="/contact">Send Email</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>Speak directly with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Call us for immediate assistance with your orders or account.
                  </p>
                  <p className="mb-1">Customer Service: +20 123 456 7890</p>
                  <p className="mb-1">Technical Support: +20 123 456 7891</p>
                  <p className="mb-4">Hours: Monday - Friday, 9:00 AM - 6:00 PM</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
