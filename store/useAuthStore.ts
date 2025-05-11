import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface User {
  _id: string;
  name: string;
  email: string;
  profile_pic: {
    url: string;
    public_id: string | null;
  };
  role: string;
  bio?: string;
  // Extend as per your API response
}

interface AuthStoreState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: Partial<User>) => void; // New setUser function
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        router.replace('/auth/login');
      },
      setUser: (updatedUser) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updatedUser } });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: async (key) => {
          const item = await AsyncStorage.getItem(key);
          return JSON.parse(item ?? 'null');
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    },
  ),
);

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   profile_pic: {
//     'url': string;
//     'public-id': string | null;
//   };
//   role: string;
//   bio?: string;
//   // Extend as per your API response
// }

// interface AuthStoreState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (user: User, token: string) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthStoreState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,
//       login: (user, token) => {
//         set({ user, token, isAuthenticated: true });
//       },
//       logout: () => {
//         set({ user: null, token: null, isAuthenticated: false });
//         router.replace('/auth/login'); // don't use dismissAll here
//       },
//     }),
//     {
//       name: 'auth-storage',
//       storage: {
//         getItem: async (key) => {
//           const item = await AsyncStorage.getItem(key);
//           return JSON.parse(item ?? 'null');
//         },
//         setItem: async (key, value) => {
//           await AsyncStorage.setItem(key, JSON.stringify(value));
//         },
//         removeItem: async (key) => {
//           await AsyncStorage.removeItem(key);
//         },
//       },
//     },
//   ),
// );
