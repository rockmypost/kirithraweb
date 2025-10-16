import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  // Honeycomb positioning for 7 hexagons
  const positions = [
    { top: "0%", left: "50%", transform: "translateX(-50%)" }, // top center
    { top: "30%", left: "15%", transform: "translateX(0)" }, // middle left
    { top: "30%", right: "15%", transform: "translateX(0)" }, // middle right
    { top: "60%", left: "50%", transform: "translateX(-50%)" }, // bottom center
    { top: "30%", left: "50%", transform: "translateX(-50%)" }, // center
    { top: "60%", left: "15%", transform: "translateX(0)" }, // bottom left
    { top: "60%", right: "15%", transform: "translateX(0)" }, // bottom right
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] max-w-4xl mx-auto">
      {values.map((value, index) => (
        <motion.div
          key={value.id}
          className="absolute"
          style={positions[index]}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative group">
            <Hexagon size={180} filled className="transition-all duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
              <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {value.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
