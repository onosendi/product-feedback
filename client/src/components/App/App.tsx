import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import authRoutes from '../../auth/routes';
import feedbackRoutes from '../../feedback/routes';
import routes from '../../lib/routes';

const routerRoutes = [
  authRoutes,
  feedbackRoutes,
];

// TODO
const Fallback = () => null;

const App = () => (
  <Suspense fallback={<Fallback />}>
    <Switch>
      <Route exact path="/">
        <Redirect to={routes.feedback.index} />
      </Route>
      {routerRoutes}
      {/* TODO: 404 route goes here */}
    </Switch>
  </Suspense>
);

export default App;
