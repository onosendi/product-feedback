import cx from 'clsx';
import type { ReactNode } from 'react';
import { Container } from '../../components';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Container
      className={cx(styles.container)}
      wrapperClassName={cx(styles.wrapper)}
    >
      {children}
    </Container>
  );
}
