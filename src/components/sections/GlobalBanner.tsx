import { motion } from "framer-motion";
import globeImage from "@/assets/globe-banner.jpg";
import globalData from "../../../content/en/global.json";
import { GlobalContent } from "@/types/content";
import { WorldMap } from "@/components/WorldMap";

const global = globalData as GlobalContent;

export const GlobalBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Image - full height with contain to show everything */}
          <div className="absolute inset-0 bg-muted/5">
            <img 
              src={globeImage} 
              alt="Global presence - Crystal globe with golden bees symbolizing international reach and precision" 
              className="w-full h-full object-contain object-center"
            />
          </div>
          
          {/* WorldMap overlay - between image and city boxes */}
          <div className="absolute inset-0 opacity-40">
            <WorldMap locations={global.locations} />
          </div>
          
          {/* City boxes overlay */}
          <div className="absolute inset-0 flex items-start justify-center pt-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl px-4">
              {global.locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  className="bg-background/95 backdrop-blur-sm rounded-xl p-4 md:p-6 text-center space-y-2 border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-primary">{location.city}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{location.focus}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
