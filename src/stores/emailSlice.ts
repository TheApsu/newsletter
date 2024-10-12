import { StateCreator } from 'zustand';
import { Email } from '../types';

export type EmailType = {
  name?: Email;
  editingId?: Email['id'];
  setEditingId: (id: Email['id']) => void;
  setEmail: (name: Email | undefined) => void;
};

export const createEmailSlice: StateCreator<
  EmailType,
  [],
  [],
  EmailType
> = (set) => ({
  name: undefined,
  groupId: '',

  setEmail: (name) => {
    if (!name) {
      set({
        editingId: undefined,
      });
    }
    set({
      name,
    });
  },
  setEditingId: (editingId) => {
    set({
      editingId,
    });
  },
});
