import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { IndexQueryFilters } from '../types';

export type EmailTemplateApi = {
  name: string;
  data: string;
  content: string;
};

export type CreateTemplate = Pick<
  EmailTemplateApi,
  'content' | 'data' | 'name'
>;

export const createTemplate = async (formData: CreateTemplate) => {
  try {
    const { data } = await api.post('/templates/create', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const getAllTemplates = async (params: IndexQueryFilters) => {
  try {
    const { data } = await api('/templates/all', { params });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};
