'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PanelProps {
  children: ReactNode;
  title?: string;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export default function Panel({
  children,
  title,
  className,
}: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col h-full bg-background border-r border-border',
        className
      )}
    >
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </motion.div>
  );
}