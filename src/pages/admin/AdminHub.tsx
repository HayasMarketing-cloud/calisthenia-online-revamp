import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Dumbbell, FileText, BarChart3, Image } from 'lucide-react';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const adminSections = [
  {
    title: 'Panel de Coach',
    description: 'Lista de alumnos, asignar programas y ver detalle',
    icon: Users,
    path: '/admin/coach/',
  },
  {
    title: 'Ejercicios',
    description: 'Alta, edición y baja de ejercicios con vídeos',
    icon: Dumbbell,
    path: '/admin/exercises/',
  },
  {
    title: 'Blog',
    description: 'Gestiona artículos del blog',
    icon: FileText,
    path: '/admin/blog/',
  },
  {
    title: 'SEO Dashboard',
    description: 'Analiza y optimiza el SEO de las páginas',
    icon: BarChart3,
    path: '/admin/seo-dashboard/',
  },
  {
    title: 'Media Library',
    description: 'Gestiona imágenes y archivos multimedia',
    icon: Image,
    path: '/admin/media-library/',
  },
];

const AdminHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Panel de Administración</h1>
            <p className="text-sm text-muted-foreground">Gestiona tu plataforma de calistenia</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map(section => {
            const Icon = section.icon;
            return (
              <Link key={section.path} to={section.path}>
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <CardHeader className="pb-2">
                    <Icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardDescription className="text-xs">{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHub;
