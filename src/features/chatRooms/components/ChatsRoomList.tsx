import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { selectedChatIdSet } from '@/features/chat/chatSlice';
import { useGetChatRoomsQuery } from '../chatRoomsSlice';

import ChatRoomItem from './ChatRoomItem';
import Spinner from '@/components/general/Spinner';
import ErrorMessage from '@/components/general/ErrorMessage';

const ChatRoomList = () => {
  const {
    data: chatList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetChatRoomsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatList) dispatch(selectedChatIdSet(chatList[0]._id));
  }, [chatList]);

  const isDataLoading = isFetching || isLoading;

  return (
    <div>
      {isDataLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <ul className="space-y-2">
          {chatList!.map((c) => (
            <ChatRoomItem key={c._id} chatId={c._id} />
          ))}
        </ul>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default ChatRoomList;
