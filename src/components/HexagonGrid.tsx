import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Perfect honeycomb tessellation layout
  // Hexagon size and spacing calculations for proper alignment
  const hexSize = 180;
  const verticalSpacing = hexSize * 0.75; // 75% for proper honeycomb vertical spacing
  const horizontalSpacing = hexSize * 0.866; // √3/2 for hexagon geometry
  
  // Positions for 7 values + 1 center label = 8 total hexagons
  const positions = [
    // Top row - position 1 (Alignment - filled)
    { top: "8%", left: "50%", transform: "translate(-50%, 0)", filled: true, index: 0 },
    
    // Second row - positions 2, 3
    { top: "28%", left: "30%", transform: "translate(-50%, 0)", filled: false, index: 1 }, // Precision
    { top: "28%", left: "70%", transform: "translate(-50%, 0)", filled: true, index: 2 }, // Synergy
    
    // Middle row - positions 4, 5, 6
    { top: "48%", left: "15%", transform: "translate(-50%, 0)", filled: true, index: 4 }, // Commitment
    { top: "48%", left: "50%", transform: "translate(-50%, 0)", filled: false, index: 3 }, // Adaptability
    { top: "48%", left: "85%", transform: "translate(-50%, 0)", filled: false, index: 5 }, // Endurance
    
    // Bottom row - position 7
    { top: "68%", left: "30%", transform: "translate(-50%, 0)", filled: false, index: 6 }, // Regeneration
  ];

  // Center branding hexagon position
  const centerPosition = { top: "68%", left: "70%", transform: "translate(-50%, 0)" };

  return (
    <div className="relative w-full h-[650px] md:h-[750px] max-w-6xl mx-auto bg-gradient-to-br from-blue-50/30 via-white to-orange-50/20 rounded-3xl p-8 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full" />
      </div>

      {/* Center branding hexagon */}
      <motion.div
        className="absolute"
        style={centerPosition}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
      >
        <div className="relative group cursor-default">
          <Hexagon size={180} filled={false} strokeWidth={3} className="drop-shadow-2xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <h3 className="text-xl font-bold text-foreground mb-1">Our</h3>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Essence</h3>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Value hexagons */}
      {positions.map((position, idx) => {
        const value = values[position.index];
        if (!value) return null;
        
        return (
          <motion.div
            key={value.id}
            className="absolute"
            style={{ top: position.top, left: position.left, transform: position.transform }}
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
              y: -8,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative group cursor-pointer">
              <Hexagon 
                size={180} 
                filled={position.filled} 
                strokeWidth={2}
                className="transition-all duration-300 group-hover:drop-shadow-[0_12px_28px_rgba(255,107,0,0.35)]" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <div className={`text-xl font-bold mb-2 ${position.filled ? 'text-white' : 'text-primary'}`}>
                  {String(position.index + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-base font-bold mb-2 transition-colors ${position.filled ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
                  {value.title}
                </h3>
                <p className={`text-xs leading-relaxed transition-opacity duration-300 ${position.filled ? 'text-white/90 opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`}>
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
