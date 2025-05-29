/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// import { Sidebar } from '@/widgets/sidebar/sidebar';
// import { ChatWindow } from '@/widgets/chat-window/chatwindow';
// import { NotificationCenter } from '@/features/notifications/NotificationCenter';
import { useWebSocket } from '@/shared/lib/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { Chat } from './types/chat';
import { RouterProvider } from '@/app/providers/RouterProvider';

export default function App() {
  // const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const { messages: wsMessages } = useWebSocket('http://localhost:5000');

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

      {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
        <div className="flex h-[calc(100vh-4rem)] gap-4">
          <Sidebar onChatSelect={setCurrentChat} />
          {currentChat ? (
            <ChatWindow currentChat={currentChat} currentUser={undefined} />
          ) : (
            <div className="flex-1 glass rounded-xl flex items-center justify-center">
              <p className="text-white/50">Выберите чат</p>
            </div>
          )}
        </div>
      </div> */}
    </ThemeProvider>
  );
}