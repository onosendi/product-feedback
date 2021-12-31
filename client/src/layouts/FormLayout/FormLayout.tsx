import cx from 'clsx';
import type { ReactNode } from 'react';
import { AuthBar } from '../../auth/components';
import { Container, GoBack } from '../../components';
import styles from './FormLayout.module.scss';

interface DialogLayoutProps {
  children: ReactNode;
}

export default function DialogLayout({
  children,
}: DialogLayoutProps) {
  return (
    <Container className={cx(styles.container)}>
      <div className={cx(styles.goBackAndUserBarWrapper)}>
        <GoBack shade="dark" />
        <AuthBar
          className={cx(styles.userBar)}
          wrapperClassName={cx(styles.userBarWrapper)}
        />
      </div>
      {children}
    </Container>
  );
}
