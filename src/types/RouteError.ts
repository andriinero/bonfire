import { z } from 'zod';

export const RouteErrorSchema = z.object({
  data: z.object({
    error: z.string(),
  }),
  status: z.number(),
});

export type RouteError = z.infer<typeof RouteErrorSchema>;
