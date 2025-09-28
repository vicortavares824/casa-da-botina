import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="w-full px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-bold text-primary-foreground">CB</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">Casa da Botina</h3>
                <p className="text-xs text-muted-foreground">Vargem Grande do Sul, SP</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Tradição e qualidade em botas country e acessórios sertanejos. Há mais de 20 anos vestindo o Brasil com
              autenticidade.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Produtos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Produtos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produtos/botas-masculinas" className="text-muted-foreground hover:text-foreground">
                  Botas Masculinas
                </Link>
              </li>
              <li>
                <Link href="/produtos/botas-femininas" className="text-muted-foreground hover:text-foreground">
                  Botas Femininas
                </Link>
              </li>
              <li>
                <Link href="/produtos/botas-infantis" className="text-muted-foreground hover:text-foreground">
                  Botas Infantis
                </Link>
              </li>
              <li>
                <Link href="/produtos/chapeus" className="text-muted-foreground hover:text-foreground">
                  Chapéus
                </Link>
              </li>
              <li>
                <Link href="/produtos/cintos" className="text-muted-foreground hover:text-foreground">
                  Cintos
                </Link>
              </li>
              <li>
                <Link href="/produtos/acessorios" className="text-muted-foreground hover:text-foreground">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-foreground">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-muted-foreground hover:text-foreground">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/entrega" className="text-muted-foreground hover:text-foreground">
                  Entrega
                </Link>
              </li>
              <li>
                <Link href="/guia-tamanhos" className="text-muted-foreground hover:text-foreground">
                  Guia de Tamanhos
                </Link>
              </li>
              <li>
                <Link href="/perguntas-frequentes" className="text-muted-foreground hover:text-foreground">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato e Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contato</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Vargem Grande do Sul, SP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(19) 3641-5066</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@casadabotina.com.br</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium">Newsletter</h5>
              <p className="text-xs text-muted-foreground">Receba ofertas exclusivas e novidades</p>
              <div className="flex space-x-2">
                <Input placeholder="Seu e-mail" className="flex-1" />
                <Button size="sm">Inscrever</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Casa da Botina São Francisco. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-foreground">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
