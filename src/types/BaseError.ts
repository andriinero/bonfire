import { z } from 'zod';

export const BaseErrorSchema = z.object({
  status: z.number(),
  data: z.unknown(),
});
export type BaseError = z.infer<typeof BaseErrorSchema>;
