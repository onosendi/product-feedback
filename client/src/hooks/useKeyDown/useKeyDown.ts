import { useCallback, useEffect } from 'react';

export default function useKeyDown(
  // TODO
  obj: { [key: string]: any },
  enabled: boolean | null = null,
) {
  const listener = useCallback((event) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (key === event.key) {
        const callbackArray = Array.isArray(val) ? val : [val];
        callbackArray.forEach((handler) => {
          handler();
        });
      }
    });
  }, [obj]);

  useEffect(() => {
    if (typeof enabled === 'boolean' ? enabled : !enabled) {
      document.addEventListener('keydown', listener);
    } else {
      document.removeEventListener('keydown', listener);
    }

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [enabled, listener, obj]);
}
