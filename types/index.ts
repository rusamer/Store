// Product type
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  stock: number
  discount: number
  category: string
  featured?: boolean
  specifications?: ProductSpecification[]
}

// Product specification type
export interface ProductSpecification {
  key: string
  value: string
}

// Category type
export interface Category {
  id: string
  name: string
  image?: string
  productCount: number
}

// Cart item type
export interface CartItem extends Product {
  quantity: number
}

// User type
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  joinDate: string
  orderCount: number
  totalSpent?: number
  lastOrderDate?: string
  isActive: boolean
  orders?: Order[]
  addresses?: Address[]
  wishlist?: WishlistItem[]
}

// Address type
export interface Address {
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
}

// Wishlist item type
export interface WishlistItem {
  id: string
  name: string
  price: number
  addedDate: string
}

// Order type
export interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  subtotal: number
  shipping: number
  discount: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  items?: OrderItem[]
}

// Order item type
export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

// Promo code type
export interface PromoCode {
  id: string
  code: string
  type: "percentage" | "fixed" | "free_shipping"
  value: number
  maxUses: number
  maxUsesPerUser: number
  minOrderAmount: number
  expiryDate: string
  isActive: boolean
  usedCount: number
  createdAt: string
}

// Support ticket type
export interface SupportTicket {
  id: string
  subject: string
  status: "new" | "in_progress" | "answered" | "closed"
  createdAt: string
  lastUpdated: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  messages: Message[]
}

// Message type
export interface Message {
  id: string
  sender: "customer" | "agent"
  text: string
  timestamp: string
}
