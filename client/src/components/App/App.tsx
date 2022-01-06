import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Error404 } from '..';
import authRoutes from '../../auth/routes';
import routes from '../../lib/routes';
import feedbackRoutes from '../../feedback/routes';
import userRoutes from '../../users/routes';

const routerRoutes = [
  authRoutes,
  feedbackRoutes,
  userRoutes,
];

// TODO
function Fallback() {
  return null;
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Navigate to={routes.feedback.list} />} path="/" />
        {routerRoutes}
        <Route element={<Error404 />} path="*" />
      </Routes>
    </Suspense>
  );
}
