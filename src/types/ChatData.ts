import { z } from 'zod';

import { MessageDataSchema } from './MessageData';

export const ChatDataSchema = z.object({
  _id: z.string(),
  name: z.string(),
  participants: z.string().array(),
  created: z.string(),
});

export type ChatData = z.infer<typeof ChatDataSchema>;
