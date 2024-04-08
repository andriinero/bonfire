import { z } from 'zod';

import { UserDataSchema } from './UserData';
import { MessageDataSchema } from './MessageData';

export const ChatDataSchema = z.object({
  _id: z.string(),
  participants: z.array(UserDataSchema),
  messages: z.array(MessageDataSchema),
});

export type ChatData = z.infer<typeof ChatDataSchema>;
