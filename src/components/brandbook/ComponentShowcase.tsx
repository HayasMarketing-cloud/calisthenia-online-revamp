import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  User, 
  Settings, 
  Search, 
  Bell, 
  Mail, 
  Heart, 
  Star,
  Plus,
  Menu,
  ChevronRight,
  Play,
  Check,
  X,
  AlertCircle
} from "lucide-react";

export const ComponentShowcase = () => {
  return (
    <div className="space-y-12">
      {/* Buttons Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Botones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="font-bold mb-4">Primary</h4>
            <div className="space-y-3">
              <Button className="w-full">Botón Primary</Button>
              <Button className="w-full" disabled>Deshabilitado</Button>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                variant="default"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Secondary</h4>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">Botón Secondary</Button>
              <Button variant="secondary" className="w-full" disabled>Deshabilitado</Button>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                variant="secondary"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Outline</h4>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Botón Outline</Button>
              <Button variant="outline" className="w-full" disabled>Deshabilitado</Button>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                variant="outline"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Ghost</h4>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full">Botón Ghost</Button>
              <Button variant="ghost" className="w-full" disabled>Deshabilitado</Button>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                variant="ghost"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Destructive</h4>
            <div className="space-y-3">
              <Button variant="destructive" className="w-full">Eliminar</Button>
              <Button variant="destructive" className="w-full" disabled>Deshabilitado</Button>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                variant="destructive"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Con Icono</h4>
            <div className="space-y-3">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo
              </Button>
              <Button variant="outline" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                {`<Icon className="mr-2 h-4 w-4" />`}
              </code>
            </div>
          </Card>
        </div>
      </div>

      {/* Cards Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-bold mb-2">Card Básica</h4>
            <p className="text-muted-foreground mb-4">
              Contenedor estándar con padding y sombra sutil
            </p>
            <code className="text-xs bg-muted px-2 py-1 rounded block">
              {`<Card className="p-6">...</Card>`}
            </code>
          </Card>

          <Card className="p-6 shadow-elegant">
            <h4 className="font-bold mb-2">Card con Sombra Elegante</h4>
            <p className="text-muted-foreground mb-4">
              Card con sombra personalizada del design system
            </p>
            <code className="text-xs bg-muted px-2 py-1 rounded block">
              {`<Card className="shadow-elegant">...</Card>`}
            </code>
          </Card>
        </div>
      </div>

      {/* Inputs Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Inputs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-bold mb-4">Input Estándar</h4>
            <Input placeholder="Escribe aquí..." className="mb-4" />
            <code className="text-xs bg-muted px-2 py-1 rounded block">
              {`<Input placeholder="..." />`}
            </code>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Input con Icono</h4>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-10" />
            </div>
            <code className="text-xs bg-muted px-2 py-1 rounded block">
              {`<Input className="pl-10" />`}
            </code>
          </Card>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="font-bold mb-4">Default</h4>
            <div className="space-y-3">
              <Badge>Badge Default</Badge>
              <code className="text-xs bg-muted px-2 py-1 rounded block mt-4">
                variant="default"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Secondary</h4>
            <div className="space-y-3">
              <Badge variant="secondary">Badge Secondary</Badge>
              <code className="text-xs bg-muted px-2 py-1 rounded block mt-4">
                variant="secondary"
              </code>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-bold mb-4">Outline</h4>
            <div className="space-y-3">
              <Badge variant="outline">Badge Outline</Badge>
              <code className="text-xs bg-muted px-2 py-1 rounded block mt-4">
                variant="outline"
              </code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
