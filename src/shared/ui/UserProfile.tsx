import { useAuth } from '@/features/auth';

export const UserProfile = () => {
  const { isAuth } = useAuth();
  
  return (
    <div className="flex items-center gap-2">
      {isAuth ? (
        <>
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
          <span>Профиль</span>
        </>
      ) : null}
    </div>
  );
};