import { apiClient } from '@/api/axios.config';
import { create } from 'zustand';

interface DiaryStore {
  loading: boolean | null;
  diaries: any[];
  createDiary: (diary: any) => Promise<void>;
  fetchDiaries: () => Promise<void>;
  fetchDiaryDetails: (diaryId: string) => Promise<any>;
  deleteDiary: (diaryId: string) => Promise<void>;
}

export const useDiaryStore = create<DiaryStore>()((set) => ({
  loading: null,
  diaries: [],

  createDiary: async (diary) => {
    set({ loading: true });
    try {
      const response = await apiClient.post('/note', diary);
      set((state) => ({ diaries: [...state.diaries, response.data] }));
    } catch (error) {
      console.error('Error creating diary:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchDiaries: async () => {
    set({ loading: true });
    try {
      const response = await apiClient.get('/note');
      set({ diaries: response.data });
    } catch (error) {
      console.error('Error fetching diaries:', error);
    } finally {
      set({ loading: false });
    }
  },
  fetchDiaryDetails: async (diaryId: string) => {
    set({ loading: true });
    try {
      const response = await apiClient.get(`/note/${diaryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching diary by ID:', error);
      throw error; // Rethrow the error for handling in the component
    } finally {
      set({ loading: false });
    }
  },
  deleteDiary: async (diaryId: string) => {
    set({ loading: true });
    try {
      await apiClient.delete(`/note/${diaryId}`);
      useDiaryStore.getState().fetchDiaries(); // Refresh the diary list
    } catch (error) {
      console.error('Error deleting diary:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
