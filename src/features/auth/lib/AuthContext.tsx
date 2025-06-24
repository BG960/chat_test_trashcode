/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/shared/api/client';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '@/types/chat';
import { authAPI } from '@/features/auth/api'; // импортируем authAPI
import { fetchProfile } from '@/shared/api/api';

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  chats: Chat[];
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  // DEBUG: добавить ручной сброс токена и логирования
  debugLogAuth: () => void;
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
      console.log('[AUTH] Запрос профиля...');
      const res = await authAPI.getProfile();
      setUser(res.data);
      setIsAuth(true);
      console.log('[AUTH] Профиль получен:', res.data);
    } catch (e: any) {
      console.error('[AUTH] Ошибка получения профиля:', e, e?.response);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchChats = async () => {
    try {
      console.log('[AUTH] Запрос чатов...');
      const res = await apiClient.get('/chats');
      console.log('[AUTH] Получены чаты:', res.data);
      setChats(res.data);
    } catch (e) {
      console.error('[AUTH] Ошибка получения чатов:', e);
    }
  };

const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const res = await authAPI.login({ email, password });
    console.log('[AUTH] Успешный login, токен:', res.data.token);
    console.log('[AUTH] Сохранение токена...');
    localStorage.setItem('token', res.data.token);  // сохранить токен
    console.log('[AUTH] Токен сохранен:', localStorage.getItem('token'));
    await fetchProfile(); // запрос с токеном
    console.log('[AUTH] Перенаправление на главную страницу...');
    navigate('/main');
  } catch (error: any) {
    console.error('[AUTH] Ошибка login:', error, error?.response);
    throw error;
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
  } catch (error: any) {
    console.error('[AUTH] Ошибка регистрации:', error, error?.response);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const logout = async () => {
  try {
    localStorage.removeItem('token');
    setUser(null);
    setChats([]);
    setIsAuth(false);
    navigate('/auth');
  } catch (error: any) {
    console.error('[AUTH] Ошибка logout:', error, error?.response);
    throw error;
  }
};
const debugLogAuth = () => {
  console.log('DEBUG: Auth context');
};
  return (
    <AuthContext.Provider value={{ isAuth, user, chats, login, register, logout, isLoading, debugLogAuth }}>
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