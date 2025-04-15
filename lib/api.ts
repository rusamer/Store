import type { Product, Category, Order, User, PromoCode, SupportTicket } from "@/types"

// Import the sample data
import { sampleCategories, sampleFeaturedProducts, sampleRecommendedProducts } from "@/lib/sample-data"

// Update the getFeaturedProducts function
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if we have any featured products in localStorage
  const savedProducts = JSON.parse(localStorage.getItem("products") || "[]")
  const featuredProducts = savedProducts.filter((p: Product) => p.featured)

  // If we have featured products in localStorage, return those, otherwise return sample data
  return featuredProducts.length > 0 ? featuredProducts : sampleFeaturedProducts
}

// Update the getCategories function
export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return sampleCategories
}

// Update the getRecommendedProducts function
export async function getRecommendedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Check if we have any products in localStorage
  const savedProducts = JSON.parse(localStorage.getItem("products") || "[]")

  // If we have products in localStorage, return some of those, otherwise return sample data
  return savedProducts.length > 0 ? savedProducts.slice(0, 4) : sampleRecommendedProducts
}

// Mock data for AI recommendations
export async function getAIRecommendations(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return [
    {
      id: "prod-9",
      name: "Smart Home Security Camera",
      description: "HD security camera with motion detection and night vision",
      price: 899.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 10,
      discount: 15,
      category: "electronics",
    },
    {
      id: "prod-10",
      name: "Ergonomic Office Chair",
      description: "Comfortable chair with lumbar support for long working hours",
      price: 1499.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 7,
      discount: 0,
      category: "home",
    },
    {
      id: "prod-11",
      name: "Wireless Earbuds",
      description: "True wireless earbuds with noise isolation",
      price: 499.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 22,
      discount: 10,
      category: "electronics",
    },
    {
      id: "prod-12",
      name: "Yoga Mat",
      description: "Non-slip yoga mat for all types of exercises",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 35,
      discount: 0,
      category: "sports",
    },
  ]
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Check if we have any products in localStorage
  const savedProducts = JSON.parse(localStorage.getItem("products") || "[]")

  if (savedProducts.length > 0) {
    return savedProducts
  }

  // If no saved products, combine all sample products
  const featured = await getFeaturedProducts()
  const recommended = await getRecommendedProducts()
  const aiRecommended = await getAIRecommendations()

  // Add more products
  const additionalProducts: Product[] = [
    {
      id: "prod-13",
      name: "Digital Camera",
      description: "High-resolution digital camera for professional photography",
      price: 2499.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 5,
      discount: 0,
      category: "electronics",
    },
    {
      id: "prod-14",
      name: "Coffee Maker",
      description: "Automatic coffee maker with timer and multiple brewing options",
      price: 699.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 15,
      discount: 5,
      category: "home",
    },
    {
      id: "prod-15",
      name: "Running Shoes",
      description: "Lightweight and comfortable shoes for running and jogging",
      price: 799.99,
      image: "/placeholder.svg?height=300&width=300",
      stock: 20,
      discount: 0,
      category: "sports",
    },
  ]

  const allProducts = [...featured, ...recommended, ...aiRecommended, ...additionalProducts]

  // Save to localStorage for future use
  localStorage.setItem("products", JSON.stringify(allProducts))

  return allProducts
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Check if we have any products in localStorage
  const savedProducts = JSON.parse(localStorage.getItem("products") || "[]")

  // If we have products in localStorage, search there first
  if (savedProducts.length > 0) {
    const product = savedProducts.find((p: Product) => p.id === id)
    if (product) return product
  }

  // If not found in localStorage, search in all products
  const allProducts = await getProducts()
  return allProducts.find((product) => product.id === id) || null
}

