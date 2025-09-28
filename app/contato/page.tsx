
import { Phone, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Contato
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Entre em Contato
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Produtos de qualidade pelo melhor preço da região, o melhor atendimento e formas facilitadas de pagamento!
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Phone className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Telefone e Whatsapp</h3>
                  <a href="https://wa.me/551936415066" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                    (19) 3641-5066
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Rua Dr. Teofilo Ribeiro de Andrade, 184, centro de Vargem Grande do Sul
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Instagram className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <a href="https://www.instagram.com/casadabotinavargem/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                    @casadabotinavargem
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.063131982134!2d-46.89283808888992!3d-21.8173730799406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8455a5333523b%3A0x8de34b742505133!2sR.%20Dr.%20Te%C3%B3filo%20Ribeiro%20de%20Andrade%2C%20184%20-%20Centro%2C%20Vargem%20Grande%20do%20Sul%20-%20SP%2C%2013880-000!5e0!3m2!1spt-BR!2sbr!4v1727459652345!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
