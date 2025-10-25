import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Clock } from "lucide-react";
const AboutSection = () => {
  const achievements = ["Certificado en Entrenamiento Funcional", "Más de 5 años de experiencia", "500+ estudiantes transformados", "Especialista en Calistenia Avanzada"];
  const stats = [{
    icon: Users,
    value: "100+",
    label: "Estudiantes"
  }, {
    icon: Award,
    value: "15+",
    label: "Programas"
  }, {
    icon: Clock,
    value: "5+",
    label: "Años Experiencia"
  }];
  return <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Nicolás Reyero</p>
                  <p className="text-sm">Entrenador Personal</p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4 text-primary border-primary/20">
                Entrenador Certificado
              </Badge>
              <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
                CONOCE A
                <span className="text-primary"> NICOLÁS REYERO</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                La evolución de mi marca personal hacia <strong>Calistenia Online</strong> representa 
                un compromiso más profundo con transformar vidas a través del entrenamiento funcional. 
                Mi misión es democratizar el acceso a entrenamientos de calidad profesional.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Desde hace más de 5 años, he ayudado a cientos de personas a alcanzar sus objetivos 
                fitness utilizando únicamente el peso corporal. Mi metodología combina técnicas 
                tradicionales de calistenia con enfoques modernos de entrenamiento funcional.
              </p>
            </div>

            {/* Achievements */}
            

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {stats.map((stat, index) => {
              const Icon = stat.icon;
              return <div key={index} className="text-center">
                    
                    <p className="font-bold text-2xl text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>;
            })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-elegant transition-all duration-300" onClick={() => window.location.href = '/quien-soy'}>
                Conocer Más Sobre Mí
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/quien-soy#certificaciones'}>
                Ver Certificaciones
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;