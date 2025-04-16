
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string | number;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            {trend.direction === "up" ? (
              <span className="text-guardian-success">↑ {trend.value}</span>
            ) : trend.direction === "down" ? (
              <span className="text-guardian-accent">↓ {trend.value}</span>
            ) : (
              <span className="text-muted-foreground">→ {trend.value}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
