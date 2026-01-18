import { useState } from 'react';

/**
 * Custom hook that syncs state with localStorage
 * @param key - localStorage key
 * @param defaultValue - fallback value if nothing in localStorage
 * @returns [value, setValue] - similar to useState
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // State to store value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Check if window exists (SSR safety)
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      // Try to read from localStorage
      const item = window.localStorage.getItem(key);
      
      // If nothing found, use default
      if (!item) {
        return defaultValue;
      }

      // Try to parse JSON
      return JSON.parse(item) as T;
    } catch (error) {
      // If JSON parsing fails or any error, use default
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // Check if window exists (SSR safety)
      if (typeof window === 'undefined') {
        return;
      }

      // Handle function updater pattern
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Update React state
      setStoredValue(valueToStore);

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Handle quota exceeded, or other storage errors
      console.warn(`Error saving to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
