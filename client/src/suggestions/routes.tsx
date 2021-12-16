import { lazy } from 'react';
import { Route } from 'react-router-dom';
import routes from '../lib/routes';

const ListSuggestions = lazy(() => import('./pages/ListSuggestions'));

const suggestionRoutes = [
  <Route
    element={<ListSuggestions />}
    key="suggestions-list"
    path={routes.suggestions.list}
  />,
];

export default suggestionRoutes;
