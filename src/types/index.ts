import { z } from 'zod';

export type AuthSignIn = {
  email: string;
  password: string;
};

export const userSchema = z.object({
  id: z.number().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  uid: z.string().nullable(),
});

export const fileSchema = z.object({
  fileName: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
export type FileResponse = z.infer<typeof fileSchema>;

export type DeleteItem = {
  id?: number;
  show: boolean;
};
