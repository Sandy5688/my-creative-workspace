'use client';

import { Save, Share2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
}

export default function Header({ onSave, onPublish, isSaving }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CW</span>
          </div>
          <span className="font-bold text-lg text-slate-900 hidden sm:block">Creative Workspace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/about" className="text-slate-600 hover:text-violet-600 transition-colors">
            About
          </Link>
          <Link href="/faq" className="text-slate-600 hover:text-violet-600 transition-colors">
            FAQ
          </Link>
        </nav>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span className="text-sm font-medium">{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
        <button
          onClick={onPublish}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white hover:bg-violet-700 rounded-lg transition-colors shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Publish</span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg md:hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              <Link
                href="/about"
                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="border-t border-slate-200 my-2" />
              <button
                onClick={() => {
                  onSave();
                  setMobileMenuOpen(false);
                }}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  onPublish();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 bg-violet-600 text-white hover:bg-violet-700 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Publish
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}