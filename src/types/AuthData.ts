import { z } from 'zod';

export const AuthDataSchema = z.object({
  sub: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(['guest', 'user', 'admin']),
  profile_image: z.string().optional(),
  color_class: z.string(),
});

export type AuthData = z.infer<typeof AuthDataSchema>;
