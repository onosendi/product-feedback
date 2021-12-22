import { Children, useEffect, useState } from 'react';

export default function useSelectValue(
  defaultValue: string | null,
  // TODO
  children: any,
) {
  const [value, setValue] = useState({});

  useEffect(() => {
    const def = Children.toArray(children).find((child: any) => (
      child.props.value === defaultValue)) ?? children[0];
    setValue(def.props);
  }, [children, defaultValue]);

  // TODO
  return [value as any, setValue];
}
