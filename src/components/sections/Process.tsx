import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import processData from "../../../content/en/process.json";
import { ProcessContent } from "@/types/content";

const process = processData as ProcessContent;

export const Process = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-muted/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16 md:mb-24 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{process.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{process.short}</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line - hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-[27px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />
            
            <div className="space-y-4 md:space-y-6">
              {process.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex gap-4 md:gap-6 items-start">
                    {/* Number badge with gradient */}
                    <motion.div 
                      className="flex-shrink-0 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center font-bold text-white shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
                        <span className="text-lg">{step.id}</span>
                      </div>
                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                    </motion.div>
                    
                    {/* Content card */}
                    <motion.div 
                      className="flex-1 bg-gradient-to-br from-background to-secondary/10 rounded-xl p-6 md:p-8 border border-border/50 shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        {/* Decorative icon */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-4 h-4 border-2 border-primary rounded-full" />
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
