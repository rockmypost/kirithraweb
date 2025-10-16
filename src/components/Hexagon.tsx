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
  strokeWidth = 1,
  filled = false
}: HexagonProps) => {
  const points = "50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25";
  
  return (
    <div className={cn("relative inline-block", className)} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 16px hsl(18 100% 80% / 0.25))' }}
      >
        {/* Soft shadow layer for subtle 3D depth */}
        <polygon
          points={points}
          fill="hsl(18 100% 80% / 0.12)"
          className="translate-y-1"
        />
        
        {/* Main hexagon with refined gradient */}
        <polygon
          points={points}
          fill={filled ? "url(#hexGradientFilled)" : "url(#hexGradientWhite)"}
          stroke={filled ? "hsl(18 100% 52%)" : "hsl(0 0% 92%)"}
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
        
        <defs>
          {/* Lighter gradient for filled hexagons */}
          <linearGradient id="hexGradientFilled" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(18 100% 54%)" />
            <stop offset="100%" stopColor="hsl(18 100% 48%)" />
          </linearGradient>
          
          {/* Subtle gradient for white hexagons */}
          <linearGradient id="hexGradientWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" />
            <stop offset="100%" stopColor="hsl(30 8% 97%)" />
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
