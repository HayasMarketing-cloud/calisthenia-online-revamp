import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickJumpBannerProps {
  text: string;
  linkText: string;
  href: string;
  isExternal?: boolean;
  icon?: string;
  variant?: "primary" | "secondary" | "accent";
}

const QuickJumpBanner = ({ 
  text, 
  linkText, 
  href, 
  isExternal = false,
  icon = "🎯",
  variant = "primary"
}: QuickJumpBannerProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Estilos por variante usando el sistema de diseño
  const variantStyles = {
    primary: {
      container: "bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20",
      button: "hover:bg-primary/10 hover:text-primary",
      icon: "text-primary"
    },
    secondary: {
      container: "bg-gradient-to-r from-secondary/5 via-muted/10 to-secondary/5 border-secondary/20",
      button: "hover:bg-secondary/10 hover:text-secondary",
      icon: "text-secondary"
    },
    accent: {
      container: "bg-gradient-to-r from-accent/15 via-primary/10 to-accent/15 border-accent/30",
      button: "hover:bg-accent/10 hover:text-accent",
      icon: "text-accent"
    }
  };

  const styles = variantStyles[variant];

  const content = (
    <>
      <span className="text-base sm:text-lg font-medium flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {text}
      </span>
      <Button 
        variant="ghost" 
        className={cn(
          "gap-2 hover:gap-3 transition-all",
          styles.button
        )}
      >
        {linkText}
        {isExternal ? (
          <ArrowRight className={cn("w-4 h-4", styles.icon)} />
        ) : (
          <ArrowDown className={cn("w-4 h-4", styles.icon)} />
        )}
      </Button>
    </>
  );

  return (
    <div className={cn(
      "border-b animate-fade-in",
      styles.container
    )}>
      <div className="container mx-auto px-4 py-3">
        {isExternal ? (
          <Link 
            to={href}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 hover:opacity-90 transition-opacity"
          >
            {content}
          </Link>
        ) : (
          <a 
            href={href}
            onClick={handleClick}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 cursor-pointer hover:opacity-90 transition-opacity"
          >
            {content}
          </a>
        )}
      </div>
    </div>
  );
};

export default QuickJumpBanner;
