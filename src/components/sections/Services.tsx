import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import servicesData from "../../../content/en/services.json";
import { ServicesContent } from "@/types/content";

const services = servicesData as ServicesContent;

export const Services = () => {
  return (
    <section id="services" className="py-32 md:py-48 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-20 md:mb-32 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">{services.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">{services.short}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {services.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard hover className="h-full flex flex-col p-8 md:p-10 group bg-card">
                <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.short}</p>
                <p className="text-sm text-muted-foreground/70 mt-auto leading-relaxed">
                  {service.content}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
