import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

import { categories } from "@/data/site-data"

export function CategoriesSection() {
  return (
    <section className="py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Explore Nossas Categorias</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Cada produto é cuidadosamente selecionado para oferecer a melhor qualidade e autenticidade do estilo country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <Card
                className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  category.featured ? "md:col-span-1 lg:row-span-2" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div className={`relative overflow-hidden ${category.featured ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-white/90">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
