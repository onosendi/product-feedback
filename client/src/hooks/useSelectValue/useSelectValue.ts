import type { ReactNode } from 'react';
import { Children, isValidElement, useState } from 'react';

export default function useSelectValue(
  children: ReactNode,
  defaultValue?: string | null,
) {
  const [value, setValue] = useState(() => {
    const child = Children.toArray(children).find((c) => (
      isValidElement(c) && c.props.value === defaultValue));
    if (child && isValidElement(child)) {
      return child.props.children;
    }
    const firstChild = Children.toArray(children)[0];
    if (firstChild && isValidElement(firstChild)) {
      return firstChild.props.children;
    }
    return null;
  });

  return [value, setValue];
}
