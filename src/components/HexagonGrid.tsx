import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Precise honeycomb formation - 7 hexagons (1-2-3-1 pattern)
  const hexSize = 240;
  const horizontalSpacing = 208; // Perfect tessellation - hexagons touching
  const verticalSpacing = 180; // Perfect tessellation - hexagons touching
  
  // Calculate positions from center for perfect tessellation
  const centerX = 480; // Container width / 2
  const centerY = 360; // Container height / 2 - adjusted for perfect layout
  
  // Refined honeycomb positions with updated fill pattern
  const positions = [
    // Top (hex 0) - filled
    { x: centerX, y: centerY - verticalSpacing * 2, filled: true, index: 0 },
    
    // Second row (hex 1, 2)
    { x: centerX - horizontalSpacing, y: centerY - verticalSpacing, filled: false, index: 1 },
    { x: centerX + horizontalSpacing, y: centerY - verticalSpacing, filled: true, index: 2 },
    
    // Third row (hex 3, 4, 5)
    { x: centerX - horizontalSpacing, y: centerY, filled: false, index: 3 },
    { x: centerX, y: centerY, filled: false, index: 4 },
    { x: centerX + horizontalSpacing, y: centerY, filled: true, index: 5 },
    
    // Bottom (hex 6) - white
    { x: centerX, y: centerY + verticalSpacing, filled: false, index: 6 },
  ];

  return (
    <div className="relative w-full h-[720px] max-w-5xl mx-auto p-4 overflow-visible">
      {/* Unified honeycomb shadow for cohesion */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] blur-[80px] rounded-full" style={{ background: 'hsl(18 100% 80%)' }} />
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
                size={hexSize} 
                filled={position.filled} 
                strokeWidth={1}
                className="transition-all duration-300 group-hover:drop-shadow-[0_8px_24px_hsl(18_100%_80%_/_0.4)]" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
                <div className={`text-5xl font-extrabold mb-2 transition-all ${position.filled ? 'text-white' : 'text-primary'}`}>
                  {String(position.index + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-2xl font-bold mb-3 transition-all ${position.filled ? 'text-white' : 'text-foreground'}`}>
                  {value.title}
                </h3>
                <p className={`text-[11px] leading-relaxed transition-all duration-300 ${position.filled ? 'text-white/95' : 'text-muted-foreground/70'}`}>
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
