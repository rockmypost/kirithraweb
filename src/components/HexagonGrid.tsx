import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Honeycomb layout matching the reference image
  const positions = [
    { top: "5%", left: "50%", transform: "translateX(-50%)", filled: true },
    { top: "28%", left: "27%", transform: "translateX(-50%)", filled: false },
    { top: "28%", right: "27%", transform: "translateX(50%)", filled: true },
    { top: "51%", left: "50%", transform: "translateX(-50%)", filled: false },
    { top: "51%", left: "10%", transform: "translateX(-50%)", filled: true },
    { top: "51%", right: "10%", transform: "translateX(50%)", filled: false },
    { top: "74%", left: "27%", transform: "translateX(-50%)", filled: false },
  ];

  return (
    <div className="relative w-full h-[700px] md:h-[800px] max-w-6xl mx-auto bg-gradient-to-br from-blue-50/50 via-white to-orange-50/30 rounded-3xl p-8">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
      </div>

      {/* Center branding hexagon */}
      <motion.div
        className="absolute top-[74%] left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
      >
        <div className="relative group cursor-default">
          <Hexagon size={200} filled={false} strokeWidth={3} className="drop-shadow-2xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <h3 className="text-2xl font-bold text-foreground mb-1">Our</h3>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Essence</h3>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {values.map((value, index) => (
        <motion.div
          key={value.id}
          className="absolute"
          style={positions[index]}
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1, 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -10,
            transition: { duration: 0.2 }
          }}
        >
          <div className="relative group cursor-pointer">
            <Hexagon 
              size={200} 
              filled={positions[index].filled} 
              strokeWidth={2}
              className="transition-all duration-300 group-hover:drop-shadow-[0_12px_24px_rgba(255,107,0,0.4)]" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
              <div className={`text-2xl font-bold mb-3 ${positions[index].filled ? 'text-white' : 'text-primary'}`}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className={`text-lg font-bold mb-2 transition-colors ${positions[index].filled ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
                {value.title}
              </h3>
              <p className={`text-xs leading-relaxed transition-opacity duration-300 ${positions[index].filled ? 'text-white/90 opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`}>
                {value.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
