"use client";

import { useState } from "react";
import { Draft } from "@/types/schema";
import { PromptPanel } from "@/components/workspace/prompt-panel";
import { PreviewPanel } from "@/components/workspace/preview-panel";
import { EditorPanel } from "@/components/workspace/editor-panel";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Workspace() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | undefined>(undefined);

  const handleComposed = (newDraft: Draft) => {
    setDraft(newDraft);
    setIsSaved(false);
    setTimeout(() => {
      setIsSaved(true);
      setLastSaved(new Date().toISOString());
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1800px] mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Panel - Prompt */}
            <div className="lg:col-span-3 h-full overflow-hidden">
              <PromptPanel onComposed={handleComposed} />
            </div>

            {/* Center Panel - Preview */}
            <div className="lg:col-span-6 h-full overflow-hidden">
              <PreviewPanel draft={draft} />
            </div>

            {/* Right Panel - Editor */}
            <div className="lg:col-span-3 h-full overflow-hidden">
              <EditorPanel draft={draft} />
            </div>
          </div>
        </div>
      </main>

      <Footer isSaved={isSaved} lastSaved={lastSaved} />
    </div>
  );
}
