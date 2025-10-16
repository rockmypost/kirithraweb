import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import essenceData from "../../../content/en/essence.json";
import { EssenceContent } from "@/types/content";
import honeycombPattern from "@/assets/honeycomb-pattern.jpg";

const NetworkGraph = lazy(() => import("@/components/NetworkGraph").then(m => ({ default: m.NetworkGraph })));

const essence = essenceData as EssenceContent;

export const Essence = () => {
  return (
    <section id="essence" className="py-32 md:py-48 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-6 order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
              {essence.title}
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
              {essence.short}
            </p>
            
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
              {essence.content}
            </p>
          </motion.div>
          
          <motion.div
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-muted/20">
              <Suspense fallback={
                <div className="w-full h-full bg-muted/10 flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Loading...</div>
                </div>
              }>
                <NetworkGraph />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
