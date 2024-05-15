import { z } from 'zod';

export enum PushNotificationType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export const pushNotificationScheme = z.object({
  _id: z.string(),
  body: z.string().optional(),
  list: z.array(z.string()).optional(),
  type: z.nativeEnum(PushNotificationType),
});

export type TPushNotification = z.infer<typeof pushNotificationScheme>;
