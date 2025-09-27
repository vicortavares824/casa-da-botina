"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Grid3X3, List, Heart, Star } from "lucide-react"
import Link from "next/link"

// Mock data dos produtos
const allProducts = [
  {
    id: 1,
    name: "Bota Country Masculina Tradicional",
    category: "botas-masculinas",
    price: 299.9,
    originalPrice: 399.9,
    image: "/produto-bota-masculina-1.jpg",
    rating: 4.8,
    reviews: 124,
    brand: "Casa da Botina",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Marrom", "Preto"],
    inStock: true,
    badge: "Mais Vendida",
  },
  {
    id: 2,
    name: "Bota Feminina Country Elegante",
    category: "botas-femininas",
    price: 279.9,
    originalPrice: null,
    image: "/produto-bota-feminina-1.jpg",
    rating: 4.9,
    reviews: 89,
    brand: "Casa da Botina",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: ["Caramelo", "Preto", "Marrom"],
    inStock: true,
    badge: "Novidade",
  },
  {
    id: 13,
    name: "Bota Feminina Country Texana",
    category: "botas-femininas",
    price: 329.9,
    originalPrice: 399.9,
    image: "/produto-bota-feminina-texana.jpg",
    rating: 4.8,
    reviews: 67,
    brand: "Casa da Botina",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: ["Caramelo", "Whisky", "Preto"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 14,
    name: "Bota Feminina Country Cano Alto",
    category: "botas-femininas",
    price: 359.9,
    originalPrice: null,
    image: "/produto-bota-feminina-cano-alto.jpg",
    rating: 4.7,
    reviews: 45,
    brand: "Premium Line",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: ["Marrom", "Preto", "Bege"],
    inStock: true,
    badge: "Premium",
  },
  {
    id: 15,
    name: "Bota Feminina Country Bordada",
    category: "botas-femininas",
    price: 389.9,
    originalPrice: null,
    image: "/produto-bota-feminina-bordada.jpg",
    rating: 4.9,
    reviews: 38,
    brand: "Casa da Botina",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: ["Caramelo", "Marrom"],
    inStock: true,
    badge: "Exclusiva",
  },
  {
    id: 16,
    name: "Bota Feminina Country Casual",
    category: "botas-femininas",
    price: 249.9,
    originalPrice: 299.9,
    image: "/produto-bota-feminina-casual.jpg",
    rating: 4.6,
    reviews: 72,
    brand: "Tradição",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: ["Preto", "Marrom", "Caramelo"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 17,
    name: "Bota Infantil Country Menino",
    category: "botas-infantis",
    price: 179.9,
    originalPrice: null,
    image: "/produto-bota-infantil-menino.jpg",
    rating: 4.8,
    reviews: 56,
    brand: "Casa da Botina",
    sizes: ["26", "27", "28", "29", "30", "31", "32", "33", "34"],
    colors: ["Marrom", "Preto"],
    inStock: true,
    badge: "Novidade",
  },
  {
    id: 18,
    name: "Bota Infantil Country Menina",
    category: "botas-infantis",
    price: 169.9,
    originalPrice: 199.9,
    image: "/produto-bota-infantil-menina.jpg",
    rating: 4.7,
    reviews: 43,
    brand: "Casa da Botina",
    sizes: ["26", "27", "28", "29", "30", "31", "32", "33", "34"],
    colors: ["Rosa", "Caramelo", "Marrom"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 19,
    name: "Bota Infantil Country Texana Mini",
    category: "botas-infantis",
    price: 199.9,
    originalPrice: null,
    image: "/produto-bota-infantil-texana.jpg",
    rating: 4.9,
    reviews: 29,
    brand: "Premium Line",
    sizes: ["26", "27", "28", "29", "30", "31", "32", "33", "34"],
    colors: ["Caramelo", "Marrom"],
    inStock: true,
    badge: "Premium",
  },
  {
    id: 20,
    name: "Bota Infantil Country Casual",
    category: "botas-infantis",
    price: 149.9,
    originalPrice: null,
    image: "/produto-bota-infantil-casual.jpg",
    rating: 4.5,
    reviews: 67,
    brand: "Tradição",
    sizes: ["26", "27", "28", "29", "30", "31", "32", "33", "34"],
    colors: ["Preto", "Marrom", "Azul"],
    inStock: true,
    badge: null,
  },
  {
    id: 21,
    name: "Bota Infantil Country Bordada",
    category: "botas-infantis",
    price: 189.9,
    originalPrice: 219.9,
    image: "/produto-bota-infantil-bordada.jpg",
    rating: 4.8,
    reviews: 34,
    brand: "Casa da Botina",
    sizes: ["26", "27", "28", "29", "30", "31", "32", "33", "34"],
    colors: ["Rosa", "Lilás", "Caramelo"],
    inStock: false,
    badge: "Esgotado",
  },
  {
    id: 3,
    name: "Chapéu Sertanejo Palha Natural",
    category: "chapeus",
    price: 89.9,
    originalPrice: 119.9,
    image: "/produto-chapeu-1.jpg",
    rating: 4.7,
    reviews: 67,
    brand: "Tradição",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Natural", "Marrom"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 7,
    name: "Chapéu Country Feltro Premium",
    category: "chapeus",
    price: 159.9,
    originalPrice: null,
    image: "/produto-chapeu-feltro.jpg",
    rating: 4.8,
    reviews: 43,
    brand: "Premium Line",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Marrom", "Bege"],
    inStock: true,
    badge: "Premium",
  },
  {
    id: 8,
    name: "Chapéu Cowboy Couro Legítimo",
    category: "chapeus",
    price: 199.9,
    originalPrice: 249.9,
    image: "/produto-chapeu-couro.jpg",
    rating: 4.9,
    reviews: 28,
    brand: "Casa da Botina",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Marrom", "Preto"],
    inStock: true,
    badge: "Novidade",
  },
  {
    id: 9,
    name: "Chapéu Sertanejo Palha Trançada",
    category: "chapeus",
    price: 69.9,
    originalPrice: null,
    image: "/produto-chapeu-trancado.jpg",
    rating: 4.5,
    reviews: 89,
    brand: "Tradição",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Natural", "Caramelo"],
    inStock: true,
    badge: null,
  },
  {
    id: 10,
    name: "Chapéu Country Australiano",
    category: "chapeus",
    price: 179.9,
    originalPrice: null,
    image: "/produto-chapeu-australiano.jpg",
    rating: 4.6,
    reviews: 35,
    brand: "Country Style",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Marrom", "Olive"],
    inStock: true,
    badge: null,
  },
  {
    id: 11,
    name: "Chapéu Feminino Country Chic",
    category: "chapeus",
    price: 129.9,
    originalPrice: 159.9,
    image: "/produto-chapeu-feminino.jpg",
    rating: 4.7,
    reviews: 52,
    brand: "Casa da Botina",
    sizes: ["P", "M", "G"],
    colors: ["Bege", "Rosa", "Marrom"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 12,
    name: "Chapéu Rodeio Profissional",
    category: "chapeus",
    price: 249.9,
    originalPrice: null,
    image: "/produto-chapeu-rodeio.jpg",
    rating: 4.9,
    reviews: 19,
    brand: "Premium Line",
    sizes: ["M", "G", "GG"],
    colors: ["Preto", "Marrom"],
    inStock: false,
    badge: "Esgotado",
  },
  {
    id: 4,
    name: "Cinto Country Couro Legítimo",
    category: "cintos",
    price: 149.9,
    originalPrice: null,
    image: "/produto-cinto-1.jpg",
    rating: 4.6,
    reviews: 45,
    brand: "Casa da Botina",
    sizes: ["80", "85", "90", "95", "100", "105"],
    colors: ["Marrom", "Preto", "Caramelo"],
    inStock: true,
    badge: null,
  },
  {
    id: 22,
    name: "Cinto Country Trançado Premium",
    category: "cintos",
    price: 189.9,
    originalPrice: 229.9,
    image: "/produto-cinto-trancado.jpg",
    rating: 4.8,
    reviews: 67,
    brand: "Premium Line",
    sizes: ["80", "85", "90", "95", "100", "105"],
    colors: ["Marrom", "Caramelo", "Preto"],
    inStock: true,
    badge: "Premium",
  },
  {
    id: 23,
    name: "Cinto Country Feminino Delicado",
    category: "cintos",
    price: 119.9,
    originalPrice: null,
    image: "/produto-cinto-feminino.jpg",
    rating: 4.7,
    reviews: 89,
    brand: "Casa da Botina",
    sizes: ["70", "75", "80", "85", "90", "95"],
    colors: ["Caramelo", "Rosa", "Marrom"],
    inStock: true,
    badge: "Novidade",
  },
  {
    id: 24,
    name: "Cinto Country Fivela Grande",
    category: "cintos",
    price: 199.9,
    originalPrice: null,
    image: "/produto-cinto-fivela-grande.jpg",
    rating: 4.9,
    reviews: 34,
    brand: "Tradição",
    sizes: ["85", "90", "95", "100", "105", "110"],
    colors: ["Preto", "Marrom"],
    inStock: true,
    badge: "Exclusivo",
  },
  {
    id: 6,
    name: "Carteira Masculina Couro",
    category: "carteiras",
    price: 79.9,
    originalPrice: 99.9,
    image: "/produto-carteira-1.jpg",
    rating: 4.5,
    reviews: 32,
    brand: "Casa da Botina",
    sizes: ["Único"],
    colors: ["Marrom", "Preto"],
    inStock: false,
    badge: "Esgotado",
  },
  {
    id: 25,
    name: "Carteira Country Feminina Compacta",
    category: "carteiras",
    price: 89.9,
    originalPrice: null,
    image: "/produto-carteira-feminina.jpg",
    rating: 4.6,
    reviews: 78,
    brand: "Casa da Botina",
    sizes: ["Único"],
    colors: ["Rosa", "Caramelo", "Preto"],
    inStock: true,
    badge: "Novidade",
  },
  {
    id: 26,
    name: "Carteira Masculina Premium Couro",
    category: "carteiras",
    price: 129.9,
    originalPrice: 159.9,
    image: "/produto-carteira-premium.jpg",
    rating: 4.8,
    reviews: 56,
    brand: "Premium Line",
    sizes: ["Único"],
    colors: ["Marrom", "Preto", "Whisky"],
    inStock: true,
    badge: "Premium",
  },
  {
    id: 27,
    name: "Carteira Country Porta Cartões",
    category: "carteiras",
    price: 59.9,
    originalPrice: null,
    image: "/produto-carteira-porta-cartoes.jpg",
    rating: 4.4,
    reviews: 92,
    brand: "Tradição",
    sizes: ["Único"],
    colors: ["Marrom", "Preto", "Caramelo"],
    inStock: true,
    badge: null,
  },
  {
    id: 28,
    name: "Carteira Country Vintage",
    category: "carteiras",
    price: 109.9,
    originalPrice: null,
    image: "/produto-carteira-vintage.jpg",
    rating: 4.7,
    reviews: 43,
    brand: "Country Style",
    sizes: ["Único"],
    colors: ["Marrom", "Whisky"],
    inStock: true,
    badge: "Vintage",
  },
  {
    id: 29,
    name: "Bolsa Country Feminina Grande",
    category: "bolsas",
    price: 199.9,
    originalPrice: 249.9,
    image: "/produto-bolsa-grande.jpg",
    rating: 4.8,
    reviews: 67,
    brand: "Casa da Botina",
    sizes: ["Único"],
    colors: ["Caramelo", "Marrom", "Preto"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 30,
    name: "Bolsa Country Tiracolo",
    category: "bolsas",
    price: 149.9,
    originalPrice: null,
    image: "/produto-bolsa-tiracolo.jpg",
    rating: 4.6,
    reviews: 89,
    brand: "Casa da Botina",
    sizes: ["Único"],
    colors: ["Rosa", "Caramelo", "Marrom"],
    inStock: true,
    badge: "Novidade",
  },
  {
    id: 31,
    name: "Bolsa Country Clutch Elegante",
    category: "bolsas",
    price: 89.9,
    originalPrice: null,
    image: "/produto-bolsa-clutch.jpg",
    rating: 4.5,
    reviews: 54,
    brand: "Premium Line",
    sizes: ["Único"],
    colors: ["Preto", "Dourado", "Prata"],
    inStock: true,
    badge: "Elegante",
  },
  {
    id: 32,
    name: "Bolsa Country Mochila",
    category: "bolsas",
    price: 179.9,
    originalPrice: 219.9,
    image: "/produto-bolsa-mochila.jpg",
    rating: 4.7,
    reviews: 76,
    brand: "Tradição",
    sizes: ["Único"],
    colors: ["Marrom", "Preto", "Verde"],
    inStock: true,
    badge: "Promoção",
  },
  {
    id: 33,
    name: "Bolsa Country Carteiro",
    category: "bolsas",
    price: 129.9,
    originalPrice: null,
    image: "/produto-bolsa-carteiro.jpg",
    rating: 4.4,
    reviews: 38,
    brand: "Country Style",
    sizes: ["Único"],
    colors: ["Caramelo", "Marrom"],
    inStock: true,
    badge: null,
  },
  {
    id: 34,
    name: "Fivela Country Tradicional",
    category: "fivelas",
    price: 69.9,
    originalPrice: null,
    image: "/produto-fivela-tradicional.jpg",
    rating: 4.6,
    reviews: 45,
    brand: "Casa da Botina",
    sizes: ["Único"],
    colors: ["Prata", "Dourado"],
    inStock: true,
    badge: "Tradicional",
  },
  {
    id: 35,
    name: "Fivela Country Rodeio",
    category: "fivelas",
    price: 89.9,
    originalPrice: 109.9,
    image: "/produto-fivela-rodeio.jpg",
    rating: 4.8,
    reviews: 67,
    brand: "Premium Line",
    sizes: ["Único"],
    colors: ["Prata", "Bronze"],
    inStock: true,
    badge: "Rodeio",
  },
  {
    id: 36,
    name: "Fivela Country Personalizada",
    category: "fivelas",
    price: 129.9,
    originalPrice: null,
    image: "/produto-fivela-personalizada.jpg",
    rating: 4.9,
    reviews: 23,
    brand: "Casa da Botina",
    sizes: ["Único"],
    colors: ["Prata", "Dourado", "Bronze"],
    inStock: true,
    badge: "Exclusiva",
  },
  {
    id: 37,
    name: "Fivela Country Vintage",
    category: "fivelas",
    price: 99.9,
    originalPrice: null,
    image: "/produto-fivela-vintage.jpg",
    rating: 4.7,
    reviews: 34,
    brand: "Tradição",
    sizes: ["Único"],
    colors: ["Bronze", "Cobre"],
    inStock: true,
    badge: "Vintage",
  },
]

const categories = [
  { value: "botas-masculinas", label: "Botas Masculinas" },
  { value: "botas-femininas", label: "Botas Femininas" },
  { value: "botas-infantis", label: "Botas Infantis" },
  { value: "chapeus", label: "Chapéus" },
  { value: "cintos", label: "Cintos" },
  { value: "carteiras", label: "Carteiras" },
  { value: "bolsas", label: "Bolsas" },
  { value: "fivelas", label: "Fivelas" },
]

const brands = ["Casa da Botina", "Premium Line", "Tradição", "Country Style"]
const colors = [
  "Marrom",
  "Preto",
  "Caramelo",
  "Natural",
  "Whisky",
  "Bege",
  "Rosa",
  "Olive",
  "Verde",
  "Prata",
  "Dourado",
  "Bronze",
  "Cobre",
]

interface ProductCatalogProps {
  category?: string
}

export function ProductCatalog({ category }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
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
  }, [searchTerm, selectedCategory, selectedBrands, selectedColors, priceRange, sortBy])

  const categoryName = categories.find((cat) => cat.value === selectedCategory)?.label || "Todos os Produtos"

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
          {categories.map((cat) => (
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
