import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { AuthSignIn, User, userSchema } from '@/types/index';

export const signIn = async (
  formData: AuthSignIn
): Promise<User | undefined> => {
  try {
    const { data, headers } = await api.post('/auth/login', formData);
    const client = headers['client'];
    const accessToken = headers['access-token'];
    const uid = headers['uid'];

    localStorage.setItem('client', client);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('uid', uid);
    if (data.success) {
      localStorage.setItem('access-token', data.token);
      const user = data.user;
      return user;
    }
    return undefined;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errors.full_messages);
    }
  }
};

export const me = async (): Promise<User | undefined> => {
  try {
    const { data } = await api('/auth/me');
    const result = userSchema.safeParse(data.user);
    if (result.success) {
      return result.data as User;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error('Not signed in');
    }
  }
};
