'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { 
      href: '/services', 
      label: 'Solutions',
      submenu: [
        { href: '/services#performance', label: 'Performance Marketing' },
        { href: '/services#branding', label: 'Brand Strategy' },
        { href: '/services#growth', label: 'Growth Consulting' },
        { href: '/services#analytics', label: 'Data & Analytics' }
      ]
    },
    { href: '/portfolio', label: 'Case Studies' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#BFBFBF]/10">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex h-16 sm:h-[4.5rem] md:h-20 items-center justify-between">
            {/* Logo with White Version */}
            <Link 
              href="/" 
              className="flex items-center group"
              onMouseEnter={() => setHoveredLink('logo')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div className="relative">
                {/* Logo glow effect */}
                <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#FF6B35]/20 to-[#FF8E3C]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Logo Container with White Filter */}
                <div className="relative z-10 filter brightness-0 invert contrast-100 group-hover:brightness-100 group-hover:invert-0 group-hover:contrast-125 transition-all duration-300">
                  <Image
                    src="/logotbc.png"
                    alt="The Big Connection"
                    width={180}
                    height={60}
                    className="h-8 w-auto sm:h-9 md:h-10 lg:h-10 xl:h-11"
                    priority
                  />
                </div>
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] via-[#FF8E3C] to-[#FF6B35] opacity-0 group-hover:opacity-20 rounded transition-opacity duration-300 mix-blend-overlay"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
              {navLinks.map((link, index) => (
                <div key={`nav-${index}-${link.href}-${link.label}`} className="relative group">
                  <Link
                    href={link.href}
                    className="text-[#BFBFBF]/80 hover:text-white transition-all duration-300 text-xs xl:text-sm tracking-wide font-medium relative py-2"
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#FF6B35] to-[#FF8E3C] transition-all duration-300 ${hoveredLink === link.label ? 'opacity-100 translate-y-1' : 'opacity-0 translate-y-0'}`}></span>
                  </Link>
                  
                  {/* Submenu for Solutions */}
                  {link.submenu && (
                    <div className="absolute top-full left-0 mt-2 w-56 xl:w-64 bg-gradient-to-b from-[#0A0A0A] to-[#120A0A] backdrop-blur-xl border border-[#BFBFBF]/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <div className="p-3 xl:p-4">
                        {link.submenu.map((item, subIndex) => (
                          <Link
                            key={`${link.href}-${link.label}-submenu-${subIndex}-${item.href}-${item.label}`}
                            href={item.href}
                            className="block py-2.5 xl:py-3 px-3 xl:px-4 text-[#BFBFBF]/70 hover:text-white hover:bg-gradient-to-r from-[#FF6B35]/5 to-[#FF8E3C]/5 rounded-lg transition-all duration-300 group/item"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs xl:text-sm">{item.label}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* CTA Button */}
              <div className="ml-2 xl:ml-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-1.5 xl:gap-2 bg-gradient-to-r from-[#FF6B35] via-[#FF8E3C] to-[#FF6B35] text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
                >
                  <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                  <span className="hidden xl:inline">Get Started</span>
                  <span className="xl:hidden">Start</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF8E3C] via-[#FF6B35] to-[#FF8E3C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-[#BFBFBF]/20 bg-[#0A0A0A]/50 backdrop-blur-sm text-[#BFBFBF] hover:text-white hover:border-[#FF8E3C]/30 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-full sm:w-80 max-w-sm bg-gradient-to-b from-[#0A0A0A] to-[#120A0A] border-l border-[#BFBFBF]/10 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col overflow-y-auto">
            {/* Mobile Logo - White Version */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <div className="filter brightness-0 invert contrast-100">
                <Image
                  src="/logotbc.png"
                  alt="The Big Connection"
                  width={200}
                  height={70}
                  className="h-12 w-auto sm:h-16 md:h-auto"
                />
              </div>
            </div>
            
            {/* Mobile Navigation Links */}
            <nav className="flex-1 space-y-4 sm:space-y-5 md:space-y-6">
              {navLinks.map((link, index) => (
                <div key={`mobile-nav-${index}-${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base sm:text-lg text-[#BFBFBF] hover:text-white py-2.5 sm:py-3 border-b border-[#BFBFBF]/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {link.submenu && (
                    <div className="ml-3 sm:ml-4 mt-2 space-y-1.5 sm:space-y-2">
                      {link.submenu.map((item, subIndex) => (
                        <Link
                          key={`${link.href}-${link.label}-submenu-${subIndex}-${item.href}-${item.label}`}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm sm:text-base text-[#BFBFBF]/60 hover:text-[#FF8E3C] py-1.5 sm:py-2 transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Mobile CTA */}
            <div className="pt-6 sm:pt-8 border-t border-[#BFBFBF]/10 mt-auto">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="group relative inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#FF6B35] via-[#FF8E3C] to-[#FF6B35] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Schedule a Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8E3C] via-[#FF6B35] to-[#FF8E3C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              </Link>
              
              {/* Contact Info */}
              <div className="mt-4 sm:mt-6 text-center">
                <div className="text-xs sm:text-sm text-[#BFBFBF]/50">Connect with us</div>
                <div className="text-xs sm:text-sm text-[#FF8E3C] mt-1 break-all">hello@thebigconnection.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient for CTA buttons */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
}