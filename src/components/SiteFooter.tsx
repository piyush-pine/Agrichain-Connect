
import Link from 'next/link';
import { Leaf, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <Leaf className="h-7 w-7" />
              <span>AgriChain</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Blockchain-powered transparent supply chain platform for Indian agriculture and MSMEs.
            </p>
            <div className="flex space-x-4 mt-4">
              <FooterLink href="#"><Twitter size={18} /></FooterLink>
              <FooterLink href="#"><Facebook size={18} /></FooterLink>
              <FooterLink href="#"><Linkedin size={18} /></FooterLink>
              <FooterLink href="#"><Instagram size={18} /></FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">PLATFORM</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">API</FooterLink>
              <FooterLink href="#">Integrations</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">RESOURCES</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Guides</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Support</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">COMPANY</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} AgriChain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
