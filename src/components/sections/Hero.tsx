import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoneycombBackground } from "@/components/HoneycombBackground";
import heroData from "../../../content/en/hero.json";
import { HeroContent } from "@/types/content";
import heroBg from "@/assets/hero-bg.jpg";

const hero = heroData as HeroContent;

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Minimal honeycomb pattern - very subtle */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <HoneycombBackground />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-10 py-16 md:py-24">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.title}
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.short}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.ctas.map((cta, index) => (
              <Button
                key={index}
                asChild
                size="lg"
                variant={cta.variant === "primary" ? "default" : "ghost"}
                className={
                  cta.variant === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium transition-all"
                    : "text-primary hover:bg-transparent hover:text-primary/80 rounded-full px-8 py-6 text-base font-medium"
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
