import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from 'src/auth/components';
import routes from '../lib/routes';

const CreateSuggestion = lazy(() => import('./pages/CreateSuggestion'));
const EditSuggestion = lazy(() => import('./pages/EditSuggestion'));
const ListSuggestions = lazy(() => import('./pages/ListSuggestions'));
const SuggestionDetail = lazy(() => import('./pages/SuggestionDetail'));

const suggestionRoutes = [
  <Route
    element={<ListSuggestions />}
    key="suggestions-list"
    path={routes.suggestions.list}
  />,
  <Route
    element={<SuggestionDetail />}
    key="suggestion-detail"
    path="/suggestions/:slug"
  />,
  <Route
    element={(
      <AuthRoute requiresAuthentication>
        <CreateSuggestion />
      </AuthRoute>
    )}
    key="suggestions-create"
    path={routes.suggestions.create}
  />,
  <Route
    element={(
      <AuthRoute requiresAuthentication>
        <EditSuggestion />
      </AuthRoute>
    )}
    key="suggestions-edit"
    path="/suggestions/:slug/edit"
  />,
];

export default suggestionRoutes;
