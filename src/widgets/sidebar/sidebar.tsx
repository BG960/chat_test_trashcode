import { fetchChats } from '@/shared/api/api';
import { useEffect, useState } from 'react';
import { Chat } from '@/types/chat';
import { motion } from 'framer-motion';


type SidebarProps = {
  onChatSelect: (chat: Chat) => void;
};
export const Sidebar = ({ onChatSelect }: SidebarProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Не удалось загрузить чаты');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChats();
  }, []);

  if (isLoading) return <div className="p-4">Загрузка чатов...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-64 glass rounded-xl p-4">
      <h2 className="text-white text-xl mb-4">Чаты</h2>
      <div className="space-y-2">
         {chats.map((chat) => (
        <motion.div
          key={chat.id}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/5"
          onClick={() => onChatSelect(chat)}
        >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              {chat.title[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white truncate">{chat.title}</h3>
              {chat.lastMessage && (
                <p className="text-xs text-white/50 truncate">
                  {chat.lastMessage.text}
                </p>
              )}
            </div>
            {chat.unreadCount > 0 && (
              <span className="ml-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {chat.unreadCount}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};