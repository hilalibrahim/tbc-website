import Link from 'next/link';
import Card from './Card';

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
  ctaText = 'Select Package',
  ctaLink = '/contact',
  featured = false,
  variant = 'white',
}: ServiceCardProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-foreground';
  const secondaryColor = isDark ? 'text-gray-300' : 'text-secondary';
  
  return (
    <Card
      className={`h-full floating ${featured ? 'ring-2 ring-accent border-accent' : ''}`}
      depth={featured ? '4' : '3'}
      variant={variant}
    >
      <div className="flex h-full flex-col">
        <h3 className={`mb-2 text-2xl font-heading ${textColor}`}>{title}</h3>
        
        {price && (
          <div className="mb-4">
            <span className={`text-3xl font-heading ${isDark ? 'text-accent' : 'text-accent'}`}>{price}</span>
            {featured && (
              <span className={`ml-2 text-sm font-heading ${isDark ? 'text-accent' : 'text-accent'}`}>[POPULAR]</span>
            )}
          </div>
        )}

        <p className={`mb-6 flex-1 ${secondaryColor}`}>{description}</p>

        <ul className={`mb-6 space-y-3 text-sm ${textColor}`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-3 text-lg ${isDark ? 'text-accent' : 'text-accent'}`}>✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={ctaLink}
          className={`mt-auto block border-2 px-6 py-3 text-center font-heading rounded-lg transition-all duration-300 ${
            featured 
              ? 'bg-accent text-white border-accent hover:bg-accent-hover shadow-lg' 
              : isDark
              ? 'bg-white text-black border-white hover:bg-gray-100'
              : 'bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-white'
          }`}
        >
          {ctaText}
        </Link>
      </div>
    </Card>
  );
}
