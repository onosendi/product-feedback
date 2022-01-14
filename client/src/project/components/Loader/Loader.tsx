import cx from 'clsx';
import styles from './Loader.module.scss';

type LoaderProps = {
  className?: string,
  fullscreen?: boolean,
};

export default function Loader({
  className,
  fullscreen,
}: LoaderProps) {
  return (
    <div
      className={cx(
        styles.container,
        fullscreen && styles.fullscreen,
        className,
      )}
    >
      <span className={cx(styles.loader)} />
    </div>
  );
}
