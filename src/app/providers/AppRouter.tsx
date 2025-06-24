// src/app/providers/RouterProvider.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/lib/AuthContext';
import { LoadingScreen } from '@/shared/ui/LoadingScreen';
import {
  CreateChatModal,
  FindFriendModal,
  ProfileModal,
} from '@/widgets/modals';

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
        {/* Авторизация */}
        <Route
          path="/auth"
          element={!isAuth ? <AuthPage /> : <Navigate to="/" />}
        />

        {/* Главная и модалки */}
        <Route
          path="/"
          element={isAuth ? <MainPage /> : <Navigate to="/auth" />}
        >
          <Route path="profile" element={<ProfileModal />} />
          <Route path="friends" element={<FindFriendModal />} />
          <Route path="new-chat" element={<CreateChatModal />} />
        </Route>

        {/* Фолбэк */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
