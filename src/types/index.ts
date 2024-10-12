import { z } from 'zod';

export type AuthSignIn = {
  email: string;
  password: string;
};

export const emailGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export const emailSchema = z.object({
  id: z.string(),
  name: z.string(),
  groupId: z.string()
});

export const userSchema = z.object({
  email: z.string().nullable(),
  id: z.string().nullable(),
  name: z.string().nullable(),
  rol: z.string().nullable(),
});

export const fileSchema = z.object({
  fileName: z.array(z.string()),
});

export type IndexQueryFilters = {
  pag?: number;
  name?: string;
  groupId?: string;
};
export type User = z.infer<typeof userSchema>;
export type EmailGroup = z.infer<typeof emailGroupSchema>;
export type Email = z.infer<typeof emailSchema>;
export type FileResponse = z.infer<typeof fileSchema>;

export type DeleteItem = {
  id?: string;
  show: boolean;
};

export type Meta = {
  total: number;
  totalPage: number;
  actualPage: number;
};
