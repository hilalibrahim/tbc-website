'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, BarChart3, Target, Zap, Network, Link2 } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedSection from '@/components/AnimatedSection';

interface HeroProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface DotPosition {
  top: number;
  left: number;
}

interface LinePosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dur: number;
}

export default function Hero({ 
  headline, 
  subheadline, 
  ctaText = 'Schedule Strategy Call',
  ctaLink = '/contact' 
}: HeroProps) {
  const [dotPositions, setDotPositions] = useState<DotPosition[]>([]);
  const [linePositions, setLinePositions] = useState<LinePosition[]>([]);

  useEffect(() => {
    // Generate random positions only on client side
    setDotPositions(
      Array.from({ length: 12 }, () => ({
        top: 20 + Math.random() * 60,
        left: 10 + Math.random() * 80,
      }))
    );

    setLinePositions(
      Array.from({ length: 8 }, () => ({
        x1: 15 + Math.random() * 30,
        y1: 20 + Math.random() * 30,
        x2: 60 + Math.random() * 30,
        y2: 60 + Math.random() * 30,
        dur: 2 + Math.random() * 3,
      }))
    );
  }, []);
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, #BFBFBF 1px, transparent 1px), linear-gradient(180deg, #BFBFBF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-20 pb-12 sm:pb-16 lg:pb-0">
        {/* Agency Header */}
        <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 sm:mt-12 lg:mt-16 mb-0">
          <AnimatedText delay={0.1} className="flex items-center gap-2">
            <Link2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#D9D9D9]" />
            <div className="text-xl sm:text-2xl font-bold">
              <span className="text-[#D9D9D9]">THE BIG</span>
              <span className="bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent ml-2">
                CONNECTION
              </span>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.2} className="text-xs sm:text-sm text-[#8C8C8C] tracking-widest hidden sm:block">CONNECTING BRANDS TO GROWTH</AnimatedText>
        </AnimatedSection>
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center -mt-2">
          {/* Left Column - Strategy & Growth Focus */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Agency Value Proposition */}
            <AnimatedText delay={0.2} className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Digital Growth Architects</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D9D9D9]"></div>
            </AnimatedText>
            
            {/* Headline */}
            <AnimatedText as="h1" delay={0.3} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                {headline}
              </span>
            </AnimatedText>
            
            {/* Subheadline */}
            {subheadline && (
              <AnimatedText as="p" delay={0.4} className="text-lg sm:text-xl text-[#BFBFBF] leading-relaxed max-w-2xl">
                {subheadline}
              </AnimatedText>
            )}
            
            {/* CTA Section */}
            <AnimatedSection delay={0.5} className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href={ctaLink}
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden border border-[#D9D9D9]/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaText}
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                </Link>
                
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#BFBFBF]/20 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#BFBFBF] text-sm sm:text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1A1A1A] hover:to-[#0A0A0A] hover:border-[#D9D9D9]/30"
                >
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>View Portfolio</span>
                </Link>
              </div>
              
              {/* Success Metrics */}
              {/* <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-[#BFBFBF]/10">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF8E3C] to-[#FF6B35] bg-clip-text text-transparent">250+</div>
                  <div className="text-xs sm:text-sm text-[#BFBFBF]/60 mt-1">Brands Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF8E3C] to-[#FF6B35] bg-clip-text text-transparent">3.2x</div>
                  <div className="text-xs sm:text-sm text-[#BFBFBF]/60 mt-1">Avg. Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF8E3C] to-[#FF6B35] bg-clip-text text-transparent">98%</div>
                  <div className="text-xs sm:text-sm text-[#BFBFBF]/60 mt-1">Client Retention</div>
                </div>
              </div> */}
            </AnimatedSection>
          </div>
          
          {/* Right Column - Connection Visualization */}
          <AnimatedCard delay={0.6} className="lg:col-span-6 relative mt-8 lg:mt-0">
            {/* Main Visualization Container */}
            <div className="relative">
              {/* Connection Network Background */}
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-[#FF6B35]/10 via-[#0A0A0A]/20 to-[#C44536]/10 rounded-3xl blur-2xl opacity-20"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-2xl border border-[#BFBFBF]/10 overflow-hidden backdrop-blur-sm">
                {/* Network Visualization Header */}
                <div className="p-4 sm:p-6 border-b border-[#BFBFBF]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] animate-pulse"></div>
                      <span className="text-base sm:text-lg font-semibold text-[#D9D9D9]">Growth Network</span>
                    </div>
                    <div className="text-xs sm:text-sm text-[#8C8C8C] font-medium">Live Connections</div>
                  </div>
                </div>
                
                {/* Network Image with Overlay */}
                <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] overflow-hidden">
                  <Image
                    src="/assets/heroimagetbc.png"
                    alt="The Big Connection - Digital Growth Network"
                    fill
                    className="object-cover object-center contrast-110 brightness-105 saturate-110"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Network Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D9D9D9]/5 via-transparent to-[#BFBFBF]/5 mix-blend-overlay"></div>
                  
                  {/* Animated Connection Dots */}
                  <div className="absolute inset-0">
                    {dotPositions.map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full border-2 border-[#D9D9D9]/30 bg-[#0A0A0A]/80 backdrop-blur-sm"
                        style={{
                          top: `${pos.top}%`,
                          left: `${pos.left}%`,
                        }}
                      >
                        <div className="absolute inset-0 animate-ping rounded-full bg-[#D9D9D9]/10"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Connection Lines Animation */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {linePositions.map((line, i) => (
                      <line
                        key={i}
                        x1={`${line.x1}%`}
                        y1={`${line.y1}%`}
                        x2={`${line.x2}%`}
                        y2={`${line.y2}%`}
                        stroke="url(#gradient)"
                        strokeWidth="1"
                        opacity="0.2"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.1;0.4;0.1"
                          dur={`${line.dur}s`}
                          repeatCount="indefinite"
                        />
                      </line>
                    ))}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D9D9D9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#BFBFBF" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Floating Brand Nodes */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#0A0A0A]/90 to-[#0A0A0A]/70 backdrop-blur-md border border-[#BFBFBF]/20 rounded-lg">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#D9D9D9]" />
                      <span className="text-xs sm:text-sm text-[#BFBFBF]">Active Network</span>
                    </div>
                  </div>
                </div>
                
                {/* Performance Dashboard */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">+84%</div>
                      <div className="text-[10px] sm:text-xs text-[#8C8C8C] mt-1 uppercase tracking-wider">Engagement Lift</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">+127%</div>
                      <div className="text-[10px] sm:text-xs text-[#8C8C8C] mt-1 uppercase tracking-wider">Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#8C8C8C] to-[#737373] bg-clip-text text-transparent">3.4x</div>
                      <div className="text-[10px] sm:text-xs text-[#8C8C8C] mt-1 uppercase tracking-wider">ROI Multiplier</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#BFBFBF]/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#D9D9D9]" />
                        <span className="text-xs sm:text-sm text-[#BFBFBF]">Connected Campaign Performance</span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#8C8C8C]">Powered by The Big Connection</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Connection Elements - Hidden on mobile, shown on larger screens */}
              <AnimatedCard delay={0.8} className="hidden md:block absolute -left-4 top-1/3 transform -translate-y-1/2">
                <div className="w-32 sm:w-36 p-3 sm:p-4 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] backdrop-blur-md border border-[#BFBFBF]/20 rounded-xl shadow-xl">
                  <div className="text-[10px] sm:text-xs text-[#8C8C8C] mb-1 uppercase tracking-wider">STRATEGIC CONNECTION</div>
                  <div className="text-xs sm:text-sm text-[#BFBFBF]">Brand ↔ Audience</div>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={0.9} className="hidden md:block absolute -right-4 bottom-1/4">
                <div className="w-32 sm:w-36 p-3 sm:p-4 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] backdrop-blur-md border border-[#BFBFBF]/20 rounded-xl shadow-xl">
                  <div className="text-[10px] sm:text-xs text-[#8C8C8C] mb-1 uppercase tracking-wider">NETWORK EFFECT</div>
                  <div className="text-xs sm:text-sm text-[#BFBFBF]">Data-Driven Growth</div>
                </div>
              </AnimatedCard>
            </div>
          </AnimatedCard>
        </div>
      </div>
      
      {/* Connection Stream */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-r from-[#0A0A0A] to-[#151515] border-t border-[#BFBFBF]/10 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center space-x-8 sm:space-x-12 animate-marquee whitespace-nowrap py-2 sm:py-4">
          {[
            'Strategic Connections',
            'Growth Architecture',
            'Brand Amplification',
            'Data Intelligence',
            'Conversion Ecosystems',
            'Digital Transformation'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-4">
              <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#D9D9D9]" />
              <span className="text-xs sm:text-sm text-[#8C8C8C] font-medium">{item}</span>
              <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF]"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Animated styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}