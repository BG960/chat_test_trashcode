// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { S } from "framer-motion/dist/types.d-CtuPurYT";

export interface User {
  email: string;
  id: string;
  name: string;
  username: string;
  avatar: string;
  online?: boolean;
}
export type Message = {
  id: number;
  senderId: string;
  content: string;
  text: string;
  sender: string;
};
export interface LastMessage {
  id: string;
  content:string;
  timestamp: Date;
  senderId: string;
  sender: { id: string, username: string }
  
}

export interface Chat {
  id: string;
  sender:string;
  title: string;
  participants: User[];
  lastMessage?: LastMessage;
  unreadCount: number;
  type: 'private' | 'group' | 'channel';
  createdAt: Date;
}