import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';

const useNonAuthParticipants = (chatRoomId: string) => {
  const authUserId = useAppSelector(selectAuthUserId);
  const participants = useAppSelector(selectParticipantsByChatId(chatRoomId));

  const nonAuthParticipants = participants?.filter((p) => p.id !== authUserId);

  return nonAuthParticipants;
};

export default useNonAuthParticipants;
