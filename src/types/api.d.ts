/**
 * API Type Definitions
 */

export type Draft = {
  id: string;
  title: string;
  blocks: Block[];
  lastEdited: string;
  status: 'draft' | 'published';
  createdAt: string;
};

export type Block = {
  id: string;
  type: 'text' | 'image' | 'media' | 'heading' | 'code';
  content: string;
  style?: BlockStyle;
  metadata?: Record<string, any>;
};

export type BlockStyle = {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
};

export type CreatePayload = {
  prompt: string;
  settings?: {
    tone?: 'professional' | 'casual' | 'creative';
    length?: 'short' | 'medium' | 'long';
    style?: string;
  };
};

export type CreateResponse = {
  success: boolean;
  draftId: string;
  previewData: Draft;
  message?: string;
};

export type UpdatePayload = {
  draftId: string;
  content: Partial<Draft>;
  blocks?: Block[];
};

export type UpdateResponse = {
  success: boolean;
  draft?: Draft;
  message?: string;
};

export type PublishPayload = {
  draftId: string;
  settings?: {
    subdomain?: string;
    customDomain?: string;
  };
};

export type PublishResponse = {
  success: boolean;
  url: string;
  publishedAt: string;
  message?: string;
};

export type PaymentPayload = {
  amount: number;
  userId: string;
  plan?: 'basic' | 'pro' | 'enterprise';
};

export type PaymentResponse = {
  success: boolean;
  transactionId: string;
  unlockedFeatures: string[];
  expiresAt?: string;
};

export type WorkspaceState = {
  currentDraft: Draft | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  unlockedFeatures: string[];
};

export type EditorMode = 'edit' | 'preview' | 'split';

export type Theme = 'light' | 'dark' | 'system';