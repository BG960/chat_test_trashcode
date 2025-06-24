import { FC } from 'react';
import { useChats } from '@/shared/api/hooks/useChats';
import { ScrollArea } from '@/shared/ui/scroll-area/ScrollArea';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { cn } from '@/shared/lib/utils';
import { useChatStore } from '@/entities/chat/model/chatStore';

export const ChatList: FC = () => {
  const { data: chats, isLoading } = useChats();
  const { activeChatId, setActiveChatId } = useChatStore();

  return (
    <aside className="w-[300px] shrink-0 border-r border-border bg-background">
      <header className="h-12 px-4 flex items-center border-b border-border font-medium">
        Чаты
      </header>

      <ScrollArea className="h-[calc(100%-3rem)] p-2">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : chats?.length ? (
          <ul className="flex flex-col gap-1">
            {chats.map((chat) => {
              const isActive = activeChatId === chat._id;
              return (
                <li
  key={chat._id.toString()}
  onClick={() => setActiveChatId(chat._id.toString())}
  // ...

                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground shadow'
                      : 'hover:bg-muted/60'
                  )}
                >
                  {/* Аватар (первые две буквы названия) */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold uppercase">
                    {chat.name?.slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium leading-tight">{chat.name}</p>
                    {chat.lastMessage && (
                      <p className="truncate text-xs text-muted-foreground">
                        {chat.lastMessage.sender.username}: {chat.lastMessage.content}
                      </p>
                    )}
                  </div>

                  {/* Бейдж непрочитанных */}
                  {chat.unreadCount > 0 && (
                    <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                      {chat.unreadCount}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            У вас пока нет чатов
          </p>
        )}
      </ScrollArea>
    </aside>
  );
};
