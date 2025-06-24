import express from 'express';
import { searchUsers } from '../controllers/user.controller';
import {authMiddleware} from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/search', authMiddleware, searchUsers);

export default router;
