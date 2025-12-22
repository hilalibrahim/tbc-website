import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({ title = 'terminal', children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`border border-green-500 bg-black font-mono ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center gap-2 border-b border-green-500 bg-zinc-900 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-2 text-xs text-green-400">{title}</span>
      </div>
      {/* Terminal Content */}
      <div className="p-4 text-green-400">{children}</div>
    </div>
  );
}

