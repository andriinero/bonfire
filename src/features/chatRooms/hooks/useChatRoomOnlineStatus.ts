import { useAppSelector } from '@/app/hooks';

import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';

const useChatRoomOnlineStatus = (id: string) => {
  let status = '';
  const participants = useAppSelector(selectParticipantsByChatId(id));

  const count = participants
    ? participants.reduce((prev, cur) => {
        if (cur.is_online) return ++prev;
        return prev;
      }, 0)
    : 0;

  if (count === 1) status = 'Online';
  else if (count > 2) status = `${count} online`;

  return status;
};

export default useChatRoomOnlineStatus;
