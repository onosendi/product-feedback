import cx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  children: ReactNode;
  className?: string | null;
  href?: string | null;
}

const Link = forwardRef<any, LinkProps>(({
  children,
  className = null,
  href = null,
}, forwardedRef) => {
  const commonProps = {
    className: cx(styles.link, className),
    ref: forwardedRef,
  };

  if (href) {
    return <ReactRouterLink to={href} {...commonProps}>{children}</ReactRouterLink>;
  }

  return <button type="button" {...commonProps}>{children}</button>;
});

export default Link;
