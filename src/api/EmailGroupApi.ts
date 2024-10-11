import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { EmailGroup, IndexQueryFilters, Meta } from '../types';

export type EmailGroupWithMeta = {
  data: EmailGroup[];
  meta: Meta;
};

export type EmailGroupApi = {
  name: string;
};

export type CreateEmailGroup = Pick<EmailGroupApi, 'name'>;

export const getAllGroups = async (
  params: IndexQueryFilters
): Promise<EmailGroupWithMeta | undefined> => {
  try {
    const { data } = await api('/emailGroups/all', {
      params,
    });
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const createEmailGroup = async (formData: CreateEmailGroup) => {
  try {
    const { data } = await api.post('/emailGroups/create', formData);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};
