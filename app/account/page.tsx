import type { Metadata } from "next"
import AccountClient from "./AccountClient"

export const metadata: Metadata = {
  title: "My Account | SAMEH STORE",
  description: "Manage your account, orders, addresses, and payment methods.",
}

function AccountPage() {
  return <AccountClient />
}

export default AccountPage
