/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sidebar } from '@/widgets/sidebar/sidebar';
import { ChatWindow } from '@/widgets/chat-window/chatwindow';
import { Logo } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { Chat } from '@/types/chat';
import { useAuth } from '@/features/auth/lib/AuthContext';
import { CreateChatModal } from '@/features/chat/CreateChatModal';
import { ProfileModal } from '@/shared/ui/UserProfile';
import { SearchBar } from '@/shared/ui/SearchBar';
import { FindFriendModal } from '@/features/friends/FindFriendModal';

const MainPage = () => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFindFriendModalOpen, setIsFindFriendModalOpen] = useState(false);

  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Левая панель */}
      <div className="w-20 bg-white dark:bg-gray-800 flex flex-col items-center justify-between py-4 border-r">
        <div className="flex flex-col items-center space-y-6">
          <Logo className="h-8 w-8" />
          <button
            className="btn-icon-primary"
            title="Создать чат"
            onClick={() => setIsCreateModalOpen(true)}
          />
          <button
            className="btn-icon-secondary"
            title="Поиск"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          <button
            className="btn-icon-secondary"
            title="Найти друга"
            onClick={() => setIsFindFriendModalOpen(true)}
          />
        </div>

        {user && (
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-10 h-10 rounded-full overflow-hidden"
            title="Профиль"
          >
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>
        )}
      </div>

      {/* Список чатов */}
      <div className="w-80 border-r bg-white dark:bg-gray-800 flex flex-col">
        {isSearchOpen && (
          <div className="p-4 border-b">
            <SearchBar
              onChatSelect={setCurrentChat}
              placeholder="Поиск чатов или пользователей..."
            />
          </div>
        )}
        <Sidebar onChatSelect={setCurrentChat} />
      </div>

      {/* Окно чата */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {currentChat?.title || 'Выберите чат'}
          </h2>
        </header>

        <div className="flex-1 overflow-hidden">
          {currentChat && user ? (
            <ChatWindow currentChat={currentChat} currentUser={user} />
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              Выберите чат, чтобы начать переписку
            </div>
          )}
        </div>
      </div>

      {/* Модальные окна */}
      <CreateChatModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <FindFriendModal isOpen={isFindFriendModalOpen} onClose={() => setIsFindFriendModalOpen(false)} />
      <ProfileModal isOpen={isProfileModalOpen} closeModal={() => setIsProfileModalOpen(false)} />
    </div>
  );
};

export default MainPage;
