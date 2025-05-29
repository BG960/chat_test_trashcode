import apiClient from "@/shared/api/client";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setIsAuth(true);
  };

  const register = async (username: string, email: string, password: string) => {
    const { data } = await apiClient.post('/auth/register', { 
      username, 
      email, 
      password 
    });
    localStorage.setItem('token', data.token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  useEffect(() => {
const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuth(false);
      return;
    }
    
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setIsAuth(true);
  } catch {
    setIsAuth(false);
  } finally {
    setIsLoading(false);
  }
};
    checkAuth();
  }, []);

  return { isAuth, isLoading, login, register, logout };
};