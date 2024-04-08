import { z } from 'zod';

export const MessageDataSchema = z.object({
  user: z.string(),
  body: z.string(),
  created: z.string(),
  reply: z.string(),
});
export type MessageData = z.infer<typeof MessageDataSchema>;
