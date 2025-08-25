import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ModernStatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
}

export function ModernStatsCard({
  icon,
  title,
  value,
  change,
  className
}: ModernStatsCardProps) {
  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card className={cn("card-hover group relative overflow-hidden", className)}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
            {title}
          </div>
          <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gradient">
            {value}
          </div>
          
          {change && (
            <div className="flex items-center gap-1 text-sm">
              <span className={getTrendColor(change.trend)}>
                {getTrendIcon(change.trend)} {change.value}
              </span>
              <span className="text-muted-foreground">পূর্ববর্তী সময়ের তুলনায়</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}