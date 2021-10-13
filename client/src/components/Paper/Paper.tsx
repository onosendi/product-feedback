import cx from 'clsx';
import PropTypes from 'prop-types';
import {
  ElementType,
  forwardRef,
  ReactNode,
} from 'react';
import styles from './Paper.module.scss';

interface PaperProps {
  children: ReactNode,
  className: string | null,
  component: ElementType | string,
}

const Paper = forwardRef<HTMLElement, PaperProps>(({
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};


export default Paper;
