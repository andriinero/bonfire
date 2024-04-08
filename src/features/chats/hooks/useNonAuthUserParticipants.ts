import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';

import { UserData } from '@/types/UserData';

const useNonAuthUserParticipants = (participants: UserData[]) => {
  const authUserId = useAppSelector(selectAuthUserId);
  const nonAuthUser = participants.filter((p) => p._id !== authUserId);

  return nonAuthUser;
};

export default useNonAuthUserParticipants;
