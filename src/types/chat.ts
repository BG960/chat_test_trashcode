export interface User {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

export interface LastMessage {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
}

export interface Chat {
  id: string;
  title: string;
  participants: User[];
  lastMessage?: LastMessage;
  unreadCount: number;
  type: 'private' | 'group' | 'channel';
  createdAt: Date;
}