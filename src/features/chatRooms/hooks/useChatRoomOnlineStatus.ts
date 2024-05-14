import { useAppSelector } from '@/app/hooks';
import useIsGroupChatRoom from './useIsGroupChatRoom';
import useNonAuthParticipants from './useNonAuthParticipants';

import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';

const useChatRoomOnlineStatus = (id: string) => {
  let status = '';

  const participants = useAppSelector(selectParticipantsByChatId(id));
  const nonAuthParticipants = useNonAuthParticipants(id);
  const isGroup = useIsGroupChatRoom(id);

  const onlineCount = participants
    ? participants.reduce((prev, cur) => {
        if (cur.is_online) return ++prev;
        return prev;
      }, 0)
    : 0;

  if (isGroup) {
    status = onlineCount > 0 ? `${onlineCount} online` : 'no active users';
  } else {
    status = nonAuthParticipants?.[0]?.is_online ? 'online' : 'offline';
  }

  return status;
};

export default useChatRoomOnlineStatus;
