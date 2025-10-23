'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Panel from '@/components/ui/Panel';
import Canvas from '@/components/ui/Canvas';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import EditableBlock from '@/components/workspace/EditableBlock';
import Loader from '@/components/ui/Loader';
import { useCreate } from '@/hooks/useCreate';
import { useUpdate } from '@/hooks/useUpdate';
import { usePublish } from '@/hooks/usePublish';
import { usePayment } from '@/hooks/usePayment';
import { useWorkspaceState } from '@/hooks/useWorkspaceState';
import { useLocalWorkspace } from '@/hooks/useLocalWorkspace';
import { Mic, Sparkles, Lock, Check } from 'lucide-react';
import { formatDate, generateId } from '@/lib/utils';
import { Block } from '@/types/api';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishUrl, setPublishUrl] = useState<string | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Hooks
  const { create } = useCreate();
  const { update } = useUpdate();
  const { publish, isLoading: isPublishing } = usePublish();
  const { processPayment, isLoading: isProcessingPayment } = usePayment();

  // Global state
  const {
    currentDraft,
    isLoading,
    isSaving,
    unlockedFeatures,
    setDraft,
    setLoading,
    setSaving,
    unlockFeatures,
    updateBlock,
    deleteBlock,
    addBlock,
  } = useWorkspaceState();

  // Local storage
  const { value: savedDraft, setValue: saveDraftLocally } = useLocalWorkspace(
    'workspace-draft',
    null
  );

  // Load saved draft on mount
  useEffect(() => {
    if (savedDraft && !currentDraft) {
      setDraft(savedDraft);
    }
  }, [savedDraft, currentDraft, setDraft]);

  // Auto-save to localStorage
  useEffect(() => {
    if (currentDraft) {
      const timer = setTimeout(() => {
        saveDraftLocally(currentDraft);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentDraft, saveDraftLocally]);

  // Handle generate
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setLoading(true);

    try {
      const response = await create({
        prompt,
        settings: { tone: 'professional', length: 'medium' },
      });

      setDraft(response.previewData);
      setPrompt('');
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
      setLoading(false);
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!currentDraft) return;

    setSaving(true);
    try {
      await update({
        draftId: currentDraft.id,
        content: currentDraft,
      });
      saveDraftLocally(currentDraft);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  // Handle publish
  const handlePublish = async () => {
    if (!currentDraft) return;

    try {
      const response = await publish({
        draftId: currentDraft.id,
      });
      setPublishUrl(response.url);
      setTimeout(() => setPublishUrl(null), 5000);
    } catch (error) {
      console.error('Publish failed:', error);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    try {
      const response = await processPayment({
        amount: 9.99,
        userId: 'user_demo',
        plan: 'pro',
      });
      unlockFeatures(response.unlockedFeatures);
      setShowPaymentSuccess(true);
      setTimeout(() => setShowPaymentSuccess(false), 3000);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  // Handle block updates
  const handleBlockUpdate = (blockId: string, content: string) => {
    updateBlock(blockId, content);
  };

  const handleBlockDelete = (blockId: string) => {
    deleteBlock(blockId);
  };

  // Add new block
  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: type === 'text' ? 'New text block...' : '',
    };
    addBlock(newBlock);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        onSave={handleSave}
        onPublish={handlePublish}
        isSaving={isSaving}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Prompt Zone */}
        <div className="w-80 border-r border-border">
          <Panel title="Create with AI">
            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                rows={6}
                className="resize-none"
              />

              <div className="flex gap-2">
                <Button
                  fullWidth
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!prompt.trim()}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate
                </Button>
                <Button variant="ghost" size="md">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              {/* History */}
              {currentDraft && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Current Draft</h3>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">{currentDraft.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(currentDraft.lastEdited)}
                    </p>
                  </div>
                </div>
              )}

              {/* Add Block Buttons */}
              {currentDraft && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Add Content</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddBlock('text')}
                    >
                      Text
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddBlock('heading')}
                    >
                      Heading
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddBlock('image')}
                    >
                      Image
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddBlock('code')}
                    >
                      Code
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </div>

        {/* Center Panel - Live Preview Canvas */}
        <div className="flex-1">
          <Canvas isLoading={isLoading}>
            {currentDraft ? (
              <AnimatePresence mode="popLayout">
                {currentDraft.blocks.map((block) => (
                  <EditableBlock
                    key={block.id}
                    block={block}
                    onUpdate={handleBlockUpdate}
                    onDelete={handleBlockDelete}
                  />
                ))}
              </AnimatePresence>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <Sparkles className="w-16 h-16 mx-auto text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Start Creating</h2>
                  <p className="text-muted-foreground">
                    Enter a prompt on the left to generate your first project
                  </p>
                </div>
              </div>
            )}
          </Canvas>
        </div>

        {/* Right Panel - Premium Actions */}
        <div className="w-80 border-l border-border">
          <Panel title="Premium Actions">
            <div className="space-y-3">
              <Button
                fullWidth
                variant={unlockedFeatures.includes('action1') ? 'primary' : 'outline'}
                isLocked={!unlockedFeatures.includes('action1')}
                disabled={!unlockedFeatures.includes('action1')}
              >
                {unlockedFeatures.includes('action1') ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Action 1
              </Button>

              <Button
                fullWidth
                variant={unlockedFeatures.includes('action2') ? 'primary' : 'outline'}
                isLocked={!unlockedFeatures.includes('action2')}
                disabled={!unlockedFeatures.includes('action2')}
              >
                {unlockedFeatures.includes('action2') ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Action 2
              </Button>

              <Button
                fullWidth
                variant={unlockedFeatures.includes('action3') ? 'primary' : 'outline'}
                isLocked={!unlockedFeatures.includes('action3')}
                disabled={!unlockedFeatures.includes('action3')}
              >
                {unlockedFeatures.includes('action3') ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Action 3
              </Button>

              <div className="pt-4 border-t border-border">
                <Button
                  fullWidth
                  variant="payment"
                  onClick={handlePayment}
                  isLoading={isProcessingPayment}
                >
                  Unlock All Features - $9.99
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <Footer isSaved={!isSaving} lastSaved={currentDraft?.lastEdited} />

      {/* Success Notifications */}
      <AnimatePresence>
        {publishUrl && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 p-4 bg-green-500 text-white rounded-xl shadow-lg"
          >
            <p className="font-medium">Published successfully!</p>
            <a href={publishUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline">
              {publishUrl}
            </a>
          </motion.div>
        )}

        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 p-4 bg-green-500 text-white rounded-xl shadow-lg"
          >
            <p className="font-medium">Payment successful!</p>
            <p className="text-sm">All features unlocked</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Loader */}
      {isPublishing && <Loader fullScreen text="Publishing your project..." />}
    </div>
  );
}