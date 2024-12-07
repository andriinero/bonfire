import { useAppSelector } from '@/app/hooks';
import useMessagesInfiniteScroll from '../hooks/useMessagesInfiniteScroll';
import useScrollDownMessageList from '../hooks/useScrollDownMessageList';

import { range } from '@/utils/range';

import { selectSelectedChatId } from '../../chat/chatSlice';

import Spinner from '@/components/general/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessagePage from './MessagePage';

const MessageList = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const { listRef } = useScrollDownMessageList();
  const { fetchNext, currentPage, hasMore } =
    useMessagesInfiniteScroll(selectedChatId);

  return (
    <div className="flex-1 overflow-y-auto">
      <ul
        ref={listRef}
        id="message-list"
        className="flex h-full flex-col-reverse gap-6 overflow-y-auto p-2 sm:p-4"
      >
        <InfiniteScroll
          className="flex h-full flex-col-reverse gap-6 p-4"
          dataLength={currentPage}
          next={fetchNext}
          hasMore={hasMore}
          loader={<Spinner />}
          inverse={true}
          scrollThreshold="600px"
          scrollableTarget="message-list"
        >
          {range(currentPage).map((i) => {
            return (
              <MessagePage
                key={selectedChatId + `page${i}`}
                chatRoomId={selectedChatId}
                page={i}
              />
            );
          })}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default MessageList;
