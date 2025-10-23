'use client';

import Link from 'next/link';
import { CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface FooterProps {
  isSaved: boolean;
  lastSaved?: string;
}

export default function Footer({ isSaved, lastSaved }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 px-4 py-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status */}
        <div className="flex items-center gap-2 text-sm">
          {isSaved ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-slate-600">
                Saved {lastSaved ? formatDate(lastSaved) : 'just now'}
              </span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="text-slate-600">Saving changes...</span>
            </>
          )}
        </div>

        {/* Legal Links */}
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-violet-600 transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-violet-600 transition-colors">
            Terms
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-violet-600 transition-colors">
            About
          </Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-violet-600 transition-colors">
            FAQ
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-slate-500">
          © 2025 Creative Workspace
        </div>
      </div>
    </footer>
  );
}