// Get orders
export async function getOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return [
    {
      id: "ORD-1234",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+20 123 456 7890",
      },
      date: "2023-04-15T10:30:00Z",
      status: "delivered",
      total: 2499.97,
      subtotal: 2599.97,
      shipping: 0,
      discount: 100,
      paymentMethod: "Credit Card",
      paymentStatus: "paid",
      shippingAddress: {
        address: "123 Main St",
        city: "Cairo",
        state: "Cairo",
        postalCode: "12345",
      },
      items: [
        {
          id: "prod-1",
          name: "Premium Wireless Headphones",
          price: 1299.99,
          quantity: 1,
        },
        {
          id: "prod-2",
          name: "Stylish Smartwatch",
          price: 899.99,
          quantity: 1,
        },
        {
          id: "prod-7",
          name: "Leather Wallet",
          price: 249.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-1235",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+20 123 456 7891",
      },
      date: "2023-04-16T14:45:00Z",
      status: "shipped",
      total: 1049.98,
      subtotal: 1099.98,
      shipping: 0,
      discount: 50,
      paymentMethod: "PayPal",
      paymentStatus: "paid",
      shippingAddress: {
        address: "456 Oak St",
        city: "Alexandria",
        state: "Alexandria",
        postalCode: "23456",
      },
      items: [
        {
          id: "prod-5",
          name: "Portable Bluetooth Speaker",
          price: 599.99,
          quantity: 1,
        },
        {
          id: "prod-6",
          name: "Fitness Tracker",
          price: 399.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-1236",
      customer: {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@example.com",
        phone: "+20 123 456 7892",
      },
      date: "2023-04-17T09:15:00Z",
      status: "processing",
      total: 1699.97,
      subtotal: 1749.97,
      shipping: 50,
      discount: 100,
      paymentMethod: "Credit Card",
      paymentStatus: "paid",
      shippingAddress: {
        address: "789 Pine St",
        city: "Giza",
        state: "Giza",
        postalCode: "34567",
      },
      items: [
        {
          id: "prod-3",
          name: "Designer Sunglasses",
          price: 499.99,
          quantity: 1,
        },
        {
          id: "prod-10",
          name: "Ergonomic Office Chair",
          price: 1499.99,
          quantity: 1,
        },
      ],
    },
  ]
}

// Get users
export async function getUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+20 123 456 7890",
      joinDate: "2023-01-15T10:30:00Z",
      orderCount: 5,
      totalSpent: 7899.95,
      lastOrderDate: "2023-04-15T10:30:00Z",
      isActive: true,
      orders: [
        {
          id: "ORD-1234",
          date: "2023-04-15T10:30:00Z",
          status: "delivered",
          total: 2499.97,
        },
        {
          id: "ORD-1230",
          date: "2023-03-10T14:20:00Z",
          status: "delivered",
          total: 1899.98,
        },
      ],
      addresses: [
        {
          name: "Home",
          address: "123 Main St",
          city: "Cairo",
          state: "Cairo",
          postalCode: "12345",
          isDefault: true,
        },
        {
          name: "Work",
          address: "456 Office Blvd",
          city: "Cairo",
          state: "Cairo",
          postalCode: "12345",
          isDefault: false,
        },
      ],
      wishlist: [
        {
          id: "prod-5",
          name: "Portable Bluetooth Speaker",
          price: 599.99,
          addedDate: "2023-04-01T10:30:00Z",
        },
        {
          id: "prod-9",
          name: "Smart Home Security Camera",
          price: 899.99,
          addedDate: "2023-04-05T15:45:00Z",
        },
      ],
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+20 123 456 7891",
      joinDate: "2023-02-20T14:45:00Z",
      orderCount: 3,
      totalSpent: 3499.97,
      lastOrderDate: "2023-04-16T14:45:00Z",
      isActive: true,
      orders: [
        {
          id: "ORD-1235",
          date: "2023-04-16T14:45:00Z",
          status: "shipped",
          total: 1049.98,
        },
        {
          id: "ORD-1231",
          date: "2023-03-15T11:30:00Z",
          status: "delivered",
          total: 1499.99,
        },
      ],
      addresses: [
        {
          name: "Home",
          address: "456 Oak St",
          city: "Alexandria",
          state: "Alexandria",
          postalCode: "23456",
          isDefault: true,
        },
      ],
      wishlist: [
        {
          id: "prod-3",
          name: "Designer Sunglasses",
          price: 499.99,
          addedDate: "2023-04-10T09:15:00Z",
        },
      ],
    },
    {
      id: "user-3",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+20 123 456 7892",
      joinDate: "2023-03-05T09:15:00Z",
      orderCount: 1,
      totalSpent: 1699.97,
      lastOrderDate: "2023-04-17T09:15:00Z",
      isActive: true,
      orders: [
        {
          id: "ORD-1236",
          date: "2023-04-17T09:15:00Z",
          status: "processing",
          total: 1699.97,
        },
      ],
      addresses: [
        {
          name: "Home",
          address: "789 Pine St",
          city: "Giza",
          state: "Giza",
          postalCode: "34567",
          isDefault: true,
        },
      ],
      wishlist: [],
    },
  ]
}

