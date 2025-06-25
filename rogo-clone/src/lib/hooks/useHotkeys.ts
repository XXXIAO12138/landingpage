import { useEffect } from 'react';

/**
 * useHotkeys – listen for global key combinations.
 *
 * @param combos Array of combo strings in lowercase, e.g. ['ctrl+shift+k'].
 * @param fn     Callback when a combo matches.
 */
export const useHotkeys = (combos: string[], fn: () => void) => {
  useEffect(() => {
    // Normalize combos to lowercase for consistent matching
    const targets = combos.map(c => c.toLowerCase());

    const handler = (e: KeyboardEvent) => {
      // Determine keyName: single-character e.key (lowercased), otherwise e.code
      const keyName = e.key.length === 1 ? e.key.toLowerCase() : e.code;
      // Build combination string of modifiers + keyName
      const combo = [
        e.metaKey && 'cmd',
        e.ctrlKey && 'ctrl',
        e.altKey && 'alt',
        e.shiftKey && 'shift',
        keyName
      ]
        .filter(Boolean)
        .join('+')
        .toLowerCase();

      if (targets.includes(combo)) {
        e.preventDefault();
        fn();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [combos, fn]);
};
