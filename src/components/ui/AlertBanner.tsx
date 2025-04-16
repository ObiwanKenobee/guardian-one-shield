
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ShieldIcon } from "@/components/ui/ShieldIcon";
import { X } from "lucide-react";

interface AlertBannerProps {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "warning" | "success";
  dismissible?: boolean;
  className?: string;
}

export function AlertBanner({
  title,
  description,
  variant = "default",
  dismissible = true,
  className,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  let variantClasses = "";
  let shieldVariant: "default" | "alert" | "success" = "default";

  switch (variant) {
    case "destructive":
      variantClasses = "bg-guardian-accent/15 text-guardian-accent border-guardian-accent/30";
      shieldVariant = "alert";
      break;
    case "warning":
      variantClasses = "bg-guardian-warning/15 text-guardian-warning border-guardian-warning/30";
      shieldVariant = "alert";
      break;
    case "success":
      variantClasses = "bg-guardian-success/15 text-guardian-success border-guardian-success/30";
      shieldVariant = "success";
      break;
    default:
      variantClasses = "bg-guardian-primary/15 text-guardian-primary border-guardian-primary/30";
      break;
  }

  return (
    <Alert className={`${variantClasses} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <ShieldIcon variant={shieldVariant} size={18} pulse={variant === "destructive"} />
          <div>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </div>
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1 -mr-2"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  );
}
