import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoneycombBackground } from "@/components/HoneycombBackground";
import heroData from "../../../content/en/hero.json";
import { HeroContent } from "@/types/content";

const hero = heroData as HeroContent;

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HoneycombBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {hero.title}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {hero.short}
          </motion.p>
          
          <motion.p
            className="text-sm text-muted-foreground italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {hero.etymology}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {hero.ctas.map((cta, index) => (
              <Button
                key={index}
                asChild
                size="lg"
                variant={cta.variant === "primary" ? "default" : "outline"}
                className={
                  cta.variant === "primary"
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border-primary text-primary hover:bg-primary/10"
                }
              >
                <a href={cta.href}>{cta.label}</a>
              </Button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
