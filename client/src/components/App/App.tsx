import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import authRoutes from '../../auth/routes';
import feedbackRoutes from '../../feedback/routes';
import routes from '../../lib/routes';
import userRoutes from '../../user/routes';

const routerRoutes = [
  authRoutes,
  userRoutes,
  feedbackRoutes,
];

// TODO
const Fallback = () => null;

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Navigate to={routes.feedback.index} />} path="/" />
        {routerRoutes}
        {/* TODO: 404 route goes here */}
      </Routes>
    </Suspense>
  );
}
