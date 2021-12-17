import cx from 'clsx';
import { createPortal } from 'react-dom';
import styles from './Backdrop.module.scss';

interface BackdropProps {
  className?: string | null;
  show: boolean;
}

export default function Backdrop({
  className = null,
  show,
}: BackdropProps) {
  return createPortal(
    <div
      id="backdrop"
      className={cx(
        styles.backdrop,
        show ? styles.open : styles.close,
        className,
      )}
    />,
    document.body,
  );
}
