import footerData from "../../content/en/footer.json";
import { FooterContent } from "@/types/content";
import logo from "@/assets/logo.png";

const footer = footerData as FooterContent;

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12" style={{ backgroundColor: '#FCFCFB' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <img 
            src={logo} 
            alt="Kirithra" 
            className="h-20 w-auto" 
          />
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
