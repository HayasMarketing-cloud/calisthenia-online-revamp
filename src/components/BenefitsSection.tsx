import { NoEquipmentIcon, LevelAdaptIcon, MethodologyIcon, CommunityIcon } from "@/components/icons/calisthenia";

const benefits = [
  {
    Icon: NoEquipmentIcon,
    title: "Sin Equipos, Sin Excusas",
    description: "Solo tu peso corporal. Entrena en casa, parque o donde quieras"
  },
  {
    Icon: LevelAdaptIcon,
    title: "Adaptado a Tu Nivel",
    description: "Desde cero hasta skills avanzados. Progresión garantizada"
  },
  {
    Icon: MethodologyIcon,
    title: "Metodología Probada",
    description: "Certificado FESWC. Más de 10 años de experiencia"
  },
  {
    Icon: CommunityIcon,
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
            const Icon = benefit.Icon;
            return (
              <div
                key={index}
                className="group text-center space-y-4 p-6 rounded-xl hover:bg-background transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary/15 transition-all">
                  <Icon className="w-10 h-10" />
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
