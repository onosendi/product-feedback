import { useRef, useState } from 'react';

export default function useAnimatedToggle() {
  const [mounted, setMounted] = useState(false);
  const [startAnimatingOut, setStartAnimatingOut] = useState(false);
  const toggleRef = useRef<HTMLElement>(null);

  const open = () => {
    setMounted(true);
  };

  const close = () => {
    setStartAnimatingOut(true);
  };

  const toggle = () => {
    const func = mounted ? close : open;
    func();
  };

  const onAnimationEnd = () => {
    if (startAnimatingOut) {
      setMounted(false);
      setStartAnimatingOut(false);
    }
  };

  return {
    close,
    mounted,
    onAnimationEnd,
    startAnimatingOut,
    toggle,
    toggleRef,
  };
}
