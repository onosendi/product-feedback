import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../auth/components';
import routes from '../lib/routes';

const Index = lazy(() => import('./pages/Index/Index'));
const Roadmap = lazy(() => import('./pages/Roadmap/Roadmap'));

const feedbackRoutes = [
  <Route element={<Index />} key="feedback-index" path={routes.feedback.index} />,
  // @ts-ignore
  <Route element={<AuthRoute needs="auth"><Roadmap /></AuthRoute>} key="feedback-roadmap" path={routes.feedback.roadmap} />,
];

export default feedbackRoutes;
