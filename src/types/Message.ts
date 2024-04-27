import { z } from 'zod';

import { MessageType } from './MessageType';

export const MessageSchema = z.object({
  _id: z.string(),
  chat_room: z.string(),
  user: z.string().optional(),
  body: z.string(),
  created: z.string(),
  reply: z.string().nullable(),
  type: z.nativeEnum(MessageType),
});

export type Message = z.infer<typeof MessageSchema>;
