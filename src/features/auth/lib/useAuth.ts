import apiClient from "@/shared/api/client";
import { User } from "@/types/chat";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
      console.log('Вызван login с', { email, password });

    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [navigate]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const { data } = await apiClient.post('/auth/register', { username, email, password });
      localStorage.setItem('token', data.token);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuth(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }

      try {
        await apiClient.get<User>('/auth/me');
      
        setIsAuth(true);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  return { isAuth, isLoading, login, register, logout };
};


