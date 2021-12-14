import cx from 'clsx';
import { ElementType, forwardRef, ReactNode } from 'react';
import styles from './Paper.module.scss';

interface PaperProps {
  children: ReactNode;
  className?: string | null;
  component?: ElementType | string;
}

const Paper = forwardRef<HTMLElement, PaperProps>(({
  children,
  className = null,
  component: Component = 'div',
}, forwardedRef) => (
  <Component className={cx(styles.paper, className)} ref={forwardedRef}>
    {children}
  </Component>
));

export default Paper;
