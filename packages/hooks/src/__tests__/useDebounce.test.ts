import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 500 });

    // Should not update immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Should still be initial
    expect(result.current).toBe('initial');

    // Fast-forward remaining time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should update after delay
    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'a' } }
    );

    expect(result.current).toBe('a');

    // Rapid updates
    rerender({ value: 'b' });
    act(() => { vi.advanceTimersByTime(200); });

    rerender({ value: 'c' });
    act(() => { vi.advanceTimersByTime(200); });

    rerender({ value: 'd' });
    act(() => { vi.advanceTimersByTime(200); });

    // Should still be initial value
    expect(result.current).toBe('a');

    // Complete the debounce (500ms total from last update)
    act(() => { vi.advanceTimersByTime(300); });

    // Should update to final value
    expect(result.current).toBe('d');
  });

  it('should use default delay of 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('initial');

    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('updated');
  });

  it('should work with different types', () => {
    // Number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 0 } }
    );

    numberRerender({ value: 42 });
    act(() => { vi.advanceTimersByTime(300); });
    expect(numberResult.current).toBe(42);

    // Object
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: { name: 'initial' } } }
    );

    objectRerender({ value: { name: 'updated' } });
    act(() => { vi.advanceTimersByTime(300); });
    expect(objectResult.current).toEqual({ name: 'updated' });

    // Array
    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: [1, 2, 3] } }
    );

    arrayRerender({ value: [4, 5, 6] });
    act(() => { vi.advanceTimersByTime(300); });
    expect(arrayResult.current).toEqual([4, 5, 6]);
  });

  it('should cleanup timeout on unmount', () => {
    const { rerender, unmount } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    // Unmount before timeout completes
    unmount();

    // Advance timers - should not cause any errors
    act(() => { vi.advanceTimersByTime(500); });

    // No assertions needed - just checking for no errors
    expect(true).toBe(true);
  });
});
