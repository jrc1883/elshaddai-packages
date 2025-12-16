import { useState, useEffect, useCallback } from 'react';

/**
 * Syncs state with localStorage with automatic JSON serialization.
 * Provides a React state-like API that persists across sessions.
 *
 * @template T - The type of value to store
 * @param key - localStorage key
 * @param initialValue - Default value if key doesn't exist
 * @returns Tuple of [value, setValue, removeValue]
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *         Toggle Theme
 *       </button>
 *       <button onClick={removeTheme}>Reset to Default</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With complex objects
 * interface User {
 *   name: string;
 *   preferences: {
 *     notifications: boolean;
 *     language: string;
 *   };
 * }
 *
 * function UserProfile() {
 *   const [user, setUser] = useLocalStorage<User>('user', {
 *     name: 'Guest',
 *     preferences: { notifications: true, language: 'en' }
 *   });
 *
 *   return (
 *     <div>
 *       <input
 *         value={user.name}
 *         onChange={(e) => setUser({ ...user, name: e.target.value })}
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * Features:
 * - Automatic JSON serialization/deserialization
 * - Syncs across browser tabs using storage events
 * - Graceful error handling (falls back to initial value)
 * - Functional updates supported (like useState)
 * - TypeScript type safety
 *
 * Limitations:
 * - Only works in browser (SSR requires client-side check)
 * - localStorage has ~5-10MB limit
 * - Values must be JSON-serializable
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow functional updates (like useState)
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}
