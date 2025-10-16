import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Tight honeycomb formation with 7 hexagons
  // Using precise hexagonal geometry for perfect tessellation
  const hexSize = 200;
  
  // Tight honeycomb layout matching reference
  const positions = [
    // Top center - hex 0
    { top: "5%", left: "50%", filled: true, index: 0 },
    
    // Second row - hex 1, 2 (left and right of top)
    { top: "28%", left: "28%", filled: false, index: 1 },
    { top: "28%", left: "72%", filled: true, index: 2 },
    
    // Third row - hex 3, 4, 5 (left, center, right)
    { top: "51%", left: "6%", filled: true, index: 4 },
    { top: "51%", left: "50%", filled: false, index: 3 },
    { top: "51%", left: "94%", filled: true, index: 5 },
    
    // Bottom center - hex 6
    { top: "74%", left: "50%", filled: false, index: 6 },
  ];

  return (
    <div className="relative w-full h-[700px] md:h-[750px] max-w-5xl mx-auto bg-gradient-to-br from-blue-50/30 via-white to-orange-50/20 rounded-3xl p-4 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full" />
      </div>

      {/* Value hexagons - 7 hexagons in tight formation */}
      {positions.map((position, idx) => {
        const value = values[position.index];
        if (!value) return null;
        
        return (
          <motion.div
            key={value.id}
            className="absolute -translate-x-1/2"
            style={{ top: position.top, left: position.left }}
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
              scale: 1.05, 
              y: -8,
              zIndex: 10,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative group cursor-pointer">
              <Hexagon 
                size={hexSize} 
                filled={position.filled} 
                strokeWidth={2}
                className="transition-all duration-300 group-hover:drop-shadow-[0_12px_28px_rgba(255,107,0,0.35)]" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                <div className={`text-2xl font-bold mb-2 ${position.filled ? 'text-white' : 'text-primary'}`}>
                  {String(position.index + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-lg font-bold mb-2 transition-colors ${position.filled ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
                  {value.title}
                </h3>
                <p className={`text-xs leading-relaxed transition-all duration-300 ${position.filled ? 'text-white/95 opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`}>
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