// Get promo codes
export async function getPromoCodes(): Promise<PromoCode[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "promo-1",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      maxUses: 0,
      maxUsesPerUser: 1,
      minOrderAmount: 0,
      expiryDate: "2023-12-31T23:59:59Z",
      isActive: true,
      usedCount: 45,
      createdAt: "2023-01-01T00:00:00Z",
    },
    {
      id: "promo-2",
      code: "SUMMER20",
      type: "percentage",
      value: 20,
      maxUses: 100,
      maxUsesPerUser: 1,
      minOrderAmount: 1000,
      expiryDate: "2023-08-31T23:59:59Z",
      isActive: true,
      usedCount: 32,
      createdAt: "2023-06-01T00:00:00Z",
    },
    {
      id: "promo-3",
      code: "FREESHIP",
      type: "free_shipping",
      value: 0,
      maxUses: 50,
      maxUsesPerUser: 1,
      minOrderAmount: 500,
      expiryDate: "2023-07-31T23:59:59Z",
      isActive: true,
      usedCount: 28,
      createdAt: "2023-07-01T00:00:00Z",
    },
    {
      id: "promo-4",
      code: "FIXED100",
      type: "fixed",
      value: 100,
      maxUses: 30,
      maxUsesPerUser: 1,
      minOrderAmount: 1000,
      expiryDate: "2023-09-30T23:59:59Z",
      isActive: true,
      usedCount: 15,
      createdAt: "2023-09-01T00:00:00Z",
    },
  ]
}

// Get support tickets
export async function getSupportTickets(): Promise<SupportTicket[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "ticket-1",
      subject: "Order Delivery Delay",
      status: "new",
      createdAt: "2023-04-18T10:30:00Z",
      lastUpdated: "2023-04-18T10:30:00Z",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+20 123 456 7890",
      },
      messages: [
        {
          id: "msg-1",
          sender: "customer",
          text: "My order #ORD-1234 was supposed to be delivered yesterday but I haven't received it yet. Can you please check the status?",
          timestamp: "2023-04-18T10:30:00Z",
        },
      ],
    },
    {
      id: "ticket-2",
      subject: "Product Return Request",
      status: "in_progress",
      createdAt: "2023-04-17T14:45:00Z",
      lastUpdated: "2023-04-17T15:30:00Z",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+20 123 456 7891",
      },
      messages: [
        {
          id: "msg-2",
          sender: "customer",
          text: "I received the wrong product in my order #ORD-1235. I ordered a blue fitness tracker but received a black one. I would like to return it and get the correct color.",
          timestamp: "2023-04-17T14:45:00Z",
        },
        {
          id: "msg-3",
          sender: "agent",
          text: "I'm sorry to hear about this mix-up. We'll arrange for a return and send you the correct color. Could you please provide a photo of the product you received?",
          timestamp: "2023-04-17T15:30:00Z",
        },
      ],
    },
    {
      id: "ticket-3",
      subject: "Payment Issue",
      status: "answered",
      createdAt: "2023-04-16T09:15:00Z",
      lastUpdated: "2023-04-16T11:20:00Z",
      customer: {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@example.com",
        phone: "+20 123 456 7892",
      },
      messages: [
        {
          id: "msg-4",
          sender: "customer",
          text: "I was charged twice for my order #ORD-1236. Please refund the duplicate charge.",
          timestamp: "2023-04-16T09:15:00Z",
        },
        {
          id: "msg-5",
          sender: "agent",
          text: "I apologize for the inconvenience. I've checked your order and confirmed there was a duplicate charge. We've initiated a refund for the extra amount, which should be back in your account within 3-5 business days.",
          timestamp: "2023-04-16T10:30:00Z",
        },
        {
          id: "msg-6",
          sender: "customer",
          text: "Thank you for the quick response. I'll keep an eye out for the refund.",
          timestamp: "2023-04-16T11:00:00Z",
        },
        {
          id: "msg-7",
          sender: "agent",
          text: "You're welcome! If you don't see the refund by April 21st, please let us know and we'll follow up with the payment processor.",
          timestamp: "2023-04-16T11:20:00Z",
        },
      ],
    },
    {
      id: "ticket-4",
      subject: "Product Information Request",
      status: "closed",
      createdAt: "2023-04-15T16:20:00Z",
      lastUpdated: "2023-04-15T17:45:00Z",
      customer: {
        name: "Fatima Ali",
        email: "fatima.ali@example.com",
        phone: "+20 123 456 7893",
      },
      messages: [
        {
          id: "msg-8",
          sender: "customer",
          text: "Does the Smart Home Security Camera (product ID: prod-9) work with Google Home or is it only compatible with Alexa?",
          timestamp: "2023-04-15T16:20:00Z",
        },
        {
          id: "msg-9",
          sender: "agent",
          text: "The Smart Home Security Camera is compatible with both Google Home and Alexa. You can use voice commands with either platform to view the camera feed on compatible devices.",
          timestamp: "2023-04-15T16:45:00Z",
        },
        {
          id: "msg-10",
          sender: "customer",
          text: "Great, thank you for the information!",
          timestamp: "2023-04-15T17:15:00Z",
        },
        {
          id: "msg-11",
          sender: "agent",
          text: "You're welcome! Let us know if you have any other questions.",
          timestamp: "2023-04-15T17:30:00Z",
        },
      ],
    },
  ]
}

