import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  location: z.string(),
  bio: z.string(),
  role: z.enum(['guest', 'user', 'admin']),
  created: z.string(),
  isOnline: z.boolean(),
  profileImage: z.string(),
  colorClass: z.string(),
});

export type User = z.infer<typeof UserSchema>;
