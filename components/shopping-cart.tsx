"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag, Truck, Tag, ArrowLeft } from "lucide-react"

// Mock data do carrinho
const initialCartItems = [
  {
    id: 1,
    name: "Bota Country Masculina Tradicional",
    brand: "Casa da Botina",
    price: 299.9,
    originalPrice: 399.9,
    image: "/placeholder.svg?key=cart1",
    size: "42",
    color: "Marrom",
    quantity: 1,
    inStock: true,
  },
  {
    id: 2,
    name: "Chapéu Sertanejo Palha Natural",
    brand: "Tradição",
    price: 89.9,
    originalPrice: 119.9,
    image: "/placeholder.svg?key=cart2",
    size: "M",
    color: "Natural",
    quantity: 2,
    inStock: true,
  },
  {
    id: 3,
    name: "Cinto Country Couro Legítimo",
    brand: "Casa da Botina",
    price: 149.9,
    originalPrice: null,
    image: "/placeholder.svg?key=cart3",
    size: "90",
    color: "Preto",
    quantity: 1,
    inStock: true,
  },
]

const shippingOptions = [
  { id: "standard", name: "Padrão (5-7 dias úteis)", price: 15.9 },
  { id: "express", name: "Expressa (2-3 dias úteis)", price: 29.9 },
  { id: "free", name: "Grátis (8-12 dias úteis)", price: 0, minValue: 299 },
]

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [cep, setCep] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    // Simulação de cupons válidos
    const validCoupons = {
      PRIMEIRA10: 10,
      COUNTRY15: 15,
      FRETE20: 20,
    }

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount: validCoupons[couponCode as keyof typeof validCoupons],
      })
      setCouponCode("")
    } else {
      alert("Cupom inválido")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  // Cálculos
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)

  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const subtotalAfterCoupon = subtotal - couponDiscount

  const selectedShippingOption = shippingOptions.find((option) => option.id === selectedShipping)
  const shippingCost =
    selectedShippingOption?.minValue && subtotalAfterCoupon >= selectedShippingOption.minValue
      ? 0
      : selectedShippingOption?.price || 0

  const total = subtotalAfterCoupon + shippingCost

  if (cartItems.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8  py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground">Adicione produtos incríveis ao seu carrinho e finalize sua compra</p>
          </div>
          <Link href="/produtos">
            <Button size="lg">Continuar Comprando</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>
        <span>/</span>
        <span className="text-foreground">Carrinho</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
        <Link href="/produtos">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar Comprando
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itens do Carrinho */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={`${item.id}-${item.size}-${item.color}`}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Imagem */}
                  <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informações */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="font-medium leading-tight">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Tamanho: {item.size}</span>
                          <span>Cor: {item.color}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Preço */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-primary">R$ {item.price.toFixed(2).replace(".", ",")}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                            </span>
                          )}
                        </div>
                        {item.originalPrice && (
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="space-y-6">
          {/* Cupom de Desconto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Cupom de Desconto</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <div className="font-medium text-green-800">{appliedCoupon.code}</div>
                    <div className="text-sm text-green-600">{appliedCoupon.discount}% de desconto</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeCoupon}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Digite o cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <Button onClick={applyCoupon} disabled={!couponCode}>
                    Aplicar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Frete */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Entrega</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={9}
                />
                <Button variant="outline">Calcular</Button>
              </div>

              <div className="space-y-2">
                {shippingOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={option.id}
                      name="shipping"
                      value={option.id}
                      checked={selectedShipping === option.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="text-primary"
                    />
                    <label htmlFor={option.id} className="flex-1 text-sm cursor-pointer">
                      <div className="flex justify-between">
                        <span>{option.name}</span>
                        <span className="font-medium">
                          {option.minValue && subtotalAfterCoupon >= option.minValue
                            ? "Grátis"
                            : option.price === 0
                              ? "Grátis"
                              : `R$ ${option.price.toFixed(2).replace(".", ",")}`}
                        </span>
                      </div>
                      {option.minValue && subtotalAfterCoupon < option.minValue && (
                        <div className="text-xs text-muted-foreground">
                          Faltam R$ {(option.minValue - subtotalAfterCoupon).toFixed(2).replace(".", ",")} para frete
                          grátis
                        </div>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Economia</span>
                    <span>-R$ {savings.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedCoupon.code})</span>
                    <span>-R$ {couponDiscount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>{shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2).replace(".", ",")}`}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Finalizar Compra
                </Button>
              </Link>

              <div className="text-center">
                <Link href="/produtos" className="text-sm text-muted-foreground hover:text-foreground">
                  Continuar comprando
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs">🔒</span>
                </div>
                <div>
                  <div className="font-medium">Compra 100% Segura</div>
                  <div className="text-muted-foreground">Seus dados estão protegidos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
