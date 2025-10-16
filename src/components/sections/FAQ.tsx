import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "../../../content/en/faq.json";
import { FAQContent } from "@/types/content";

const faq = faqData as FAQContent;

export const FAQ = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{faq.title}</h2>
          <p className="text-lg text-muted-foreground">{faq.short}</p>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card px-6 border-0">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
