import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GradientPreviewProps {
  name: string;
  cssClass: string;
  cssValue: string;
  description: string;
}

export const GradientPreview = ({ name, cssClass, cssValue, description }: GradientPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-32 w-full ${cssClass}`} />
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
          {cssValue}
        </code>
      </div>
    </Card>
  );
};
