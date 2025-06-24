/* eslint-disable no-irregular-whitespace */
import { FC } from 'react';
import {
  Search,
  Info,
  MoreVertical,
} from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cn } from '@/shared/lib/utils';
import { useChatStore } from '@/entities/chat/model/chatStore';
import { ThemeToggle } from '@/shared/ui//ThemeToggle/ThemeToggle';


export const Header: FC = () => {
  const { activeChatId } = useChatStore();

  // В будущем сюда можно подтягивать данные активного чата
  const title = activeChatId ? `Чат #${activeChatId.slice(-4)}` : 'Geek Chat';
  const status = activeChatId ? 'онлайн' : '';

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-muted/40 px-4 backdrop-blur-lg">
      {/* Title + status */}
      <div>
        <h1 className="text-lg font-semibold leading-none">{title}</h1>
        {status && (
          <span className="text-xs text-muted-foreground">{status}</span>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
                <ThemeToggle />

        <button
          title="Поиск"
          className="icon-btn"
          onClick={() => console.log('open search')}
        >
          <Search className="h-5 w-5" />
        </button>
        {activeChatId && (
          <button
            title="Информация о чате"
            className="icon-btn"
            onClick={() => console.log('open chat info')}
          >
            <Info className="h-5 w-5" />
          </button>
        )}
        <button
          title="Ещё"
          className="icon-btn"
          onClick={() => console.log('open more menu')}
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
