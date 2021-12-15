import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../lib/routes';
import { selectIsAuthenticated } from '../../redux/selectors';

export default function useNavigateAuthorized() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(state?.path || routes.index);
    }
  }, [isAuthenticated, navigate, state?.path]);
}
