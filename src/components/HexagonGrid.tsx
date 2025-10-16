import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HexagonGridProps {
  values: Value[];
}

interface ResponsiveConfig {
  hexSize: number;
  numberSize: string;
  titleSize: string;
  descSize: string;
  padding: string;
  gridCols: string;
  gap: string;
  enableZigzag: boolean;
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Responsive configuration with proper breakpoints
  const [config, setConfig] = useState<ResponsiveConfig>({
    hexSize: 180,
    numberSize: "text-2xl",
    titleSize: "text-sm",
    descSize: "text-xs",
    padding: "px-4",
    gridCols: "grid-cols-1",
    gap: "gap-8",
    enableZigzag: false
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile: 1 column, vertical stack, larger hexagons
        setConfig({
          hexSize: 120,
          numberSize: "text-2xl",
          titleSize: "text-sm",
          descSize: "text-xs",
          padding: "px-4",
          gridCols: "grid-cols-1",
          gap: "gap-8",
          enableZigzag: false
        });
      } else if (width < 1024) {
        // Tablet: 2-3 columns
        setConfig({
          hexSize: 160,
          numberSize: "text-3xl",
          titleSize: "text-base",
          descSize: "text-sm",
          padding: "px-4",
          gridCols: "grid-cols-2",
          gap: "gap-6",
          enableZigzag: true
        });
      } else if (width < 1536) {
        // Desktop: 4 columns
        setConfig({
          hexSize: 180,
          numberSize: "text-4xl",
          titleSize: "text-lg",
          descSize: "text-base",
          padding: "px-5",
          gridCols: "grid-cols-4",
          gap: "gap-4",
          enableZigzag: true
        });
      } else {
        // Large desktop: All 7 in one row
        setConfig({
          hexSize: 220,
          numberSize: "text-5xl",
          titleSize: "text-xl",
          descSize: "text-lg",
          padding: "px-6",
          gridCols: "grid-cols-7",
          gap: "gap-0",
          enableZigzag: true
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate positions with alternating filled pattern
  const positions = values.map((_, index) => ({
    filled: [0, 2, 4, 6].includes(index), // Alternating pattern
    index
  }));

  return (
    <div className="relative w-full py-8 sm:py-12">
      {/* Unified glow effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[80px] rounded-full" 
          style={{ 
            background: 'hsl(18 100% 80%)',
            width: '600px',
            height: '300px'
          }} 
        />
      </div>

      {/* Responsive grid layout */}
      <div className={`grid ${config.gridCols} ${config.gap} px-4 max-w-7xl mx-auto place-items-center`}>
        {positions.map((position, idx) => {
          const value = values[position.index];
          if (!value) return null;
          
          // Calculate zigzag offset for larger screens
          const yOffset = config.enableZigzag && idx % 2 !== 0 ? config.hexSize * 0.15 : 0;
          
          return (
            <motion.div
              key={value.id}
              className="relative"
              style={{ 
                marginTop: yOffset
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                zIndex: 10,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              <div className="relative group cursor-pointer">
                <Hexagon 
                  size={config.hexSize} 
                  filled={position.filled} 
                  strokeWidth={1}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_8px_24px_hsl(18_100%_80%_/_0.4)]" 
                />
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${config.padding}`}>
                  <div className={`${config.numberSize} font-extrabold mb-1 transition-all ${position.filled ? 'text-white' : 'text-primary'}`}>
                    {String(position.index + 1).padStart(2, '0')}
                  </div>
                  <h3 className={`${config.titleSize} font-bold mb-2 transition-all ${position.filled ? 'text-white' : 'text-foreground'}`}>
                    {value.title}
                  </h3>
                  <p className={`${config.descSize} leading-relaxed transition-all duration-300 ${position.filled ? 'text-white/95' : 'text-muted-foreground/70'}`}>
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
