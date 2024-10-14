import { StateCreator } from 'zustand';
import { EmailGroup } from '../types';

export type EmailGroupType = {
  emailGroup?: EmailGroup;
  editingId?: EmailGroup['id'];
  isDuplicating: boolean;
  setEditingId: (id?: EmailGroup['id'], isDuplicating?: boolean) => void;
  duplicate: (id: EmailGroup['id']) => void;
  setEmailGroup: (emailGroup: EmailGroup | undefined) => void;
};

export const createEmailGroupSlice: StateCreator<
  EmailGroupType,
  [],
  [],
  EmailGroupType
> = (set, get) => ({
  emailGroup: undefined,
  editingId: undefined,
  isDuplicating: false,
  setEmailGroup: (emailGroup) => {
    if (!emailGroup) {
      set({
        editingId: undefined,
        isDuplicating: false,
      });
    }
    set({
      emailGroup,
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
        emailGroup: {
          ...get().emailGroup!,
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
