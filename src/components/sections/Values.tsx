import { motion } from "framer-motion";
import { HexagonGrid } from "@/components/HexagonGrid";
import valuesData from "../../../content/en/values.json";
import { ValuesContent } from "@/types/content";

const values = valuesData as ValuesContent;

export const Values = () => {
  return (
    <section className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-20 md:mb-32 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">{values.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">{values.short}</p>
        </motion.div>
        
        <HexagonGrid values={values.values} />
      </div>
    </section>
  );
};
