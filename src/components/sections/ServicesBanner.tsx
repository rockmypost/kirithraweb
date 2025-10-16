import { motion } from "framer-motion";
import servicesBannerImage from "@/assets/services-banner.jpg";

export const ServicesBanner = () => {
  return (
    <section className="w-full">
      <motion.div
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={servicesBannerImage} 
          alt="Global business presence - Crystal globe with golden bees on executive desk" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};
