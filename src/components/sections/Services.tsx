import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import servicesData from "@/content/en/services.json";
import { ServicesContent } from "@/types/content";

const services = servicesData as ServicesContent;

export const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{services.title}</h2>
          <p className="text-lg text-muted-foreground">{services.short}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard hover className="h-full space-y-4">
                <h3 className="text-xl font-semibold text-gradient-gold">{service.title}</h3>
                <p className="text-sm text-foreground/80">{service.short}</p>
                <p className="text-xs text-muted-foreground">{service.content}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
