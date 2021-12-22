import cx from 'clsx';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  className?: string | null;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string | null;
  onClick?: VoidFunction;
  prependPlus?: boolean;
  selected?: boolean;
  type?: 'button' | 'submit';
  variant: '1' | '2' | '3' | '4' | '5';
}

const Button = forwardRef<any, ButtonProps>(({
  children,
  className = null,
  disabled = false,
  fullWidth = false,
  href = null,
  onClick = () => {},
  prependPlus = false,
  selected = false,
  type = 'button',
  variant,
}, forwardedRef) => {
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
    disabled,
    onClick,
    ref: forwardedRef,
  };

  return href
    ? <Link to={href} {...commonProps}>{children}</Link>
    // eslint-disable-next-line react/button-has-type
    : <button type={type} {...commonProps}>{children}</button>;
});

export default Button;
