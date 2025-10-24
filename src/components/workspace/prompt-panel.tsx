"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCompose } from "@/hooks/useCompose";
import { Draft } from "@/types/schema";
import { Mic, Sparkles, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptPanelProps {
  onComposed: (draft: Draft) => void;
}

export function PromptPanel({ onComposed }: PromptPanelProps) {
  const [directive, setDirective] = useState("");
  const [tier, setTier] = useState<"free" | "basic" | "pro">("free");
  const { compose, isLoading } = useCompose();
  const { toast } = useToast();

  const handleCompose = async () => {
    if (!directive.trim()) return;

    try {
      const result = await compose({ directive, settings: { tier } });
      if (result.success && result.previewData) {
        onComposed(result.previewData);
        toast({
          title: "Composition created",
          description: "Your composition has been generated successfully.",
        });
        setDirective("");
      }
    } catch (error) {
      toast({
        title: "Composition failed",
        description: "Unable to create composition. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Panel className="h-full flex flex-col p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Composition Directive</h2>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          TIER
        </label>
        <Select value={tier} onValueChange={(v: any) => setTier(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">FREE</SelectItem>
            <SelectItem value="basic">BASIC</SelectItem>
            <SelectItem value="pro">PRO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Describe your composition intent..."
        value={directive}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDirective(e.target.value)}
        className="min-h-[200px] resize-none mb-4"
        disabled={isLoading}
      />

      <div className="flex gap-2 mb-6">
        <Button
          onClick={handleCompose}
          disabled={isLoading || !directive.trim()}
          className="flex-1"
        >
          {isLoading ? "Composing..." : "Compose"}
        </Button>
        <Button variant="outline" size="icon" disabled className="relative">
          <Mic className="h-4 w-4" />
          <Lock className="h-3 w-3 absolute -top-1 -right-1 text-accent" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">
          RECENT DIRECTIVES
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="opacity-50">No recent directives</p>
        </div>
      </div>
    </Panel>
  );
}
