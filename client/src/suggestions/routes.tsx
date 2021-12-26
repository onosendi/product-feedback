import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from 'src/auth/components';
import routes from '../lib/routes';

const CreateSuggestion = lazy(() => import('./pages/CreateSuggestion'));
const EditSuggestion = lazy(() => import('./pages/EditSuggestion'));
const ListSuggestions = lazy(() => import('./pages/ListSuggestions'));

const suggestionRoutes = [
  <Route
    element={<ListSuggestions />}
    key="suggestions-list"
    path={routes.suggestions.list}
  />,
  <Route
    element={(
      <AuthRoute>
        <CreateSuggestion />
      </AuthRoute>
    )}
    key="suggestions-create"
    path={routes.suggestions.create}
  />,
  <Route
    element={(
      <AuthRoute>
        <EditSuggestion />
      </AuthRoute>
    )}
    key="suggestions-create"
    path={`${routes.suggestions.edit}/:suggestionId}`}
  />,
];

export default suggestionRoutes;
