'use client';

import { useState } from 'react';
import { PublishPayload, PublishResponse } from '@/types/api';

export function usePublish() {
  const [isLoading, setIsLoading] = useState(false);

  const publish = async (payload: PublishPayload): Promise<PublishResponse> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const subdomain = payload.draftId.slice(0, 8);
        const publishedUrl = `https://${subdomain}.creativespace.app`;

        const response: PublishResponse = {
          success: true,
          url: publishedUrl,
        };

        setIsLoading(false);
        resolve(response);
      }, 1500);
    });
  };

  return { publish, isLoading };
}
