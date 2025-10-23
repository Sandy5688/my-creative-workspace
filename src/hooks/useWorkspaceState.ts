'use client';

import { create } from 'zustand';
import { Draft, WorkspaceState } from '@/types/api';

interface WorkspaceStore extends WorkspaceState {
  setDraft: (draft: Draft | null) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  unlockFeatures: (features: string[]) => void;
  updateBlock: (blockId: string, content: string) => void;
  deleteBlock: (blockId: string) => void;
  addBlock: (block: any) => void;
}

export const useWorkspaceState = create<WorkspaceStore>((set) => ({
  currentDraft: null,
  isLoading: false,
  isSaving: false,
  error: null,
  unlockedFeatures: [],

  setDraft: (draft) => set({ currentDraft: draft }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSaving: (saving) => set({ isSaving: saving }),
  
  setError: (error) => set({ error }),
  
  unlockFeatures: (features) =>
    set((state) => ({
      unlockedFeatures: [...new Set([...state.unlockedFeatures, ...features])],
    })),

  updateBlock: (blockId, content) =>
    set((state) => {
      if (!state.currentDraft) return state;
      return {
        currentDraft: {
          ...state.currentDraft,
          blocks: state.currentDraft.blocks.map((block) =>
            block.id === blockId ? { ...block, content } : block
          ),
          lastEdited: new Date().toISOString(),
        },
      };
    }),

  deleteBlock: (blockId) =>
    set((state) => {
      if (!state.currentDraft) return state;
      return {
        currentDraft: {
          ...state.currentDraft,
          blocks: state.currentDraft.blocks.filter((block) => block.id !== blockId),
          lastEdited: new Date().toISOString(),
        },
      };
    }),

  addBlock: (block) =>
    set((state) => {
      if (!state.currentDraft) return state;
      return {
        currentDraft: {
          ...state.currentDraft,
          blocks: [...state.currentDraft.blocks, block],
          lastEdited: new Date().toISOString(),
        },
      };
    }),
}));