import { useAuthStore } from '@/store/useAuthStore';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';

export const BASE_URL = 'https://bookbuddy-server.vercel.app/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      router.dismissAll();
      router.navigate('/auth/login');
    }

    return Promise.reject({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    });
  },
);

// export default {
//   get: <T>(url: string, config?: AxiosRequestConfig) => apiClient.get<T>(url, config),
//   post: <T>(url: string, data: unknown, config?: AxiosRequestConfig) =>
//     apiClient.post<T>(url, data, config),
//   put: <T>(url: string, data: unknown, config?: AxiosRequestConfig) =>
//     apiClient.put<T>(url, data, config),
//   delete: <T>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T>(url, config),
// };
