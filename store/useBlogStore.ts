import { apiClient } from '@/api/axios.config';
import { Blog } from '@/types/blog';
import { create } from 'zustand';

interface BlogStore {
  loading: boolean | null;
  blogs: Blog[];
  fetchBlogs: () => Promise<void>;
  // Add other properties and methods as needed
}
export const useBlogStore = create<BlogStore>((set) => ({
  loading: null,
  blogs: [],
  fetchBlogs: async () => {
    set({ loading: true });
    try {
      const response = await apiClient.get('/blog');

      set({ blogs: response.data });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
