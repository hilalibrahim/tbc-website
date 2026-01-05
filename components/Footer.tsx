import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#0A0A0A] via-[#151515] to-[#0A0A0A] border-t border-[#BFBFBF]/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, #BFBFBF 1px, transparent 1px), linear-gradient(180deg, #BFBFBF 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column - Smaller Logo */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Logo Container - Much Smaller */}
                <div className="filter brightness-0 invert opacity-90">
                  <Image
                    src="/logotbc.png"
                    alt="The Big Connection"
                    width={100} // Reduced from 150
                    height={30} // Reduced from 60
                    className="h-auto w-auto"
                    priority
                  />
                </div>
              </div>
              {/* Tagline beside logo */}
              <div className="text-xs tracking-widest text-[#8C8C8C] uppercase hidden sm:block">
                CONNECTING GROWTH
              </div>
            </div>
            
            <p className="text-[#8C8C8C] text-sm leading-relaxed max-w-xs">
              Architecting digital growth through strategic connections and data-driven solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: '#' },
                { icon: <Linkedin className="w-4 h-4" />, href: '#' },
                { icon: <Youtube className="w-4 h-4" />, href: '#' },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10 text-[#BFBFBF] hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30 transition-all duration-300 hover:scale-105"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-widest text-[#D9D9D9] uppercase">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/portfolio', label: 'Case Studies' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[#8C8C8C] hover:text-[#D9D9D9] transition-all duration-300"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-widest text-[#D9D9D9] uppercase">Services</h4>
            <ul className="space-y-3">
              {[
                'Digital Strategy',
                'Performance Marketing',
                'Brand Development',
                'Content Creation',
                'Social Media',
                'Analytics & Insights'
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[#8C8C8C] hover:text-[#D9D9D9] transition-colors duration-300 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-widest text-[#D9D9D9] uppercase">Connect</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:hello@thebigconnection.com"
                  className="group flex items-center gap-3 text-[#8C8C8C] hover:text-[#D9D9D9] transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm">hello@thebigconnection.com</div>
                    <div className="text-xs text-[#737373]">Response within 24h</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+11234567890"
                  className="group flex items-center gap-3 text-[#8C8C8C] hover:text-[#D9D9D9] transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm">+1 (123) 456-7890</div>
                    <div className="text-xs text-[#737373]">Mon-Fri, 9AM-6PM EST</div>
                  </div>
                </Link>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#8C8C8C]">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm">123 Growth Avenue</div>
                    <div className="text-sm">Digital City, DC 10001</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-[#BFBFBF]/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold text-[#D9D9D9] mb-2">Stay Connected</h4>
              <p className="text-[#8C8C8C] text-sm">
                Subscribe to our newsletter for growth insights and updates.
              </p>
            </div>
            <div className="relative">
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 text-[#BFBFBF] placeholder-[#737373] focus:outline-none focus:border-[#D9D9D9]/50 focus:ring-1 focus:ring-[#D9D9D9]/20"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30 text-[#D9D9D9] font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  suppressHydrationWarning
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#BFBFBF]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#737373] text-sm text-center md:text-left">
              <p>© {currentYear} The Big Connection. All rights reserved.</p>
              <div className="flex items-center justify-center md:justify-start gap-6 mt-2">
                <Link href="/privacy" className="hover:text-[#8C8C8C] transition-colors duration-300 text-xs">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-[#8C8C8C] transition-colors duration-300 text-xs">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-[#8C8C8C] transition-colors duration-300 text-xs">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="text-xs text-[#737373]">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] animate-pulse"></div>
                Making meaningful connections since 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}