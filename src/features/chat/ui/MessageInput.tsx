import { useState } from 'react';
import { useChatStore } from '@/entities/chat/model/chatStore';
import { useSendMessage } from '@/entities/message/api/useSendMessage';

export const MessageInput: React.FC = () => {
  const { activeChatId } = useChatStore();
  const [text, setText] = useState('');
  const { mutate: sendMessage, isLoading } = useSendMessage();

  const handleSend = () => {
    if (!text.trim() || !activeChatId) return;
    sendMessage({ chatId: activeChatId, text });
    setText('');
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t">
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 text-sm border rounded-md bg-background"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Отправить
      </button>
    </div>
  );
};
