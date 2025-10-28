import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import feswcSeal from "@/assets/feswc-certification-seal.png";

const Certifications = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-elegant">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Icon/Visual */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-12">
            <div className="text-center">
              <img 
                src={feswcSeal} 
                alt="FESWC - Certificación Oficial - Federación Española de Street Workout y Calistenia" 
                className="w-48 h-48 mx-auto mb-4 object-contain"
              />
              <Badge className="bg-primary text-white hover:bg-accent">
                Certificación Oficial
              </Badge>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="p-8 flex flex-col justify-center bg-white">
            <h3 className="font-display font-bold text-2xl mb-4 text-foreground">
              Certificado por la FESWC
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Federación Española de Street Workout y Calistenia
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Formación oficial homologada
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Especialista en calistenia y street workout
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Reconocimiento a nivel nacional
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Certifications;
