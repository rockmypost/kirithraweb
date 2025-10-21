import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard } from "./GlassCard";
import contactData from "../../content/en/contact.json";
import { ContactContent } from "@/types/content";
import { useToast } from "@/hooks/use-toast";

const contact = contactData as ContactContent;

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
      // Crear FormData para enviar como multipart/form-data
      const formDataToSend = new FormData();
      
      // Configuración de Web3Forms
      formDataToSend.append('access_key', 'e71f4a09-9bcb-4f8b-966f-af9c403b2f55');
      formDataToSend.append('subject', `Nueva consulta de ${formData.name} - ${formData.company}`);
      formDataToSend.append('from_name', 'Kirithra Global Website');
      formDataToSend.append('to', 'kirithraweb@gmail.com');
      formDataToSend.append('replyto', formData.email);
      
      // No enviamos campos sueltos para evitar duplicados en el correo
      
      // Bot check (protección anti-spam)
      formDataToSend.append('botcheck', '');
      
      // Crear mensaje estilo "TOP SECRET" con fuente typewriter
      const textMessage = `
┌─────────────────────────────────────────────────────────────┐
│  ████████ ████████  ██████  ████████ ████████ ████████      │
│  ██   ██ ██   ██  ██   ██    ██    ██   ██ ██   ██        │
│  ██████  ████████  ██████    ██    ████████ ████████        │
│  ██   ██ ██   ██  ██   ██    ██    ██   ██ ██   ██        │
│  ██████  ██   ██  ██████     ██    ██   ██ ██   ██        │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│  CLASSIFICATION: CONFIDENTIAL                               │
│  REPORT TYPE: CLIENT INQUIRY                                │
│  TIMESTAMP: ${new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC │
│  ═══════════════════════════════════════════════════════   │
└─────────────────────────────────────────────────────────────┘

┌─ CLIENT PROFILE ────────────────────────────────────────────┐
│                                                             │
│  SUBJECT: ${formData.name.padEnd(40)} │
│  EMAIL:   ${formData.email.padEnd(40)} │
│  COMPANY: ${formData.company.padEnd(40)} │
│  REGION:  ${(formData.jurisdictions || 'UNSPECIFIED').padEnd(40)} │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ MISSION BRIEFING ──────────────────────────────────────────┐
│                                                             │
│  OBJECTIVE (90-DAY WINDOW):                                 │
│  ${formData.targetMetric.split('\n').map(line => `│  ${line.padEnd(55)} │`).join('\n')} │
│                                                             │
${formData.context ? `│  ADDITIONAL INTELLIGENCE:                              │
│  ${formData.context.split('\n').map(line => `│  ${line.padEnd(55)} │`).join('\n')} │
│                                                             │
` : ''}└─────────────────────────────────────────────────────────────┘

┌─ CLASSIFICATION FOOTER ─────────────────────────────────────┐
│                                                             │
│  KIRITHRA GLOBAL STRATEGIC CONSULTING                       │
│  Excellence in global business architecture.                │
│                                                             │
│  © 2025 Kirithra | Multiple Jurisdictions                  │
│  Confidentiality and ethics by design.                     │
│                                                             │
│  REPORT GENERATED: ${new Date().toLocaleString('es-ES', {
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit', 
  hour: '2-digit', 
  minute: '2-digit'
}).replace(/\//g, '-')} | SOURCE: Web Contact Form            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
      `;
      
      // Agregar el mensaje de texto al formulario
      formDataToSend.append('message', textMessage);
      
      // Enviar formulario
      console.log('🚀 Enviando formulario a Web3Forms...');
      console.log('📋 Datos del formulario:', Object.fromEntries(formDataToSend.entries()));
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Resultado de Web3Forms:', result);

      if (result.success) {
        toast({
          title: "✅ Consulta enviada",
          description: "Hemos recibido tu consulta y te responderemos dentro de 48 horas.",
        });
        setFormData({});
      } else {
        console.error('❌ Error de Web3Forms:', result);
        toast({
          title: "⚠️ Error de envío",
          description: result.message || "Hubo un problema al enviar tu consulta.",
          variant: "destructive",
        });
      }
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
            <Label htmlFor={field.name} className="text-foreground">
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
