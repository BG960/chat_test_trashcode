import { Chat } from '@/types/chat';

export const mockChats: Chat[] = [
  {
    id: '1',
    title: "Общий чат",
    unreadCount: 3,
    participants: [],
    type: 'group',
    createdAt: new Date(),
    lastMessage: {
      id: '1',
      text: "Привет! Как дела?",
      timestamp: new Date(),
      senderId: '1'
    }
  }
];

export const fetchChats = async (): Promise<Chat[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChats), 500);
  });
};