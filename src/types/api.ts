export interface Block {
  id: string;
  type: 'text' | 'heading' | 'image' | 'code';
  content: string;
  style?: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    color?: string;
    spacing?: string;
  };
}

export interface Draft {
  id: string;
  title: string;
  lastEdited: string;
  blocks: Block[];
}

export interface CreatePayload {
  prompt: string;
  settings: {
    tone: string;
    length: string;
  };
}

export interface CreateResponse {
  success: boolean;
  draftId: string;
  previewData: Draft;
}

export interface UpdatePayload {
  draftId: string;
  content: Draft;
}

export interface UpdateResponse {
  success: boolean;
  message: string;
}

export interface PublishPayload {
  draftId: string;
}

export interface PublishResponse {
  success: boolean;
  url: string;
}

export interface PaymentPayload {
  amount: number;
  userId: string;
  plan: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  unlockedFeatures: string[];
}
