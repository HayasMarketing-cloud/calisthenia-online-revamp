import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Dumbbell, FileText, BarChart3, Image, ClipboardList, UserPlus, Video, Smartphone } from 'lucide-react';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Phase = 'Fase 0' | 'Fase 1' | 'Fase 2' | 'Fase 3' | 'Estable';
type Status = 'live' | 'in-progress' | 'pending';

const phaseStyles: Record<Phase, string> = {
  'Fase 0': 'bg-muted text-muted-foreground border-muted',
  'Fase 1': 'bg-primary/10 text-primary border-primary/30',
  'Fase 2': 'bg-accent/20 text-accent-foreground border-accent/40',
  'Fase 3': 'bg-secondary text-secondary-foreground border-secondary',
  'Estable': 'bg-muted text-muted-foreground border-muted',
};

const statusStyles: Record<Status, string> = {
  live: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30',
  'in-progress': 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
  pending: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30',
};

const statusLabel: Record<Status, string> = {
  live: 'Activo',
  'in-progress': 'En curso',
  pending: 'Pendiente',
};

const adminSections: Array<{
  title: string; description: string; icon: typeof Users; path: string;
  phase: Phase; status: Status;
}> = [
  {
    title: 'Panel de Coach',
    description: 'Lista de alumnos, KPIs de engagement, alertas y detalle por alumno',
    icon: Users,
    path: '/admin/coach/',
    phase: 'Fase 1',
    status: 'in-progress',
  },
  {
    title: 'Onboarding alumnos',
    description: 'Datos recibidos del formulario inicial y gestión del cuestionario',
    icon: ClipboardList,
    path: '/admin/onboarding/',
    phase: 'Fase 1',
    status: 'live',
  },
  {
    title: 'Vista alumno (app)',
    description: 'Abre la pantalla de inicio del área privada del alumno',
    icon: Smartphone,
    path: '/app/dashboard',
    phase: 'Fase 1',
    status: 'live',
  },
  {
    title: 'Ejercicios',
    description: 'Alta, edición y baja de ejercicios con vídeos',
    icon: Dumbbell,
    path: '/admin/exercises/',
    phase: 'Fase 0',
    status: 'live',
  },
  {
    title: 'Plantillas de programa',
    description: 'Crea y edita plantillas con semanas, días y ejercicios. Versionado y overrides',
    icon: ClipboardList,
    path: '/admin/programs/',
    phase: 'Fase 2',
    status: 'in-progress',
  },
  {
    title: 'Blog',
    description: 'Gestiona artículos del blog',
    icon: FileText,
    path: '/admin/blog/',
    phase: 'Estable',
    status: 'live',
  },
  {
    title: 'SEO Dashboard',
    description: 'Analiza y optimiza el SEO de las páginas',
    icon: BarChart3,
    path: '/admin/seo-dashboard/',
    phase: 'Estable',
    status: 'live',
  },
  {
    title: 'Media Library',
    description: 'Gestiona imágenes y archivos multimedia',
    icon: Image,
    path: '/admin/media-library/',
    phase: 'Estable',
    status: 'live',
  },
  {
    title: 'Leads',
    description: 'Consulta y exporta los leads capturados',
    icon: UserPlus,
    path: '/admin/leads/',
    phase: 'Estable',
    status: 'live',
  },
  {
    title: 'Biblioteca de vídeos',
    description: 'Catálogo del canal y páginas donde se usa cada vídeo',
    icon: Video,
    path: '/admin/videos/',
    phase: 'Estable',
    status: 'live',
  },
];

const AdminHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-sm text-muted-foreground">Gestiona tu plataforma de calistenia</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map(section => {
            const Icon = section.icon;
            return (
              <Link key={section.path} to={section.path}>
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-2">
                      <Icon className="h-8 w-8 text-primary" />
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${phaseStyles[section.phase]}`}>
                          {section.phase}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusStyles[section.status]}`}>
                          {statusLabel[section.status]}
                        </Badge>
                      </div>
                    </div>
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
