import { z } from 'zod';

export enum PushNotificaitonType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export const pushNotificaitonScheme = z.object({
  _id: z.string(),
  body: z.string(),
  type: z.nativeEnum(PushNotificaitonType),
});

export type TPushNotificaiton = z.infer<typeof pushNotificaitonScheme>;