// Get sales data for charts
export async function getSalesData(period: string): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  if (period === "week") {
    return [
      { day: "Mon", sales: 5200, orders: 32 },
      { day: "Tue", sales: 4800, orders: 28 },
      { day: "Wed", sales: 6100, orders: 35 },
      { day: "Thu", sales: 5600, orders: 31 },
      { day: "Fri", sales: 7200, orders: 42 },
      { day: "Sat", sales: 8500, orders: 48 },
      { day: "Sun", sales: 6800, orders: 39 },
    ]
  } else if (period === "month") {
    return [
      { week: "Week 1", sales: 32400, orders: 187 },
      { week: "Week 2", sales: 35600, orders: 201 },
      { week: "Week 3", sales: 29800, orders: 176 },
      { week: "Week 4", sales: 38200, orders: 215 },
    ]
  } else {
    return [
      { month: "Jan", sales: 125000, orders: 720 },
      { month: "Feb", sales: 118000, orders: 680 },
      { month: "Mar", sales: 142000, orders: 810 },
      { month: "Apr", sales: 135000, orders: 770 },
      { month: "May", sales: 148000, orders: 840 },
      { month: "Jun", sales: 160000, orders: 910 },
      { month: "Jul", sales: 175000, orders: 980 },
      { month: "Aug", sales: 168000, orders: 950 },
      { month: "Sep", sales: 155000, orders: 880 },
      { month: "Oct", sales: 162000, orders: 920 },
      { month: "Nov", sales: 178000, orders: 1010 },
      { month: "Dec", sales: 195000, orders: 1100 },
    ]
  }
}

// Get top products for charts
export async function getTopProducts(): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    { name: "Premium Wireless Headphones", sales: 45000 },
    { name: "Stylish Smartwatch", sales: 38000 },
    { name: "Portable Bluetooth Speaker", sales: 32000 },
    { name: "Smart Home Security Camera", sales: 28000 },
    { name: "Fitness Tracker", sales: 25000 },
  ]
}

// Get customer behavior data for charts
export async function getCustomerBehaviorData(type: string): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 450))

  if (type === "cart") {
    return [
      { date: "Apr 1", rate: 22 },
      { date: "Apr 2", rate: 24 },
      { date: "Apr 3", rate: 18 },
      { date: "Apr 4", rate: 20 },
      { date: "Apr 5", rate: 26 },
      { date: "Apr 6", rate: 28 },
      { date: "Apr 7", rate: 30 },
    ]
  } else {
    return [
      { date: "Apr 1", rate: 65 },
      { date: "Apr 2", rate: 68 },
      { date: "Apr 3", rate: 62 },
      { date: "Apr 4", rate: 64 },
      { date: "Apr 5", rate: 70 },
      { date: "Apr 6", rate: 72 },
      { date: "Apr 7", rate: 75 },
    ]
  }
}
