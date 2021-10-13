import cx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

type ButtonProps = {
  children: ReactNode,
  className?: string | null,
  fullWidth?: boolean,
  href?: string | null,
  prependPlus?: boolean,
  selected?: boolean,
  type?: 'button' | 'submit',
  variant: '1' | '2' | '3' | '4' | '5',
  [Index: string]: any,
};

// type ButtonRef = Ref<HTMLAnchorElement | HTMLButtonElement>;
type ButtonRef = any;

const Button = forwardRef(({
  children,
  className = null,
  fullWidth = false,
  href = null,
  prependPlus = false,
  selected = false,
  type = 'button',
  variant,
  ...props
}: ButtonProps, forwardedRef: ButtonRef) => {
  const commonProps = {
    className: cx(
      'type-4',
      styles[`variant${variant}`],
      fullWidth && styles.fullWidth,
      prependPlus && styles.prependPlus,
      selected && styles.selected,
      styles.button,
      className,
    ),
    ref: forwardedRef,
    ...props,
  };

  return href
    ? <Link to={href} href={href} {...commonProps}>{children}</Link>
    // eslint-disable-next-line react/button-has-type
    : <button type={type} {...commonProps}>{children}</button>;
});

export default Button;
