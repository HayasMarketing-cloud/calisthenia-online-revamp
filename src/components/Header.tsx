import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl">
              <span className="text-primary">CALISTENIA</span>
              <span className="text-secondary"> ONLINE</span>
            </h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
            Inicio
          </a>
          <a href="#entrenamientos" className="text-foreground hover:text-primary transition-colors font-medium">
            Entrenamientos
          </a>
          <a href="#programas" className="text-foreground hover:text-primary transition-colors font-medium">
            Programas
          </a>
          <a href="#sobre-mi" className="text-foreground hover:text-primary transition-colors font-medium">
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