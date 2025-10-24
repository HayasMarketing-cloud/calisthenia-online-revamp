import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/f3b95d09-dfd8-4644-9fcb-11a257a02133.png" 
            alt="Calistenia Online" 
            className="h-8 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
            Inicio
          </a>
          <a href="#entrenamientos" className="text-foreground hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
            Entrenamientos
          </a>
          <a href="#programas" className="text-foreground hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
            Programas
          </a>
          <a href="/quien-soy" className="text-foreground hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
            Sobre Mí
          </a>
          <Button variant="default" className="bg-gradient-primary hover:shadow-elegant transition-all duration-300">
            Empezar Ahora
          </Button>
        </nav>

        <Button variant="outline" size="sm" className="md:hidden">
          Menú
        </Button>
      </div>
    </header>
  );
};

export default Header;