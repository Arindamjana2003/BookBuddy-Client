import { apiClient } from '@/api/axios.config';
import { Blog } from '@/types/blog';
import { create } from 'zustand';

interface BlogStore {
  loading: boolean | null;
  blogs: Blog[];
  fetchBlogs: () => Promise<void>;
  fetchBlogDetails: (blogId: string) => Promise<Blog | undefined>;
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
  fetchBlogDetails: async (blogId: string) => {
    set({ loading: true });
    try {
      const response = await apiClient.get(`/blog/${blogId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error; // Rethrow the error for handling in the component
    } finally {
      set({ loading: false });
    }
  },
}));
