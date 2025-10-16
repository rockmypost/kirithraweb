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
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
      >
        {/* Bottom shadow layer */}
        <polygon
          points={points}
          fill="rgba(0,0,0,0.1)"
          className="translate-y-1"
        />
        {/* Main hexagon */}
        <polygon
          points={points}
          fill={filled ? "hsl(var(--primary))" : "hsl(var(--card))"}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
        {/* Top highlight */}
        <polygon
          points={points}
          fill="url(#hexGradient)"
          className="transition-all duration-300"
        />
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
