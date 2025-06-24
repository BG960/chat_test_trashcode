import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}

export const CloseButton = ({ size = 18, className, ...props }: CloseButtonProps) => (
  <button
    className={cn(
      'absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition',
      className
    )}
    {...props}
  >
    <X style={{ width: size, height: size }} />
    <span className="sr-only">Закрыть</span>
  </button>
);
