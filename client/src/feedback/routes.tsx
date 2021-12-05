import { lazy } from 'react';
import { Route } from 'react-router-dom';
import routes from '../lib/routes';

const Index = lazy(() => import('./pages/Index/Index'));
const Roadmap = lazy(() => import('./pages/Roadmap/Roadmap'));

const feedbackRoutes = [
  <Route element={<Index />} key="feedback-index" path={routes.feedback.index} />,
  <Route element={<Roadmap />} key="feedback-roadmap" path={routes.feedback.roadmap} />,
];

export default feedbackRoutes;
