// shared/ui/ThemeToggle/ThemeToggle.tsx
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      className="p-2 rounded bg-primary text-white"
      onClick={() =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
      }
    >
      Переключить тему
    </button>
  );
};
