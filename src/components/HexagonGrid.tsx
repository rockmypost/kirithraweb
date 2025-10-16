import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HexagonGridProps {
  values: Value[];
}

interface ResponsiveConfig {
  hexSize: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  containerHeight: string;
  numberSize: string;
  titleSize: string;
  descSize: string;
  padding: string;
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Responsive configuration based on screen size
  const [config, setConfig] = useState<ResponsiveConfig>({
    hexSize: 240,
    horizontalSpacing: 208,
    verticalSpacing: 180,
    containerHeight: "h-[660px]",
    numberSize: "text-5xl",
    titleSize: "text-2xl",
    descSize: "text-[11px]",
    padding: "px-12"
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile: Perfect tessellation
        const hexSize = 120;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75, // 90px - hexagons touch
          verticalSpacing: hexSize * 0.866, // 104px - hexagons touch
          containerHeight: "min-h-[550px]",
          numberSize: "text-2xl",
          titleSize: "text-sm",
          descSize: "text-[8px]",
          padding: "px-4"
        });
      } else if (width < 1024) {
        // Tablet: Perfect tessellation
        const hexSize = 160;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75, // 120px - hexagons touch
          verticalSpacing: hexSize * 0.866, // 139px - hexagons touch
          containerHeight: "h-[650px]",
          numberSize: "text-3xl",
          titleSize: "text-base",
          descSize: "text-[9px]",
          padding: "px-6"
        });
      } else if (width < 1536) {
        // Desktop: Perfect tessellation
        const hexSize = 200;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75, // 150px - hexagons touch
          verticalSpacing: hexSize * 0.866, // 173px - hexagons touch
          containerHeight: "h-[750px]",
          numberSize: "text-4xl",
          titleSize: "text-lg",
          descSize: "text-[10px]",
          padding: "px-8"
        });
      } else {
        // Large desktop: Perfect tessellation
        const hexSize = 240;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75, // 180px - hexagons touch
          verticalSpacing: hexSize * 0.866, // 208px - hexagons touch
          containerHeight: "h-[850px]",
          numberSize: "text-5xl",
          titleSize: "text-xl",
          descSize: "text-[11px]",
          padding: "px-10"
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive positions based on config
  const centerX = config.hexSize * 2; // Dynamic center based on hex size
  const centerY = config.hexSize * 1.4;
  
  // Perfect tessellated honeycomb - 7 hexagons touching edge-to-edge
  const positions = [
    // Top (hex 1)
    { x: centerX, y: centerY - config.verticalSpacing * 1.5, filled: true, index: 0 },
    
    // Second row (hex 2, 3)
    { x: centerX - config.horizontalSpacing, y: centerY - config.verticalSpacing, filled: false, index: 1 },
    { x: centerX + config.horizontalSpacing, y: centerY - config.verticalSpacing, filled: true, index: 2 },
    
    // Center row (hex 4, 5, 6) - wider middle row
    { x: centerX - config.horizontalSpacing * 2, y: centerY, filled: false, index: 3 },
    { x: centerX, y: centerY, filled: false, index: 4 },
    { x: centerX + config.horizontalSpacing * 2, y: centerY, filled: true, index: 5 },
    
    // Bottom (hex 7)
    { x: centerX, y: centerY + config.verticalSpacing * 1.5, filled: false, index: 6 },
  ];

  return (
    <div className={`relative w-full ${config.containerHeight} max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 overflow-visible`}>
      {/* Unified honeycomb shadow - responsive sizing */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[60px] sm:blur-[70px] lg:blur-[80px] rounded-full" 
          style={{ 
            background: 'hsl(18 100% 80%)',
            width: `${config.hexSize * 2.5}px`,
            height: `${config.hexSize * 2.5}px`
          }} 
        />
      </div>

      {/* Value hexagons - 7 hexagons in precise formation */}
      {positions.map((position, idx) => {
        const value = values[position.index];
        if (!value) return null;
        
        return (
          <motion.div
            key={value.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: position.x, top: position.y }}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: idx * 0.12, 
              duration: 0.6,
              type: "spring",
              stiffness: 80
            }}
            whileHover={{ 
              scale: 1.03, 
              y: -6,
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
                <div className={`${config.numberSize} font-extrabold mb-1 sm:mb-2 transition-all ${position.filled ? 'text-white' : 'text-primary'}`}>
                  {String(position.index + 1).padStart(2, '0')}
                </div>
                <h3 className={`${config.titleSize} font-bold mb-1 sm:mb-2 lg:mb-3 transition-all ${position.filled ? 'text-white' : 'text-foreground'}`}>
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
  );
};
