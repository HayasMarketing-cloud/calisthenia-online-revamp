import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Check as CheckIcon,
  X,
  AlertCircle,
  Calendar,
  Clock,
  FileText,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Share2,
  MessageCircle,
  Phone,
  MapPin,
  Camera,
  Video
} from "lucide-react";

interface IconItemProps {
  Icon: any;
  name: string;
  importCode: string;
}

const IconItem = ({ Icon, name, importCode }: IconItemProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(importCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4 hover:shadow-elegant transition-shadow">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-4 bg-primary/10 rounded-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-1 w-full">
          <p className="font-medium text-sm">{name}</p>
          <div className="flex items-center justify-between gap-2 bg-muted px-2 py-1 rounded text-xs">
            <code className="text-[10px] truncate">{importCode}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              {copied ? <CheckIcon className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const IconographySection = () => {
  const icons = [
    { Icon: Home, name: "Home", importCode: "import { Home } from 'lucide-react'" },
    { Icon: User, name: "User", importCode: "import { User } from 'lucide-react'" },
    { Icon: Settings, name: "Settings", importCode: "import { Settings } from 'lucide-react'" },
    { Icon: Search, name: "Search", importCode: "import { Search } from 'lucide-react'" },
    { Icon: Bell, name: "Bell", importCode: "import { Bell } from 'lucide-react'" },
    { Icon: Mail, name: "Mail", importCode: "import { Mail } from 'lucide-react'" },
    { Icon: Heart, name: "Heart", importCode: "import { Heart } from 'lucide-react'" },
    { Icon: Star, name: "Star", importCode: "import { Star } from 'lucide-react'" },
    { Icon: Plus, name: "Plus", importCode: "import { Plus } from 'lucide-react'" },
    { Icon: Menu, name: "Menu", importCode: "import { Menu } from 'lucide-react'" },
    { Icon: ChevronRight, name: "ChevronRight", importCode: "import { ChevronRight } from 'lucide-react'" },
    { Icon: Play, name: "Play", importCode: "import { Play } from 'lucide-react'" },
    { Icon: CheckIcon, name: "Check", importCode: "import { Check } from 'lucide-react'" },
    { Icon: X, name: "X", importCode: "import { X } from 'lucide-react'" },
    { Icon: AlertCircle, name: "AlertCircle", importCode: "import { AlertCircle } from 'lucide-react'" },
    { Icon: Calendar, name: "Calendar", importCode: "import { Calendar } from 'lucide-react'" },
    { Icon: Clock, name: "Clock", importCode: "import { Clock } from 'lucide-react'" },
    { Icon: FileText, name: "FileText", importCode: "import { FileText } from 'lucide-react'" },
    { Icon: Download, name: "Download", importCode: "import { Download } from 'lucide-react'" },
    { Icon: Upload, name: "Upload", importCode: "import { Upload } from 'lucide-react'" },
    { Icon: Trash2, name: "Trash2", importCode: "import { Trash2 } from 'lucide-react'" },
    { Icon: Edit, name: "Edit", importCode: "import { Edit } from 'lucide-react'" },
    { Icon: Eye, name: "Eye", importCode: "import { Eye } from 'lucide-react'" },
    { Icon: EyeOff, name: "EyeOff", importCode: "import { EyeOff } from 'lucide-react'" },
    { Icon: Filter, name: "Filter", importCode: "import { Filter } from 'lucide-react'" },
    { Icon: Share2, name: "Share2", importCode: "import { Share2 } from 'lucide-react'" },
    { Icon: MessageCircle, name: "MessageCircle", importCode: "import { MessageCircle } from 'lucide-react'" },
    { Icon: Phone, name: "Phone", importCode: "import { Phone } from 'lucide-react'" },
    { Icon: MapPin, name: "MapPin", importCode: "import { MapPin } from 'lucide-react'" },
    { Icon: Camera, name: "Camera", importCode: "import { Camera } from 'lucide-react'" },
    { Icon: Video, name: "Video", importCode: "import { Video } from 'lucide-react'" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Iconografía</h3>
        <p className="text-muted-foreground">
          Biblioteca: <strong>Lucide React</strong> - Iconos SVG optimizados y tree-shakeable
        </p>
        <code className="text-sm bg-muted px-3 py-1 rounded inline-block">
          npm install lucide-react
        </code>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {icons.map((icon) => (
          <IconItem key={icon.name} {...icon} />
        ))}
      </div>

      <Card className="p-6 bg-muted/50">
        <h4 className="font-bold mb-3">Guía de Uso</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Tamaños recomendados: h-4 w-4 (16px), h-5 w-5 (20px), h-6 w-6 (24px)</p>
          <p>• Usar <code className="bg-background px-1 rounded">className="text-primary"</code> para color corporativo</p>
          <p>• Aplicar <code className="bg-background px-1 rounded">className="text-muted-foreground"</code> para iconos secundarios</p>
          <p>• Espaciado con botones: <code className="bg-background px-1 rounded">mr-2</code> antes del texto</p>
        </div>
      </Card>
    </div>
  );
};
