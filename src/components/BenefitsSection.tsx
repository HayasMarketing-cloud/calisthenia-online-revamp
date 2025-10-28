import { Dumbbell, Target, Trophy, Users2 } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Sin Equipos, Sin Excusas",
    description: "Solo tu peso corporal. Entrena en casa, parque o donde quieras"
  },
  {
    icon: Target,
    title: "Adaptado a Tu Nivel",
    description: "Desde cero hasta skills avanzados. Progresión garantizada"
  },
  {
    icon: Trophy,
    title: "Metodología Probada",
    description: "Certificado FESWC. Más de 10 años de experiencia"
  },
  {
    icon: Users2,
    title: "Comunidad Activa",
    description: "Únete a +500 personas en tu mismo viaje"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center space-y-4 p-6 rounded-xl hover:bg-background transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center shadow-card">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
