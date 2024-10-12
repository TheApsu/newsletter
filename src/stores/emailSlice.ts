import { StateCreator } from 'zustand';
import { Email } from '../types';

export type EmailType = {
  email?: Email;
  editingId?: Email['id'];
  setEditingId: (id: Email['id']) => void;
  setEmail: (email: Email | undefined) => void;
};

export const createEmailSlice: StateCreator<
  EmailType,
  [],
  [],
  EmailType
> = (set) => ({
  email: undefined,

  setEmail: (email) => {
    if (!email) {
      set({
        editingId: undefined,
      });
    }
    set({
      email,
    });
  },
  setEditingId: (editingId) => {
    set({
      editingId,
    });
  },
});
