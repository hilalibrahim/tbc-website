// Cleaner version with arrow expanding to text
'use client';

import Link from 'next/link';
import Card from './Card';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  ctaText?: string;
  ctaLink?: string;
  featured?: boolean;
  variant?: 'white' | 'dark';
}

export default function ServiceCard({
  title,
  description,
  features,
  price,
  ctaText = 'Learn More',
  ctaLink = '/contact',
  featured = false,
  variant = 'dark',
}: ServiceCardProps) {
  const isDark = variant === 'dark';
  
  return (
    <Card
      className={`h-full floating transition-all duration-300 hover:scale-[1.02] hover:shadow-depth-5 ${
        featured ? 'ring-2 ring-[#D9D9D9] border-[#D9D9D9] relative overflow-hidden' : ''
      }`}
      depth={featured ? '4' : '3'}
      variant={variant}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] px-4 py-1 border-b border-l border-[#D9D9D9]/30 rounded-bl-lg">
          <span className="text-xs font-semibold text-[#D9D9D9] tracking-widest">RECOMMENDED</span>
        </div>
      )}
      
      <div className="flex h-full flex-col pt-6">
        <h3 className={`mb-3 text-2xl font-bold ${featured ? 'text-[#D9D9D9]' : 'text-[#BFBFBF]'}`}>
          {title}
        </h3>
        
        {price && (
          <div className="mb-6">
            <span className={`text-3xl font-bold ${featured ? 'text-[#D9D9D9]' : 'text-[#BFBFBF]'}`}>
              {price}
            </span>
            {featured && (
              <span className="ml-3 text-sm font-medium text-[#8C8C8C]">Best Value</span>
            )}
          </div>
        )}

        <p className={`mb-8 flex-1 text-[#8C8C8C] leading-relaxed ${featured ? 'text-[#BFBFBF]' : ''}`}>
          {description}
        </p>

        <ul className="mb-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group/feature">
              <span className={`mr-3 text-lg transition-transform duration-300 group-hover/feature:scale-110 ${
                featured ? 'text-[#D9D9D9]' : 'text-[#BFBFBF]'
              }`}>
                ✓
              </span>
              <span className={`text-sm ${featured ? 'text-[#BFBFBF]' : 'text-[#8C8C8C]'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-[#BFBFBF]/10">
          {/* Arrow expanding to reveal text animation */}
          <Link
            href={ctaLink}
            className="group relative inline-flex items-center justify-start w-full overflow-hidden rounded-lg h-14"
          >
            {/* Background */}
            <div className={`absolute inset-0 rounded-lg transition-all duration-300 border-2 ${
              featured 
                ? 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] border-[#D9D9D9]/30 group-hover:from-[#2A2A2A] group-hover:to-[#1A1A1A]' 
                : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-[#BFBFBF]/20 group-hover:from-[#1A1A1A] group-hover:to-[#0A0A0A]'
            }`}></div>
            
            {/* Arrow circle that expands */}
            <div className={`relative z-10 flex items-center justify-center h-full px-6 rounded-lg transition-all duration-300 ${
              featured 
                ? 'bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] text-[#D9D9D9] group-hover:w-full' 
                : 'bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] text-[#BFBFBF] group-hover:w-full'
            }`}>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:mr-3" />
                <span className="max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-xs group-hover:ml-2 font-semibold whitespace-nowrap">
                  {ctaText}
                </span>
              </div>
            </div>
            
            {/* Static text (fades out) */}
           
          </Link>
          
          {featured && (
            <p className="mt-3 text-center text-xs text-[#8C8C8C]">
              Start your growth journey today
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}