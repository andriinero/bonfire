import { useGetMessagesQuery } from '@/features/messages/messagesSlice';
import { useGetParticipantsQuery } from '@/features/participants/participantsSlice';

const useInitChat = (chatId: string) => {
  const {
    isLoading: isMessagesLoading,
    isFetching: isMessagesFetching,
    isError: isMessagesFetchError,
    isSuccess: isMessagesFetchSuccess,
    
  } = useGetMessagesQuery(chatId);
  const {
    isLoading: isParticipantsLoading,
    isFetching: isParticipantsFetching,
    isError: isParticipantsFetchError,
    isSuccess: isParticipantsFetchSuccess,
  } = useGetParticipantsQuery(chatId);

  const isLoading = isMessagesLoading || isParticipantsLoading;
  const isFetching = isMessagesFetching || isParticipantsFetching;
  const isError = isMessagesFetchError || isParticipantsFetchError;
  const isSuccess = isMessagesFetchSuccess || isParticipantsFetchSuccess;

  return { isLoading, isFetching, isError, isSuccess };
};

export default useInitChat;
