import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Dumbbell, Users } from "lucide-react";
import { COMMUNITY_CONFIG } from "@/config/community";

const iconMap = {
  BookOpen,
  Target,
  Dumbbell,
  Users
};

const CommunityCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {COMMUNITY_CONFIG.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {COMMUNITY_CONFIG.description}
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {COMMUNITY_CONFIG.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA principal */}
        <div className="text-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
            onClick={() => window.location.href = COMMUNITY_CONFIG.chatbotUrl}
          >
            <Users className="mr-2 h-5 w-5" />
            {COMMUNITY_CONFIG.buttonText}
          </Button>
          
          {/* Prueba social */}
          <p className="text-sm text-gray-600 mt-4">
            Más de <span className="font-bold text-primary">1,000 personas</span> ya son parte de la comunidad
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunityCTA;
