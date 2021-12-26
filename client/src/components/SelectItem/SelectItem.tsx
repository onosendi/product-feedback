import cx from 'clsx';
import type { ReactNode } from 'react';

interface SelectListItemProps {
  children: ReactNode;
  className?: string | null;
  value: string;
}

export default function SelectListItem({
  children,
  className,
  value,
}: SelectListItemProps) {
  return (
    <button
      className={cx(className)}
      value={value}
      type="button"
    >
      {children}
    </button>
  );
}
