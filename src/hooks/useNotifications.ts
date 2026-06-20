import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type NotificationType = 'technique_review' | 'weekly_review' | 'milestone';
export type NotificationPriority = 'high' | 'medium' | 'low';
export type NotificationActionRoute = 'today_session' | 'log_weight' | 'view_reviews';

export interface NotificationRow {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string | null;
  action_route: NotificationActionRoute | null;
  action_payload: Record<string, unknown> | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function useNotifications() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const enabled = !!user;

  const query = useQuery({
    queryKey: ['notifications', user?.id],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select(
          'id, type, priority, title, body, action_route, action_payload, is_read, read_at, created_at'
        )
        .eq('client_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      const cutoff = Date.now() - THIRTY_DAYS_MS;
      // Ocultar leídas con read_at > 30 días (regla simple, sin sistema de archivado)
      return (data || []).filter((n) => {
        if (!n.is_read || !n.read_at) return true;
        return new Date(n.read_at).getTime() >= cutoff;
      }) as NotificationRow[];
    },
  });

  // Refetch al recuperar foco (sin realtime en la beta)
  useEffect(() => {
    if (!enabled) return;
    const onFocus = () => qc.invalidateQueries({ queryKey: ['notifications', user?.id] });
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [enabled, qc, user?.id]);

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', id)
        .eq('client_id', user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });

  const items = query.data ?? [];
  const unreadCount = items.filter((n) => !n.is_read).length;
  const unreadLabel = unreadCount > 9 ? '9+' : String(unreadCount);

  return {
    items,
    unreadCount,
    unreadLabel,
    isLoading: query.isLoading,
    markRead: (id: string) => markRead.mutate(id),
    refetch: query.refetch,
  };
}
