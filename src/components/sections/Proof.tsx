import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import proofData from "../../../content/en/proof.json";
import { ProofContent } from "@/types/content";

const proof = proofData as ProofContent;

export const Proof = () => {
  return (
    <section id="proof" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{proof.title}</h2>
          <p className="text-lg text-muted-foreground">{proof.short}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {proof.items.map((item, index) => (
            <AnimatedCounter
              key={index}
              value={item.value}
              label={item.label}
              note={item.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
