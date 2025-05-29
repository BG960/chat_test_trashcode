import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

interface MessageProps {
  text: string;
  isCurrentUser?: boolean;
  timestamp: Date;
}

export const Message = ({ text, isCurrentUser, timestamp }: MessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[80%] rounded-xl p-3 ${
        isCurrentUser 
          ? 'bg-primary/20 rounded-tr-none' 
          : 'glass rounded-tl-none'
      }`}
    >
      <p className="text-white">{text}</p>
      <p className="text-xs text-white/50 mt-1">
        {format(timestamp, 'HH:mm', { locale: ru })}
      </p>
    </motion.div>
  );
};