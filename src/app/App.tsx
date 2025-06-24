import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './providers/AppRouter';
import { ThemeProvider,} from './providers/ThemeProvider';
import { AuthProvider } from '@/features/auth/lib/AuthContext';

const queryClient = new QueryClient();



const AppContent = () => (
  <>
    <AppRouter />
  </>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
