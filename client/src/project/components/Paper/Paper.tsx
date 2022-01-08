import cx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './Paper.module.scss';

interface PaperProps {
  children: ReactNode;
  className?: string;
  component?: ElementType | string;
  noValidate?: boolean;
  onSubmit?: (event: SubmitEvent) => void;
  to?: string;
}

const Paper = forwardRef<HTMLElement, PaperProps>(({
  children,
  className,
  component: Component = 'div',
  noValidate,
  onSubmit,
  to,
}, forwardedRef) => (
  <Component
    className={cx(styles.paper, className)}
    to={to}
    noValidate={noValidate}
    onSubmit={onSubmit}
    ref={forwardedRef}
  >
    {children}
  </Component>
));

export default Paper;
