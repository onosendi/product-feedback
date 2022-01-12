import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { Link, Paper } from '../../../project/components';
import { APP_NAME } from '../../../project/constants';
import { AuthLayout } from '../../../project/layouts';
import routes from '../../../project/routes';
import { LoginForm } from '../../components';
import { useNavigateAuthorized } from '../../hooks';
import styles from './Login.module.scss';

export default function Login() {
  useNavigateAuthorized();

  return (
    <>
      <Helmet>
        <title>{`Login - ${APP_NAME}`}</title>
      </Helmet>
      <AuthLayout>
        <main>
          <Paper className={cx(styles.paper)}>
            <h1 className={cx('type-1', styles.heading)}>Login</h1>
            <LoginForm />
          </Paper>
          <p className={cx('type-body2', styles.register)}>
            {'Not registered? '}
            <Link href={routes.user.register}>Register</Link>
            {', or go '}
            <Link href={routes.index}>home</Link>
            .
          </p>
        </main>
      </AuthLayout>
    </>
  );
}
