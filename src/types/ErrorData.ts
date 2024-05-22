import { z } from 'zod';

export const ErrorDataSchema = z.object({
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
});

export type ErrorData = z.infer<typeof ErrorDataSchema>;
