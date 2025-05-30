import { Sidebar } from '@/widgets/sidebar/sidebar';
import { ChatWindow } from '@/widgets/chat-window/chatwindow';
import { SearchBar } from '@/shared/ui/SearchBar';
import { Logo } from '@/shared/ui';
import { UserProfile } from '@/shared/ui/UserProfile';
import { useEffect, useState } from 'react';
import { Chat } from '@/types/chat';
import { fetchUserProfile } from '@/shared/api/api';
import { User } from '@/types/chat';

const MainPage = () => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await fetchUserProfile();
        setCurrentUser(user);
      } catch (err) {
        console.error('Ошибка загрузки профиля:', err);
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Левая иконковая панель */}
      <div className="w-20 bg-white dark:bg-gray-800 flex flex-col items-center py-4 border-r space-y-6">
        <Logo className="h-8 w-8" />
        <button className="btn-icon-primary" onClick={() => console.log('Создать чат')}>
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
          <SearchBar placeholder="Поиск чатов или пользователей..." onChatSelect={function (): void {
            throw new Error('Function not implemented.');
          } } />
        </div>
        <Sidebar onChatSelect={setCurrentChat} />
      </div>

      {/* Основное окно чата */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {currentChat?.title || 'Выберите чат'}
          </h2>
          <UserProfile />
        </header>

        <div className="flex-1 overflow-hidden">
          {currentChat && currentUser ? (
            <ChatWindow currentChat={currentChat} currentUser={currentUser} />
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              Выберите чат, чтобы начать переписку
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
