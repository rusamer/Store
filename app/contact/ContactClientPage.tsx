"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export default function ContactClientPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have a question, feedback, or need assistance with your order? We're here to help! Fill out the form, and
            our team will get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-muted-foreground">123 Shopping Street, Cairo, Egypt</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-muted-foreground">support@samehstore.com</p>
                <p className="text-muted-foreground">info@samehstore.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-muted-foreground">+20 123 456 7890</p>
                <p className="text-muted-foreground">+20 123 456 7891</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-2">Business Hours</h3>
            <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-muted-foreground">Sunday: Closed</p>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your inquiry..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
