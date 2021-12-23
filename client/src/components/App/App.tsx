import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import authRoutes from '../../auth/routes';
import routes from '../../lib/routes';
import suggestionsRoutes from '../../suggestions/routes';
import userRoutes from '../../users/routes';

const routerRoutes = [
  authRoutes,
  suggestionsRoutes,
  userRoutes,
];

// TODO
const Fallback = () => null;

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Navigate to={routes.suggestions.list} />} path="/" />
        {routerRoutes}
        {/* TODO: 404 route goes here */}
      </Routes>
    </Suspense>
  );
}
