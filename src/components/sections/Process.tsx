import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import processData from "@/content/en/process.json";
import { ProcessContent } from "@/types/content";

const process = processData as ProcessContent;

export const Process = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{process.title}</h2>
          <p className="text-lg text-muted-foreground">{process.short}</p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {process.steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex gap-6 items-start"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-primary">
                {step.id}
              </div>
              
              <GlassCard className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </GlassCard>
              
              {index < process.steps.length - 1 && (
                <div className="absolute left-[23px] top-14 w-0.5 h-20 bg-gradient-to-b from-primary to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
