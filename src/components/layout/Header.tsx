'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Sparkles, Save, Eye, Upload, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNewProject?: () => void;
  onSave?: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  isSaving?: boolean;
}

export default function Header({
  onNewProject,
  onSave,
  onPreview,
  onPublish,
  isSaving,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CreativeSpace
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Workspace</p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onNewProject}>
            New Project
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={onSave}
            isLoading={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>

          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="w-4 h-4" />
            Preview
          </Button>

          <Button variant="primary" size="sm" onClick={onPublish}>
            <Upload className="w-4 h-4" />
            Publish
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-muted rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-border bg-background"
        >
          <div className="container p-4 space-y-2">
            <Button fullWidth variant="ghost" size="sm" onClick={onNewProject}>
              New Project
            </Button>
            <Button
              fullWidth
              variant="secondary"
              size="sm"
              onClick={onSave}
              isLoading={isSaving}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button fullWidth variant="outline" size="sm" onClick={onPreview}>
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button fullWidth variant="primary" size="sm" onClick={onPublish}>
              <Upload className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}