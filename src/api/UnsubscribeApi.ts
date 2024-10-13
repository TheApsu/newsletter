import api from '@/lib/axios';
import { isAxiosError } from 'axios';

export type UnsubscribeAPI = {
  email: string;
  reason: string;
};

export const unsubscribe = async (formData: UnsubscribeAPI) => {
  try {
    const { data } = await api.post('/unsubscribes/create', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors);
    }
  }
};
