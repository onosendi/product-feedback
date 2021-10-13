import cx from 'clsx';
import { ElementType, forwardRef, ReactNode } from 'react';
import styles from './Paper.module.scss';

interface PaperProps {
  children: ReactNode,
  className?: string | null,
  component?: ElementType | string,
  [Index: string]: any,
}

const Paper = forwardRef<HTMLElement, PaperProps>(({
  children,
  className = null,
  component: Component = 'div',
  ...props
}, ref) => (
  <Component className={cx(styles.paper, className)} ref={ref} {...props}>
    {children}
  </Component>
));

export default Paper;
