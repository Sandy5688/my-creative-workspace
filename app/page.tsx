'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Check, Zap, Download, Globe, Settings } from 'lucide-react';
import { Block, Draft } from '@/types/api';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<Draft | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockDraft: Draft = {
        id: `draft-${Date.now()}`,
        title: prompt.charAt(0).toUpperCase() + prompt.slice(1),
        lastEdited: new Date().toISOString(),
        blocks: [
          {
            id: '1',
            type: 'heading',
            content: `Welcome to ${prompt.charAt(0).toUpperCase() + prompt.slice(1)}`,
          },
          {
            id: '2',
            type: 'text',
            content: 'Your AI-generated content is ready. Upgrade to unlock full features.',
          },
        ],
      };
      
      setPreview(mockDraft);
      setIsGenerating(false);
    }, 2000);
  };

  const handleUnlockPremium = async () => {
    setIsProcessingPayment(true);
    
    // Simulate payment
    setTimeout(() => {
      setIsPremium(true);
      setIsProcessingPayment(false);
    }, 1500);
  };

  const FeatureButton = ({ 
    icon: Icon, 
    label, 
    locked 
  }: { 
    icon: any; 
    label: string; 
    locked: boolean;
  }) => (
    <motion.button
      whileHover={!locked ? { scale: 1.02, y: -2 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      disabled={locked}
      className={`
        relative group flex items-center gap-3 px-6 py-4 rounded-2xl font-medium text-sm transition-all
        ${locked 
          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
          : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow-md'
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
      {locked && (
        <Lock className="w-4 h-4 ml-auto text-slate-300" />
      )}
      {!locked && (
        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
      )}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">Creative Workspace</span>
          </div>
          
          <nav className="flex items-center gap-6">
            <a href="/about" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
              About
            </a>
            <a href="/faq" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
              FAQ
            </a>
            {isPremium && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                <Check className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Premium</span>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Generator */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Create Something Amazing
              </h1>
              <p className="text-slate-600 mb-8">
                Describe what you want to build, and watch AI bring it to life.
              </p>

              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., modern coffee shop landing page"
                  className="w-full h-32 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none resize-none text-slate-900 placeholder:text-slate-400"
                />

                <motion.button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </motion.div>

            {/* Features Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Actions</h2>
              
              <div className="space-y-3">
                <FeatureButton icon={Settings} label="Edit & Customize" locked={false} />
                <FeatureButton icon={Download} label="Export Project" locked={!isPremium} />
                <FeatureButton icon={Globe} label="Publish to Web" locked={!isPremium} />
                <FeatureButton icon={Zap} label="Advanced Features" locked={!isPremium} />
              </div>

              {!isPremium && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                >
                  <h3 className="font-bold text-slate-900 mb-2">Unlock All Features</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get unlimited exports, custom domains, and priority support.
                  </p>
                  
                  <motion.button
                    onClick={handleUnlockPremium}
                    disabled={isProcessingPayment}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Upgrade to Premium - $9.99</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-8 min-h-[600px]"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Preview</h2>
              
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {preview.blocks.map((block, index) => (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {block.type === 'heading' && (
                          <h3 className="text-2xl font-bold text-slate-900">{block.content}</h3>
                        )}
                        {block.type === 'text' && (
                          <p className="text-slate-600 leading-relaxed">{block.content}</p>
                        )}
                      </motion.div>
                    ))}
                    
                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Content generated successfully</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      No preview yet
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                      Enter a prompt and click generate to see your AI-powered creation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2025 Creative Workspace. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="/about" className="hover:text-slate-900 transition-colors">About</a>
              <a href="/faq" className="hover:text-slate-900 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
