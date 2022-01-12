// TODO: put form into its own component
import cx from 'clsx';
import { Helmet } from 'react-helmet-async';
import { useNavigateAuthorized } from '../../../auth/hooks';
import { Link, Paper } from '../../../project/components';
import { APP_NAME } from '../../../project/constants';
import { AuthLayout } from '../../../project/layouts';
import routes from '../../../project/routes';
import { RegisterForm } from '../../components';
import styles from './Register.module.scss';

export default function Register() {
  useNavigateAuthorized();

  return (
    <>
      <Helmet>
        <title>{`Register - ${APP_NAME}`}</title>
      </Helmet>
      <AuthLayout>
        <main>
          <Paper className={cx(styles.paper)}>
            <h1 className={cx('type-1', styles.heading)}>Register</h1>
            <RegisterForm />
          </Paper>
          <p className={cx('type-body2', styles.login)}>
            {'Already registered? '}
            <Link href={routes.auth.login}>Login</Link>
            {', or go '}
            <Link href={routes.index}>home</Link>
            .
          </p>
        </main>
      </AuthLayout>
    </>
  );
}
