import { z } from 'zod';

export const AuthDataSchema = z.object({
  sub: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  bio: z.string(),
  location: z.string(),
  role: z.enum(['guest', 'user', 'admin']),
  profileImage: z.string().optional(),
  colorClass: z.string(),
});

export type AuthData = z.infer<typeof AuthDataSchema>;
