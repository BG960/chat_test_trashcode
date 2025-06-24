import { FC } from 'react';
import {
  Home,
  MessageSquare,
  Users,
  Plus,
  Settings,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';

/* утилита для иконок-кнопок */
const IconBtn = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'group relative flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted/70',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const Sidebar: FC = () => {
  const navigate = useNavigate();

  /* для модалок */
  const openModal = (path: string) => navigate(path);

  return (
    <aside className="hidden sm:flex h-full w-20 flex-col items-center justify-between border-r border-border bg-muted/40 py-6 backdrop-blur-lg">
      {/* Logo */}
      <div className="text-2xl font-bold">💬</div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              'icon-btn',
              isActive && 'bg-accent text-accent-foreground shadow-lg'
            )
          }
          title="Главная"
        >
          <Home className="h-5 w-5" />
        </NavLink>

        <NavLink
          to="/chats"
          className={({ isActive }) =>
            cn(
              'icon-btn',
              isActive && 'bg-accent text-accent-foreground shadow-lg'
            )
          }
          title="Чаты"
        >
          <MessageSquare className="h-5 w-5" />
        </NavLink>

        {/* Друзья (модалка) */}
        <IconBtn title="Друзья" onClick={() => openModal('/friends')}>
          <Users className="h-5 w-5" />
        </IconBtn>

        {/* Настройки — пока заглушка */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'icon-btn',
              isActive && 'bg-accent text-accent-foreground shadow-lg'
            )
          }
          title="Настройки"
        >
          <Settings className="h-5 w-5" />
        </NavLink>
      </nav>

      {/* Новый чат  */}
      <IconBtn
        onClick={() => openModal('/new-chat')}
        title="Новый чат"
        className="mb-6 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Plus className="h-5 w-5" />
      </IconBtn>

      {/* Аватар — модалка профиля */}
      <UserAvatar
        className="h-10 w-10 cursor-pointer border-2 border-accent"
        onClick={() => openModal('/profile')}
      />
    </aside>
  );
};
