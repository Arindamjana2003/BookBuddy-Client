// src/store/bookStore.js
import { create } from 'zustand';
import { apiClient } from '@/api/axios.config';
import { Alert } from 'react-native';

interface BookStore {
  categories: any[];
  books: any[];
  isLoading: boolean;
  error: any;
  fetchCategories: () => Promise<void>;
  fetchBooksByCategoryId: (categoryId: any) => Promise<void>;
}

const useBookStore = create<BookStore>()((set, get) => ({
  categories: [],
  books: [],
  isLoading: false,
  error: null,

  // Fetch all categories
  fetchCategories: async () => {
    try {
      const { data } = await apiClient.get('/categories');

      if (data) {
        set({ categories: data });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch categories');
    }
  },

  // Fetch books by category ID
  fetchBooksByCategoryId: async (categoryId: any) => {
    try {
      set({ isLoading: true });
      const { data } = await apiClient.get(`/book/${categoryId}`);
      // console.log('Books:', data);

      if (data) {
        set({ books: data, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error });
      Alert.alert('Error', 'Failed to fetch books');
    }
  },
}));

export default useBookStore;
