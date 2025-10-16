import { useEffect } from "react";
import siteData from "../../content/en/site.json";
import servicesData from "../../content/en/services.json";
import faqData from "../../content/en/faq.json";

export const SEOHead = () => {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteData.title,
      description: siteData.short,
      url: "https://kirithra.ai",
      email: siteData.contactEmail,
      address: siteData.offices.map(office => ({
        "@type": "PostalAddress",
        addressLocality: office.city,
      })),
    };

    // WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteData.title,
      url: "https://kirithra.ai",
      description: siteData.tagline,
    };

    // Service Schemas
    const serviceSchemas = servicesData.services.map(service => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.short,
      provider: {
        "@type": "Organization",
        name: siteData.title,
      },
    }));

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.items.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    // Inject schemas into head
    const schemas = [organizationSchema, websiteSchema, ...serviceSchemas, faqSchema];
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `schema-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if (script) document.head.removeChild(script);
      });
    };
  }, []);

  return null;
};
