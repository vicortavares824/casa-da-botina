import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-1">
        <LoginForm />
      </main>
      
    </div>
  )
}
