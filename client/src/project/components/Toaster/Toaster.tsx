import cx from 'clsx';
import { Toaster as ReactHotToaster } from 'react-hot-toast';
import styles from './Toaster.module.scss';

export default function Toaster() {
  return (
    <ReactHotToaster
      toastOptions={{
        className: cx('type-jost', styles.toast),
        duration: 3000,
      }}
    />
  );
}
