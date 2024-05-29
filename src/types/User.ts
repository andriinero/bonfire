import { z } from 'zod';

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(['guest', 'user', 'admin']),
  created: z.string(),
  is_online: z.boolean(),
  profile_image: z.string(),
  color_class: z.string(),
});

export type User = z.infer<typeof UserSchema>;
