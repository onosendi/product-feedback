import cx from 'clsx';
import { ElementType, forwardRef, ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode,
  className?: string | null,
  component?: ElementType | string,
  noWrapper?: boolean,
  wrapperClassName?: string | null,
  wrapperComponent?: ElementType | string,
}

const Container = forwardRef<HTMLElement, ContainerProps>(({
  children,
  className = null,
  component: Component = 'div',
  noWrapper = false,
  wrapperClassName = null,
  wrapperComponent: WrapperComponent = 'div',
}, forwardedRef) => {
  const component = (
    <Component className={cx(styles.container, className)} ref={forwardedRef}>
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

export default Container;
