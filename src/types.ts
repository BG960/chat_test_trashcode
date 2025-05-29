// Типы для чатов и сообщений
export type Chat = {
    id: number;
    title: string;
    unread: number;
    lastMessage: string;
  };
  
  export type Message = {
    id: number;
    text: string;
    timestamp: string;
  };