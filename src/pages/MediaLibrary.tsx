import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MediaCard } from '@/components/admin/MediaCard';
import { ComponentPreview } from '@/components/admin/ComponentPreview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  mediaLibrary,
  categoryLabels,
  getCategoryItems,
  searchMedia,
  type MediaCategory,
  type MediaItem,
} from '@/data/mediaLibrary';
import { Search, Image as ImageIcon, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';

const MediaLibrary = () => {
  const [activeCategory, setActiveCategory] = useState<MediaCategory>('buttons');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const categories = Object.keys(categoryLabels) as MediaCategory[];

  const filteredItems = searchQuery
    ? searchMedia(searchQuery)
    : getCategoryItems(activeCategory);

  const handlePreview = (item: MediaItem) => {
    setSelectedItem(item);
    setPreviewOpen(true);
  };

  const renderPreviewContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.type === 'component') {
      return <ComponentPreview componentName={selectedItem.component!} />;
    }

    if (selectedItem.type === 'image' || selectedItem.type === 'icon') {
      const imgSrc = selectedItem.path?.replace('/src', '') || '';
      return (
        <div className="flex items-center justify-center bg-muted/50 rounded-lg p-8">
          <img
            src={imgSrc}
            alt={selectedItem.name}
            className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Biblioteca de Medios - Calistenia Online</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Biblioteca de Medios</h1>
          <p className="text-muted-foreground">
            Gestiona y previsualiza todos los recursos visuales y componentes de la web
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, descripción o tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Elementos</p>
            <p className="text-2xl font-bold">{mediaLibrary.length}</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Componentes</p>
            <p className="text-2xl font-bold">
              {mediaLibrary.filter((i) => i.type === 'component').length}
            </p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Imágenes</p>
            <p className="text-2xl font-bold">
              {mediaLibrary.filter((i) => i.type === 'image').length}
            </p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Iconos</p>
            <p className="text-2xl font-bold">
              {mediaLibrary.filter((i) => i.type === 'icon').length}
            </p>
          </div>
        </div>

        {/* Tabs by Category */}
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as MediaCategory)}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs lg:text-sm">
                {categoryLabels[cat]}
                <Badge variant="secondary" className="ml-2">
                  {getCategoryItems(cat).length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">{categoryLabels[cat]}</h2>
                <p className="text-muted-foreground">
                  {getCategoryItems(cat).length} elementos en esta categoría
                </p>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQuery ? 'No se encontraron resultados' : 'No hay elementos'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? 'Intenta con otros términos de búsqueda'
                      : 'Esta categoría aún no tiene elementos'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <MediaCard key={item.id} item={item} onPreview={handlePreview} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Preview Modal */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {selectedItem?.name}
                <Badge variant="outline">{selectedItem?.type}</Badge>
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4">
                {selectedItem?.description && (
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                )}

                {renderPreviewContent()}

                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold">Información</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tipo:</span>{' '}
                      <span className="font-medium">{selectedItem?.type}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Categoría:</span>{' '}
                      <span className="font-medium">
                        {selectedItem?.category && categoryLabels[selectedItem.category]}
                      </span>
                    </div>
                    {selectedItem?.format && (
                      <div>
                        <span className="text-muted-foreground">Formato:</span>{' '}
                        <span className="font-medium">{selectedItem.format}</span>
                      </div>
                    )}
                    {selectedItem?.path && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Ruta:</span>{' '}
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {selectedItem.path}
                        </code>
                      </div>
                    )}
                    {selectedItem?.component && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Componente:</span>{' '}
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {selectedItem.component}
                        </code>
                      </div>
                    )}
                  </div>

                  {selectedItem?.tags && selectedItem.tags.length > 0 && (
                    <div>
                      <span className="text-muted-foreground text-sm">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedItem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MediaLibrary;
