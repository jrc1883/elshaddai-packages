import { useState, useEffect } from 'react';

/**
 * Tracks whether a media query matches the current viewport.
 * Automatically updates when the viewport changes.
 *
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns Boolean indicating if the query matches
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *   const isDark = useMediaQuery('(prefers-color-scheme: dark)');
 *   const isPortrait = useMediaQuery('(orientation: portrait)');
 *
 *   return (
 *     <div>
 *       {isMobile ? <MobileView /> : <DesktopView />}
 *       {isDark && <DarkModeIndicator />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * Common breakpoints:
 * - Mobile: `(max-width: 768px)`
 * - Tablet: `(min-width: 769px) and (max-width: 1024px)`
 * - Desktop: `(min-width: 1025px)`
 * - Dark mode: `(prefers-color-scheme: dark)`
 * - Reduced motion: `(prefers-reduced-motion: reduce)`
 *
 * Includes fallback for older browsers that don't support `addEventListener`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Convenience hook for detecting mobile viewports (max-width: 768px).
 *
 * @returns Boolean indicating if viewport is mobile-sized
 *
 * @example
 * ```tsx
 * function Header() {
 *   const isMobile = useIsMobile();
 *
 *   return isMobile ? <MobileHeader /> : <DesktopHeader />;
 * }
 * ```
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * Convenience hook for detecting tablet viewports (769px - 1024px).
 *
 * @returns Boolean indicating if viewport is tablet-sized
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

/**
 * Convenience hook for detecting desktop viewports (min-width: 1025px).
 *
 * @returns Boolean indicating if viewport is desktop-sized
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}

/**
 * Convenience hook for detecting dark mode preference.
 *
 * @returns Boolean indicating if user prefers dark mode
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/**
 * Convenience hook for detecting reduced motion preference.
 *
 * @returns Boolean indicating if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
