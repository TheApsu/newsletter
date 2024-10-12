import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { FileResponse } from '../types';
import { Email, IndexQueryFilters, Meta } from '../types';

export const uploadImage = async (
  file: File
): Promise<FileResponse | undefined> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/files/uploadFile', formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
export type EmailWithMeta = {
  data: Email[];
  meta: Meta;
};

export type EmailApi = {
  name: string;
  groupId: string;
};

export type CreateEmail = Pick<EmailApi, 'name' | 'groupId'>;
export const getAllGroups = async (
  params: IndexQueryFilters
): Promise<EmailWithMeta | undefined> => {
  try {
    const { data } = await api('/emails/all', {
      params,
    });
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const createEmail = async (formData: CreateEmail) => {
  try {
    const { data } = await api.post('/emails/create', formData);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const deleteEmail = async (id: Email['id']) => {
  try {
    const { data } = await api.delete(`/emails/deleted/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const updateEmail = async (formData: Email) => {
  try {
    const { data } = await api.put(
      `/emails/update/${formData.id}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};

export const getEmail = async (
  id: Email['id']
): Promise<Email | undefined> => {
  try {
    const { data } = await api(`/emails/show/${id}`);
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};