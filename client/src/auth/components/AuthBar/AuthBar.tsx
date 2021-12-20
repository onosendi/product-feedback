import cx from 'clsx';
import { useDispatch } from 'react-redux';
import { Container, Link } from '../../../components';
import routes from '../../../lib/routes';
import { useAuth } from '../../hooks';
import { logout } from '../../slice';
import styles from './AuthBar.module.scss';

interface AuthBarProps {
  className?: string | null,
  wrapperClassName?: string | null,
}

export default function AuthBar({
  className = null,
  wrapperClassName = null,
}: AuthBarProps) {
  const dispatch = useDispatch();
  const { isAuthenticated, ...auth } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container
      aria-label="user controls"
      className={cx('type-body2', styles.userBar, className)}
      component="nav"
      wrapperClassName={cx(styles.wrapper, wrapperClassName)}
    >
      {isAuthenticated && (
        <Link href={routes.user.edit}>{auth.username}</Link>
      )}
      {isAuthenticated
        ? <Link onClick={handleLogout}>Logout</Link>
        : (
          <p className={cx('type-body2', styles.loginOrRegister)}>
            <Link href={routes.auth.login}>Login</Link>
            {' or '}
            <Link href={routes.user.register}>Register</Link>
          </p>
        )}
    </Container>
  );
}
