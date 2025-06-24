import { FC, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/features/auth/lib/AuthContext';

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const UserAvatar: FC<UserAvatarProps> = ({ className, size = 40, ...props }) => {
  const { user } = useAuth();

  return (
    <div
      className={cn('rounded-full bg-muted text-muted-foreground flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      {user?.username?.[0]?.toUpperCase() ?? 'U'}
    </div>
  );
};
