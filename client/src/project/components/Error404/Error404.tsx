import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from '../../constants';
import styles from './Error404.module.scss';

export default function Error404() {
  return (
    <>
      <Helmet>
        <title>{`404: This page could not be found - ${APP_NAME}`}</title>
      </Helmet>
      <div className={cx(styles.container)}>
        <h1 className={cx(styles.heading)}>404</h1>
        <p className={cx(styles.body)}>This page could not be found</p>
      </div>
    </>
  );
}
