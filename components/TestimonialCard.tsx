import Card from './Card';

interface TestimonialCardProps {
  quote: string;
  author: string;
  company?: string;
  className?: string;
  variant?: 'white' | 'dark';
}

export default function TestimonialCard({
  quote,
  author,
  company,
  className = '',
  variant = 'white',
}: TestimonialCardProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-foreground';
  const secondaryColor = isDark ? 'text-gray-300' : 'text-secondary';
  const borderColor = isDark ? 'border-gray-700' : 'border-border';

  return (
    <Card className={`${className} floating`} depth="3" variant={variant}>
      <div className="space-y-4">
        <p className={`${secondaryColor} italic text-lg leading-relaxed`}>"{quote}"</p>
        <div className={`border-t ${borderColor} pt-4`}>
          <p className={`font-heading ${textColor}`}>
            {author}
            {company && (
              <span className={`font-normal ${secondaryColor}`}> — {company}</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
