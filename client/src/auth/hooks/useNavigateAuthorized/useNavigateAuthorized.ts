import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../project/routes';
import useAuth from '../useAuth';

type LocationState = {
  state: {
    path: string,
  },
};

export default function useNavigateAuthorized() {
  const navigate = useNavigate();
  const { state } = useLocation() as LocationState;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(state?.path || routes.index);
    }
  }, [isAuthenticated, navigate, state?.path]);
}
