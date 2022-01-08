import cx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import type { NavigateOptions } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  children: ReactNode;
  className?: string | null;
  href?: string | null;
  navigateOptions?: NavigateOptions;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: 'button' | 'submit' | undefined;
}

const Link = forwardRef<any, LinkProps>(({
  children,
  className = null,
  href = null,
  navigateOptions,
  onClick = undefined,
  type = 'button',
}, forwardedRef) => {
  const commonProps = {
    className: cx(styles.link, className),
    onClick,
    ref: forwardedRef,
    ...navigateOptions,
  };

  if (href) {
    return <ReactRouterLink to={href} {...commonProps}>{children}</ReactRouterLink>;
  }

  // eslint-disable-next-line react/button-has-type
  return <button type={type} {...commonProps}>{children}</button>;
});

export default Link;
