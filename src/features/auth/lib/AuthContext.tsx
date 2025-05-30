import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/shared/api/client';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '@/types/chat';

type AuthContextType = {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  chats: Chat[];
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ теперь тут
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const res = await axios.get('/auth/me');
    setUser(res.data);
    setIsAuth(true);
  };

  const fetchChats = async () => {
    const res = await axios.get('/chats');
    setChats(res.data);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post('/auth/login', { email, password });
      await fetchProfile();
      await fetchChats();
      navigate('/main');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post('/auth/register', { username, email, password });
      await fetchProfile();
      await fetchChats();
      navigate('/main');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setChats([]);
    setIsAuth(false);
    navigate('/auth');
  };

  useEffect(() => {
    const tryAutoLogin = async () => {
      setIsLoading(true);
      try {
        await fetchProfile();
        await fetchChats();
      } catch {
        console.log('Авто-вход не удался');
      } finally {
        setIsLoading(false);
      }
    };

    tryAutoLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, chats, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
