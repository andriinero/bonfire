import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectedChatIdSet } from '@/features/chat/chatSlice';
import { useGetChatRoomsQuery } from '../chatRoomsSlice';

import ChatRoomItem from './ChatRoomItem';
import Spinner from '@/components/general/Spinner';
import ErrorMessage from '@/components/general/ErrorMessage';

type ChatRoomListProps = { className?: string };

const ChatRoomList = ({ className }: ChatRoomListProps) => {
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
        <ul className={cn('space-y-2', className)}>
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
