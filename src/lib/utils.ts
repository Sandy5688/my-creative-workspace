import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Local storage helper with error handling
 */
export function safeLocalStorage() {
  const isAvailable = typeof window !== 'undefined' && window.localStorage;

  return {
    getItem: (key: string) => {
      if (!isAvailable) return null;
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      if (!isAvailable) return;
      try {
        localStorage.setItem(key, value);
      } catch {
        console.warn('localStorage not available');
      }
    },
    removeItem: (key: string) => {
      if (!isAvailable) return;
      try {
        localStorage.removeItem(key);
      } catch {
        console.warn('localStorage not available');
      }
    },
  };
}