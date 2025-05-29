import { useState, useEffect, useRef, useCallback } from 'react';
import { User, Chat } from '@/types/chat';

interface ChatWindowProps {
  currentChat: Chat | null;
  currentUser: User;
}

export const ChatWindow = ({ currentChat, currentUser }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(() => {
    if (currentChat) {
      setMessages([
        {
          id: '1',
          text: 'Привет! Как твой проект?',
          sender: {
            id: '2',
            name: 'Иван Иванов',
            avatar: '👨‍💼'
          },
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: '2',
          text: 'Отлично! Только что добавил анимации.',
          sender: currentUser,
          timestamp: new Date(),
          status: 'read'
        }
      ]);
    }
  }, [currentChat, currentUser]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSendMessage = () => {
    if (newMessage.trim() && currentChat) {
      const message: MessageType = {
        id: Date.now().toString(),
        text: newMessage,
        sender: currentUser,
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ... (остальной код без изменений) ... */}
    </div>
  );
};

interface MessageType {
  id: string;
  text: string;
  sender: User;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}