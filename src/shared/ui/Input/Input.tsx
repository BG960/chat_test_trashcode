import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex w-full flex-col gap-1 text-sm">
      {label && <span>{label}</span>}
      <input
        ref={ref}
        {...props}
        className={cn(
          'rounded-md border border-input bg-background px-4 py-2',
          'placeholder:text-muted-foreground text-foreground',
          'focus:border-primary focus:outline-none',
          error && 'border-red-500',
          className
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
);
