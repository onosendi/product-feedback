import cx from 'clsx';
import { useNavigate } from 'react-router-dom';
import styles from './GoBack.module.scss';

interface GoBackProps {
  className?: string,
  shade: 'light' | 'dark',
}

export default function GoBack({
  className,
  shade,
}: GoBackProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cx(
        'type-4',
        styles.goBack,
        styles[shade],
        className,
      )}
      onClick={onClick}
    >
      Go Back
    </button>
  );
}
