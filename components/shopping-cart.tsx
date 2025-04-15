"use client"

import { useState } from "react"

// Types
type Product = {
  id: string
  name: string
  price: number
  image: string
}

type CartItem = Product & {
  quantity: number
}

// Demo products
const demoProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Product component
function ProductComponent({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="h-24 w-24 mx-auto mb-2">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover rounded"
        />
      </div>
      <h3 className="font-medium text-lg">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <button
        onClick={onAddToCart}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}

// Cart item component
function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: Product & { quantity: number }
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b">
      <div className="h-16 w-16 flex-shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover rounded" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{item.name}</h4>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="h-8 w-8 flex items-center justify-center rounded border hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="h-8 w-8 flex items-center justify-center rounded border hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 p-1">
        ×
      </button>
    </div>
  )
}

// Main shopping cart component
// export default function ShoppingCart() {
//   return (
//     <CartProvider>
//       <ShoppingCartContent />
//     </CartProvider>
//   )
// }

// function ShoppingCartContent() {
//   const { items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCartContext()

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart Demo</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Products section */}
//         <div className="md:col-span-2">
//           <h2 className="text-xl font-semibold mb-4">Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {demoProducts.map((product) => (
//               <ProductComponent key={product.id} product={product} onAddToCart={() => addToCart(product)} />
//             ))}
//           </div>
//         </div>

//         {/* Cart section */}
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Your Cart</h2>
//             <span className="bg-blue-600 text-white text-sm py-1 px-2 rounded-full">
//               {totalItems} {totalItems === 1 ? "item" : "items"}
//             </span>
//           </div>

//           {items.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">Your cart is empty</p>
//           ) : (
//             <>
//               <div className="max-h-96 overflow-y-auto mb-4">
//                 {items.map((item) => (
//                   <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between font-semibold text-lg mb-4">
//                   <span>Total:</span>
//                   <span>${totalPrice.toFixed(2)}</span>
//                 </div>
//                 <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
//                   Checkout
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([])

  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Add item to cart
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h2 className="text-lg font-bold mb-2">Cart ({totalItems})</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="max-h-60 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-6 w-6 flex items-center justify-center rounded border"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-6 w-6 flex items-center justify-center rounded border"
                  >
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-2 border-t">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={clearCart} className="w-full mt-2 bg-red-500 text-white py-1 rounded hover:bg-red-600">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}
