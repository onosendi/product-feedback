import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '..';
import routes from '../../../project/routes';

export default function useNeedsAuthentication() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuth();

  return (callback: () => void) => {
    if (!isAuthenticated) {
      navigate(routes.auth.login, {
        state: { path: pathname + search },
      });
      return;
    }
    callback();
  };
}
