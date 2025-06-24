// shared/ui/Skeleton.tsx
import { cn } from '@/shared/lib/utils';

interface SkeletonProps {
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      {...props}
    />
  );
};
