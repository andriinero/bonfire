import { z } from 'zod';

export const UserDataSchema = z.object({
  username: z.string(),
  email: z.string(),
  role: z.string(),
  created: z.string(),
  is_online: z.boolean(),
});

export type UserData = z.infer<typeof UserDataSchema>;
