// controllers/user.controller.ts
import User from '../models/user.model';
import { Request, Response } from 'express';

export const searchUsers = async (req: Request, res: Response) => {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Введите имя пользователя.' });
  }

  try {
    const users = await User.find({
      username: { $regex: username, $options: 'i' }
    }).select('_id username email');

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка поиска пользователей' });
  }
};
