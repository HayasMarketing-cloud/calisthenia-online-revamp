import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaItem } from '@/data/mediaLibrary';
import { Eye, Code, Copy, Download, Image as ImageIcon, Component } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaCardProps {
  item: MediaItem;
  onPreview: (item: MediaItem) => void;
}

export const MediaCard = ({ item, onPreview }: MediaCardProps) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const getImportCode = () => {
    if (item.type === 'component') {
      return `import ${item.component} from '@/components/${item.component}';`;
    }
    if (item.type === 'image' || item.type === 'icon') {
      const fileName = item.path?.split('/').pop() || '';
      return `import ${item.id.replace(/-/g, '')} from '@/assets/${fileName}';`;
    }
    return '';
  };

  const copyImportCode = () => {
    const code = getImportCode();
    navigator.clipboard.writeText(code);
    toast({
      title: 'Código copiado',
      description: 'El código de importación se ha copiado al portapapeles',
    });
  };

  const copyPath = () => {
    const path = item.path || `@/components/${item.component}`;
    navigator.clipboard.writeText(path);
    toast({
      title: 'Ruta copiada',
      description: 'La ruta se ha copiado al portapapeles',
    });
  };

  const renderPreview = () => {
    if (item.type === 'image' || item.type === 'icon') {
      const imgSrc = item.path?.replace('/src', '') || '';
      
      if (imageError) {
        return (
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        );
      }

      return (
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-48 object-cover rounded-md"
          onError={() => setImageError(true)}
        />
      );
    }

    if (item.type === 'component') {
      return (
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-md flex items-center justify-center">
          <Component className="w-12 h-12 text-primary" />
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="mb-3 cursor-pointer" onClick={() => onPreview(item)}>
          {renderPreview()}
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
            <Badge variant="outline" className="shrink-0 text-xs">
              {item.type}
            </Badge>
          </div>

          {item.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          )}

          {item.format && (
            <p className="text-xs text-muted-foreground">
              Formato: <span className="font-medium">{item.format}</span>
            </p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-1 pt-2">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1"
              onClick={() => onPreview(item)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyImportCode}
              title="Copiar código de importación"
            >
              <Code className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyPath}
              title="Copiar ruta"
            >
              <Copy className="w-4 h-4" />
            </Button>
            {(item.type === 'image' || item.type === 'icon') && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = item.path?.replace('/src', '') || '';
                  link.download = item.name;
                  link.click();
                }}
                title="Descargar"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
