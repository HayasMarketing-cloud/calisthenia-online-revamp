import { useState, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdminVideos, useVideoUsage, type AdminVideo, type VideoUsage } from '@/hooks/useAdminVideos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Copy, RefreshCw, Plus, Trash2, ExternalLink, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { formatDuration, formatNumber } from '@/lib/youtubeUtils';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

type Source = 'channel' | 'exercise_library';

const AdminVideoLibrary = () => {
  const [tab, setTab] = useState<Source>('channel');
  const [search, setSearch] = useState('');
  const [onlyOrphans, setOnlyOrphans] = useState(false);
  const [pageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [exerciseIdsText, setExerciseIdsText] = useState('');
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [editUsage, setEditUsage] = useState<AdminVideo | null>(null);

  const qc = useQueryClient();
  const { data: videos = [], isLoading } = useAdminVideos(tab);
  const { data: usage = [] } = useVideoUsage();

  const usageByVideo = useMemo(() => {
    const map = new Map<string, VideoUsage[]>();
    for (const u of usage) {
      if (!map.has(u.video_id)) map.set(u.video_id, []);
      map.get(u.video_id)!.push(u);
    }
    return map;
  }, [usage]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return videos.filter((v) => {
      if (q && !v.title.toLowerCase().includes(q) && !v.video_id.toLowerCase().includes(q)) return false;
      if (onlyOrphans && (usageByVideo.get(v.video_id)?.length ?? 0) > 0) return false;
      return true;
    });
  }, [videos, search, onlyOrphans, usageByVideo]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const lastSync = useMemo(() => {
    if (videos.length === 0) return null;
    return videos.reduce((max, v) => (v.last_synced_at > max ? v.last_synced_at : max), videos[0].last_synced_at);
  }, [videos]);

  const syncMutation = useMutation({
    mutationFn: async (body: any) => {
      const { data, error } = await supabase.functions.invoke('youtube-sync', { body });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['admin-videos'] });
      toast({
        title: 'Sincronización completada',
        description: `Pedidos: ${data.requested} · Insertados: ${data.inserted} · Actualizados: ${data.updated}${data.missing?.length ? ` · No encontrados: ${data.missing.length}` : ''}`,
      });
      if (data.missing?.length) {
        console.warn('IDs no encontrados (privados o eliminados):', data.missing);
      }
    },
    onError: (e: any) => {
      toast({ title: 'Error en la sincronización', description: e.message, variant: 'destructive' });
    },
  });

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: 'ID copiado', description: id });
  };

  const handleSyncExercises = () => {
    const ids = exerciseIdsText
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter((s) => /^[A-Za-z0-9_-]{11}$/.test(s));
    if (ids.length === 0) {
      toast({ title: 'Sin IDs válidos', description: 'Pega al menos un ID de YouTube de 11 caracteres.', variant: 'destructive' });
      return;
    }
    syncMutation.mutate({ mode: 'exercise_ids', ids });
    setExerciseDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Biblioteca de vídeos · Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/">Admin</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Biblioteca de vídeos</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Biblioteca de vídeos</h1>
            <p className="text-sm text-muted-foreground">
              {videos.length} vídeos en {tab === 'channel' ? 'canal público' : 'biblioteca de ejercicios'}
              {lastSync && ` · Última sincronización ${formatDistanceToNow(new Date(lastSync), { addSuffix: true, locale: es })}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => syncMutation.mutate({ mode: 'channel' })}
              disabled={syncMutation.isPending}
              variant={tab === 'channel' ? 'default' : 'outline'}
            >
              {syncMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Sincronizar canal
            </Button>

            <Dialog open={exerciseDialogOpen} onOpenChange={setExerciseDialogOpen}>
              <DialogTrigger asChild>
                <Button variant={tab === 'exercise_library' ? 'default' : 'outline'}>
                  <Plus className="h-4 w-4 mr-2" /> Sincronizar biblioteca
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sincronizar biblioteca de ejercicios</DialogTitle>
                  <DialogDescription>
                    Pega los IDs de YouTube (uno por línea, o separados por comas/espacios). Sirven los 11 caracteres del final de la URL del vídeo. Si alguno es realmente privado y no devuelve datos, te lo reporto.
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  rows={8}
                  placeholder={`v4Zk9iSLdOo\nPS0zO8um6II`}
                  value={exerciseIdsText}
                  onChange={(e) => setExerciseIdsText(e.target.value)}
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setExerciseDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSyncExercises} disabled={syncMutation.isPending}>Sincronizar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline"><RefreshCw className="h-4 w-4 mr-2" /> Re-escanear código</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Re-escanear el código</DialogTitle>
                  <DialogDescription>
                    Para detectar en qué páginas se usa cada vídeo, ejecuta este comando localmente:
                  </DialogDescription>
                </DialogHeader>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">npx tsx scripts/scan-video-usage.ts</pre>
                <p className="text-sm text-muted-foreground">
                  El script escanea <code>src/**/*.tsx</code>, busca IDs de YouTube y los inserta en <code>video_page_usage</code> con marca <code>auto-scan</code>. Las anotaciones manuales no se tocan.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v) => { setTab(v as Source); setPage(1); }}>
          <TabsList>
            <TabsTrigger value="channel">Canal público</TabsTrigger>
            <TabsTrigger value="exercise_library">Biblioteca de ejercicios</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="space-y-4 mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Input
                placeholder="Buscar por título o ID…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="max-w-sm"
              />
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={onlyOrphans} onCheckedChange={(v) => { setOnlyOrphans(!!v); setPage(1); }} />
                Solo huérfanos (sin uso detectado)
              </label>
              <span className="text-sm text-muted-foreground ml-auto">{filtered.length} resultados</span>
            </div>

            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground">
                    No hay vídeos. Pulsa "Sincronizar canal" o "Sincronizar biblioteca" para empezar.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Miniatura</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead className="w-[180px]">Video ID</TableHead>
                        <TableHead className="w-[100px] text-right">Vistas</TableHead>
                        <TableHead className="w-[80px] text-right">Duración</TableHead>
                        <TableHead className="min-w-[260px]">Páginas</TableHead>
                        <TableHead className="w-[100px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginated.map((v) => {
                        const pages = usageByVideo.get(v.video_id) ?? [];
                        const isOrphan = pages.length === 0;
                        return (
                          <TableRow key={v.video_id}>
                            <TableCell>
                              <button
                                onClick={() => setPreviewId(v.video_id)}
                                className="relative block w-[110px] aspect-video rounded overflow-hidden bg-muted group"
                              >
                                {v.thumbnail_url ? (
                                  <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                                ) : null}
                                <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                                  <Play className="h-6 w-6 text-white" />
                                </span>
                              </button>
                            </TableCell>
                            <TableCell className="align-top">
                              <div className="font-medium line-clamp-2">{v.title}</div>
                              {isOrphan && <Badge variant="destructive" className="mt-1">Huérfano</Badge>}
                            </TableCell>
                            <TableCell className="align-top">
                              <div className="flex items-center gap-1">
                                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{v.video_id}</code>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => copyId(v.video_id)} title="Copiar ID">
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <a
                                  href={`https://www.youtube.com/watch?v=${v.video_id}`}
                                  target="_blank" rel="noreferrer"
                                  className="text-muted-foreground hover:text-primary"
                                  title="Abrir en YouTube"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            </TableCell>
                            <TableCell className="text-right align-top">{formatNumber(v.view_count)}</TableCell>
                            <TableCell className="text-right align-top text-sm">{v.duration ? formatDuration(v.duration) : '–'}</TableCell>
                            <TableCell className="align-top">
                              <div className="flex flex-wrap gap-1">
                                {pages.map((p) => (
                                  <Badge
                                    key={`${p.page_path}-${p.section}`}
                                    variant={p.source === 'manual' ? 'default' : 'secondary'}
                                    className="text-[10px] font-normal"
                                    title={`${p.source} · ${formatDistanceToNow(new Date(p.updated_at), { addSuffix: true, locale: es })}`}
                                  >
                                    {p.page_path}{p.section ? ` · ${p.section}` : ''}
                                  </Badge>
                                ))}
                                {pages.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                              </div>
                            </TableCell>
                            <TableCell className="align-top">
                              <Button size="sm" variant="outline" onClick={() => setEditUsage(v)}>Editar</Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Anterior</Button>
                <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
                <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Siguiente</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview modal */}
      <Dialog open={!!previewId} onOpenChange={(o) => !o && setPreviewId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>Vista previa · {previewId}</DialogTitle></DialogHeader>
          {previewId && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded"
                src={`https://www.youtube.com/embed/${previewId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit usage dialog */}
      <EditUsageDialog video={editUsage} usage={editUsage ? usageByVideo.get(editUsage.video_id) ?? [] : []} onClose={() => setEditUsage(null)} />
    </div>
  );
};

interface EditUsageDialogProps {
  video: AdminVideo | null;
  usage: VideoUsage[];
  onClose: () => void;
}

const EditUsageDialog = ({ video, usage, onClose }: EditUsageDialogProps) => {
  const qc = useQueryClient();
  const [pagePath, setPagePath] = useState('');
  const [section, setSection] = useState('');

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!video) return;
      const { error } = await supabase.from('video_page_usage' as any).upsert({
        video_id: video.video_id,
        page_path: pagePath.trim(),
        section: section.trim(),
        source: 'manual',
        updated_at: new Date().toISOString(),
      } as any, { onConflict: 'video_id,page_path,section' });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['video-page-usage'] });
      setPagePath(''); setSection('');
      toast({ title: 'Página añadida' });
    },
    onError: (e: any) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (u: VideoUsage) => {
      const { error } = await supabase
        .from('video_page_usage' as any)
        .delete()
        .eq('video_id', u.video_id)
        .eq('page_path', u.page_path)
        .eq('section', u.section);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['video-page-usage'] });
      toast({ title: 'Eliminado' });
    },
  });

  return (
    <Dialog open={!!video} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Páginas que usan este vídeo</DialogTitle>
          <DialogDescription className="line-clamp-1">{video?.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-[40vh] overflow-y-auto">
          {usage.length === 0 && <p className="text-sm text-muted-foreground">Sin páginas registradas todavía.</p>}
          {usage.map((u) => (
            <div key={`${u.page_path}-${u.section}`} className="flex items-center justify-between gap-2 border rounded p-2">
              <div className="text-sm">
                <div className="font-medium">{u.page_path}{u.section && <span className="text-muted-foreground"> · {u.section}</span>}</div>
                <div className="text-xs text-muted-foreground">{u.source} · {formatDistanceToNow(new Date(u.updated_at), { addSuffix: true, locale: es })}</div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(u)} title="Eliminar">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 space-y-2">
          <p className="text-sm font-medium">Añadir manualmente</p>
          <Input placeholder="/rutina-pecho-calistenia/" value={pagePath} onChange={(e) => setPagePath(e.target.value)} />
          <Input placeholder="Sección (opcional)" value={section} onChange={(e) => setSection(e.target.value)} />
          <Button onClick={() => addMutation.mutate()} disabled={!pagePath.trim() || addMutation.isPending}>
            {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            Añadir página
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminVideoLibrary;
