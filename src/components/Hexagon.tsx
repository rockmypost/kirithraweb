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
        style={{ filter: 'drop-shadow(0 8px 24px hsl(18 100% 50% / 0.15))' }}
      >
        {/* Shadow layer for 3D depth */}
        <polygon
          points={points}
          fill="hsl(18 100% 50% / 0.08)"
          className="translate-y-2"
        />
        
        {/* Main hexagon with gradient */}
        <polygon
          points={points}
          fill={filled ? "url(#hexGradientFilled)" : "url(#hexGradientWhite)"}
          stroke={filled ? "hsl(18 100% 50%)" : "hsl(var(--border))"}
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
        
        {/* Top highlight for glossy effect */}
        <polygon
          points={points}
          fill="url(#hexHighlight)"
          className="transition-all duration-300"
        />
        
        <defs>
          {/* Gradient for filled hexagons */}
          <linearGradient id="hexGradientFilled" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(18 100% 50%)" />
            <stop offset="100%" stopColor="hsl(18 100% 45%)" />
          </linearGradient>
          
          {/* Gradient for white hexagons */}
          <linearGradient id="hexGradientWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" />
            <stop offset="100%" stopColor="hsl(30 15% 98%)" />
          </linearGradient>
          
          {/* Top highlight */}
          <linearGradient id="hexHighlight" x1="0%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
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
