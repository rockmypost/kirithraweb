import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import essenceData from "@/content/en/essence.json";
import { EssenceContent } from "@/types/content";

const NetworkGraph = lazy(() => import("@/components/NetworkGraph").then(m => ({ default: m.NetworkGraph })));

const essence = essenceData as EssenceContent;

export const Essence = () => {
  return (
    <section id="essence" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{essence.title}</h2>
            <p className="text-lg text-muted-foreground">{essence.short}</p>
            <p className="text-base text-foreground/80">{essence.content}</p>
          </motion.div>
          
          <motion.div
            className="h-[400px] rounded-xl overflow-hidden glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<div className="w-full h-full bg-muted/10 animate-pulse" />}>
              <NetworkGraph />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
