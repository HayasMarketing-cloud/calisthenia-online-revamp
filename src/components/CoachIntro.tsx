import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import nicolasImage from "@/assets/nicolas-reyero.jpg";

const CoachIntro = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-12">
            Conoce a <span className="text-primary">Tu Entrenador</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Imagen de Nico - tamaño moderado */}
            <div className="relative max-w-md mx-auto">
              <img 
                src={nicolasImage}
                alt="Nicolás Reyero - Entrenador Certificado de Calistenia"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-xl shadow-lg">
                <p className="font-bold text-xl">+10 años</p>
                <p className="text-xs">Experiencia</p>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary text-base px-3 py-1">
                Certificado FESWC
              </Badge>
              
              <h3 className="font-display font-bold text-2xl lg:text-3xl">
                Soy Nico, y estoy aquí para <span className="text-primary">ayudarte</span>
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-lg">
                Llevo más de 10 años especializándome en calistenia y entrenamiento funcional.
                He ayudado a más de 500 personas a transformar su cuerpo sin necesidad de gimnasios caros.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Mi objetivo es simple: democratizar el fitness y demostrar que con la metodología correcta,
                constancia y tu propio peso corporal, puedes lograr resultados increíbles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg">
                  <Link to="/quien-soy/">
                    Conoce Mi Historia
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/programas/">Ver Programas</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachIntro;
