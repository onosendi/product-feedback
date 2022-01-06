import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../auth/components';
import routes from '../lib/routes';

const CreateFeedback = lazy(() => import('./pages/CreateFeedback'));
const EditFeedback = lazy(() => import('./pages/EditFeedback'));
const ListSuggestions = lazy(() => import('./pages/ListSuggestions'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const FeedbackDetail = lazy(() => import('./pages/FeedbackDetail'));

const feedbackRoutes = [
  <Route
    element={<ListSuggestions />}
    key="suggestions-list"
    path={routes.feedback.list}
  />,
  <Route
    element={<FeedbackDetail />}
    key="feedback-detail"
    path="/feedback/:slug"
  />,
  <Route
    element={(
      <AuthRoute requiresAuthentication>
        <CreateFeedback />
      </AuthRoute>
    )}
    key="feedback-create"
    path={routes.feedback.create}
  />,
  <Route
    element={<Roadmap />}
    key="roadmap"
    path="/roadmap"
  />,
  <Route
    element={(
      <AuthRoute requiresAuthentication>
        <EditFeedback />
      </AuthRoute>
    )}
    key="feedback-edit"
    path="/feedback/:slug/edit"
  />,
];

export default feedbackRoutes;
