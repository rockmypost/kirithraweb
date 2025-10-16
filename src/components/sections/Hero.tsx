import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoneycombBackground } from "@/components/HoneycombBackground";
import heroData from "../../../content/en/hero.json";
import { HeroContent } from "@/types/content";
import heroBg from "@/assets/hero-bg.jpg";

const hero = heroData as HeroContent;

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Honeycomb overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <HoneycombBackground />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-primary" />
              Global Business Architecture
              <div className="h-px w-8 bg-primary" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {hero.title}
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-foreground/70 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {hero.short}
          </motion.p>
          
          <motion.p
            className="text-sm md:text-base text-foreground/60 italic max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {hero.etymology}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
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
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_40px_rgba(255,107,0,0.6)] transition-all px-8 py-6 text-lg"
                    : "border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all px-8 py-6 text-lg backdrop-blur-sm"
                }
              >
                <a href={cta.href}>{cta.label}</a>
              </Button>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
