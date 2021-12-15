import cx from 'clsx';
import { forwardRef, MouseEventHandler, ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  children: ReactNode;
  className?: string | null;
  href?: string | null;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: 'button' | 'submit' | undefined;
}

const Link = forwardRef<any, LinkProps>(({
  children,
  className = null,
  href = null,
  onClick = undefined,
  type = 'button',
}, forwardedRef) => {
  const commonProps = {
    className: cx(styles.link, className),
    onClick,
    ref: forwardedRef,
  };

  if (href) {
    return <ReactRouterLink to={href} {...commonProps}>{children}</ReactRouterLink>;
  }

  // eslint-disable-next-line react/button-has-type
  return <button type={type} {...commonProps}>{children}</button>;
});

export default Link;
