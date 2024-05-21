import { useGetChatRoomsQuery } from '../chatRoomsSlice';

import ChatRoomItem from './ChatRoomItem';

type ChatRoomPageProps = { page: number };

const ChatRoomPage = ({ page }: ChatRoomPageProps) => {
  const { data: chatRoomsList } = useGetChatRoomsQuery(page);

  return (
    <>
      {chatRoomsList &&
        chatRoomsList.map((c) => <ChatRoomItem chatId={c._id} />)}
    </>
  );
};

export default ChatRoomPage;
