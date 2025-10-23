'use client';

import { useState, useEffect } from 'react';
import { safeLocalStorage } from '@/lib/utils';

export function useLocalWorkspace<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = safeLocalStorage().getItem(key);
      if (stored) {
        setValue(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // Save to localStorage whenever value changes
  useEffect(() => {
    if (!isLoading) {
      try {
        safeLocalStorage().setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    }
  }, [key, value, isLoading]);

  const clearStorage = () => {
    safeLocalStorage().removeItem(key);
    setValue(defaultValue);
  };

  return { value, setValue, isLoading, clearStorage };
}