'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Block, BlockStyle } from '@/types/api';
import { Grip, Trash2, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

interface EditableBlockProps {
  block: Block;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onStyleChange?: (id: string, style: BlockStyle) => void;
}

export default function EditableBlock({
  block,
  onUpdate,
  onDelete,
}: EditableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && isEditing) {
      contentRef.current.focus();
      // Place cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== block.content) {
      onUpdate(block.id, content);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.textContent || '');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group relative mb-4"
    >
      {/* Hover Controls */}
      <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button
          className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          title="Drag to reorder"
        >
          <Grip className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(block.id)}
          className="p-1.5 hover:bg-red-100 rounded-lg text-muted-foreground hover:text-red-600 transition-colors"
          title="Delete block"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative rounded-xl border-2 border-transparent hover:border-primary/20 transition-all',
          isEditing && 'border-primary shadow-lg'
        )}
      >
        {block.type === 'text' && (
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onInput={handleInput}
            className={cn(
              'min-h-[60px] p-4 rounded-xl outline-none',
              'hover:bg-muted/50 focus:bg-background transition-colors',
              isEditing && 'bg-background'
            )}
            style={block.style}
          >
            {block.content}
          </div>
        )}

        {block.type === 'heading' && (
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onInput={handleInput}
            className={cn(
              'text-3xl font-bold min-h-[60px] p-4 rounded-xl outline-none',
              'hover:bg-muted/50 focus:bg-background transition-colors',
              isEditing && 'bg-background'
            )}
            style={block.style}
          >
            {block.content}
          </div>
        )}

        {block.type === 'image' && (
          <div className="relative group/image">
            {block.content ? (
              <img
                src={block.content}
                alt="Content"
                className="w-full rounded-xl"
              />
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-xl">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <Button size="sm" variant="secondary">
                Change Image
              </Button>
            </div>
          </div>
        )}

        {block.type === 'code' && (
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onInput={handleInput}
            className={cn(
              'font-mono text-sm min-h-[100px] p-4 rounded-xl outline-none bg-neutral-950 text-neutral-100',
              'hover:bg-neutral-900 focus:bg-neutral-950 transition-colors',
              isEditing && 'ring-2 ring-primary'
            )}
          >
            {block.content}
          </div>
        )}
      </div>
    </motion.div>
  );
}