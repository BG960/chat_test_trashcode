import { Logo } from '@/shared/ui/Logo';

export const LoadingScreen = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Logo className="text-3xl" />
      <div className="h-1.5 w-32 overflow-hidden rounded bg-muted">
        <div className="loading-bar h-full w-1/2 animate-loading bg-primary" />
      </div>
    </div>
  </div>
);
