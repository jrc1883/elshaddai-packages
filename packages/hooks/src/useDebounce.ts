import { useState, useEffect } from 'react';

/**
 * Debounces a value by delaying updates until after a specified delay.
 * Useful for reducing API calls during rapid user input (e.g., search).
 *
 * @template T - The type of value to debounce
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before updating (default: 300ms)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebounce(search, 500);
 *
 *   useEffect(() => {
 *     // API call only after user stops typing for 500ms
 *     if (debouncedSearch) {
 *       fetchResults(debouncedSearch);
 *     }
 *   }, [debouncedSearch]);
 *
 *   return (
 *     <input
 *       value={search}
 *       onChange={(e) => setSearch(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 *
 * @remarks
 * This hook is particularly useful for:
 * - Search inputs (avoid excessive API calls)
 * - Form validation (wait for user to finish typing)
 * - Window resize handlers (throttle expensive calculations)
 *
 * The debounce timer resets on each value change, ensuring the debounced
 * value only updates after the specified delay of inactivity.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes before delay expires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
