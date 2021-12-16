import { lazy } from 'react';
import { Route } from 'react-router-dom';
import routes from '../lib/routes';

const ListSuggestion = lazy(() => import('./pages/ListSuggestion'));

const suggestionRoutes = [
  <Route
    element={<ListSuggestion />}
    key="suggestions-list"
    path={routes.suggestions.list}
  />,
];

export default suggestionRoutes;
