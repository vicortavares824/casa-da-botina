"use client"

import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app as firebaseApp } from "@/lib/firebase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Package, MapPin, Heart, Settings, LogOut, Eye, Edit } from "lucide-react"

// Mock data do usuário
const userData = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "(38) 99999-9999",
  cpf: "123.456.789-00",
  birthDate: "15/03/1985",
}

const userOrders = [
  {
    id: "CB-2024-001",
    date: "15/12/2024",
    status: "Entregue",
    total: 479.8,
    items: [
      { name: "Bota Country Masculina Tradicional", quantity: 1, price: 299.9 },
      { name: "Chapéu Sertanejo Palha Natural", quantity: 2, price: 89.9 },
    ],
  },
  {
    id: "CB-2024-002",
    date: "10/12/2024",
    status: "Em trânsito",
    total: 149.9,
    items: [{ name: "Cinto Country Couro Legítimo", quantity: 1, price: 149.9 }],
  },
  {
    id: "CB-2024-003",
    date: "05/12/2024",
    status: "Processando",
    total: 359.8,
    items: [{ name: "Bota Feminina Country Elegante", quantity: 1, price: 279.9 }],
  },
]

const userAddresses = [
  {
    id: 1,
    name: "Casa",
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Francisco",
    state: "MG",
    cep: "39300-000",
    isDefault: true,
  },
  {
    id: 2,
    name: "Trabalho",
    street: "Av. Principal, 456",
    neighborhood: "Industrial",
    city: "São Francisco",
    state: "MG",
    cep: "39300-100",
    isDefault: false,
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "Bota Country Premium Masculina",
    price: 449.9,
    image: "/placeholder.svg?key=wish1",
    inStock: true,
  },
  {
    id: 2,
    name: "Carteira Masculina Couro",
    price: 79.9,
    image: "/placeholder.svg?key=wish2",
    inStock: false,
  },
]

export function UserAccount() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(userData)

  // Busca usuário autenticado do Firebase Auth
  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Você pode buscar mais dados do Firestore aqui se quiser
        setUser({
          name: firebaseUser.displayName || userData.name,
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          userType: "cliente", // ajuste se salvar tipo no Firestore
        })
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleSaveProfile = () => {
    // Em um app real, salvaria no servidor
    setIsEditing(false)
    alert("Perfil atualizado com sucesso!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800"
      case "Em trânsito":
        return "bg-blue-100 text-blue-800"
      case "Processando":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="container px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Acesso necessário</h1>
            <p className="text-muted-foreground">Faça login para acessar sua conta</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button>Fazer Login</Button>
            </Link>
            <Link href="/cadastro">
              <Button variant="outline">Criar Conta</Button>
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
        <span className="text-foreground">Minha Conta</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Minha Conta</h1>
          <p className="text-muted-foreground">Olá, {user.name}!</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="wishlist">Favoritos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{userOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Pedidos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{wishlistItems.length}</p>
                    <p className="text-sm text-muted-foreground">Favoritos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{userAddresses.length}</p>
                    <p className="text-sm text-muted-foreground">Endereços</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Settings className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Conta</p>
                    <p className="text-sm text-muted-foreground">Ativa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pedidos Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Pedido #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <p className="text-sm font-medium">R$ {order.total.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Todos os Pedidos
                </Button>
              </div>
            </CardContent>
          </Card>
        {/* Configurações da Conta */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Trocar tipo de conta */}
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Conta</Label>
              <select
                id="userType"
                className="w-full border rounded px-3 py-2"
                value={user?.userType || "cliente"}
                onChange={async (e) => {
                  const novoTipo = e.target.value;
                  if (novoTipo === "adm" && user?.userType !== "adm") {
                    const senha = window.prompt("Digite a senha de administrador:");
                    if (senha !== "c4s409botina") {
                      alert("Senha de administrador incorreta!");
                      return;
                    }
                  }
                  // Aqui você atualizaria o tipo de conta no backend/Firebase
                  setUser({ ...user, userType: novoTipo });
                  alert("Tipo de conta atualizado para " + novoTipo);
                }}
              >
                <option value="cliente">Cliente</option>
                <option value="adm">Administrador</option>
              </select>
              <p className="text-xs text-muted-foreground">Para se tornar administrador é necessário a senha.</p>
            </div>

            {/* Excluir conta */}
            <div className="space-y-2">
              <Label>Excluir Conta</Label>
              <Button
                variant="destructive"
                className="w-full"
                onClick={async () => {
                  if (window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
                    try {
                      const { getAuth, deleteUser } = await import("firebase/auth");
                      const auth = getAuth();
                      const user = auth.currentUser;
                      if (user) {
                        await deleteUser(user);
                        alert("Conta excluída com sucesso.");
                        window.location.href = "/";
                      } else {
                        alert("É necessário estar logado para excluir a conta.");
                      }
                    } catch (err: any) {
                      alert("Erro ao excluir conta: " + (err.message || err.code));
                    }
                  }
                }}
              >
                Excluir minha conta
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Esta ação é irreversível. Disponível para clientes e administradores.</p>
            </div>
          </CardContent>
        </Card>
        </TabsContent>

        {/* Pedidos */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <div>
                        <h3 className="font-medium">Pedido #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">Realizado em {order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <p className="text-sm font-medium mt-1">Total: R$ {order.total.toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {order.status === "Entregue" && (
                        <Button variant="outline" size="sm">
                          Avaliar Produtos
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Endereços */}
        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Meus Endereços</CardTitle>
                <Button>Adicionar Endereço</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAddresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.isDefault && <Badge variant="secondary">Padrão</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{address.street}</p>
                      <p>
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <p>CEP: {address.cep}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm">
                          Definir como Padrão
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lista de Desejos */}
        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Você ainda não tem produtos favoritos</p>
                  <Link href="/produtos">
                    <Button className="mt-4">Explorar Produtos</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
                          <p className="text-lg font-bold text-primary">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" disabled={!item.inStock}>
                              {item.inStock ? "Adicionar ao Carrinho" : "Esgotado"}
                            </Button>
                            <Button variant="outline" size="sm">
                              Remover
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perfil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Meus Dados</CardTitle>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" value={editData.cpf} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  value={editData.birthDate}
                  onChange={(e) => setEditData({ ...editData, birthDate: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>Salvar Alterações</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" placeholder="Digite sua senha atual" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" type="password" placeholder="Digite a nova senha" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                <Input id="confirmNewPassword" type="password" placeholder="Confirme a nova senha" />
              </div>
              <Button>Alterar Senha</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
