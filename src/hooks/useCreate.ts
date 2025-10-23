'use client';

import { useState } from 'react';
import { CreatePayload, CreateResponse, Draft, Block } from '@/types/api';
import { generateId } from '@/lib/utils';

export function useCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreatePayload): Promise<CreateResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate mock draft data
      const draftId = generateId();
      const mockBlocks: Block[] = [
        {
          id: generateId(),
          type: 'heading',
          content: 'Welcome to Your Creative Workspace',
          style: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#0ea5e9',
          },
        },
        {
          id: generateId(),
          type: 'text',
          content: `Based on your prompt: "${payload.prompt}", we've generated this beautiful content for you.`,
          style: {
            fontSize: '1.125rem',
            textAlign: 'center',
            color: '#525252',
          },
        },
        {
          id: generateId(),
          type: 'text',
          content: 'This is a live preview of your content. You can click on any element to edit it directly.',
        },
        {
          id: generateId(),
          type: 'image',
          content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
        },
        {
          id: generateId(),
          type: 'text',
          content: 'Add more blocks, customize styling, and create something amazing!',
        },
      ];

      const previewData: Draft = {
        id: draftId,
        title: `Draft - ${new Date().toLocaleDateString()}`,
        blocks: mockBlocks,
        lastEdited: new Date().toISOString(),
        status: 'draft',
        createdAt: new Date().toISOString(),
      };

      const response: CreateResponse = {
        success: true,
        draftId,
        previewData,
        message: 'Draft created successfully!',
      };

      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create draft';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { create, isLoading, error };
}