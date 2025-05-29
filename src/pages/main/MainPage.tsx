import { Sidebar } from '@/widgets/sidebar/sidebar';
import { ChatWindow } from '@/widgets/chat-window/chatwindow';
import { SearchBar} from '@/shared/ui/SearchBar';
import { Logo } from '@/shared/ui';
import { UserProfile } from '@/shared/ui/UserProfile';
import { useState } from 'react';
import { Chat } from '@/types/chat';

const MainPage = () => {
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const currentUser = { id: '1', name: 'Вы', avatar: '👤' };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Левая панель */}
      <div className="w-20 bg-white dark:bg-gray-800 flex flex-col items-center py-4 border-r">
        <Logo className="mb-8" />
        <button className="btn-icon-primary mb-4">+</button>
        <button className="btn-icon-secondary mb-4">🔍</button>
      </div>

      {/* Боковая панель чатов */}
      <div className="w-80 border-r bg-white dark:bg-gray-800">
        <div className="p-4 border-b">
          <SearchBar placeholder="Поиск чатов..." />
        </div>
      <Sidebar onChatSelect={setCurrentChat} />
        </div>

      {/* Основное содержимое */}
      <div className="flex-1 flex flex-col">
        {/* Шапка чата */}
        <header className="bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Название чата</h2>
          <UserProfile />
        </header>
        
        {/* Окно чата */}
      <ChatWindow currentChat={currentChat} currentUser={currentUser} />
      </div>
    </div>
  );
};
export default MainPage;