import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import globalData from "../../../content/en/global.json";
import { GlobalContent } from "@/types/content";

const WorldMap = lazy(() => import("@/components/WorldMap").then(m => ({ default: m.WorldMap })));

const global = globalData as GlobalContent;

export const GlobalPresence = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4">
            <div className="text-primary text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              Global Network
              <div className="h-px w-8 bg-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">{global.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{global.short}</p>
        </motion.div>
        
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Suspense fallback={<div className="w-full h-[400px] bg-muted/10 animate-pulse rounded-xl" />}>
            <WorldMap locations={global.locations} />
          </Suspense>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
          {global.locations.map((location, index) => (
            <motion.div
              key={location.city}
              className="glass-card p-6 text-center space-y-3 hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{location.city}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{location.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
