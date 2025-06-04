import axios from './client';
import { Chat , User  } from '@/types/chat';


export const fetchProfile = async (): Promise<User> => {
  const res = await axios.get('/auth/me');
  return res.data;
};

export const fetchChats = async (): Promise<Chat[]> => {
  const res = await axios.get('/chats');
  return res.data;
};

export const fetchChat = async (id: string): Promise<Chat> => {
  const res = await axios.get(`/chats/${id}`);
  return res.data;
};