// shared/ui/ScrollArea.tsx
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/shared/lib/utils';
import { PropsWithChildren } from 'react';

export const ScrollArea = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <ScrollAreaPrimitive.Root className={cn('overflow-hidden', className)}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5 bg-transparent transition-colors hover:bg-border"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 rounded-full bg-border" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
};
