import { useRef } from 'react';
import { useResizablePanel } from './useResizablePanel';
import { cn } from '@/shared/lib/utils';

interface ResizablePanelProps {
  minWidth?: number;
  maxWidth?: number;
  initialWidth?: number;
  children: React.ReactNode;
  className?: string;
}

export const ResizablePanel = ({
  minWidth = 240,
  maxWidth = 400,
  initialWidth = 300,
  children,
  className,
}: ResizablePanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { width, handleMouseDown } = useResizablePanel({
    ref: panelRef,
    minWidth,
    maxWidth,
    initialWidth,
  });

  return (
    <div
      ref={panelRef}
      style={{ width }}
      className={cn(
        'relative h-screen flex-shrink-0 border-r border-border bg-background transition-all duration-200 overflow-hidden',
        className
      )}
    >
      {children}

      <div
        onMouseDown={handleMouseDown}
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-muted/40"
      />
    </div>
  );
};
