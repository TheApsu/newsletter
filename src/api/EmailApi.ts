import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { FileResponse } from '../types';

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
