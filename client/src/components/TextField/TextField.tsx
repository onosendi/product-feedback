import cx from 'clsx';
import { ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute, useEffect } from 'react';
import { useState } from 'react';
import { InputLabel } from '..';
import styles from './TextField.module.scss';

interface TextFieldProps {
  autoFocus?: boolean;
  defaultValue?: string | undefined;
  description?: string | null;
  hasError?: boolean;
  helperText?: string | null;
  id: string;
  label: string;
  labelClassName?: string | null;
  labelTextClassName?: string | null;
  labelWrapperClassName?: string | null;
  maxLength?: number | undefined;
  multiline?: boolean | null;
  name: string;
  onBlur?: VoidFunction;
  onChange?: ChangeEventHandler;
  onFocus?: VoidFunction;
  placeholder?: string;
  rows?: number | undefined;
  showCharsLeft?: boolean | null;
  showLabel?: boolean | null;
  type?: HTMLInputTypeAttribute;
}

export default function TextField({
  defaultValue = undefined,
  description = null,
  hasError = false,
  helperText = null,
  id,
  label,
  labelClassName = null,
  labelTextClassName = null,
  labelWrapperClassName = null,
  maxLength = undefined,
  multiline = false,
  name,
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  placeholder = undefined,
  rows = undefined,
  showCharsLeft = true,
  showLabel = true,
  type = 'text',
}: TextFieldProps) {
  const shouldShowCharsLeft = showCharsLeft && maxLength;

  const [charsLeft, setCharsLeft] = useState<number | undefined>(undefined);

  useEffect(() => {
    setCharsLeft(defaultValue?.length || undefined);
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (shouldShowCharsLeft) {
      const charLength = event.currentTarget.value.length;
      setCharsLeft(maxLength - charLength);
    }

    // Handle events sent from React Final Form
    onChange(event);
  };

  const commonProps = {
    defaultValue,
    id,
    maxLength,
    name,
    onBlur,
    onChange: handleChange,
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
      charsLeft={charsLeft}
      className={labelClassName}
      description={description}
      hasError={hasError}
      helperText={helperText}
      htmlFor={id}
      label={label}
      labelTextClassName={labelTextClassName}
      labelWrapperClassName={labelWrapperClassName}
      showCharsLeft={showCharsLeft}
      showLabel={showLabel}
    >
      {renderControl()}
    </InputLabel>
  );
}
