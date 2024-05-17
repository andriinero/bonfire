import { useGetChatRoomsQuery } from '../chatRoomsSlice';

import ErrorMessage from '@/components/general/ErrorMessage';
import ListPlaceholder from '@/components/general/ListPlaceholder';
import Spinner from '@/components/general/Spinner';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomList = () => {
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
          <ul className="overflow-auto-y space-y-2">
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
