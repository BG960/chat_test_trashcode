import { Request, Response } from 'express';
import Message from '../models/message.model';
import Chat from '../models/chat.model';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const senderId = (req as any).user.id;

    const message = await Message.create({
      chat: chatId,
      sender: senderId,
      content,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка отправки сообщения', details: err });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username avatar')
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения сообщений', details: err });
  }
};
