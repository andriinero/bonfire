import { useAppDispatch } from '@/app/hooks';
import useInitChat from '@/hooks/useInitChat';
import { useEffect } from 'react';

import {
  chatRoomLoadingFinished,
  chatRoomLoadingStarted,
} from '../chatRoomsSlice';

const useInitAndUpdateChatLoadingState = (chatId: string) => {
  const { isError, isSuccess, isLoading } = useInitChat(chatId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess || isError) dispatch(chatRoomLoadingFinished(chatId));
    if (isLoading) dispatch(chatRoomLoadingStarted(chatId));
  }, [isSuccess, isError, isLoading, chatId, dispatch]);
};

export default useInitAndUpdateChatLoadingState;
