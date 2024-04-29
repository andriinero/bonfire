import { useAppSelector } from '@/app/hooks';

import { useGetChatRoomsQuery } from '@/features/chatRooms/chatRoomsSlice';
import { useGetMessagesQuery } from '@/features/messages/messagesSlice';
import { useGetParticipantsQuery } from '@/features/participants/participantsSlice';
import { selectSelectedChatId } from '@/features/chat/chatSlice';

const useInitHome = () => {
  const { isFetching: isChatRoomsFetching } = useGetChatRoomsQuery();
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  const { isFetching: isMessagesFetching } =
    useGetMessagesQuery(selectedChatId);
  const { isFetching: isParticipantsFetching } =
    useGetParticipantsQuery(selectedChatId);

  const isLoading =
    isChatRoomsFetching || isMessagesFetching || isParticipantsFetching;

  return { isLoading };
};

export default useInitHome;
