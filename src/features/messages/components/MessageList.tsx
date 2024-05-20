import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useRef } from 'react';
import useHandleFetchNextMessages from '../hooks/useFetchNextMessages';

import { range } from '@/utils/range';

import {
  selectShouldScrollDown,
  shouldScrollDownSet,
  useGetMessagesQuery,
} from '@/features/messages/messagesSlice';
import { selectSelectedChatId } from '../../chat/chatSlice';

import ErrorMessage from '@/components/general/ErrorMessage';
import Spinner from '@/components/general/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessagePage from './MessagePage';

const MessageList = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const shouldScrollDown = useAppSelector(selectShouldScrollDown);

  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const { fetchNext, currentPage, hasMore } =
    useHandleFetchNextMessages(selectedChatId);
  const { isFetching, isSuccess } = useGetMessagesQuery({
    chatRoomId: selectedChatId,
    page: 0,
  });

  const dispatch = useAppDispatch();

  //TODO: encapsulate
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

  return (
    <div className="flex-1 overflow-y-auto">
      {isFetching ? (
        <Spinner />
      ) : isSuccess ? (
        <ul
          id="message-list"
          ref={listRef}
          className="flex h-full flex-col-reverse gap-6 overflow-y-auto p-4"
        >
          <InfiniteScroll
            className="flex h-full flex-col-reverse gap-6 overflow-y-auto p-4"
            dataLength={currentPage}
            next={fetchNext}
            hasMore={hasMore}
            loader={<Spinner />}
            inverse={true}
            scrollableTarget="message-list"
          >
            {range(currentPage).map((i) => {
              return (
                <MessagePage
                  key={selectedChatId + currentPage}
                  chatRoomId={selectedChatId}
                  page={i}
                />
              );
            })}
          </InfiniteScroll>
        </ul>
      ) : (
        <ErrorMessage>Error: failed to fetch messages.</ErrorMessage>
      )}
    </div>
  );
};

export default MessageList;
