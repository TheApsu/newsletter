import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { IndexQueryFilters } from '../types';

export type EmailTemplateApi = {
  name: string;
  data: string;
  content: string;
  id: string;
};

export type CreateTemplate = Pick<
  EmailTemplateApi,
  'content' | 'data' | 'name'
>;

export type EmailTemplateItem = Pick<
  EmailTemplateApi,
  'content' | 'data' | 'name' | 'id'
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

export const updateTemplate = async (formData: EmailTemplateItem) => {
  try {
    const { data } = await api.put(
      `/templates/update/${formData.id}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const deleteEmailTemplate = async (id: EmailTemplateItem['id']) => {
  try {
    const { data } = await api.delete(`/templates/deleted/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const getAllTemplates = async (params?: IndexQueryFilters) => {
  try {
    const { data } = await api('/templates/all', { params });
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const getEmailTemplate = async (
  id: EmailTemplateItem['id']
): Promise<EmailTemplateItem | undefined> => {
  try {
    const { data } = await api(`/templates/show/${id}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};
