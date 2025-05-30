import { Chat, User } from '@/types/chat';
import axiosInstance from './client';

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
      content: "Привет! Как дела?",
      timestamp: new Date(),
      senderId: '1',
      sender: { id: '456', username: 'Анна' }
    },
    sender: ''
  }
];

export const fetchChats = async (): Promise<Chat[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChats), 500);
  });
};
export const fetchUserProfile = async (): Promise<User> => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};