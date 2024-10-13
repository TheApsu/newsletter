import { isAxiosError } from 'axios';
import { EmailGroup } from '../types';
import { EmailTemplateItem } from './EmailTemplateApi';
import api from '@/lib/axios';

export type SendEmail = {
  templateId: EmailTemplateItem['id'];
  groupId: EmailGroup['id'];
};

export const sendEmail = async (formData: SendEmail) => {
  try {
    const { data } = await api.post('/sendEmails/create', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};
