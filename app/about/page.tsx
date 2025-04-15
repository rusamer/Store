import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | SAMEH STORE",
  description: "Learn more about SAMEH STORE, our mission, values, and story.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, SAMEH STORE began with a simple mission: to provide high-quality products at affordable
              prices with exceptional customer service. What started as a small online shop has grown into a trusted
              e-commerce destination for thousands of customers across Egypt.
            </p>
            <p className="text-muted-foreground">
              Our founder, Sameh Ahmed, recognized the need for a reliable online shopping experience that catered
              specifically to the Egyptian market. With a background in retail and technology, Sameh combined his
              expertise to create a platform that makes online shopping accessible, enjoyable, and secure for everyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At SAMEH STORE, our mission is to transform the online shopping experience by offering a curated selection
              of products, transparent pricing, and customer service that exceeds expectations. We believe that everyone
              deserves access to quality products without compromise, and we work tirelessly to make that belief a
              reality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We carefully select each product in our inventory to ensure it meets our high standards for quality
                  and durability.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in honest pricing, clear policies, and open communication with our customers at every step.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Customer-First</h3>
                <p className="text-muted-foreground">
                  Our decisions are guided by what's best for our customers, from our user-friendly website to our
                  responsive support team.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform and services by embracing new technologies and listening to
                  customer feedback.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-4">
              Behind SAMEH STORE is a dedicated team of professionals passionate about e-commerce, technology, and
              customer service. Our diverse team brings together expertise from retail, logistics, web development, and
              customer support to create a seamless shopping experience.
            </p>
            <p className="text-muted-foreground">
              We're proud to be a growing company that values diversity, creativity, and a strong work ethic. Each team
              member plays a crucial role in our success and shares our commitment to serving our customers.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
