import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type AuthFormWrapperProps = {
  title: string;
  children: ReactNode;
};

export const AuthFormWrapper = ({ title, children }: AuthFormWrapperProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          'w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl backdrop-blur-md'
        )}
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
          {title}
        </h2>
        {children}
      </motion.div>
    </div>
  );
};
