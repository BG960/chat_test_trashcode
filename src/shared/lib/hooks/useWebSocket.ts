import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type WsMessage = {
  type: 'message' | 'notification' | 'status';
  payload: string | number | object;
};

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<WsMessage[]>([]);

  useEffect(() => {
    const socketInstance = io(url, {
      transports: ['websocket'],
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log('🟢 Socket connected:', socketInstance.id);
      setSocket(socketInstance);
    });

    socketInstance.on('message', (data: WsMessage) => {
      setMessages(prev => [...prev, data]);
    });

    socketInstance.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  const sendMessage = (message: WsMessage) => {
    socket?.emit('message', message);
  };

  return { messages, sendMessage };
};
