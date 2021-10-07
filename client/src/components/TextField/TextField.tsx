import cx from 'clsx';
import PropTypes from 'prop-types';
import { ChangeEvent, useState } from 'react';

import { InputLabel } from '..';
import styles from './TextField.module.scss';

const TextField = ({
  defaultValue,
  description,
  error,
  helperText: string,
  id,
  label,
  labelClassName,
  labelTextClassName,
  labelWrapperClassName,
  maxLength,
  multiline,
  name,
  showCharsLeft,
  showLabel,
  type,
  ...props
}) => {
  const [charsLeft, setCharsLeft] = useState(maxLength - (defaultValue?.length ?? 0));

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (maxLength) {
      const charLength = event.currentTarget.value.length;
      setCharsLeft(maxLength - charLength);
    }
  };

  const commonProps = {
    defaultValue,
    id,
    maxLength,
    name,
    onChange,
    ...props,
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
      charsLeft={charsLeft}
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
};

TextField.defaultProps = {
  defaultValue: undefined,
  description: null,
  error: false,
  helperText: null,
  labelClassName: null,
  labelTextClassName: null,
  labelWrapperClassName: null,
  maxLength: null,
  multiline: false,
  showCharsLeft: true,
  showLabel: true,
  type: 'text',
};

TextField.propTypes = {
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  labelTextClassName: PropTypes.string,
  labelWrapperClassName: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  showCharsLeft: PropTypes.bool,
  showLabel: PropTypes.bool,
  type: PropTypes.string,
};

export default TextField;
