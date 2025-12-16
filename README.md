# ElShaddai Packages

Reusable React utilities and components for modern web applications.

## 📦 Packages

### [@elshaddai/hooks](./packages/hooks)

Production-ready React hooks for common patterns.

```bash
npm install @elshaddai/hooks
```

**Included Hooks:**
- `useDebounce` - Debounce values (search inputs, form validation)
- `useMediaQuery` - Responsive design and media query tracking
- `useIsMobile`, `useIsTablet`, `useIsDesktop` - Convenience viewport hooks
- `usePrefersDarkMode`, `usePrefersReducedMotion` - Accessibility preferences
- `useLocalStorage` - Persistent state with multi-tab sync

**Features:**
- 🎯 Zero dependencies
- 📦 Tiny bundle size (5.2 kB compressed)
- 💪 Full TypeScript support
- ⚡ Tree-shakeable ESM + CommonJS
- 🧪 100% test coverage
- 📖 Comprehensive documentation

[View Documentation →](./packages/hooks/README.md)

---

## 🚀 Quick Start

```bash
# Install
npm install @elshaddai/hooks

# Use
import { useDebounce, useIsMobile } from '@elshaddai/hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const isMobile = useIsMobile();

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={isMobile ? 'Search...' : 'Search everything...'}
    />
  );
}
```

---

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Development mode
pnpm dev
```

---

## 📚 Documentation

Each package has its own README with detailed documentation:

- [Hooks Documentation](./packages/hooks/README.md)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT © Josep Rodriguez

---

## 🔗 Links

- [npm](https://www.npmjs.com/package/@elshaddai/hooks)
- [GitHub](https://github.com/jrc1883/elshaddai-packages)
- [Issues](https://github.com/jrc1883/elshaddai-packages/issues)
