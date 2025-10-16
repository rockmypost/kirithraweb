import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import essenceData from "../../../content/en/essence.json";
import { EssenceContent } from "@/types/content";
import honeycombPattern from "@/assets/honeycomb-pattern.jpg";

const NetworkGraph = lazy(() => import("@/components/NetworkGraph").then(m => ({ default: m.NetworkGraph })));

const essence = essenceData as EssenceContent;

export const Essence = () => {
  return (
    <section id="essence" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-6 order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block">
              <div className="text-primary text-xs font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-primary" />
                Our Foundation
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {essence.title}
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              {essence.short}
            </p>
            
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed border-l-4 border-primary pl-6 bg-white/50 py-4 rounded-r-lg">
              {essence.content}
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {["Adaptive Systems", "Global Intelligence", "Compounding Performance", "Strategic Control"].map((feature, i) => (
                <motion.div
                  key={feature}
                  className="glass-card p-4 text-center hover:shadow-xl hover:shadow-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-primary text-2xl font-bold mb-1">0{i + 1}</div>
                  <div className="text-sm font-medium text-foreground">{feature}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Network graph */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
              <Suspense fallback={
                <div className="w-full h-full bg-blue-50/20 animate-pulse flex items-center justify-center">
                  <div className="text-foreground/50 text-sm">Loading visualization...</div>
                </div>
              }>
                <NetworkGraph />
              </Suspense>
            </div>

            {/* Decorative hexagons */}
            <div className="absolute -top-8 -right-8 w-24 h-24 border-4 border-primary/40 rotate-12 shadow-lg"
                 style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/30 -rotate-12 shadow-lg"
                 style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
