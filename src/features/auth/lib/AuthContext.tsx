import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/shared/api/client';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '@/types/chat';

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  chats: Chat[];
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/auth/me');
      setUser(res.data);
      setIsAuth(true);
    } catch (err) {
      console.error('Ошибка при получении профиля:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChats = async () => {
    const res = await apiClient.get('/chats');
    setChats(res.data);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
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
      const res = await apiClient.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
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
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
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