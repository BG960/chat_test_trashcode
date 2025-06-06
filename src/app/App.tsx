import { AppRouter } from './providers/AppRouter';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';
import { AuthProvider } from '@/features/auth/lib/AuthContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 rounded bg-accent text-white px-4 py-2 shadow-lg transition hover:opacity-90"
    >
      Сменить тему ({theme})
    </button>
  );
};

const AppContent = () => (
  <>
    <AppRouter />
    <ThemeToggleButton />
  </>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}