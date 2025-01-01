import { z } from 'zod';

export enum NotificationType {
  MESSAGE = 'MESSAGE',
  FRIEND_REQUEST = 'FRIEND_REQUEST',
}

export const NotificationSenderSchema = z.object({
  id: z.string(),
  username: z.string(),
  colorClass: z.string(),
  profileImage: z.string(),
});
export type NotificationSender = z.infer<typeof NotificationSenderSchema>;

export const NotificationSchema = z.object({
  id: z.string(),
  body: z.string(),
  type: z.nativeEnum(NotificationType),
  created: z.string(),
  isRead: z.boolean(),
  sender: NotificationSenderSchema,
});
export type Notification = z.infer<typeof NotificationSchema>;
