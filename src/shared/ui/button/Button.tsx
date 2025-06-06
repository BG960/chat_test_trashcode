// src/shared/ui/button/Button.tsx
import { FC, ComponentPropsWithoutRef, ComponentProps } from 'react';
import { motion, MotionProps } from 'framer-motion';
import clsx from 'clsx';
import styles from './Button.module.css';

type NativeButtonProps = ComponentPropsWithoutRef<'button'>;

interface ButtonProps extends NativeButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  animated?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  animated = false,
  className,
  ...rest
}) => {
  const baseClass = clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && 'w-full',
    className
  );

  if (animated) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className={baseClass}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(rest as any)} // безопасно, пока TS конфликтует
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button className={baseClass} {...rest}>
      {children}
    </button>
  );
};

// New implementation
export const ButtonAlt = ({
  children,
  className,
  ...props
}: MotionProps & ComponentProps<'button'>) => {
  return (
    <motion.button
      {...props}
      className={clsx(
        'px-4 py-2 rounded transition-colors duration-200',
        'bg-primary text-white hover:opacity-90',
        className
      )}
    >
      {children}
    </motion.button>
  );
};