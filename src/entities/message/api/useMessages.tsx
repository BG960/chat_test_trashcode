import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import { Message } from '@/entities/message/model/types';

export const useMessages = (chatId?: string) => {
  return useQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      if (!chatId) return [];
      const response = await axiosInstance.get(`/api/messages/${chatId}/messages`);
      return response.data;
    },
    enabled: !!chatId,
  });
};
