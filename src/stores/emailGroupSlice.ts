import { StateCreator } from 'zustand';
import { EmailGroup } from '../types';

export type EmailGroupType = {
  emailGroup?: EmailGroup;
  editingId?: EmailGroup['id'];
  setEditingId: (id: EmailGroup['id']) => void;
  setEmailGroup: (emailGroup: EmailGroup | undefined) => void;
};

export const createEmailGroupSlice: StateCreator<
  EmailGroupType,
  [],
  [],
  EmailGroupType
> = (set) => ({
  emailGroup: undefined,

  setEmailGroup: (emailGroup) => {
    if (!emailGroup) {
      set({
        editingId: undefined,
      });
    }
    set({
      emailGroup,
    });
  },
  setEditingId: (editingId) => {
    set({
      editingId,
    });
  },
});
