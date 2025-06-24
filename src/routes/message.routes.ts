import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { sendMessage, getMessages } from '../controllers/message.controller';

const router = Router();

router.post('/:chatId/messages', authMiddleware, sendMessage);
router.get('/:chatId/messages', authMiddleware, getMessages);

export default router;
