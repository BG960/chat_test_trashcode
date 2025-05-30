import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Базовый URL вашего бэкенда
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерсептор для JWT (если используется)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;