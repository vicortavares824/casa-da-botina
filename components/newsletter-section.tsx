import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function NewsletterSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Fique por Dentro das Novidades</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Receba ofertas exclusivas, lançamentos e dicas sobre o mundo country diretamente no seu e-mail.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Ofertas exclusivas para assinantes</li>
                  <li>✓ Novidades em primeira mão</li>
                  <li>✓ Dicas de cuidados com couro</li>
                  <li>✓ Sem spam, apenas conteúdo relevante</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Input type="email" placeholder="Digite seu melhor e-mail" className="h-12" />
                  <Button className="w-full h-12" size="lg">
                    Quero Receber Novidades
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Ao se inscrever, você concorda com nossa política de privacidade. Você pode cancelar a inscrição a
                  qualquer momento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
