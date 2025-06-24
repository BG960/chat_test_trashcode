import { Request, Response } from 'express';
import Chat from '../models/chat.model';
import User from '../models/user.model';

export const createChat = async (req: Request, res: Response) => {
  try {
    const { title, participants, type } = req.body;

    if (!Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({ error: 'Нужно минимум 2 участника.' });
    }

    const chat = await Chat.create({
      title,
      participants,
      type
    });

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания чата', details: err });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
  const userId = (req as any).user.id;

    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'username avatar')
      .populate('lastMessage');

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения чатов', details: err });
  }
};
