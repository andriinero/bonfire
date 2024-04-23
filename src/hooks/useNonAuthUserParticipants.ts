import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';

const useNonAuthUserIds = (users?: string[]): string[] => {
  let result: string[] = [];
  const authUserId = useAppSelector(selectAuthUserId);

  if (users) result = users.filter((p) => p !== authUserId);

  return result;
};

export default useNonAuthUserIds;
