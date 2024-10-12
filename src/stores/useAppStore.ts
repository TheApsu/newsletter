import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, UserSliceType } from './userSlice';
import {
  createEmailTemplateSlice,
  EmailTemplateType,
} from './emailTemplateSlice';
import { createEmailGroupSlice, EmailGroupType } from './emailGroupSlice';
import { createEmailSlice, EmailType } from './emailSlice';

export const useAppStore = create<UserSliceType & EmailTemplateType>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
    ...createEmailTemplateSlice(...a),
  }))
);

export const emailGroupAppStore = create<EmailGroupType>()(
  devtools((...a) => ({
    ...createEmailGroupSlice(...a),
  }))
);

export const emailAppStore = create<EmailType>()(
  devtools((...a) => ({
    ...createEmailSlice(...a),
  }))
);
