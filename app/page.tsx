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
  const [isSaving, setIsSaving] = useState(false);
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
    <div className="flex h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 gap-4 p-4 overflow-hidden bg-gradient-to-br from-background to-muted/20">
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <PromptPanel onComposed={handleComposed} />
        </div>

        <div className="flex-1 min-w-0">
          <PreviewPanel draft={draft} />
        </div>

        <div className="w-80 flex-shrink-0 hidden lg:block">
          <EditorPanel draft={draft} />
        </div>
      </main>

      <Footer isSaved={isSaved} lastSaved={lastSaved} />
    </div>
  );
}
