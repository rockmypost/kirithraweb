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
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
        {displayValue}
      </div>
      <div className="text-sm font-medium text-foreground mb-1">{label}</div>
      {note && <div className="text-xs text-muted-foreground">{note}</div>}
    </motion.div>
  );
};
