import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  hover = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6",
        hover && "glass-card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
