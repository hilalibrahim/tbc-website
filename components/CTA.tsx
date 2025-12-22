import Link from 'next/link';

interface CTAProps {
  headline: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  variant?: 'accent' | 'dark';
}

export default function CTA({
  headline,
  description,
  primaryCtaText = 'Get Started',
  primaryCtaLink = '/contact',
  secondaryCtaText,
  secondaryCtaLink,
  variant = 'accent',
}: CTAProps) {
  const bgClass = variant === 'dark' ? 'bg-gradient-dark' : 'bg-accent';
  
  return (
    <section className={`${bgClass} text-white px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <h2 className="mb-4 text-4xl font-heading sm:text-5xl lg:text-6xl">
          {headline}
        </h2>
        {description && (
          <p className="mb-10 text-lg opacity-90 max-w-2xl mx-auto">{description}</p>
        )}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCtaLink}
            className="bg-white text-accent px-8 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-gray-100 shadow-depth-3 hover:shadow-depth-4 hover:scale-105"
          >
            {primaryCtaText}
          </Link>
          {secondaryCtaText && secondaryCtaLink && (
            <Link
              href={secondaryCtaLink}
              className="border-2 border-white bg-transparent px-8 py-4 rounded-xl font-heading text-white transition-all duration-300 hover:bg-white hover:text-accent shadow-depth-2 hover:shadow-depth-3"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
