import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import lineageData from "../../../content/en/lineage.json";
import { LineageContent } from "@/types/content";

const lineage = lineageData as LineageContent;

export const TechnologyLineage = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-1 h-20 bg-gradient-to-b from-primary to-accent rounded-full" />
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">{lineage.title}</h2>
                <p className="text-lg text-muted-foreground">{lineage.short}</p>
                <p className="text-base text-foreground/80 font-mono text-sm leading-relaxed">
                  {lineage.content}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
