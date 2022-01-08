import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

interface DelayChildrenProps {
  children: ReactElement;
  milliseconds?: number;
}

export default function DelayChildren({
  children,
  milliseconds = 1000,
}: DelayChildrenProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, milliseconds);

    return () => {
      clearTimeout(timeout);
    };
  }, [milliseconds]);

  return show ? children : null;
}
