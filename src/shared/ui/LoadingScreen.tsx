import { Logo } from './Logo';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/90 z-50">
      <div className="animate-pulse flex flex-col items-center">
        <Logo className="text-6xl mb-4" />
        <div className="h-2 w-32 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};