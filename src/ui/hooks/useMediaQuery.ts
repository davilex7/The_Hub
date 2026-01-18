/**
 * useMediaQuery Hook
 * Reactive media query matching with SSR safety
 */
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent): void => {
      setMatches(e.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return (): void => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// Pre-defined breakpoint hooks
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 40em)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 40em)') && !useMediaQuery('(min-width: 64em)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 64em)');
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
