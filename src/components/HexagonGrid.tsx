import { Hexagon } from "./Hexagon";
import { Value } from "@/types/content";
import { motion } from "framer-motion";

interface HexagonGridProps {
  values: Value[];
}

export const HexagonGrid = ({ values }: HexagonGridProps) => {
  const positions = [
    { top: "5%", left: "50%", transform: "translateX(-50%)" },
    { top: "28%", left: "22%", transform: "translateX(0)" },
    { top: "28%", right: "22%", transform: "translateX(0)" },
    { top: "65%", left: "50%", transform: "translateX(-50%)" },
    { top: "36%", left: "50%", transform: "translateX(-50%)" },
    { top: "65%", left: "22%", transform: "translateX(0)" },
    { top: "65%", right: "22%", transform: "translateX(0)" },
  ];

  return (
    <div className="relative w-full h-[650px] md:h-[750px] max-w-5xl mx-auto">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 blur-[100px] rounded-full" />
      </div>

      {values.map((value, index) => (
        <motion.div
          key={value.id}
          className="absolute"
          style={positions[index]}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.08, zIndex: 50 }}
        >
          <div className="relative group cursor-pointer">
            <Hexagon size={190} filled className="transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,107,0,0.6)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="text-primary text-xs font-bold mb-2 opacity-60">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
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
