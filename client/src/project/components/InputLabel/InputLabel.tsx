import cx from 'clsx';
import type { ReactNode } from 'react';
import styles from './InputLabel.module.scss';

interface InputLabelProps {
  charsLeft?: number;
  children: ReactNode;
  className?: string;
  description?: string;
  hasError?: boolean;
  helperText?: string;
  htmlFor: string;
  label: string;
  labelTextClassName?: string;
  labelWrapperClassName?: string;
  showCharsLeft?: boolean;
  showLabel?: boolean;
}

export default function InputLabel({
  charsLeft,
  children,
  className,
  description,
  hasError = false,
  helperText,
  htmlFor,
  label,
  labelTextClassName,
  labelWrapperClassName,
  showCharsLeft = true,
  showLabel = true,
}: InputLabelProps) {
  // Don't let errors move the page around
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
