import cx from 'clsx';
import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { InputLabel } from '..';
import styles from './TextField.module.scss';

interface TextFieldProps {
  autoFocus?: boolean;
  defaultValue?: string;
  description?: string;
  disabled?: boolean;
  hasError?: boolean;
  helperText?: string;
  id: string;
  label: string;
  labelClassName?: string;
  labelTextClassName?: string;
  labelWrapperClassName?: string;
  maxLength?: number;
  multiline?: boolean;
  name: string;
  onBlur?: VoidFunction;
  onChange?: ChangeEventHandler;
  onFocus?: (event?: any) => void;
  placeholder?: string;
  rows?: number;
  showCharsLeft?: boolean;
  showLabel?: boolean;
  type?: HTMLInputTypeAttribute;
}

export default function TextField({
  autoFocus,
  defaultValue,
  description,
  disabled,
  hasError = false,
  helperText,
  id,
  label,
  labelClassName,
  labelTextClassName,
  labelWrapperClassName,
  maxLength,
  multiline = false,
  name,
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  placeholder,
  rows,
  showLabel = true,
  type = 'text',
}: TextFieldProps) {
  const commonProps = {
    autoFocus,
    defaultValue,
    disabled,
    id,
    maxLength,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
  };

  const commonClasses = cx('type-body2', styles.control, hasError && styles.error);

  const renderControl = () => {
    if (multiline) {
      return (
        <textarea
          className={cx(commonClasses, styles.textarea)}
          rows={rows}
          {...commonProps}
        />
      );
    }
    return (
      <input
        className={cx(commonClasses)}
        type={type}
        {...commonProps}
      />
    );
  };

  return (
    <InputLabel
      className={labelClassName}
      description={description}
      hasError={hasError}
      helperText={helperText}
      htmlFor={id}
      label={label}
      labelTextClassName={labelTextClassName}
      labelWrapperClassName={labelWrapperClassName}
      showLabel={showLabel}
    >
      {renderControl()}
    </InputLabel>
  );
}
