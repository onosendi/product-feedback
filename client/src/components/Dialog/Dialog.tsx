import cx from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNoScroll, useOutsideClick } from '../../hooks';
import {
  Backdrop,
  Button,
  Container,
  Paper,
} from '..';
import styles from './Dialog.module.scss';

interface DialogProps {
  children: ReactNode;
  onClose: () => void;
  onProceed: () => void;
}

export default function Dialog({
  children,
  onClose,
  onProceed,
}: DialogProps) {
  const dialogRef = useRef(null);

  useOutsideClick(onClose, dialogRef);
  useNoScroll();

  return createPortal(
    <>
      <Backdrop show />
      <Container
        className={cx(styles.dialog)}
        component={Paper}
        ref={dialogRef}
        wrapperClassName={cx(styles.wrapper, styles.open)}
      >
        <p className={cx('type-body1', styles.body)}>
          {children}
        </p>
        <div className={cx(styles.buttonWrapper)}>
          <Button onClick={onProceed} variant="4">Delete</Button>
          <Button onClick={onClose} variant="3">Cancel</Button>
        </div>
      </Container>
    </>,
    document.body,
  );
}
