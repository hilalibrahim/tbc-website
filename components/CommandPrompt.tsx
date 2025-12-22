import React from 'react';

interface CommandPromptProps {
  command?: string;
  children?: React.ReactNode;
  className?: string;
  showCursor?: boolean;
}

export default function CommandPrompt({ 
  command = '', 
  children, 
  className = '',
  showCursor = true 
}: CommandPromptProps) {
  return (
    <div className={`font-mono ${className}`}>
      <span className="text-green-500">$</span>
      {command && <span className="ml-2 text-green-400">{command}</span>}
      {children}
      {showCursor && (
        <span className="ml-1 animate-pulse text-green-400">▊</span>
      )}
    </div>
  );
}

