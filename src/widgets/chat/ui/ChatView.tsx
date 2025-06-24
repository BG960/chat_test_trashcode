import { useChatStore } from '@/entities/chat/model/chatStore';
import { ChatMessages } from './ChatMessages';
import { MessageInput } from '@/features/chat/ui/MessageInput';

export const ChatView: React.FC = () => {
  const { activeChatId } = useChatStore();

  return (
    <div className="flex-1 flex flex-col h-full">
      {activeChatId ? (
        <>
          <ChatMessages />
          <MessageInput />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Выберите чат, чтобы начать общение
        </div>
      )}
    </div>
  );
};
