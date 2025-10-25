import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users } from "lucide-react";
const PersonalHero = () => {
  return <section className="py-32 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="h-32 w-32 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">Nicolás Reyero</p>
                  <p className="text-base mt-2">Entrenador Personal de Calistenia</p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-elegant">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="font-bold text-sm text-center">Certificado</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 order-1 lg:order-2">
            <Badge variant="secondary" className="mb-2 text-primary border-primary/20">
              Entrenador Certificado
            </Badge>
            
            <h1 className="font-display font-bold text-4xl lg:text-5xl leading-tight">
              Mi Historia: De Principiante a 
              <span className="text-primary"> Entrenador</span>
            </h1>
            
            <p className="text-xl text-primary font-semibold">Un 0,1% mejor cada día</p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mi camino en la calistenia comenzó como el de muchos: buscando una forma de entrenar 
              efectiva, accesible y que pudiera hacer en cualquier lugar. Lo que empezó como un 
              simple interés se transformó en una pasión que cambió mi vida por completo.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Hoy, más de 5 años después, he dedicado mi carrera a ayudar a otras personas a 
              descubrir el poder transformador del entrenamiento con peso corporal. Cada día trabajo 
              para hacer que la calistenia de calidad profesional sea accesible para todos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-elegant transition-all duration-300 min-h-[44px]" onClick={() => window.location.href = '/#entrenamientos'}>
                Conocer Mis Programas
              </Button>
              <Button variant="outline" size="lg" className="min-h-[44px]" onClick={() => window.location.href = 'mailto:info@calisthenia.online'}>
                Contactar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PersonalHero;