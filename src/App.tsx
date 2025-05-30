/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { useWebSocket } from '@/shared/lib/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { RouterProvider } from '@/app/providers/RouterProvider';
import { AuthProvider } from '@/features/auth/lib/AuthContext';


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider />
      </AuthProvider>
    </ThemeProvider>
  );
}