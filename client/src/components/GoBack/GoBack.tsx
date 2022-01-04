// TODO: Better back navigation. Querystrings aren't saved.
import cx from 'clsx';
import type { NavigateOptions } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import styles from './GoBack.module.scss';

interface GoBackProps {
  className?: string;
  href?: string;
  navigateOptions?: NavigateOptions;
  shade: 'light' | 'dark';
}

export default function GoBack({
  className,
  href,
  navigateOptions,
  shade,
}: GoBackProps) {
  const navigate = useNavigate();

  const commonProps = {
    className: cx(
      'type-4',
      styles.goBack,
      styles[shade],
      className,
    ),
  };

  const onClick = () => {
    navigate(-1);
  };

  if (href) {
    return (
      <Link
        to={href}
        {...navigateOptions}
        {...commonProps}
      >
        Go Back
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      {...commonProps}
    >
      Go Back
    </button>
  );
}
