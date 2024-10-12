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

export const getAllGroupsNotPaginate = async (
  params: IndexQueryFilters
): Promise<EmailGroup | undefined> => {
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

export const deleteEmailGroup = async (id: EmailGroup['id']) => {
  try {
    const { data } = await api.delete(`/emailGroups/deleted/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const updateEmailGroup = async (formData: EmailGroup) => {
  try {
    const { data } = await api.put(
      `/emailGroups/update/${formData.id}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const getEmailGroup = async (
  id: EmailGroup['id']
): Promise<EmailGroup | undefined> => {
  try {
    const { data } = await api(`/emailGroups/show/${id}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};
