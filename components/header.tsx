"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminDropdown } from "@/components/admin-dropdown"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"

export function Header() {
  const [cartItems, setCartItems] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">CB</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-primary">Casa da Botina</h1>
            <p className="text-xs text-muted-foreground">Vargem Grande do Sul, SP</p>
          </div>
        </Link>

        {/* Navigation Desktop */}
  <nav className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="font-medium  ">
              <Button variant="ghost" >
                Botas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/produtos/botas-masculinas">Botas Masculinas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/produtos/botas-femininas">Botas Femininas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/produtos/botas-infantis">Botas Infantis</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="font-medium">
            <Button variant="ghost" className="font-medium">
                Acessórios
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/produtos/chapeus">Chapéus</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/produtos/bones">Bonés</Link>
              </DropdownMenuItem>
            
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/sobre">
            <Button variant="ghost" className="font-medium">
              Sobre
            </Button>
          </Link>

          <Link href="/contato">
            <Button variant="ghost" className="font-medium">
              Contato
            </Button>
          </Link>
          <AdminDropdown />
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar produtos..." className="pl-10 pr-4" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>

          {/* User Account */}
          <DropdownMenu>
            
            <DropdownMenuTrigger className="font-medium">
            <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Entrar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cadastro">Cadastrar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/minha-conta">Minha Conta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pedidos">Meus Pedidos</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{cartItems}</Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/produtos/botas-masculinas" className="text-lg font-medium">
                  Botas Masculinas
                </Link>
                <Link href="/produtos/botas-femininas" className="text-lg font-medium">
                  Botas Femininas
                </Link>
                <Link href="/produtos/botas-infantis" className="text-lg font-medium">
                  Botas Infantis
                </Link>
                <Link href="/produtos/chapeus" className="text-lg font-medium">
                  Chapéus
                </Link>
                <Link href="/produtos/cintos" className="text-lg font-medium">
                  Cintos
                </Link>
                <Link href="/produtos/carteiras" className="text-lg font-medium">
                  Carteiras
                </Link>
                <Link href="/produtos/bolsas" className="text-lg font-medium">
                  Bolsas
                </Link>
                <Link href="/produtos/fivelas" className="text-lg font-medium">
                  Fivelas
                </Link>
                <Link href="/sobre" className="text-lg font-medium">
                  Sobre
                </Link>
                <Link href="/contato" className="text-lg font-medium">
                  Contato
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
