import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './Container.module.scss';

const Container = forwardRef(({
  children,
  className,
  component: Component,
  noWrapper,
  wrapperClassName,
  wrapperComponent: WrapperComponent,
  ...props
}, fRef) => {
  const component = (
    <Component
      className={cx(styles.container, className)}
      ref={fRef}
      {...props}
    >
      {children}
    </Component>
  );

  if (!noWrapper) {
    return (
      <WrapperComponent className={cx(styles.wrapper, wrapperClassName)}>
        {component}
      </WrapperComponent>
    );
  }

  return component;
});

Container.displayName = 'Container';

Container.defaultProps = {
  children: null,
  className: null,
  component: 'div',
  noWrapper: false,
  wrapperClassName: null,
  wrapperComponent: 'div',
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  noWrapper: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  wrapperComponent: PropTypes.string,
};

export default Container;
