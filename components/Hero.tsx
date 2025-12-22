'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({ 
  headline, 
  subheadline, 
  ctaText = 'Get Started',
  ctaLink = '/contact' 
}: HeroProps) {
  return (
    <section className="min-h-[85vh] bg-gradient-light px-4 py-16 sm:px-6 lg:px-8 flex items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-5xl font-heading text-foreground sm:text-6xl lg:text-7xl leading-tight">
              {headline}
            </h1>

            {subheadline && (
              <p className="mb-10 text-lg text-secondary sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {subheadline}
              </p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
              <Link
                href={ctaLink}
                className="bg-accent text-white px-8 py-4 rounded-xl text-center font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 hover:scale-105"
              >
                {ctaText}
              </Link>
              <Link
                href="/services"
                className="border-2 border-foreground bg-transparent px-8 py-4 rounded-xl text-center font-heading text-foreground transition-all duration-300 hover:bg-foreground hover:text-white shadow-depth-2 hover:shadow-depth-3"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end animate-float">
            <div className="relative w-full max-w-lg">
              {/* Multi-layer shadow effect */}
              <div className="absolute inset-0 bg-black rounded-3xl transform translate-x-6 translate-y-6 opacity-20 -z-10"></div>
              <div className="absolute inset-0 bg-black rounded-3xl transform translate-x-4 translate-y-4 opacity-40 -z-10"></div>
              {/* Image with border radius */}
              <div className="relative rounded-3xl overflow-hidden shadow-depth-5">
                <Image
                  src="/assets/heroimagetbc.png"
                  alt="Hero"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
