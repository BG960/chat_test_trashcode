import { Request, Response } from 'express';
import User from '../models/user.model';

export const sendFriendRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const { userId } = req.body;
  const currentUserId = req.user.id;

  if (userId === currentUserId) {
    return res.status(400).json({ error: 'Нельзя добавить самого себя.' });
  }

  const userToAdd = await User.findById(userId);
  const currentUser = await User.findById(currentUserId);

  if (!currentUser || !userToAdd) {
    return res.status(404).json({ error: 'Пользователь не найден.' });
  }

  if (
    userToAdd.friendRequests.includes(currentUserId) ||
    userToAdd.friends.includes(currentUserId)
  ) {
    return res.status(400).json({ error: 'Запрос уже отправлен или вы уже друзья.' });
  }

  userToAdd.friendRequests.push(currentUserId);
  currentUser.sentRequests.push(userToAdd._id);

  await userToAdd.save();
  await currentUser.save();

  res.json({ message: 'Запрос отправлен.' });
};

export const getFriendRequests = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const user = await User.findById(req.user.id).populate('friendRequests', 'username email');
  res.json(user?.friendRequests || []);
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const { requesterId } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  const requester = await User.findById(requesterId);

  if (!user || !requester) {
    return res.status(404).json({ error: 'Пользователь не найден.' });
  }

  if (!user.friendRequests.includes(requesterId)) {
    return res.status(400).json({ error: 'Нет такого запроса.' });
  }

  user.friends.push(requesterId);
  requester.friends.push(userId);

  user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);
  requester.sentRequests = requester.sentRequests.filter(id => id.toString() !== userId);

  await user.save();
  await requester.save();

  res.json({ message: 'Запрос принят.' });
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const { requesterId } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  const requester = await User.findById(requesterId);

  if (!user || !requester) {
    return res.status(404).json({ error: 'Пользователь не найден.' });
  }

  user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);
  requester.sentRequests = requester.sentRequests.filter(id => id.toString() !== userId);

  await user.save();
  await requester.save();

  res.json({ message: 'Запрос отклонён.' });
};

export const removeFriend = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const { friendId } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    return res.status(404).json({ error: 'Пользователь не найден.' });
  }

  user.friends = user.friends.filter(id => id.toString() !== friendId);
  friend.friends = friend.friends.filter(id => id.toString() !== userId);

  await user.save();
  await friend.save();

  res.json({ message: 'Пользователь удален из друзей.' });
};
