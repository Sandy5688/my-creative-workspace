'use client';

import { useState } from 'react';
import { PublishPayload, PublishResponse } from '@/types/api';

export function usePublish() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = async (payload: PublishPayload): Promise<PublishResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock published URL
      const subdomain = payload.settings?.subdomain || payload.draftId.slice(0, 8);
      const publishedUrl = `https://${subdomain}.creativespace.app`;

      const response: PublishResponse = {
        success: true,
        url: publishedUrl,
        publishedAt: new Date().toISOString(),
        message: 'Successfully published! Your site is now live.',
      };

      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { publish, isLoading, error };
}