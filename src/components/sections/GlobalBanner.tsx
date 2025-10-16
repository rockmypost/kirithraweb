import { motion } from "framer-motion";
import globeImage from "@/assets/globe-banner.jpg";

export const GlobalBanner = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Image with overlay */}
          <div className="absolute inset-0">
            <img 
              src={globeImage} 
              alt="Global presence - Crystal globe with golden bees symbolizing international reach and precision" 
              className="w-full h-full object-cover object-bottom"
            />
            {/* Subtle dark overlay for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>
          
          {/* Optional overlay content - can be customized */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start">
            <div className="text-center md:text-left md:ml-16 p-8">
              {/* Add any text overlay here if needed */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
