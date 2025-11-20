import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TypographyExampleProps {
  level: string;
  size: string;
  tailwindClass: string;
  example: string;
}

export const TypographyExample = ({ level, size, tailwindClass, example }: TypographyExampleProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tailwindClass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getClassName = () => {
    if (level === "Body") return "text-base";
    if (level === "Small") return "text-sm";
    return tailwindClass;
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{level}</h3>
          <p className="text-sm text-muted-foreground">{size}</p>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-sm bg-muted px-3 py-1 rounded">{tailwindClass}</code>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className={getClassName()}>
        {example}
      </div>
    </Card>
  );
};
