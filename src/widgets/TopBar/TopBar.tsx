import { SearchInput, UserDropdown } from '@/features';
import { ThemeToggle } from '@/shared/ui/ThemeToggle/ThemeToggle';
import { Logo } from '@/shared/ui';
import { User } from '@/types/chat';

export const TopBar = ({ user }: { user: User }) => {
  return (
    <header className="glass p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <Logo className="text-2xl" />
        <SearchInput />
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="p-2 rounded-full hover:bg-white/10">
          <PlusIcon className="w-5 h-5" />
        </button>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};