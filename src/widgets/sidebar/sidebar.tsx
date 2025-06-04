import { useAuth } from '@/features/auth/lib/AuthContext';
import { Chat } from '@/types/chat';

type SidebarProps = {
  onChatSelect: (chat: Chat) => void;
};

export const Sidebar = ({ onChatSelect }: SidebarProps) => {
  const { chats } = useAuth();

  return (
    <div className="overflow-y-auto h-full divide-y dark:divide-gray-700">
      {chats.length === 0 ? (
        <div className="p-4 text-gray-500 dark:text-gray-400 text-sm">
          У вас пока нет чатов.
        </div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="cursor-pointer px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {chat.title}
            </div>
            {chat.lastMessage && (
              <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {chat.lastMessage.content}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
