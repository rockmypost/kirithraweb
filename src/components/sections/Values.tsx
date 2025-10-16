import { motion } from "framer-motion";
import { HexagonGrid } from "@/components/HexagonGrid";
import valuesData from "../../../content/en/values.json";
import { ValuesContent } from "@/types/content";

const values = valuesData as ValuesContent;

export const Values = () => {
  return (
    <section className="py-12 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-32 space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">{values.title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">{values.short}</p>
        </motion.div>
        
        <HexagonGrid values={values.values} />
      </div>
    </section>
  );
};
