import { User } from '@/types/User';

const getNonAuthUserIds = (authUserId: string, users?: User[]): string[] => {
  let result: string[] = [];
  result = users
    ? users
        .map((userData) => userData._id)
        .filter((userId) => userId !== authUserId)
    : [];

  return result;
};

export default getNonAuthUserIds;
