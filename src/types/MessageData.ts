import { z } from 'zod';

import { MessageType } from './MessageType';

export const MessageDataSchema = z.object({
  _id: z.string(),
  chat_room: z.string(),
  user: z.string().nullable(),
  body: z.string(),
  created: z.string(),
  reply: z.string().nullable(),
  type: z.nativeEnum(MessageType),
});

export type MessageData = z.infer<typeof MessageDataSchema>;
