// shared/api/axiosInstance.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Добавляем токен авторизации (если есть)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Можно добавить обработку ошибок здесь
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Например, логика для автоматического выхода или логирования
    if (error.response?.status === 401) {
      console.warn('Неавторизованный запрос');
      // Можно вызвать logout или редирект
    }
    return Promise.reject(error);
  }
);
