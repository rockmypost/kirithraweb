import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard } from "./GlassCard";
import contactData from "../../content/en/contact.json";
import { ContactContent } from "@/types/content";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const contact = contactData as ContactContent;

// Configuración EmailJS
const SERVICE_ID = 'service_p495w0v';
const TEMPLATE_ID = 'template_tz2pgva';
const PUBLIC_KEY = 'jPGe2iO8yUjTeBQqH';

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation
    const requiredFields = contact.fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !formData[f.name]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: '🍯 KIRITHRA.AI',
        to_email: 'kirithraweb@gmail.com',
        reply_to: formData.email,
        subject: `Nueva consulta de ${formData.name} - ${formData.company}`,
        message: `
🍯 KIRITHRA.AI - NEW INQUIRY
═══════════════════════════════════════

👤 NAME: ${formData.name.toUpperCase()}
✉️ EMAIL: ${formData.email.toUpperCase()}
🏢 COMPANY: ${formData.company.toUpperCase()}
📍 JURISDICTION(S): ${(formData.jurisdictions || 'NOT SPECIFIED').toUpperCase()}

═══════════════════════════════════════
🎯 TARGET METRIC (90 DAYS):
${formData.targetMetric.toUpperCase()}

${formData.context ? `📝 ADDITIONAL CONTEXT:\n${formData.context.toUpperCase()}\n` : ''}═══════════════════════════════════════
📅 SUBMITTED: ${new Date().toLocaleString('es-ES', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
}).replace(/\//g, '-')}
`
      };

      console.log('🚀 Enviando formulario con EmailJS...');
      console.log('📋 Parámetros del template:', templateParams);
      
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      console.log('✅ Email enviado exitosamente');
      
      toast({
        title: "✅ Consulta enviada",
        description: "Hemos recibido tu consulta y te responderemos dentro de 48 horas.",
      });
      setFormData({});
      
    } catch (error) {
      console.error('❌ Error sending email:', error);
      toast({
        title: "❌ Error de conexión",
        description: "No se pudo conectar con el servidor. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {contact.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-primary">
              {field.label} {field.required && <span className="text-primary">*</span>}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                required={field.required}
                className="bg-muted/50 border-border"
                rows={4}
              />
            ) : (
              <Input
                id={field.name}
                type={field.name === "email" ? "email" : "text"}
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                required={field.required}
                className="bg-muted/50 border-border"
              />
            )}
          </div>
        ))}
        
        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-primary text-primary-foreground hover:opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : contact.submit.label}
        </Button>
      </form>
    </GlassCard>
  );
};