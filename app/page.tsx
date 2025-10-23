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
import LandingHero from '@/components/ui/LandingHero';
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

  const { create } = useCreate();
  const { update } = useUpdate();
  const { publish, isLoading: isPublishing } = usePublish();
  const { processPayment, isLoading: isProcessingPayment } = usePayment();

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

  const { value: savedDraft, setValue: saveDraftLocally } = useLocalWorkspace(
    'workspace-draft',
    null
  );

  useEffect(() => {
    if (savedDraft && !currentDraft) {
      setDraft(savedDraft);
    }
  }, [savedDraft, currentDraft, setDraft]);

  useEffect(() => {
    if (currentDraft) {
      const timer = setTimeout(() => {
        saveDraftLocally(currentDraft);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentDraft, saveDraftLocally]);

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

  const handleBlockUpdate = (blockId: string, content: string) => {
    updateBlock(blockId, content);
  };

  const handleBlockDelete = (blockId: string) => {
    deleteBlock(blockId);
  };

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

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="w-full lg:w-80 border-r lg:border-b-0 border-b border-border overflow-y-auto">
          <Panel title="Create with AI">
            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create...&#10;&#10;Try:&#10;• 'Create a landing page for a coffee shop'&#10;• 'Build a tech startup website'&#10;• 'Design a fitness app landing'"
                rows={8}
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

        {/* Center Canvas */}
        <div className="flex-1 overflow-hidden">
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
              <LandingHero />
            )}
          </Canvas>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-80 border-l lg:border-t-0 border-t border-border overflow-y-auto">
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
                Advanced Export
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
                Custom Domain
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
                AI Optimizer
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

              {unlockedFeatures.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    ✨ Premium Active
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    All features unlocked
                  </p>
                </div>
              )}
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
            className="fixed bottom-20 right-6 p-4 bg-green-500 text-white rounded-xl shadow-lg z-50 max-w-sm"
          >
            <p className="font-medium">🎉 Published successfully!</p>
            <a 
              href={publishUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm underline break-all hover:text-green-100"
            >
              {publishUrl}
            </a>
          </motion.div>
        )}

        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 p-4 bg-green-500 text-white rounded-xl shadow-lg z-50"
          >
            <p className="font-medium">💳 Payment successful!</p>
            <p className="text-sm">All features unlocked 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Loader */}
      {isPublishing && <Loader fullScreen text="Publishing your project..." />}
    </div>
  );
}