import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button = ({ 
  children, 
  onClick, 
  active = false, 
  disabled = false,
  className = ''
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`glass px-4 py-2 rounded-full text-white ${
        active ? 'bg-primary/50' : ''
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};