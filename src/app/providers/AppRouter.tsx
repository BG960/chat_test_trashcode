import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/lib/AuthContext';
import { LoadingScreen } from '@/shared/ui/LoadingScreen';

const AuthPage = lazy(() => import('@/pages/auth/AuthPage'));
const MainPage = lazy(() => import('@/pages/main/MainPage'));

export const AppRouter = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route 
          path="/" 
          element={isAuth ? <MainPage /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/auth" 
          element={!isAuth ? <AuthPage /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
