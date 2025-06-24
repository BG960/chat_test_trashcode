import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import messageRoutes from './routes/message.routes';
import { setupSwagger } from './swagger';
import friendRoutes from './routes/friend.routes';
import userRoutes from './routes/user.routes';



dotenv.config();

const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173', // Укажи фронтенд-URL
    credentials: true, // Разрешить отправку cookie/Authorization header
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


app.use(morgan('dev'));
app.use(express.json());

setupSwagger(app);

app.use('/api/friends', friendRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);


mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

export default app;
