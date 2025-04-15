import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact Us | SAMEH STORE",
  description: "Get in touch with our team for any questions, feedback, or support.",
}

export default function ContactPage() {
  return <ContactClient />
}
