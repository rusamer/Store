import type { Metadata } from "next"
import Link from "next/link"
import { Truck, Clock, Globe, CreditCard, ShieldCheck, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Shipping Information | SAMEH STORE",
  description: "Learn about our shipping policies, delivery times, and shipping costs.",
}

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Truck className="h-6 w-6 mr-2 text-primary" />
              Shipping Methods & Delivery Times
            </h2>

            <Card className="mb-8">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipping Method</TableHead>
                      <TableHead>Delivery Time</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Standard Shipping</TableCell>
                      <TableCell>3-5 business days</TableCell>
                      <TableCell>EGP 50 (Free for orders over EGP 500)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Express Shipping</TableCell>
                      <TableCell>1-2 business days</TableCell>
                      <TableCell>EGP 100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Same-Day Delivery</TableCell>
                      <TableCell>Same day (order before 12 PM)</TableCell>
                      <TableCell>EGP 150 (Cairo & Alexandria only)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">International Shipping</TableCell>
                      <TableCell>7-14 business days</TableCell>
                      <TableCell>Starting from EGP 250 (varies by country)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <p className="text-muted-foreground mb-4">
              Delivery times are estimates and may vary depending on your location and other factors such as weather
              conditions or customs clearance for international orders.
            </p>

            <p className="text-muted-foreground">
              All orders are processed within 24 hours during business days. Orders placed on weekends or holidays will
              be processed on the next business day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              Shipping Destinations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Domestic Shipping</CardTitle>
                  <CardDescription>Shipping within Egypt</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We deliver to all governorates in Egypt. Delivery times and costs may vary depending on your
                    location:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Major cities (Cairo, Alexandria, Giza): 2-3 business days</li>
                    <li>Other governorates: 3-5 business days</li>
                    <li>Remote areas: 5-7 business days</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>International Shipping</CardTitle>
                  <CardDescription>Shipping worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We ship to most countries worldwide. International shipping times and costs vary by destination:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Middle East: 5-10 business days</li>
                    <li>Europe: 7-14 business days</li>
                    <li>North America: 10-15 business days</li>
                    <li>Asia, Australia, and other regions: 14-21 business days</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <p className="text-muted-foreground">
              Please note that international orders may be subject to customs duties and taxes, which are the
              responsibility of the recipient. These charges vary by country and are not included in our shipping fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-primary" />
              Order Tracking & Delivery Updates
            </h2>

            <p className="text-muted-foreground mb-4">
              We provide real-time tracking for all orders. Once your order is shipped, you'll receive a tracking number
              via email and SMS (if provided). You can track your order in the following ways:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              <li>Through your account on our website (Orders section)</li>
              <li>Using the tracking number in the shipping confirmation email</li>
              <li>Contacting our customer support team</li>
            </ul>

            <p className="text-muted-foreground">
              You'll receive automatic updates at key stages of the delivery process, including when your order is
              processed, shipped, and delivered. For same-day and express deliveries, you'll also receive a call from
              our delivery partner before arrival.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-primary" />
              Shipping Costs & Free Shipping
            </h2>

            <p className="text-muted-foreground mb-4">
              Shipping costs are calculated based on your location, the shipping method selected, and the total value of
              your order. We offer free standard shipping on all orders over EGP 500 within Egypt.
            </p>

            <div className="bg-muted p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2">Free Shipping Eligibility:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Order total must be EGP 500 or more (excluding any discounts or promo codes)</li>
                <li>Shipping address must be within Egypt</li>
                <li>Only applies to standard shipping (3-5 business days)</li>
                <li>Multiple orders cannot be combined to reach the minimum amount</li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              Shipping costs are always displayed at checkout before payment, so you'll know exactly what you're paying
              for. We occasionally offer free shipping promotions regardless of order value - subscribe to our
              newsletter to stay informed about these special offers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
              Shipping Insurance & Package Protection
            </h2>

            <p className="text-muted-foreground mb-4">
              All orders are carefully packaged to ensure they arrive in perfect condition. We use high-quality
              packaging materials and secure methods to protect your items during transit.
            </p>

            <p className="text-muted-foreground mb-4">
              For added peace of mind, we offer optional shipping insurance at checkout for 2% of your order value. This
              insurance covers loss, theft, or damage during transit and ensures quick resolution if any issues occur.
            </p>

            <p className="text-muted-foreground">
              If you receive a damaged package, please take photos before opening it completely and contact our customer
              support team within 24 hours of delivery. For lost packages, we'll initiate an investigation with our
              shipping partner and provide a resolution within 3-5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <HelpCircle className="h-6 w-6 mr-2 text-primary" />
              Frequently Asked Shipping Questions
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Can I change my shipping address after placing an order?</h3>
                <p className="text-muted-foreground">
                  You can change your shipping address within 1 hour of placing your order. After this time, your order
                  enters our processing system and the shipping address cannot be modified. Please contact our customer
                  support team immediately if you need to make changes.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">What happens if I'm not available to receive my delivery?</h3>
                <p className="text-muted-foreground">
                  If you're not available at the time of delivery, our courier will leave a notice and attempt delivery
                  again the next business day. After three failed delivery attempts, your package will be returned to
                  our warehouse, and we'll contact you to arrange redelivery or pickup.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">Do you ship to P.O. boxes?</h3>
                <p className="text-muted-foreground">
                  Yes, we can ship to P.O. boxes for standard shipping only. Express shipping and same-day delivery
                  require a physical address for delivery.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">How do I report a missing or damaged package?</h3>
                <p className="text-muted-foreground">
                  If your package is missing or damaged, please contact our customer support team within 24 hours of the
                  expected delivery date. Provide your order number and any relevant details or photos. We'll
                  investigate the issue and provide a resolution as quickly as possible.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t pt-8">
            <p className="text-center mb-6">
              Have more questions about shipping? Our customer support team is here to help.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/support">View FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
