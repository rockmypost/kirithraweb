import { motion } from "framer-motion";
import globeImage from "@/assets/globe-banner.jpg";
import globalData from "../../../content/en/global.json";
import { GlobalContent } from "@/types/content";

const global = globalData as GlobalContent;

export const GlobalBanner = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
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
        </motion.div>
      </div>
    </section>
  );
};
