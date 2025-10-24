"use client"

import React from "react"
import { Panel } from "@/components/ui/panel"
import { Draft } from "@/types/schema"

interface EditorPanelProps {
  draft: Draft | null
}

export function EditorPanel({ draft }: EditorPanelProps) {
  return (
    <Panel className="h-full overflow-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Editor</h2>
        {draft ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title</label>
              <p className="text-lg font-semibold">{draft.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Content</label>
              <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                <p className="whitespace-pre-wrap">{draft.content}</p>
              </div>
            </div>
            {draft.metadata && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Metadata</label>
                <pre className="mt-2 p-4 bg-muted/50 rounded-lg text-xs overflow-auto">
                  {JSON.stringify(draft.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>No draft selected. Create one to get started!</p>
          </div>
        )}
      </div>
    </Panel>
  )
}
