import { RouteErrorSchema } from '@/types/RouteError';

const internalServerError = 'Internal Server Error';

export const getErrorMessage = (error: unknown): string => {
  let result = internalServerError;
  const validationResult = RouteErrorSchema.safeParse(error);
  if (validationResult.success) {
    const err = validationResult.data.data;
    result = err.error;
  }

  return result;
};
