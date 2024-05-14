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
    status = `${onlineCount} ${onlineCount > 1 ? 'users' : 'user'} online`;
  } else {
    status = nonAuthParticipants?.[0]?.is_online ? 'Online' : 'Offline';
  }

  return status;
};

export default useChatRoomOnlineStatus;
