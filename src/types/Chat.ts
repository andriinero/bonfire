import { z } from 'zod';

export const ChatSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  created: z.string(),
});

export type Chat = z.infer<typeof ChatSchema>;
