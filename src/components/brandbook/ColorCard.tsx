import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ColorCardProps {
  name: string;
  hex: string;
  hsl: string;
  tailwind: string;
  usage: string;
}

export const ColorCard = ({ name, hex, hsl, tailwind, usage }: ColorCardProps) => {
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedHsl, setCopiedHsl] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const copyToClipboard = (text: string, setter: (value: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <div 
        className="h-32 w-full"
        style={{ backgroundColor: hex }}
      />
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg">{name}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">HEX:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">{hex}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(hex, setCopiedHex)}
                className="h-8 w-8 p-0"
              >
                {copiedHex ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">HSL:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">{hsl}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(hsl, setCopiedHsl)}
                className="h-8 w-8 p-0"
              >
                {copiedHsl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tailwind:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">{tailwind}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(tailwind, setCopiedTailwind)}
                className="h-8 w-8 p-0"
              >
                {copiedTailwind ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground pt-2 border-t">{usage}</p>
      </div>
    </Card>
  );
};
