
import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

type ShieldVariant = "default" | "alert" | "success";

interface ShieldIconProps {
  variant?: ShieldVariant;
  size?: number;
  pulse?: boolean;
  className?: string;
}

export function ShieldIcon({ variant = "default", size = 24, pulse = false, className }: ShieldIconProps) {
  const baseClasses = cn(
    "shield-icon",
    pulse && "shield-pulse",
    className
  );

  switch (variant) {
    case "alert":
      return (
        <div className={baseClasses}>
          <ShieldAlert size={size} className="text-guardian-accent" />
        </div>
      );
    case "success":
      return (
        <div className={baseClasses}>
          <ShieldCheck size={size} className="text-guardian-success" />
        </div>
      );
    default:
      return (
        <div className={baseClasses}>
          <Shield size={size} className="text-guardian-primary" />
        </div>
      );
  }
}
