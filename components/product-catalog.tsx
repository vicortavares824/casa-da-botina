"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Grid3X3, List, Heart, Star } from "lucide-react"
import { fetchProducts } from "@/lib/data"
import { brands, colors } from "@/data/site-data"


interface ProductCatalogProps {
  category?: string
}

const CATEGORY_OPTIONS = [
  { label: 'Botas Masculinas', value: 'botas-masculinas' },
  { label: 'Botas Femininas', value: 'botas-femininas' },
  { label: 'Botas Infantis', value: 'botas-infantis' },
  { label: 'Chapéus', value: 'chapeus' },
  { label: 'Bonés', value: 'bones' },
];

export function ProductCatalog({ category }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Buscar produtos do Firestore ao montar
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      let data = [];
      if (selectedCategory) {
        // Busca filtrada por categoria
        const { db } = await import("@/lib/firebase");
        const { collection, getDocs, query, where } = await import("firebase/firestore");
        const q = query(collection(db, "produtos"), where("category", "==", selectedCategory));
        const snapshot = await getDocs(q);
        data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } else {
        data = await fetchProducts();
      }
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [selectedCategory])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesColor = selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color))
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesBrand && matchesColor && matchesPrice
    })

    // Ordenação
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Relevância (produtos em estoque primeiro, depois por rating)
        filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1
          if (!a.inStock && b.inStock) return 1
          return b.rating - a.rating
        })
    }

    return filtered
  }, [products, searchTerm, selectedCategory, selectedBrands, selectedColors, priceRange, sortBy])

  const categoryName = CATEGORY_OPTIONS.find((cat) => cat.value === selectedCategory)?.label || "Todos os Produtos"

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categorias */}
      <div className="space-y-3">
        <h3 className="font-semibold">Categoria</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="all-categories" checked={!selectedCategory} onCheckedChange={() => setSelectedCategory("")} />
            <label htmlFor="all-categories" className="text-sm">
              Todas
            </label>
          </div>
          {CATEGORY_OPTIONS.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-2">
              <Checkbox
                id={cat.value}
                checked={selectedCategory === cat.value}
                onCheckedChange={() => setSelectedCategory(selectedCategory === cat.value ? "" : cat.value)}
              />
              <label htmlFor={cat.value} className="text-sm">
                {cat.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div className="space-y-3">
        <h3 className="font-semibold">Marca</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <label htmlFor={brand} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Cores */}
      <div className="space-y-3">
        <h3 className="font-semibold">Cor</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedColors([...selectedColors, color])
                  } else {
                    setSelectedColors(selectedColors.filter((c) => c !== color))
                  }
                }}
              />
              <label htmlFor={color} className="text-sm">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="space-y-3">
        <h3 className="font-semibold">Preço</h3>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Limpar Filtros */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          setSelectedCategory("")
          setSelectedBrands([])
          setSelectedColors([])
          setPriceRange([0, 500])
        }}
      >
        Limpar Filtros
      </Button>
    </div>
  )

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>
        <span>/</span>
        <span className="text-foreground">{categoryName}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros Desktop */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <FilterContent />
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Barra de Busca e Controles */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* Filtros Mobile */}
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Ordenação */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevância</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliado</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Modo de Visualização */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("")
                  setSelectedBrands([])
                  setSelectedColors([])
                  setPriceRange([0, 500])
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-[3/4]"
                      }`}
                    >
                      <img
                        src={
                          Array.isArray(product.images) && product.images.length > 0
                            ? product.images[0]
                            : product.image || "/placeholder.svg"
                        }
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
                                : product.badge === "Esgotado"
                                  ? "outline"
                                  : product.badge === "Exclusiva"
                                    ? "default"
                                    : product.badge === "Premium"
                                      ? "default"
                                      : product.badge === "Vintage"
                                        ? "default"
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

                    <div className={`p-4 space-y-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
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
                          <Button
                            className={viewMode === "list" ? "w-auto" : "w-full"}
                            size="sm"
                            disabled={!product.inStock}
                          >
                            {product.inStock ? "Ver Produto" : "Esgotado"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
