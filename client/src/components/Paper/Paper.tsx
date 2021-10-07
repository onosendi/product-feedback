import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import styles from './Paper.module.scss';

const Paper = forwardRef(({
  children,
  className,
  component: Component,
  ...props
}, ref) => (
  <Component className={cx(styles.paper, className)} ref={ref} {...props}>
    {children}
  </Component>
));

Paper.defaultProps = {
  className: null,
  component: 'div',
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.string,
};

export default Paper;
