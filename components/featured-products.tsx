import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"

import { featuredProducts } from "@/data/site-data"

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Produtos em Destaque</h2>
            <p className="text-lg text-muted-foreground">Os favoritos dos nossos clientes</p>
          </div>
          <Link href="/produtos">
            <Button variant="outline" size="lg">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            if (!product) return null
            return (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant={
                          product.badge === "Promoção"
                            ? "destructive"
                            : product.badge === "Novidade"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                          </span>
                        )}
                      </div>
                      <Link href={`/produto/${product.id}`}>
                        <Button className="w-full" size="sm">
                          Ver Produto
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
