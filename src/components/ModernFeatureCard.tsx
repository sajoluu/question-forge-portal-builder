import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModernFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: "primary" | "accent" | "secondary";
  className?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export function ModernFeatureCard({
  icon,
  title, 
  description,
  gradient = "primary",
  className,
  onAction,
  actionLabel = "Learn More"
}: ModernFeatureCardProps) {
  const gradientClasses = {
    primary: "bg-gradient-primary",
    accent: "bg-gradient-accent", 
    secondary: "bg-gradient-secondary"
  };

  return (
    <Card className={cn("card-hover group relative overflow-hidden", className)}>
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <CardHeader className="relative z-10">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto",
          "shadow-glow transform group-hover:scale-110 transition-all duration-300",
          gradientClasses[gradient]
        )}>
          {icon}
        </div>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 text-center">
        <p className="text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        
        {onAction && (
          <Button 
            variant="ghost" 
            onClick={onAction}
            className="w-full rounded-xl hover:bg-white/10 hover:text-accent transition-all duration-300"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}