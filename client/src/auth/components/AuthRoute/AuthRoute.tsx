import type { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../../../lib/routes';
import { useAuth } from '../../hooks';

interface AuthRouteProps {
  children: ReactElement;
  requiresAuthentication?: boolean;
}

export default function AuthRoute({
  children,
  requiresAuthentication,
}: AuthRouteProps) {
  const { isAuthenticated } = useAuth();
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
