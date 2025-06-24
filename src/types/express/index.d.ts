import { IUser } from '../../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user: IUser & { id: string }; // или просто { id: string } если ты не типизировал User
    }
  }
}
