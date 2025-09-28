import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCart } from "@/components/shopping-cart"

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <ShoppingCart />
      </main>
      
    </div>
  )
}
