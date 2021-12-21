import { RefObject, useCallback, useEffect } from 'react';

export default function useOutsideClick(
  callback: (event: Event) => void,
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  enabled: boolean | null = null,
) {
  const listener = useCallback((event) => {
    const refsArray = Array.isArray(refs) ? refs : [refs];
    if (refsArray.some((ref) => ref?.current?.contains(event.target))) {
      return;
    }
    callback(event);
  }, [callback, refs]);

  useEffect(() => {
    if (typeof enabled === 'boolean' ? enabled : !enabled) {
      document.addEventListener('mousedown', listener);
    } else {
      document.removeEventListener('mousedown', listener);
    }

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [callback, enabled, listener, refs]);
}
