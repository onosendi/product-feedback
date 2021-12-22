import cx from 'clsx';
import styles from './SelectCaret.module.scss';

interface SelectCaretProps {
  className?: string | null;
  open: boolean;
}

export default function SelectCaret({
  className = null,
  open,
}: SelectCaretProps) {
  return (
    <span className={cx(styles.caret, open && styles.open, className)} />
  );
}
