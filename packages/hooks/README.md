# @elshaddai/hooks

Shared React hooks for ElShaddai projects - production-ready, type-safe utilities.

## Installation

```bash
pnpm add @elshaddai/hooks

# or
npm install @elshaddai/hooks

# or
yarn add @elshaddai/hooks
```

## Hooks

### `useDebounce`

Debounce a value by delaying updates until after a specified delay.

**Use Cases:** Search inputs, form validation, resize handlers

```tsx
import { useDebounce } from '@elshaddai/hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call only after user stops typing for 500ms
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**API:**
- `useDebounce<T>(value: T, delay?: number): T`
- Default delay: 300ms

---

### `useMediaQuery`

Track whether a media query matches the current viewport.

**Use Cases:** Responsive design, dark mode detection, accessibility

```tsx
import { useMediaQuery, useIsMobile, usePrefersDarkMode } from '@elshaddai/hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isDark = usePrefersDarkMode();
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
      {isDark && <DarkModeIndicator />}
    </div>
  );
}
```

**Convenience Hooks:**
- `useIsMobile()` - `(max-width: 768px)`
- `useIsTablet()` - `(min-width: 769px) and (max-width: 1024px)`
- `useIsDesktop()` - `(min-width: 1025px)`
- `usePrefersDarkMode()` - `(prefers-color-scheme: dark)`
- `usePrefersReducedMotion()` - `(prefers-reduced-motion: reduce)`

**API:**
- `useMediaQuery(query: string): boolean`

---

### `useLocalStorage`

Sync state with localStorage with automatic JSON serialization.

**Use Cases:** Persisting user preferences, theme settings, form drafts

```tsx
import { useLocalStorage } from '@elshaddai/hooks';

function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <button onClick={removeTheme}>Reset to Default</button>
    </div>
  );
}
```

**Features:**
- Automatic JSON serialization/deserialization
- Syncs across browser tabs (storage events)
- Graceful error handling (falls back to initial value)
- Functional updates supported (like `useState`)
- TypeScript type safety
- SSR-safe (returns initial value on server)

**API:**
- `useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void]`
- Returns: `[value, setValue, removeValue]`

**Complex Example:**
```tsx
interface User {
  name: string;
  preferences: {
    notifications: boolean;
    language: string;
  };
}

function UserProfile() {
  const [user, setUser] = useLocalStorage<User>('user', {
    name: 'Guest',
    preferences: { notifications: true, language: 'en' }
  });

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <label>
        <input
          type="checkbox"
          checked={user.preferences.notifications}
          onChange={(e) => setUser({
            ...user,
            preferences: {
              ...user.preferences,
              notifications: e.target.checked
            }
          })}
        />
        Enable Notifications
      </label>
    </div>
  );
}
```

---

## TypeScript Support

All hooks are fully typed with TypeScript. Generic type parameters are inferred automatically:

```tsx
// Type is inferred as string
const debouncedSearch = useDebounce(searchTerm, 500);

// Type is explicitly set
const [user, setUser] = useLocalStorage<User>('user', defaultUser);
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 support via polyfills (localStorage only)
- SSR-safe (Next.js, Remix compatible)

## Peer Dependencies

- React 18+ or React 19+

## License

MIT

## Contributing

Part of the ElShaddai workspace. See [main repository](https://github.com/elshaddai/packages) for contribution guidelines.

---

**Version:** 0.1.0
**Updated:** December 15, 2025
