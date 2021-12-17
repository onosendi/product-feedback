import { useEffect } from 'react';

export default function useNoScroll() {
  const html = document.querySelector('html') as HTMLElement;

  useEffect(() => {
    html.style.overflow = 'hidden';

    return () => {
      html.style.overflow = '';
    };
  }, [html]);
}
