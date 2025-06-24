import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider/ThemeContext';
import { cn } from '@/shared/lib/utils';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title="Сменить тему"
      className={cn(
        'icon-btn',
        'rounded-full bg-muted hover:bg-muted/70'
      )}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};
