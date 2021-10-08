import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode,
  className: string | null,
  fullWidth: boolean,
  href: string | null,
  prependPlus: boolean,
  selected: boolean,
  type: 'button' | 'submit',
  variant: '1' | '2' | '3' | '4' | '5',
}

type ButtonRef = HTMLButtonElement | HTMLAnchorElement;

const Button = forwardRef<ButtonRef, ButtonProps>(({
  children,
  className,
  fullWidth,
  href,
  prependPlus,
  selected,
  type,
  variant,
  ...props
}, fRef) => {
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
    ref: fRef,
    ...props,
  };

  return href
    ? <Link to={href} href={href} {...commonProps}>{children}</Link>
    // eslint-disable-next-line react/button-has-type
    : <button type={type} {...commonProps}>{children}</button>;
});

Button.defaultProps = {
  className: null,
  fullWidth: false,
  href: null,
  prependPlus: false,
  selected: false,
  type: 'button',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  prependPlus: PropTypes.bool,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['1', '2', '3', '4', '5']).isRequired,
};

export default Button;
