import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type PrimeTheme = 'lara-light-blue' | 'lara-dark-blue';

interface ThemeStore {
  theme: Theme;
  primeTheme: PrimeTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setPrimeTheme: (theme: PrimeTheme) => void;
}

const mapThemeToPrime = (theme: Theme): PrimeTheme =>
  theme === 'dark' ? 'lara-dark-blue' : 'lara-light-blue';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      primeTheme: 'lara-light-blue',
      toggleTheme: () =>
        set((state) => {
          const nextTheme = state.theme === 'light' ? 'dark' : 'light';
          return {
            theme: nextTheme,
            primeTheme: mapThemeToPrime(nextTheme),
          };
        }),
      setTheme: (theme) => set({ theme, primeTheme: mapThemeToPrime(theme) }),
      setPrimeTheme: (theme) =>
        set({ primeTheme: theme, theme: theme.includes('dark') ? 'dark' : 'light' }),
    }),
    {
      name: 'theme-storage', // localStorage key
      onRehydrateStorage: () => (state) => {
        if (state && !state.primeTheme) {
          state.primeTheme = mapThemeToPrime(state.theme);
        }
      },
    }
  )
);
