import { useEffect } from 'react';
import type { UseFormWatch, UseFormSetValue } from 'react-hook-form';

const CACHE_KEY = 'registration-form-cache';

// Fields that should NOT be cached (sensitive data)
const SENSITIVE_FIELDS = ['password', 'confirmPassword'];

export function useFormCache<T extends Record<string, unknown>>(
  watch: UseFormWatch<T>,
  setValue: UseFormSetValue<T>
) {
  // Load cached data on mount
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Partial<T>;
        Object.entries(parsed).forEach(([key, value]) => {
          if (!SENSITIVE_FIELDS.includes(key)) {
            setValue(key as keyof T, value as T[keyof T], { shouldValidate: false });
          }
        });
      } catch (e) {
        console.error('Failed to load cached form data:', e);
      }
    }
  }, [setValue]);

  // Save non-sensitive fields on every change
  useEffect(() => {
    const subscription = watch((values) => {
      const toCache: Partial<T> = {};
      Object.entries(values).forEach(([key, value]) => {
        if (!SENSITIVE_FIELDS.includes(key)) {
          toCache[key as keyof T] = value as T[keyof T];
        }
      });
      localStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
}
