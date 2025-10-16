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
          <h2 className="text-4xl md:text-5xl font-bold">{global.title}</h2>
          <p className="text-lg text-muted-foreground">{global.short}</p>
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
          {global.locations.map((location, index) => (
            <motion.div
              key={location.city}
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-primary">{location.city}</h3>
              <p className="text-sm text-muted-foreground">{location.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
