import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Video,
  ClipboardCheck,
  Trophy,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useNotifications,
  type NotificationRow,
  type NotificationType,
} from '@/hooks/useNotifications';
import { resolveActionRoute } from '@/lib/nudges/routes';

function iconFor(type: NotificationType) {
  switch (type) {
    case 'technique_review':
      return Video;
    case 'weekly_review':
      return ClipboardCheck;
    case 'milestone':
      return Trophy;
  }
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'ahora mismo';
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} d`;
}

export function NotificationsPanel() {
  const navigate = useNavigate();
  const { items, unreadCount, unreadLabel, isLoading, markRead, refetch } = useNotifications();
  const firstItemRef = useRef<HTMLButtonElement | null>(null);

  // Mover foco al primer item al abrir el panel
  useEffect(() => {
    const t = setTimeout(() => firstItemRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [items.length]);

  const handleOpen = (n: NotificationRow) => {
    if (!n.is_read) markRead(n.id);
    if (n.action_route) {
      navigate(resolveActionRoute(n.action_route, n.action_payload));
    }
  };

  return (
    <Popover onOpenChange={(open) => open && refetch()}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Notificaciones, ${unreadCount} sin leer`}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 text-[10px] leading-none flex items-center justify-center"
            >
              {unreadLabel}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Notificaciones</p>
        </div>
        <div
          role="region"
          aria-live="polite"
          aria-label="Lista de notificaciones"
          className="max-h-96 overflow-y-auto divide-y divide-border"
        >
          {isLoading && (
            <div className="p-6 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}
          {!isLoading && items.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No tienes notificaciones.
            </p>
          )}
          {!isLoading &&
            items.map((n, idx) => {
              const Icon = iconFor(n.type);
              return (
                <button
                  key={n.id}
                  ref={idx === 0 ? firstItemRef : undefined}
                  type="button"
                  onClick={() => handleOpen(n)}
                  className={cn(
                    'w-full text-left p-3 flex gap-3 hover:bg-accent transition-colors focus:outline-none focus:bg-accent',
                    !n.is_read && 'bg-primary/5'
                  )}
                >
                  <div
                    className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center shrink-0',
                      !n.is_read ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm leading-tight',
                        !n.is_read ? 'font-semibold text-foreground' : 'text-foreground'
                      )}
                    >
                      {n.title}
                    </p>
                    {n.body && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {n.body}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {relativeTime(n.created_at)}
                    </p>
                  </div>
                  {!n.is_read && (
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2"
                    />
                  )}
                </button>
              );
            })}
        </div>
        {items.some((n) => !n.is_read) && (
          <div className="p-2 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => items.filter((n) => !n.is_read).forEach((n) => markRead(n.id))}
            >
              Marcar todas como leídas
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default NotificationsPanel;
