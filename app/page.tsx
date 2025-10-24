"use client";

import { useState } from "react";
import { Draft } from "@/types/schema";
import { PromptPanel } from "@/components/workspace/prompt-panel";
import { PreviewPanel } from "@/components/workspace/preview-panel";
import { EditorPanel } from "@/components/workspace/editor-panel";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Workspace() {
  const [draft, setDraft] = useState<Draft | null>(null);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 gap-4 p-4 overflow-hidden bg-muted">
        {/* Left Panel */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <PromptPanel onComposed={setDraft} />
        </div>

        {/* Center Panel */}
        <div className="flex-1 min-w-0">
          <PreviewPanel draft={draft} />
        </div>

        {/* Right Panel */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <EditorPanel 
            draft={draft} 
            onUpdate={(blocks) => {
              if (draft) {
                setDraft({ ...draft, blocks });
              }
            }} 
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
