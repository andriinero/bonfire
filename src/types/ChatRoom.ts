import { z } from 'zod';

export const ChatRoomSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.string(),
  colorClass: z.string(),
});

export type ChatRoom = z.infer<typeof ChatRoomSchema>;
