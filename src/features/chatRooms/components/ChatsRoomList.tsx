import useChatRoomInfiniteScroll from '../hooks/useChatRoomInfiniteScroll';

import { useGetChatRoomsQuery } from '../chatRoomsSlice';

import { range } from '@/utils/range';

import ErrorMessage from '@/components/general/ErrorMessage';
import ListPlaceholder from '@/components/general/ListPlaceholder';
import Spinner from '@/components/general/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatRoomPage from './ChatRoomPage';

const ChatRoomList = () => {
  const { currentPage, hasMore, fetchNext } = useChatRoomInfiniteScroll();

  const {
    data: chatList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetChatRoomsQuery(0);

  const isDataLoading = isFetching || isLoading;

  return (
    <div className="overflow-y-auto p-4">
      {isDataLoading ? (
        <Spinner />
      ) : isSuccess ? (
        chatList.length > 0 ? (
          <ul id="chat-rooms-list" className="overflow-auto-y">
            <InfiniteScroll
              className="space-y-2"
              dataLength={currentPage}
              next={fetchNext}
              hasMore={hasMore}
              loader={<Spinner />}
              scrollThreshold="600px"
              scrollableTarget="chat-rooms-list"
            >
              {range(currentPage).map((i) => (
                <ChatRoomPage page={i} />
              ))}
            </InfiniteScroll>
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
