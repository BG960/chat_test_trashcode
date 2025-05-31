// src/pages/main/MainPage.tsx
import { Sidebar } from '@/widgets/sidebar/sidebar';
import { ChatWindow } from '@/widgets/chat-window/chatwindow';
import { SearchBar } from '@/shared/ui/SearchBar';
import { Logo } from '@/shared/ui';
import { UserProfile } from '@/shared/ui/UserProfile';
import { useEffect, useState } from 'react';
import { Chat } from '@/types/chat';
import { useAuth } from '@/features/auth/lib/AuthContext';
import { CreateChatModal } from '@/features/chat/CreateChatModal';

const MainPage = () => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, chats, isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      setCurrentChat(null);
    }
  }, [isAuth]);

  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Левая панель с иконками */}
        <div className="w-20 bg-white dark:bg-gray-800 flex flex-col items-center py-4 border-r space-y-6">
          <Logo className="h-8 w-8" />
          <button className="btn-icon-primary" onClick={() => setIsModalOpen(true)}>
            ➕
          </button>
          <button className="btn-icon-secondary" onClick={() => console.log('Поиск')}>
            🔍
          </button>
          <button className="btn-icon-secondary" onClick={() => console.log('Профиль')}>
            🧑
          </button>
        </div>

        {/* Список чатов */}
        <div className="w-80 border-r bg-white dark:bg-gray-800">
          <div className="p-4 border-b">
            <SearchBar
              placeholder="Поиск чатов или пользователей..."
              onChatSelect={(chat) => setCurrentChat(chat)}
            />
          </div>
          <Sidebar onChatSelect={setCurrentChat} />
        </div>

        {/* Окно чата */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentChat?.title || 'Выберите чат'}
            </h2>
            <UserProfile />
          </header>

          <div className="flex-1 overflow-hidden">
            {currentChat && user ? (
              <ChatWindow currentChat={currentChat} currentUser={user} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Выберите чат, чтобы начать переписку
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модалка создания чата */}
      <CreateChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MainPage;
