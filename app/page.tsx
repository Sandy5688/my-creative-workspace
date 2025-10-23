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