"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Ruler,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { fetchProductById } from "@/lib/data"

// Mock data do produto
const productData = {
  id: 1,
  name: "Bota Country Masculina Tradicional",
  brand: "Casa da Botina",
  price: 299.9,
  originalPrice: 399.9,
  rating: 4.8,
  reviews: 124,
  inStock: true,
  badge: "Mais Vendida",
  images: [
    "/placeholder.svg?key=img1",
    "/placeholder.svg?key=img2",
    "/placeholder.svg?key=img3",
    "/placeholder.svg?key=img4",
  ],
  sizes: ["38", "39", "40", "41", "42", "43", "44"],
  colors: [
    { name: "Marrom", hex: "#8B4513" },
    { name: "Preto", hex: "#000000" },
  ],
  description:
    "Bota country masculina confeccionada em couro legítimo de alta qualidade. Design tradicional que combina resistência e elegância, perfeita para o dia a dia ou ocasiões especiais. Solado antiderrapante e palmilha anatômica para máximo conforto.",
  features: [
    "Couro legítimo de primeira qualidade",
    "Solado antiderrapante",
    "Palmilha anatômica",
    "Costuras reforçadas",
    "Acabamento artesanal",
    "Resistente à água",
  ],
  specifications: {
    Material: "Couro bovino legítimo",
    Solado: "Borracha antiderrapante",
    Palmilha: "Anatômica em couro",
    "Altura do cano": "15cm",
    Peso: "800g (par)",
    Origem: "Brasil",
  },
}

const relatedProducts = [
  {
    id: 2,
    name: "Bota Country Masculina Premium",
    price: 449.9,
    image: "/placeholder.svg?key=rel1",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Cinto Country Couro Legítimo",
    price: 149.9,
    image: "/placeholder.svg?key=rel2",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Chapéu Sertanejo Palha Natural",
    price: 89.9,
    image: "/placeholder.svg?key=rel3",
    rating: 4.7,
  },
]

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      const data = await fetchProductById(productId)
      setProduct(data)
      setLoading(false)
    }
    loadProduct()
  }, [productId])
  console.log("Product data:", product);
  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!product) return <div className="p-8 text-center text-red-500">Produto não encontrado.</div>

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor, selecione o tamanho e a cor")
      return
    }
    // Lógica para adicionar ao carrinho
    console.log("Adicionado ao carrinho:", {
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
  }

  const nextImage = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }
  

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-foreground">
          Produtos
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          {/* Imagem Principal */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={
                Array.isArray(product.images) && product.images[selectedImage]
                  ? product.images[selectedImage]
                  : "/placeholder.svg"
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-2">
            {product.images && Array.isArray(product.images) && product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            {product.badge && (
              <Badge variant="secondary" className="w-fit">
                {product.badge}
              </Badge>
            )}
            <h1 className="text-3xl font-bold text-balance">{product.name}</h1>
            <p className="text-muted-foreground">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-sm text-green-600">
                Economia de R$ {(product.originalPrice - product.price).toFixed(2).replace(".", ",")}(
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
              </p>
            )}
          </div>

          <Separator />

          {/* Seleções */}
          <div className="space-y-4">
            {/* Cor */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Cor: {selectedColor}</label>
              <div className="flex space-x-2">
                {product.colors && Array.isArray(product.colors) && product.colors.map((color: any, idx: number) => {
                  const colorName = typeof color === "string" ? color : color.name;
                  const colorHex = typeof color === "string" ? "#000" : color.hex || "#000";
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors ${
                        selectedColor === colorName ? "border-primary" : "border-muted"
                      }`}
                      style={{ backgroundColor: colorHex }}
                      title={colorName}
                    />
                  );
                })}
              </div>
            </div>

            {/* Tamanho */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Tamanho</label>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Ruler className="h-3 w-3 mr-1" />
                  Guia de Tamanhos
                </Button>
              </div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes && Array.isArray(product.sizes) && product.sizes.map((size: string, idx: number) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantidade */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantidade</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <Button className="w-full h-12" size="lg" onClick={handleAddToCart} disabled={!product.inStock}>
              {product.inStock ? "Adicionar ao Carrinho" : "Produto Esgotado"}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center justify-center space-x-2"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                <span>Favoritar</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>
            </div>
          </div>

          {/* Benefícios */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center space-x-3 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Frete grátis acima de R$ 299</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>Troca grátis em até 30 dias</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Garantia de 1 ano</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs com Informações Detalhadas */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Descrição</TabsTrigger>
          <TabsTrigger value="specifications">Especificações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações ({product.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <div>
                  <h3 className="font-semibold mb-3">Características:</h3>
                  <ul className="space-y-2">
                    {product.features && Array.isArray(product.features) && product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Resumo das Avaliações */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{product.reviews} avaliações</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{stars}★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {stars === 5 ? 87 : stars === 4 ? 25 : stars === 3 ? 8 : stars === 2 ? 3 : 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Avaliações Individuais */}
                <div className="space-y-4">
                  {[
                    {
                      name: "João Silva",
                      rating: 5,
                      date: "15/12/2024",
                      comment: "Excelente qualidade! A bota é muito confortável e o acabamento é impecável. Recomendo!",
                    },
                    {
                      name: "Maria Santos",
                      rating: 4,
                      date: "10/12/2024",
                      comment: "Produto de boa qualidade, chegou rápido. Apenas achei um pouco apertada no início.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Produtos Relacionados */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <Link href={`/produto/${product.id}`}>
                      <Button size="sm">Ver</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
