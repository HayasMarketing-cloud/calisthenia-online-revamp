import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import iconBrazos from "@/assets/calisthenia-brazos.webp";
import iconEspalda from "@/assets/calisthenia-espalda.webp";
import iconAbdomen from "@/assets/calisthenia-abdomen.webp";
import iconPiernas from "@/assets/calisthenia-piernas.webp";
import iconPecho from "@/assets/calisthenia-pecho.webp";
import iconHombro from "@/assets/calisthenia-hombro.webp";
import iconFullBody from "@/assets/calisthenia-full-body.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routines = [
    { name: "Brazos", path: "/rutina-brazos-calistenia", icon: iconBrazos },
    { name: "Espalda", path: "/rutina-espalda-calistenia", icon: iconEspalda },
    { name: "Abdomen", path: "/rutina-abdominales-calistenia", icon: iconAbdomen },
    { name: "Piernas", path: "/rutina-piernas-calistenia", icon: iconPiernas },
    { name: "Pecho", path: "/rutina-pecho-calistenia", icon: iconPecho },
    { name: "Hombro", path: "/rutina-hombro-calistenia", icon: iconHombro },
    { name: "Full Body", path: "/rutina-full-body", icon: iconFullBody },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/f3b95d09-dfd8-4644-9fcb-11a257a02133.png" 
            alt="Calistenia Online" 
            className="h-16 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Inicio */}
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Inicio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Rutinas con Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Rutinas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-popover">
                  {routines.map((routine) => (
                    <li key={routine.path}>
                      <Link to={routine.path}>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <img src={routine.icon} alt={routine.name} className="w-6 h-6 object-contain" />
                            {routine.name}
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Programas */}
            <NavigationMenuItem>
              <Link to="/programas">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Programas
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Quién Soy */}
            <NavigationMenuItem>
              <Link to="/quien-soy">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Quién Soy
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button 
          variant="default" 
          className="hidden md:flex bg-gradient-primary hover:shadow-elegant transition-all duration-300"
        >
          Empezar Ahora
        </Button>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                Inicio
              </Link>
              
              <div>
                <p className="text-lg font-medium mb-2">Rutinas</p>
                <div className="flex flex-col gap-2 ml-4">
                  {routines.map((routine) => (
                    <Link 
                      key={routine.path}
                      to={routine.path} 
                      onClick={() => setIsOpen(false)}
                      className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <img src={routine.icon} alt={routine.name} className="w-6 h-6 object-contain" />
                      {routine.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/programas" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                Programas
              </Link>
              
              <Link to="/quien-soy" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                Quién Soy
              </Link>

              <Button className="mt-4 bg-gradient-primary">
                Empezar Ahora
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;