import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Dumbbell, User, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PWAUpdatePrompt from './PWAUpdatePrompt';
import InstallPWAPrompt from './InstallPWAPrompt';

const navItems = [
  { to: '/app/dashboard', icon: Home, label: 'Inicio' },
  { to: '/app/training', icon: Dumbbell, label: 'Entreno' },
  { to: '/app/progress', icon: BarChart3, label: 'Progreso' },
  { to: '/app/profile', icon: User, label: 'Perfil' },
];

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PWAUpdatePrompt />
      <InstallPWAPrompt />
      {/* Main content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom navigation - mobile first */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[64px]',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
