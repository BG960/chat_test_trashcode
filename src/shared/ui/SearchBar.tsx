import { useState, useEffect } from 'react';
import axios from '@/shared/api/client';
import { Chat, User } from '@/types/chat';

type Props = {
  placeholder?: string;
  onChatSelect: (chat: Chat) => void;
  onUserClick?: (user: User) => void;
};

export const SearchBar = ({ placeholder = 'Поиск...', onChatSelect, onUserClick }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ users: User[]; chats: Chat[] }>({ users: [], chats: [] });

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query.trim()) return setResults({ users: [], chats: [] });

      try {
        const [userRes, chatRes] = await Promise.all([
          axios.get(`/api/users?query=${query}`),
          axios.get(`/api/chats?query=${query}`)
        ]);
        setResults({ users: userRes.data, chats: chatRes.data });
      } catch (err) {
        console.error('Ошибка поиска:', err);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none"
      />
      <span className="absolute left-3 top-2.5">🔍</span>

      {query && (results.users.length || results.chats.length) > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10 max-h-64 overflow-auto">
          {results.users.map((user) => (
            <div
              key={user.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onUserClick?.(user)}
            >
              👤 {user.username}
            </div>
          ))}
          {results.chats.map((chat) => (
            <div
              key={chat.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onChatSelect(chat)}
            >
              💬 {chat.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
