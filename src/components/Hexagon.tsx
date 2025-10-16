import { cn } from "@/lib/utils";

interface HexagonProps {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  strokeWidth?: number;
  filled?: boolean;
}

export const Hexagon = ({ 
  children, 
  className, 
  size = 120,
  strokeWidth = 2,
  filled = false
}: HexagonProps) => {
  const points = "50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25";
  
  return (
    <div className={cn("relative inline-block", className)} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <polygon
          points={points}
          fill={filled ? "hsl(var(--accent-gold) / 0.1)" : "none"}
          stroke="hsl(var(--accent-gold))"
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
