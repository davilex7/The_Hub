/**
 * useLocalStorage Hook
 * Persists state to localStorage with SSR safety
 */
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Initialize with a function to avoid SSR issues
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)): void => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;

        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch {
            // Storage might be full or disabled
          }
        }

        return valueToStore;
      });
    },
    [key]
  );

  // Clear from localStorage
  const clearValue = useCallback((): void => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Storage might be disabled
      }
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // Invalid JSON
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return (): void => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, clearValue];
}
