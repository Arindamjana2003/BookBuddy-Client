// src/store/bookStore.js
import { create } from 'zustand';
import { apiClient } from '@/api/axios.config';
import { Alert } from 'react-native';
import { useAuthStore } from './useAuthStore';
import { Book } from '@/types/books';

interface BookStore {
  categories: any[];
  books: any[];
  myUploadedBooks: any[];
  isLoading: boolean;
  error: any;
  fetchCategories: () => Promise<void>;
  fetchBooksByCategoryId: (categoryId: any) => Promise<void>;
  fetchAllBooks: () => Promise<void>;
}

const useBookStore = create<BookStore>()((set, get) => ({
  categories: [],
  books: [],
  isLoading: false,
  error: null,
  myUploadedBooks: [],

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
      const { data } = await apiClient.get(`/book/category/${categoryId}`);
      // console.log('Books:', data);

      if (data) {
        set({ books: data, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error });
      Alert.alert('Error', 'Failed to fetch books');
    }
  },

  // Fetch all books
  fetchAllBooks: async () => {
    try {
      set({ isLoading: true });

      const userId = useAuthStore.getState().user?._id;
      const { data } = await apiClient.get('/book');

      if (data && userId) {
        const filteredData = data.filter((book: any) => book.user?._id === userId);
        set({ myUploadedBooks: filteredData, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      Alert.alert('Error', 'Failed to fetch books');
    }
  },
}));

export default useBookStore;
