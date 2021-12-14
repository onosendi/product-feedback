import cx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  children: ReactNode;
  className?: string | null;
  href?: string | null;
  type?: 'button' | 'submit' | undefined;
}

const Link = forwardRef<any, LinkProps>(({
  children,
  className = null,
  href = null,
  type = 'button',
}, forwardedRef) => {
  const commonProps = {
    className: cx(styles.link, className),
    ref: forwardedRef,
  };

  if (href) {
    return <ReactRouterLink to={href} {...commonProps}>{children}</ReactRouterLink>;
  }

  // eslint-disable-next-line react/button-has-type
  return <button type={type} {...commonProps}>{children}</button>;
});

export default Link;
