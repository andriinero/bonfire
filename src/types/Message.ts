import { z } from 'zod';

import { MessageType } from './MessageType';

export const MessageAuthorSchema = z.object({
  id: z.string(),
  username: z.string(),
  isOnline: z.boolean(),
  colorClass: z.string(),
  profileImage: z.string(),
});
export type MessageAuthor = z.infer<typeof MessageAuthorSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  chatRoomId: z.string(),
  user: MessageAuthorSchema,
  body: z.string(),
  created: z.string(),
  reply: z.string().nullable(),
  type: z.nativeEnum(MessageType),
});
export type Message = z.infer<typeof MessageSchema>;
