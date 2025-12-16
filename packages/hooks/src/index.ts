/**
 * @elshaddai/hooks
 *
 * Shared React hooks for ElShaddai projects.
 * Collection of reusable, type-safe utility hooks.
 *
 * @packageDocumentation
 */

// Value debouncing
export { useDebounce } from './useDebounce';

// Media query utilities
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from './useMediaQuery';

// Local storage sync
export { useLocalStorage } from './useLocalStorage';
