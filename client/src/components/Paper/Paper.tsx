import cx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './Paper.module.scss';

interface PaperProps {
  children: ReactNode;
  className?: string | null;
  component?: ElementType | string;
  href?: string;
  noValidate?: boolean;
  // TODO
  onSubmit?: any;
}

const Paper = forwardRef<HTMLElement, PaperProps>(({
  children,
  className = null,
  component: Component = 'div',
  href = null,
  noValidate,
  onSubmit,
}, forwardedRef) => (
  <Component
    className={cx(styles.paper, className)}
    href={href}
    noValidate={noValidate}
    onSubmit={onSubmit}
    ref={forwardedRef}
  >
    {children}
  </Component>
));

export default Paper;
