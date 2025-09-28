import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <RegisterForm />
      </main>
      
    </div>
  )
}
