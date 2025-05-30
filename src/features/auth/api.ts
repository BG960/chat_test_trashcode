import apiClient from '@/shared/api/client';

export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/login', credentials),
  
  register :(userData: { username: string; email: string; password: string }) => {
  return apiClient.post('/auth/register', userData)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response;
    });
  },
  
  getProfile: () => apiClient.get('/auth/me'),
};