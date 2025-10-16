import { motion } from "framer-motion";
import { HexagonGrid } from "@/components/HexagonGrid";
import valuesData from "../../../content/en/values.json";
import { ValuesContent } from "@/types/content";

const values = valuesData as ValuesContent;

export const Values = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{values.title}</h2>
          <p className="text-lg text-muted-foreground">{values.short}</p>
        </motion.div>
        
        <HexagonGrid values={values.values} />
      </div>
    </section>
  );
};
