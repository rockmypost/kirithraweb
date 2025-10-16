export interface ContentBase {
  id: string;
  title: string;
  short: string;
  lastUpdated: string;
}

export interface SiteContent extends ContentBase {
  tagline: string;
  contactEmail: string;
  offices: Office[];
  jurisdictionsCount: number;
}

export interface Office {
  city: string;
  lat: number;
  lon: number;
  focus: string;
}

export interface HeroContent extends ContentBase {
  etymology: string;
  ctas: CTA[];
  background: { honeycombSVG: boolean };
}

export interface CTA {
  label: string;
  variant: "primary" | "ghost";
  href: string;
}

export interface EssenceContent extends ContentBase {
  content: string;
  visualHint: string;
}

export interface LineageContent extends ContentBase {
  content: string;
}

export interface ValuesContent extends ContentBase {
  values: Value[];
}

export interface Value {
  id: number;
  title: string;
  description: string;
}

export interface ServicesContent extends ContentBase {
  services: Service[];
}

export interface Service {
  id: string;
  title: string;
  short: string;
  content: string;
}

export interface ProofContent extends ContentBase {
  items: ProofItem[];
}

export interface ProofItem {
  label: string;
  value: string;
  note: string;
}

export interface ProcessContent extends ContentBase {
  steps: ProcessStep[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

export interface GlobalContent extends ContentBase {
  locations: Office[];
}

export interface ContactContent extends ContentBase {
  fields: ContactField[];
  submit: { label: string };
  contactEmail: string;
}

export interface ContactField {
  name: string;
  label: string;
  required: boolean;
  type?: string;
}

export interface FAQContent extends ContentBase {
  items: FAQItem[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FooterContent {
  id: string;
  company: string;
  tagline: string;
  copyright: string;
  legal: string;
  lastUpdated: string;
}
