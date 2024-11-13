import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';

import {
  messageListStateInitialized,
  useGetMessagesPageCountQuery,
  useGetMessagesQuery,
} from '@/features/messages/messagesSlice';
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
  const {
    isLoading: isMessagesPageCountLoading,
    isFetching: isMessagesPageCountFetching,
    isError: isMessagesPageCountFetchError,
    isSuccess: isMessagesPageCountFetchSuccess,
  } = useGetMessagesPageCountQuery({ chatRoomId });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messageListStateInitialized(chatRoomId));
  }, [dispatch, chatRoomId]);

  const isLoading =
    isMessagesLoading || isParticipantsLoading || isMessagesPageCountLoading;
  const isFetching =
    isMessagesFetching || isParticipantsFetching || isMessagesPageCountFetching;
  const isError =
    isMessagesFetchError ||
    isParticipantsFetchError ||
    isMessagesPageCountFetchError;
  const isSuccess =
    isMessagesFetchSuccess &&
    isParticipantsFetchSuccess &&
    isMessagesPageCountFetchSuccess;

  return { isLoading, isFetching, isError, isSuccess };
};

export default useInitChat;
