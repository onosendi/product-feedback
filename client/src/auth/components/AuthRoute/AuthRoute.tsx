import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../../../lib/routes';
import { selectIsAuthenticated } from '../../redux/selectors';

type AuthRouteProps = {
  children: ReactElement,
  requiresAuthentication?: boolean,
};

export default function AuthRoute({
  children,
  requiresAuthentication,
}: AuthRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (requiresAuthentication && !isAuthenticated) {
    return (
      <Navigate
        to={routes.auth.login}
        replace
        state={{ path: location.pathname }}
      />
    );
  }

  return children;
}
