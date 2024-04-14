import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';

import { UserData } from '@/types/UserData';

const useNonAuthUserParticipants = (participants?: UserData[]): UserData[] => {
  const result: UserData[] = [];
  const authUserId = useAppSelector(selectAuthUserId);

  if (participants)
    result.concat(participants.filter((p) => p._id !== authUserId));

  return result;
};

export default useNonAuthUserParticipants;
