import { StateCreator } from 'zustand';
import { Email } from '../types';

export type EmailType = {
  name?: Email;
  editingId?: Email['id'];
  isDuplicating: boolean;
  setEditingId: (id?: Email['id'], isDuplicating?: boolean) => void;
  duplicate: (id: Email['id']) => void;
  setEmail: (name: Email | undefined) => void;
};

export const createEmailSlice: StateCreator<EmailType, [], [], EmailType> = (
  set,
  get
) => ({
  name: undefined,
  groupId: '',
  isDuplicating: false,
  editingId: undefined,
  setEmail: (name) => {
    if (!name) {
      set({
        editingId: undefined,
        isDuplicating: false,
      });
    }
    set({
      name,
    });
  },
  setEditingId: (editingId, isDuplicating = false) => {
    set({
      editingId,
      isDuplicating,
    });
  },
  duplicate: (editingId) => {
    if (get().editingId === editingId) {
      set({
        editingId: '',
        isDuplicating: true,
        name: {
          ...get().name!,
          id: '',
        },
      });
    } else {
      set({
        editingId,
        isDuplicating: true,
      });
    }
  },
});
