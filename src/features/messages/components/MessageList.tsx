import { useAppSelector } from '@/app/hooks';
import useHandleFetchNextMessages from '../hooks/useFetchNextMessages';
import useScrollDownMessageList from '../hooks/useScrollDownMessageList';

import { range } from '@/utils/range';

import { useGetMessagesQuery } from '@/features/messages/messagesSlice';
import { selectSelectedChatId } from '../../chat/chatSlice';

import ErrorMessage from '@/components/general/ErrorMessage';
import Spinner from '@/components/general/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessagePage from './MessagePage';

const MessageList = () => {
  const { listRef } = useScrollDownMessageList();
  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const { fetchNext, currentPage, hasMore } =
    useHandleFetchNextMessages(selectedChatId);
  const { isFetching, isSuccess } = useGetMessagesQuery({
    chatRoomId: selectedChatId,
    page: 0,
  });

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
