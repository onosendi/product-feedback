import cx from 'clsx';
import PropTypes from 'prop-types';
import styles from './InputLabel.module.scss';

const InputLabel = ({
  charsLeft,
  children,
  className,
  description,
  error,
  helperText,
  htmlFor,
  label,
  labelTextClassName,
  labelWrapperClassName,
  showCharsLeft,
  showLabel,
  ...props
}) => {
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
    <label
      className={cx(styles.label, className)}
      htmlFor={htmlFor}
      {...props}
    >
      {renderLabel()}
      {children}
      {!!helperText && (
        <span className={cx('type-jost', error && styles.error, styles.helper)}>
          {helperText}
        </span>
      )}
    </label>
  );
};

InputLabel.defaultProps = {
  charsLeft: null,
  className: null,
  description: null,
  error: false,
  helperText: null,
  labelTextClassName: null,
  labelWrapperClassName: null,
  showCharsLeft: true,
  showLabel: true,
};

InputLabel.propTypes = {
  charsLeft: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelTextClassName: PropTypes.string,
  labelWrapperClassName: PropTypes.string,
  showCharsLeft: PropTypes.bool,
  showLabel: PropTypes.bool,
};

export default InputLabel;
