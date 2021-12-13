import { lazy } from 'react';
import { Route } from 'react-router-dom';
import routes from '../lib/routes';
import { AuthRoute } from './components';

const Login = lazy(() => import('./pages/Login/Login'));

const authRoutes = [
  <Route
    element={(
      // @ts-ignore
      <AuthRoute needs="anonymous">
        <Login />
      </AuthRoute>
    )}
    key="auth-login"
    path={routes.auth.login}
  />,
];

export default authRoutes;
