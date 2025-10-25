import { Card } from "@/components/ui/card";
import { Play, TrendingUp, Target } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      icon: Play,
      year: "2015-2017",
      title: "Los Inicios",
      description: "Todo comenzó con una simple barra en el parque. Sin equipamiento, sin experiencia previa, solo la determinación de mejorar. Comencé practicando ejercicios básicos de forma autodidacta, investigando técnicas y aprendiendo de la comunidad online. Cada pequeño progreso me motivaba a seguir adelante.",
      color: "primary"
    },
    {
      icon: TrendingUp,
      year: "2018-2020",
      title: "La Transformación",
      description: "Decidí profesionalizarme y obtuve mi certificación en Entrenamiento Funcional, seguida de una especialización en Calistenia Avanzada. Comencé a entrenar a mis primeros estudiantes, desarrollando una metodología propia basada en progresión adaptativa. Esta etapa me enseñó que cada persona es única y requiere un enfoque personalizado.",
      color: "primary"
    },
    {
      icon: Target,
      year: "2021-Presente",
      title: "Calistenia Online Hoy",
      description: "La evolución natural fue crear Calistenia Online, una plataforma completa para llevar mi metodología a cualquier persona del mundo. Hoy lidero una comunidad de más de 100 estudiantes, ofrezco programas estructurados y continúo formándome para ofrecer el mejor servicio. Mi objetivo: democratizar el acceso a entrenamiento profesional de calistenia.",
      color: "primary"
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />
      
      <div className="space-y-12">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index}
              className={`relative flex items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col md:gap-8`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-elegant transform md:-translate-x-1/2 z-10">
                <Icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Spacer for mobile */}
              <div className="w-full h-16 md:hidden" />
              
              {/* Content card */}
              <Card 
                className={`w-full md:w-[calc(50%-4rem)] bg-gradient-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 p-6 ml-24 md:ml-0 ${
                  isEven ? 'md:mr-auto' : 'md:ml-auto'
                }`}
              >
                <div className="mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    {event.year}
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-2xl mb-3 text-foreground">
                  {event.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </Card>
              
              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-[calc(50%-4rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${className}`}>
      {children}
    </span>
  );
};

export default Timeline;
