import cx from 'clsx';
import styles from './Picture.module.scss';

interface PictureProps {
  alt: string;
  className?: string;
  src?: string;
}

export default function Picture({
  alt,
  className,
  src,
}: PictureProps) {
  const imgSrc = src ?? '/static/img/default-user-picture.png';
  const defaultAlt = 'User picture placeholder';

  return (
    <img
      alt={src ? alt : defaultAlt}
      className={cx(styles.img, !src && styles.opaque, className)}
      src={imgSrc}
    />
  );
}
