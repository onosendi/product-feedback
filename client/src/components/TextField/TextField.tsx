import type { TypeOrUndefined } from '@t/props';
import cx from 'clsx';
import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { InputLabel } from '..';
import styles from './TextField.module.scss';

interface TextFieldProps {
  autoFocus?: boolean;
  defaultValue?: TypeOrUndefined;
  description?: TypeOrUndefined;
  hasError?: boolean;
  helperText?: TypeOrUndefined;
  id: string;
  label: string;
  labelClassName?: TypeOrUndefined;
  labelTextClassName?: TypeOrUndefined;
  labelWrapperClassName?: TypeOrUndefined;
  maxLength?: TypeOrUndefined<number>;
  multiline?: TypeOrUndefined<boolean>;
  name: string;
  onBlur?: VoidFunction;
  onChange?: ChangeEventHandler;
  onFocus?: VoidFunction;
  placeholder?: string;
  rows?: TypeOrUndefined<number>;
  showCharsLeft?: TypeOrUndefined<boolean>;
  showLabel?: TypeOrUndefined<boolean>;
  type?: HTMLInputTypeAttribute;
}

export default function TextField({
  defaultValue,
  description,
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
    defaultValue,
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
