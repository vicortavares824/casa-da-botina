import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, Award, Heart } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Nossa História
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tradição e qualidade que atravessam gerações.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-1 lg:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <p className="text-lg leading-relaxed">
            Fundada em 1985 na pequena cidade de Vargem Grande do Sul, SP, a <strong>Casa da Botina</strong> nasceu de uma paixão familiar pelo universo country e pela arte da sapataria. O que começou como uma modesta oficina de consertos, rapidamente se transformou em um ponto de referência para todos que buscavam produtos de couro autênticos e de alta qualidade.
          </p>
          <p className="text-lg leading-relaxed">
            Nossas botas, cintos e acessórios são mais do que simples itens de vestuário; são peças que carregam a herança do campo, a robustez do trabalho e a elegância do estilo country. Cada produto é cuidadosamente selecionado, priorizando o conforto, a durabilidade e o design que só a verdadeira tradição pode oferecer.
          </p>
          <p className="text-lg leading-relaxed">
            Hoje, com mais de três décadas de história, continuamos a honrar nossos valores, oferecendo não apenas produtos, mas uma experiência completa para os amantes da cultura sertaneja.
          </p>
        </div>
       
      </div>

      <Separator className="my-16" />

      <section className="text-center">
        <h2 className="text-3xl font-bold text-primary">Nossos Valores</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Qualidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compromisso com a excelência em cada detalhe, dos materiais ao acabamento.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Tradição</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Honramos a cultura e o estilo de vida country que nos inspiram desde o início.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Paixão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Amamos o que fazemos e compartilhamos essa paixão com nossos clientes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Raízes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Orgulho de nossas origens em Vargem Grande do Sul, SP e da nossa comunidade.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
