import { lazy } from 'react';
import { Route } from 'react-router-dom';

import routes from '../lib/routes';

const Login = lazy(() => import('./pages/Login/Login'));

const authRoutes = [
  <Route exact key="auth-login" path={routes.auth.login}>
    <Login />
  </Route>,
];

export default authRoutes;
