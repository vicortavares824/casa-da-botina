import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCatalog } from "@/components/product-catalog"

interface CategoryPageProps {
  params: {
    categoria: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductCatalog category={params.categoria} />
      </main>
      <Footer />
    </div>
  )
}
