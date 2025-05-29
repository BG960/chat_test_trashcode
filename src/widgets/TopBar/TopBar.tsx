import { SearchInput, UserDropdown, ThemeSwitcher } from '@/features';
import { Logo } from '@/shared/ui';

export const TopBar = ({ user }: { user: User }) => {
  return (
    <header className="glass p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <Logo className="text-2xl" />
        <SearchInput />
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <button className="p-2 rounded-full hover:bg-white/10">
          <PlusIcon className="w-5 h-5" />
        </button>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};