import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Precise honeycomb formation - 7 hexagons (1-2-3-1 pattern)
  const hexSize = 220;
  const horizontalSpacing = 190.5; // hexSize * 0.866
  const verticalSpacing = 165; // hexSize * 0.75
  
  // Calculate positions from center for perfect tessellation
  const centerX = 450; // Container width / 2
  const centerY = 375; // Container height / 2
  
  // Pixel-perfect honeycomb positions (1-2-3-1 pattern)
  const positions = [
    // Top (hex 0)
    { x: centerX, y: centerY - verticalSpacing * 2, filled: true, index: 0 },
    
    // Second row (hex 1, 2)
    { x: centerX - horizontalSpacing, y: centerY - verticalSpacing, filled: false, index: 1 },
    { x: centerX + horizontalSpacing, y: centerY - verticalSpacing, filled: true, index: 2 },
    
    // Third row (hex 3, 4, 5)
    { x: centerX - horizontalSpacing * 2, y: centerY, filled: true, index: 4 },
    { x: centerX, y: centerY, filled: false, index: 3 },
    { x: centerX + horizontalSpacing * 2, y: centerY, filled: true, index: 5 },
    
    // Bottom (hex 6)
    { x: centerX, y: centerY + verticalSpacing * 2, filled: false, index: 6 },
  ];

  return (
    <div className="relative w-full h-[750px] max-w-5xl mx-auto rounded-3xl p-4 overflow-visible">
      {/* Subtle warm background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 blur-[140px] rounded-full" />
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
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: idx * 0.1, 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -12,
              rotate: 2,
              zIndex: 10,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <div className="relative group cursor-pointer">
              <Hexagon 
                size={hexSize} 
                filled={position.filled} 
                strokeWidth={2}
                className="transition-all duration-300 group-hover:drop-shadow-[0_16px_32px_rgba(255,107,0,0.4)]" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
                <div className={`text-3xl font-bold mb-3 transition-all ${position.filled ? 'text-white' : 'text-primary'}`}>
                  {String(position.index + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-all ${position.filled ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
                  {value.title}
                </h3>
                <p className={`text-xs leading-relaxed transition-all duration-300 ${position.filled ? 'text-white/95 opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'}`}>
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
