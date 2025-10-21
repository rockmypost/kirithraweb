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
      formDataToSend.append('redirect', 'false');
      formDataToSend.append('honeypot', '');
      
      // Campos del formulario
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('jurisdictions', formData.jurisdictions || 'No especificado');
      formDataToSend.append('targetMetric', formData.targetMetric);
      formDataToSend.append('context', formData.context || 'No proporcionado');
      
      // Bot check (protección anti-spam)
      formDataToSend.append('botcheck', '');
      
      // Crear mensaje HTML para el email
      const htmlMessage = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #FCFCFB 0%, #FFF5F0 100%); padding: 30px; text-align: center; border-bottom: 2px solid #FF6B00;">
            <img src="https://kirithra.ai/assets/logo.png" alt="Kirithra" style="height: 60px; width: auto; margin: 0 auto 15px; display: block;" />
            <p style="color: #718096; margin: 0; font-size: 16px; font-weight: 500;">Nueva Consulta de Contacto</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <!-- Información del Cliente -->
            <h2 style="color: #FF6B00; font-size: 20px; font-weight: 600; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #E2E8F0;">Información del Cliente</h2>
            
            <div style="margin: 15px 0; padding: 15px; background: #F7FAFC; border-radius: 12px; border-left: 4px solid #FF6B00;">
              <strong style="color: #4A5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Nombre:</strong><br>
              <span style="color: #2D3748; font-size: 16px;">${formData.name}</span>
            </div>
            
            <div style="margin: 15px 0; padding: 15px; background: #F7FAFC; border-radius: 12px; border-left: 4px solid #FF6B00;">
              <strong style="color: #4A5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Email:</strong><br>
              <span style="color: #2D3748; font-size: 16px;">${formData.email}</span>
            </div>
            
            <div style="margin: 15px 0; padding: 15px; background: #F7FAFC; border-radius: 12px; border-left: 4px solid #FF6B00;">
              <strong style="color: #4A5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Empresa:</strong><br>
              <span style="color: #2D3748; font-size: 16px;">${formData.company}</span>
            </div>
            
            <div style="margin: 15px 0; padding: 15px; background: #F7FAFC; border-radius: 12px; border-left: 4px solid #FF6B00;">
              <strong style="color: #4A5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Jurisdicciones:</strong><br>
              <span style="color: #2D3748; font-size: 16px;">${formData.jurisdictions || 'No especificado'}</span>
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background: linear-gradient(90deg, transparent, #FF6B00, transparent); margin: 30px 0;"></div>
            
            <!-- Detalles de la Consulta -->
            <h2 style="color: #FF6B00; font-size: 20px; font-weight: 600; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #E2E8F0;">Detalles de la Consulta</h2>
            
            <div style="background: linear-gradient(135deg, #FFF5F0, #FFE4D6); border: 1px solid #FF6B00; border-radius: 16px; padding: 20px; margin: 20px 0;">
              <strong style="color: #4A5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Métrica Objetivo (90 días):</strong><br>
              <span style="color: #2D3748; font-size: 16px; white-space: pre-line;">${formData.targetMetric}</span>
            </div>
            
            ${formData.context ? `
              <div style="background: linear-gradient(135deg, #FFF5F0, #FFE4D6); border: 1px solid #FF6B00; border-radius: 16px; padding: 20px; margin: 20px 0;">
                <strong style="color: #4A5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Contexto Adicional:</strong><br>
                <span style="color: #2D3748; font-size: 16px; white-space: pre-line;">${formData.context}</span>
              </div>
            ` : ''}
          </div>
          
          <!-- Footer -->
          <div style="background: #F0F0F0; padding: 20px; text-align: center; border-top: 1px solid #E2E8F0;">
            <img src="https://kirithra.ai/assets/logo.png" alt="Kirithra" style="height: 50px; width: auto; margin: 0 auto 15px; display: block;" />
            <p style="color: #718096; margin: 0 0 15px; font-size: 14px;">Excellence in global business architecture.</p>
            <p style="color: #718096; margin: 5px 0; font-size: 12px;">© 2025 Kirithra</p>
            <p style="color: #718096; margin: 5px 0; font-size: 12px;">Registered in multiple jurisdictions. Confidentiality and ethics by design.</p>
            <div style="margin-top: 20px;">
              <a href="mailto:${formData.email}" style="display: inline-block; background: linear-gradient(135deg, #FF6B00, #FF8C00); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);">Responder al Cliente</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #9CA3AF;">
              Este mensaje fue enviado desde el formulario de contacto de Kirithra Global<br>
              Fecha: ${new Date().toLocaleString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <div style="display: none;">
              <!-- Ocultar el footer de Web3Forms -->
            </div>
          </div>
        </div>
      `;
      
      // Agregar el mensaje HTML al formulario
      formDataToSend.append('message', htmlMessage);
      
      // Enviar formulario
      console.log('Enviando formulario a Web3Forms...');
      console.log('Datos del formulario:', Object.fromEntries(formDataToSend.entries()));
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('Respuesta del servidor:', response.status, response.statusText);
      
      const result = await response.json();
      console.log('Resultado de Web3Forms:', result);

      if (result.success) {
        toast({
          title: "Consulta enviada",
          description: "Hemos recibido tu consulta y te responderemos dentro de 48 horas.",
        });
        setFormData({});
      } else {
        console.error('Error de Web3Forms:', result);
        throw new Error(result.message || 'Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar tu consulta. Por favor, inténtalo de nuevo.",
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
