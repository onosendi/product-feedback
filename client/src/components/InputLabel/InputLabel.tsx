import cx from 'clsx';
import type { ReactNode } from 'react';
import styles from './InputLabel.module.scss';

interface InputLabelProps {
  charsLeft?: number | null;
  children: ReactNode;
  className?: string | null;
  description?: string | null;
  hasError?: boolean;
  helperText?: string | null;
  htmlFor: string;
  label: string;
  labelTextClassName?: string | null;
  labelWrapperClassName?: string | null;
  showCharsLeft?: boolean | null;
  showLabel?: boolean | null;
}

export default function InputLabel({
  charsLeft = null,
  children,
  className = null,
  description = null,
  hasError = false,
  helperText = null,
  htmlFor,
  label,
  labelTextClassName = null,
  labelWrapperClassName = null,
  showCharsLeft = true,
  showLabel = true,
}: InputLabelProps) {
  const renderLabel = () => {
    if (showLabel) {
      return (
        <span className={cx(styles.wrapper, labelWrapperClassName)}>
          <span className={cx('type-4', styles.text, labelTextClassName)}>{label}</span>
          {!!description && (
            <span className={cx('type-jost', styles.description)}>{description}</span>
          )}
          {showCharsLeft && (
            <span className={cx('type-jost-bold', styles.charsLeft)}>{charsLeft}</span>
          )}
        </span>
      );
    }
    return <span className={cx('sr-only')}>{label}</span>;
  };

  return (
    <label className={cx(styles.label, className)} htmlFor={htmlFor}>
      {renderLabel()}
      {children}
      {!!helperText && (
        <span className={cx('type-jost', hasError && styles.error, styles.helper)}>
          {helperText}
        </span>
      )}
    </label>
  );
}
