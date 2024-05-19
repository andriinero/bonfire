import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useRef } from 'react';

import { range } from '@/utils/range';

import {
  selectMessageListCurrentPage,
  selectShouldScrollDown,
  shouldScrollDownSet,
  useGetMessagesQuery,
} from '@/features/messages/messagesSlice';
import { selectSelectedChatId } from '../../chat/chatSlice';

import ErrorMessage from '@/components/general/ErrorMessage';
import Spinner from '@/components/general/Spinner';
import MessagePage from './MessagePage';

const MessageList = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const shouldScrollDown = useAppSelector(selectShouldScrollDown);
  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const currentPage = useAppSelector(
    selectMessageListCurrentPage(selectedChatId),
  );
  const { isFetching, isSuccess } = useGetMessagesQuery({
    chatRoomId: selectedChatId,
    page: 0,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldScrollDown && listRef.current) {
      handleScrollToBottom();
      dispatch(shouldScrollDownSet(false));
    }
  }, [shouldScrollDown, dispatch]);

  const handleScrollToBottom = (): void => {
    if (listRef.current) {
      const ul = listRef.current;
      const scrollHeight = listRef.current.scrollHeight;
      ul.scrollTo(0, scrollHeight);
    }
  };

  const pagesArray = range(currentPage + 1)!;

  return (
    <div className="flex-1 overflow-y-auto">
      {isFetching ? (
        <Spinner />
      ) : isSuccess ? (
        <ul
          ref={listRef}
          className="flex h-full flex-col-reverse gap-6 overflow-y-auto p-4"
        >
          {pagesArray.map((i) => (
            <MessagePage
              key={selectedChatId + currentPage}
              chatRoomId={selectedChatId}
              page={i}
            />
          ))}
        </ul>
      ) : (
        <ErrorMessage>Error: failed to fetch messages.</ErrorMessage>
      )}
    </div>
  );
};

export default MessageList;
