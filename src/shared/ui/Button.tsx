/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      
      className={clsx(
        'glass px-4 py-2 rounded-full text-white',
        className
      )}
      disabled={disabled}
      {...props} // 🔥 это важно: передаем type, onClick, onSubmit, etc.
    >
      {children}
    </button>
  );
};
