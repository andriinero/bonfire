import { z } from 'zod';

export const AuthDataSchema = z.object({
  userId: z.string(),
  username: z.string(),
  userRole: z.enum(['guest', 'user', 'admin']),
});

export type AuthData = z.infer<typeof AuthDataSchema>;
