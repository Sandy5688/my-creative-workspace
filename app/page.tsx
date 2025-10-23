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
import PreviewTemplate from '@/components/preview/PreviewTemplates';
import { useCreate } from '@/hooks/useCreate';
import { useUpdate } from '@/hooks/useUpdate';
import { usePublish } from '@/hooks/usePublish';
import { usePayment } from '@/hooks/usePayment';
import { useWorkspaceState } from '@/hooks/useWorkspaceState';
import { useLocalWorkspace } from '@/hooks/useLocalWorkspace';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { Mic, MicOff, Sparkles, Lock, Check, Type, Image as ImageIcon, Code2, Play } from 'lucide-react';
import { formatDate, generateId } from '@/lib/utils';
import { Block } from '@/types/api';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishUrl, setPublishUrl] = useState<string | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [previewType, setPreviewType] = useState<string>('');

  const { create } = useCreate();
  const { update } = useUpdate();
  const { publish, isLoading: isPublishing } = usePublish();
  const { processPayment, isLoading: isProcessingPayment } = usePayment();
  const { isListening, transcript, isSupported, startListening, stopListening } = useVoiceInput();

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

  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }
  }, [transcript]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setLoading(true);

    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('coffee')) setPreviewType('coffee shop');
    else if (lowerPrompt.includes('tech') || lowerPrompt.includes('startup')) setPreviewType('tech startup');
    else if (lowerPrompt.includes('fitness') || lowerPrompt.includes('gym')) setPreviewType('fitness app');
    else if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) setPreviewType('restaurant');
    else setPreviewType('default');

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

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
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
    <div className="flex flex-col h-screen overflow-hidden">
      <Header onSave={handleSave} onPublish={handlePublish} isSaving={isSaving} />

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden flex-1 overflow-y-auto" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 100%)' }}>
        <div className="p-4 space-y-4 pb-24">
          {/* Prompt Card */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Prompt Zone</h2>
            <div className="space-y-3">
              <div className="relative">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to create..."
                  rows={4}
                  className="resize-none text-base pr-14"
                />
                {isSupported && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceToggle}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-lg transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'hover:bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </motion.button>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600,
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                  opacity: !prompt.trim() || isGenerating ? 0.5 : 1,
                }}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
              <h2 className="text-lg font-bold text-slate-900">Live Preview</h2>
              {previewType && (
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Animated
                </span>
              )}
            </div>
            <div className="h-80">
              {previewType ? (
                <PreviewTemplate type={previewType} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-50">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center mb-3"
                  >
                    <Sparkles className="w-7 h-7 text-slate-400" />
                  </motion.div>
                  <p className="text-sm font-medium text-slate-900 mb-1">Ready to create</p>
                  <p className="text-xs text-slate-500">Enter a prompt to see animated preview</p>
                </div>
              )}
            </div>
          </div>

          {/* Editor Card */}
          {currentDraft && (
            <div className="glass-card rounded-2xl p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Add Elements</h2>
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddBlock('text')}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <Type className="w-6 h-6 text-slate-700" />
                  <span className="text-xs font-medium text-slate-700">Text</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddBlock('image')}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <ImageIcon className="w-6 h-6 text-slate-700" />
                  <span className="text-xs font-medium text-slate-700">Image</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddBlock('code')}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <Code2 className="w-6 h-6 text-slate-700" />
                  <span className="text-xs font-medium text-slate-700">Code</span>
                </motion.button>
              </div>
            </div>
          )}

          {/* Premium Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              color: 'white',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold mb-1">Go Premium</h2>
                <p className="text-sm text-white/80">Unlock all features</p>
              </div>
              {unlockedFeatures.length > 0 && (
                <div className="bg-white/20 backdrop-blur px-2.5 py-1.5 rounded-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2.5 text-sm">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Advanced Export</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Custom Domains</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>AI Optimizer</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handlePayment}
              disabled={isProcessingPayment || unlockedFeatures.length > 0}
              style={{
                width: '100%',
                background: 'white',
                color: '#667eea',
                fontWeight: 600,
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                opacity: isProcessingPayment || unlockedFeatures.length > 0 ? 0.5 : 1,
              }}
            >
              {unlockedFeatures.length > 0 ? '✓ Premium Active' : isProcessingPayment ? 'Processing...' : 'Unlock for $9.99'}
            </motion.button>
          </motion.div>
        </div>
      </div>
      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        <div className="w-72 border-r border-slate-200 bg-white overflow-y-auto">
          <Panel title="Create with AI">
            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                rows={5}
                className="resize-none"
              />

              <div className="flex gap-2">
                <Button fullWidth onClick={handleGenerate} isLoading={isGenerating} disabled={!prompt.trim()}>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </Button>
                {isSupported && (
                  <Button 
                    variant={isListening ? 'primary' : 'ghost'} 
                    size="md"
                    onClick={handleVoiceToggle}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
              </div>

              {currentDraft && (
                <>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-semibold mb-3">Current Draft</h3>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{currentDraft.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatDate(currentDraft.lastEdited)}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-semibold mb-3">Add Content</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleAddBlock('text')}>
                        <Type className="w-4 h-4" />
                        Text
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAddBlock('heading')}>
                        Heading
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAddBlock('image')}>
                        <ImageIcon className="w-4 h-4" />
                        Image
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAddBlock('code')}>
                        <Code2 className="w-4 h-4" />
                        Code
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Panel>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <Canvas isLoading={isLoading}>
            {previewType ? (
              <PreviewTemplate type={previewType} />
            ) : currentDraft ? (
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

        <div className="w-72 border-l border-slate-200 bg-white overflow-y-auto">
          <Panel title="Premium Features">
            <div className="space-y-3">
              <Button
                fullWidth
                variant={unlockedFeatures.includes('action1') ? 'primary' : 'outline'}
                disabled={!unlockedFeatures.includes('action1')}
              >
                {unlockedFeatures.includes('action1') ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                Advanced Export
              </Button>

              <Button
                fullWidth
                variant={unlockedFeatures.includes('action2') ? 'primary' : 'outline'}
                disabled={!unlockedFeatures.includes('action2')}
              >
                {unlockedFeatures.includes('action2') ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                Custom Domain
              </Button>

              <Button
                fullWidth
                variant={unlockedFeatures.includes('action3') ? 'primary' : 'outline'}
                disabled={!unlockedFeatures.includes('action3')}
              >
                {unlockedFeatures.includes('action3') ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                AI Optimizer
              </Button>

              <div className="pt-4 border-t border-slate-200">
                <Button fullWidth variant="payment" onClick={handlePayment} isLoading={isProcessingPayment}>
                  {unlockedFeatures.length > 0 ? '✓ Premium Active' : 'Unlock All - $9.99'}
                </Button>
              </div>

              {unlockedFeatures.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm font-semibold text-green-800">✓ Premium Active</p>
                  <p className="text-xs text-green-600 mt-1">All features unlocked</p>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>

      <Footer isSaved={!isSaving} lastSaved={currentDraft?.lastEdited} />

      {/* Notifications */}
      <AnimatePresence>
        {publishUrl && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 lg:left-auto lg:right-6 lg:w-96 p-4 bg-green-600 text-white rounded-2xl shadow-2xl z-50"
          >
            <p className="font-semibold">✓ Published successfully!</p>
            <a href={publishUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline opacity-90 block mt-1 truncate">
              {publishUrl}
            </a>
          </motion.div>
        )}

        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 lg:left-auto lg:right-6 lg:w-96 p-4 bg-green-600 text-white rounded-2xl shadow-2xl z-50"
          >
            <p className="font-semibold">✓ Payment successful!</p>
            <p className="text-sm opacity-90 mt-1">All premium features unlocked 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isPublishing && <Loader fullScreen text="Publishing your project..." />}
    </div>
  );
}