import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
  note?: string;
}

export const AnimatedCounter = ({ value, label, note }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    
    // If value contains numbers, animate them
    const numbers = value.match(/\d+/);
    if (numbers) {
      const target = parseInt(numbers[0]);
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(value.replace(/\d+/, Math.floor(current).toString()));
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="relative bg-gradient-to-br from-white to-secondary/30 rounded-2xl p-8 border border-border/50 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_20px_40px_-10px_hsl(18_100%_50%/0.2)]">
        {/* Subtle hex accent */}
        <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25" fill="hsl(var(--primary))" />
          </svg>
        </div>
        
        <div className="relative">
          <div className={`${displayValue.includes(' ') || displayValue.length > 4 ? 'text-4xl md:text-5xl' : 'text-6xl md:text-7xl'} font-bold text-primary mb-3 tracking-tight whitespace-nowrap`}>
            {displayValue}
          </div>
          <div className="text-lg font-semibold text-foreground mb-1">{label}</div>
          {note && <div className="text-sm text-muted-foreground">{note}</div>}
        </div>
      </div>
    </motion.div>
  );
};
