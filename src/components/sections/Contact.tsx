import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import contactData from "../../../content/en/contact.json";
import { ContactContent } from "@/types/content";

const contact = contactData as ContactContent;

export const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">{contact.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{contact.short}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};
