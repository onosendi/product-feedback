import cx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

interface SelectListItemProps {
  children: ReactNode;
  className?: string | null;
  onClick?: MouseEventHandler;
  value: string;
}

export default function SelectListItem({
  children,
  className = null,
  onClick = () => {},
  value,
}: SelectListItemProps) {
  return (
    <button
      className={cx(className)}
      onClick={onClick}
      type="button"
      value={value}
    >
      {children}
    </button>
  );
}
