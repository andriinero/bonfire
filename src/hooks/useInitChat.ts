import { useGetMessagesQuery } from '@/features/messages/messagesSlice';
import { useGetParticipantsQuery } from '@/features/participants/participantsSlice';

const useInitChat = (chatRoomId: string) => {
  const {
    isLoading: isMessagesLoading,
    isFetching: isMessagesFetching,
    isError: isMessagesFetchError,
    isSuccess: isMessagesFetchSuccess,
  } = useGetMessagesQuery({ chatRoomId, page: 0 });
  const {
    isLoading: isParticipantsLoading,
    isFetching: isParticipantsFetching,
    isError: isParticipantsFetchError,
    isSuccess: isParticipantsFetchSuccess,
  } = useGetParticipantsQuery(chatRoomId);

  const isLoading = isMessagesLoading || isParticipantsLoading;
  const isFetching = isMessagesFetching || isParticipantsFetching;
  const isError = isMessagesFetchError || isParticipantsFetchError;
  const isSuccess = isMessagesFetchSuccess && isParticipantsFetchSuccess;

  return { isLoading, isFetching, isError, isSuccess };
};

export default useInitChat;
