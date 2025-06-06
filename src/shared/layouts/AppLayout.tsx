// src/shared/layouts/AppLayout.tsx
import { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/utils';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={cn('min-h-screen w-full bg-bg-base text-text-base')}>
      {children}
    </div>
  );
};
