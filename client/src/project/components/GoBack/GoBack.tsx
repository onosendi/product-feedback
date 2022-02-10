import cx from 'clsx';
import { useGoBack } from '../../hooks';
import styles from './GoBack.module.scss';

interface GoBackProps {
  className?: string;
  shade: 'light' | 'dark';
}

export default function GoBack({
  className,
  shade,
}: GoBackProps) {
  const goBack = useGoBack();

  return (
    <button
      onClick={goBack}
      className={cx(
        'type-4',
        styles.goBack,
        styles[shade],
        className,
      )}
      type="button"
    >
      Go Back
    </button>
  );
}
