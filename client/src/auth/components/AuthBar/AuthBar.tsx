import cx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Link } from '../../../components';
import routes from '../../../lib/routes';
import { selectAuth, selectIsAuthenticated } from '../../redux/selectors';
import { actLogout } from '../../redux/slice';
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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const auth = useSelector(selectAuth);

  const logout = () => {
    dispatch(actLogout());
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
        ? <Link onClick={logout}>Logout</Link>
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
