import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './Link.module.scss';

const Link = forwardRef(({
  children,
  className,
  href,
  type,
  ...props
}, fRef) => {
  const commonProps = {
    className: cx(styles.link, className),
    ref: fRef,
    ...props,
  };

  if (href) {
    return (
      <ReactRouterLink
        href={href}
        to={href}
        {...commonProps}
      >
        {children}
      </ReactRouterLink>
    );
  }

  return <button type={type} {...commonProps}>{children}</button>;
});

Link.defaultProps = {
  className: null,
  href: null,
  type: 'button',
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
};

export default Link;
