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
  numberSize: string;
  titleSize: string;
  descSize: string;
  padding: string;
  layout: 'vertical' | 'horizontal';
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Responsive configuration for horizontal row layout
  const [config, setConfig] = useState<ResponsiveConfig>({
    hexSize: 180,
    horizontalSpacing: 135,
    numberSize: "text-3xl",
    titleSize: "text-base",
    descSize: "text-[9px]",
    padding: "px-4",
    layout: 'horizontal'
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Mobile: Small hexagons, vertical layout
        const hexSize = 120;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75,
          numberSize: "text-2xl",
          titleSize: "text-sm",
          descSize: "text-[8px]",
          padding: "px-3",
          layout: 'vertical'
        });
      } else if (width < 1024) {
        // Tablet: Medium hexagons, horizontal layout
        const hexSize = 140;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75,
          numberSize: "text-2xl",
          titleSize: "text-sm",
          descSize: "text-[8px]",
          padding: "px-3",
          layout: 'horizontal'
        });
      } else if (width < 1536) {
        // Desktop: Full hexagons, horizontal layout
        const hexSize = 180;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75,
          numberSize: "text-3xl",
          titleSize: "text-base",
          descSize: "text-[9px]",
          padding: "px-4",
          layout: 'horizontal'
        });
      } else {
        // Large desktop: Extra large hexagons, horizontal layout
        const hexSize = 200;
        setConfig({
          hexSize,
          horizontalSpacing: hexSize * 0.75,
          numberSize: "text-4xl",
          titleSize: "text-lg",
          descSize: "text-[10px]",
          padding: "px-5",
          layout: 'horizontal'
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate positions with zigzag offset for horizontal layout only
  const positions = values.map((_, index) => ({
    filled: [0, 2, 4, 6].includes(index), // Alternating pattern: 1, 3, 5, 7 filled
    index,
    yOffset: config.layout === 'horizontal' && index % 2 === 0 ? 0 : config.layout === 'horizontal' ? config.hexSize * 0.2 : 0
  }));

  return (
    <div className={`relative w-full py-8 sm:py-12 ${config.layout === 'horizontal' ? 'overflow-x-auto scrollbar-hide' : ''}`}>
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

      {/* Responsive hexagon layout */}
      <div className={`flex ${config.layout === 'vertical' ? 'flex-col items-center' : 'items-center justify-start md:justify-center'} gap-0 px-4 ${config.layout === 'horizontal' ? 'min-w-max' : ''} mx-auto`}>
        {positions.map((position, idx) => {
          const value = values[position.index];
          if (!value) return null;
          
          return (
            <motion.div
              key={value.id}
              className="flex-shrink-0"
              style={{ 
                marginLeft: config.layout === 'horizontal' && idx > 0 ? -config.hexSize * 0.25 : 0,
                marginTop: config.layout === 'horizontal' ? position.yOffset : 0,
                marginBottom: config.layout === 'vertical' && idx < positions.length - 1 ? -config.hexSize * 0.15 : 0
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
                  <h3 className={`${config.titleSize} font-bold mb-1 transition-all ${position.filled ? 'text-white' : 'text-foreground'}`}>
                    {value.title}
                  </h3>
                  {config.layout === 'horizontal' && (
                    <p className={`${config.descSize} leading-relaxed transition-all duration-300 ${position.filled ? 'text-white/95' : 'text-muted-foreground/70'}`}>
                      {value.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
