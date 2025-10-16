import { Office } from "@/types/content";
import { motion } from "framer-motion";

interface WorldMapProps {
  locations: Office[];
}

export const WorldMap = ({ locations }: WorldMapProps) => {
  // Abstract geometric shapes for continents (inspired by modern minimalist design)
  const continents = [
    // North America - angular polygon
    "M 80,60 L 140,45 L 200,65 L 240,80 L 260,130 L 240,180 L 180,160 L 120,140 L 90,100 Z",
    // South America - irregular pentagon
    "M 220,240 L 260,215 L 290,245 L 295,310 L 270,360 L 230,340 L 210,280 Z",
    // Europe - compact angular shape
    "M 430,85 L 490,70 L 530,95 L 525,130 L 485,145 L 450,125 Z",
    // Africa - geometric trapezoid
    "M 470,180 L 530,165 L 565,210 L 560,285 L 510,310 L 475,265 Z",
    // Asia - large irregular polygon
    "M 560,55 L 680,45 L 780,65 L 820,110 L 790,165 L 700,175 L 620,160 L 570,120 Z",
    // Australia - angular shape
    "M 730,310 L 810,300 L 860,330 L 850,375 L 790,370 L 745,345 Z",
    // Middle East connector
    "M 540,140 L 580,130 L 600,160 L 580,180 L 550,170 Z",
  ];

  // Precise city coordinates
  const cityCoordinates: { [key: string]: { x: number; y: number } } = {
    "New York": { x: 235, y: 120 },
    "Madrid": { x: 430, y: 110 },
    "Dubai": { x: 595, y: 165 },
    "São Paulo": { x: 312, y: 300 },
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-background/50 rounded-xl overflow-hidden">
      <svg viewBox="0 0 1000 500" className="w-full h-full">
        {/* Abstract continent shapes */}
        <g>
          {continents.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </g>

        {/* Location markers with precise coordinates */}
        {locations.map((location, index) => {
          const coords = cityCoordinates[location.city];
          if (!coords) return null;

          return (
            <g key={location.city}>
              {/* Outer pulse ring */}
              <motion.circle
                cx={coords.x}
                cy={coords.y}
                r="20"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0.6, 0.2, 0.6],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.4,
                  ease: "easeInOut"
                }}
              />

              {/* Inner pulse ring */}
              <motion.circle
                cx={coords.x}
                cy={coords.y}
                r="15"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                initial={{ opacity: 0.8, scale: 0 }}
                animate={{ 
                  opacity: [0.8, 0, 0.8],
                  scale: [0.8, 2, 0.8]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeOut"
                }}
              />
              
              {/* Core marker dot */}
              <motion.circle
                cx={coords.x}
                cy={coords.y}
                r="6"
                fill="hsl(var(--primary))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.5 + index * 0.15, 
                  duration: 0.5,
                  ease: "backOut"
                }}
                className="cursor-pointer drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]"
              />

              {/* Glow effect */}
              <motion.circle
                cx={coords.x}
                cy={coords.y}
                r="8"
                fill="hsl(var(--primary))"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
              
              {/* City label */}
              <motion.text
                x={coords.x}
                y={coords.y - 30}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize="14"
                fontWeight="600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.15,
                  duration: 0.6
                }}
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {location.city}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
