import { z } from 'zod';

export const ChatRoomSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  created: z.string(),
});

export type ChatRoom = z.infer<typeof ChatRoomSchema>;

export type ChatRoomColored = ChatRoom & { colorClass: string };
