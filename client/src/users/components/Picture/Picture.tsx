import cx from 'clsx';
import styles from './Picture.module.scss';

interface PictureProps {
  alt: string;
  className?: string;
  emailHash?: string;
}

export default function Picture({
  alt,
  className,
  emailHash = '',
}: PictureProps) {
  const defaultAlt = 'User picture placeholder';
  const src = `https://www.gravatar.com/avatar/${emailHash}?s=40&d=mp`;

  return (
    <img
      alt={src ? alt : defaultAlt}
      className={cx(styles.img, className)}
      src={src}
    />
  );
}
