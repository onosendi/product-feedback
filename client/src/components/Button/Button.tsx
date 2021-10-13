import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const buttonPropTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  prependPlus: PropTypes.bool,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit'] as const),
  variant: PropTypes.oneOf(['1', '2', '3', '4', '5'] as const).isRequired,
};

type ButtonProps = PropTypes.InferProps<typeof buttonPropTypes>;

const Button = forwardRef(({
  children,
  className = null,
  fullWidth,
  href,
  prependPlus,
  selected,
  type,
  variant,
  ...props
}: ButtonProps, forwardedRef) => {
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

Button.defaultProps = {
  className: null,
  fullWidth: false,
  href: null,
  prependPlus: false,
  selected: false,
  type: 'button',
};


export default Button;
