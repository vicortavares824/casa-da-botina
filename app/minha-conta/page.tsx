import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserAccount } from "@/components/user-account"

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
   
      <main className="flex-1">
        <UserAccount />
      </main>
     
    </div>
  )
}
