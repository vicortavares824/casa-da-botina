import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutProcess } from "@/components/checkout-process"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <CheckoutProcess />
      </main>
      
    </div>
  )
}
