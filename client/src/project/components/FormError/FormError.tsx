import cx from 'clsx';
import styles from './FormError.module.scss';

type FormErrorProps = {
  className?: string,
  message?: string,
};

export default function FormError({
  className,
  message = 'Form contains errors',
}: FormErrorProps) {
  return (
    <p
      className={cx(
        'type-jost',
        styles.error,
        className,
      )}
    >
      {message}
    </p>
  );
}
