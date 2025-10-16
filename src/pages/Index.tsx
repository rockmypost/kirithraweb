import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Hero } from "@/components/sections/Hero";
import { Essence } from "@/components/sections/Essence";
import { TechnologyLineage } from "@/components/sections/TechnologyLineage";
import { Values } from "@/components/sections/Values";
import { Services } from "@/components/sections/Services";
import { Proof } from "@/components/sections/Proof";
import { Process } from "@/components/sections/Process";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { GlobalBanner } from "@/components/sections/GlobalBanner";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";

const Index = () => {
  return (
    <>
      <SEOHead />
      <Header />
      <main>
        <Hero />
        <Essence />
        <TechnologyLineage />
        <Values />
        <Services />
        <Proof />
        <Process />
        <GlobalPresence />
        <GlobalBanner />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Index;
