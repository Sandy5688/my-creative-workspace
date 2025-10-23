'use client';

import { ReactNode } from 'react';

interface PanelProps {
  title: string;
  children: ReactNode;
}

export default function Panel({ title, children }: PanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border flex-shrink-0">
        <h2 className="text-xs font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {children}
      </div>
    </div>
  );
}