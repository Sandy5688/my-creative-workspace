'use client';

import { useState } from 'react';
import { PaymentPayload, PaymentResponse } from '@/types/api';

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (payload: PaymentPayload): Promise<PaymentResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Mock successful payment
      const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const response: PaymentResponse = {
        success: true,
        transactionId,
        unlockedFeatures: ['action1', 'action2', 'action3', 'advanced_export', 'custom_domain'],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      };

      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { processPayment, isLoading, error };
}