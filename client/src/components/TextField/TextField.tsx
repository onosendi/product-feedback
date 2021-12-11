import cx from 'clsx';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { InputLabel } from '..';
import styles from './TextField.module.scss';

type TextFieldProps = {
  defaultValue?: string | undefined,
  description?: string | null,
  error?: boolean | null,
  helperText?: string | null,
  id: string,
  label: string,
  labelClassName?: string | null,
  labelTextClassName?: string | null,
  labelWrapperClassName?: string | null,
  maxLength?: number | undefined,
  multiline?: boolean | null,
  name: string,
  onChange: ChangeEventHandler,
  showCharsLeft?: boolean | null,
  showLabel?: boolean | null,
  type?: HTMLInputTypeAttribute,
};

export default function TextField({
  defaultValue = undefined,
  description = null,
  error = false,
  helperText = null,
  id,
  label,
  labelClassName = null,
  labelTextClassName = null,
  labelWrapperClassName = null,
  maxLength = undefined,
  multiline = false,
  name,
  onChange,
  showCharsLeft = true,
  showLabel = true,
  type = 'text',
}: TextFieldProps) {
  // const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   if (maxLength) {
  //     const charLength = event.currentTarget.value.length;
  //     setCharsLeft(maxLength - charLength);
  //   }
  // };
  const commonProps = {
    defaultValue,
    id,
    maxLength,
    name,
    onChange,
  };

  const commonClasses = cx('type-body2', styles.control, error && styles.error);

  const renderControl = () => {
    if (multiline) {
      return (
        <textarea className={cx(commonClasses, styles.textarea)} {...commonProps} />
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
      error={error}
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
