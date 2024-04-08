import { z } from 'zod';

export const UserDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  created: z.string(),
  is_online: z.boolean(),
  profile_image: z.string(),
});

export type UserData = z.infer<typeof UserDataSchema>;
