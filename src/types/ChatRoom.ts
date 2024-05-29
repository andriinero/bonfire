import { z } from 'zod';

export const ChatRoomSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  created: z.string(),
  color_class: z.string(),
});

export type ChatRoom = z.infer<typeof ChatRoomSchema>;
