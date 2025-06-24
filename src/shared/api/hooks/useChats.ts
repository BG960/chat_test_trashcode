// shared/api/hooks/useChats.ts
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import { Key } from 'react';
import { LastMessage } from '@/types/chat';

export interface Chat {
  unreadCount: number;
  _id: Key;
  id: string;
  name: string;
  lastMessage?: LastMessage
  // можно добавить lastMessage, participants и т.д
}

export const useChats = () => {
  return useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/api/chats');
      return data;
    },
  });
};
