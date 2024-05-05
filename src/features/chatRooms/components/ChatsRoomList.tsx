import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { selectedChatIdSet } from '@/features/chat/chatSlice';
import { useGetChatRoomsQuery } from '../chatRoomsSlice';

import ChatRoomItem from './ChatRoomItem';
import Spinner from '@/components/general/Spinner';
import ErrorMessage from '@/components/general/ErrorMessage';
import ListPlaceholder from '@/components/general/ListPlaceholder';

const ChatRoomList = () => {
  const {
    data: chatList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetChatRoomsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && chatList.length > 0)
      dispatch(selectedChatIdSet(chatList[0]._id));
  }, [chatList]);

  const isDataLoading = isFetching || isLoading;

  return (
    <div>
      {isDataLoading ? (
        <Spinner />
      ) : isSuccess ? (
        chatList.length > 0 ? (
          <ul className="space-y-2">
            {chatList!.map((c) => (
              <ChatRoomItem key={c._id} chatId={c._id} />
            ))}
          </ul>
        ) : (
          <ListPlaceholder>Start a new chat!</ListPlaceholder>
        )
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default ChatRoomList;
