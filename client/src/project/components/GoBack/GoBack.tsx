// TODO: Better back navigation. Querystrings aren't saved.
import cx from 'clsx';
import { Link } from 'react-router-dom';
import { usePreviousPage } from '../../hooks';
import styles from './GoBack.module.scss';

interface GoBackProps {
  className?: string;
  href?: string;
  shade: 'light' | 'dark';
}

export default function GoBack({
  className,
  href,
  shade,
}: GoBackProps) {
  const previousPage = usePreviousPage();

  return (
    <Link
      className={cx(
        'type-4',
        styles.goBack,
        styles[shade],
        className,
      )}
      to={href || previousPage}
    >
      Go Back
    </Link>
  );
}
