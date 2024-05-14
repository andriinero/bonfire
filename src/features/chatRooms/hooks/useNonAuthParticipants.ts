import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';

const useNonAuthParticipants = (chatId: string) => {
  const authUserId = useAppSelector(selectAuthUserId);
  const participants = useAppSelector(selectParticipantsByChatId(chatId));

  const nonAuthParticipants = participants?.filter((p) => p._id !== authUserId);

  return nonAuthParticipants;
};

export default useNonAuthParticipants;
