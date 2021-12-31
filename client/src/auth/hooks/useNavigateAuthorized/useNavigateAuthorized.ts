import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../lib/routes';
import useAuth from '../useAuth';

export default function useNavigateAuthorized() {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(state?.path || routes.index);
    }
  }, [isAuthenticated, navigate, state?.path]);
}
