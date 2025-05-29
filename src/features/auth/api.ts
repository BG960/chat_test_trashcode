import apiClient from '@/shared/api/client';

export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/login', credentials),
  
  register: (userData: { username: string; email: string; password: string }) =>
    apiClient.post('/auth/register', userData),
  
  getProfile: () => apiClient.get('/auth/me'),
};