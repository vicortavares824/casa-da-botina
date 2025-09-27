"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Smartphone, Barcode, Shield, Truck, CheckCircle } from "lucide-react"

// Mock data do carrinho (normalmente viria de um contexto/estado global)
const cartItems = [
  {
    id: 1,
    name: "Bota Country Masculina Tradicional",
    price: 299.9,
    quantity: 1,
    image: "/placeholder.svg?key=checkout1",
  },
  {
    id: 2,
    name: "Chapéu Sertanejo Palha Natural",
    price: 89.9,
    quantity: 2,
    image: "/placeholder.svg?key=checkout2",
  },
]

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

export function CheckoutProcess() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados pessoais
    email: "",
    firstName: "",
    lastName: "",
    cpf: "",
    phone: "",

    // Endereço
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    // Pagamento
    paymentMethod: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    installments: "1",

    // Opções
    saveAddress: false,
    newsletter: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.9
  const total = subtotal + shipping

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCepChange = async (cep: string) => {
    updateFormData("cep", cep)

    // Simulação de busca de CEP
    if (cep.length === 8) {
      // Em um app real, faria uma chamada para API dos Correios
      updateFormData("street", "Rua das Flores")
      updateFormData("neighborhood", "Centro")
      updateFormData("city", "São Francisco")
      updateFormData("state", "MG")
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.email && formData.firstName && formData.lastName && formData.cpf && formData.phone
      case 2:
        return (
          formData.cep && formData.street && formData.number && formData.neighborhood && formData.city && formData.state
        )
      case 3:
        return (
          formData.paymentMethod &&
          (formData.paymentMethod === "pix" ||
            formData.paymentMethod === "boleto" ||
            (formData.cardNumber && formData.cardName && formData.cardExpiry && formData.cardCvv))
        )
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    } else {
      alert("Por favor, preencha todos os campos obrigatórios")
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const completeOrder = async () => {
    setIsProcessing(true)

    // Simulação de processamento do pedido
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderCompleted(true)
  }

  if (orderCompleted) {
    return (
      <div className="container px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-600">Pedido Confirmado!</h1>
            <p className="text-lg text-muted-foreground">Seu pedido #CB-2024-001 foi realizado com sucesso</p>
          </div>
          <Card className="text-left">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span>Total pago:</span>
                <span className="font-bold">R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span>Forma de pagamento:</span>
                <span className="capitalize">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega prevista:</span>
                <span>5-7 dias úteis</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/minha-conta/pedidos">
              <Button>Acompanhar Pedido</Button>
            </Link>
            <Link href="/produtos">
              <Button variant="outline">Continuar Comprando</Button>
            </Link>
          </div>
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
        <Link href="/carrinho" className="hover:text-foreground">
          Carrinho
        </Link>
        <span>/</span>
        <span className="text-foreground">Checkout</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        <Link href="/carrinho">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Carrinho
          </Button>
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-16 h-0.5 mx-2 ${currentStep > step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          {/* Etapa 1: Dados Pessoais */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      placeholder="Seu sobrenome"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => updateFormData("cpf", e.target.value)}
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => updateFormData("newsletter", checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Quero receber ofertas e novidades por e-mail
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 2: Endereço */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="street">Rua *</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => updateFormData("street", e.target.value)}
                      placeholder="Nome da rua"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => updateFormData("number", e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={formData.complement}
                    onChange={(e) => updateFormData("complement", e.target.value)}
                    placeholder="Apartamento, bloco, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => updateFormData("neighborhood", e.target.value)}
                      placeholder="Nome do bairro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="Nome da cidade"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveAddress"
                    checked={formData.saveAddress}
                    onCheckedChange={(checked) => updateFormData("saveAddress", checked as boolean)}
                  />
                  <Label htmlFor="saveAddress" className="text-sm">
                    Salvar este endereço para futuras compras
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 3: Pagamento */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => updateFormData("paymentMethod", value)}
                >
                  {/* Cartão de Crédito */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex items-center space-x-2 cursor-pointer">
                        <CreditCard className="w-4 h-4" />
                        <span>Cartão de Crédito</span>
                      </Label>
                    </div>

                    {formData.paymentMethod === "credit" && (
                      <div className="ml-6 space-y-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => updateFormData("cardNumber", e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName}
                            onChange={(e) => updateFormData("cardName", e.target.value)}
                            placeholder="Nome como está no cartão"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Validade *</Label>
                            <Input
                              id="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={(e) => updateFormData("cardExpiry", e.target.value)}
                              placeholder="MM/AA"
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvv">CVV *</Label>
                            <Input
                              id="cardCvv"
                              value={formData.cardCvv}
                              onChange={(e) => updateFormData("cardCvv", e.target.value)}
                              placeholder="000"
                              maxLength={4}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select
                            value={formData.installments}
                            onValueChange={(value) => updateFormData("installments", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x de R$ {total.toFixed(2).replace(".", ",")} sem juros</SelectItem>
                              <SelectItem value="2">
                                2x de R$ {(total / 2).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                              <SelectItem value="3">
                                3x de R$ {(total / 3).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                              <SelectItem value="6">
                                6x de R$ {(total / 6).toFixed(2).replace(".", ",")} sem juros
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PIX */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center space-x-2 cursor-pointer">
                      <Smartphone className="w-4 h-4" />
                      <span>PIX</span>
                      <Badge variant="secondary">5% de desconto</Badge>
                    </Label>
                  </div>

                  {/* Boleto */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex items-center space-x-2 cursor-pointer">
                      <Barcode className="w-4 h-4" />
                      <span>Boleto Bancário</span>
                      <Badge variant="secondary">3% de desconto</Badge>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Seus dados estão protegidos com criptografia SSL</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botões de Navegação */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Voltar
            </Button>

            {currentStep < 3 ? (
              <Button onClick={nextStep}>Continuar</Button>
            ) : (
              <Button onClick={completeOrder} disabled={!validateStep(3) || isProcessing} className="min-w-32">
                {isProcessing ? "Processando..." : "Finalizar Pedido"}
              </Button>
            )}
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                  <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2).replace(".", ",")}</span>
                </div>
                {formData.paymentMethod === "pix" && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto PIX (5%)</span>
                    <span>-R$ {(total * 0.05).toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                {formData.paymentMethod === "boleto" && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto Boleto (3%)</span>
                    <span>-R$ {(total * 0.03).toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  R${" "}
                  {(formData.paymentMethod === "pix"
                    ? total * 0.95
                    : formData.paymentMethod === "boleto"
                      ? total * 0.97
                      : total
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium">Entrega em 5-7 dias úteis</div>
                  <div className="text-muted-foreground">Frete padrão</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
