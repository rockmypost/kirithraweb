import { Office } from "@/types/content";
import { motion } from "framer-motion";

interface WorldMapProps {
  locations: Office[];
}

export const WorldMap = ({ locations }: WorldMapProps) => {
  // Simple world map SVG outline
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <svg viewBox="0 0 1000 500" className="w-full h-full">
        {/* Simplified world map continents */}
        <g fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5">
          {/* North America */}
          <path d="M 100,100 L 150,80 L 200,90 L 250,100 L 280,150 L 250,200 L 200,180 L 150,150 Z" />
          {/* South America */}
          <path d="M 220,250 L 250,220 L 280,250 L 290,300 L 270,350 L 240,330 L 220,280 Z" />
          {/* Europe */}
          <path d="M 450,100 L 500,90 L 530,110 L 520,140 L 480,150 L 460,130 Z" />
          {/* Africa */}
          <path d="M 480,200 L 520,180 L 550,220 L 540,280 L 500,300 L 480,260 Z" />
          {/* Asia */}
          <path d="M 600,80 L 700,70 L 780,90 L 800,130 L 750,180 L 650,170 L 600,140 Z" />
          {/* Australia */}
          <path d="M 750,320 L 820,310 L 850,340 L 830,370 L 780,360 L 760,340 Z" />
        </g>

        {/* Location markers */}
        {locations.map((location, index) => {
          // Convert lat/lon to SVG coordinates (simplified projection)
          const x = ((location.lon + 180) / 360) * 1000;
          const y = ((90 - location.lat) / 180) * 500;

          return (
            <g key={location.city}>
              {/* Animated pulse ring */}
              <motion.circle
                cx={x}
                cy={y}
                r="15"
                fill="none"
                stroke="hsl(var(--accent-gold))"
                strokeWidth="2"
                initial={{ opacity: 0.8, scale: 0 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
              
              {/* Marker dot */}
              <motion.circle
                cx={x}
                cy={y}
                r="5"
                fill="hsl(var(--accent-gold))"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="cursor-pointer"
              />
              
              {/* City label */}
              <motion.text
                x={x}
                y={y - 15}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize="12"
                fontWeight="500"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
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
