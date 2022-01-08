import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../auth/components';
import routes from '../project/routes';

const EditUser = lazy(() => import('./pages/EditUser'));
const Register = lazy(() => import('./pages/Register'));

const userRoutes = [
  <Route
    element={(
      <AuthRoute requiresAuthentication>
        <EditUser />
      </AuthRoute>
    )}
    key="feedback-create"
    path={routes.user.edit}
  />,
  <Route
    element={<Register />}
    key="user-register"
    path={routes.user.register}
  />,
];

export default userRoutes;
