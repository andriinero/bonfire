import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { User } from '@/types/User';

const useNonAuthUserIds = (users?: User[]): string[] => {
  let result: string[] = [];
  const authUserId = useAppSelector(selectAuthUserId);
  result = users
    ? users
        .map((userData) => userData._id)
        .filter((userId) => userId !== authUserId)
    : [];

  return result;
};

export default useNonAuthUserIds;
