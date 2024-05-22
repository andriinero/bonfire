import { z } from 'zod';

export const ValidationErrorSchema = z.object({
  data: z.object({
    message: z.string(),
    errors: z
      .array(
        z.object({
          location: z.string(),
          msg: z.string(),
          path: z.string(),
          type: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
  }),
  status: z.number().optional(),
});

export type ValidationError = z.infer<typeof ValidationErrorSchema>;
