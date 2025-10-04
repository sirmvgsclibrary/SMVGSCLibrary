import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

const GlassCard = ({ children, className, hover = false, style }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6",
        hover && "hover-lift cursor-pointer",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
