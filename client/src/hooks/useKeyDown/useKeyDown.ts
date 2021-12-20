import { useCallback, useEffect } from 'react';

export default function useKeyDown(
  keyAndFunctions: { [key: string]: VoidFunction | VoidFunction[]; },
  enabled: boolean | null = null,
) {
  const listener = useCallback((event: KeyboardEvent) => {
    Object.entries(keyAndFunctions).forEach(([key, val]) => {
      if (key === event.key) {
        const callbackArray = Array.isArray(val) ? val : [val];
        callbackArray.forEach((handler) => {
          handler();
        });
      }
    });
  }, [keyAndFunctions]);

  useEffect(() => {
    if (typeof enabled === 'boolean' ? enabled : !enabled) {
      document.addEventListener('keydown', listener);
    } else {
      document.removeEventListener('keydown', listener);
    }

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [enabled, listener, keyAndFunctions]);
}
