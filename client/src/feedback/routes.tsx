import { lazy } from 'react';
import { Route } from 'react-router-dom';

import routes from '../lib/routes';

const Index = lazy(() => import('./pages/Index/Index'));
const Roadmap = lazy(() => import('./pages/Roadmap/Roadmap'));

const feedbackRoutes = [
  <Route exact key="feedback-index" path={routes.feedback.index}>
    <Index />
  </Route>,
  <Route exact key="feedback-roadmap" path={routes.feedback.roadmap}>
    <Roadmap />
  </Route>,
];

export default feedbackRoutes;
