import footerData from "../../content/en/footer.json";
import { FooterContent } from "@/types/content";

const footer = footerData as FooterContent;

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-xl font-semibold text-gradient-gold">{footer.company}</h3>
          <p className="text-sm text-muted-foreground max-w-md">{footer.tagline}</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>{footer.copyright}</p>
            <p>{footer.legal}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
