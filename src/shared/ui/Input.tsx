import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          {...props}
          className={`flex-1 glass bg-transparent border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            error ? 'border-red-500' : 'border-white/20'
          } ${className}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
