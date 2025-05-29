import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Notification = {
  id: string;
  type: 'message' | 'post' | 'system';
  content: string;
  timestamp: Date;
};

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        content: 'Новое сообщение в чате "React"',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'post',
        content: 'Иван опубликовал новый пост',
        timestamp: new Date(Date.now() - 3600000)
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="glass p-4 rounded-lg w-64 cursor-pointer"
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">
                {notification.type === 'message' ? '💬' : 
                 notification.type === 'post' ? '📝' : '🔔'}
              </span>
              <div>
                <p className="text-white text-sm">{notification.content}</p>
                <p className="text-xs text-white/50">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};