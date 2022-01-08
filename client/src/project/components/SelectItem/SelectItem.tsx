import cx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';

interface SelectItemProps {
  children: ReactNode;
  className?: string | null;
  onClick?: MouseEventHandler;
  selected?: boolean;
  value: string;
}

export default function SelectItem({
  children,
  className = null,
  onClick = () => {},
  selected = false,
  value,
}: SelectItemProps) {
  return (
    <button
      className={cx(className)}
      data-selected={selected}
      onClick={onClick}
      type="button"
      value={value}
    >
      {children}
    </button>
  );
}
