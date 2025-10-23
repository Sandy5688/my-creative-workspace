'use client';

import { motion } from 'framer-motion';
import { Check, Cloud } from 'lucide-react';

interface FooterProps {
  isSaved?: boolean;
  lastSaved?: string;
}

export default function Footer({ isSaved = true, lastSaved }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky bottom-0 w-full border-t border-border bg-background/95 backdrop-blur"
    >
      <div className="container flex h-12 items-center justify-between px-6 text-sm">
        {/* Status */}
        <div className="flex items-center gap-2">
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">
                All changes saved
                {lastSaved && ` • ${lastSaved}`}
              </span>
            </>
          ) : (
            <>
              <Cloud className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="text-muted-foreground">Saving...</span>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <span>v1.0.0</span>
        </div>
      </div>
    </motion.footer>
  );
}