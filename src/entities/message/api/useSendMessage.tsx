import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';

interface SendMessagePayload {
  chatId: string;
  text: string;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async ({ chatId, text }: SendMessagePayload) => {
      const response = await axiosInstance.post('/api/messages', { chatId, text });
      return response.data;
    },
    onSuccess: (_data, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
  });

  return { mutate, isLoading: status === 'pending' };
};
