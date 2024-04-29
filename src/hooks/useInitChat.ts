import { useGetMessagesQuery } from '@/features/messages/messagesSlice';
import { useGetParticipantsQuery } from '@/features/participants/participantsSlice';

const useInitChat = (chatId: string) => {
  const { isFetching: isMessagesFetching } = useGetMessagesQuery(chatId);
  const { isFetching: isParticipantsFetching } =
    useGetParticipantsQuery(chatId);

  const isLoading = isMessagesFetching || isParticipantsFetching;

  return { isLoading };
};

export default useInitChat;
