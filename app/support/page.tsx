import type { Metadata } from "next"
import SupportClient from "./SupportClient"

export const metadata: Metadata = {
  title: "Support & FAQs | SAMEH STORE",
  description: "Get answers to frequently asked questions and support for your SAMEH STORE account.",
}

export default function SupportPage() {
  return <SupportClient />
}
