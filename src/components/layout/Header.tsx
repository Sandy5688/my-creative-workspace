'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Sparkles, Save, Eye, Upload } from 'lucide-react';

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
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold gradient-text">CreativeSpace</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Workspace</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewProject}
          >
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

          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onPublish}
          >
            <Upload className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>
    </motion.header>
  );
}