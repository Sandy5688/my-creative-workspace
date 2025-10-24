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
  const [isSaved, setIsSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | undefined>(undefined);

  const handleComposed = (newDraft: Draft) => {
    setDraft(newDraft);
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsSaved(true);
    setLastSaved(new Date().toISOString());
  };

  const handlePublish = async () => {
    console.log("Publishing draft:", draft);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onSave={handleSave} onPublish={handlePublish} isSaving={isSaving} />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 overflow-hidden">
        <div className="md:col-span-1 overflow-auto">
          <PromptPanel onComposed={handleComposed} />
        </div>
        <div className="md:col-span-1 overflow-auto">
          <EditorPanel draft={draft} />
        </div>
        <div className="md:col-span-1 overflow-auto">
          <PreviewPanel draft={draft} />
        </div>
      </main>
      <Footer isSaved={isSaved} lastSaved={lastSaved} />
    </div>
  );
}
