import { z } from 'zod';

import { UserDataSchema } from './UserData';

export const ChatDataSchema = z.object({
  _id: z.string(),
  participants: z.array(UserDataSchema),
  created: z.string(),
});

export type ChatData = z.infer<typeof ChatDataSchema>;
