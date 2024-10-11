import { StateCreator } from 'zustand';
import { User } from '@/types/index';
import { me } from '@/api/AuthApi';

export type UserSliceType = {
  user: User;
  loadingUser: boolean;
  setUser: (data: User) => void;
  getUser: () => void;
};

const getLocalUser = (user: User | undefined) => {
  return (
    user || {
      email: '',
      id: null,
      name: null,
      rol: null,
    }
  );
};

export const createUserSlice: StateCreator<
  UserSliceType,
  [],
  [],
  UserSliceType
> = (set) => ({
  loadingUser: false,
  user: {
    email: '',
    id: null,
    name: '',
    rol: '',
  },
  getUser: async () => {
    try {
      set({
        loadingUser: true,
      });
      const user = await me();
      set({
        user: getLocalUser(user),
        loadingUser: false,
      });
    } catch {
      set({
        user: getLocalUser(undefined),
        loadingUser: false,
      });
    }
  },
  setUser: (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    set({ user: data });
  },
});
