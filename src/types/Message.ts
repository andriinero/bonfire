import { z } from 'zod';

import { MessageType } from './MessageType';

export const MessageSchema = z.object({
  id: z.string(),
  chatRoomId: z.string(),
  userId: z.string().optional(),
  body: z.string(),
  created: z.string(),
  reply: z.string().nullable(),
  type: z.nativeEnum(MessageType),
});

export type Message = z.infer<typeof MessageSchema>;
