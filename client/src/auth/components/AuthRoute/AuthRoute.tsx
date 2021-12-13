import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../../../lib/routes';
import { selectAuth } from '../../redux/selectors';

type AuthRouteProps = {
  children: ReactNode,
  component: any,
  key: any,
  needs: 'auth' | 'anonymous',
};

export default function AuthRoute({
  children,
  key,
  needs,
  ...rest
}: AuthRouteProps) {
  const auth = useSelector(selectAuth);
  const location = useLocation();

  if (needs === 'auth') {
    return auth.token
      ? children
      : (
        <Navigate
          to={routes.auth.login}
          replace
          state={{ path: location.pathname }}
        />
      );
  }

  return !auth.token
    ? children
    : (
      <Navigate
        to={routes.auth.login}
        replace
        state={{ path: location.pathname }}
      />
    );
}
