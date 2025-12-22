import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  depth?: '1' | '2' | '3' | '4' | '5';
  variant?: 'white' | 'dark';
}

export default function Card({ 
  title, 
  children, 
  className = '',
  depth = '2',
  variant = 'white'
}: CardProps) {
  const depthClasses = {
    '1': 'shadow-depth-1',
    '2': 'shadow-depth-2',
    '3': 'shadow-depth-3',
    '4': 'shadow-depth-4',
    '5': 'shadow-depth-5',
  };
  
  const depthClass = depthClasses[depth] || 'shadow-depth-2';
  const bgClass = variant === 'dark' ? 'bg-black text-white' : 'bg-white text-foreground';
  const borderClass = variant === 'dark' ? 'border-gray-800' : 'border-border';

  return (
    <div className={`border ${borderClass} ${bgClass} rounded-2xl ${depthClass} transition-all duration-300 hover:shadow-depth-4 ${className}`}>
      {title && (
        <div className={`border-b ${borderClass} px-6 py-4`}>
          <h3 className={`text-lg font-heading ${variant === 'dark' ? 'text-white' : 'text-foreground'}`}>{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
