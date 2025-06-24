import { useMessages } from '@/entities/message/api/useMessages';
import { useChatStore } from '@/entities/chat/model/chatStore';
import { ScrollArea } from '@/shared/ui/scroll-area/ScrollArea';

export const ChatMessages: React.FC = () => {
  const { activeChatId } = useChatStore();
  const { data: messages, isLoading } = useMessages(activeChatId);

  return (
    <ScrollArea className="flex-1 space-y-2 px-4 py-2">
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-1/2">
              <div className="bg-muted h-6 rounded-md" />
            </div>
          ))}
        </div>
      ) : messages?.length ? (
        messages.map((msg) => (
          <div
            key={msg._id}
            className="max-w-[70%] bg-accent p-3 rounded-lg text-sm text-accent-foreground"
          >
            {msg.text}
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-sm text-center">Сообщений пока нет</p>
      )}
    </ScrollArea>
  );
};
