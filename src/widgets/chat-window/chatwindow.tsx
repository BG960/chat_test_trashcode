import { useEffect, useRef, useState } from 'react';
import axios from '@/shared/api/client';
import { Chat, Message, User } from '@/types/chat';
import { Textarea } from '@/shared/ui/Textarea';
import { Button } from '@/shared/ui/button/Button';

type ChatWindowProps = {
  currentChat: Chat;
  currentUser: User;
};

export const ChatWindow = ({ currentChat, currentUser }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(`/api/chats/${currentChat.id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error('Ошибка загрузки сообщений:', err);
      }
    };
    loadMessages();
  }, [currentChat.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setIsSending(true);
    try {
      const res = await axios.post(`/api/chats/${currentChat.id}/messages`, {
        text: trimmed,
      });

      setMessages((prev) => [...prev, res.data]);
      setInput('');
    } catch (err) {
      console.error('Ошибка отправки сообщения:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 px-4 py-2 overflow-hidden">
      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] px-4 py-2 rounded-xl ${
              msg.senderId === currentUser.id
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Ввод */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-2 flex gap-2 items-end border-t pt-2"
      >
        <Textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          className="flex-1 resize-none"
        />
        <Button type="submit" disabled={isSending || !input.trim()}>
          ➤
        </Button>
      </form>
    </div>
  );
};
