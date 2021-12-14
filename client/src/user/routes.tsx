import { lazy } from 'react';
import { Route } from 'react-router-dom';
import routes from '../lib/routes';

const Register = lazy(() => import('./pages/Register'));

const userRoutes = [
  <Route element={<Register />} key="user-register" path={routes.user.register} />,
];

export default userRoutes;
