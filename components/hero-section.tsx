import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 lg:py-32">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Tradição desde 2004
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Autênticas Botas <span className="text-primary">Country</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Descubra a verdadeira essência do estilo sertanejo com nossas botas artesanais e acessórios de couro
                legítimo. Qualidade que você sente a cada passo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/produtos">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver Produtos
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Nossa História
                </Button>
              </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Anos de Tradição</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Couro Legítimo</div>
              </div>
            </div>
          </div>

          {/* Imagem Hero */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
              <img
                src="/placeholder-bnuw0.png"
                alt="Botas Country Artesanais Casa da Botina"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge flutuante */}
            <div className="absolute top-4 right-4 bg-background/95 backdrop-blur rounded-lg p-3 shadow-lg">
              <div className="text-sm font-medium">Frete Grátis</div>
              <div className="text-xs text-muted-foreground">Acima de R$ 299</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
