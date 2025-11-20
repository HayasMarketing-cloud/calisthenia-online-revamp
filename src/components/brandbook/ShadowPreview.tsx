import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShadowPreviewProps {
  name: string;
  cssClass: string;
  cssValue: string;
  description: string;
}

export const ShadowPreview = ({ name, cssClass, cssValue, description }: ShadowPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
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
      <div className="flex justify-center py-8">
        <div className={`w-32 h-32 bg-card rounded-lg ${cssClass}`} />
      </div>
      <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto mt-4">
        {cssValue}
      </code>
    </Card>
  );
};
