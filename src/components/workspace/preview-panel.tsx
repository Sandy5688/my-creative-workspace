"use client"

import React from "react"
import { Panel } from "@/components/ui/panel"
import { Draft } from "@/types/schema"
import { Eye } from "lucide-react"

interface PreviewPanelProps {
  draft: Draft | null
}

export function PreviewPanel({ draft }: PreviewPanelProps) {
  return (
    <Panel className="h-full overflow-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Preview</h2>
        </div>
        {draft ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h1 className="text-3xl font-bold mb-2">{draft.title}</h1>
              {draft.metadata?.author && (
                <p className="text-sm text-muted-foreground">By {draft.metadata.author}</p>
              )}
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap leading-relaxed">{draft.content}</div>
            </div>
            {draft.metadata?.tags && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {draft.metadata.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No draft to preview. Create one first!</p>
            </div>
          </div>
        )}
      </div>
    </Panel>
  )
}
