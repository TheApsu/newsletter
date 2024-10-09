import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, UserSliceType } from './userSlice';
import {
  createEmailTemplateSlice,
  EmailTemplateType,
} from './emailTemplateSlice';

export const useAppStore = create<UserSliceType & EmailTemplateType>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
    ...createEmailTemplateSlice(...a),
  }))
);
