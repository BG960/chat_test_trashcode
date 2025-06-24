import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createChat, getUserChats } from '../controllers/chat.controller';

const router = Router();

router.post('/', authMiddleware, createChat);
router.get('/', authMiddleware, getUserChats);

export default router;
