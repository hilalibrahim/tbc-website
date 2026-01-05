'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  headline: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  variant?: 'light' | 'dark';
}

export default function CTA({
  headline,
  description,
  primaryCtaText = 'Get Started',
  primaryCtaLink = '/contact',
  secondaryCtaText,
  secondaryCtaLink,
  variant = 'dark',
}: CTAProps) {
  const isDark = variant === 'dark';
  
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A]">
      {/* Hero-style Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#120A0A] to-[#0A0A0A]"></div>
        
        {/* Connection pattern overlay - Monochrome */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #BFBFBF 1px, transparent 1px),
                           radial-gradient(circle at 80% 70%, #8C8C8C 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}></div>
        
        {/* Gradient overlay - Monochrome */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#BFBFBF]/15 via-[#8C8C8C]/10 to-[#737373]/15 mix-blend-overlay opacity-20"></div>
        
        {/* Volumetric lighting - Monochrome */}
        <div className="absolute top-1/4 -right-10 sm:-right-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-l from-[#D9D9D9]/10 to-transparent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 -left-10 sm:-left-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-r from-[#8C8C8C]/10 to-transparent rounded-full blur-3xl opacity-15"></div>
        
        {/* Connection Lines - Monochrome */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,100 Q500,50 980,200" stroke="#D9D9D9" strokeWidth="1" fill="none" opacity="0.2" />
            <path d="M100,300 Q400,150 900,400" stroke="#BFBFBF" strokeWidth="1" fill="none" opacity="0.15" />
            <path d="M50,500 Q600,300 950,600" stroke="#8C8C8C" strokeWidth="1" fill="none" opacity="0.1" />
          </svg>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">
                Ready To Connect
              </span>
              <Sparkles className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            
            <h2 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                {headline}
              </span>
            </h2>
            
            {description && (
              <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-[#BFBFBF]">
                {description}
              </p>
            )}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA - Monochrome Gradient */}
            <Link
              href={primaryCtaLink}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] text-[#D9D9D9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden border border-[#D9D9D9]/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                {primaryCtaText}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x rounded-xl"></div>
            </Link>
            
            {/* Secondary CTA */}
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#BFBFBF]/20 bg-[#0A0A0A]/90 backdrop-blur-sm text-[#BFBFBF] text-sm sm:text-base transition-all duration-300 hover:bg-[#1A1A1A] hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30"
              >
                {secondaryCtaText}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Animated gradient */}
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
    </section>
  );
}