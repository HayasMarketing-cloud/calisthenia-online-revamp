import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Martínez",
    level: "Intermedio",
    initials: "CM",
    text: "En 3 meses logré hacer mi primera muscle-up. Los programas de Nicolás son increíbles y muy bien estructurados.",
    rating: 5
  },
  {
    name: "Ana Torres",
    level: "Principiante",
    initials: "AT",
    text: "Nunca pensé que podría entrenar sin ir al gimnasio. Ahora entreno desde casa y me siento más fuerte que nunca.",
    rating: 5
  },
  {
    name: "Miguel Ángel",
    level: "Avanzado",
    initials: "MA",
    text: "La progresión es perfecta. Cada semana siento que avanzo y los resultados son visibles. 100% recomendado.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            LO QUE DICEN
            <span className="text-primary"> NUESTROS ESTUDIANTES</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Historias reales de personas que transformaron su vida con Calistenia Online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-14 w-14 bg-gradient-primary">
                    <AvatarFallback className="bg-transparent text-white font-bold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-display font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.level}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
