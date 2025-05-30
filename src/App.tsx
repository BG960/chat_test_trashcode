/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// import { Sidebar } from '@/widgets/sidebar/sidebar';
// import { ChatWindow } from '@/widgets/chat-window/chatwindow';
// import { NotificationCenter } from '@/features/notifications/NotificationCenter';
import { useWebSocket } from '@/shared/lib/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { Chat } from './types/chat';
import { RouterProvider } from '@/app/providers/RouterProvider';
import { useAuth } from './features/auth/lib/useAuth';

export default function App() {
  // const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const { isAuth } = useAuth();
const { messages: wsMessages } = useWebSocket('http://localhost:5000', isAuth);

  // Обработка WebSocket сообщений
  useEffect(() => {
    wsMessages.forEach(msg => {
      if (msg.type === 'notification') {
        // Логика уведомлений
      }
    });
  }, [wsMessages]);

  return (
    <ThemeProvider>
            <RouterProvider />
    </ThemeProvider>
  );
}